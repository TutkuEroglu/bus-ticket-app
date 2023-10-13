import React from "react";
import styles from "../../styles/menu.module.css";

interface MenuProps {
  isOpen: boolean;
  handleHome: () => void;
  handleLogout: () => void;
}

const CustomMenu: React.FC<MenuProps> = ({
  isOpen,
  handleHome,
  handleLogout,
}) => {
  return (
    <div className={isOpen ? styles.menuContainer : styles.hidden}>
      <ul className={styles.menuList}>
        <li className={styles.menuListItem} onClick={handleHome}>
          Anasayfa
        </li>
        <li className={styles.menuListItem} onClick={handleLogout}>
          Çıkış Yap
        </li>
      </ul>
    </div>
  );
};

export default CustomMenu;