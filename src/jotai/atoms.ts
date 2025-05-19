import { atom } from 'jotai';
import { checkAuth } from '@api/services/auth';
import { getClaims } from '@api/services/claims';
import type { Claim } from '@/types/claim';

// This atom acts as a signal to trigger refetch
export const authRefetchTriggerAtom = atom(0);

// The actual user atom that fetches data, re-runs when authRefetchTriggerAtom changes
export const userAtom = atom(async (get) => {
  // This makes the atom re-run when authRefetchTriggerAtom changes
  get(authRefetchTriggerAtom);

  try {
    const user = await checkAuth();
    return user.data;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return null;
  }
});

// Utility atom to trigger a refetch
export const refetchUserAtom = atom(null, (get, set) => {
  set(authRefetchTriggerAtom, get(authRefetchTriggerAtom) + 1);
});

export const isAuthenticatedAtom = atom(async (get) => {
  const user = await get(userAtom);
  console.log('User is authenticated', user);
  return user !== null;
});

// Claims refetch trigger atom
export const claimsRefetchTriggerAtom = atom(0);

// Claims data atom that fetches and manages claims data
export const claimsAtom = atom(async (get) => {
  // This makes the atom re-run when claimsRefetchTriggerAtom changes
  get(claimsRefetchTriggerAtom);

  try {
    const response = await getClaims();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch claims:', error);
    return null;
  }
});

// Utility atom to trigger claims refetch
export const refetchClaimsAtom = atom(null, (get, set) => {
  set(claimsRefetchTriggerAtom, get(claimsRefetchTriggerAtom) + 1);
});

