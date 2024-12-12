import {
    Outlet,
    Navigate
} from 'react-router'

const PrivateRoutes = () => {
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    // let auth = { 'token': false }
    return (
        isLoggedIn ?
            <Outlet /> :
            <Navigate to="/" />
    )
}

export default PrivateRoutes