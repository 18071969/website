import React from "react";
import Link from "next/link";
import { getStrapiMedia } from "../lib/media";
import Image from "next/image";
import styles from "./footer.module.scss";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = ({ fmenus, cInfo }) => {
  //console.log('FOOTER.JS fmenus = ', fmenus);
  //console.log('FOOTER.JS cInfo.attributes.logo.data = ', cInfo.attributes.logo.data);
  const renderMenu = (fmenus) => {
    return fmenus.map((items) => (
      <li key={items?.id} style={{ marginLeft: "1" }}>
        <Link href={items?.attributes.url}>
          <span className="uk-link-reset">{items?.attributes.title}</span>
        </Link>
        <ul>{renderMenu(items.attributes.children.data)}</ul>
      </li>
    ));
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer1}>
        <Image
          width={200}
          height={80}
          className="h-48 w-full object-cover"
          src={getStrapiMedia(cInfo.attributes.logo)}
          alt={cInfo.attributes.logo}
        />
      </div>
      <div className={styles.footer2}>
        <Link href="mailto:{cInfo.attributes.companyEmail}">email</Link> |{" "}
        {cInfo.attributes.companyName} | {cInfo.attributes.companyAddress} | Copyright &copy; 2023
      </div>
      <div className={styles.footer3}>
        <ul className="uk-navbar-nav">{renderMenu(fmenus)}</ul>
        <ScrollToTopButton />{/**/}
      </div>
    </div>
  );
};

export default Footer;
