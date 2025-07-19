import React, { useState, useRef, useEffect } from 'react';
import {Menu, X, ChevronDown, LogOut, User, ShoppingCart, LayoutGridIcon, Heart} from 'lucide-react';
import {PhoneIcon} from "@/components/icons/PhoneIcon";
import {SearchIcon} from "@/components/icons/SearchIcon";
import {PersonIcon} from "@/components/icons/PersonIcon";
import {HeartIcon} from "@/components/icons/HeartIcon";
import {BoxIcon} from "@/components/icons/BoxIcon";
import {BagIcon} from "@/components/icons/BagIcon";
import {HouseIcon} from "@/components/icons/HouseIcon";
import {IconWrapper, RoundedIconWrapper} from "@/components/icons/IconWrapper";
import Image, {StaticImageData} from "next/image";
import logo from "@/assets/logo.png"
import {useLogin} from "@/hooks/useLogin";
import {useClientAuth} from "@/contexts/auth-provider";
import {Link, usePathname} from "@/i18n/navigation";
import {useCatalogs} from "@/hooks/useCatalogs";
import {transformCatalogsToNavigation} from "@/lib/utils/catalogUtils";
import {useTranslations, useLocale} from "next-intl";
import {SupportedLocales} from "@/types/types";

// Types
interface HeaderProps {
    phoneNumber?: string;
    logoText?: string;
    logoHref?: string;
    searchPlaceholder?: string;
    cartItemCount?: number;
    wishlistItemCount?: number;
    topMenuItems?: Array<{
        label: string;
        href: string;
    }>;
    languageOptions?: Array<{
        code: string;
        label: string;
    }>;
    selectedLanguage?: string;
    onLanguageChange?: (language: SupportedLocales) => void;
    onSearch?: (query: string) => void;
    onSubCategoryClick?: (category: string, subcategory: string, item: string) => void;
}

const Header: React.FC<HeaderProps> = ({
                                           phoneNumber = "+993 65 64 63 32",
                                           logoText = "ZEN MODA",
                                           logoHref = "/",
                                           searchPlaceholder,
                                           cartItemCount = 0,
                                           wishlistItemCount = 0,
                                           topMenuItems = [
                                               { label: "help", href: "/help" },
                                               { label: "stores", href: "/stores" },
                                               { label: "my_subscriptions", href: "/my-subscriptions" },
                                               { label: "add_store", href: "/add-store" }
                                           ],
                                           languageOptions = [
                                               { code: "tk", label: "Türkmen" },
                                               { code: "ru", label: "Русский" }
                                           ],
                                           selectedLanguage = "tk",
                                           onLanguageChange,
                                           onSearch,
                                           onSubCategoryClick
                                       }) => {
    const t = useTranslations('header');
    const locale = useLocale();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const userDropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const megaDropdownRef = useRef<HTMLDivElement>(null);

    // Get auth state
    const { isAuthenticated, user, logout } = useClientAuth();

    // Fetch catalogs from API
    const { data: catalogsData, isLoading: catalogsLoading, isError: catalogsError } = useCatalogs();

    // Transform API data to navigation items
    const navigationItems = catalogsData?.data
        ? transformCatalogsToNavigation(catalogsData.data, locale)
        : [];

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
            if (megaDropdownRef.current && !megaDropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
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

    const handleNavItemEnter = (itemId: string) => {
        const item = navigationItems.find(nav => nav.id === itemId);
        if (item?.hasDropdown && item?.subcategories) {
            setActiveDropdown(itemId);
        }
    };

    const handleMegaDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const getCurrentCategory = (itemId: string) => {
        const item = navigationItems.find(nav => nav.id === itemId);
        if (!item?.subcategories) return null;

        return {
            name: item.label,
            subcategories: item.subcategories
        };
    };

    const currentLanguage = languageOptions.find(lang => lang.code === locale);

    // Format phone number for display
    const formatPhoneNumber = (phone: string) => {
        if (phone.startsWith('+993')) return phone;
        return `+993 ${phone}`;
    };

    // Default search placeholder based on locale
    const defaultSearchPlaceholder = searchPlaceholder || t('search_placeholder');

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
                                        {t(item.label)}
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
                                        <div className="absolute right-0 mt-1 w-32 bg-white border border-border rounded-md shadow-lg z-50">
                                            {languageOptions.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        if (onLanguageChange) onLanguageChange(lang.code as SupportedLocales);
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
                                    placeholder={defaultSearchPlaceholder}
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
                                                        {user?.fullname || t('user_label')}
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
                                                {t('profile')}
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-100 py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                {t('logout')}
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
                                <Link href="/profile/orders">
                                    <BoxIcon width={20} height={19.9} color="#000000"
                                             className="hover:text-primary transition-colors"/>
                                </Link>
                            </RoundedIconWrapper>

                            <RoundedIconWrapper
                                borderColor="text-border"
                                backgroundColor="white"
                                size={"sm"}
                            >
                                <Link href="/profile/favorite">
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
                                badgeCount={cartItemCount || 5}
                                borderColor="text-border"
                                backgroundColor="white"
                                size={"sm"}
                            >
                                <Link href="/profile/cart">
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
                <div
                    className="border-t border-border relative"
                    ref={megaDropdownRef}
                    onMouseLeave={handleMegaDropdownLeave}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center justify-between h-14 relative">
                            {catalogsLoading ? (
                                // Loading skeleton for navigation
                                <div className="flex items-center justify-between space-x-8 w-full">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    ))}
                                </div>
                            ) : catalogsError ? (
                                // Error state
                                <div className="text-red-500 text-sm">{t('navigation_error')}</div>
                            ) : (
                                navigationItems.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        {index > 0 && (
                                            <div className="h-6 w-px bg-border flex-shrink-0 hidden sm:block"></div>
                                        )}
                                        <div
                                            onMouseEnter={() => handleNavItemEnter(item.id)}
                                            className="flex-1 relative group flex items-center justify-center"
                                        >
                                            <Link
                                                href={item.href}
                                                className={`font-rubik text-body-description transition-all duration-200 flex items-center space-x-1 whitespace-nowrap text-sm lg:text-base px-2 py-2 ${
                                                    activeDropdown === item.id
                                                        ? 'text-blue-600'
                                                        : 'text-black hover:text-blue-600'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                            </Link>

                                            {/* Blue underline */}
                                            <div className={`absolute -bottom-[9px] left-0 right-0 h-0.5 transition-all duration-200 ${
                                                activeDropdown === item.id
                                                    ? 'bg-blue-600 scale-x-100'
                                                    : 'bg-blue-600 scale-x-0 group-hover:scale-x-100'
                                            }`}></div>
                                        </div>
                                    </React.Fragment>
                                ))
                            )}
                        </nav>
                    </div>

                    {/* Mega Dropdown */}
                    {activeDropdown && getCurrentCategory(activeDropdown) && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-7xl bg-white shadow-2xl border-t border-gray-200 z-50 rounded-b-lg">
                            <div className="flex">
                                {/* Categories Section */}
                                <div className="flex-1 px-8 py-6">
                                    <div className={`grid gap-16 ${(() => {
                                        const subCatCount = getCurrentCategory(activeDropdown)?.subcategories.length || 0;
                                        if (subCatCount <= 2) return 'grid-cols-2';
                                        if (subCatCount === 3) return 'grid-cols-3';
                                        return 'grid-cols-4';
                                    })()}`}>
                                        {getCurrentCategory(activeDropdown)?.subcategories.map((subcat) => (
                                            <div key={subcat.name} className="min-w-0">
                                                <h3 className="font-semibold mb-4 text-base text-black">
                                                    {subcat.name}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {subcat.items.slice(0, 12).map((item) => (
                                                        <li key={item}>
                                                            <button
                                                                onClick={() => {
                                                                    if (onSubCategoryClick) {
                                                                        onSubCategoryClick(getCurrentCategory(activeDropdown)!.name, subcat.name, item);
                                                                    }
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm text-left w-full truncate block py-1"
                                                            >
                                                                {item}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Images Section */}
                                <div className="w-[500px] p-6 bg-white">
                                    <div className="grid grid-cols-2 grid-rows-3 gap-3 h-full">
                                        {/* Large product images with realistic placeholders */}
                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-orange-400 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">🛍️</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-red-400 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">👕</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">👗</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">👟</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-black to-gray-600 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">👔</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-purple-300 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">💻</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                placeholder={defaultSearchPlaceholder}
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
                                <HouseIcon
                                    width={24}
                                    height={24}
                                    color={pathname == '/' ? "#0762C8" : "#A0A3BD"}
                                />
                            </Link>
                        </IconWrapper>

                        <Link href="/category" className="flex flex-col items-center space-y-1 p-2">
                            <LayoutGridIcon
                                width={24}
                                height={24}
                                color={pathname == '/category' ? "#0762C8" : "#A0A3BD"}
                            />
                        </Link>

                        <Link href="/profile/cart" className="flex flex-col items-center space-y-1 p-2">
                            <ShoppingCart
                                width={24}
                                height={24}
                                color={pathname == '/cart' ? "#0762C8" : "#A0A3BD"}
                            />
                        </Link>

                        <Link href="/profile/favorite" className="flex flex-col items-center space-y-1 p-2">
                            <Heart
                                width={24}
                                height={24}
                                color={pathname == '/favorite' ? "#0762C8" : "#A0A3BD"}
                            />
                        </Link>

                        <IconWrapper>
                            {isAuthenticated ? (
                                <Link href="/profile" className="flex flex-col items-center space-y-1 p-2">
                                    <PersonIcon
                                        width={21}
                                        height={21}
                                        color={pathname == '/profile' ? "#0762C8" : "#A0A3BD"}
                                    />
                                </Link>
                            ) : (
                                <button onClick={openLoginModal} className="flex flex-col items-center space-y-1 p-2">
                                    <PersonIcon width={21} height={21} color="#A0A3BD" />
                                </button>
                            )}
                        </IconWrapper>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;