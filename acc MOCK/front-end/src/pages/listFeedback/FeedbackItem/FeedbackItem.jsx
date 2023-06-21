import './FeedbackItem.scss'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function FeedbackItem(props){

    const data = props.data

    const navigate =useNavigate()

    const handleFeedbackDetail =(id)=>{
        navigate('/feedbacks'+id)
    } 

    const handleCustomerDetail =(code)=>{
        navigate('/customers'+code)
    } 

    const createdate = new Date(data.feedbackDate)

    return(
        <tr>
            <td>
                <Link to={`/feedbacks/`+data.id}>{data.id}</Link>
            </td>
            <td>
                <Link to={`/customers/`+data.customerCode}>{data.customerCode}</Link>
            </td>
            <td>{data.phone}</td>
            <td>{(data.status==="S1")?'Chưa xử lý':'Đã xử lý'}</td>
            <td>{createdate.getDate()}/{createdate.getMonth()}/{createdate.getFullYear()}</td>
        </tr>
    )
}

export default FeedbackItem