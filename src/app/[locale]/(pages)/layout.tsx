'use client';
// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {SupportedLocales} from "@/types/types";
import {startTransition} from "react";
// hooks
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const handleLanguageChange = (locale: SupportedLocales) => {
        if (locale === currentLocale) return;

        startTransition(() => {
            router.replace(pathname, { locale });
        });
    };
    return (
        <main>
            <Header
                onLanguageChange={handleLanguageChange}
            />
            {children}
            <Footer/>
        </main>
    );
}