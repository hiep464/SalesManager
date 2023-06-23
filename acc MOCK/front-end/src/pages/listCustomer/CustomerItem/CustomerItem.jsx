import { tr } from 'date-fns/locale'
import './CustomerItem.scss'
import { Link } from 'react-router-dom'

function CustomerItem (props){
    const data = props.data

    const lastContact= new Date(data.lastContact)
    return(
        <tr>
            <td>
                <Link className='link' to={`/care/customers/`+data.code}>{data.code}</Link>
            </td>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{(data.lastContact!==null)?lastContact.getDate()+"/"+(lastContact.getMonth()+1)+"/"+lastContact.getFullYear():"Chưa liên hệ"}</td>
        </tr>
    )
}

export default CustomerItem