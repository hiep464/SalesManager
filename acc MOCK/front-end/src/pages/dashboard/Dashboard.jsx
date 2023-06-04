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

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    display: false,
                },
            },
        ],
        x: {
            grid: {
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};

const topCustomer = [
    { name: 'Nguyễn Công Duẩn', buy: '90,000' },
    { name: 'Nguyễn Bá Duy', buy: '90,000' },
    { name: 'Lê Văn Bảo', buy: '90,000' },
];

const topProduct = [
    { name: 'Áo polo', sold: '100' },
    { name: 'Áo khoác', sold: '100' },
    { name: 'Quần jean', sold: '100' },
];

function DashBoard() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{ paddingTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '900px' }}>
                <div style={{ display: 'flex' }}>
                    <BoxItem
                        title={'Doanh thu'}
                        content={'100,000'}
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
                        content={'100'}
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
                        content={'100'}
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
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                // sx={{ padding: '12px 10px'}}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ width: '80%', marginBottom: '20px' }}>
                        <Bar data={data} options={options} />
                    </div>
                    <h5 style={{ textAlign: 'center' }}>Tổng doanh thu: 50,000</h5>
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
                            {topCustomer.map((item, key) => {
                                return (
                                    <ListItem key={key} secondaryAction={<span>{item?.buy}</span>}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item?.name} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                    <Paper sx={{ width: '45%' }}>
                        <h4>Top sản phẩm</h4>
                        <List dense={true} sx={{ paddingBottom: '10px' }}>
                            {topProduct.map((item, key) => {
                                return (
                                    <ListItem key={key} secondaryAction={<span>{item?.sold}</span>}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item?.name} />
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
                    {history.map((key, item) => {
                        return (
                            <TimelineItem key={key}>
                                <TimelineOppositeContent />
                                <TimelineSeparator>
                                    <TimelineDot sx={{ backgroundColor: 'primary.main' }} />
                                    {item === 4 ? '' : <TimelineConnector sx={{ backgroundColor: 'primary.main' }} />}
                                </TimelineSeparator>
                                <TimelineContent>{history[item]}</TimelineContent>
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
