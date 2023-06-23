import React from 'react';
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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const generateLabels = () => {
    const now = new Date(); // Lấy thời điểm hiện tại
    const days = []; // Mảng lưu trữ các ngày trong khoảng 7 ngày

    for (let i = 6; i >= 0; i--) {
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
    const [staffFilter, setStaffFilter] = React.useState(0);
    const [labels, setLabels] = React.useState(labelsInit);
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState([]);
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const handleChangeStaff = (event) => {
        setStaffFilter(event.target.value);
    };
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/staff`)
            .then((response) => {
                setStaffs(response.data);
            })
            .catch((error) => console.log(error));
    });
    React.useEffect(() => {
        axios
            .get(
                `${apiBaseUrl}/statistical/revenue_by_staff_code?staff%20code=S002&start%20date=${startD}&end%20date=${endD}`,
            )
            // ${staffs[staffFilter].code}
            .then((response) => {
                console.log(response.data);
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
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                            <Select value={staffFilter} sx={{ Width: 100 }} onChange={handleChangeStaff} displayEmpty>
                                <MenuItem value={1}>Duẩn</MenuItem>
                                <MenuItem value={2}>Duy</MenuItem>
                                <MenuItem value={3}>Bảo</MenuItem>
                                <MenuItem value={4}>Hiệp</MenuItem>
                                <MenuItem value={0}>Tất cả</MenuItem>
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DatePicker
                                    label="Ngày bắt đầu"
                                    value={startD}
                                    onChange={(newValue) => setStart(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                <DatePicker
                                    label="Ngày kết thúc"
                                    value={endD}
                                    onChange={(newValue) => setEnd(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
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
            <CreateReportPage />
        </>
    );
}

export default ReportPage;
