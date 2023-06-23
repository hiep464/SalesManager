import { useState } from 'react'
import APIapp from '../../../components/APIapp/APIapp'
import './SearchCustomer.scss'

function SearchCustomer(props){
    const {data, onChangeCustomer}= props
    const [thisCustomer, setThisCustomer] = useState({})

    const handleGetCustomer= async(code)=>{
        const customer = await APIapp.get(`/admin/care/customers/${code}`)
        setThisCustomer(customer.data)
        console.log(thisCustomer)
    }

    const handleChangeCustomer= ()=>{
        if(onChangeCustomer){
            onChangeCustomer(thisCustomer)
        }
    }

    return(
        <div className='searchresult'>
            {data.map((customer, index)=>(
                <div key={index} className='item' onClick={()=>{handleGetCustomer(customer.code); handleChangeCustomer()}}>
                    <p>Mã khách hàng: {customer.code}</p>
                    <p>Tên khách hàng: {customer.name}, số điện thoại: {customer.phone}</p>
                </div>
            ))}
        </div>
    )
}

export default SearchCustomer 