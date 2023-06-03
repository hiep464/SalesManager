import Box from '@mui/material/Box';
import logo from '../../assets/images/logo.webp';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const cx = classNames.bind(styles);
// contained
function NavbarItem({ title, icon, subTitle, variant }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List className={cx('list')}>
            <Button className={cx('btn')} variant={variant} onClick={handleClick} startIcon={icon} sx={{justifyContent: 'flex-start', padding: '6px 16px'}}>
                <span className={cx('title')}>{title}</span>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subTitle?.map((item, key) => (
                        <ListItemButton key={key} sx={{ padding: '4px 0 4px 50px' }}>
                            <ListItemText sx={{color: '#898989'}} primary={item} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

function Sidebar() {

    return (
        <Box className={cx('sidebar')}>
            <Stack spacing={0} className={cx('container')}>
                <img src={logo} className={cx('logo')} alt="" />
                <NavbarItem title={"Tổng quan"} icon={<HomeIcon/>} variant={"contained"}/>
                <NavbarItem title={"Bán hàng"} icon={<StorefrontIcon/>} variant={"text"} subTitle={["Bán tại quầy", "Báo cáo"]}/>
                <NavbarItem title={"CSKH"} icon={<SupportAgentIcon/>} variant={"text"} subTitle={["Khách hàng", "Phản hồi"]}/>
                <NavbarItem title={"Quản lý kho"} icon={<WarehouseIcon/>} variant={"text"} subTitle={["Sản phẩm", "Đặt hàng", "Nhập hàng", "Kiểm hàng"]}/>
            </Stack>
        </Box>
    );
}

export default Sidebar;
