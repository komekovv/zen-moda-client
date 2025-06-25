'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {Menu, X, ChevronDown, LogOut, User, ShoppingCart} from 'lucide-react';
import {PhoneIcon} from "@/components/icons/PhoneIcon";
import {SearchIcon} from "@/components/icons/SearchIcon";
import {PersonIcon} from "@/components/icons/PersonIcon";
import {HeartIcon} from "@/components/icons/HeartIcon";
import {BoxIcon} from "@/components/icons/BoxIcon";
import {CartIcon} from "@/components/icons/CartIcon";
import {BagIcon} from "@/components/icons/BagIcon";
import {HouseIcon} from "@/components/icons/HouseIcon";
import {GridIcon} from "@/components/icons/GridIcon";
import {IconWrapper, RoundedIconWrapper} from "@/components/icons/IconWrapper";
import Image, {StaticImageData} from "next/image";
import logo from "@/assets/logo.png"
import {useLogin} from "@/hooks/useLogin";
import {useClientAuth} from "@/contexts/auth-provider";

interface NavigationItem {
    id: string;
    label: string;
    href: string;
    hasDropdown?: boolean;
}

interface HeaderProps {
    phoneNumber?: string;
    logoText?: string;
    logoHref?: string;
    searchPlaceholder?: string;
    cartItemCount?: number;
    wishlistItemCount?: number;
    navigationItems?: NavigationItem[];
    topMenuItems?: Array<{
        label: string;
        href: string;
    }>;
    languageOptions?: Array<{
        code: string;
        label: string;
    }>;
    selectedLanguage?: string;
    onLanguageChange?: (language: string) => void;
    onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
                                           phoneNumber = "+993 65 64 63 32",
                                           logoText = "ZEN MODA",
                                           logoHref = "/",
                                           searchPlaceholder = "Şu yerden gözle",
                                           cartItemCount = 0,
                                           wishlistItemCount = 0,
                                           navigationItems = [
                                               { id: "ayal", label: "Ayal", href: "/ayal" },
                                               { id: "erkek", label: "Erkek", href: "/erkek" },
                                               { id: "caga", label: "Çaga", href: "/caga" },
                                               { id: "yetginjek", label: "Ýetginjek", href: "/yetginjek" },
                                               { id: "ayakgap", label: "Aýakgap", href: "/ayakgap" },
                                               { id: "sumka", label: "Sumka/Aksessuar", href: "/sumka-aksessuar" },
                                               { id: "kitap", label: "Kitap", href: "/kitap" },
                                               { id: "elektronika", label: "Elektronika", href: "/elektronika" },
                                               { id: "arzanladyslar", label: "Arzanladyşlar", href: "/arzanladyslar" }
                                           ],
                                           topMenuItems = [
                                               { label: "Kömek", href: "/help" },
                                               { label: "Magazinler", href: "/stores" },
                                               { label: "Ýazarlaýan magazinlarým", href: "/my-subscriptions" },
                                               { label: "Magazin goşmak", href: "/add-store" }
                                           ],
                                           languageOptions = [
                                               { code: "tk", label: "Türkmen" },
                                               { code: "ru", label: "Русский" }
                                           ],
                                           selectedLanguage = "tk",
                                           onLanguageChange,
                                           onSearch
                                       }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const userDropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    // Get auth state
    const { isAuthenticated, user, logout } = useClientAuth();

    const { openLoginModal } = useLogin({
        onSuccess: (data) => {
            console.log('Login successful:', data);
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    });

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleUserIconClick = () => {
        if (isAuthenticated) {
            setIsUserDropdownOpen(!isUserDropdownOpen);
        } else {
            openLoginModal();
        }
    };

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
    };

    const currentLanguage = languageOptions.find(lang => lang.code === selectedLanguage);

    // Format phone number for display (add +993 prefix if not present)
    const formatPhoneNumber = (phone: string) => {
        if (phone.startsWith('+993')) return phone;
        return `+993 ${phone}`;
    };

    return (
        <header className="bg-white shadow-sm">
            {/* Desktop Header */}
            <div className="hidden md:block">
                {/* Top Bar */}
                <div className="bg-gray-50 border-b border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-10">
                            {/* Phone Number */}
                            <div className="flex items-center space-x-2">
                                <PhoneIcon/>
                                <span className="font-rubik text-small text-black">{phoneNumber}</span>
                            </div>

                            {/* Top Menu */}
                            <div className="flex items-center space-x-6">
                                {topMenuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="font-rubik text-small text-black hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                {/* Language Selector */}
                                <div className="relative" ref={languageDropdownRef}>
                                    <button
                                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                        className="flex items-center space-x-1 font-rubik text-small text-black hover:text-primary transition-colors"
                                    >
                                        <span>{currentLanguage?.label}</span>
                                        <ChevronDown className="h-3 w-3"/>
                                    </button>

                                    {isLanguageDropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-1 w-32 bg-white border border-border rounded-md shadow-lg z-50">
                                            {languageOptions.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        if (onLanguageChange) onLanguageChange(lang.code);
                                                        setIsLanguageDropdownOpen(false);
                                                    }}
                                                    className="block w-full text-left px-3 py-2 font-rubik text-small text-black hover:bg-blue-shade-1 transition-colors"
                                                >
                                                    {lang.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href={logoHref} className="flex-shrink-0">
                            <Image src={logo as StaticImageData} alt={"Zen Moda logo"} width={170}/>
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-lg mx-8">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full pl-4 pr-12 h-10 border border-border rounded-sm font-rubik text-body-description focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-sm hover:bg-blue-600 transition-colors h-full"
                                >
                                    <SearchIcon className="h-full w-6"/>
                                </button>
                            </form>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-4">
                            {/* User Icon with Dropdown */}
                            <div className="relative" ref={userDropdownRef}>
                                <RoundedIconWrapper
                                    borderColor="text-border"
                                    backgroundColor="white"
                                    size={"sm"}
                                    onClick={handleUserIconClick}
                                >
                                    <PersonIcon
                                        width={16}
                                        height={16}
                                        color={"#000000"}
                                        className="hover:text-primary transition-colors"
                                    />
                                </RoundedIconWrapper>

                            {/* User Dropdown */}
                            {isAuthenticated && isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                    <PersonIcon
                                                        width={16}
                                                        height={16}
                                                        color={"#ffffff"}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {user?.fullname || 'Ulanyjy'}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user?.phone_number ? formatPhoneNumber(user.phone_number) : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsUserDropdownOpen(false)}
                                            >
                                                <PersonIcon
                                                    width={16}
                                                    height={16}
                                                    className="mr-3 text-gray-400"
                                                />
                                                Profil
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-100 py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Çykmak
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <RoundedIconWrapper
                                borderColor="text-border"
                                backgroundColor="white"
                                size={"sm"}
                            >
                                <Link href="/orders">
                                    <BoxIcon width={20} height={19.9} color="#000000"
                                             className="hover:text-primary transition-colors"/>
                                </Link>
                            </RoundedIconWrapper>

                            <RoundedIconWrapper
                                borderColor="text-border"
                                backgroundColor="white"
                                size={"sm"}
                            >
                                <Link href="/wishlist">
                                    <HeartIcon
                                        width={20}
                                        height={18.75}
                                        color="#000000"
                                        className="hover:text-primary transition-colors"
                                    />
                                </Link>
                            </RoundedIconWrapper>

                            <RoundedIconWrapper
                                showBadge
                                badgeCount={5}
                                borderColor="text-border"
                                backgroundColor="white"
                                size={"sm"}
                            >
                                <Link href="/cart">
                                    <BagIcon
                                        width={20}
                                        height={20}
                                        color="#000000"
                                        className="hover:text-primary transition-colors"
                                    />
                                </Link>
                            </RoundedIconWrapper>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="border-t border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center justify-between space-x-2 h-14">
                            {navigationItems.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    {index > 0 && (
                                        <div className="h-6 w-px bg-border flex-shrink-0 hidden sm:block"></div>
                                    )}
                                    <Link
                                        href={item.href}
                                        className="font-rubik text-body-description text-black hover:text-primary transition-colors flex items-center space-x-1 whitespace-nowrap flex-shrink-0 text-sm lg:text-base"
                                    >
                                        <span>{item.label}</span>
                                        {item.hasDropdown && <ChevronDown className="h-3 w-3"/>}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden">
                {/* Mobile Search */}
                <div className="p-4">
                    <div>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-4 pr-12 h-10 border border-border rounded-lg font-rubik text-body-description focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md"
                            >
                                <SearchIcon className="h-full w-6"/>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-blue-shade-1 border-t border-border z-40">
                    <div className="flex items-center justify-around h-16">
                        <IconWrapper>
                            <Link href="/" className="flex flex-col items-center space-y-1 p-2">
                                <HouseIcon width={24} height={24} />
                            </Link>
                        </IconWrapper>

                        <IconWrapper>
                            <Link href="/categories" className="flex flex-col items-center space-y-1 p-2">
                                <GridIcon width={21} height={21} />
                            </Link>
                        </IconWrapper>

                        <IconWrapper>
                            <Link href="/cart" className="flex flex-col items-center space-y-1 p-2">
                                <ShoppingCart width={23} height={23} color={"#A0A3BD"}/>
                            </Link>
                        </IconWrapper>

                        <IconWrapper>
                            <Link href="/wishlist" className="flex flex-col items-center space-y-1 p-2">
                                <HeartIcon width={22} height={20} color="#A0A3BD" />
                            </Link>
                        </IconWrapper>

                        <IconWrapper>
                            {isAuthenticated ? (
                                <Link href="/profile" className="flex flex-col items-center space-y-1 p-2">
                                    <PersonIcon width={21} height={21} color="#A0A3BD" />
                                </Link>
                            ) : (
                                <button onClick={openLoginModal} className="flex flex-col items-center space-y-1 p-2">
                                    <PersonIcon width={21} height={21} color="#A0A3BD" />
                                </button>
                            )}
                        </IconWrapper>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
                        <div className="fixed top-0 left-0 bottom-0 w-80 bg-white overflow-y-auto">
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <h2 className="font-rubik text-h3 text-black">Menu</h2>
                                <button onClick={toggleMobileMenu} className="p-2 hover:bg-blue-shade-1 rounded-lg">
                                    <X className="h-6 w-6 text-black" />
                                </button>
                            </div>

                            <nav className="py-4">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={toggleMobileMenu}
                                        className="block px-4 py-3 font-rubik text-body-description text-black hover:bg-blue-shade-1 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="border-t border-border py-4">
                                {topMenuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={toggleMobileMenu}
                                        className="block px-4 py-3 font-rubik text-small text-passive hover:bg-blue-shade-1 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;