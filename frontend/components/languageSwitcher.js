/**/import { useRouter } from 'next/router';
import { useTransition } from 'next-i18next';
import Link from 'next/link';

const LanguageSwitcher  = ( props ) => {

    //const { i18n } = useTranslation();
    //const { language: currentLanguage } = i18n;
    //console.log('LanguageSwitcher - i18n = ', i18n);

    const router = useRouter();
    console.log('LanguageSwitcher - router = ', router);
    const locales = router.locales ?? [currentLanguage];
    console.log('LanguageSwitcher - locales = ', locales);

    return(
        /*<ul>
            {router.locales.map(locale =>
                <li key={locale}>
                    <Link href={router.asPath} locale={locale}>
                        {locale}
                    </Link>
                </li>)}
        </ul>*/
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
