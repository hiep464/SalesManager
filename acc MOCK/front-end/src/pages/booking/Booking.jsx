import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
    { field: 'code', headerName: 'Mã đơn hàng', width: 100, },
    { field: 'bookingDate', headerName: 'Ngày tạo', width: 200 },
    { field: 'bookingStatus', headerName: 'Trạng thái', width: 200 },
    { field: 'staffName', headerName: 'Nhân viên tạo', width: 150 },
    { field: 'supplerName', headerName: 'Nhà cung cấp', width: 150 },
    { field: 'total', headerName: 'Tổng tiền', width: 150 },
    
];

function Booking() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [booking, setBooking] = React.useState([])
    const getRowId = (row) => row.code
    const open = Boolean(anchorEl);
    React.useEffect(() => {
        axios.get('http://localhost:8086/admin/booking').then((Response) => {
            setBooking(Response.data.data.products);
            // console.log(Response.data.data.products)
            });
    },[])
    console.log(booking)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenDetail = () => {
        
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
                    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                    inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                />
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<FilterAltIcon />}
                >
                    Bộ lọc
                </Button>
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
                <Button startIcon={<AddIcon />} variant="contained" sx={{ marginRight: '10px' }}>
                    Tạo sản phẩm
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
                    <Box>
                        <div>
                            <span>Loại</span>
                            <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Nhãn hiệu</span> <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Giá bán</span> <br />
                            <TextField size="small" variant="outlined" />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Giá nhập</span> <br />
                            <TextField size="small" variant="outlined" />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <Button variant="contained" disableElevation>
                            Lọc
                        </Button>
                    </Box>
                </StyledMenu>
            </Paper>
            <DataGrid
                rows={booking}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleOpenDetail}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white' ,cursor:"pointer"}}
            />
        </div>
     );
}

export default Booking;