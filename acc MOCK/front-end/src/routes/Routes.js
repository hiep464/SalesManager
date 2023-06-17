import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import DashBoard from "../pages/dashboard/Dashboard"
import ReportPage from "../pages/ReportPage/ReportPage"
import Login from "../pages/login/Login"
import SaleInShop from "../pages/salesInShop/SaleInShop"
import CreateReportPage from "../pages/CreateReportPage/CreateReportPage"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/saleInShop', element : SaleInShop},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
    {path: '/report', element : ReportPage, layout: DefaultLayout},
    {path: '/create/report', element : CreateReportPage, layout: DefaultLayout},
]