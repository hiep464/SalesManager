import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { viVN } from '@mui/material/locale';
import { useNavigate } from 'react-router-dom';

function CreateReportPage(props) {
    const rows = props.rows;
    const filter = props.filter;
    const navigate = useNavigate();
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
        {
            field: 'revenue',
            headerName: 'Doanh thu',
            type: 'number',
            width: 130,
            valueFormatter: (params) => params.value.toLocaleString(),
        },
        {
            field: 'orderCount',
            headerName: 'Số đơn đã bán',
            type: 'number',
            width: 190,
        },
        {
            field: 'productSold',
            headerName: 'Số SP đã bán',
            type: 'number',
            width: 190,
        },
        {
            field: 'total_profit',
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
        <div className="createReport" style={{ width: '1100px' }}>
            {/*  */}
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
                        rows={rows}
                        columns={columns}
                        localeText={myLocaleText}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        getRowId={(data) => data.code}
                        onRowClick={handleRowClick}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
