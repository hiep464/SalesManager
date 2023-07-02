import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import axios from 'axios';
import Numeral from 'react-numeral';
import { useParams, useNavigate, Await } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import BookingBodyDetail from '../../components/bookingBodyDetail/BookingBodyDetail';
import DoneIcon from '@mui/icons-material/Done';
const ReceiptInventoryDetail = () => {
    const navigate = useNavigate()
    const { code } = useParams()
    const supplierName = ''
    const [supplier,setSupplier] = React.useState({})
    const [bookingLines, setBookingLines] = React.useState([])
    const [bookingRequest, setBookingRequest] = React.useState({})
    const [message,setMessage] = React.useState('')
    const [warning, setWarning] = React.useState('')
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [refresh, setRefresh] = React.useState(0)
    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/booking-line?code=${code}`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            }
        })
            .then(res => {
                setBookingLines(res.data)
            })
        const getBookingRequest = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}/inventory/receipt_inventory?code=${code}`, {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    }
                })
                console.log(res.data)
                if (res) setBookingRequest(res.data);
                const response = await axios.get(`${apiBaseUrl}/inventory/suppliers/name?name=${res.data.supplierName}`, {
                    headers: {
                        Authorization: getCookie('Authorization'),
                    }
                })
                setSupplier(response.data);
            } catch (err) {
                <Alert severity="error">{err.response.data.message}</Alert>
               
            }
        }
        getBookingRequest()



    }, [refresh])



const handleConfirmUpdateProductQuantity = () => {
    axios.put(`${apiBaseUrl}/inventory/booking/receipt/${code}`, "", {
        headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }
    })
        .then(res => {
            setOpen1(false);
            alert('Đã nhập kho')
            setRefresh(refresh + 1)
            
        })
        .catch((e) => {
            alert(e.response.data.message)
        })
    
        setOpen2(false);
}
const handleClose = () => {
    setOpen1(false);
    setOpen2(false);
};
const handleConfirmPay = () => {

    axios.put(`${apiBaseUrl}/inventory/booking/pay/${code}`, "", {
        headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }
    } ) 
        .then (() => {
            setOpen2(false);
            alert('Đã thanh toán')

            setRefresh(true)
        })
        .catch((e) => {
            alert(e.response.data.message)

        })
    
        setOpen1(false);
}
const handleUpdateProductQuantity = () => {
    
    setMessage('Bạn có chắc chắn muốn nhập kho đơn hàng này?');
    setWarning('Sau khi nhập sẽ không thể hoàn tác được');
    setOpen1(true);
};
const handlePay = () => {
    
    setMessage('Bạn có chắc chắn muốn thanh toán đơn hàng này?');
    setWarning('Sau khi thanh toán sẽ không thể hoàn tác được');
    setOpen2(true);
};

return (
    <Box>
        <Dialog
            open={open1}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">{warning}</DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleConfirmUpdateProductQuantity} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={open2}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">{warning}</DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleConfirmPay} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
        <Box sx={{ width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between', alignItems: "center", borderRadius: '10px' }}>
            <Grid container spacing={3} display="flex" alignItems="center">

                 <Grid >
                    <h2>{code}</h2>
                </Grid>
                <Grid backgroundColor={bookingRequest.bookingStatus === "Đã nhập" ? "aqua" : "#e49c06"} borderRadius="25px" >
                    {bookingRequest.bookingStatus}
                </Grid>




            </Grid>
            {/* <Grid sx={{ float: 'right', display: "flex", justifyItems: "flex-end" }}>
                <Button onClick={handleReceiptInventory} size="large" variant="contained">Nhập kho</Button>
            </Grid> */}
            {bookingRequest.bookingStatus === "Chưa nhập" ?
                <Grid container spacing={3} display="flex" justifyItems="flex-end" alignItems="center">
                   
                    <Grid>

                        <Button size="large" variant="contained" onClick={handleUpdateProductQuantity}>Nhập kho</Button>
                    </Grid>


                </Grid> : null}
        </Box>
      
        <Box mt={4} sx={{ width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between' }}>
            <Box borderRadius={4} width={'60%'} backgroundColor={'white'}>


            <Box borderRadius={'6px'} width={'100%'} backgroundColor={'white'}>
                   
                    <h3 style={{ marginLeft: '20px' }}>Thông tin nhà cung cấp</h3>
                        <List dense={true} width = {'100%'}>
                            <ListItem sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '50%', display: 'flex', alignItems: 'center' }}>{supplier.name}</Box>
                                </ListItem>
                            <ListItem sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Điện thoại :" />
                                    {/* <span>{suppliers?.find(item => item.code === supplier)}</span> */}
                                    <span>{supplier.phone}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Email :" />
                                    <span>{supplier.email}</span>
                                </Box>
                            </ListItem>
                            <ListItem sx={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Địa chỉ :" />
                                    <span>{supplier.address}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Tiền nợ :" />
                                    <Numeral value={supplier.debtMoney} format={'0,0'} />
                                </Box>
                            </ListItem>
                        </List>
                   
                </Box>


            </Box>

            <Box borderRadius={4} width={'38%'} backgroundColor={'white'} paddingBottom={'8px'} >
                <h3 style={{ marginLeft: '10px' }}>Thông tin đơn nhập hàng</h3>
                <List dense={true}>
                    <ListItem>
                        <ListItemText primary="Kho :" />
                        <TextField type='text' value={bookingRequest.inventoryName} />

                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Nhân viên :" />
                        <TextField type='text' value={bookingRequest.staffName} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Ngày nhập kho:" />
                        <TextField type='text' value={bookingRequest.receiptDate} />
                      
                        
                    </ListItem>
                </List>
            </Box>
        </Box>
        <Box sx={{ width: 'calc(82vw - 44px)', backgroundColor: "white", borderRadius: '10px', marginTop: '12px' }}>
            <Box p={'12px'}>{bookingRequest.bookingStatus === "Đã nhập" ? <Grid spacing={3} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} ><DoneIcon sx={{ borderRadius: "50px", padding: '4px', backgroundColor: "aqua", marginRight: '4px' }} />Đơn hàng đã nhập kho </Grid> : <Grid spacing={3} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}><CloseIcon sx={{ borderRadius: "50px", padding: '4px', backgroundColor: "#e49c06", marginRight: '4px' }} /> Đơn hàng chưa nhập kho</Grid>}</Box>
        </Box>
        <Box sx={{ width: 'calc(82vw - 44px)', backgroundColor: "white", borderRadius: '10px', marginTop: '12px' }}>
            <Box p={'12px'}>{bookingRequest.payStatus === "Đã thanh toán" 
                ? <Grid spacing={3} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} >
                    <DoneIcon sx={{ borderRadius: "50px", padding: '4px', backgroundColor: "aqua", marginRight: '4px' }} />
                        Đã thanh toán đơn hàng 
                </Grid> 
                : <Grid spacing={3} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Grid sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                    <MonetizationOnIcon sx={{ borderRadius: "50px", padding: '4px', color: "#fff", backgroundColor: '#ccc', marginRight: '4px' }} /> 
                    Đơn hàng chưa thanh toán
                    </Grid>
                    <Grid>
                        <Button sx = {{backgroundColor: '#1976d2',padding: '8px', borderRadius: '16px', color: '#fff'}} onClick={handlePay}>Thanh toán</Button>
                    </Grid>
                </Grid>}
            </Box>
        </Box>
        <Box mt={4}>
            <BookingBodyDetail
                rows={bookingLines}
            />
        </Box>
    </Box>
)
}
export default ReceiptInventoryDetail;