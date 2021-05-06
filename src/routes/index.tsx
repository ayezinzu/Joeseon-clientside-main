import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as appRoutes from "./routeConstants/appRoutes";
import AuthWrapper from "../views/Auth/AuthWrapper"
import requiredAuth from "../shared/components/HOC/requireAuth";
import Home from "../views/Home"


export const appHistory = createBrowserHistory();

const AppRoutes = () => {

    const isAuthenticated = (component: any) => {
        return requiredAuth(component);
    }

    const routes = [
        { exact: false, path: appRoutes.AUTH, component: AuthWrapper },
        { exact: true, path: appRoutes.HOME, component: isAuthenticated(Home) }
    ]

    return (
        <div>
            <Router history={appHistory}>
                <Switch>
                    {
                        routes.map((route, index) => {
                            return <Route
                                key={index}
                                {...route}
                                component={route.component}
                            />
                        })
                    }
                    <Route path="*" render={() => <Redirect to={appRoutes.LOGIN} />} />
                </Switch>
            </Router>
        </div>
    )
}

export default AppRoutes;