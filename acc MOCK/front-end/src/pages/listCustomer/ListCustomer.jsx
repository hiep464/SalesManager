import './ListCustomer.scss'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Pagination from './Pagination/Pagination';
import { useState } from 'react';
import FilterModal from './filterModal/FilterModal';
import { useEffect } from 'react';
import APIapp from '../../components/APIapp/APIapp';
import CustomerItem from './CustomerItem/CustomerItem';
import { getCookie } from '../../utils/api';

function ListCustomer(){
    const [pagination,setPagination]=useState({
        page:1,
        limit:10,
        total:1
    })
    const [customers, setCustomers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isDivVisible, setDivVisible] = useState(false);
    const toggleDiv = () => {
        setDivVisible(!isDivVisible);
    };

    const handllePageChange =(newPage) =>{
        setPagination({...pagination, page: newPage})
    }

    const handlleLimitChange =(newLimit) =>{
        setPagination({...pagination, limit: Number(newLimit)})
    }

    useEffect(()=>{
        if(searchText===""){
            const fetchData= async ()=>{
                const res =await APIapp.get(`admin/care/customers?page=${pagination.page-1}&size=${pagination.limit}`)
                setPagination({...pagination, total: res.data.totalPages})
                setCustomers(res.data.content)
                console.log(getCookie('Authorization'))
            }
            fetchData()
        }
        if(searchText!==""){
            const search=async ()=>{
                const res =await APIapp.get(`admin/care/customers?page=${pagination.page-1}&size=${pagination.limit}&searchText=${searchText}`)
                setPagination({...pagination, total: res.data.totalPages})
                setCustomers(res.data.content)
            }
            search()
        }
    },[pagination.page, pagination.limit, searchText ])

    console.log(customers)

    return(
        <div className='pagecontent1' >
            <div className='searchbar'>
                <input type="text" id='searchtext' placeholder='Tìm kiếm theo mã khách hàng, số điện thoại, tên khách hàng' onChange={(e)=>setSearchText(e.target.value)}/>
            </div>
            <div className='table'>
            <table>
                    <tr>
                        <th className='column1'>Mã khách hàng</th>
                        <th className='column2'>Tên khách hàng</th>
                        <th className='column3'>Số điện thoại</th>
                        <th className='column4'>Lần liên hệ cuối</th>
                    </tr>
                    {customers.map((customer, index)=>(
                        <CustomerItem key={index} data={customer}/>
                    ))}
                </table>
                <Pagination pagination={pagination} onPageChange={handllePageChange} onLimitChange={handlleLimitChange}/>
            </div>
        </div>
    )
}
export default ListCustomer;