import React from "react";
import { FaBars } from "react-icons/fa";
import styles from "../../styles/menu.module.css";

interface MenuIconProps {
  handleClick: () => void;
}

const CustomMenuIcon: React.FC<MenuIconProps> = ({ handleClick }) => {
  return <FaBars onClick={handleClick} className={styles.menuIcon} />;
};

export default CustomMenuIcon;