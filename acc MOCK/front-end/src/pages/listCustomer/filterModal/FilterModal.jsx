import './FilterModal.scss'

function FilterModal (props){
    return (
        <div id='filter' onClick={props.onOutSideClick}>
            <h3>Bộ lọc</h3>
            <span>Lần liên hệ gần nhất</span>
            <div className='input'>
                <input className='minvalue' type="date" />
                <span>-</span>
                <input className='maxvalue' type="date" />
            </div>
            <button id='filterbut'>Lọc</button>
        </div>
    )
}

export default FilterModal