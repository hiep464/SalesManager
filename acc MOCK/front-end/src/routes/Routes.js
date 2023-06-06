import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import DashBoard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout}
]