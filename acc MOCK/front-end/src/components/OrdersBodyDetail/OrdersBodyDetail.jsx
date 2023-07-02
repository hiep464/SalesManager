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
                getRowId={(row) => row.id}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white', minHeight: 300 }}
                pageSize={rows.length} // Hiển thị tất cả dữ liệu trong một trang
                disableSelectionOnClick // Vô hiệu hóa chọn hàng khi nhấp vào
                hideFooterPagination // Ẩn phân trang ở footer
            />
        </div>
    );
}

OrdersBodyDetail.propTypes = {
    rows: PropTypes.array,
};
//   index: PropTypes.number.isRequired,

export default OrdersBodyDetail;
