import styles from "./ItemDetailLayout.scss"
import classNames from "classnames/bind";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";

const cx = classNames.bind(styles)

function ItemDetailLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-wrapper')}>
                <Sidebar/>
            </div>
            <div className={cx('right-wrapper')}>
                <div className={cx('content-wrapper')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ItemDetailLayout;