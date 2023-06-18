import './UpdateModal.scss'

function UpdateModal(props){


    return(
        <div className="prompt-overlay">
            <div onClick={props.clickMethod} className="overlay"></div>
            <div className="prompt-container">
                <span className="inform">Cập nhật thông tin cá nhân</span>
                <div className="form">
                    <label>Số điện thoại</label>
                    <input type="text"  />
                    <label>Email</label>
                    <input type="text" />
                    <label>Địa chỉ</label>
                    <input type="text" />
                </div>
                <div className="btn">
                    <button className="close-modal close" onClick={props.clickMethod}>Cancel</button>
                    <button className="close-modal update" >Update</button>
                </div>
            </div>
        </div>

    )
}

export default UpdateModal