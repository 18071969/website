import Nav from "./nav";
import classes from "./layout.module.css";

const Layout = ({ children, /*categories,*/ menus, seo }) => (
  <div className={classes.container}>   
      <Nav menus={menus} />
      <main>{children}</main> 
  </div>
);

export default Layout;
