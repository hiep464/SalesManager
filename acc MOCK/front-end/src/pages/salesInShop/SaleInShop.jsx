import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import './Sales.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderBody from '../../components/OrderBody/OrderBody';

const orders = [
    {
        order: 1,
        products: [
            {
                code: 'SP01',
                name: 'Quan dui LV',
                quantity: 1,
                price: 1200000,
                total: 1200000,
            },
            {
                code: 'SP03',
                name: 'Ao LV',
                quantity: 2,
                price: 1000000,
                total: 2000000,
            },
        ],
    },
    {
        order: 2,
        products: [
            {
                code: 'SP01',
                name: 'Quan dui LV',
                quantity: 2,
                price: 1200000,
                total: 2400000,
            },
        ],
    },
];

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function SalesInShop() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <div className="logo">
                            <div className="image">Hello các bạn</div>
                        </div>
                        <div className="Nav">
                            <div className="addProduct">
                                <TextField
                                    label="Add Product"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '60ch' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        {orders.map((order, index) => {
                                            let labell = 'Đơn ' + order.order;
                                            return <Tab label={labell} {...a11yProps(index)} className="tabs" />;
                                        })}
                                        <div className="addOrder" >
                                            <AddIcon fontSize="large" />
                                        </div>
                                    </Tabs>
                                </Box>
                            </div>
                            <div className="user">
                                <div>
                                    <LocationOnIcon />
                                    Chi nhánh 1
                                </div>
                                <div>
                                    <AccountCircleIcon />
                                    Nguyễn Duẩn
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={8}>
                        <OrderBody rows={orders[1].products} value={value} index={0} />
                        <OrderBody rows={orders[0].products} value={value} index={1} />
                    </Grid>
                    <Grid xs={4}>
                        <div className="addCustomer">
                            <TextField
                                label="Add Customer"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '60ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AddIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SalesInShop;
