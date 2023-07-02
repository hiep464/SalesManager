import React from 'react';
import Paper from '@mui/material/Paper';
import Product from '../../components/Product/Product';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import '../Product/Product.scss';

function OrderBody(props) {
    const { rows, value, index, onDeleteProduct, onChangeQuantity, onDown, onUp, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Paper>
                    <Grid
                        container
                        spacing={3}
                        sx={{ width: '100%', padding: '10px', marginTop: '4px' }}
                        className="product1"
                    >
                        <Grid xs={0.5}>STT</Grid>
                        <Grid xs={0.5}></Grid>
                        <Grid xs={1}>Image</Grid>
                        <Grid xs={1}>Mã SP</Grid>
                        <Grid xs={2}>Tên SP</Grid>
                        <Grid xs={1.5}>Số lượng</Grid>
                        <Grid xs={1.5}>Giá</Grid>
                        <Grid xs={2}>Thành tiền</Grid>
                    </Grid>
                </Paper>
            )}

            {value === index && rows ? (
                rows.map((row, i) => {
                    return (
                        <Product
                            row={row}
                            index={i}
                            onDeleteProduct={onDeleteProduct}
                            onDown={onDown}
                            onUp={onUp}
                            onChangeQuantity={onChangeQuantity}
                            sx={{ marginTop: '10px' }}
                        />
                    );
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
