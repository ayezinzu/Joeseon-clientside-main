export const ApiRoutes = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL,
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
  FORGOT_PASSWORD: "/auth/forgot_password",
  RESET_PASSWORD: "/auth/reset_password",
  CHANGE_PASSWORD: "/change_password",
  USER: "/user",
  USERS: "/users",
  VERIFY_USERS: "/users/:userId/verify",
  USER_DOCUMENT: "/users/:userId/document",
  MY_DOCUMENT: "/user/document",
  POSTS: "/posts",
  MODERATORS: "/moderators",
  FACTIONS: "/factions",
};
