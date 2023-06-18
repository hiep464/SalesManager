import DefaultLayout from "../layout/defaultLayout/DefaultLayout"
import DashBoard from "../pages/dashboard/Dashboard"
import Login from "../pages/login/Login"
import ListCustomer from "../pages/listCustomer/ListCustomer"
import ListFeedback from "../pages/listFeedback/ListFeedback"
import FeedbackDetail from "../pages/feedbackDetail/FeedbackDetail"
import ItemDetailLayout from "../layout/ItemDetailLayout/ItemDetailLayout"
import CustomerDetail from "../pages/customerDetail/CustomerDetail"
import CreateFeedback from "../pages/createFeedback/CreateFeedback"

export const publicRoutes = [
    {path: '/', element : Login},
    {path: '/dashboard', element : DashBoard, layout: DefaultLayout},
    {path: '/customers', element : ListCustomer, layout: DefaultLayout},
    {path: '/feedbacks', element : ListFeedback, layout: DefaultLayout},
    {path: '/feedbacks/:id', element : FeedbackDetail, layout: ItemDetailLayout},
    {path: '/customers/:id', element : CustomerDetail, layout: ItemDetailLayout},
    {path: '/feedbacks/new', element : CreateFeedback, layout: ItemDetailLayout},
]