import { fetchAPI } from "../lib/api";

export function getSlug (href, locale, defaultLocale) {
    let slug = href.split("/").pop(); 
    return slug;
}

export function getSlashInPath (href) {
   return (href.split("/").length - 1);
}

export const formatSlug = (slug, locale, defaultLocale) => {
    
    let slug_temp = slug ? slug : '/';
    return locale === defaultLocale ? `/${slug_temp}` : `/${locale}/${slug_temp}`; // if locale DOES NOT equal defaultLocale - en - it prepends the locale i.e /es/ or /de/
}

export const getLocalizedPaths = (pageContext) => {

    const { locales, defaultLocale, localizations, slug, locale } = pageContext;
    
    const paths = locales.map((locale) => {
        // map through all locales enabled in next.config.js ['en', 'es', 'de']
        if (localizations.length === 0)
            return {
                // if there is no localizations array provided by Strapi, we just return the defaultLocale page for all locales
                locale,
                href: formatSlug(slug, locale, defaultLocale), // format href so that it does not prepend /es or /de to the page
            };
    }) // end map locales;
    let results = [{
        locale,
        href: localizePath({ ...pageContext, locale, slug })                
    }];

    localizations && localizations.map((localization) => {
        let slug = localization.attributes.slug;
        let locale = (localization.attributes.locale == 'null') ? false : localization.attributes.locale;
        localizePath({ ...pageContext, locale, slug });    
        return (
            results.push({
                locale,
                href: localizePath({ ...pageContext, locale, slug/**/ })                
            })
        );
    }); // end map localozation

    return results;
    //return paths.add(results)
};

export const localizePath = (pageContext) => {
    
    const { locale, defaultLocale, localizations, slug } = pageContext;
    
    let localeFound = localizations.find((a, i) => {
        a.attributes.locale === locale;
    }); 
    
    if (localeFound) { 
        return formatSlug(localeFound.slug, locale, defaultLocale);
    } else { 
        return formatSlug(slug, locale, defaultLocale);
    }
    
};

export const getLocalizedPage = async (targetLocale, pageContext) => {

    const localization = pageContext.localizations.find(
        (localization) => localization.attributes.locale === targetLocale
    );
    const { data } = await fetchAPI("/pages?id="+localization.id+"&filters[slug]="+params.slug+"&populate[0]=featuredImage"+"&populate[1]=SEO"+"&populate[2]=SEO.shareImage"+"&populate[3]=localizations", {
    },
    //(localization) && (

        
        /*const { data } = await fetchAPI("/pages?id="+localization.id, {
            filters: {
            slug: params.slug,
            Title,
            Content,
            locale,
            localizations: 
                id,
                slug,
                locale
            },
            //populate: ["featuredImage", "category", "author.picture"],
            populate: {
                featuredImage: { populate: "*" },
                SEO: { populate: "*" },
            },
        });*/
      //console.log("GET LOCALIZED PAGE data === ", data),
    
    /*const { data } = await client.query({
        query: gql`
            query getPage($id: ID!) {
                page(id: $id) {
                    title
                    body
                    slug
                    locale
                    localizations {
                        id
                        slug
                        locale
                    }
                }
            }
        `,
        variables: {
            id: localization.id,
        },
    });*/

        //return data.page;
    )
};