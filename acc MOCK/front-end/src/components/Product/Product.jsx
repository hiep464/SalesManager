import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import './Product.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import axios from 'axios';

const Product = (props) => {
    let row = props.row;
    let onUpdateAttribute = props.onUpdateAttribute;
    const [data, setData] = React.useState();
    const [size, setSize] = React.useState();
    const handleDelete = () => {
        props.onDeleteProduct(row.attributeID);
    };

    const handleUp = () => {
        props.onUp(row.attributeID);
    };

    const handleDown = () => {
        props.onDown(row.attributeID);
    };
    const getSize = () => {
        let url = 'http://localhost:8080/admin/product/' + row.code + '/attribute';
        return axios.get(url);
    };

    React.useEffect(() => {
        getSize().then((response) => {
            setData(response.data);
        });
    });

    return (
        <div className="product">
            {row ? (
                <Grid container spacing={3} sx={{ width: '100%', height: '100px' }} className="product1">
                    <Grid xs={1}>{props.index + 1}</Grid>
                    <Grid xs={1}>
                        <div onClick={handleDelete}>
                            <DeleteOutlineIcon />
                        </div>
                    </Grid>
                    <Grid xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <Select
                                value={size}
                                defaultValue={row.attributeID}
                                onChange={(event) => {
                                    setSize(event.target.value);
                                    console.log(props.index);
                                    onUpdateAttribute(props.index, event.target.value);
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {data ? (
                                    data.map((item) => {
                                        return <MenuItem value={item.id}>{item.size + ',' + item.color}</MenuItem>;
                                    })
                                ) : (
                                    <></>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={2}>{row.code}</Grid>
                    <Grid xs={3}>{row.name}</Grid>
                    <Grid xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ArrowDropDownIcon onClick={handleDown}/>
                        {row.quantity}
                        <ArrowDropUpIcon onClick={handleUp}/>
                    </Grid>
                    <Grid xs={1}>{row.price.toLocaleString('en-US')}</Grid>
                    <Grid xs={1}>{(row.price * row.quantity).toLocaleString('en-US')}</Grid>
                </Grid>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Product;
