import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import Link from "next/link";
import Image from "./image";

import classes from './nav.module.css';

const Nav = ({ menus }) => {
  const renderMenu = (menus) => {
    return menus.map((items) => (
      <li key={items?.id} style={{ marginLeft: "" }}>
        <Link href={items?.attributes.url}>
          <span className="">{items?.attributes.title}</span>
        </Link>
        <ul>{renderMenu(items.attributes.children.data)}</ul>
      </li>
    ));
  };

  const { Favicon } = useContext(GlobalContext);
//console.log('NAV.JS  -----Favicon------ ', Favicon);

  return (
    <div className={classes.header}>
      <nav className={`${classes.navbarContainer} ${classes.navbar}`}>
        <div className={classes.navbarLeft}>
          <ul className={classes.navbarNav}>
            <li>
              <Link href="/"><Image image={Favicon} /></Link>
            </li>
          </ul>
        </div>
        <div className={classes.navbarRight}>
          <ul className={classes.navbarNav}>{renderMenu(menus)}</ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
