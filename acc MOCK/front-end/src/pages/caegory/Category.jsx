import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../constant/constant';
import { getCookie } from '../../utils/api';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
    { field: 'code', headerName: 'Mã loại SP', width: 250 },
    { field: 'name', headerName: 'Tên', width: 250 },
    { field: 'description', headerName: 'Mô tả', width: 400 },
    { field: 'createAt', headerName: 'Ngày tạo', width: 100 },
];

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

function Category() {
    const [categories, setCategories] = useState([]);
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [refesh, setRefesh] = useState(0);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSnackBar = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/categories`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((res) => {
                setCategories(res.data);
            });
    }, [refesh]);

    const handleCreate = () => {
        axios
            .post(
                `${apiBaseUrl}/inventory/categories`,
                { name: name, description: description },
                {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                },
            )
            .then(() => {
                setAdd(false);
                setRefesh(refesh + 1);
                setMessage('Tạo loại sản phẩm thành công');
                handleClickSnackBar();
                setName('');
                setDescription('');
            });
    };

    const handleUpdate = () => {
        axios
            .put(`${apiBaseUrl}/inventory/categories`, category, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then(() => {
                setUpdate(false);
                setMessage('Cập nhật loại sản phẩm thành công');
                handleClickSnackBar();
                setCategory({});
                setRefesh(refesh + 1);
            });
    };

    const handleDelete = () => {
        axios
            .delete(`${apiBaseUrl}/inventory/categories/${category?.id}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then(() => {
                setMessage('Xóa thành công');
                handleClickSnackBar();
                setUpdate(false);
                setOpen(false)
                setRefesh(refesh + 1);
            });
    };
    return (
        <div>
            <Box
                zIndex={1000}
                display={add ? 'flex' : 'none'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'fixed'}
                top={'0'}
                left={'0'}
                right={'0'}
                bottom={'0'}
                backgroundColor={'rgba(220,220,220, 0.6)'}
            >
                <List
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '6px',
                        padding: '0 18px',
                    }}
                    dense={true}
                >
                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}>Thêm loại sản phẩm</h3>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Tên" />
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                sx={{ width: '220px' }}
                            />
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Mô tả" />
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                size="small"
                                multiline
                                rows={4}
                                sx={{ width: '220px' }}
                            />
                        </Box>
                    </ListItem>

                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button onClick={handleCreate} variant="contained" sx={{ margin: '10px' }}>
                                Tạo
                            </Button>
                            <Button
                                onClick={() => {
                                    setAdd(false);
                                }}
                                variant="outlined"
                                sx={{ margin: '10px' }}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </ListItem>
                </List>
            </Box>
            <Box
                zIndex={1000}
                display={update ? 'flex' : 'none'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'fixed'}
                top={'0'}
                left={'0'}
                right={'0'}
                bottom={'0'}
                backgroundColor={'rgba(220,220,220, 0.6)'}
            >
                <List
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '6px',
                        padding: '0 18px',
                    }}
                    dense={true}
                >
                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}>Cập nhật loại sản phẩm</h3>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Tên" />
                            {/* <TextField  defaultValue={category?.description} size="small" sx={{ width: '220px' }} /> */}
                            {console.log(category?.name)}
                            <TextField
                                value={category?.name}
                                onChange={(e) => {
                                    setCategory((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Mô tả" />
                            <TextField
                                value={category?.description}
                                size="small"
                                multiline
                                rows={4}
                                onChange={(e) => {
                                    setCategory((prevState) => ({
                                        ...prevState,
                                        description: e.target.value,
                                    }));
                                }}
                                sx={{ width: '220px' }}
                            />
                        </Box>
                    </ListItem>

                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button onClick={handleUpdate} variant="contained" sx={{ margin: '10px' }}>
                                Lưu
                            </Button>
                            <Button
                                onClick={() => {
                                    handleClickOpen();
                                    setUpdate(false);
                                }}
                                variant="outlined"
                                color="error"
                            >
                                Xóa
                            </Button>
                            <Button
                                onClick={() => {
                                    setUpdate(false);
                                }}
                                variant="outlined"
                                sx={{ margin: '10px' }}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ float: 'right', marginBottom: '10px' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setAdd(true);
                    }}
                >
                    Thêm loại sản phẩm
                </Button>
            </Box>
            <Paper
                component="form"
                sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, border: '1px' }}
                    placeholder="Tìm kiếm theo tên hoặc mã loại sản phẩm"
                    inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã loại sản phẩm' }}
                />
            </Paper>
            <DataGrid
                rows={categories}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={true}
                getRowId={(row) => row.code}
                sx={{ width: 'calc(82vw - 44px)', marginTop: '10px', backgroundColor: 'white' }}
                // onRowClick={handleClickRow}
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            `Kết quả từ ${from} đến ${to} trên tổng số ${count}`,
                        labelRowsPerPage: 'Hiển thị',
                    },
                    footerRowSelected: (i) => `${i} được chọn`,
                }}
                disableRowSelectionOnClick
                onRowSelectionModelChange={(e) => {
                    console.log(e);
                }}
                onRowClick={(e) => {
                    console.log(e?.row);
                    setCategory(e.row);
                    setUpdate(true);
                }}
            />
            <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                TransitionComponent={TransitionDown}
            >
                <Alert sx={{ padding: '8px' }} severity="success" color="info">
                    {message}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Bạn có chắc chắn muốn xóa loại sản phẩm này?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sau khi xóa sẽ không thể hoàn tác được
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Category;
