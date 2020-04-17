import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import 'materialize-css'
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/context";
import {Navbar} from "./component/Navbar";
import {Loader} from "./component/Loader";

function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth
        }}>
            <BrowserRouter>
                {isAuth && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
