import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import Booking from "../pages/booking/Booking"
import BookingDetail from "../pages/bookingDetail/BookingDetail"
import CreateBooking from "../pages/createbooking/CreateBooking"
import DashBoard from "../pages/dashboard/Dashboard"
import ReportPage from "../pages/ReportPage/ReportPage"
import Login from "../pages/login/Login"
import ListCustomer from "../pages/listCustomer/ListCustomer"
import ListFeedback from "../pages/listFeedback/ListFeedback"
import FeedbackDetail from "../pages/feedbackDetail/FeedbackDetail"
import ItemDetailLayout from "../layout/ItemDetailLayout/ItemDetailLayout"
import CustomerDetail from "../pages/customerDetail/CustomerDetail"
import CreateFeedback from "../pages/createFeedback/CreateFeedback"
import Product from "../pages/product/Product"
import ProductDetails from "../pages/productdetails/ProductDetails"
import SaleInShop from "../pages/salesInShop/SaleInShop"
import CheckInventoryDetail from "../pages/checkInventoryDetail/CheckInventoryDetail"
import CheckInventory from "../pages/checkInventory/CheckInventory"
import CreateChecking from "../pages/createChecking/CreateChecking"
import CreateReportPage from "../pages/CreateReportPage/CreateReportPage"
import Category from "../pages/caegory/Category"
import ReportForStaff from "../pages/ReportForStaff/ReportForStaff"
import ordersList from "../pages/ordersList/ordersList"
import orderDetails from "../pages/orderDetails/orderDetails"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/saleInShop', element : SaleInShop},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
    {path: '/customers', element : ListCustomer, layout: DefaultLayout},
    {path: '/feedbacks', element : ListFeedback, layout: DefaultLayout},
    {path: '/feedbacks/:id', element : FeedbackDetail, layout: ItemDetailLayout},
    {path: '/customers/:id', element : CustomerDetail, layout: ItemDetailLayout},
    {path: '/feedbacks/new', element : CreateFeedback, layout: ItemDetailLayout},
    {path: 'inventory/product', element: Product, layout: DefaultLayout},
    {path: 'inventory/product/category', element: Category, layout: DefaultLayout},
    {path: 'inventory/product/:code', element: ProductDetails, layout: DefaultLayout},
    {path: 'inventory/booking', element: Booking, layout: DefaultLayout},
    {path: 'inventory/booking/create', element: CreateBooking, layout: DefaultLayout},
    {path: 'inventory/booking/details', element: BookingDetail, layout: DefaultLayout},
    {path: 'inventory/check_inventory', element : CheckInventory,layout: DefaultLayout},
    {path: 'inventory/check_inventory/create', element : CreateChecking,layout: DefaultLayout},
    {path: 'inventory/check_inventory/:code', element : CheckInventoryDetail,layout: DefaultLayout},

    { path: '/report/staff/:staffCode/:filter', element: ReportForStaff, layout: DefaultLayout },
    { path: '/orders', element: ordersList, layout: DefaultLayout },
    { path: '/orders/:code', element: orderDetails, layout: DefaultLayout },
    { path: '/report', element: ReportPage, layout: DefaultLayout },
];
