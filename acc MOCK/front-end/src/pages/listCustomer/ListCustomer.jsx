import './ListCustomer.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Pagination from './Pagination/Pagination';
import { useState } from 'react';
import FilterModal from './filterModal/FilterModal';

function ListCustomer(){
    const [pagination,setPagination]=useState({
        page:1,
        limit:20,
        total:10
    })
    const [isDivVisible, setDivVisible] = useState(false);
    const toggleDiv = () => {
        setDivVisible(!isDivVisible);
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'filter') {
          return;
        }
        setDivVisible(false);
      };

    const handllePageChange =(newPage) =>{
        setPagination({...pagination, page: newPage})
    }

    const handlleLimitChange =(newLimit) =>{
        setPagination({...pagination, limit: Number(newLimit)})
    }



    console.log(isDivVisible);


    return(
        <div className='pagecontent'>
            <div className='searchbar'>
                <input type="text" id='searchtext' placeholder='Tìm kiếm theo mã khách hàng, số điện thoại' />
                <button onClick={toggleDiv}>Bộ lọc<FilterAltIcon/> </button>
                {isDivVisible&& <FilterModal/>}
            </div>
            <div className='table'>
                <Pagination pagination={pagination} onPageChange={handllePageChange} onLimitChange={handlleLimitChange}/>
            </div>
        </div>
    )
}
export default ListCustomer;