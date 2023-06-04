import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import DashBoard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"
import SaleInShop from "../pages/salesInShop/SaleInShop"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/saleInShop', element : SaleInShop},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
]