
import {RoutingConfig} from "next-intl/routing";

export const routing: RoutingConfig<readonly ["tk", "ru"], "always", never, never> = {
    locales: ['tk', 'ru'],
    defaultLocale: 'tk',
    localePrefix: { mode: 'always' }
};