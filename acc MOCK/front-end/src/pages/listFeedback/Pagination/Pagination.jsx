import React from 'react'
import './Pagination.scss'
import Pagination from '@mui/material/Pagination';

const Paginations = (props) => {
    const { pagination, onPageChange, onLimitChange } = props
    const { page, limit, total } = pagination

    const handlePageChange = (e, newPage) => {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }

    const handleLimitChange = (newLimit) => {
        if(onLimitChange) {
            onLimitChange(newLimit)
        }
    }

    return (
        <div className="pagination">
            <span>Hiển thị</span>
            <select name="pagelimit" id="pagelimit" onChange={(e)=>{handleLimitChange(e.target.value)}}>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <span>Kết quả</span>
            <Pagination count={total} page={page} onChange={handlePageChange} color="primary" />
        </div>
    )
}

export default Paginations
