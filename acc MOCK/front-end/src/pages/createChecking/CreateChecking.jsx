import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Numeral from 'react-numeral';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import "./CreateChecking.module.scss"
import CheckInventoryBody from '../../components/createCheckInventoryBody/CheckInventoryBody';
import { ResultProductSearch } from '../../components/ResultSearch/ResultSearch';
import axios from 'axios';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import { Navigate, useNavigate } from 'react-router-dom';
    

const CreateChecking = () => {
    const navigate = useNavigate()
    const [code,setCode] = React.useState('')
    const [searchProduct,setSearchProduct] = React.useState('')
    const [products,setProducts] = React.useState([])
    const [checkInventoryBody,setCheckInventoryBody] = React.useState([])
    const [inventories, setInventories] = React.useState([]);
   const [dateCreated,setDateCreated] = React.useState('')
    const [inventory, setInventory] = React.useState('');
    const [staffs, setStaffs] = React.useState([]);
    const [staff, setStaff] = React.useState('');
    React.useEffect (() => {
        console.log(dateCreated)
    },[dateCreated])
    
    const handleChange = (event) => {
        setInventory(event.target.value);
    };

    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/inventories`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
            setInventories(response.data);
        });
       
        axios.get(`${apiBaseUrl}/staff`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }}).then((response) => {
            setStaffs(response.data);
        });
    }, []);
    const theme = useTheme();

   
    const handleDelete = (productCode)=>{
        const updatedCheckInventoryItems = checkInventoryBody.filter(item => item.productCode !== productCode);
        setCheckInventoryBody(updatedCheckInventoryItems) 
    }
    
   
    
    // React.useEffect(() =>{

    //     console.log(checkInventoryBody)
    // })
    const handleSubmit = () => {
        const dataCheck = { 
                            code: code,
                            staffName: staff,
                            inventoryName: inventory,
                            createAt: dateCreated,
                            checkLines: checkInventoryBody
                        }
        axios.post(`${apiBaseUrl}/inventory/check_inventory`,dataCheck,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(res => {
                alert("Tạo phiếu kiểm hàng thành công")
                // console.log(res)
            })
            .then(res => {
                navigate(`inventory/check_inventory/${code}`)
            })
            .catch(err => {
                alert(err)
            })
       

    }
    
    // console.log(checkRequest)
    return (
        <Box>
            <Box sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'flex-end'}}>
                <Box sx={{float: 'left'}}>
                     <Button onClick={handleSubmit} size = "large" variant="contained">Tạo phiếu kiểm</Button>

                </Box>
            </Box>
            <Box mt = {4} sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between'}}>
                <Box borderRadius={4}  width={'60%'} backgroundColor={'white'}>
                    
                    
                    <Box ml = {4} >
                            <h3>Nhập mã kiểm kho</h3>
                            <TextField
                                label="Mã kiểm kho"
                                // size="small" 
                                // variant="outlined" 
                                id="outlined-start-adornment"
                                onChange={(event) => {
                                    setCode(event.target.value);
                                }}
                                sx={{ m: 1, width: '40ch' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            
                                        </InputAdornment>
                                    ),
                                }}
                            />
                    </Box>
                    
                    
                   
                </Box>

                <Box borderRadius={4} width={'38%'} backgroundColor={'white'} paddingBottom={'8px'} >
                    <h3 style={{ marginLeft: '10px' }}>Thông tin đơn kiểm hàng</h3>
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
                            <ListItemText primary="Ngày kiểm kho:" />
                            <LocalizationProvider  dateAdapter={AdapterDayjs} >
                                <DatePicker onChange={(e) => setDateCreated(e)} sx={{ width: '50%' } } />
                            </LocalizationProvider>
                        </ListItem>
                    </List>
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
                    onChange={(event) => {
                        setSearchProduct(event.target.value);
                    }}
                    onMouseEnter={React.useEffect(() => {
                        if(searchProduct !== '') {
                            axios.get(`${apiBaseUrl}/inventory/product/search?searchString=${searchProduct}&inventoryName=${inventory}`,{headers: {
                                // token: Cookies.get('token'),
                                Authorization: getCookie('Authorization'),
                            }})
                                .then((response) => {
                                    
                                    setProducts(response.data)
                                })
                            
                        } else {
                            setProducts([])
                        }
                    
                    },[searchProduct])}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                </Paper>
                </Box>
                <div className="result_search" style={{ position: 'fixed' }}>
                    {products.map((product,index) => {
                        
                        // console.log(checkInventoryBody)
                        return (
                            <Card sx={{ minWidth: '60ch' }}>
                            <ResultProductSearch
                                key={index}
                                product={product}
                                onClick={() => {
                                        
                                        const product1 = {
                                            productCode: product.code,
                                            productName: product.name,
                                            brand : product.brand,
                                            size: product.size,
                                            color :product.color,
                                            inventoryQuantity: product.quantity,
                                            actualQuantity: 0,
                                            
                                            reason: ''
                                        }   
                                        var duplicate = false
                                        let count = 0
                                        console.log(count)
                                        for (var i = 0; i < checkInventoryBody.length; i++) {
                                            
                                            if (checkInventoryBody[i].productCode === product1.productCode) {
                                                alert("This products was exits!")
                                                duplicate = true;
                                              
                                                    
                                            }
                                        }
                                        if (duplicate === false) {
                                            checkInventoryBody.push(product1);
                                                
                                        }
                                        setSearchProduct('');
                                        
                                }}
                            />
                            </Card>
                        );
                    })}
                </div>
                
               
                    <Box sx ={{border: "1px solid #ccc", borderRadius: '6px'}}>
                        {checkInventoryBody ? (
                            
                                    <CheckInventoryBody
                    
                                        rows={checkInventoryBody}
                                        // index={value}
                                        setUpdateProducts={setCheckInventoryBody}
                                        
                                        onDeleteProduct={handleDelete}                                         
                                    />
                                ) : (
                                    <></>
                                )}
                                
                            
                        
                    </Box>
                {/* </Box> */}
         


            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{float: 'right'}}>
                  
                </Box>
            </Box>
        </Box>
    )
}


export default CreateChecking