export interface Activity {
  date: Date
  content: string
}

export interface Activities {
  items: Activity[]
}

// Function to get settings including DB connection config
function getSettings() {
  if (typeof window !== "undefined") {
    const settingsStr = localStorage.getItem("settings");
    if (settingsStr) {
      try {
        return JSON.parse(settingsStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

// Function to save data to database if enabled
async function saveToDatabase(key: string, data: unknown) {
  const settings = getSettings();
  if (!settings?.dbConnection?.enabled || !settings?.dbConnection?.url) {
    return;
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (settings.dbConnection.apiKey) {
      headers['Authorization'] = `Bearer ${settings.dbConnection.apiKey}`;
    }

    await fetch(`${settings.dbConnection.url}/items/${key}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Error saving to database:", error);
  }
}

export function getActivity() {
  if (typeof window !== "undefined") {
    const activity = localStorage.getItem("activity")
    if (activity) {
      return JSON.parse(activity) || { items: [] }
    }
    localStorage.setItem("activity", JSON.stringify({ items: [] }))
    return { items: [] }
  }
  return { items: [] }
}

export function addActivity(activity: Activity) {
  let a: Activities = getActivity()
  if (!a) {
    a = {
      items: [activity],
    }
    localStorage.setItem("activity", JSON.stringify(a))

    // Try to save to database if enabled
    saveToDatabase("activity", a);

    return
  }

  a.items.push(activity)
  localStorage.setItem("activity", JSON.stringify(a))

  // Try to save to database if enabled
  saveToDatabase("activity", a);
}

export function sortActivities(activities: Activities): Activity[][] {
  const sorted: Activity[][] = [[], [], [], []]
  activities.items.forEach((element) => {
    if (new Date(element.date).toDateString() == new Date().toDateString()) {
      sorted[0].push(element)
    } else if (
      (new Date().getTime() - new Date(element.date).getTime()) / 86400000 <
      7
    ) {
      sorted[1].push(element)
    } else if (
      (new Date().getTime() - new Date(element.date).getTime()) / 86400000 <
      31
    ) {
      sorted[2].push(element)
    } else {
      sorted[3].push(element)
    }
  })
  return sorted
}
