import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

// Footer component
const Footer: React.FC = () => {
    const locale = useLocale();
    const t = useTranslations('footer');

    return (
        <footer className="bg-blue-shade-1 pt-8 md:pt-12 mb-[65px] md:mb-0 font-rubik">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Logo and App Downloads */}
                    <div className="space-y-6">
                        <div className="text-4xl font-bold text-blue-600">
                            zen
                            <div className="text-xs text-gray-500 font-normal">Moda</div>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="#"
                                className="block w-[160px]"
                                aria-label="Download on Google Play"
                            >
                                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                                    <div className="text-white">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs">GET IT ON</div>
                                        <div className="text-sm font-semibold">Google Play</div>
                                    </div>
                                </div>
                            </a>

                            <a
                                href="#"
                                className="block w-[160px]"
                                aria-label="Download on App Store"
                            >
                                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                                    <div className="text-white">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-sm font-semibold">App Store</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            {t('help.title')}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('help.frequentQuestions')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('help.howToOrder')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('help.trackOrder')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('help.deliveryService')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('help.sellAtZen')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Information Section */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            {t('information.title')}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('information.aboutUs')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('information.privacyPolicy')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('information.forZenFashion')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('information.forCommunication')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    {t('information.aboutUs2')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            {t('contact.title')}
                        </h3>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <div className="font-medium text-gray-900">
                                    {t('contact.phone')}
                                </div>
                                <a href="tel:+993656463662" className="hover:text-gray-900 transition-colors">
                                    +993 65 64 63 62
                                </a>
                            </div>

                            <div>
                                <div className="font-medium text-gray-900">
                                    {t('contact.email')}
                                </div>
                                <a href="mailto:info@ZenModa.biz" className="hover:text-gray-900 transition-colors">
                                    info@ZenModa
                                </a>
                            </div>

                            <div>
                                <div className="font-medium text-gray-900">Instagram:</div>
                                <a href="https://instagram.com/ZenModa.biz"
                                   className="hover:text-gray-900 transition-colors">
                                    @ZenModa
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 lg:mt-8">
                        <div className="">
                            <div className="font-medium text-gray-900">
                                {t('contact.deliveryTime')}
                            </div>
                            <div>9:00-21:00</div>
                        </div>

                        <div className=" mt-2">
                            <div className="font-medium text-gray-900">
                                {t('contact.workTime')}
                            </div>
                            <div>09:00-21:00</div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Footer Bottom */}
            <div className="border-t bg-blue-shade-2 border-gray-200 mt-8 py-3">
                <div
                    className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-gray-500 text-sm text-center md:text-left">
                        {t('copyright')}
                    </div>
                    <div className="text-gray-500 text-sm">
                        {t('location')}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;