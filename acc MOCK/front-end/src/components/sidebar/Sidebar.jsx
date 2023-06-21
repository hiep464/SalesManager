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
import { useLocation, Link } from 'react-router-dom';

const cx = classNames.bind(styles);
// contained
function NavbarItem({ title, icon, subTitle, variant, location }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List className={cx('list')}>
            <Button
                className={cx('btn')}
                variant={variant}
                onClick={handleClick}
                startIcon={icon}
                sx={{ justifyContent: 'flex-start', padding: '6px 16px' }}
            >
                <span className={cx('title')}>{title}</span>
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subTitle?.map((item, key) => (
                        item?.path ? 
                        <Link to={item.path} key={key} style={{textDecoration: 'none'}}>
                            <ListItemButton onClick={() => {console.log(item)}} sx={{ padding: '4px 0 4px 50px' }}>
                                <ListItemText sx={{ color: '#898989' }} primary={item?.title} />
                            </ListItemButton>
                        </Link>
                        :
                        <ListItemButton onClick={() => {setOpen(true)}} key={key} sx={{ padding: '4px 0 4px 50px' }}>
                            <ListItemText sx={{ color: '#898989' }} primary={item?.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

function Sidebar() {
    const location = useLocation();

    return (
        <Box className={cx('sidebar')}>
            <Stack spacing={0} className={cx('container')}>
                <img src={logo} className={cx('logo')} alt="" />
                <Link to={'/dashboard'} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <NavbarItem
                        location={location}
                        title={'Tổng quan'}
                        icon={<HomeIcon />}
                        variant={location.pathname.includes('dashboard') ? 'contained' : 'text'}
                    />
                </Link>
                <NavbarItem
                    location={location}
                    title={'Bán hàng'}
                    icon={<StorefrontIcon />}
                    variant={'text'}
                    subTitle={[{title: 'Bán tại quầy'}, {title: 'Báo cáo'}]}
                />
                <NavbarItem
                    location={location}
                    title={'CSKH'}
                    icon={<SupportAgentIcon />}
                    variant={'text'}
                    subTitle={[{title: 'Khách hàng'}, {title: 'Phản hồi'}]}
                />
                <NavbarItem
                    location={location}
                    title={'Quản lý kho'}
                    icon={<WarehouseIcon />}
                    variant={location.pathname.includes('inventory') ? 'contained' : 'text'}
                    subTitle={[{title: 'Sản phẩm', path: '/inventory/product'}, {title: 'Đặt hàng', path: '/inventory/booking'}, {title: 'Nhập hàng'}, {title: 'Kiểm hàng',path: '/inventory/check_inventory'}]}
                />
            </Stack>
        </Box>
    );
}

export default Sidebar;
