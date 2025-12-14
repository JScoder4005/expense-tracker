// Session storage keys
const STORAGE_KEYS = {
  USER: 'expense_tracker_user',
  ACCESS_TOKEN: 'expense_tracker_access_token',
} as const;

export interface StoredUser {
  id: number;
  email: string;
}

/**
 * Save user data to session storage
 */
export const saveUserToSession = (user: StoredUser): void => {
  try {
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to session storage:', error);
  }
};

/**
 * Get user data from session storage
 */
export const getUserFromSession = (): StoredUser | null => {
  try {
    const userStr = sessionStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    return JSON.parse(userStr) as StoredUser;
  } catch (error) {
    console.error('Failed to get user from session storage:', error);
    return null;
  }
};

/**
 * Remove user data from session storage
 */
export const removeUserFromSession = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.USER);
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Failed to remove user from session storage:', error);
  }
};

/**
 * Get user initials from email
 */
export const getUserInitials = (email: string): string => {
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
};
