import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface SecurityConfig {
  disableDevTools: boolean;
  disableRightClick: boolean;
  disableCopyPaste: boolean;
  disableTextSelection: boolean;
  disableViewSource: boolean;
  disablePrintSave: boolean;
  disableDragDrop: boolean;
  disableFrameEmbedding: boolean;
  devToolsAction: 'alert' | 'debugger_trap' | 'blur_overlay' | 'redirect';
  clearConsolePeriodically: boolean;
  suppressConsoleLogs: boolean;
  customWarningMessage: string;
  allowAdminBypass: boolean;
  lastUpdated?: string;
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  disableDevTools: false,
  disableRightClick: false,
  disableCopyPaste: false,
  disableTextSelection: false,
  disableViewSource: false,
  disablePrintSave: false,
  disableDragDrop: false,
  disableFrameEmbedding: false,
  devToolsAction: 'alert',
  clearConsolePeriodically: false,
  suppressConsoleLogs: false,
  customWarningMessage: 'Developer tools and content copying have been disabled for security.',
  allowAdminBypass: true,
};

const STORAGE_KEY = 'admin_power_security_config';

/**
 * Reads local security configuration from localStorage
 */
export function getLocalSecurityConfig(): SecurityConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SECURITY_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Failed to parse local security config:', err);
  }
  return DEFAULT_SECURITY_CONFIG;
}

/**
 * Saves security configuration to localStorage and Firestore (if configured)
 */
export async function saveSecurityConfig(config: SecurityConfig): Promise<void> {
  const updatedConfig = { ...config, lastUpdated: new Date().toISOString() };
  
  // Save to localStorage immediately
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
    // Dispatch custom window event for same-tab instant reactive update
    window.dispatchEvent(new CustomEvent('security-config-changed', { detail: updatedConfig }));
  } catch (err) {
    console.warn('Failed to save security config to localStorage:', err);
  }

  // Save to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'security');
      await setDoc(docRef, updatedConfig, { merge: true });
    } catch (err) {
      console.error('Failed to sync security config to Firestore:', err);
    }
  }
}

/**
 * Subscribes to live security configuration updates from Firestore and localStorage
 */
export function subscribeSecurityConfig(onChange: (config: SecurityConfig) => void): () => void {
  // Initial sync from local storage
  onChange(getLocalSecurityConfig());

  // Listen for local custom events (same-tab updates)
  const handleLocalChange = (e: Event) => {
    const customEvent = e as CustomEvent<SecurityConfig>;
    if (customEvent.detail) {
      onChange(customEvent.detail);
    }
  };
  window.addEventListener('security-config-changed', handleLocalChange);

  // Listen for storage events (multi-tab updates)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        onChange({ ...DEFAULT_SECURITY_CONFIG, ...JSON.parse(e.newValue) });
      } catch (err) {
        console.warn('Error parsing storage event security config:', err);
      }
    }
  };
  window.addEventListener('storage', handleStorageChange);

  // Firestore live listener
  let unsubscribeFirestore = () => {};
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'settings', 'security');
      unsubscribeFirestore = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as SecurityConfig;
          const merged = { ...DEFAULT_SECURITY_CONFIG, ...remoteData };
          // Update local cache
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {}
          onChange(merged);
        }
      }, (error) => {
        console.warn('Firestore security config listener error:', error);
      });
    } catch (err) {
      console.warn('Failed to setup Firestore security config listener:', err);
    }
  }

  return () => {
    window.removeEventListener('security-config-changed', handleLocalChange);
    window.removeEventListener('storage', handleStorageChange);
    unsubscribeFirestore();
  };
}
