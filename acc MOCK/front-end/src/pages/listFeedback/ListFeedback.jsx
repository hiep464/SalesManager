import './ListFeedback.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paginations from './Pagination/Pagination'
import { useEffect, useState } from 'react';
import APIapp from '../../components/APIapp/APIapp';
import FeedbackItem from './FeedbackItem/FeedbackItem';

function ListFeedback(){
    const [pagination,setPagination]=useState({
        page:1,
        limit:20,
        total:1
    })
    const [feedbacks, setFeedbacks] = useState([])

    const handllePageChange =(newPage) =>{
        setPagination({...pagination, page: newPage})
    }

    const handlleLimitChange =(newLimit) =>{
        setPagination({...pagination, limit: Number(newLimit)})
    }

    useEffect(()=>{
        const fetchdata = async ()=>{
            const res =await APIapp.get(`admin/feedbacks?page=${pagination.page-1}&size=${pagination.limit}`)
            setPagination({...pagination, total: res.data.totalPages})
            setFeedbacks(res.data.content)
            console.log(res)
        }
        fetchdata()
    },[pagination.page, pagination.limit])

    console.log(feedbacks)
    

    return(
        <div className='pagecontent'>
            <div className='searchbar'>
                <input type="text" id='searchtext' placeholder='Tìm kiếm theo mã khách hàng, số điện thoại' />
                <button>Bộ lọc<FilterAltIcon/> </button>
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