import {
  AUTHENTICATED,
  SET_USER,
  UNAUTHENTICATED,
} from "../definitions/authConstants";
import { CreateReducer } from "../../shared/utils/createReducer";
import { User } from "../../models/user.model";
import {
  SetAuthenticatedAction,
  SetUnauthenticatedAction,
  SetUserAction,
} from "../actions/authActions";

export interface AuthState {
  authenticated: boolean;
  user?: User;
}

export interface AuthReducerProps extends AuthState {
  setAuthenticated: () => SetAuthenticatedAction;
  setUnAuthenticated: () => SetUnauthenticatedAction;
  setUser: (user: User) => SetUserAction;
}

const initState: AuthState = {
  authenticated: false,
  user: undefined,
};

const authReducer = CreateReducer(initState, {
  [AUTHENTICATED](state: AuthState, action: SetAuthenticatedAction): AuthState {
    const { authenticated } = action?.payload;
    return {
      ...state,
      authenticated,
    };
  },
  [UNAUTHENTICATED](
    state: AuthState,
    action: SetUnauthenticatedAction
  ): AuthState {
    const { authenticated } = action?.payload;
    return { ...state, authenticated };
  },
  [SET_USER](state: AuthState, action: SetUserAction): AuthState {
    const { user } = action?.payload;
    return {
      ...state,
      user,
    };
  },
});

export default authReducer;
