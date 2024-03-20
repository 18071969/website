import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    //process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  //console.log('fetchAPI mergedOptions === ', mergedOptions);
  // Build request URL
  const queryString = qs.stringify(urlParamsObject);

  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;
  //console.log('fetchAPI requestUrl === ', requestUrl);
  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.json}`);

  // Handle response
  if (!response.ok) {
    console.error('Handle ERROR response', response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();

  return data;
}

export async function getItemBySlug(slug) {
  const [postsRes] = await Promise.all([
    fetchAPI("/posts", { populate: ["featuredImage", "category"] }),
  ]);

  let itemId = null;
  postsRes.data.map(
    (post) => (itemId = post.attributes.slug === slug && post.id)
  );
  return itemId;
}

export function getMenuUrl(menus, id) {
  let url = "";
  menus.attributes.MenuTab.forEach((element) => {
    if (element.id === id) {
      if (element.Name === element.page.data.attributes.Title) {
        url = element.page.data.attributes.URL;
      }
    }
  });
  return url;
}

export function getSubMenuUrl(menus, menu_id, sub_id) {
  let url = null;
  menus.attributes.MenuTab.forEach((element) => {
    if (element.id === id) {
      if (element.Name === element.page.data.attributes.Title) {
        url = element.page.data.attributes.URL;
      }
    }
  });
  return url;
}

export async function getMenu() {
  const menusRes = await Promise.all([
    fetchAPI("/main-menu", {
      populate: {
        MenuTab: { populate: "*" },
        SubMenuItem: {
          populate: {
            page: { populate: "*" },
          },
        },
      },
    }),
  ]);
  return menusRes;
}

export function getSetStyleRule_1(sheetName, selector, rule) {

  /*var stylesheet = document.querySelector('link[href*=' + sheetName + ']')
  console.log('getSetStyleRule stylesheet === ', stylesheet);
  if( stylesheet ){
      stylesheet = stylesheet.sheet
      stylesheet.insertRule(selector + '{ ' + rule + '}', stylesheet.cssRules.length)
  } else console.log('getSetStyleRule Noo stylesheet ');*/

  const stylesheet = document.styleSheets[1];
  const slideWrapper = [...stylesheet.cssRules].find((r) => r.selectorText === "slide_wrap");
  slideWrapper.style.setProperty('--c1', newColor);
  slideWrapper.stlye.setProperty('--c2', newColor);

  return stylesheet;
}

function getSetStyleRule(sheetName, selector, rule) {
  var stylesheet = document.querySelector('link[href*=' + sheetName + ']')
  console.log('API.JS function getSetStyleRule stylesheet  === ', stylesheet);
  if( stylesheet ){
      stylesheet = stylesheet.sheet
      stylesheet.insertRule(selector + '{ ' + rule + '}', stylesheet.cssRules.length)
  }

  return stylesheet
}
// Usage example getSetStyleRule('main', 'body', 'background:red')

/*export async function loadCssVar() {
  const res = await fetch('http://localhost:3000/api/css-variables')
    .then ((response) => {
      console.log('API.JS loadCssVar response ============================ ', response.data)})
    .then((data) => {
      console.log('API.JS loadCssVar data ============================ ', data);
    });
  return res;
}*/
// Usage example
//getSetStyleRule('main', 'body', 'background:red')

const loadCssVar = async () => { 
  try {
    const [result] = await Promise.all([
      fetchAPI("/options-panel-general-settings-stylings", { 
        populate: {
          GeneralSettingsStyling: { populate: "*" },
        }
      }),
    ]);
    return await result;
  } catch (err) {
    console.log('API CSS Variables loadCssVar - error', err);
  }
}

//determines if the user has a set theme
export function detectColorScheme(){
  var theme = "light";    //default to light

  //local storage is used to override OS theme settings
  if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") == "dark"){
          var theme = "dark";
      }
  } else if(!window.matchMedia) {
      //matchMedia method not supported
      return false;
  } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //OS theme setting detected as dark
      var theme = "dark";
  }

  //dark theme preferred, set document with a `data-theme` attribute
  if (theme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    console.log("data-theme === ", document.documentElement)
  } else if (theme == "light") {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

export function changeColor(color, amount) { // #FFF not supportet rather use #FFFFFF
  const clamp = (val) => Math.min(Math.max(val, 0), 0xFF)
  const fill = (str) => ('00' + str).slice(-2)

  const num = parseInt(color.substr(1), 16)
  const red = clamp((num >> 16) + amount)
  const green = clamp(((num >> 8) & 0x00FF) + amount)
  const blue = clamp((num & 0x0000FF) + amount)
  return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
}

export async function setCssVar (/*variableName, value, suffix*/) {

  const data = await loadCssVar();  
  //data => ({status: r.status, body: lala})
  //console.log('33333333333333333333333333331234567 data  = ', data);
  //console.log('33333333333333333333333333331234567 data[0].attributes  = ', data.data[0].attributes.GeneralSettingsStyling);
  const arrdata = data.data[0].attributes.GeneralSettingsStyling;
  console.log('API.JS data.data[0].attributes.GeneralSettingsStyling  = ', arrdata);
  //arrdata.map(key => value)
  /*arrdata.map ((value, key) => {
    console.log('KEY === ', key + ' ,VALUE = ' + value) ;
  })*/
  /*for (const [key, value] of Object.entries(arrdata)) {
    console.log(`${key}: ${value}`);
    if (key === 'BackgroundColor') {
      console.log('VALUE === ', value);
      //const val = document.documentElement.style.setProperty(`--${variableName}`, value + suffix);
      const val = document.documentElement.style.setProperty('--background-color', value , '');
      //console.log('VAL === ', val);
      console.log('API.JS LALALALAA === ', document.documentElement.style.cssText);
    }
  }*/
  
  //console.log("3333333333333333333333333333getCssRes.data /options-panel-general-settings-stylings === ", response.data);
  //const data = await response.json();
  /*// Fetch CSS variables from Strapi
  const getCssRes = async fetchAPI("/options-panel-general-settings-stylings", {
    populate: "*",
  }); 
  const data = await getCssRes.json();
  console.log("getCssRes.data /options-panel-general-settings-stylings === ", getCssRes.data);*/
  //console.log("getCssRes.data[0].attributes === ", getCssRes.data.attributes);
  //console.log('API.JS setCssVar === loadCssVariables() ===   ', variables);
  //const val = document.documentElement.style.setProperty(`--${variableName}`, value + suffix); //suffix may be px or ''
  //console.log('API.JS document.documentElement.style.cssText === ', document.documentElement.style.cssText);
  return arrdata;
}

/*

export async function getAllItems() {
  const response = await fetch('http://localhost:1337/api/posts');
  const data = await response.json();

  const items = [];

  for (const key in data) {
    items.push({
      id: key,
      ...data[key]
    });
  }

  return items;
}

export async function getFeaturedItems() {
  const allItems = await getAllItems();
  return allItems.filter((item) => item.isFeatured);
}

export async function getItemById(id) {
  const allItems = await getAllItems();
  return allItems.find((item) => item.id === id);
}

export async function getFilteredItems(dateFilter) {
  const { year, month } = dateFilter;

  const allItems = await getAllItem();

  let filteredItems = allItems.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getFullYear() === year && itemDate.getMonth() === month - 1;
  });

  return filteredItems;
}*/
