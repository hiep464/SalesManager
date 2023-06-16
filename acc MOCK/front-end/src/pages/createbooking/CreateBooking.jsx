import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import { ResultSupllierSearch } from '../../components/ResultSearch/ResultSearch';
import axios from 'axios';

const supplierInfo = {
    name: '',
    address: '',
    debtMoney : 0,
    email: ''
}

function CreateBooking() {
    const [searchSupplier, setSearchSupplier] = React.useState('')
    const [suppliers,setSuppliers] = React.useState([])
    const [supplier, setSupplier] = React.useState(supplierInfo);

    return ( 
        <Box>
            <Box sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between'}}>
                <Box width={'60%'} backgroundColor={'white'}>
                    <h3>Thông tin nhà cung cấp</h3>
                    <TextField
                        label="Add Supplier"
                        // size="small" 
                        // variant="outlined" 
                        id="outlined-start-adornment"
                        onChange={(event) => {
                            setSearchSupplier(event.target.value);
                        }}
                        onMouseEnter={React.useEffect(() => {
                            if (searchSupplier !== '') {
                                axios
                                    .get('http://localhost:8086/admin/Suppliers/name?name=' + searchSupplier)
                                    .then((Response) => {
                                        setSuppliers(Response.data.data.products);
            
                                    });
                            } else {
                                setSuppliers([]);
                            }
                        }, [searchSupplier])}
                        sx={{ m: 1, width: '40ch' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="result_search">
                        {suppliers.map((supplier) => {
                            console.log(supplier)
                            return (
                                <Card sx={{ minWidth: '60ch' }}>
                                    <ResultSupllierSearch
                                        key={supplier.code}
                                        
                                        supllier={supplier}
                                        onClick={() => {
                                            
                                            const supplierInfo = {
                                                name: supplier.name,
                                                email: supplier.email,
                                                address: supplier.address,
                                                debtMoney: supplier.debtMoney,
                                            };
                                            setSupplier(supplierInfo)
                                            setSearchSupplier('');
                                            }}
                                    />
                                </Card>
                                );
                            })}
                    </div>
                    {supplier !==null ?
                        <Box ml = {4}>
                        <p>Tên nhà cung cấp : {supplier.name}</p>
                        <p>Email : {supplier.email}</p>
                        <p>Địa chỉ : {supplier.address}</p>
                        <p>Nợ hiện tại : {supplier.debtMoney}</p>
                    </Box> : null}
                </Box>
                <Box width={'35%'} backgroundColor={'white'}>
                    <h3>Thông tin đơn đặt hàng</h3>
                    <div>
                        Kho: kho 1
                    </div>
                    <div>
                        nhân viên: bảo
                    </div>
                    <div>
                        Ngày nhập: 
                    </div>
                </Box>
            </Box>
            <Box sx={{backgroundColor: 'white', width: 'calc(82vw - 44px)', marginTop: '10px'}}>
                <Paper
                component="form"
                sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, border: '1px' }}
                    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                    inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                />
                </Paper>
            </Box>
            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{float: 'right'}}>
                    Số lượng <br />
                    Thành tiền <br />
                    Số tiền cần trả <br />
                </Box>
            </Box>
        </Box>
     );
}

export default CreateBooking;