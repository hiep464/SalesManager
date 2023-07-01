import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Grid from '@mui/material/Unstable_Grid2';
import './Product.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Product = (props) => {
    let row = props.row;

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        // Kiểm tra nếu giá trị nhập vào là số
        if (!isNaN(inputValue)) {
            props.onChangeQuantity(row.attributeID, inputValue);
        }
    };

    const handleDelete = () => {
        props.onDeleteProduct(row.attributeID);
    };

    const handleUp = () => {
        props.onUp(row.attributeID);
    };

    const handleDown = () => {
        props.onDown(row.attributeID);
    };

    return (
        <div className="product">
            {row ? (
                <Grid
                    container
                    spacing={3}
                    sx={{ width: '100%', height: '100px', padding: '10px' }}
                    className="product1"
                >
                    <Grid xs={0.5}>{props.index + 1}</Grid>
                    <Grid xs={0.5}>
                        <div onClick={handleDelete}>
                            <DeleteOutlineIcon />
                        </div>
                    </Grid>
                    <Grid xs={1}>{row.size + ',' + row.color}</Grid>
                    <Grid xs={1}>{row.code}</Grid>
                    <Grid xs={2}>{row.name}</Grid>
                    <Grid xs={1.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ArrowDropDownIcon onClick={handleDown} />
                        {/* {row.quantity} */}
                        <input
                            type="text"
                            value={row.quantity}
                            onChange={handleInputChange}
                            className="number-input__input"
                        />
                        <ArrowDropUpIcon onClick={handleUp} />
                    </Grid>
                    <Grid xs={1.5}>{row.price.toLocaleString('en-US')}</Grid>
                    <Grid xs={2}>{(row.price * row.quantity).toLocaleString('en-US')}</Grid>
                </Grid>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Product;
