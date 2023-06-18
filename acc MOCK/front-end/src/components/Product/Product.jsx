import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Product.scss'

const Product = (props) => {
  let row = props.row
  const handleDelete = () => {
    props.onDeleteProduct(row.code);
  };
  return (
    <div className="product">
        {row ? (
        <>
          <div>{props.index+1}</div>
          <div onClick={handleDelete}><DeleteOutlineIcon/></div>
          <div>Image</div>
          <div>{row.code}</div>
          <div>{row.name}</div>
          <div>{row.quantity}</div>
          <div>{row.price}</div>
          <div>{row.price*row.quantity}</div>
        </>
        ):<></>}
    </div>
  )
}

export default Product
