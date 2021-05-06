import { User } from "../../models/user.model";
import {  AUTHENTICATED, UNAUTHENTICATED } from "../definitions/authConstants";
import { Action } from "../reducers/authReducer"

export const setAuthenticated = (user: User): Action => ({
    type: AUTHENTICATED,
    payload: {
        authenticated: true,
        user
    }
})

export const setUnAuthenticated = (): Action => {
    return {
        type: UNAUTHENTICATED,
        payload: {
            authenticated: false,
            user: null
        }
    }
}