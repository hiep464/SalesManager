import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

function OrdersBodyDetail(props) {
    const { rows } = props;
    const processedRows = rows.map((row, index) => ({
        ...row,
        id: index + 1,
    }));

    const columns = [
        {
            field: 'id',
            headerName: 'STT',
            width: 75,
            sortable: false,
        },
        { field: 'productName', headerName: 'Tên sản phẩm', width: 300 },
        { field: 'size', headerName: 'Kích cỡ', width: 200 },
        { field: 'color', headerName: 'Màu sắc', width: 200 },
        { field: 'quantity', headerName: 'Số lượng', width: 100 },
        {
            field: 'price',
            headerName: 'Giá tiền',
            width: 100,
            valueFormatter: (params) => params.value.toLocaleString('en-US'),
        },
        {
            field: 'total',
            headerName: 'Tổng tiền',
            width: 150,
            valueGetter: (params) => (params.row.quantity * params.row.price).toLocaleString('en-US'),
        },
    ];

    return (
        <div role="tabpanel">
            <DataGrid
                rows={processedRows}
                columns={columns}
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
                getRowId={(row) => row.index}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white' }}
                pagination={false}
            />
        </div>
    );
}

OrdersBodyDetail.propTypes = {
    rows: PropTypes.array,
};
//   index: PropTypes.number.isRequired,

export default OrdersBodyDetail;
