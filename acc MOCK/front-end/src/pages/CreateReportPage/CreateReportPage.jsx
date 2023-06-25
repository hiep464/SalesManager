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
import { getCookie } from '../../utils/api';

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

function CreateReportPage(props) {
    const rows = props.rows;
    const myLocaleText = {
        ...viVN,
        pagination: {
            rowsPerPage: 'Số hàng trên mỗi trang:',
            ...viVN.pagination,
        },
    };
    const columns = [
        { field: 'code', headerName: 'Mã nhân viên', width: 100 },
        { field: 'name', headerName: 'Tên nhân viên', width: 130 },
        { field: 'phone', headerName: 'SĐT nhân viên', width: 130 },
        { field: 'revenue', headerName: 'Doanh thu', type: 'number', width: 130 },
        {
            field: 'order_count',
            headerName: 'Số đơn đã bán',
            type: 'number',
            width: 190,
        },
        {
            field: 'product_sold',
            headerName: 'Số SP đã bán',
            type: 'number',
            width: 190,
        },
    ];
    for (let i = 0; i++; i < rows.length) {}

    console.log(rows);
    return (
        <div className="createReport" style={{ width: '100%' }}>
            {/* <div style={{ display: 'flex', marginTop: '10px' }}>
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
                    content={data.product_sold}
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
                    content={<Numeral value={data.revenue} format={'0,0'} />}
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
            </div> */}
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
                        getRowId={(data) => data.code}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
