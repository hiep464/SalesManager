import React from 'react';
import './ResultSearch.scss';
export function ResultSupllierSearch(props) {
    const supllier = props.supllier;
    console.log(supllier)
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{supllier.name}</p>
        </div>
    );
}
export function ResultCheckLineSearch(props) {
    const checkLine = props.checkLine;
    console.log(checkLine)
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{checkLine.name}</p>
        </div>
    );
}
export function ResultCustomerSearch(props) {
    const customer = props.customer;
    return (
        <div className="result-search" onClick={props.onClick}>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
        </div>
    );
}

export function ResultProductSearch(props) {
    const product = props.product;
    return (
        <div className="result-product-search" onClick={props.onClick}>
            <div>image</div>
            <div>
                <p>{product[1]}</p>
                <p>Số lượng:{product[6]}</p>
            </div>
            <div>Size&color: {product[4]+","+product[5]}</div>
            <p>Giá:{product[2]}</p>
        </div>
    );
}

export function RetailCustomers() {
    return (
        <div className="result-search">
            <p>Thêm khách lẻ</p>
        </div>
    );
}
