import React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { subDays, format } from 'date-fns';
import { apiBaseUrl } from '../../constant/constant';

// const generateLabels = () => {
//     const now = new Date(); // Lấy thời điểm hiện tại
//     const days = []; // Mảng lưu trữ các ngày trong khoảng 7 ngày

//     for (let i = 6; i >= 0; i--) {
//         const date = subDays(now, i); // Tính toán ngày trong khoảng 7 ngày
//         const formattedDate = format(date, 'dd/MM'); // Chuyển đổi ngày thành chuỗi định dạng dd/MM/yyyy
//         days.push(formattedDate); // Thêm ngày vào mảng
//     }

//     return days;
// };

// const labelsInit = generateLabels();

function CreateReportPage() {
    const [startD, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [endD, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [filter, setFilter] = React.useState(7);
    const [data, setData] = React.useState({});
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
    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/reports?end%20date=${endD}&staff%20code=S002&start%20date=${startD}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    return (
        <div className="createReport" sx={{ width: '1000px' }}>
            <Paper
                style={{
                    marginTop: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: 1160,
                    height: 300,
                }}
            >
                <h1>Báo cáo</h1>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                    <Select value={filter} sx={{ Width: 100 }} onChange={handleChange} displayEmpty>
                        <MenuItem value={7}>7 ngày</MenuItem>
                        <MenuItem value={30}>1 tháng</MenuItem>
                        <MenuItem value={90}>1 quý</MenuItem>
                    </Select>
                </FormControl>
                <div sx={{ display: 'flex', padding: '10px' }}>
                    <span>Doanh thu:</span>
                    <span>{data.revenue ? data.revenue : 0}</span>
                </div>
                <div sx={{ display: 'flex' }}>
                    <span>Số đơn hàng bán được:</span>
                    <span>{data.order_count}</span>
                </div>
                <div sx={{ display: 'flex' }}>
                    <span>Số sản phẩm bán được:</span>
                    <span>{data.product_sold ? data.product_sold : 0}</span>
                </div>
                <div sx={{ display: 'flex' }}>
                    <span>Số tiền lãi thu được:</span>
                    <span>{data.revenue ? data.revenue : 0}</span>
                </div>
            </Paper>
        </div>
    );
}

export default CreateReportPage;
