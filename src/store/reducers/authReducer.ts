import { AUTHENTICATED, UNAUTHENTICATED } from "../definitions/authConstants";
import { CreateReducer } from "../../shared/utils/createReducer";
import { User } from "../../models/user.model";

export interface AuthState {
    authenticated: boolean;
    user?: User | null;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface AuthReducerProps extends AuthState {
    setAuthenticated: (user: User) => Action;
    setUnAuthenticated: () => Action;
}

const initState: AuthState = {
    authenticated: false,
    user: null
};

const authReducer = CreateReducer(initState, {
    [AUTHENTICATED](state: AuthState, action: Action): AuthState {
        const { authenticated, user } = action?.payload;
        return {
            ...state,
            authenticated,
            user
        };
    },
    [UNAUTHENTICATED](state: AuthState, action: Action): AuthState {
        const { authenticated } = action?.payload;
        return { ...state, authenticated };
    }
});

export default authReducer;



