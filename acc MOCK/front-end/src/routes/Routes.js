import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import Booking from "../pages/booking/Booking"
import BookingDetails from "../pages/bookingdetails/BookingDetails"
import CreateBooking from "../pages/createbooking/CreateBooking"
import DashBoard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"
import Product from "../pages/product/Product"
import ProductDetails from "../pages/productdetails/ProductDetails"
import SaleInShop from "../pages/salesInShop/SaleInShop"
import CheckInventoryDetail from "../pages/checkInventoryDetail/CheckInventoryDetail"
import CheckInventory from "../pages/checkInventory/CheckInventory"
import CreateChecking from "../pages/createChecking/CreateChecking"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/saleInShop', element : SaleInShop},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
    {path: 'inventory/product', element: Product, layout: DefaultLayout},
    {path: 'inventory/product/:code', element: ProductDetails, layout: DefaultLayout},
    {path: 'inventory/booking', element: Booking, layout: DefaultLayout},
    {path: 'inventory/booking/create', element: CreateBooking, layout: DefaultLayout},
    {path: 'inventory/booking/details', element: BookingDetails, layout: DefaultLayout},
]