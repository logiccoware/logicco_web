import {
  NAVBAR_DRAWER_AUTH_LINKS,
  NAVBAR_DRAWER_NON_AUTH_LINKS,
} from "@/features/Header/constants";

/**
 * Returns the appropriate drawer items based on whether the user is authenticated or not.
 * @param user - The user object. If provided, the function returns authenticated drawer items, otherwise non-authenticated drawer items.
 * @returns An array of drawer items.
 */
export function getDrawerItem(isUserAuthenticated: boolean) {
  return isUserAuthenticated ? NAVBAR_DRAWER_AUTH_LINKS : NAVBAR_DRAWER_NON_AUTH_LINKS;
}
