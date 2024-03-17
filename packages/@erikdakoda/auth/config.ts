export type AuthConfig = {
  pages: {
    home: string;
    login: string;
    signup: string;
    forgot: string;
    reset: string;
    verify: string;
    verifyToken: string;
  };

  adminUsers: string[];
};

const authConfig: { config: AuthConfig } = {
  config: {
    pages: {
      home: '/',
      login: '/login',
      signup: '/signup',
      forgot: '/forgot',
      reset: '/reset',
      verify: '/verify',
      verifyToken: '/verify/[[...token]]',
    },

    adminUsers: [],
  },
};

export default authConfig;
