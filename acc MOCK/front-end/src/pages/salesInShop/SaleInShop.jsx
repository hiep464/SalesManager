import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import OrderBody from '../../components/OrderBody/OrderBody';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCookie } from '../../utils/api';
import { NumericFormat } from 'react-number-format';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from 'axios';
import { ResultCustomerSearch, RetailCustomers, ResultProductSearch } from '../../components/ResultSearch/ResultSearch';
import AddCustomer from '../../components/AddCustomer/AddCustomer';
import { apiBaseUrl } from '../../constant/constant';

const orders1 = [
    {
        order: 1,
        products: [],
        customer: null,
    },
];

// const user = JSON.parse(localStorage.getItem('sapo'));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SalesInShop() {
    const [value, setValue] = React.useState(0);
    const [addCustomer, setAddCustomer] = React.useState(false);
    // const [chooseInventory, setChooseInventory] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [searchProduct, setSearchProduct] = React.useState('');
    const [customers, setCustomers] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [inventory, setInventory] = React.useState([]);
    const [inventoryData, setInventoryData] = React.useState('chi nhánh 1');
    const [orders, setOrders] = React.useState(orders1);
    const [money, setMoney] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [warning, setWarning] = React.useState('');
    const [deleteId, setDeleteId] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    useEffect(() => {
        if (search !== '') {
            axios
                .get(`${apiBaseUrl}/care/customers?phone=` + search, {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                })
                .then((Response) => {
                    setCustomers(Response.data.content);
                });
        } else {
            setCustomers([]);
        }
    }, [search]);

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/inventories`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((Response) => {
                setInventory(Response.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('sapo'));
        axios.get(`${apiBaseUrl}/auth/user/info?id=${user?.userId}`).then((response) => {
            setUserInfo(response.data);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setMoney(orders[newValue]?.products.reduce((total, current) => (total += current.quantity * current.price), 0));
    };

    const createOrder = () => {
        let total = orders[value].products.reduce((total, current) => (total += current.quantity * current.price), 0);
        let totalQuantity = orders[value].products.reduce(
            (totalQuantity, current) => (totalQuantity += current.quantity),
            0,
        );
        let orderLines = orders[value].products;
        orderLines.forEach((line) => {
            line.productCode = line.code;
            delete line.code;
        });
        axios
            .post(
                `${apiBaseUrl}/sales/orders`,
                {
                    orderLines: orderLines,
                    orderTable: {
                        customerCode: orders[value].customer.code,
                        staffCode: userInfo.code,
                        quantity: totalQuantity,
                        status: 'success',
                        total: total,
                    },
                },
                {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                },
            )
            .then((response) => {
                console.log(response);
                handleDeleteOrderAfterCreate(value);
            });
        setMoney(0);
    };

    const handleAddCustomer = (event) => {
        setAddCustomer(true);
    };

    const handleAttribute = (id, attributeID) => {
        orders[value].products[id].attributeID = attributeID;
    };

    const handleCloseAddCustomer = (event) => {
        setAddCustomer(false);
    };
    // handle ChooseInventory

    const handleChangeInventoryData = (event) => {
        setInventoryData(event.target.value);
    };

    const handleDelete = (productId) => {
        setOrders((currentState) => {
            const newState = [...currentState];
            const updatedOrderItems = newState[value].products.filter((item) => item.attributeID !== productId);
            newState[value].products = updatedOrderItems;
            setMoney(
                newState[value]?.products.reduce((total, current) => (total += current.quantity * current.price), 0),
            );
            return newState;
        });
    };

    const handleUp = (productId) => {
        setOrders((currentState) => {
            const newState = JSON.parse(JSON.stringify(currentState));
            const updatedOrderItems = newState[value];

            const updatedProducts = updatedOrderItems.products.map((product) => {
                if (product.attributeID === productId) {
                    if (product.quantity + 1 > product.inventory_quantity) {
                        alert('Xin lỗi ! kho chỉ còn lại ' + product.inventory_quantity + ' ' + product.name);
                        return product;
                    } else {
                        return { ...product, quantity: product.quantity + 1 };
                    }
                }
                return product;
            });

            updatedOrderItems.products = updatedProducts;

            setMoney(updatedProducts?.reduce((total, current) => (total += current.quantity * current.price), 0));
            return newState;
        });
    };

    const handleDown = (productId) => {
        setOrders((currentState) => {
            const newState = JSON.parse(JSON.stringify(currentState));
            const updatedOrderItems = newState[value];

            const updatedProducts = updatedOrderItems.products.map((product) => {
                if (product.attributeID === productId) {
                    if (product.quantity - 1 <= 0) {
                        return null; // Trả về null để đánh dấu sản phẩm cần bị xóa
                    } else {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                }
                return product;
            });

            // Loại bỏ sản phẩm có giá trị là null
            updatedOrderItems.products = updatedProducts.filter((product) => product !== null);

            setMoney(
                updatedProducts?.reduce(
                    (total, current) => (total += (current?.quantity || 0) * (current?.price || 0)),
                    0,
                ),
            );
            return newState;
        });
    };

    const handleChangeQuantity = (productId, quantity) => {
        setOrders((currentState) => {
            const newState = JSON.parse(JSON.stringify(currentState));
            const updatedOrderItems = newState[value];

            const updatedProducts = updatedOrderItems.products.map((product) => {
                if (product.attributeID === productId) {
                    if (quantity > product.inventory_quantity) {
                        alert('Xin lỗi ! kho chỉ còn lại ' + product.inventory_quantity + ' ' + product.name);
                        return { ...product, quantity: product.inventory_quantity };
                    } else if (quantity <= 0) {
                        return null;
                    } else {
                        return { ...product, quantity: quantity };
                    }
                }
                return product;
            });

            // Loại bỏ sản phẩm có giá trị là null
            updatedOrderItems.products = updatedProducts.filter((product) => product !== null);

            setMoney(
                updatedProducts?.reduce(
                    (total, current) => (total += (current?.quantity || 0) * (current?.price || 0)),
                    0,
                ),
            );
            return newState;
        });
    };

    const handleDeleteOrder = (orderID) => {
        setDeleteId(orderID);
        setMessage('Bạn có chắc chắn muốn xóa đơn hàng này?');
        setWarning('Sau khi xóa sẽ không thể hoàn tác được');
        setOpen(true);
    };
    const handleDeleteOrderAfterCreate = (orderID) => {
        setDeleteId(orderID);
        setMessage('Bạn có chắc chắn muốn tạo đơn hàng này?');
        setWarning('Sau khi tạo sẽ không thể hoàn tác được');
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        if (orders.length === 1) {
            const newState = orders;
            const updatedOrderItems = newState.filter((item, index) => index !== deleteId);
            let newOrder = {
                order: 1,
                products: [],
                customer: null,
            };
            updatedOrderItems.push(newOrder);
            setOrders(updatedOrderItems);
        } else {
            const newState = orders;
            const updatedOrderItems = newState.filter((item, index) => index !== deleteId);
            setOrders(updatedOrderItems);
        }
        setMoney(0);
        setValue((prevValue) => (prevValue === deleteId ? prevValue - 1 : prevValue));
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="body1">
            {addCustomer && (
                <div className="All">
                    <AddCustomer handleCloseAddCustomer={handleCloseAddCustomer} />
                </div>
            )}
            {/* dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{warning}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <div className="logo">
                            <div className="image">
                                <Link to="/dashboard">
                                    <img
                                        src="https://th.bing.com/th/id/OIP.SN5g8vx2XD2rKNq1QrcEhQHaCu?pid=ImgDet&rs=1"
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="Nav">
                            <div className="addProduct">
                                <TextField
                                    label="Thêm sản phẩm"
                                    id="outlined-start-adornment"
                                    value={searchProduct}
                                    onChange={(event) => {
                                        setSearchProduct(event.target.value);
                                    }}
                                    onMouseEnter={useEffect(() => {
                                        if (searchProduct !== '') {
                                            axios
                                                .get(
                                                    `${apiBaseUrl}/sales/products?code=` +
                                                        searchProduct +
                                                        `&inventory=` +
                                                        inventoryData,
                                                    {
                                                        headers: {
                                                            // token: Cookies.get('token'),
                                                            Authorization: getCookie('Authorization'),
                                                        },
                                                    },
                                                )
                                                .then((Response) => {
                                                    setProducts(Response.data);
                                                });
                                        } else {
                                            setProducts([]);
                                        }
                                    }, [searchProduct])}
                                    sx={{ m: 1, width: '60ch' }}
                                    InputProps={{
                                        style: { color: 'white' },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'white' }} />
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
                                                            inventory_quantity: product.quantity,
                                                            quantity: 1,
                                                            price: product.price,
                                                            attributeID: product.id,
                                                            size: product.size,
                                                            color: product.color,
                                                        };
                                                        var duplicate = false;

                                                        for (var i = 0; i < orders[value].products.length; i++) {
                                                            if (orders[value].products[i].attributeID === product.id) {
                                                                orders[value].products[i].quantity += 1;
                                                                duplicate = true;
                                                            }
                                                        }

                                                        if (duplicate === false) {
                                                            orders[value].products.push(product1);
                                                        }
                                                        setMoney(
                                                            orders[value]?.products.reduce(
                                                                (total, current) =>
                                                                    (total += current.quantity * current.price),
                                                                0,
                                                            ),
                                                        );
                                                        setSearchProduct('');
                                                    }}
                                                />
                                            </Card>
                                        );
                                    })}
                                </div>
                                <div className="orders">
                                    <Box
                                        sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: { xs: 320, sm: 480 } }}
                                    >
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="basic tabs example"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            textColor="white"
                                            indicatorColor="red"
                                        >
                                            {orders ? (
                                                orders.map((order, index) => {
                                                    let labell = 'Đơn ' + (index + 1);
                                                    return (
                                                        <Tab
                                                            label={
                                                                <div>
                                                                    {labell}
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            handleDeleteOrder(index);
                                                                        }}
                                                                        sx={{
                                                                            marginLeft: '4px',
                                                                            opacity: 0,
                                                                            color: 'white',
                                                                            transition:
                                                                                'visibility 0s linear 0.2s, opacity 0.2s linear',
                                                                            '&:hover': {
                                                                                visibility: 'visible',
                                                                                opacity: 1,
                                                                                color: 'white',
                                                                                transition: 'opacity 0.2s linear',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </div>
                                                            }
                                                            {...a11yProps(index)}
                                                            className="tabs"
                                                            // icon={

                                                            // }
                                                            iconPosition="end"
                                                        ></Tab>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </Tabs>
                                    </Box>
                                    <div
                                        className="addOrder"
                                        onClick={(event) => {
                                            if (orders.length < 10) {
                                                let newOrder = {
                                                    order: orders.length + 1,
                                                    products: [],
                                                    customer: null,
                                                };
                                                setOrders([...orders, newOrder]);
                                            }
                                        }}
                                    >
                                        <AddIcon fontSize="large" />
                                    </div>
                                </div>
                            </div>
                            <div className="user">
                                <div>
                                    <LocationOnIcon />
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={inventoryData}
                                            onChange={handleChangeInventoryData}
                                            label="Chi nhánh"
                                            sx={{
                                                color: 'white', // Màu chữ
                                                '&:before': {
                                                    borderColor: 'white', // Màu đường viền trước khi chọn
                                                },
                                                '&:after': {
                                                    borderColor: 'white', // Màu đường viền sau khi chọn
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: 'white', // Màu biểu tượng mũi tên
                                                },
                                                '& .MuiListItem-root': {
                                                    color: 'black', // Màu chữ trong lựa chọn
                                                    backgroundColor: 'white', // Màu nền lựa chọn
                                                },
                                            }}
                                        >
                                            {inventory ? (
                                                inventory.map((item, index) => {
                                                    return (
                                                        <MenuItem color="white" key={index} value={item.name}>
                                                            {item.name}
                                                        </MenuItem>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div
                                    sx={{
                                        '&hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <AccountCircleIcon />
                                    <span className="name">{userInfo?.name}</span>
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
                                        onDown={handleDown}
                                        onUp={handleUp}
                                        onChangeQuantity={handleChangeQuantity}
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid xs={4}>
                        {orders[value]?.customer === null ? (
                            <div className="addCustomer">
                                <TextField
                                    label="Thêm khách hàng"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '53ch' }}
                                    value={search}
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
                                                <AddIcon onClick={handleAddCustomer} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <div className="result_search">
                                    <Card sx={{ minWidth: 275 }}>
                                        {customers.map((customer) => {
                                            return (
                                                <ResultCustomerSearch
                                                    customer={customer}
                                                    onClick={() => {
                                                        orders[value].customer = customer;
                                                        console.log(orders[value]);
                                                        setSearch('');
                                                    }}
                                                />
                                            );
                                        })}
                                        {search !== '' ? <RetailCustomers /> : <></>}
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <ResultCustomerSearch customer={orders[value]?.customer} />
                        )}
                        <div className="order_info">
                            <p>
                                <span>Số lượng sản phẩm:</span>
                                {parseInt(
                                    orders[value]?.products.reduce((total, current) => (total += current.quantity), 0),
                                )}
                            </p>
                            <p>
                                <span>Thành tiền:</span>
                                {orders[value]?.products
                                    .reduce((total, current) => (total += current.quantity * current.price), 0)
                                    .toLocaleString('en-US')}
                            </p>
                            <p>
                                <span>Số tiền khách đưa:</span>
                                <NumericFormat
                                    thousandSeparator={true}
                                    prefix={''}
                                    customInput={TextField}
                                    type="text"
                                    // Các thuộc tính khác của TextField
                                    defaultValue={orders[value]?.products.reduce(
                                        (total, current) => (total += current.quantity * current.price),
                                        0,
                                    )}
                                    value={money}
                                    sx={{ width: '50%' }}
                                    size="small"
                                    variant="standard"
                                    onChange={(e) => {
                                        setMoney(parseFloat(e.target.value.replace(/,/g, '')));
                                    }}
                                />
                            </p>
                            <p>
                                <span>Số tiền phải trả:</span>
                                {(
                                    money -
                                    orders[value]?.products.reduce(
                                        (total, current) => (total += current.quantity * current.price),
                                        0,
                                    )
                                ).toLocaleString('en-US')}
                            </p>
                        </div>
                        <Button variant="contained" onClick={createOrder}>
                            Thanh toán
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SalesInShop;
