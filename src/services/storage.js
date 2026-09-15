import { initialCardContent } from '../defaultContent';

const STORAGE_KEY = 'dad_47th_birthday_card_data_v2';
const CLOUD_DOC_KEY = 'dad_birthday_card_content';

/**
 * Detect available cloud storage provider
 */
export function getStorageMode() {
  const upstashUrl = import.meta.env.VITE_UPSTASH_REDIS_REST_URL;
  const upstashToken = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN;
  const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (upstashUrl && upstashToken) {
    return {
      type: 'cloud-upstash',
      badge: '☁️ Cloud Sync (Upstash Redis)',
      description: 'Changes persist globally across all devices on Vercel!'
    };
  }

  if (firebaseProject) {
    return {
      type: 'cloud-firebase',
      badge: '☁️ Cloud Sync (Firebase Firestore)',
      description: 'Changes persist globally across all devices on Vercel!'
    };
  }

  return {
    type: 'local',
    badge: '📱 Local & Session Storage',
    description: 'Saved on this browser. To sync across all devices, configure Upstash or Firebase in Vercel environment variables (see .env.example).'
  };
}

/**
 * Load card content with fallback chain: Cloud -> LocalStorage -> defaultContent
 */
export async function loadCardContent() {
  // 1. Try Cloud (Upstash Redis)
  const upstashUrl = import.meta.env.VITE_UPSTASH_REDIS_REST_URL;
  const upstashToken = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/get/${CLOUD_DOC_KEY}`, {
        headers: {
          Authorization: `Bearer ${upstashToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          // Merge with defaultContent so missing keys never break UI
          return { ...initialCardContent, ...parsed };
        }
      }
    } catch (err) {
      console.warn('Failed to load from Upstash Cloud, falling back to LocalStorage:', err);
    }
  }

  // 2. Try Cloud (Firebase Firestore REST)
  const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  if (firebaseProject && firebaseApiKey) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${firebaseProject}/databases/(default)/documents/cards/${CLOUD_DOC_KEY}?key=${firebaseApiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.fields && data.fields.payload && data.fields.payload.stringValue) {
          const parsed = JSON.parse(data.fields.payload.stringValue);
          return { ...initialCardContent, ...parsed };
        }
      }
    } catch (err) {
      console.warn('Failed to load from Firebase Cloud, falling back to LocalStorage:', err);
    }
  }

  // 3. Try LocalStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return { ...initialCardContent, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
  }

  // 4. Default Content
  return initialCardContent;
}

/**
 * Save card content to LocalStorage and Cloud (if configured)
 */
export async function saveCardContent(content) {
  // Always save locally immediately
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }

  let cloudSuccess = false;

  // Try saving to Upstash Redis REST
  const upstashUrl = import.meta.env.VITE_UPSTASH_REDIS_REST_URL;
  const upstashToken = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/set/${CLOUD_DOC_KEY}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        cloudSuccess = true;
      }
    } catch (err) {
      console.error('Failed to save to Upstash Cloud:', err);
    }
  }

  // Try saving to Firebase Firestore REST
  const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  if (firebaseProject && firebaseApiKey) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${firebaseProject}/databases/(default)/documents/cards/${CLOUD_DOC_KEY}?key=${firebaseApiKey}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            payload: { stringValue: JSON.stringify(content) },
            updatedAt: { stringValue: new Date().toISOString() }
          }
        })
      });
      if (res.ok) {
        cloudSuccess = true;
      }
    } catch (err) {
      console.error('Failed to save to Firebase Firestore:', err);
    }
  }

  return { localSuccess: true, cloudSuccess };
}

/**
 * Reset to factory default content
 */
export function resetCardContent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
  return initialCardContent;
}

/**
 * Export current content as JSON file
 */
export function exportCardJSON(content) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `dads-47th-birthday-card-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Validate and import JSON content
 */
export function validateAndImportCardJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    const merged = { ...initialCardContent, ...parsed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (err) {
    throw new Error('Could not parse JSON file: ' + err.message);
  }
}
