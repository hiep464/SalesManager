import React from "react";
import classNames from "classnames/bind"
import styles from "./Login.module.scss"

const cx = classNames.bind(styles)

function Login() {
    return ( 
        <div className={cx('demo-1')}>Login</div>
     );
}

export default Login;