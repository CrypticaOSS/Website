"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Database20Regular, 
  Info20Regular,
  Code20Regular,
  Warning20Regular
} from "@fluentui/react-icons";

export default function CustomApiDocsPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="flex items-center mb-8">
        <Database20Regular className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">{t("custom-api")} {t("setup")}</h2>
      </div>
      
      <p className="mb-6">{t("custom-api-intro")}</p>
      
      <div className="mb-8 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start">
          <Warning20Regular className="h-5 w-5 mr-2 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300">{t("advanced-users")}</h3>
            <p className="text-red-700 dark:text-red-400 mt-1">{t("custom-api-warning")}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("api-requirements")}</h3>
      <p className="mb-4">{t("api-requirements-intro")}</p>
      
      <div className="border rounded-lg p-5 mb-8">
        <h4 className="text-lg font-medium mb-3">{t("required-endpoints")}</h4>
        
        <div className="space-y-6">
          <div>
            <h5 className="font-medium mb-2">1. GET /items/:key</h5>
            <p className="text-sm mb-2">{t("endpoint-get-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("response-format")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`{
  "key": "activity",
  "value": {
    "items": [
      {
        "date": "2023-01-01T00:00:00.000Z",
        "content": "encrypted-content-1"
      },
      {
        "date": "2023-01-02T00:00:00.000Z",
        "content": "encrypted-content-2"
      }
    ],
    "userId": "user-id-123"
  },
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z"
}`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-2">2. PUT /items/:key</h5>
            <p className="text-sm mb-2">{t("endpoint-put-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("request-body")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`{
  "items": [
    {
      "date": "2023-01-01T00:00:00.000Z",
      "content": "encrypted-content-1" 
    }
  ],
  "userId": "user-id-123"
}`}</code>
              </pre>
            </div>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("response-format")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`{
  "key": "activity",
  "value": {
    "items": [
      {
        "date": "2023-01-01T00:00:00.000Z",
        "content": "encrypted-content-1"
      }
    ],
    "userId": "user-id-123"
  },
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  }
}`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-2">3. DELETE /items/:key</h5>
            <p className="text-sm mb-2">{t("endpoint-delete-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("response-format")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`{
  "status": "ok"
}`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-2">4. GET /test</h5>
            <p className="text-sm mb-2">{t("endpoint-test-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("response-format")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`{
  "status": "ok"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("authentication")}</h3>
      <p className="mb-4">{t("authentication-desc")}</p>
      
      <div className="border rounded-lg p-5 mb-8">
        <h4 className="text-lg font-medium mb-3">{t("auth-methods")}</h4>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">{t("bearer-token")}</h5>
            <p className="text-sm mb-2">{t("bearer-token-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("header-example")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`Authorization: Bearer your-token-here`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-2">{t("api-key")}</h5>
            <p className="text-sm mb-2">{t("api-key-desc")}</p>
            
            <div className="bg-muted p-3 rounded-md mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{t("header-example")}</span>
                <Code20Regular className="h-4 w-4" />
              </div>
              <pre className="text-xs overflow-auto">
                <code>{`X-API-Key: your-api-key-here`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("configure-cryptica")}</h3>
      <p className="mb-4">{t("custom-api-config-intro")}</p>
      
      <ol className="list-decimal space-y-3 pl-5 mb-8">
        <li>{t("custom-config-1")}</li>
        <li>{t("custom-config-2")}</li>
        <li>{t("custom-config-3")}</li>
        <li>{t("custom-config-4")}</li>
      </ol>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg mb-8">
        <div className="flex items-start">
          <Info20Regular className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="text-blue-700 dark:text-blue-400">{t("cors-reminder")}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">{t("example-implementation")}</h3>
      <p className="mb-4">{t("example-implementation-intro")}</p>
      
      <div className="bg-muted p-4 rounded-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Node.js + Express</span>
          <Code20Regular className="h-4 w-4" />
        </div>
        <pre className="text-sm overflow-auto">
          <code>{`const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const SECRET_KEY = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for demonstration
let items = {};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'ok' });
});

// Get an item by key
app.get('/items/:key', authenticate, (req, res) => {
  const { key } = req.params;
  const item = items[key];
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  // Verify the item belongs to this user
  if (item.value.userId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json(item);
});

// Create or update an item
app.put('/items/:key', authenticate, (req, res) => {
  const { key } = req.params;
  const value = req.body;
  
  // Ensure userId is set to the authenticated user
  value.userId = req.user.id;
  
  const item = {
    key,
    value,
    created_at: items[key]?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  items[key] = item;
  res.status(200).json(item);
});

// Delete an item
app.delete('/items/:key', authenticate, (req, res) => {
  const { key } = req.params;
  
  if (!items[key]) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  // Verify the item belongs to this user
  if (items[key].value.userId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  delete items[key];
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(\`API server running on port \${port}\`);
});`}</code>
        </pre>
      </div>
      
      <div className="mt-10 border-t pt-4">
        <Link href="/docs/database" className="text-sm text-muted-foreground hover:text-primary">
          ← {t("back-to-database")}
        </Link>
      </div>
    </>
  );
}
