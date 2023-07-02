import { useNavigate, useParams } from 'react-router-dom';
import './FeedbackDetail.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect, useState } from 'react';
import APIapp from '../../components/APIapp/APIapp';

function FeedbackDetail(){
    const id = useParams()
    const navigate = useNavigate()
    const [solveButtonStyle, setStyle]=useState({
        display: 'block'
    }) 
    const [feedback, setFeedback] = useState({
        "id": 0,
        "customerCode": "",
        "phone": "",
        "staffCode": "",
        "content": "",
        "status": "",
        "feedbackDate": ""
    })
    const [customer, setCustomer] = useState({})
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await APIapp.get(`admin/care/feedbacks/${id.id}`)
                setFeedback(res.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    }, [id, reload])
    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await APIapp.get(`admin/care/customers/${feedback.customerCode}`)
                console.log(feedback)
                console.log(res)
                setCustomer(res.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    }, [feedback])
    useEffect(()=>{
        if(feedback.status ==='S2'){
            setStyle({...solveButtonStyle, display: 'none'})
        } 
    }, [feedback])

    const handleUpdate= async ()=>{
        const confirmed = window.confirm("Bạn có chắc chắn muốn xác nhận đã xử lý xong phản hồi này ?")
        if(confirmed){
            const res = await APIapp.post(`admin/care/feedbacks/${id.id}`, feedback)
            console.log(res)
            window.alert("Cập nhật thành công!")
            setReload(!reload)
        }
    }

    const handleReturn= ()=>{
        navigate('/care/feedbacks')
    }

    const createdate = new Date(feedback.feedbackDate)

    return(
        <div className='feedbackpage'>
            <div className='header'>
                <span className='return' onClick={handleReturn}>
                    <ChevronLeftIcon className='icon'/>
                    Quay lại trang danh sách
                </span>
                <div className='btn'>
                    {/* <button className='deletebtn' onClick={handleDelete}>Xóa phản hồi</button> */}
                    <button className='solvedbtn' onClick={handleUpdate} style={solveButtonStyle}>Đã xử lý</button>
                </div>
            </div>
            <div className='baseinfor'>
                <div className='title'>
                    <span>Thông tin khởi tạo</span>
                    {/* <a href="">Cập nhật</a> */}
                </div>
                <div className='infor'>
                    <div className='leftname'>
                        <p>Tên khách hàng</p>
                        <p>Mã khách hàng</p>
                        <p>Số điện thoại</p>
                    </div>
                    <div className='leftcontent'>
                        <p>: {customer.name}</p>
                        <p>: {feedback.customerCode}</p>
                        <p>: {feedback.phone}</p>
                    </div>
                    <div className='rightname'>
                        <p>Trạng thái</p>
                        <p>Ngày tạo</p>
                    </div>
                    <div className='rightcontent'>
                        <p>: {(feedback.status==='S1')?"Chưa xử lý":"Đã xử lý"}</p>
                        <p>: {createdate.getDate()}/{createdate.getMonth()+1}/{createdate.getFullYear()}</p>
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='title'>
                    <span>Nội dung phản hồi</span>
                </div>
                <p>{feedback.content}</p>
            </div>
        </div>
    )
}

export default FeedbackDetail