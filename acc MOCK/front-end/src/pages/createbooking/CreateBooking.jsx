import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function CreateBooking() {
    return ( 
        <Box>
            <Box sx={{width: 'calc(82vw - 44px)', display: 'flex', justifyContent: 'space-between'}}>
                <Box width={'60%'} backgroundColor={'white'}>
                    <h3>Thông tin nhà cung cấp</h3>
                    <TextField size="small" variant="outlined" />
                </Box>
                <Box width={'35%'} backgroundColor={'white'}>
                    <h3>Thông tin đơn đặt hàng</h3>
                    <div>
                        Kho: kho 1
                    </div>
                    <div>
                        nhân viên: bảo
                    </div>
                    <div>
                        Ngày nhập: 
                    </div>
                </Box>
            </Box>
            <Box sx={{backgroundColor: 'white', width: 'calc(82vw - 44px)', marginTop: '10px'}}>
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
                </Paper>
            </Box>
            <Box backgroundColor={'white'} marginTop={'20px'}>
                <Box sx={{float: 'right'}}>
                    Số lượng <br />
                    Thành tiền <br />
                    Số tiền cần trả <br />
                </Box>
            </Box>
        </Box>
     );
}

export default CreateBooking;