import React from 'react';
import Table from '@mui/material/Table';
import { Theme, useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { apiBaseUrl } from '../../constant/constant';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCookie } from '../../utils/api';
import { TextField } from '@mui/material';

function CheckInventoryBody(props) {
    const { rows,inventoryName,  onDeleteProduct,setUpdateProducts ,...other } = props;
    const [sizes, setSizes] = React.useState([])
    const [colors, setColors] = React.useState([])
    const [color, setColor] = React.useState('')
    const [size, setSize] = React.useState('')
    const [attribute, setAttribute] = React.useState({})
    const theme = useTheme();
 
    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/product/size`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(response => setSizes(response.data))
            
    },[])
    React.useEffect(() => {
        axios.get(`${apiBaseUrl}/inventory/product/color`,{headers: {
            // token: Cookies.get('token'),
            Authorization: getCookie('Authorization'),
        }})
            .then(response => setColors(response.data))
            
    },[])
  
 
    
    const handleDelete = (code) => {
        onDeleteProduct(code);
    
    };
    
      const handleEditProduct = (code, field, value) => {
        const updatedProducts = rows.map((row) =>
          row.productCode === code ? { ...row, [field]: value } : row
        );
        setUpdateProducts(updatedProducts);
      };
    return (
        <Box
            borderRadius={6}
            role="tabpanel"
            {...other}
            // style={{marginTop: "10px"}}
        >   
          
            <TableContainer  component={Box}>
                <Table sx={{ minWidth: 650, margin: '0px' , userSelect: 'none', borderRadius: '6px'}} aria-label="aria-label">
                    <TableHead sx = {{fontWeight : 'bold', borderRadius: '6px'}}>
                        <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Mã SP</TableCell>
                            <TableCell align="center">Tên SP</TableCell>
                            <TableCell align="center">Nhãn hàng</TableCell>
                            <TableCell align="center">Kích cỡ</TableCell>
                            <TableCell align="center">Màu sắc</TableCell>
                            <TableCell align="center">Số lượng trên hệ thống</TableCell>
                            <TableCell align="center">Số lượng thực tế</TableCell>
                            <TableCell align="center">Lý do</TableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderRadius: '6px' }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center"><div onClick={() => handleDelete(row.productCode)}><DeleteOutlineIcon/></div></TableCell>
                            <TableCell align="center">{row.productCode}</TableCell>
                            <TableCell align="center">{row.productName}</TableCell>
                            <TableCell align="center">{row.brand}</TableCell>
                            <TableCell align="center">
                                    {row.size}
                                </TableCell>
                            <TableCell align="center">
                                    {row.color}
                                </TableCell>

                            <TableCell align="center">{row.inventoryQuantity}</TableCell>
                            <TableCell align="center"><TextField type='number' onChange={(e) => {
                                if(e.target.value > row.inventoryQuantity) {
                                
                                    alert("Số sản phẩm sau kiểm không được lớn hơn sản phẩm trên hệ thống")
                                    
                                }
                                handleEditProduct(row.productCode,"actualQuantity",parseInt(e.target.value))
                            } } /></TableCell>
                            <TableCell align="center"><TextField type='text' onChange={(e) => handleEditProduct(row.productCode,"reason",e.target.value)} /></TableCell>
                            {/* <TableCell align="center"><input type='text' onChange={(e) => handleEditProduct(row.productCode,"note",e.target.value)} /></TableCell> */}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
          
           
        </Box>
        
    );
}

CheckInventoryBody.propTypes = {
  rows: PropTypes.array,

 
};

 


export default CheckInventoryBody;