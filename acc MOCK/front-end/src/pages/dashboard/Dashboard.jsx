import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import classNames from 'classnames/bind';
// import styles from './Dashboard.module.scss';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import Numeral from 'react-numeral';
import axios from 'axios';
import { subDays, format } from 'date-fns';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';

Chart.register(CategoryScale);

// const cx = classNames.bind(styles);

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

const history = [
    'Abc vừa đăng nhập',
    'xyz vừa tạo đơn',
    'hhdsj vừa nhập hàng',
    'dskdk vừa tạo khách hàng',
    'abc vừa đăng nhập',
];

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

function DashBoard() {
    const [filter, setFilter] = React.useState(7);
    const [revenue, setRevenue] = React.useState(0);
    const [sold, setSold] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [topProduct, setTopProduct] = React.useState([]);
    const [topCustomer, setTopCustomer] = React.useState([]);
    const [start, setStart] = React.useState(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
    const [end, setEnd] = React.useState(format(new Date(), 'dd/MM/yyyy'));
    const [labels, setLabels] = React.useState(labelsInit);
    const [data, setData] = React.useState([0]);
    const [history, setHistory] = React.useState([]);

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (event.target.value === 7) {
            const labelsInit = generateLabels();
            setLabels(labelsInit);
            setStart(format(subDays(new Date(), 6), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        } else if (event.target.value === 1) {
            setLabels([format(subDays(new Date(), 1), 'dd/MM')]);
            setStart(format(subDays(new Date(), 1), 'dd/MM/yyyy'));
            setEnd(format(subDays(new Date(), 1), 'dd/MM/yyyy'));
        } else {
            setLabels([format(new Date(), 'dd/MM')]);
            setStart(format(new Date(), 'dd/MM/yyyy'));
            setEnd(format(new Date(), 'dd/MM/yyyy'));
        }
    };

    const fetchRevenue = () => {
        return axios.get(`${apiBaseUrl}/statistical/revenue`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    const fetchHistory = () => {
        return axios.get(`${apiBaseUrl}/history`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    const fetchSold = () => {
        return axios.get(`${apiBaseUrl}/statistical/sold`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    const fetchQuantity = () => {
        return axios.get(`${apiBaseUrl}/statistical/products/quantity`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    const fetchTop3Product = () => {
        return axios.get(`${apiBaseUrl}/statistical/top3_product`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    const fetchTop3Customer = () => {
        return axios.get(`${apiBaseUrl}/statistical/top3_customer`, {
            headers: {
                // token: Cookies.get('token'),
                Authorization: getCookie('Authorization'),
            },
        });
    };

    React.useEffect(() => {
        Promise.all([fetchRevenue(), fetchSold(), fetchQuantity(), fetchTop3Product(), fetchTop3Customer(), fetchHistory()])
            .then((responses) => {
                const revenue = responses[0].data;
                setRevenue(revenue);
                const sold = responses[1].data;
                setSold(sold);
                const quantity = responses[2].data;
                setQuantity(quantity);
                const top3Product = responses[3].data;
                setTopProduct(top3Product);
                const top3Customer = responses[4].data;
                setTopCustomer(top3Customer);
                console.log(revenue, sold, quantity, top3Product, top3Customer);
                setHistory(responses[5].data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/statistical/revenue_by_period?end%20date=${end}&start%20date=${start}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [filter]);
    return (
        <div style={{ paddingTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '900px' }}>
                <div style={{ display: 'flex' }}>
                    <BoxItem
                        title={'Doanh thu'}
                        content={<Numeral value={revenue} format={'0,0'} />}
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
                        title={'Đã bán'}
                        content={sold}
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
                        title={'Tồn kho'}
                        content={quantity}
                        backgroundColor={'#FFB92A'}
                        icon={
                            <WarehouseIcon
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
                </div>
                {/* column chart */}
                <Paper sx={{ marginTop: '40px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div
                        style={{
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '20px 0',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#0088FF' }}>Doanh thu bán hàng</span>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <Select value={filter} onChange={handleChange} displayEmpty>
                                <MenuItem value={7}>7 ngày</MenuItem>
                                <MenuItem value={1}>Hôm qua</MenuItem>
                                <MenuItem value={0}>Hôm nay</MenuItem>
                            </Select>
                        </FormControl>
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
                    <h5 style={{ textAlign: 'center' }}>
                        Tổng doanh thu:
                        <Numeral
                            value={data?.reduce((accumulator, currentValue) => accumulator + currentValue) || '0'}
                            // value={0}
                            format={'0,0'}
                        />
                    </h5>
                </Paper>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                        textAlign: 'center',
                        marginBottom: '23px',
                    }}
                >
                    <Paper sx={{ width: '45%' }}>
                        <h4>Top Khách hàng</h4>
                        <List dense={true} sx={{ paddingBottom: '10px' }}>
                            {topCustomer?.map((item, key) => {
                                return (
                                    <ListItem
                                        key={key}
                                        secondaryAction={<span>{<Numeral value={item[1]} format={'0,0'} />}</span>}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>{key + 1}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item[0]} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                    <Paper sx={{ width: '45%' }}>
                        <h4>Top sản phẩm</h4>
                        <List dense={true} sx={{ paddingBottom: '10px' }}>
                            {topProduct?.map((item, key) => {
                                return (
                                    <ListItem key={key} secondaryAction={<span>{item[1]}</span>}>
                                        <ListItemAvatar>
                                            <Avatar>{key + 1}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item[0]} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </div>
            </div>
            <Paper sx={{ width: '260px', height: '460px', marginLeft: 'auto', marginLeft: '58px' }}>
                <h3 style={{ textAlign: 'center' }}>Hoạt động gần đây</h3>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0,
                        },
                        marginBottom: '0px',
                    }}
                >
                    {history?.map((item, key) => {
                        return (
                            <TimelineItem key={key}>
                                <TimelineOppositeContent />
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: 'primary.main' }} />
                                    {key === 4 ? '' : <TimelineConnector sx={{ backgroundColor: 'primary.main' }} />}
                                </TimelineSeparator>
                                <TimelineContent>{item?.staffName + " vừa " + item?.operation}</TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
                <ArrowCircleRightOutlinedIcon
                    sx={{ float: 'right', marginRight: '10px', width: '30px', height: '30px', color: 'primary.main' }}
                />
            </Paper>
        </div>
    );
}

export default DashBoard;
