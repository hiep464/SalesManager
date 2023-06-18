import { useParams } from 'react-router-dom';
import './FeedbackDetail.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect, useState } from 'react';
import APIapp from '../../components/APIapp/APIapp';

function FeedbackDetail(){
    const id = useParams()

    const [feedback, setFeedback] = useState({
        "id": 0,
        "customerCode": "",
        "phone": "",
        "staffCode": "",
        "content": "",
        "status": "",
        "feedbackDate": ""
    })

    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await APIapp.get(`admin/feedbacks/${id.id}`)
                setFeedback(res.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    }, [id])

    const handleUpdate= async ()=>{
        setFeedback({...feedback, status: "Đã xử lý"})
        const res = await APIapp.post(`admin/feedbacks/${id.id}`)
        console.log(res)
    }

    const handleDelete= async ()=>{
        const res =await APIapp.delete(`admin/feedbacks/${id.id}`)
        console.log(res)
    }

    const createdate = new Date(feedback.feedbackDate)

    return(
        <div className='feedbackpage'>
            <div className='header'>
                <span className='return'>
                    <ChevronLeftIcon className='icon'/>
                    Quay lại trang danh sách
                </span>
                <div className='btn'>
                    <button className='deletebtn' onClick={handleDelete}>Xóa phản hồi</button>
                    <button className='solvedbtn' onClick={handleUpdate}>Đã xử lý</button>
                </div>
            </div>
            <div className='baseinfor'>
                <div className='title'>
                    <span>Thông tin khởi tạo</span>
                    {/* <a href="">Cập nhật</a> */}
                </div>
                <div className='infor'>
                    <div className='leftname'>
                        <p>Mã phản hồi</p>
                        <p>Mã khách hàng</p>
                        <p>Số điện thoại</p>
                    </div>
                    <div className='leftcontent'>
                        <p>: {feedback.id}</p>
                        <p>: {feedback.customerCode}</p>
                        <p>: {feedback.phone}</p>
                    </div>
                    <div className='rightname'>
                        <p>Trạng thái</p>
                        <p>Ngày tạo</p>
                    </div>
                    <div className='rightcontent'>
                        <p>: {feedback.status}</p>
                        <p>: {createdate.getDate()}/{createdate.getMonth()}/{createdate.getFullYear()}</p>
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