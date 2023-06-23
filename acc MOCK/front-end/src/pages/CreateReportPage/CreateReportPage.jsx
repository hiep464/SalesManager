import React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { subDays, format } from 'date-fns';
import { apiBaseUrl } from '../../constant/constant';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { viVN } from '@mui/material/locale';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Numeral from 'react-numeral';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

function CreateReportPage() {
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState({});
    const [rows, setRows] = React.useState([]);
    const myLocaleText = {
        ...viVN,
        pagination: {
            rowsPerPage: 'Số hàng trên mỗi trang:',
            ...viVN.pagination,
        },
    };
    const columns = [
        { field: 'code', headerName: 'Mã đơn', width: 100 },
        { field: 'customerName', headerName: 'Tên khách hàng', width: 130 },
        { field: 'phone', headerName: 'SĐT khách hàng', width: 130 },
        { field: 'total', headerName: 'Tổng tiền', type: 'number', width: 130 },
        {
            field: 'orderDate',
            headerName: 'Ngày tạo đơn',
            type: 'string',
            width: 190,
        },
    ];
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/sales/reports?end%20date=${endD}&staff%20code=S002&start%20date=${startD}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/sales/reports/orders?end%20date=${endD}&staff%20code=S002&start%20date=${startD}`)
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);

    console.log(rows);
    return (
        <div className="createReport" style={{ width: '100%' }}>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <BoxItem
                    title={'Doanh thu'}
                    content={<Numeral value={1200000} format={'0,0'} />}
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
                    content={1}
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
                    title={'SP đã bán'}
                    content={3}
                    backgroundColor={'#0FD186'}
                    icon={
                        <ShoppingBasketIcon
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
                    content={<Numeral value={1100000} format={'0,0'} />}
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
                    width: 1160,
                    height: 300,
                }}
            >
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        localeText={myLocaleText}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        checkboxSelection
                        getRowId={(row) => row.code}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
