import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams, RequestConfig } from 'next-intl/server';
import { routing } from './routing';

type SupportedLocales = typeof routing.locales[number];

export default getRequestConfig(
    async ({ locale, requestLocale }: GetRequestConfigParams): Promise<RequestConfig> => {
        let resolvedLocale: SupportedLocales = routing.defaultLocale;
        if (locale && routing.locales.includes(locale as SupportedLocales)) {
            resolvedLocale = locale as SupportedLocales;
        } else if (await requestLocale) {
            const requestLocaleValue = await requestLocale;
            if (routing.locales.includes(requestLocaleValue as SupportedLocales)) {
                resolvedLocale = requestLocaleValue as SupportedLocales;
            }
        }

        try {
            const messages = (await import(`../messages/${resolvedLocale}.json`)).default;
            return { locale: resolvedLocale, messages };
        } catch (error) {
            console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);
            return { locale: resolvedLocale, messages: {} };
        }
    }
);