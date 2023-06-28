import { useState } from 'react'
import './FilterModal.scss'

function FilterModal (props){
    const {onFilter, onClose} = props
    const [minDate, setMinDate] = useState("")
    const [maxDate, setMaxDate] = useState("")

    const handleFilter = ()=>{
        onFilter(minDate, maxDate)
        onClose()
    }

    return (
        <div id='filter' >
            <h3>Bộ lọc</h3>
            <span>Lần liên hệ gần nhất</span>
            <div className='input'>
                <input className='minvalue' type="date" onChange={(e)=>setMinDate(e.target.value)}/>
                <span>-</span>
                <input className='maxvalue' type="date" onChange={(e)=>setMaxDate(e.target.value)}/>
            </div>
            <button id='filterbut'onClick={handleFilter}>Lọc</button>
        </div>
    )
}

export default FilterModal