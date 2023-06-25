import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { subDays, format } from 'date-fns';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { apiBaseUrl } from '../../constant/constant';
import CreateReportPage from '../CreateReportPage/CreateReportPage';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCookie } from '../../utils/api';

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

const labelsInit = generateLabels();

function ReportPage() {
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [staffs, setStaffs] = React.useState([]);
    const [staffFilter, setStaffFilter] = React.useState(5);
    const [labels, setLabels] = React.useState(labelsInit);
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState([]);
    // const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const handleChangeStaff = (event) => {
        setStaffFilter(event.target.value);
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
            setStart(format(subDays(new Date(), 30), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else {
            setLabels([format(new Date(), 'dd/MM')]);
            setStart(format(new Date(), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        }
    };

    // async function fetchData() {
    //     try {
    //         const response = await axios.get(
    //             `${apiBaseUrl}/statistical/revenue_by_staff_code?staff%20code=${staffs[staffFilter].code}&start%20date=${startD}&end%20date=${endD}`,
    //             {
    //                 headers: {
    //                     // token: Cookies.get('token'),
    //                     Authorization: getCookie('Authorization'),
    //                 },
    //             },
    //         );
    //         setData(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     async function fetchStaff() {
    //         try {
    //             const response = await axios.get(`${apiBaseUrl}/staff`, {
    //                 headers: {
    //                     // token: Cookies.get('token'),
    //                     Authorization: getCookie('Authorization'),
    //                 },
    //             });
    //             console.log(response.data);
    //             setStaffs(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     async function getStaff() {
    //         await fetchStaff();
    //         await fetchData();
    //     }

    //     getStaff();
    // }, []);

    React.useEffect(() => {
        axios
            .get(
                `${apiBaseUrl}/statistical/revenue_by_staff_code?staff%20code=S002&start%20date=${startD}&end%20date=${endD}`,
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
    return (
        <>
            <div sx={{ margin: '0', padding: '0', display: 'flex' }}>
                <Link to="/create/report">
                    <Button variant="contained">Tạo báo cáo mới</Button>
                </Link>
            </div>
            <Paper sx={{ marginTop: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '20px 0',
                        width: '1170px',
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
            <CreateReportPage filter={filter} startD={startD} endD={endD} />
        </>
    );
}

export default ReportPage;
