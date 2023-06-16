import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ResultCheckLineSearch } from '../../components/ResultSearch/ResultSearch';

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
    { field: 'code', headerName: 'Mã phiếu kiểm', width: 300, },

    { field: 'status', headerName: 'Trạng thái', width: 300 },
    { field: 'staffName', headerName: 'Nhân viên tạo', width: 150 },
    
];

const CheckInventory = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checking, setChecking] = React.useState([])
    const [searchCheckline, setSearchCheckline] = React.useState('')
    const [checkLines,setCheckLines] = React.useState([])
    const [checkline, setCheckine] = React.useState({});
    const getRowId = (row) => row.code
    const open = Boolean(anchorEl);
    React.useEffect(() => {
        axios.get('http://localhost:8086/admin/check_inventory').then((Response) => {
            setChecking(Response.data.data.products);
            // console.log(Response.data.data.products)
            });
    },[])
    const handleCreateCheckRequest = () => {
        navigate('/checkInventory/createChecking')
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenDetail = (code) => {
        navigate(`/checkInventory/${code}`)
    }
    return ( 
        <div style={{ width: 'calc(82vw - 44px)' }}>
            <Paper
                component="form"
                sx={{ p: '2px 0', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: 'white' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, border: '1px' }}
                    placeholder="Tìm kiếm theo mã hiểm hàng"
                    inputProps={{ 'aria-label': 'Tìm kiếm theo mã hiểm hàng' }}
                    label="find check line"
                        // size="small" 
                        // variant="outlined" 
                        id="outlined-start-adornment"
                        onChange={(event) => {
                            setCheckLines(event.target.value);
                        }}
                        onMouseEnter={React.useEffect(() => {
                            if (searchCheckline !== '') {
                                axios
                                    .get('http://localhost:8086/admin/check_inventory/code?code=' + searchCheckline)
                                    .then((Response) => {
                                        setCheckLines(Response.data.data.products);
            
                                    });
                            } else { 
                                setCheckLines([]);
                            }
                        }, [searchCheckline])}
                        
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
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
                <Button onClick={handleCreateCheckRequest} startIcon={<AddIcon />} variant="contained" sx={{ marginRight: '10px' }}>
                    Tạo đơn kiểm hàng
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
                            <span>Trạng thái</span>
                            <br />
                            <TextField size="small" variant="outlined" />
                        </div>
                        
                        <Button variant="contained" disableElevation>
                            Lọc
                        </Button>
                    </Box>
                </StyledMenu>
            </Paper>
            {/* <DataGrid
                rows={checking}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                
                sx={{ width: '100%', marginTop: '10px', backgroundColor: 'white' }}
            /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, margin: '0px' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                        
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Nhân viên tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {checking.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } , cursor: 'pointer'}}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center" onClick={() =>handleOpenDetail(row.code)}>{row.code}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.staffName}</TableCell>
                            
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
     );
}

export default CheckInventory