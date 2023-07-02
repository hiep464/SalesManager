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

import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import BookingBodyDetail from '../../components/bookingBodyDetail/BookingBodyDetail';

const BookingDetail = () => {
    const navigate = useNavigate()
    const {code} = useParams()
    const [bookingLines, setBookingLines] = React.useState([])
    const [bookingRequest, BookingRequest] = React.useState({})
    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/booking-line?code=${code}`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
                .then(res => { 
                            setBookingLines(res.data)
                })
        axios.get(`${apiBaseUrl}/inventory/booking?code=${code}`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
                .then (res =>  res.data)
                // .then(res => res[0])
                .then(res => {
                    console.log(res)
                    BookingRequest(res)
                    
                })
    },[])
    const handleDeleteRequest = () => {
        axios.delete(`${apiBaseUrl}/inventory/bookings/${code}`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(res => {
                navigate(`/inventory/booking`)
            })
        
    }
    const handleUpdateProductQuantity = () => {
        navigate(`/inventory/receipt_inventory/${code}`)
    //     axios.put(`${apiBaseUrl}/inventory/check_line/${code}`,"",{headers: {
    //         // token: Cookies.get('token'),
    //         Authorization: getCookie('Authorization'),
    //     }})
    //         .then(res => {
    //             alert("Đã nhập kho")
    //             window.location.reload()
    //         })
    //         .catch((e) => {
    //             alert(e)
    //         })
                
    }
    const handleReceiptInventory = () => {

    }

    return (
        <Box>
            
            <Box sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between', alignItems : "center", borderRadius: '10px'}}>
                <Grid container spacing={3} display="flex" alignItems="center">
                        
                        <Grid >
                            <h2>{code}</h2>
                        </Grid>
                        <Grid backgroundColor = {bookingRequest.bookingStatus === "Đã nhập"?"aqua":"#e49c06"} borderRadius="25px">
                            {bookingRequest.bookingStatus}
                        </Grid>
                        
                        
                       
                         
                </Grid>
                
                { bookingRequest.bookingStatus ==="Chưa nhập"?
                <Grid container spacing={3} display="flex" justifyItems="flex-end" alignItems = "center">
                    <Grid>

                        <Button size = "large" variant="contained" onClick={handleDeleteRequest}>Xóa</Button>
                    </Grid>
                    <Grid>

                        <Button size = "large" variant="contained" onClick ={handleUpdateProductQuantity}>Nhập kho</Button>
                    </Grid>
                    
                    
                </Grid> : null}
            </Box>
            <Box   sx = {{width: 'calc(82vw - 44px)', backgroundColor : "white", borderRadius: '10px'}}>
                <Box p = "12px" borderBottom = "1px solid"><h3>Thông tin phiếu</h3></Box>
                <Box>
                    
                    <Stack  p ="12px" pb = "50px" direction="row" spacing={60}>
                        <Stack spacing={2}>
                            <p>Chi nhánh kiểm : {bookingRequest.inventoryName}</p>
                            <p>Nhân viên kiểm : {bookingRequest.staffName}</p>
                        </Stack>
                        <Stack spacing={20}>
                            <p>Ngày tạo :{bookingRequest.bookingDate}</p>
                            
                        </Stack>
                        
                    </Stack>
                </Box>
            </Box>
            <Box mt = {4}>
                <BookingBodyDetail
                    rows = {bookingLines}
                 />
            </Box>
        </Box>
    )
}
export default BookingDetail;