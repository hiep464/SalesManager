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
import Grid from '@mui/material/Unstable_Grid2';
import '../Product/Product.scss';

function OrderBody(props) {
    const { rows, value, index, onDeleteProduct,onUpdateAttribute,onDown,onUp, ...other } = props;

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
                                <Grid container spacing={3} sx={{ width: '100%'}} className="product1">
                                    <Grid xs={1}>
                                        <TableCell>STT</TableCell>
                                    </Grid>
                                    <Grid xs={1}>
                                        <TableCell align="left"></TableCell>
                                    </Grid>
                                    <Grid xs={2}>
                                        <TableCell align="left">Size & color</TableCell>
                                    </Grid>
                                    <Grid xs={2}>
                                        <TableCell align="left">Mã SP</TableCell>
                                    </Grid>
                                    <Grid xs={3}>
                                        <TableCell align="left">Tên SP</TableCell>
                                    </Grid>
                                    <Grid xs={1}>
                                        <TableCell align="left">Số lượng</TableCell>
                                    </Grid>
                                    <Grid xs={1}>
                                        <TableCell align="left">Giá</TableCell>
                                    </Grid>
                                    <Grid xs={1}>
                                        <TableCell align="left">Thành tiền</TableCell>
                                    </Grid>
                                </Grid>
                            </TableRow>
                        </TableHead>
                        <TableBody></TableBody>
                    </Table>
                </TableContainer>
            )}
            {value === index && rows ? (
                rows.map((row, i) => {
                    return <Product row={row} index={i} onDeleteProduct={onDeleteProduct} onDown = {onDown} onUp = {onUp} onUpdateAttribute={onUpdateAttribute}/>;
                })
            ) : (
                <></>
            )}
        </div>
    );
}

OrderBody.propTypes = {
    rows: PropTypes.array,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default OrderBody;
