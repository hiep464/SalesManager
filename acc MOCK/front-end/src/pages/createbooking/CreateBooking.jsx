import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
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

function CreateBooking() {
    const [search, setSearch] = useState([]);
    const [orders, setOrders] = useState([]);
    const [code, setCode] = useState();
    const [inventories, setInventories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState(null);
    const [inventory, setInventory] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [staff, setStaff] = useState('');

    const handleChange = (event) => {
        setInventory(event.target.value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8086/admin/inventories`).then((response) => {
            setInventories(response.data);
        });
        axios.get(`http://localhost:8086/admin/suppliers`).then((response) => {
            console.log(response?.data);
            setSuppliers(response.data);
        });
        axios.get(`http://localhost:8086/admin/staff`).then((response) => {
            setStaffs(response.data);
        });
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    width: 'calc(82vw - 44px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: '6px',
                }}
            >
                <Box borderRadius={'6px'} width={'58%'} backgroundColor={'white'}>
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
                                <MenuItem key={index} value={item?.code}>
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
                                    <span>093029323</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Email :" />
                                    <span>demo@gmail.com</span>
                                </Box>
                            </ListItem>
                            <ListItem sx={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Địa chỉ :" />
                                    <span>hai bà trưng</span>
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Tiền nợ :" />
                                    <Numeral value={1000000} format={'0,0'} />
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
                                <DatePicker sx={{ width: '50%' }} />
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
                    sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, border: '1px', padding: '10px' }}
                        placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                        inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value);
                        }}
                        onMouseEnter={useEffect(() => {
                            if (code !== '') {
                                axios
                                    .get('http://localhost:8086/admin/product/search?code=' + code)
                                    .then((response) => {
                                        setSearch(response.data);
                                        console.log(response);
                                    });
                            } else {
                                setSearch([]);
                            }
                        }, [code])}
                    />
                </Box>
                <div className="result_search" style={{ position: 'fixed' }}>
                    {search?.map((product, key) => {
                        return (
                            <Box key={key} sx={{ minWidth: '60ch', backgroundColor: 'white' }}>
                                <ResultProductSearch
                                    key={key}
                                    product={product}
                                    onClick={() => {
                                        // console.log(product);
                                        // orders.push(product);
                                        setOrders((prevState) => [...prevState, product]);
                                        setSearch([]);
                                        setCode('');
                                    }}
                                />
                            </Box>
                        );
                    })}
                </div>

                <Box>
                    <TableContainer component={Box}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell align="left">Tên</TableCell>
                                    <TableCell align="left">Số lượng</TableCell>
                                    <TableCell align="left">Thuộc tính</TableCell>
                                    <TableCell align="left">Đơn giá</TableCell>
                                    <TableCell align="left">Thành tiền</TableCell>
                                    <TableCell align="left">Lựa chọn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map((row, key) => (
                                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th">{key + 1}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">
                                            {/* <TextField type="number" sx={{ width: '50%' }} variant="standard" /> */}
                                            <NumericFormat
                                                thousandSeparator={true}
                                                prefix={''}
                                                customInput={TextField}
                                                type="text"
                                                // Các thuộc tính khác của TextField
                                                variant="standard"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select size="small" sx={{ width: '50%' }}>
                                                <MenuItem value={'demo'}>demo</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="left">
                                            {/* <TextField type="number" sx={{ width: '50%' }} variant="standard" /> */}
                                            <NumericFormat
                                                thousandSeparator={true}
                                                prefix={''}
                                                customInput={TextField}
                                                type="text"
                                                // Các thuộc tính khác của TextField
                                                variant="standard"
                                                defaultValue={row?.originalCost}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row?.quantity * row?.cost || 0}</TableCell>
                                        <TableCell align="left">
                                            <DeleteIcon
                                                onClick={() => {
                                                    // setOrders(() => orders.splice(orders.indexOf(row), 1));
                                                    console.log(row);
                                                    setOrders((prevState) => prevState.filter((_, i) => i !== key));
                                                    console.log(orders.length);
                                                    console.log(row);
                                                }}
                                            />
                                        </TableCell>
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
                        <div style={{ margin: '6px' }}>Số lượng: </div> <br />
                        <div style={{ margin: '6px' }}>Thành tiền: </div> <br />
                        <div style={{ margin: '6px' }}>Số tiền cần trả: </div> <br />
                    </div>
                    <Box sx={{ float: 'right' }}>
                        <Button sx={{ margin: '10px' }} variant="contained">
                            Tạo đơn
                        </Button>
                        <Button sx={{ margin: '10px' }} variant="outlined">
                            Hủy
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateBooking;
