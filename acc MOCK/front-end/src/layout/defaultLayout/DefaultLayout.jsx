import styles from "./DefaultLayout.module.scss"
import classNames from "classnames/bind";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-wrapper')}>
                <Sidebar/>
            </div>
            <div className={cx('right-wrapper')}>
                <div className={cx('header-wrapper')}>
                    <Header/>
                </div>
                <div className={cx('content-wrapper')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
