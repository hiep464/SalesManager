import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./CheckInventoryDetail.scss"
import CheckInventoryRequestDetail from '../../components/requestCheckInventoryDetail/CheckInventoryRequestDetail';
const CheckInventoryDetail = () => {
    const navigate = useNavigate()
    const {code} = useParams()
    const [checkLines, setCheckLines] = React.useState([])
    const [checkInvetoryRequest, setCheckInvetoryRequest] = React.useState({})
    React.useEffect(() => {
        axios.get(`http://localhost:8086/admin/check_line?checkCode=${code}`)
                .then(res => { 
                            setCheckLines(res.data.data.checkLines)
                })
        axios.get(`http://localhost:8086/admin/check_inventory/code?code=${code}`)
                .then(res => {
                    setCheckInvetoryRequest(res.data.data)
                    
                })
    },[])
    const handleDeleteRequest = () => {
        axios.delete(`http://localhost:8086/admin/check_inventory/${code}`)
              .then(res => {
                    navigate("/checkInventory")
                })
        
    }
    const handleUpdateProductQuantity = () => {
        axios.post(`http://localhost:8086/admin/check_line/${code}`)
            .then(res => {
                alert("Đã cập nhập số lượng trong kho")
                window.location.reload()
            })
                
    }

    return (
        <Box>
            <Box sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between', alignItems : "center"}}>
                <Grid container spacing={3} display="flex" alignItems="center">
                  
                        <Grid >
                            <h2>{code}</h2>
                        </Grid>
                        <Grid backgroundColor = {checkInvetoryRequest.status === "Đã cập nhập số lượng"?"aqua":"#e49c06"} borderRadius="25px">
                            {checkInvetoryRequest.status}
                        </Grid>
                         
                </Grid>
                { checkInvetoryRequest.status ==="Đang kiểm hàng"?
                <Grid container spacing={3} display="flex" justifyItems="flex-end" alignItems = "center">
                    <Grid>

                        <Button size = "large" variant="contained" onClick={handleDeleteRequest}>Xóa</Button>
                    </Grid>
                    <Grid>

                        <Button size = "large" variant="contained" onClick ={handleUpdateProductQuantity}>Cân Bằng kho</Button>
                    </Grid>
                    
                    
                </Grid> : null}
            </Box>
            <Box   sx = {{width: 'calc(82vw - 44px)', backgroundColor : "white"}}>
                <Box p = "12px" borderBottom = "1px solid"><h3>Thông tin phiếu</h3></Box>
                <Box>
                    
                    <Stack  p ="12px" pb = "50px" direction="row" spacing={60}>
                        <Stack spacing={2}>
                            <p>Chi nhánh kiểm : Chi nhánh 1</p>
                            <p>Nhân viên kiểm : {checkInvetoryRequest.staffName}</p>
                        </Stack>
                        <Stack spacing={20}>
                            <p>Ngày tạo :</p>
                            
                        </Stack>
                        
                    </Stack>
                </Box>
            </Box>
            <Box mt = {4}>
                <CheckInventoryRequestDetail
                    rows = {checkLines}
                 />
            </Box>
        </Box>
    )
}

export default CheckInventoryDetail;