import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
//import { violet, mauve, indigo, purple, blackA } from "@radix-ui/colors";
import styles from "./test.module.scss";

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 }
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 }
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(200px)", opacity: 0 }
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-200px)", opacity: 0 }
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 }
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 }
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  /*width: "100vw",*/
  zIndex: 1
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  /*backgroundColor: "#e4f1f1",*/
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
  /*boxShadow: `0 2px 10px grey`*/
});

const itemStyles = {
  padding: "8px 12px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: '#333',
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px grey` },
  "&:hover": { backgroundColor: 'silver' }
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  /*backgroundColor: 'orange',
  border: "1px solid green",*/
  gap: 2
});

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  color: 'blue',
  top: 1,
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "transform 250ms ease"
  }
});

const StyledTriggerWithCaret = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      {/*console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM StyledTriggerWithCaret children',children)*/}
      <StyledCaret aria-hidden />
    </StyledTrigger>
  )
);

const StyledTriggerWithNoCaret = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      {/*console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM StyledTriggerWithNoCaret children',children)*/}
    </StyledTrigger>
  )
);

const StyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  fontSize: 15,
  lineHeight: 1,
});

const StyledContent = styled(NavigationMenuPrimitive.Content, { //dropdown menu
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    /*'&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight }*/
  }
});

const StyledIndicator = styled(NavigationMenuPrimitive.Indicator, { //karetkata (strelkata pod menuto)
  
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: 10,
  top: "100%",
  overflow: "hidden",
  zIndex: 1,

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, transform 250ms ease",
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` }
  }
});

const StyledArrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "white",
  width: 10,
  height: 10,
  transform: "rotate(45deg)",
  borderTopLeftRadius: 2
});

const StyledIndicatorWithArrow = React.forwardRef((props, forwardedRef) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
));

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  /*border: "5px solid blue",*/
  position: "relative",
  transformOrigin: "top center",
  marginTop: 10,
  width: "100%",
  backgroundColor: "white;",
  borderRadius: 6,
  overflow: "hidden",
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  height: "var(--radix-navigation-menu-viewport-height)",
  /*backgroundColor: 'rgb(200, 69, 203) !important',
  border: '3px solid yellow',*/
  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)"
  },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 300ms ease",
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` }
  }
});

// Exports
const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuTriggerNoCaret = StyledTriggerWithNoCaret;
const NavigationMenuLink = StyledLink;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;
const NavigationMenuIndicator = StyledIndicatorWithArrow;

// Your app...
const ContentList = styled("ul", {
  display: "grid",
  /*padding: 22,*/
  padding: 0,
  margin: 0,
  columnGap: 10,
  listStyle: "none",

  variants: {
    layout: {
      one: {
        "@media only screen and (min-width: 600px)": {
          width: 500,
          gridTemplateColumns: ".75fr 1fr"
        }
      },
      two: {
        "@media only screen and (min-width: 600px)": {
          width: 600,
          gridAutoFlow: "column",
          gridTemplateRows: "repeat(3, 1fr)"
        }
      }
    }
  }
});

const ListItem = styled("li", {});

const LinkTitle = styled("div", {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: 'black'
});

const LinkText = styled("p", {
  all: "unset",
  color: 'mauve',
  lineHeight: 1.4,
  fontWeight: "initial"
});

const ContentListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => {
   
  const router = useRouter();
  //if(router.locale === 'en') props.href = '/'+router.locale+props.href;
    
  const isActive = (router.locale !== 'en') ? ('/'+router.locale+router.asPath === props.href) : (router.asPath === props.href);
  //const isActive = '/'+router.locale+router.asPath === props.href;
  /*console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ router.asPath ", router.asPath);
  console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ router.locale+router.asPath === ", '/'+router.locale+router.asPath);
  console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ props.href ", props.href);
  console.log("MENU_LINK $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ isActive ", isActive);*/

    return (
    <ListItem>
      <NavigationMenuLink
        {...props}
        ref={forwardedRef}
        active={isActive}
        className={styles.NavigationMenuLink}
        css={{
          /*padding: 12,*/
          padding: 3,
          borderRadius: 6,
          "&:hover": { backgroundColor: 'silver' },
          width: '150px'
        }}
      >
        <LinkTitle>{title}</LinkTitle>
        <LinkText>{children}</LinkText>
      </NavigationMenuLink>
    </ListItem>
    );
  }
);

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  top: "100%",
  left: 0,
  perspective: "100%"
});

const renderMenu = (menus) => {
    /*var i=0; console.log('TEST BBBBBBBBBBBBBBBBBBBBBBBBBBBBB<NavigationMenuItem> BEGIN i = ', i);*/

    return menus.map((items, index) => {
    
    const router = useRouter();
    //console.log('TEST <NavigationMenuItem> router = ', router);
    let url = '/'+ router.locale + router.asPath;
    //const isActive = url === items?.attributes.url; 
    const isActive = (router.locale !== 'en') ? url === items?.attributes.url : router.asPath === items?.attributes.url; 
    //const isActive = router.asPath === items?.attributes.url;
    /*console.log("MENU_LINK renderMenu $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ url = ", url);
    console.log("MENU_LINK renderMenu $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ router.asPath = ", router.asPath);
    console.log("MENU_LINK renderMenu $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ items?.attributes.url = ", items?.attributes.url);
    console.log("MENU_LINK renderMenu $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ isActive ", isActive);*/

    //console.log('TEST <NavigationMenuItem> /router.locale/router.asPath = ', '/'+ router.locale + router.asPath);
    //console.log('TEST <NavigationMenuItem> items?.attributes.url = ', items?.attributes.url);
    //console.log('TEST <NavigationMenuItem> items.attributes.children = ', items.attributes.children);
    //console.log('TEST <NavigationMenuItem> items.attributes.children.data = ', items.attributes.children.data);
    //console.log('TEST <NavigationMenuItem> items.attributes.children?.data[index] = ', items.attributes.children?.data[index]);
    //console.log('TEST <NavigationMenuItem> items.attributes.children?.data[0]?.id = ', items.attributes.children?.data[0]?.id);

    return (
       <Fragment key={index}>
          {(Object.keys(items.attributes.children.data).length===0) && (
         
          <NavigationMenuItem key={index}>   
          {/*console.log('=============================== ')*/}
          {/*console.log('TEST <NavigationMenuItem> key={index} = ', index)*/}
            {/*console.log('TEST <NavigationMenuItem> items = ', items)*/}
            <NavigationMenuLink  active={isActive} className={styles.NavigationMenuLink} href={items?.attributes.url}  /*key={items?.id}*/>
            {/*console.log('  TEST <NavigationMenuLink> key={items?.id} = ', items?.id)*/}
              <NavigationMenuTriggerNoCaret /*key={items?.id}*/>
              {/*console.log('    TEST <NavigationMenuTriggerNoCaret key={items?.id}> = ', items?.id)*/}
                {items?.attributes.title}
              </NavigationMenuTriggerNoCaret>
            </NavigationMenuLink>
          </NavigationMenuItem>
          )}
          {(Object.keys(items.attributes.children.data).length>0) && (
              <NavigationMenuItem >{/*key={items?.id}*/}
              {/*console.log('TEST <NavigationMenuItem key={items?.id}> ', items?.id)*/}
                  <NavigationMenuLink  active={isActive} className={styles.NavigationMenuLink} href={items?.attributes.url}  key={items?.id}/**/>
                  {/*console.log('  TEST <NavigationMenuLink key={items?.id}> ', items?.id)*/}
                    <NavigationMenuTrigger >{/*key={items?.id}*/}
                    {/*console.log('    TEST <NavigationMenuTrigger key={items?.id}> = ', items?.id)*/}
                      {items?.attributes.title}           
                    </NavigationMenuTrigger>
                  </NavigationMenuLink>
                  {(Object.keys(items.attributes.children.data).length>0) && 
                  <NavigationMenuContent>
                {/*<NavigationMenu.Sub defaultValue="sub1"></NavigationMenu.Sub>*/} 
                    <ContentList layout="" key="11">
                      {items.attributes.children.data.map((k, value) => {
                        //console.log('TEST <NavigationMenuItem> K = ', k, ' value = ', value);
                        //console.log('TEST <NavigationMenuItem> items.attributes.children?.data[value]?.id = ', items.attributes.children?.data[value]?.id);
                        let urlSub = '/'+ router.locale + router.asPath;
                        const isActiveSub = urlSub === items.attributes.children?.data[value]?.attributes.url;
                        //console.log('TEST <NavigationMenuItem> isActiveSub === ', isActiveSub,  'urlSub = ', urlSub, ' items.attributes.children?.data[value]?.attributes.url = ', items.attributes.children?.data[value]?.attributes.url);
                        {/*console.log('      TEST <NavigationMenuContent  <ContentList <ContentListItem  key={items.attributes.children?.data[value]?.id}> ', items.attributes.children?.data[value]?.id)*/}
                        return <ContentListItem active={isActiveSub} className={styles.SubMenuLink}  key={items.attributes.children?.data[value]?.id}/**/
                          css={{
                            display: 'block !important',
                            visibility: 'visible !important',
                            background: `linear-gradient(135deg, #fff 0%, #000 100%);`,
                            border: '3px solid black',
                          }}
                          title={items.attributes.children?.data[value]?.attributes.title}
                          href={items.attributes.children?.data[value]?.attributes.url}
                        ></ContentListItem>
                      })}
                      
                        {/*renderMenu(items.attributes.children.data)*/}
                      
                    </ContentList>
                  
                  </NavigationMenuContent>}
              </NavigationMenuItem>
          )}
        </Fragment>);
      }
    ); 
  }

export const NavigationMenuDemo = (menus) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
{/*
        <NavigationMenuItem>
          <NavigationMenuLink href="https://github.com/radix-ui">
            About us
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentList layout="undefined">
              <ContentListItem
                title="Service 1"
                href="/docs/primitives/overview/introduction"
              >
              </ContentListItem>
              <ContentListItem
                title="Service 2"
                href="/docs/primitives/overview/getting-started"
              >
              </ContentListItem>
 
            </ContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>*/}
         {renderMenu(menus.menus)}
        <NavigationMenuIndicator />
      </NavigationMenuList>
     
      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
/*
const ContentListItemCallout = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <ListItem css={{ gridRow: "span 3" }}>
      <NavigationMenuLink
        {...props}
        href="/"
        ref={forwardedRef}
        active={true}
        css={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, 'purple' 0%, 'indigo' 100%);`,
          borderRadius: 6,
          padding: 25
        }}
      >
        <svg
          aria-hidden
          width="38"
          height="38"
          viewBox="0 0 25 25"
          fill="white"
        >
          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
          <path d="M12 0H4V8H12V0Z"></path>
          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
        </svg>
        <LinkTitle
          css={{
            fontSize: 18,
            color: "white",
            marginTop: 16,
            marginBottom: 7
          }}
        >
          Radix Primitives
        </LinkTitle>
        <LinkText
          css={{
            fontSize: 14,
            color: "mauve",
            lineHeight: 1.3
          }}
        >
          Unstyled, accessible components for React.
        </LinkText>
      </NavigationMenuLink>
    </ListItem>
  )
);*/

