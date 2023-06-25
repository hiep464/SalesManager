import './ListFeedback.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paginations from './Pagination/Pagination'
import { useEffect, useState } from 'react';
import APIapp from '../../components/APIapp/APIapp';
import FeedbackItem from './FeedbackItem/FeedbackItem';
import { useNavigate } from 'react-router-dom';

function ListFeedback(){
    const [pagination,setPagination]=useState({
        page:1,
        limit:20,
        total:1
    })
    const [feedbacks, setFeedbacks] = useState([])
    const navigate= useNavigate()

    const handllePageChange =(newPage) =>{
        setPagination({...pagination, page: newPage})
    }

    const handlleLimitChange =(newLimit) =>{
        setPagination({...pagination, limit: Number(newLimit)})
    }

    useEffect(()=>{
        const fetchdata = async ()=>{
            const res =await APIapp.get(`admin/care/feedbacks?page=${pagination.page-1}&size=${pagination.limit}`)
            setPagination({...pagination, total: res.data.totalPages})
            setFeedbacks(res.data.content)
            console.log(res)
        }
        fetchdata()
    },[pagination.page, pagination.limit])

    const handleCreateNew=()=>{
        navigate('/care/feedbacks/new')
    }

    console.log(feedbacks)
    

    return(
        <div className='pagecontent'>

            <button className='addnew' onClick={handleCreateNew}>Tạo phản hồi</button>
            <div className='searchbar'>
                <input type="text" id='searchtext' placeholder='Tìm kiếm theo mã khách hàng' />
            </div>
            <div className='table'>
                <table>
                    <tr>
                        <th className='column1'>Mã phản hồi</th>
                        <th className='column2'>Mã khách hàng</th>
                        <th className='column3'>Số điện thoại</th>
                        <th className='column4'>Trạng thái</th>
                        <th className='column4'>Ngày tạo</th>
                    </tr>
                    {feedbacks.map((feedback, index)=>(
                        <FeedbackItem key={index} data={feedback}/>
                    ))}
                </table>
                <Paginations pagination={pagination} onPageChange={handllePageChange} onLimitChange={handlleLimitChange}/>
            </div>
        </div>
    )
}
export default ListFeedback