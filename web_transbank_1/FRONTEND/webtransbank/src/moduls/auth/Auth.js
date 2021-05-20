import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Register from './Register'
import Login from './Login'
import EditUser from './EditUser'
import ResetPassword from './ResetPassword'

class Auth extends React.Component {

    renderReturn = () => {
        return (
            <React.Fragment>
                <Route exact  path="/auth">
                    <Redirect to="/auth/register" />
                </Route>
                <Route path='/auth/register' component={Register}></Route>
                <Route path='/auth/login' component={Login}></Route>
                <Route path='/auth/edituser' component={EditUser}></Route>
                <Route path='/auth/reset-password' component={ResetPassword}></Route>
            </React.Fragment>
        )
    }


    render(){
        return (this.renderReturn())
    }
}

export default Auth;