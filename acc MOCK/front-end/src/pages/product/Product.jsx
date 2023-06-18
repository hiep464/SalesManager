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
    { field: 'img', headerName: 'Ảnh', width: 100, renderCell: () => <ImageIcon /> },
    { field: 'code', headerName: 'Mã SP', width: 200 },
    { field: 'name', headerName: 'Sản phẩm', width: 200 },
    { field: 'categoryCode', headerName: 'Loại', width: 150 },
    { field: 'price', headerName: 'Giá bán', width: 150 },
    { field: 'inventoryName', headerName: 'Kho', width: 150 },
    { field: 'originalCost', headerName: 'Giá nhập', width: 160 },
    { field: 'createAt', headerName: 'Ngày tạo', width: 160 },
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
    // const [categoryCode, setCategoryCode] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [inventory, setInventory] = React.useState('');
    const [inventories, setInventories] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const [originCost, setOriginCost] = React.useState(0);
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

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
        axios.get(`${apiBaseUrl}/products/page?page=0&size=24`).then((response) => {
            setRows(response.data);
        });

        axios.get(`${apiBaseUrl}/categories`).then((response) => {
            setCategories(response.data);
        });

        axios.get(`${apiBaseUrl}/inventories`).then((response) => {
            setInventories(response.data);
        });
    }, []);

    const handleClickRow = (e) => {
        navigate(`${e?.id}`);
    };

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeInventory = (e) => {
        setInventory(e.target.value);
        console.log(e.target.value);
    };

    const hangleCreate = () => {
        const formData = {
            brand: brand,
            categoryCode: category,
            inventoryName: inventory,
            name: name,
            originalCost: parseFloat(originCost.replace(/,/g, '')),
            price: parseFloat(price.replace(/,/g, '')),
        };
        axios.post(`${apiBaseUrl}/products`, formData).then(() => {
            setAdd(false);
            // handleClickVariant('success');
            handleClickSnackBar();
        });
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
                        <Box width={'50%'}>
                            <ListItemText primary="Kho" />
                            <Select
                                size="small"
                                sx={{ width: 'calc(100%)' }}
                                value={inventory}
                                onChange={handleChangeInventory}
                            >
                                {inventories?.map((item) => (
                                    <MenuItem key={item?.name} value={item?.name}>
                                        {item?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box marginRight={'12px'}>
                            <ListItemText primary="Giá bán" />
                            <NumericFormat
                                thousandSeparator={true}
                                prefix={''}
                                customInput={TextField}
                                type="text"
                                // Các thuộc tính khác của TextField
                                size="small"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </Box>
                        <Box>
                            <ListItemText primary="Giá nhập" />
                            <NumericFormat
                                thousandSeparator={true}
                                prefix={''}
                                customInput={TextField}
                                type="text"
                                // Các thuộc tính khác của TextField
                                size="small"
                                onChange={(e) => {
                                    setOriginCost(e.target.value);
                                }}
                            />
                        </Box>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button onClick={hangleCreate} variant="contained" sx={{ margin: '10px' }}>
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
                />
                <Divider sx={{ height: 28, margin: '4px 20px' }} orientation="vertical" />
                <Button
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
                </Button>
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
                rows={rows}
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
            />
            <div>
                {/* <Button onClick={handleClickSnackBar}>Open simple snackbar</Button> */}
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                    TransitionComponent={TransitionDown}
                    // message="Tạo sản phẩm thành công"
                    // action={action}
                >
                    <Alert sx={{padding: '8px'}} severity="success" color="info">
                        Tạo sản phẩm thành công
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

// export default function Product() {
//     return (
//       <SnackbarProvider persist>
//         <ProductElement />
//       </SnackbarProvider>
//     );
// }
