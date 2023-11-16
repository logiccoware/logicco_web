export const ROUTES = {
    PUBLIC: {
      HOME: "/",
    },
    ANONYMOUS_ONLY: {
      LOGIN: "/auth/login",
      INVITE: '/invite/43fe0988-00a1-4778-a085-0d197b8ac413'
    },
    PROTECTED: {
      DASHBOARD: "/dashboard",
      PAYEES: "/payees",
      LOGOUT_ROUTE: "/logout"
    }
  };
  
  export const LOGIN_ROUTE = ROUTES.ANONYMOUS_ONLY.LOGIN;
  export const HOME_ROUTE = ROUTES.PUBLIC.HOME;
  export const INVITE_ROUTE = ROUTES.ANONYMOUS_ONLY.INVITE;
  export const DASHBOARD_ROUTE = ROUTES.PROTECTED.DASHBOARD;
  export const PAYEES_ROUTE = ROUTES.PROTECTED.PAYEES;
  export const LOGOUT_ROUTE = ROUTES.PROTECTED.LOGOUT_ROUTE;
  