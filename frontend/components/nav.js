import React from "react";
import Link from "next/link";
import { getMenuUrl } from "../lib/api";

/*async function wait(x) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return  getPageUrl(x);
}
function f(x) {
  // shows result after 1 second
  wait(x).then(result => console.log('CALL from XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx', result));
}*/

const Nav = ({ menus }) => {

 //console.log('NAV component menus ;;;;;;;;;;;;;;;;;;;;;;;;;; ', menus.attributes);
  //if(menus !== undefined) console.log('NAV component menus ::::::::::::::: ', menus.attributes.MenuTab);
  console.log("NAV component menus ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ", menus)
  

  /*const renderMenu = (links: NavbarContents) => {
    return links.map((menuItem: NavbarItem | NavbarGroup | string) => (
      <div style={{ marginLeft: "10px" }}>
        <a href={menuItem?.link}>{menuItem?.text}</a>
        {menuItem?.children && renderMenu(menuItem?.children)}
      </div>
    ));

    const renderMenu = (links) => {
      return links.map((menuItem) => (
        <div style={{ marginLeft: "10px" }}>
          <a href={menuItem?.link}>{menuItem?.Name}</a>
          {menuItem?.SubMenuItem && renderMenu(menuItem?.SubMenuItem)}
        </div>
      ));
    }*/
    
    const renderMenu = (menus) => {      
      return menus.map((items) => (       
         
        <li key={items?.id} style={{ marginLeft: "10px"}}>
          <Link href={items?.attributes.url}><span className="uk-link-reset">{items?.attributes.title}</span></Link>
          {console.log("items?.attributes.url ******************************* ", items?.attributes.url)}
          {console.log("items.attributes.children ******************************* ", items.attributes.children)}
          <ul>
          {renderMenu(items.attributes.children.data)}
          </ul>
        </li>
  
      ));
    }
    //let allTabs = menus.attributes.MenuTab;
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                Logo | Strapi NextJs website
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">         
          <ul className="uk-navbar-nav">
          {renderMenu(menus)}
           {/*allTabs.map((menu) => {
              //console.log('=', menu);
              return (
                <li key={menu.id}>
                  <Link href={`/pages${menu.page.data.attributes.URL}`}>
                    <span className="uk-link-reset">{menu.Name}</span>
                  </Link>                  

                  {(menu.SubMenuItem !== undefined && menu.SubMenuItem.length > 0) &&
                    menu.SubMenuItem.map((item) => {
 
                      return(
                      <ul>
                        <li key={item.id}>
                          <Link href={`/pages/${item.URL}`}>
                            <span>{item.Name}</span>
                          </Link>
                        </li>
                      </ul>);
                    })}
               
                </li>
              );
            })}*/}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;