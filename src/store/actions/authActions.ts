import { User } from "../../models/user.model";
import {
  AUTHENTICATED,
  SET_USER,
  UNAUTHENTICATED,
} from "../definitions/authConstants";

export interface SetAuthenticatedAction {
  type: typeof AUTHENTICATED;
  payload: {
    authenticated: boolean;
  };
}

export interface SetUnauthenticatedAction {
  type: typeof UNAUTHENTICATED;
  payload: {
    authenticated: boolean;
  };
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: {
    user: User;
  };
}

export const setAuthenticated = (): SetAuthenticatedAction => ({
  type: AUTHENTICATED,
  payload: {
    authenticated: true,
  },
});

export const setUnAuthenticated = (): SetUnauthenticatedAction => {
  return {
    type: UNAUTHENTICATED,
    payload: {
      authenticated: false,
    },
  };
};

export const setUser = (user: User): SetUserAction => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};
