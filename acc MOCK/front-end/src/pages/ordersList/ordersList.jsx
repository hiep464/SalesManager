import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import '../CreateReportPage/CreateReportPage.scss';

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
    { field: 'code', headerClassName: 'header-table', headerName: 'Mã đơn', width: 100 },
    { field: 'customerName', headerClassName: 'header-table', headerName: 'Khách hàng', width: 200 },
    { field: 'staffName', headerClassName: 'header-table', headerName: 'Nhân viên', width: 200 },
    {
        field: 'total',
        headerClassName: 'header-table',
        headerName: 'Giá trị đơn',
        width: 150,
        valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    { field: 'quantity', headerClassName: 'header-table', headerName: 'Số lượng hàng', width: 150 },
    { field: 'status', headerClassName: 'header-table', headerName: 'Trạng thái đơn', width: 200 },
    { field: 'orderDate', headerClassName: 'header-table', headerName: 'Ngày đặt', width: 200 },
];

function OrdersList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [orders, setOrders] = React.useState([]);
    const [searchOrder, setSearchOrder] = React.useState('');
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/sales/orders`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                // setBooking(Response.products);
                console.log(response.data);
                setOrders(response.data);
            });
    }, []);
    const handleOpenDetail = (params) => {
        const code = params.row.code;
        navigate(`${code}`);
    };

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
                    onChange={(e) => setSearchOrder(e.target.value)}
                    onMouseEnter={React.useEffect(() => {
                        if (searchOrder !== '') {
                            axios
                                .get(`${apiBaseUrl}/sales/orders/code?code=${searchOrder}`, {
                                    headers: {
                                        // token: Cookies.get('token'),
                                        Authorization: getCookie('Authorization'),
                                    },
                                })
                                .then((response) => {
                                    setOrders(response.data);
                                });
                        }
                    }, [searchOrder])}
                />
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
            </Paper>
            <DataGrid
                rows={orders}
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

export default OrdersList;
