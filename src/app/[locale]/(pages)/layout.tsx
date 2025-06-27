'use client';
// components
import Header from "@/components/Header";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Header/>
            {children}
        </main>
    );
}