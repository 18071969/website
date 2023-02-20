import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
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

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);

  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
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
