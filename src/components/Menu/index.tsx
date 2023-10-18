import React, { useState } from "react";
import { useRouter }  from "next/router";
import { useUser } from "../../context/UserContext";
import CustomMenuIcon from "./menuIcon";
import CustomMenu from "./menu";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useUser();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div>
      <CustomMenuIcon handleClick={handleMenuClick} />
      <CustomMenu isOpen={menuOpen} handleHome={handleHome} handleLogout={handleLogout} />
    </div>
  );
};

export default Menu;