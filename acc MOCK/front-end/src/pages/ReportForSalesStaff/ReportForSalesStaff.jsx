import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { subDays, format } from 'date-fns';
import { apiBaseUrl } from '../../constant/constant';

import { getCookie } from '../../utils/api';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

// var XLSX = require('xlsx');
// function exportToExcel(data) {
//     // Tạo mảng dữ liệu đầu vào cho bảng tính

//     const worksheet = XLSX.utils.json_to_sheet(data);

//     const rowStyle = { font: { bold: true }, fill: { fgColor: { rgb: 'FFFF00' } }, alignment: { horizontal: 'left' } };
//     for (let i = 1; i <= data.length; i++) {
//         const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
//         worksheet[cellRef].s = rowStyle;
//     }

//     const columnWidths = Object.keys(data[0]).map((key) => ({
//         wch: key.length + 5,
//     }));
//     worksheet['!cols'] = columnWidths;

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const dataBlob = new Blob([excelBuffer], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });
//     const fileName = 'data.xlsx';

//     // Tạo URL cho tệp Excel và tải xuống
//     const downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(dataBlob);
//     downloadLink.download = fileName;
//     downloadLink.click();
// }

const options = {
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                callback: (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const value = context.parsed.y.toLocaleString('en-US');
                    return `Doanh thu: ${value}`;
                },
            },
        },
    },
};
const columns = [
    { field: 'code', headerName: 'Mã đơn hàng', width: 120 },
    { field: 'customerName', headerName: 'Tên khách hàng', width: 140 },
    { field: 'staffName', headerName: 'Mã nhân viên', width: 140 },
    {
        field: 'phone',

        headerName: 'SĐT khách hàng',
        width: 140,
    },
    { field: 'quantity', headerName: 'Số lượng SP', width: 130 },
    {
        field: 'total',

        headerName: 'Tổng tiền  ',
        type: 'number',
        width: 200,
    },
    {
        field: 'orderDate',

        headerName: 'Ngày tạo đơn',
        width: 200,
    },
];
const generateLabels = (count) => {
    const now = new Date(); // Lấy thời điểm hiện tại
    const days = []; // Mảng lưu trữ các ngày trong khoảng 7 ngày

    for (let i = count - 1; i >= 0; i--) {
        const date = subDays(now, i); // Tính toán ngày trong khoảng 7 ngày
        const formattedDate = format(date, 'dd/MM'); // Chuyển đổi ngày thành chuỗi định dạng dd/MM/yyyy
        days.push(formattedDate); // Thêm ngày vào mảng
    }

    return days;
};

const labelsInit = generateLabels(7);

function ReportForUser() {
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [labels, setLabels] = React.useState(labelsInit);
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const navigate = useNavigate();
    // const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

    const handleRowClick = (params) => {
        const code = params.row.code;
        navigate(`/orders/${code}`); // Điều hướng trang đến trang chi tiết với id của hàng
    };

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (event.target.value === 7) {
            const labelsInit = generateLabels(7);
            setLabels(labelsInit);
            setStart(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else if (event.target.value === 30) {
            const labelsInit = generateLabels(30);
            setLabels(labelsInit);
            setStart(format(subDays(new Date(), 29), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else {
            setLabels([format(new Date(), 'dd/MM')]);
            setStart(format(new Date(), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        }
    };
    const user = JSON.parse(localStorage.getItem('sapo'));

    React.useEffect(() => {
        axios
            .get(
                `${apiBaseUrl}/statistical/revenue_by_staff_code?end%20date=${endD}&staff%20code=${user?.code}&start%20date=${startD}`,
                {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                },
            )
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/sales/orders/staffCode?code=${user?.code}&end=${endD}&start=${startD}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    return (
        <>
            {/* <div sx={{ margin: '0', padding: '0', display: 'flex' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log('rows:', rows);
                        exportToExcel(rows);
                    }}
                >
                    Xuất file excel
                </Button>
            </div> */}
            <Paper
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '20px 0',
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontSize: '24px', color: '#0088FF' }}>Doanh thu bán hàng</span>
                    <>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select value={filter} onChange={handleChange} displayEmpty>
                                <MenuItem value={7}>7 ngày</MenuItem>
                                <MenuItem value={30}>1 tháng</MenuItem>
                                <MenuItem value={0}>Hôm nay</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                </div>
                <div style={{ width: '80%', marginBottom: '20px' }}>
                    <Bar
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Doanh thu',
                                    data: data,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={options}
                    />
                </div>
            </Paper>
            <Paper
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '100%',
                    height: 'auto',
                }}
            >
                <div style={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        pageSize={orders.length} // Hiển thị tất cả dữ liệu trong một trang
                        disableSelectionOnClick // Vô hiệu hóa chọn hàng khi nhấp vào
                        hideFooterPagination // Ẩn phân trang ở footer
                        getRowId={(data) => data.code}
                        onRowClick={handleRowClick}
                    />
                </div>
            </Paper>
        </>
    );
}

export default ReportForUser;
