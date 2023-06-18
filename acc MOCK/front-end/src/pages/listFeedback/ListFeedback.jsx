import './ListFeedback.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paginations from './Pagination/Pagination'
import { useState } from 'react';

function ListFeedback(){
    const [pagination,setPagination]=useState({
        page:1,
        limit:20,
        total:10
    })

    

    const handllePageChange =(newPage) =>{
        setPagination({...pagination, page: newPage})
    }

    const handlleLimitChange =(newLimit) =>{
        setPagination({...pagination, limit: Number(newLimit)})
    }

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
                </table>
                <Paginations pagination={pagination} onPageChange={handllePageChange} onLimitChange={handlleLimitChange}/>
            </div>
        </div>
    )
}
export default ListFeedback