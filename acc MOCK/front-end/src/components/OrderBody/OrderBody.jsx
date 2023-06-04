import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Product from '../../components/Product/Product';
import PropTypes from 'prop-types';

function OrderBody(props) {
    const { rows, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >   
          {value === index && (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, margin: '0px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Mã SP</TableCell>
                            <TableCell align="right">Tên SP</TableCell>
                            <TableCell align="right">Số lượng</TableCell>
                            <TableCell align="right">Giá</TableCell>
                            <TableCell align="right">Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </TableContainer>
          )}
            {value === index && rows.map((row,i) => {
                return <Product row={row} index={i} />;
            })}
        </div>
    );
}

OrderBody.propTypes = {
  rows: PropTypes.array,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default OrderBody;
