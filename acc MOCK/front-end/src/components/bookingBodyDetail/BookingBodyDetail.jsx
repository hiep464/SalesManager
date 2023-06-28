import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {TablePagination} from'@mui/material'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';

function BookingBodyDetail(props) {
    const { rows} = props;
    console.log(rows)
     const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
        
    return (
        <div
            role="tabpanel"

        >   
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, margin: '0px' }} size="small" aria-label="a dense table">
                <TableHead sx = {{fontWeight : 'bold', borderRadius: '6px'}}>
                        <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                            <TableCell align="center">STT</TableCell>
                        
                         
                            <TableCell align="center">Tên SP</TableCell>
                            <TableCell align="center">loại sản phẩm</TableCell>
                            <TableCell align="center">Nhãn hàng</TableCell>

                            
                            <TableCell align="center">Kích cỡ</TableCell>
                            <TableCell align="center">Màu sắc</TableCell>
                            <TableCell align="center">Số lượng </TableCell>
                            <TableCell align="center">Giá nhập</TableCell>
                            <TableCell align="center">Thành tiền</TableCell>
                           
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
                            
                        
                            <TableCell align="center">{row.productName}</TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">{row.brand}</TableCell>
                            <TableCell align="center">{row.size}</TableCell>
                            <TableCell align="center">
                                    {row.color}
                                </TableCell>
                            <TableCell align="center">
                                    {row.quantity}
                                </TableCell>

                            <TableCell align="center">{row.originalCost}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            {/* <TableCell align="center"><input type='text' onChange={(e) => handleEditProduct(row.productCode,"note",e.target.value)} /></TableCell> */}
                        </TableRow>
                    ))}
                    </TableBody>
                    
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) =>
                        `Kết quả từ ${from} đến ${to} trên tổng số ${count}`
                    }
                    labelRowsPerPage="Hiển thị"
                />
               
            </TableContainer>
            
       
           
        </div>
        
    );
}

BookingBodyDetail.propTypes = {
  rows: PropTypes.array,

 
};
//   index: PropTypes.number.isRequired,
 


export default BookingBodyDetail;