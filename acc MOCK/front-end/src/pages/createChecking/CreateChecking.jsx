import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import "./CreateChecking.module.scss"
import CheckInventoryBody from '../../components/createCheckInventoryBody/CheckInventoryBody';
import { ResultProductSearch } from '../../components/ResultSearch/ResultSearch';
import axios from 'axios';


    

const CreateChecking = () => {
    const [code,setCode] = React.useState('')
    const [searchProduct,setSearchProduct] = React.useState('')
    const [products,setProducts] = React.useState([])
    const [checkInventoryBody,setCheckInventoryBody] = React.useState([])

    const handleDelete = (productCode)=>{
        const updatedCheckInventoryItems = checkInventoryBody.filter(item => item.productCode !== productCode);
        setCheckInventoryBody(updatedCheckInventoryItems) 
    }
    const currentTime = () => {
        const currentTime = new Date().getDate()  + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
        
        return currentTime;
    }
   
    
    // React.useEffect(() =>{

    //     console.log(checkInventoryBody)
    // })
    const handleSubmit = () => {
        const dataCheck = { 
                            code: code,
                            staffName: "Le Van Bao",
                            checkLines: checkInventoryBody
                        }
        axios.post('http://localhost:8086/admin/check_inventory',dataCheck)
            .then(res => {
                alert(res.data.message)
                // console.log(res)
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
                <Box width={'60%'} backgroundColor={'white'}>
                    
                    
                    
                            <h3>Nhập code</h3>
                            <TextField
                                label="Add checking code"
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

                <Box width={'35%'} backgroundColor={'white'}>
                    <h3>Thông tin đơn kiểm hàng</h3>
                    <div>
                        Kho: kho 1
                    </div>
                    <div>
                        Nhân viên: Lê Văn Bảo
                    </div>
                    <div>
                        Ngày kiểm: {currentTime()}
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
                    onChange={(event) => {
                        setSearchProduct(event.target.value);
                    }}
                    onMouseEnter={React.useEffect(() => {
                        if(searchProduct !== '') {
                            axios.get('http://localhost:8086/admin/products?code=' + searchProduct)
                                .then((response) => {
                                    
                                    setProducts(response.data.data.products)
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
                <div className="result_search">
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
                                            inventoryQuantity: product.quantity,
                                            actualQuantity: 0,
                                            reason: '',
                                            note: ''
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

                <Grid xs={8}>
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
                                
                            
                        
                    </Grid>
            </Box>
            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{float: 'right'}}>
                  
                </Box>
            </Box>
        </Box>
    )
}


export default CreateChecking