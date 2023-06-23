import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NumericFormat } from 'react-number-format';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { apiBaseUrl } from '../../constant/constant';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase/app';
import { getCookie } from '../../utils/api';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';

const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'images/' + file.name);

    try {
        // Tải ảnh lên Firebase Storage
        await uploadBytes(storageRef, file);

        // Lấy URL tải xuống của ảnh
        const downloadURL = await getDownloadURL(storageRef);

        // Trả về URL ảnh để sử dụng
        return downloadURL;
    } catch (error) {
        // Xử lý lỗi tải ảnh
        console.log('Lỗi tải ảnh:', error);
        return null;
    }
};

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

const columns = [
    {
        field: 'imgage',
        headerName: 'Ảnh',
        width: 150,
        renderCell: (data) =>
            data.row.image ? (
                <img src={data.row.image} style={{ width: '24px', height: '24px' }} alt="image" />
            ) : (
                <ImageIcon />
            ),
    },
    { field: 'code', headerName: 'Mã SP', width: 200 },
    { field: 'productName', headerName: 'Sản phẩm', width: 250 },
    { field: 'categoryName', headerName: 'Loại', width: 200 },
    { field: 'brand', headerName: 'Thương hiệu', width: 200 },
    // { field: 'inventoryName', headerName: 'Kho', width: 150 },
    // { field: 'originalCost', headerName: 'Giá nhập', width: 160 },
    { field: 'createAt', headerName: 'Ngày tạo', width: 150 },
];

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

export default function Product() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [add, setAdd] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const [name, setName] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [imageURL, setImageURL] = React.useState(null);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [refesh, setRefesh] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const open1 = Boolean(anchorEl1);
    const inputFileRef = React.useRef(null);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
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

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/categories`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setCategories(response.data);
            });
    }, []);

    React.useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/products`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                setRows(response.data);
            });
    }, [refesh]);
    const handleClickRow = (e) => {
        navigate(`${e?.id}`);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        console.log(e.target.value);
    };

    const hangleCreate = async () => {
        const url = await uploadImage(selectedImage);
        const formData = {
            brand: brand,
            categoryCode: category,
            name: name,
            image: url,
        };
        axios
            .post(`${apiBaseUrl}/inventory/products`, formData, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then(() => {
                setAdd(false);
                // handleClickVariant('success');
                setRefesh(refesh + 1);
                handleClickSnackBar();
            });
        console.log(url);
    };

    function handleImageUpload(event) {
        const file = event.target.files[0];
        setSelectedImage(file);
        const imageURLTemp = URL.createObjectURL(file);
        setImageURL(imageURLTemp);
    }

    function deleteImage() {
        if (imageURL) {
            URL.revokeObjectURL(imageURL);
            setImageURL(null);
            inputFileRef.current.value = null;
            setSelectedImage(null);
        }
    }

    React.useEffect(() => {
        if (search !== '') {
            axios
                .get(`${apiBaseUrl}/inventory/products/searchString`, {
                    params: { text: search },
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                })
                .then((response) => {
                    setRows(response.data);
                });
        }
    }, [search]);

    const handleCheckboxChange = (item) => {
        const selectedIndex = selectedItems.indexOf(item);

        if (selectedIndex === -1) {
            // Nếu item chưa tồn tại trong mảng selectedItems, thêm item vào mảng
            setSelectedItems([...selectedItems, item]);
        } else {
            // Nếu item đã tồn tại trong mảng selectedItems, xóa item khỏi mảng
            const updatedItems = [...selectedItems];
            updatedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedItems);
        }
    };

    const handleFilterByCategory = () => {
        console.log(selectedItems);
        if (selectedItems.length > 0) {
            axios
                .post(`${apiBaseUrl}/inventory/products/filter_by_category`, selectedItems, {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                })
                .then((response) => {
                    setRows(response.data);
                    setAnchorEl1(null);
                });
        }
    };

    return (
        <div style={{ width: 'calc(82vw - 44px)' }}>
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
                    sx={{ backgroundColor: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '6px' }}
                    dense={true}
                >
                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}>Tạo sản phẩm</h3>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Tên" />
                            <TextField
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                        <Box>
                            <ListItemText primary="Thương hiệu" />
                            <TextField
                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}
                                value={brand}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'} width={'50%'}>
                            <ListItemText primary="Loại" />
                            <Box width={'100%'}>
                                <Select
                                    size="small"
                                    sx={{ width: 'calc(100% - 6px)' }}
                                    value={category}
                                    onChange={handleChangeCategory}
                                >
                                    {categories?.map((item) => (
                                        <MenuItem key={item?.code} value={item?.code}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageUpload} />
                        {imageURL && (
                            <div>
                                <img style={{ width: '48px', height: '48px' }} src={imageURL} alt="Uploaded" />
                                <button onClick={deleteImage}>Delete Image</button>
                            </div>
                        )}
                    </ListItem>

                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button onClick={hangleCreate} variant="contained" sx={{ margin: '10px' }}>
                                Tạo
                            </Button>
                            <Button
                                onClick={() => {
                                    setAdd(false);
                                    setSelectedImage(null);
                                    setImageURL(null);
                                    inputFileRef.current.value = null;
                                    setName('');
                                    setCategory('');
                                    setBrand('');
                                    console.log(name, brand);
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
            <Paper
                component="form"
                sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, border: '1px' }}
                    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
                    inputProps={{ 'aria-label': 'Tìm kiếm theo tên hoặc mã sản phẩm' }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />

                <Box
                    onClick={handleClick1}
                    size="small"
                    // className={cx('account')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        height: '100%',
                        marginRight: '14px',
                    }}
                    aria-controls={open1 ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? 'true' : undefined}
                >
                    <Button variant="outlined" startIcon={<FilterAltIcon />}>
                        Loại sản phẩm
                    </Button>
                </Box>
                <Menu
                    anchorEl={anchorEl1}
                    id="account-menu"
                    open={open1}
                    onClose={handleClose1}
                    // onClick={handleClose1}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {categories?.map((item, index) => {
                        return (
                            <MenuItem key={index}>
                                <Checkbox
                                    checked={selectedItems.includes(item)}
                                    onChange={() => handleCheckboxChange(item)}
                                />
                                {item?.name}
                            </MenuItem>
                        );
                    })}
                    {/* <MenuItem> */}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedItems([]);
                        }}
                        sx={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleFilterByCategory}
                        sx={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
                    >
                        Lọc
                    </Button>
                    {/* </MenuItem> */}
                </Menu>
                {/* <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<FilterAltIcon />}
                >
                    Bộ lọc
                </Button> */}
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
                <Button
                    onClick={() => {
                        setAdd(true);
                    }}
                    startIcon={<AddIcon />}
                    variant="contained"
                    sx={{ marginRight: '10px' }}
                >
                    Tạo sản phẩm
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <Box>
                        <div>
                            <span>Loại</span>
                            <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Nhãn hiệu</span> <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Giá bán</span> <br />
                            <TextField size="small" variant="outlined" />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Giá nhập</span> <br />
                            <TextField size="small" variant="outlined" />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <div>
                            <span>Tình trạng hàng</span> <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        <Button variant="contained" disableElevation>
                            Lọc
                        </Button>
                    </Box>
                </StyledMenu>
            </Paper>
            <DataGrid
                rows={rows.filter((row) => row.status !== 'delete')}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row.code}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white' }}
                onRowClick={handleClickRow}
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({ from, to, count }) =>
                            `Kết quả từ ${from} đến ${to} trên tổng số ${count}`,
                        labelRowsPerPage: 'Hiển thị',
                    },
                }}
            />
            <div>
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                    TransitionComponent={TransitionDown}
                >
                    <Alert sx={{ padding: '8px' }} severity="success" color="info">
                        Tạo sản phẩm thành công
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
