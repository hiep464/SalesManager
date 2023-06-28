import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.scss'
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

const columns = [
    { field: 'code',headerClassName: 'header-table', headerName: 'Mã đơn', width: 100 },
    { field: 'bookingStatus',headerClassName: 'header-table', headerName: 'Trạng thái đặt', width: 200 },
    { field: 'staffName',headerClassName: 'header-table', headerName: 'Nhân viên tạo', width: 200 },
    { field: 'supplierName',headerClassName: 'header-table', headerName: 'Nhà cung cấp', width: 150 },
    { field: 'inventoryName',headerClassName: 'header-table', headerName: 'Kho', width: 150 },
    { field: 'total',headerClassName: 'header-table', headerName: 'Giá trị đơn', width: 200 },
    { field: 'bookingDate',headerClassName: 'header-table', headerName: 'Ngày đặt', width: 200 },

];
const bookingsStatus = ["Đã nhập", "Chưa nhập"]

function Booking() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [booking, setBooking] = React.useState([])
    const [searchBooking, setSearchBooking] = React.useState('')
    
    const [bookingStatus,setBookingStatus] = React.useState('')
    const [suppliers,setSuppliers] = React.useState([])
    const [supplierName,setSupplierName] = React.useState('')

    const [inventories, setInventories] = React.useState([])
    const [inventoryName, setInventoryName] = React.useState('')

    const [staffs, setStaffs] = React.useState([])
    const [staffName, setStaffName] = React.useState('')


    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    
    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/bookings`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then((response) => {
                // setBooking(Response.products);
                console.log(response.data);
                setBooking(response.data);
            });
        axios.get(`${apiBaseUrl}/staffs/inventory`,{headers: {
            Authorization: getCookie('Authorization'),
        }})
            .then((res) => {
                setStaffs(res.data)
            })
        axios.get(`${apiBaseUrl}/inventory/inventories`,{headers: {
            Authorization: getCookie('Authorization'),
        }})
            .then((res) => {
                setInventories(res.data)
            })
        axios.get(`${apiBaseUrl}/inventory/suppliers`,{headers: {
            Authorization: getCookie('Authorization'),
        }})
            .then((res) => {
             
                setSuppliers(res.data)
            })
    },[])
    console.log(booking)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setStaffName('')
        setInventoryName('')
        setBookingStatus('')
        setSupplierName('')
        setAnchorEl(null);
    };
    const handleOpenDetail = (params) => {
        const code = params.row.code
        navigate(`${code}`)
    }
    const handleFilter = () => {
        axios.get(`${apiBaseUrl}/inventory/bookings/filters`,{
            params : {
                bookingStatus : bookingStatus,
                supplierName : supplierName,
                inventoryName :inventoryName,
                staffName: staffName
            },
            headers: {
            Authorization: getCookie('Authorization'),
        }})
        .then((res) => {setBooking(res.data)})
    }
 
    
    return ( 
        <div style={{ width: 'calc(82vw - 44px)' }}>
            <Paper
                component="form"
                sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, border: '1px' }}
                    placeholder="Tìm kiếm theo mã đơn"
                    onChange={(e) => setSearchBooking(e.target.value)}
                    onMouseEnter = {React.useEffect(() => {
                        if(searchBooking !== '') {
                            axios
                                .get(`${apiBaseUrl}/inventory/bookings/code?code=${searchBooking}`,{headers: {
                                                            // token: Cookies.get('token'),
                                        Authorization: getCookie('Authorization'),
                                    }})
                                .then((response) => {
                                    // setBooking(Response.products);
                                    
                                    setBooking(response.data)
                                });
                        }
                    })}
                />
                <Divider sx={{ height: 28, margin: '4px 20px', padding: "4px 8px", width: "20%"}} orientation="vertical" />
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<FilterAltIcon />}
                    width = {20}
                >
                    Bộ lọc
                </Button>
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                        navigate('create');
                    }}
                    variant="contained"
                    sx={{ marginRight: '10px' }}
                >
                    Tạo đơn đặt
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <Box p = {"4px 16px"} >
                        <div>
                            <span>Trang thái</span>
                            <br />
                            <Select
                                size="small"
                                sx={{ width: '100%'}}
                                value={bookingStatus}
                                onChange={(e) => {
                                    setBookingStatus(e.target.value);
                                }}
                            >
                                {bookingsStatus?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </div>
                        <div>
                            <span>Nhà cung cấp</span> <br />
                            <Select
                                size="small"
                                sx={{ width: '100%'}}
                                value={supplierName}
                                onChange={(e) => {
                                    setSupplierName(e.target.value);
                                }}
                            >
                                {suppliers?.map((item, index) => (
                                        <MenuItem key={index} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </div>
                        <div>
                            <span>Kho</span> <br />
                            <Select
                                size="small"
                                sx={{ width: '100%'}}
                                value={inventoryName}
                                onChange={(e) => {
                                    setInventoryName(e.target.value);
                                }}
                            >
                                {inventories?.map((item, index) => (
                                        <MenuItem key={index} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </div>
                        <div>
                            <span>Nhân viên</span> <br />
                            <Select
                                size="small"
                                sx={{ width: '100%'}}
                                value={staffName}
                                onChange={(e) => {
                                    setStaffName(e.target.value);
                                }}
                            >
                                {staffs?.map((item, index) => (
                                        <MenuItem key={index} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </div>
                        <Button variant="contained" onClick={handleFilter} disableElevation>
                            Lọc
                        </Button>
                    </Box>
                </StyledMenu>
            </Paper>
            <DataGrid
                rows={booking}
                columns={columns}
                // getRowId={getRowId}
                onRowClick={handleOpenDetail}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            `Kết quả từ ${from} đến ${to} trên tổng số ${count}`,
                        labelRowsPerPage: 'Hiển thị',
                    },
                }}
                getRowId={(row) => row.code}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white' }}
            />
        </div>
    );
}

export default Booking;
