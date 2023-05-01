// index.jsx
import { useRouter, useState } from "next/router";
import NextLink from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styles from "./MenuLink.module.scss";

const Link = ({ href, ...props }) => {
  console.log("MENU_LINK ****************************** props ", props);
  const router = useRouter();
  //const isActive = useState(false);
  const isActive = router.asPath === href;
  console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ href ", href);
  console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ isActive ", isActive);

  return (
    <NextLink href={href} passHref>
      <NavigationMenu.Link
        className={styles.NavigationMenuLink}
        active={isActive}
        css={{
          padding: 12,
          borderRadius: 6,
          "&:hover": { backgroundColor: "blue" },
        }}
        {...props}
      />
    </NextLink>
  );
};

const renderMenu = (argnts) => {
  return argnts.map((items) => (
    <NavigationMenu.List>
      <NavigationMenu.Item key={items?.id}>
        <Link href={items?.attributes.url}>
          <span className="">{items?.attributes.title}</span>
        </Link>
      </NavigationMenu.Item>
      {items.attributes.children && (
        <NavigationMenu.Sub>
          {renderMenu(items.attributes.children.data)}
        </NavigationMenu.Sub>
      )}
    </NavigationMenu.List>
  ));
};

export default (menus) => {
  //console.log('MENU_LINK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! menus ', menus);
  return (
    <NavigationMenu.Root>
      {/*<NavigationMenu.List></NavigationMenu.List>*/}
      {renderMenu(menus.menus)}
    </NavigationMenu.Root>
  );
};
