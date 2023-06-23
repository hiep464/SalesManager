import './FeedbackItem.scss'
import { Link } from 'react-router-dom'

function FeedbackItem(props){

    const data = props.data

    const createdate = new Date(data.feedbackDate)

    return(
        <tr>
            <td>
                <Link className='link' to={`/care/feedbacks/`+data.id}>{data.id}</Link>
            </td>
            <td>
                <Link className='link' to={`/care/customers/`+data.customerCode}>{data.customerCode}</Link>
            </td>
            <td>{data.phone}</td>
            <td>{(data.status==="S1")?'Chưa xử lý':'Đã xử lý'}</td>
            <td>{createdate.getDate()}/{createdate.getMonth()+1}/{createdate.getFullYear()}</td>
        </tr>
    )
}

export default FeedbackItem