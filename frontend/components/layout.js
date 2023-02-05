import Nav from "./nav";


const Layout = ({ children, /*categories,*/ menus, seo }) => (
  <>
    <Nav menus={menus} />
    {children}
  </>
);

export default Layout;