import './SearchCustomer.scss'

function SearchCustomer(props){
    const data= props.data

    return(
        <div className='searchresult'>
            {data.map((customer, index)=>(
                <div key={index}>
                    <p>Mã khách hàng: {}</p>
                    <p>Tên khách hàng: {}, số điện thoại: {}</p>
                </div>
            ))}
        </div>
    )
}

export default SearchCustomer 