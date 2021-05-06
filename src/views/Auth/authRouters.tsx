import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as routes from "../../routes/routeConstants/appRoutes";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";

const authRouter = () => {
    return (
        <Switch>
            <Redirect exact strict from={routes.AUTH} to={routes.LOGIN} />
            <Route exact path={routes.REGISTER} component={() => <RegisterForm />} />
            <Route exact path={routes.LOGIN} component={() => <LoginForm />} />
        </Switch>
    )
}

export default authRouter;