import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ResultProductSearch } from '../../components/ResultSearch/ResultSearch';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { NumericFormat } from 'react-number-format';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Numeral from 'react-numeral';
import { apiBaseUrl } from '../../constant/constant';
import { color, margin } from '@mui/system';
import { getCookie } from '../../utils/api';
import Autocomplete from '@mui/material/Autocomplete';
import { parse } from 'date-fns';



function CreateBooking() {
    const [searchProduct, setSearchProduct] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [search, setSearch] = useState([]);
    const [orders, setOrders] = useState([]);
    const [code, setCode] = useState();
    const [inventories, setInventories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState(null);
    const [inventory, setInventory] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [dataSupplier, setDataSupplier] = useState({})
    const [staff, setStaff] = useState('');
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState('');
    const [colors, setColors] = useState([]);
    const [originalCost, setOriginalCost] = useState(0)
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [active, setActive] = useState(false)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [price, setPrice] = useState(0)
    const [dateBook, setDateBook] = useState('')
    const [bookings, setBookings] = useState([])
    const handleChange = (event) => {
        setInventory(event.target.value);
    };
    
    React.useEffect(() => { 
        console.log(size,color)
             
            for(let order of orders) {
                axios.get(`${apiBaseUrl}/inventory/product/attribute?inventoryName=${inventory}&productName=${order.productName}&size=${order.size}&color=${order.color}`,{headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                }})
                    .then((response) => {               
                        handleEditProduct(order.productName,order.size,order.color, "originalCost" , response.data.originalCost)
                    })    
                    .then(() => console.log(order.originalCost))
                
            }       
    },[size,color,inventory])
    React.useEffect(() => { 
        let count = 0
        for(let order of orders) {
            
            count += order.quantity 
        }
        setTotalQuantity(count)
        
        
    }, [quantity])
    React.useEffect(() => { 
             console.log(originalCost)
        for(let order of orders) {
            handleEditProduct(order.productName,order.size,order.color, "price" , order.originalCost * order.quantity)     
        } 
      
    }, [quantity,originalCost])
    React.useEffect(() => { 
        let count = 0
        for(let order of orders) {
            let price = 0
            price = order.quantity * order.originalCost
            count += price
        }
        setTotal(count)
        console.log(count)
        
    }, [quantity,originalCost])
    
    
    const handleEditProduct = (name, size, color, field, value) => {
        console.log(orders)
        const updatedProducts = orders.map((row) =>
          (row.productName === name && row.size === size && row.color === color) ? { ...row, [field]: value } : row
        );
        setOrders(updatedProducts);
      };

    const handleSubmitRequest = () => {
        let count =0
        for(let order of orders) {
            count += order.price 
        }
        setTotal(count)
        const dataSubmit = {
            code: code,
            inventoryName: inventory,
            staffName: staff,
            supplierName : dataSupplier.name,
            total: total,
            bookingDate: dateBook,
            bookinglines: orders
        }
        axios.post(`${apiBaseUrl}/inventory/bookings`,dataSubmit,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(res => {alert("Tạo đơn đặt hàng thành công")})
            
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.message;
                    alert(`Lỗi: ${errorMessage}`);
                } else {
                    console.error(error);
                }
            
            });
    }
    useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/inventories`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
            setInventories(response.data);
        });
        axios.get(`${apiBaseUrl}/inventory/suppliers`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
            console.log(response?.data);
            setSuppliers(response.data);
        });
        axios.get(`${apiBaseUrl}/staff`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
            setStaffs(response.data);
        });
        axios.get(`${apiBaseUrl}/inventory/product/size`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
                    setSizes(response.data);
                });
        axios.get(`${apiBaseUrl}/inventory/product/color`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
                    setColors(response.data);
                });
    }, []);

    return (
        <Box>
            <Grid sx ={{display: "flex", justifyContent: "flex-end", marginBottom : "16px"}}><Button sx = {{padding: "8px", width: "20%"}} size = "large" variant="contained" onClick={handleSubmitRequest}>Đặt hàng</Button></Grid>
            <Box
                sx={{
                    width: 'calc(82vw - 44px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '6px',
                }}
            >
                <Box borderRadius={'6px'} width={'58%'} backgroundColor={'white'}>
                    <h3 style={{ marginLeft: '20px' }}>Nhập mã đặt hàng</h3>
                    <TextField
                        sx={{ marginLeft: '20px' }}
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    ></TextField>

                    <h3 style={{ marginLeft: '20px' }}>Chọn nhà cung cấp</h3>
                    <Select
                        size="small"
                        sx={{ width: '40%', marginLeft: '20px' }}
                        value={supplier}
                        onChange={(e) => {
                            setSupplier(e.target.value);
                        }}
                    >
                        {suppliers?.map((item, index) => {
                            return (
                                <MenuItem onClick={() => setDataSupplier(item)} key={index} value={item?.code}>
                                    {item?.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {supplier ? (
                        <List dense={true}>
                            <ListItem sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Điện thoại :" />
                                    {/* <span>{suppliers?.find(item => item.code === supplier)}</span> */}
                                    <span>{dataSupplier.phone}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Email :" />
                                    <span>{dataSupplier.email}</span>
                                </Box>
                            </ListItem>
                            <ListItem sx={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Địa chỉ :" />
                                    <span>{dataSupplier.address}</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Tiền nợ :" />
                                    <Numeral value={dataSupplier.debtMoney} format={'0,0'} />
                                </Box>
                            </ListItem>
                        </List>
                    ) : (
                        ''
                    )}
                </Box>
                <Box width={'38%'} backgroundColor={'white'} paddingBottom={'8px'} borderRadius={'4px'}>
                    <h3 style={{ marginLeft: '10px' }}>Thông tin đơn đặt hàng</h3>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText primary="Kho :" />
                            <Select size="small" sx={{ width: '50%' }} value={inventory} onChange={handleChange}>
                                {inventories?.map((item) => {
                                    return (
                                        <MenuItem key={item.name} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Nhân viên :" />
                            <Select
                                size="small"
                                sx={{ width: '50%' }}
                                value={staff}
                                onChange={(e) => {
                                    setStaff(e.target.value);
                                }}
                            >
                                {staffs?.map((item) => {
                                    return (
                                        <MenuItem key={item.name} value={item?.name}>
                                            {item?.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ngày nhập :" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={(e) => setDateBook(e)} sx={{ width: '50%' }} />
                            </LocalizationProvider>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box
                sx={{
                    width: 'calc(82vw - 44px)',
                    marginTop: '10px',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                }}
                borderRadius={'6px'}
            >
                <Box
                    borderRadius={'6px'}
                    component="form"
                    sx={{
                        p: '2px 0',
                        display: 'absolute',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, border: '1px', padding: '10px' }}
                        placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                        inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                        // value={searchProduct}
                        onChange={(event) => {
                            setSearchProduct(event.target.value);
                        }}
                        onClick={() => setActive(true)}
                        onMouseEnter={useEffect(() => {
                            if (searchProduct !== '') {
                                axios
                                    .get(`${apiBaseUrl}/inventory/products/search-products?searchString=${searchProduct}`,{headers: {
                                        // token: Cookies.get('token'),
                                        Authorization: getCookie('Authorization'),
                                    }})
                                    .then((response) => {
                                        
                                        setSearch(response.data);
                                    });
                            } else {
                                setSearch([]);
                            }
                        }, [searchProduct])}
                    />
                </Box>
                <div className="result_search" style={{ position: 'fixed',backgroundColor : '#fff', border : "1px solid #ccc" }}>
                    
                    
                    {search?.map((product, key) => {
                        return (
                            <Box key={key} sx={{ minWidth: '60ch', backgroundColor: 'white' }}>
                                <ResultProductSearch
                                    key={key}
                                    product={product}
                                    onClick={() => {
                                        const productOder = {
                                            productCode : product.code,
                                            productName: product.name,
                                            category: product.categoryName,
                                            brand: product.brand,
                                            bookingCode: code,
                                            originalCost: 0,
                                            size: '',
                                            color: '',
                                            price: 0,
                                            quantity: 0,
                                        };
                                        setActive(false);
                                        setOrders((prevState) => [...prevState, productOder]);
                                        setSearch([]);
                                        setSearchProduct('');
                                    }}
                                />
                            </Box>
                        );
                    })}
                </div>
            </Box>{' '}
            <Box>
                <Box>
                    <TableContainer component={Box}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                                <TableRow>
                                    <TableCell width='5%'>STT</TableCell>
                                    <TableCell width='15%' align="center">Tên</TableCell>
                                    <TableCell width='3%' align="center"></TableCell>
                                    <TableCell width='3%' align="center">Loại sản phẩm</TableCell>
                                    <TableCell width='3%' align="center">Thương hiệu</TableCell>
                                    <TableCell width='12%' align="center">Kích cỡ </TableCell>
                                    <TableCell width='12%' align="center">Màu sắc </TableCell>
                                    <TableCell width='15%' align="center">Đơn giá</TableCell>
                                    <TableCell width='12%' align="center">Số lượng</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ backgroundColor: '#fff' }}>
                                {orders?.map((row, key) => (
                                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th">{key + 1}</TableCell>
                                        <TableCell align="center">{row.productName}</TableCell>
                                        <TableCell align="center">
                                            <DeleteIcon
                                                onClick={() => {
                                                    // setOrders(() => orders.splice(orders.indexOf(row), 1));

                                                    setOrders((prevState) => prevState.filter((_, i) => i !== key));
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">{row.brand}</TableCell>

                                        <TableCell align="center">
                                        <Autocomplete
                                                disablePortal
                                                freeSolo
                                                id="combo-box-demo"
                                                options={sizes}
                                                
                                                onChange={(event,e) => {
                                                    setSize(e)
                                                    handleEditProduct(row.productName, row.size, row.color, "size" , e)}}
                                                sx={{ width: "100%" }}
                                                renderInput={(params) => < TextField 
                                                    onChange={(e) => handleEditProduct(row.productName, row.size, row.color, "size" , e.target.value)}
                                                    sx={{ width: "100%" }}
                                                    {...params}  />}
                                            />
                                        </TableCell>
                                        
                                            
                                        <TableCell align="center">
                                            <Autocomplete
                                                disablePortal
                                                freeSolo
                                                id="combo-box-demo"
                                                options={colors}
                                                onChange={(event,e) => {
                                                    setColor(e)
                                                    handleEditProduct(row.productName, row.size, row.color, "color" , e)}}
                                                sx={{ width: "100%" }}
                                                renderInput={(params) => <TextField  onChange={(e) => handleEditProduct(row.productName, row.size, row.color, "color" , e.target.value)} sx={{ width: "100%" }} {...params}  />}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                           
                                            <TextField align="center" type="text" sx={{ width: '100%' }} variant="standard" value={row.originalCost != undefined  ? (row.originalCost).toLocaleString() : ''} onChange={(e) => {
                                                const valueWithoutCommas = e.target.value.replace(/,/g,''); 
                                                setOriginalCost(valueWithoutCommas); 
                                                handleEditProduct(row.productName, row.size, row.color, "originalCost", parseInt(valueWithoutCommas));
                                            }}></TextField>
                                        
                                        </TableCell>
                                        <TableCell align="center">
                                        <TextField align="center" type="text" sx={{ width: '100%' }} variant="standard" value={row.quantity != 0 ? (row.quantity).toLocaleString() : ''} onChange={(e) => {
                                                const valueWithoutCommas = e.target.value.replace(/,/g,''); 
                                                setQuantity(valueWithoutCommas); 
                                                handleEditProduct(row.productName, row.size, row.color, "quantity", parseInt(valueWithoutCommas));
                                        }}></TextField>
                                            
                                           
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField align="center" type="text" sx={{ width: '100%' }} value={row.price != 0 ? (row.price).toLocaleString() : ''} onChange={(e) => {
                                                const valueWithoutCommas = e.value.replace(/,/g,''); 
                                                setQuantity(valueWithoutCommas); 
                                                handleEditProduct(row.productName,row.size,row.color, "price" , parseInt(valueWithoutCommas))
                                        }}></TextField></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {orders.length === 0 ? (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: '200px',
                            }}
                        >
                            <MoveToInboxIcon
                                sx={{ width: '60px', height: '60px', color: '#e8eaeb', marginBottom: '10px' }}
                            />
                            <span>Đơn đặt hành chưa có sản phẩm nào</span>
                        </Box>
                    ) : (
                        ''
                    )}
                </Box>
            </Box>
            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{ float: 'right', width: '500px', backgroundColor: 'white', borderRadius: '4px' }}>
                    <div style={{ marginLeft: '10px', paddingTop: '6px' }}>
                        <div style={{ margin: '6px' }}>Số lượng: {totalQuantity ? totalQuantity.toLocaleString() : 0}</div> <br />
                        <div style={{ margin: '6px' }}>Thành tiền: {total ? total.toLocaleString() : 0}</div> <br />
                    </div>
                    
                </Box>
            </Box>
        </Box>
    );
}

export default CreateBooking;