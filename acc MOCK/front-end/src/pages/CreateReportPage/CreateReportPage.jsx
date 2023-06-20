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

function CreateReportPage() {
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState({});
    const [rows, setRows] = React.useState([]);
    const handleChange = (event) => {
        setFilter(event.target.value);
        if (event.target.value === 7) {
            setStart(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else if (event.target.value === 30) {
            setStart(format(subDays(new Date(), 30), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else {
            setStart(format(subDays(new Date(), 90), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        }
    };
    const myLocaleText = {
        ...viVN,
        pagination: {
            rowsPerPage: 'Số hàng trên mỗi trang:',
            ...viVN.pagination,
        },
    };
    const columns: GridColDef[] = [
        { field: 'code', headerName: 'code', width: 100 },
        { field: 'customerCode', headerName: 'customer Code', width: 130 },
        { field: 'total', headerName: 'total', type: 'number', width: 130 },
        {
            field: 'orderDate',
            headerName: 'order Date',
            type: 'string',
            width: 190,
        },
    ];
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/reports?end%20date=${endD}&staff%20code=S002&start%20date=${startD}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/reports/orders?end%20date=${endD}&staff%20code=S002&start%20date=${startD}`)
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);

    console.log(rows);
    return (
        <div className="createReport" style={{ width: '100%' }}>
            <Paper
                style={{
                    marginTop: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '1170px',
                    height: 250,
                }}
            >
                <Grid container spacing={2} sx={{ width: '100%', margin: '10px' }}>
                    <Grid xs={12} display={'flex'} justifyContent={'space-between'}>
                        <h1>Báo cáo</h1>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                            <Select value={filter} sx={{ Width: 100 }} onChange={handleChange} displayEmpty>
                                <MenuItem value={7}>7 ngày</MenuItem>
                                <MenuItem value={30}>1 tháng</MenuItem>
                                <MenuItem value={90}>1 quý</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <div sx={{ display: 'flex' }}>
                            <span>Doanh thu:</span>
                            <span>{data.revenue ? data.revenue.toLocaleString('en-US') : 0}</span>
                        </div>
                        <div sx={{ display: 'flex' }}>
                            <span>Số đơn hàng bán được:</span>
                            <span>{data.order_count}</span>
                        </div>
                    </Grid>
                    <Grid xs={6}>
                        <div sx={{ display: 'flex' }}>
                            <span>Số sản phẩm bán được:</span>
                            <span>{data.product_sold ? data.product_sold : 0}</span>
                        </div>
                        <div sx={{ display: 'flex' }}>
                            <span>Số tiền lãi thu được:</span>
                            <span>{data.revenue ? data.revenue.toLocaleString('en-US') : 0}</span>
                        </div>
                    </Grid>
                    <div sx={{ display: 'flex' }}></div>
                </Grid>
            </Paper>
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
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        getRowId={(row) => row.code}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
