import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "./image";
import MenuLink from "./MenuLink";

import classes from './nav.module.scss';

const ContentListItem = React.forwardRef(

  ({ children, title, ...props }, forwardedRef) => (
    <ListItem>
      <NavigationMenu.Link
        {...props}
        ref={forwardedRef}
        css={{
          padding: 12,
          borderRadius: 6,
          "&:hover": { backgroundColor: mauve.mauve3 }
        }}
      >
        <LinkTitle>{title}</LinkTitle>
        <LinkText>{children}</LinkText>
      </NavigationMenu.Link>
    </ListItem>
  )
);

const Nav = ({ menus }) => {
  const [value, setValue] = React.useState("3333");

  const renderMenu = (menus) => {
    console.log('NAV ****************************** value ', value);
    return menus.map((items) => (
    
      <NavigationMenu.Item>
          <NavigationMenu.Content  key={items?.id} style={{ marginLeft: "" }}>
    
          <ContentListItem href="https://stitches.dev/" title="Stitches"  key={items?.id}>
            CSS-in-JS with best-in-class developer experience.
          </ContentListItem>
          {/*<Link href={items?.attributes.url} ref={forwardedRef/>
            <NavigationMenu.Link onClick={() => setValue(items?.attributes.title)}>
              <span className="">LINK{items?.attributes.title}</span>
            </NavigationMenu.Link>
    </Link>*/}
       
          <NavigationMenu.Root value={value} onValueChange={setValue}>
            <NavigationMenu.List className={classes.navbarNav} style={{ margin: 0 }}>
              {renderMenu(items.attributes.children.data)}
            </NavigationMenu.List>
          </NavigationMenu.Root>
     
      </NavigationMenu.Content>
      </NavigationMenu.Item>
    ));
    /*return menus.map((items) => (
      <li key={items?.id} style={{ marginLeft: "" }}>
        <Link href={items?.attributes.url}>
          <span className="">{items?.attributes.title}</span>
        </Link>
        <ul>{renderMenu(items.attributes.children.data)}</ul>
      </li>
    ));*/
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
          <MenuLink menus={menus} />
          {/*<NavigationMenu.Root value={value} onValueChange={setValue}>
            <NavigationMenu.List className={classes.navbarNav} style={{ margin: 0 }}>
              {renderMenu(menus)}
            </NavigationMenu.List>
          </NavigationMenu.Root>*/}
        </div>
      </nav>
    </div>
    
  );
};

export default Nav;
