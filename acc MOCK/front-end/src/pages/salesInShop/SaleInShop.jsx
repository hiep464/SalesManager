import React, { useEffect } from 'react';
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
import Box from '@mui/material/Box';
import OrderBody from '../../components/OrderBody/OrderBody';
import Card from '@mui/material/Card';

import axios from 'axios';
import { ResultCustomerSearch, RetailCustomers, ResultProductSearch } from '../../components/ResultSearch/ResultSearch';

const orders1 = [
    {
        order: 1,
        products: [],
        customer: null,
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
    const [search, setSearch] = React.useState('');
    const [searchProduct, setSearchProduct] = React.useState('');
    const [customers, setCustomers] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [orders, setOrders] = React.useState(orders1);
    const [money, setMoney] = React.useState(0);

    useEffect(() => {
        if (search !== '') {
            axios.get('http://localhost:8086/admin/customer/search?phone=' + search).then((Response) => {
                setCustomers(Response.data);
            });
        } else {
            setCustomers([]);
        }
    }, [search]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDelete = (productId)=>{
        setOrders((currentState) => {
            const newState = [...currentState];
            const updatedOrderItems = newState[value].products.filter(item => item.code !== productId);
            newState[value].products = updatedOrderItems;

            return newState;
        })
    }
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
                                    onChange={(event) => {
                                        setSearchProduct(event.target.value);
                                    }}
                                    onMouseEnter={useEffect(() => {
                                        if (searchProduct !== '') {
                                            axios
                                                .get('http://localhost:8086/admin/product/search?code=' + searchProduct)
                                                .then((Response) => {
                                                    setProducts(Response.data);
                                                });
                                        } else {
                                            setProducts([]);
                                        }
                                    }, [searchProduct])}
                                    sx={{ m: 1, width: '60ch' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <div className="result_search">
                                    {products.map((product) => {
                                        return (
                                            <Card sx={{ minWidth: '60ch' }}>
                                                <ResultProductSearch
                                                    key={product.id}
                                                    product={product}
                                                    onClick={() => {
                                                        const product1 = {
                                                            code: product.code,
                                                            name: product.name,
                                                            quantity: 1,
                                                            price: product.price,
                                                        };
                                                        var duplicate = false;

                                                        for (var i = 0; i < orders[value].products.length; i++) {
                                                            if (orders[value].products[i].code === product.code) {
                                                                orders[value].products[i].quantity += 1;
                                                                duplicate = true;
                                                            }
                                                        }

                                                        if (duplicate === false) {
                                                            orders[value].products.push(product1);
                                                        }
                                                        setSearchProduct('');
                                                    }}
                                                />
                                            </Card>
                                        );
                                    })}
                                </div>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        {orders ? (
                                            orders.map((order, index) => {
                                                let labell = 'Đơn ' + order.order;
                                                return <Tab label={labell} {...a11yProps(index)} className="tabs" />;
                                            })
                                        ) : (
                                            <></>
                                        )}
                                        <div
                                            className="addOrder"
                                            onClick={(event) => {
                                                let newOrder = {
                                                    order: orders.length + 1,
                                                    products: [],
                                                    customer: null,
                                                };
                                                setOrders([...orders, newOrder]);
                                            }}
                                        >
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
                        {orders ? (
                            orders.map((order, index) => {
                                return (
                                    <OrderBody
                                        rows={order.products}
                                        value={value}
                                        index={index}
                                        onDeleteProduct={handleDelete}                                         
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid xs={4}>
                        {orders[value].customer === null ? (
                            <div className="addCustomer">
                                <TextField
                                    label="Add Customer"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '53ch' }}
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                    }}
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
                        ) : (
                            <ResultCustomerSearch customer={orders[value].customer} />
                        )}
                        <div className="result_search">
                            {customers.map((customer) => {
                                return (
                                    <Card sx={{ minWidth: 275 }}>
                                        <ResultCustomerSearch
                                            customer={customer}
                                            onClick={() => {
                                                orders[value].customer = customer;
                                                console.log(orders[value]);
                                                setSearch('');
                                            }}
                                        />
                                        <RetailCustomers />
                                    </Card>
                                );
                            })}
                        </div>
                        <div className="order_info">
                            <p>
                                Số lượng sản phẩm:
                                {orders[value].products.reduce((total, current) => (total += current.quantity), 0)}
                            </p>
                            <p>
                                Thành tiền:
                                {orders[value].products.reduce(
                                    (total, current) => (total += current.quantity * current.price),
                                    0,
                                )}
                            </p>
                            <TextField
                                label="Số tiền khách đưa"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '53ch' }}
                                onChange={(event) => {
                                    setMoney(event.target.value);
                                }}
                            />
                            <p>
                                Số tiền phải trả:
                                {money -
                                    orders[value].products.reduce(
                                        (total, current) => (total += current.quantity * current.price),
                                        0,
                                    )}
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SalesInShop;
