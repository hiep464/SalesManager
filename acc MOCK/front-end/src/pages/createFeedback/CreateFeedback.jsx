import { red } from '@mui/material/colors';
import './CreateFeedback.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function CreateFeedback(){
    return(
        <div className='createfeedback'>
            <div className='header'>
                <span className='return'>
                    <ChevronLeftIcon className='icon'/>
                    Quay lại trang danh sách
                </span>
                <div className='btn'>
                    <button className='createbtn'>Tạo phản hồi</button>
                </div>
            </div>
            <div className='baseinfor'>
                <div className='title'>
                    <span>Thông tin khởi tạo</span>
                </div>
                <div className='infor'>
                    <label>Mã khách hàng<span className='redstar'>*</span></label>
                    <input type="text" />
                    <label>SDT khách hàng<span className='redstar'>*</span></label>
                    <input type="text" />
                </div>
            </div>
            <div className='content'>
                <div className='title'>
                    <span>Nội dung phản hồi</span>
                </div>
                <div className='input'>
                    <label>Nội dung<span className='redstar'>*</span></label>
                    <textarea name="" id="" placeholder=''></textarea>
                </div>
            </div>
        </div>
    )
}

export default CreateFeedback