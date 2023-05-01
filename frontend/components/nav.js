import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "./image";
import NavigationMenuDemo from "./test";
import LanguageSwitcher from "./languageSwitcher";
//import MenuLink from "./MenuLink";

import classes from './nav.module.scss';

const Nav = ({ menus }) => {
  const [value, setValue] = React.useState("3333");

 const { Favicon } = useContext(GlobalContext);
//console.log('NAV.JS  -----Favicon------ ', Favicon);

  return (
    <nav className={`${classes.navbarContainer} ${classes.navbar}`}>
      <div className={classes.navbarLeft}>
        <ul className={classes.navbarNav}>
          <li>
            <Link href="/"><Image image={Favicon} /></Link>
          </li>
        </ul>
      </div>
      <div className={classes.navbarRight}>
        {/*<MenuLink menus={menus} />*/}
        <NavigationMenuDemo menus={menus} />
        <LanguageSwitcher />
      </div>
    </nav>    
  );
};

export default Nav;
