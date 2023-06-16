import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import Booking from "../pages/booking/Booking"
import CreateBooking from "../pages/createbooking/CreateBooking"
import DashBoard from "../pages/dashboard/Dashboard"
import Inventory from "../pages/inventory/Inventory"
import Login from "../pages/login/Login"
import SaleInShop from "../pages/salesInShop/SaleInShop"
import CheckInventoryDetail from "../pages/checkInventoryDetail/CheckInventoryDetail"
import CheckInventory from "../pages/checkInventory/CheckInventory"
import CreateChecking from "../pages/createChecking/CreateChecking"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/saleInShop', element : SaleInShop},
    // {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
    {path: '/inventory', element: Inventory, layout: DefaultLayout},
    {path: '/booking', element: Booking, layout: DefaultLayout},
    {path: '/booking/create', element: CreateBooking, layout: DefaultLayout},
    {path: '/checkInventory', element: CheckInventory, layout: DefaultLayout},
    {path: '/checkInventory/createChecking', element: CreateChecking, layout: DefaultLayout},
    {path: '/checkInventory/:code',element: CheckInventoryDetail, layout :DefaultLayout}
]