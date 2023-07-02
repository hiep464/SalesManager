import { Paper } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddCustomer.scss';
import axios from 'axios';
import { getCookie } from '../../utils/api';

function AddCustomer(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const onClickClose = (e) => {
        props.handleCloseAddCustomer();
    };

    const createCustomer = (name, email, phone) => {
        return axios.post(
            'http://localhost:8080/admin/care/customers/customers',
            {
                name: name,
                phone: phone,
                email: email,
            },
            {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            },
        );
    };

    return (
        <div className="AddCustomer">
            <Paper elevation={3} sx={{ width: '500px' }}>
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Họ và tên"
                            variant="outlined"
                            sx={{ width: '100%', margin: '10px' }}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined"
                            sx={{ width: '90%', margin: '10px' }}
                            onChange={(event) => {
                                setPhone(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="email"
                            variant="outlined"
                            sx={{ width: '95%', margin: '10px' }}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="error" onClick={onClickClose} sx={{ marginRight: '20px' }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                createCustomer(name, email, phone);
                                onClickClose();
                            }}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default AddCustomer;
