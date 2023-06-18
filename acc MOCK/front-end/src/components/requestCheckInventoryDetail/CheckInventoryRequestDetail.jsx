import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import PropTypes from 'prop-types';

function CheckInventoryRequestDetail(props) {
    const { rows} = props;
    return (
        <div
            role="tabpanel"

        >   
          
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, margin: '0px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="center">Mã SP</TableCell>
                            <TableCell align="center">Số lượng trên hệ thống</TableCell>
                            <TableCell align="center">Số lượng thực tế</TableCell>
                            <TableCell align="center">Lý do</TableCell>
                            <TableCell align="center">Ghi chú</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">{row.productCode}</TableCell>
                            <TableCell align="center">{row.inventoryQuantity}</TableCell>
                            <TableCell align="center">{row.actualQuantity}</TableCell>
                            <TableCell align="center">{row.reason}</TableCell>
                            <TableCell align="center">{row.note}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
          
           
        </div>
        
    );
}

CheckInventoryRequestDetail.propTypes = {
  rows: PropTypes.array,

 
};
//   index: PropTypes.number.isRequired,
 


export default CheckInventoryRequestDetail;