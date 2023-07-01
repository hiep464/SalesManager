import './Login.scss';
import SapoLogo from './Sapo-logo.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../api/useAuth';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleMutationEvent = {
        onSuccess: () => {
            navigate('/dashboard');
        },
        onError: () => {
            alert('error');
        },
    };

    const { mutate: login } = useLogin(handleMutationEvent);

    const handleLogin = () => {
        console.log(username, password)
        login({ username, password });
    };

    return (
        <div className="login-wrapper">
            <div className="loginform">
                <img src={SapoLogo} alt="" />
                <p>Đăng nhập vào cửa hàng của bạn</p>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Tài khoản" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                <button onClick={handleLogin}>Đăng nhập</button>
            </div>
        </div>
    );
}

export default Login;
