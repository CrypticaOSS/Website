/**
 * Database connection utilities for testing and managing connections
 */

import { DbConnectionConfig } from "@/hooks/use-storage";

export interface TestConnectionResult {
  success: boolean;
  message: string;
  details?: unknown;
}

/**
 * Tests a database connection based on the provider type
 * @param config The database connection configuration
 * @returns Promise with connection test results
 */
export async function testDatabaseConnection(
  config: DbConnectionConfig
): Promise<TestConnectionResult> {
  if (!config.url) {
    return {
      success: false,
      message: "Database URL is required",
    };
  }

  try {
    switch (config.type) {
      case "supabase":
        return await testSupabaseConnection(config);
      case "firebase":
        return await testFirebaseConnection(config);
      case "custom":
        return await testCustomApiConnection(config);
      default:
        return {
          success: false,
          message: `Unsupported database type: ${config.type}`,
        };
    }
  } catch (error) {
    console.error("Error testing database connection:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      details: error,
    };
  }
}

/**
 * Test Supabase connection
 */
async function testSupabaseConnection(
  config: DbConnectionConfig
): Promise<TestConnectionResult> {
  try {
    // Validate URL format
    if (!config.url.includes("supabase.co")) {
      return {
        success: false,
        message: "Invalid Supabase URL. URL should contain supabase.co",
      };
    }

    // Validate API key
    if (!config.apiKey || config.apiKey.length < 10) {
      return {
        success: false,
        message: "Invalid or missing Supabase API key",
      };
    }

    // Test connection by making a simple request to the health endpoint
    const healthEndpoint = `${config.url}/rest/v1/`;
    const response = await fetch(healthEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": config.apiKey,
        "Authorization": `Bearer ${config.apiKey}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Supabase connection failed: ${response.statusText}`,
        details: await response.text(),
      };
    }

    // Test if we can access the items table
    try {
      const itemsEndpoint = `${config.url}/rest/v1/items?limit=1`;
      const itemsResponse = await fetch(itemsEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": config.apiKey,
          "Authorization": `Bearer ${config.apiKey}`,
        },
      });

      // Status 200 means table exists, 404 means table doesn't exist
      if (itemsResponse.status === 404) {
        return {
          success: false,
          message: "Connection successful but 'items' table not found. Please create the table.",
        };
      }
    } catch {
      // Ignore errors here, we've already verified basic connectivity
    }

    return {
      success: true,
      message: "Successfully connected to Supabase",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to connect to Supabase",
      details: error,
    };
  }
}

/**
 * Test Firebase connection
 */
async function testFirebaseConnection(
  config: DbConnectionConfig
): Promise<TestConnectionResult> {
  try {
    // Validate URL format
    if (!config.url.includes("firebaseio.com") && !config.url.includes("firebase")) {
      return {
        success: false,
        message: "Invalid Firebase URL format",
      };
    }

    // Test connection by making a simple request
    const testUrl = `${config.url}/.json`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add auth parameter if API key is provided
    const url = new URL(testUrl);
    if (config.apiKey) {
      url.searchParams.append('auth', config.apiKey);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Firebase returns 401 for unauthorized and 403 for permission denied
    // Both mean the URL is valid but credentials are wrong
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        message: "Firebase URL is valid but authentication failed. Check your API key.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: `Firebase connection failed: ${response.statusText}`,
        details: await response.text(),
      };
    }

    return {
      success: true,
      message: "Successfully connected to Firebase",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to connect to Firebase",
      details: error,
    };
  }
}

/**
 * Test custom API connection
 */
async function testCustomApiConnection(
  config: DbConnectionConfig
): Promise<TestConnectionResult> {
  try {
    // Validate URL
    if (!config.url.startsWith('http')) {
      return {
        success: false,
        message: "Invalid URL. Must start with http:// or https://",
      };
    }

    // Determine endpoint to test - try to get a test item
    const testEndpoint = `${config.url.replace(/\/+$/, '')}/items/test`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    try {
      // First test with a GET request
      const response = await fetch(testEndpoint, {
        method: 'GET',
        headers
      });

      // 404 is actually okay here - it means the endpoint exists but the item doesn't
      if (response.status !== 404 && !response.ok) {
        return {
          success: false,
          message: `API endpoint test failed: ${response.statusText}`,
          details: await response.text(),
        };
      }

      return {
        success: true,
        message: "Successfully connected to custom API",
      };
    } catch (error) {
      // Try an OPTIONS request as fallback if GET fails
      try {
        const optionsResponse = await fetch(config.url, {
          method: 'OPTIONS',
          headers
        });

        if (optionsResponse.ok) {
          return {
            success: true,
            message: "API seems available, but GET request failed. Verify API implements required endpoints.",
          };
        }
      } catch {
        // Ignore errors from OPTIONS request
      }

      throw error; // Re-throw the original error
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to connect to custom API",
      details: error,
    };
  }
}

/**
 * Format database connection URL based on provider type
 * @param config The database connection configuration
 * @returns Formatted URL string
 */
export function formatDatabaseUrl(config: DbConnectionConfig): string {
  if (!config.url) return '';

  switch (config.type) {
    case "supabase":
      // Ensure URL ends with /rest/v1
      return config.url.endsWith('/rest/v1')
        ? config.url
        : `${config.url.replace(/\/+$/, '')}/rest/v1`;

    case "firebase":
      // Ensure URL ends with .json for Firebase REST API
      return config.url.endsWith('.json')
        ? config.url
        : `${config.url.replace(/\/+$/, '')}`;

    case "custom":
    default:
      // Just return the URL as-is for custom APIs
      return config.url;
  }
}
