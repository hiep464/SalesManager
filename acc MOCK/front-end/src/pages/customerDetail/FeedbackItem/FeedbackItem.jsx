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
            <td>{createdate.getDate()}/{createdate.getMonth()+1}/{createdate.getFullYear()}</td>
            <td>{(data.status==="S1")?'Chưa xử lý':'Đã xử lý'}</td>
            <td>{data.content.length<=70?data.content:data.content.substring(0,70)+" ..."}</td>
        </tr>
    )
}

export default FeedbackItem