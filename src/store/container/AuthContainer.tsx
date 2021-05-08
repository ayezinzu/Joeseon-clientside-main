import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RootReducerProps } from "../reducers";
import * as AuthActions from "../actions/authActions";

const mapStateToProps = (state: RootReducerProps) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

const AuthContainer = (component: any) => {
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default AuthContainer;
