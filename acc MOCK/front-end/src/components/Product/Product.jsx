import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Product.scss'

const Product = (props) => {
  let row = props.row
  return (
    <div className="product">
        <div>{props.index+1}</div>
        <div><DeleteOutlineIcon/></div>
        <div>Image</div>
        <div>{row.code}</div>
        <div>{row.name}</div>
        <div>{row.quantity}</div>
        <div>{row.price}</div>
        <div>{row.total}</div>
    </div>
  )
}

export default Product
