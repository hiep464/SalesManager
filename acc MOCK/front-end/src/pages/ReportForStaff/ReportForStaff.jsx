import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getCookie } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constant/constant';
import axios from 'axios';
import Numeral from 'react-numeral';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { subDays, format } from 'date-fns';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const BoxItem = function ({ title, content, backgroundColor, icon, noMargin }) {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                width: '260px',
                height: '158px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '6px',
                marginRight: noMargin ? '0' : 'auto',
            }}
        >
            <Button sx={{ width: '100%', height: '100%' }} endIcon={icon}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '123px',
                    }}
                >
                    <span style={{ fontSize: '20px', color: 'black' }}>{title}</span>
                    <span style={{ fontSize: '18px', color: backgroundColor }}>{content}</span>
                </div>
            </Button>
        </Box>
    );
};

function ReportForStaff() {
    const params = useParams();
    const staffCode = params.staffCode;
    const filter = params.filter;
    const [data, setData] = React.useState({});
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [orders, setOrders] = React.useState([]);
    React.useEffect(() => {
        if (filter === 7) {
            setStart(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else if (filter === 30) {
            setStart(format(subDays(new Date(), 29), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else {
            setStart(format(new Date(), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        }
        axios
            .get(`${apiBaseUrl}/sales/reports?end%20date=${endD}&staff%20code=${staffCode}&start%20date=${startD}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
        axios
            .get(
                `${apiBaseUrl}/sales/reports/orders?end%20date=${endD}&staff%20code=${staffCode}&start%20date=${startD}`,
                {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                },
            )
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    const columns = [
        { field: 'code', headerName: 'Mã đơn hàng', width: 100 },
        { field: 'name', headerName: 'Tên khách hàng', width: 130 },
        { field: 'staff_code', headerName: 'Mã nhân viên', width: 130 },
        { field: 'email', headerName: 'Email khách hàng', width: 130 },
        {
            field: 'phone',
            headerName: 'SĐT khách hàng',
            width: 130,
        },
        { field: 'quantity', headerName: 'Số lượng SP', width: 130 },
        {
            field: 'total',
            headerName: 'Tổng tiền  ',
            type: 'number',
            width: 190,
        },
        {
            field: 'order_date',
            headerName: 'Ngày tạo đơn',
            width: 190,
        },
    ];
    return (
        <div style={{ width: '1170px' }}>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <BoxItem
                    title={'Doanh thu'}
                    content={<Numeral value={data.revenue} format={'0,0'} />}
                    backgroundColor={'#0089FF'}
                    icon={
                        <AttachMoneyIcon
                            sx={{
                                width: '72px',
                                height: '72px',
                                backgroundColor: '#0089FF',
                                color: 'white',
                                borderRadius: '50%',
                            }}
                        />
                    }
                />
                <BoxItem
                    title={'Đơn đã bán'}
                    content={data.order_count}
                    backgroundColor={'#0089FF'}
                    icon={
                        <ShoppingBasketIcon
                            sx={{
                                width: '72px',
                                height: '72px',
                                backgroundColor: '#0089FF',
                                color: 'white',
                                borderRadius: '50%',
                            }}
                        />
                    }
                />
                <BoxItem
                    title={'SP đã bán'}
                    content={data.product_sold}
                    backgroundColor={'#0FD186'}
                    icon={
                        <CheckroomIcon
                            sx={{
                                width: '72px',
                                height: '72px',
                                backgroundColor: '#0FD186',
                                color: 'white',
                                borderRadius: '50%',
                            }}
                        />
                    }
                />
                <BoxItem
                    title={'Lợi nhuận'}
                    content={<Numeral value={data.total_profit} format={'0,0'} />}
                    backgroundColor={'#FFB92A'}
                    icon={
                        <AttachMoneyIcon
                            sx={{
                                width: '72px',
                                height: '72px',
                                backgroundColor: '#FFB92A',
                                color: 'white',
                                borderRadius: '50%',
                            }}
                        />
                    }
                    noMargin
                />
            </div>
            <Paper
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: 1170,
                    height: 300,
                }}
            >
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        getRowId={(data) => data.code}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default ReportForStaff;
