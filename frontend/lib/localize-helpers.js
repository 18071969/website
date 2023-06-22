import { fetchAPI } from "../lib/api";

export function getSlug (href, locale, defaultLocale) {
    console.log('localize-helpers.js $$$$$$$$$$$$$$$$$$$$ GET-SLUG href BEFORE === ', href);
    let slug = href.split("/").pop(); 
    console.log('localize-helpers.js $$$$$$$$$$$$$$$$$$$$ GET-SLUG slug AFTER === ', slug);
    return slug;
    //if(locale === defaultLocale) {`/${slug}`} else {`/${locale}/${slug}`};
}

export const formatSlug = (slug, locale, defaultLocale) => {
    console.log('localize-helpers.js $$$$$$$$$$$$$$$$$$$$ formatSlug slug === ', slug);
    return locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`; // if locale DOES NOT equal defaultLocale - en - it prepends the locale i.e /es/ or /de/
}

export const getLocalizedPaths = (pageContext) => {

    const { locales, defaultLocale, localizations, slug, locale } = pageContext;
    console.log('localize-helpers.js $$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS pageContext === ', pageContext);


    const paths = locales.map((locale) => {
        // map through all locales enabled in next.config.js ['en', 'es', 'de']
        //console.log('$$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS MAP localizations.length === ', localizations.length);
        //console.log('$$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS MAP localizations === ', localizations);
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
        let locale = localization.attributes.locale;
        console.log('$$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS MAP SLUG === ', slug, 'LOCALE === ', locale);
        localizePath({ ...pageContext, locale, slug });    
        return (
            results.push({
                locale,
                href: localizePath({ ...pageContext, locale, slug/**/ })                
            })
        );
    }); // end map localozation
    
    console.log('$$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS END MAP RESULT === ', results);
    //console.log('$$$$$$$$$$$$$$$$$$$$ GET-LOCALIZED-PATHS paths 1 === ', paths);
    return results;
    //return paths.add(results)
};

export const localizePath = (pageContext) => {
    // This will be called 3 times for 'es', 'en' and 'de'.
    // Let's say for this function call, it is called with pageContext.locale = 'de'
    const { locale, defaultLocale, localizations, slug } = pageContext;
    console.log('\n \n START START START START START START START START START ***localizePath*** ');
    console.log('*** 1. ***localizePath*** pageContext === ', pageContext);
    console.log('*** 2. localizePath*** pageContext.LOCALE === ', locale);
    console.log('*** 2. localizePath*** pageContext.SLUG === ', slug);

    /*const localization = pageContext.localizations.find(
        (localization) => localization.locale === targetLocale
    );*/


    let localeFound = localizations.find((a, i) => {
        //console.log('\n *** ',i,'.1. localizePath*** IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII === ', i);
        //console.log('*** ',i,'.2. localizePath*** a === ', a);
        //console.log('*** ',i,'.3. localizePath*** a.attributes.locale === ', a.attributes.locale, 'locale === ', locale);
        //console.log('*** ',i,'.4. localizePath*** a.id === ', a.id);
        a.attributes.locale === locale;
        //console.log('*** ',i,'.5. localizePath*** (a.attributes.locale === locale) === ', a.attributes.locale === locale);
        // a.attributes.locale.localeCompare(locale) === 0;
        //let flag = a.attributes.locale.localeCompare(locale);
        //console.log('*** ',i,'.6. localizePath*** FLAG === ', flag, 'a.locale === ', a.attributes.locale, 'locale === ', locale);
    }); // it will look in the localizations array of the 'primera-pagina' page
    //console.log('*** 8. localizePath*** pageContext === ', pageContext);
    console.log('*** 9. localizePath*** localeFound === ', localeFound);

    if (localeFound) { 
        console.log('*** 10. localizePath*** CASE 111 === '); 
        console.log('END END END END END END END END END ***localizePath*** \n \n ');
        return formatSlug(localeFound.slug, locale, defaultLocale);}
    // if a 'de' version of the page is found, it will call formatSlug with the 'de' slug which is 'erste-seite'
    else { 
        console.log('*** 10. localizePath*** CASE 222 === '); 
        console.log('END END END END END END END END END ***localizePath*** \n \n ');
        return formatSlug(slug, locale, defaultLocale);
    } // otherwise just return the default 'en' page
    
};

export const getLocalizedPage = async (targetLocale, pageContext) => {

    console.log("GET LOCALIZED PAGE targetLocale === ", targetLocale);
    console.log("GET LOCALIZED PAGE pageContext === ", pageContext);
    const localization = pageContext.localizations.find(
        (localization) => localization.locale === targetLocale
    );
    
    console.log("GET LOCALIZED PAGE localization === ", localization);

    //const articlesRes = await fetchAPI("/services", { fields: ["slug", "locale"], populate: {localizations: "*"} });
    //const services = articlesRes.data;
    if (localization) {const { data } = await fetchAPI("/services?id="+localization.id, {
        filters: {
          slug: params.slug,
          name,
          description,
          locale,
          localizations: 
            id,
            slug,
            locale
        },
        //populate: ["featuredImage", "category", "author.picture"],
        populate: {
            coverImg: { populate: "*" },
            tags: { populate: "*" },
          },
      });
    
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

    return data.page;
} else return;
};