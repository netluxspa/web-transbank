import {  Route } from 'react-router-dom';

import AdminLogin from './AdminLogin';
import AdminResetPassword from './AdminResetPassword';


const AdminAuth = () => {
    return (
        <div>
            <Route path='/admin/auth/login' exact component={AdminLogin}/>
            <Route path='/admin/auth/reset-password' exact component={AdminResetPassword}/>
        </div>
    )
}

export default AdminAuth;