import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getLocalizedPage, localizePath } from '../lib/localize-helpers';
import { FaGlobe } from 'react-icons/fa';
import styles from './languageSwitcher.module.scss';

export default function LanguageSwitcher({ pageContext }) {
    const isMounted = useRef(false); // We utilise useRef here so that we avoid re-render once it is mounted
    const router = useRouter();
    const [active, toggleActive] = useState(false);
    const [locale, setLocale] = useState();

    console.log('################################ LANGUAGES MENU  pageContextLanguageSwitcher pageContext=== ', pageContext);

    const handleLocaleChange = async (selectedLocale) => {
        Cookies.set('NEXT_LOCALE', selectedLocale); // set the out-of-the-box Next cookie 'NEXT_LOCALE'
        setLocale(selectedLocale);
    };

    const handleLocaleChangeRef = useRef(handleLocaleChange); // use a ref so that it does not re-render unless necessary. Note we are using handleLocaleChange(locale) without the ref in our Link components below

    useEffect(() => {
        const localeCookie = Cookies.get('NEXT_LOCALE');
        console.log('LANGUAGES MENU useEffect localeCookie === ', localeCookie);
        if (!localeCookie) {
            // if there is no NEXT_LOCALE cookie set it to the router.locale
            handleLocaleChangeRef.current(router.locale);
        }

        const checkLocaleMismatch = async () => {
            if (
                // if localeCookie IS SET and does not match pageContextlocale
                !isMounted.current &&
                localeCookie &&
                localeCookie !== pageContext.locale
            ) {
                // For example if localeCookie = 'es' and user lands on /de/erste-seite, it will call getLocalizedPage with 'es' and pageContext
                console.log('111 LANGUAGES MENU checkLocaleMismatch pageContext === ', pageContext);
                console.log('LANGUAGES MENU checkLocaleMismatch IF !isMounted.current === ', !isMounted.current);
                console.log('LANGUAGES MENU checkLocaleMismatch IF isMounted.current === ', isMounted.current);
                console.log('LANGUAGES MENU checkLocaleMismatch IF localeCookie === ', localeCookie);
                console.log('LANGUAGES MENU checkLocaleMismatch IF pageContext.locale === ', pageContext.locale);
                /*const localePage = await getLocalizedPage(
                    localeCookie,
                    pageContext
                ); // we then fetch the correct localized page
                console.log('LANGUAGES MENU checkLocaleMismatch localePage === ', localePage);
                // object assign overrides locale, localizations, slug
                router.push(
                    // router.push the correct page which is /es/primera-pagina
                    `${localizePath({ ...pageContext, ...localePage })}`, //url
                    `${localizePath({ ...pageContext, ...localePage })}`, // as
                    { locale: localePage.locale } // options
                    // we need to include the 'as' href otherwise the router will try to redirect to /es/[[...slug]]]
                );*/
            } else {
                console.log('222 LANGUAGES MENU checkLocaleMismatch ELSE pageContext === ', pageContext);
                console.log('LANGUAGES MENU checkLocaleMismatch ELSE isMounted === ', isMounted);
                console.log('LANGUAGES MENU checkLocaleMismatch ELSE !isMounted.current === ', !isMounted.current);
                console.log('LANGUAGES MENU checkLocaleMismatch ELSE isMounted.current === ', isMounted.current);
                console.log('LANGUAGES MENU checkLocaleMismatch ELSE localeCookie === ', localeCookie);
                console.log('LANGUAGES MENU checkLocaleMismatch ELSE pageContext.locale === ', pageContext.locale);

                /*const localePage = await getLocalizedPage(
                    localeCookie,
                    pageContext
                ); // we then fetch the correct localized page
                console.log('LANGUAGES MENU checkLocaleMismatch localePage === ', localePage);
                // object assign overrides locale, localizations, slug
                router.push(
                    // router.push the correct page which is /es/primera-pagina
                    `${localizePath({ ...pageContext, ...localePage })}`, //url
                    `${localizePath({ ...pageContext, ...localePage })}`, // as
                    { locale: localePage.locale } // options
                    // we need to include the 'as' href otherwise the router will try to redirect to /es/[[...slug]]]
                );*/
            }
        };

        setLocale(localeCookie || router.locale);
        checkLocaleMismatch();

        return () => {
            // sets the ref isMounted to true which will persist state throughout.
            isMounted.current = true;
        };
    }, [locale, router, pageContext]); // called again if locale, router or pageContext change
console.log('LANGUAGES MENU pageContext === ', pageContext);
let i = 0;
    return (
        <div className={styles.navbar_end}>
            <div className={styles.navbar_item}>
                <div className={` ${styles["dropdown"]} ${styles["is_right"]} ${active && styles["is_active"]} `}>
                    {/*<div className={styles.dropdown_trigger}>*/}
                        <button
                            onClick={() => toggleActive(!active)}
                            className={` ${styles["button"]} ${styles["is_small"]} ${styles["is_rounded"]} `}
                            aria-haspopup='true'
                            aria-controls='dropdown_menu3'>
                            <span className={` ${styles["icon"]} ${styles["is_small"]} `}>
                                <FaGlobe />
                            </span>
                        </button>
                    {/*</div>*/}
                    <div className={styles.dropdown_menu} id='dropdown_menu3' role='menu'>
                        <div className={styles.dropdown_content}>
                            {console.log('HREF LANGUAGES SWITCHER pageContext.localizedPaths =================== ', pageContext.localizedPaths)},
                            {console.log('HREF LANGUAGES SWITCHER pageContext.localizedPaths.LENGHT =================== ', pageContext.localizedPaths.length)},
                            {pageContext.localizedPaths &&
                                pageContext.localizedPaths.map(({ href, locale }) => (
                                    i++,
                                    console.log('HREF LANGUAGES SWITCHER =================== III === ', i, ' href === ', href, ' LOCALE === ', locale),
                                    <Link
                                        href={href}
                                        locale={locale}
                                        key={locale}
                                        role={'option'}
                                        passHref
                                    
                                            className={styles.dropdown_item}
                                            style={{ padding: '0.25rem 1rem' }}
                                            onClick={() => handleLocaleChange(locale)}>
                                            {locale}
                                    
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



/*import { useRouter } from 'next/router';
import { useTransition } from 'next-i18next';
import Link from 'next/link';

const LanguageSwitcher  = ( props ) => {

    //const { i18n } = useTranslation();
    //const { language: currentLanguage } = i18n;
    //console.log('LanguageSwitcher - i18n = ', i18n);
    //console.log(' LanguageSwitcher _app.js ctx ----------------------------- ', ctx);
  //console.log(' LanguageSwitcher _app.js appProps ----------------------------- ', appProps);
  const { locale, defaultLocale, asPath } = useRouter();
  console.log(' LanguageSwitcher asPath ----------------------------- ', asPath);
  const r = useRouter();
  console.log(' LanguageSwitcher RRR ==== ----------------------------- ', r);
    const router = useRouter();
    //console.log('LanguageSwitcher - router = ', router);
    const locales = router.locales ?? [currentLanguage];
    //console.log('LanguageSwitcher - locales = ', locales);

    return(
        <ul>
            {locales.map((loc) => {
                const { pathname, query, asPath } = router;
                return (
                  <li key={loc}>
                    <Link
                      href={{ pathname, query }}
                      as={asPath}
                      locale={loc}
                      className={`block px-4 py-1 md:p-2 rounded-lg lg:px-4 ${props === loc ? "bg-black text-white" : ""}`}
                    >
                        {loc}
                    </Link>
                  </li>
                );
              })}
        </ul>
    );
}
export default LanguageSwitcher;
*/