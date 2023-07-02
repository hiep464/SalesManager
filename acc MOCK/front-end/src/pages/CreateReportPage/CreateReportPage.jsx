import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './CreateReportPage.scss';

function CreateReportPage(props) {
    const rows = props.rows;
    const filter = props.filter;
    const navigate = useNavigate();
    const columns = [
        { field: 'code', headerClassName: 'header-table', headerName: 'Mã nhân viên', width: 100 },
        { field: 'name', headerClassName: 'header-table', headerName: 'Tên nhân viên', width: 130 },
        { field: 'phone', headerClassName: 'header-table', headerName: 'SĐT nhân viên', width: 130 },
        {
            field: 'revenue',
            headerClassName: 'header-table',
            headerName: 'Doanh thu',
            type: 'number',
            width: 130,
            valueFormatter: (params) => params.value.toLocaleString(),
        },
        {
            field: 'orderCount',
            headerClassName: 'header-table',
            headerName: 'Số đơn đã bán',
            type: 'number',
            width: 190,
        },
        {
            field: 'productSold',
            headerClassName: 'header-table',
            headerName: 'Số SP đã bán',
            type: 'number',
            width: 190,
        },
        {
            field: 'total_profit',
            headerClassName: 'header-table',
            headerName: 'Tiền lãi',
            type: 'number',
            width: 190,
        },
    ];
    for (let i = 0; i++; i < rows.length) {}
    const handleRowClick = (params) => {
        const code = params.row.code;
        navigate(`/report/staff/${code}/${filter}`); // Điều hướng trang đến trang chi tiết với id của hàng
    };
    return (
        <div className="createReport" style={{ width: '100%' }}>
            {/*  */}
            <Paper
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '100%',
                    height: 300,
                }}
            >
                <div style={{ minHeight: 300, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={rows.length} // Hiển thị tất cả dữ liệu trong một trang
                        disableSelectionOnClick // Vô hiệu hóa chọn hàng khi nhấp vào
                        hideFooterPagination // Ẩn phân trang ở footer
                        getRowId={(data) => data.code}
                        onRowClick={handleRowClick}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
