import { useState } from 'react'
import './UpdateModal.scss'
import APIapp from '../../../components/APIapp/APIapp'

function UpdateModal(props){
    const data = props.data
    const [customer, setCustomer] = useState({
        code: data.code,
        name: data.name,
        email: data.email,
        phone: data.phone, 
        lastContact: data.lastContact
    })
    console.log(customer)

    const handleUpdate= async ()=>{
        const res= await APIapp.post(`/admin/care/customers/${data.code}`, customer)
        console.log(res)
        window.alert("Cập nhật thành công!")
        props.reload()
        props.clickMethod()
    }

    return(
        <div className="prompt-overlay">
            <div onClick={props.clickMethod} className="overlay"></div>
            <div className="prompt-container">
                <span className="inform">Cập nhật thông tin cá nhân</span>
                <div className="form">
                    <label>Tên</label>
                    <input type="text" value={customer.name}  onChange={(e)=>{setCustomer({...customer, name: e.target.value})}}/>
                    <label>Số điện thoại</label>
                    <input type="text" value={customer.phone} onChange={(e)=>{setCustomer({...customer, phone: e.target.value})}}/>
                    <label>Email</label>
                    <input type="text" value={customer.email} onChange={(e)=>{setCustomer({...customer, email: e.target.value})}}/>
                </div>
                <div className="btn">
                    <button className="close-modal close" onClick={props.clickMethod}>Cancel</button>
                    <button className="close-modal update" onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>

    )
}

export default UpdateModal