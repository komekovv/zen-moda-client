'use client'
import React, { useState } from 'react';
import {
    User,
    ShoppingBag,
    MapPin,
    Heart,
    Gift,
    HelpCircle,
    ChevronRight,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    Eye,
    Loader2,
    CreditCard
} from 'lucide-react';
import { useClientAuth } from "@/contexts/auth-provider";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMyOrders } from "@/hooks/useOrder";
import { OrderResponse, OrderStatus } from "@/api/queryTypes/Order";

// Timeline Component
interface TimelineStep {
    key: string;
    label: string;
    date?: string;
    isCompleted: boolean;
    isActive?: boolean;
    isCancelled?: boolean;
}

interface HorizontalTimelineProps {
    steps: TimelineStep[];
    className?: string;
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
                                                                   steps,
                                                                   className = ""
                                                               }) => {
    return (
        <div className={`w-full ${className}`}>
            {/* Desktop Layout */}
            <div className="hidden sm:block">
                <div className="flex items-start justify-between relative">
                    {/* Background line */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"
                         style={{ marginLeft: '16px', marginRight: '16px' }} />

                    {/* Progress line */}
                    <div
                        className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 z-10"
                        style={{
                            marginLeft: '16px',
                            width: `calc(${Math.max(0, steps.filter(s => s.isCompleted && !s.isCancelled).length - 1)} * (100% - 32px) / ${Math.max(1, steps.length - 1)})`
                        }}
                    />

                    {steps.map((step, index) => {
                        const isCancelled = step.isCancelled;
                        const isCompleted = step.isCompleted;

                        return (
                            <div key={step.key} className="flex flex-col items-center relative z-20">
                                {/* Status point */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                        isCancelled
                                            ? 'border-sale bg-sale text-white'
                                            : isCompleted
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 bg-white text-gray-400'
                                    }`}
                                >
                                    {isCancelled ? (
                                        <XCircle className="w-4 h-4" />
                                    ) : isCompleted ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                    )}
                                </div>

                                {/* Status label and date */}
                                <div className="mt-2 text-center min-w-0 max-w-[80px] sm:max-w-[120px]">
                                    <p className={`text-xs font-medium leading-tight ${
                                        isCancelled
                                            ? 'text-sale'
                                            : isCompleted
                                                ? 'text-black'
                                                : 'text-passive'
                                    }`}>
                                        {step.label}
                                    </p>
                                    {step.date && (
                                        <p className="text-xs text-passive mt-1 leading-tight">
                                            {step.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile layout - stacked */}
            <div className="sm:hidden space-y-3">
                {steps.map((step, index) => {
                    const isCancelled = step.isCancelled;
                    const isCompleted = step.isCompleted;
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={`mobile-${step.key}`} className="flex items-start space-x-3 relative">
                            {/* Status point */}
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                                    isCancelled
                                        ? 'border-sale bg-sale text-white'
                                        : isCompleted
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-300 bg-white text-gray-400'
                                }`}
                            >
                                {isCancelled ? (
                                    <XCircle className="w-3 h-3" />
                                ) : isCompleted ? (
                                    <CheckCircle className="w-3 h-3" />
                                ) : (
                                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                    isCancelled
                                        ? 'text-sale'
                                        : isCompleted
                                            ? 'text-black'
                                            : 'text-passive'
                                }`}>
                                    {step.label}
                                </p>
                                {step.date && (
                                    <p className="text-xs text-passive mt-1">
                                        {step.date}
                                    </p>
                                )}
                            </div>

                            {/* Connecting line */}
                            {!isLast && (
                                <div className={`absolute top-6 w-px h-6 ${
                                    isCompleted && !isCancelled ? 'bg-primary' :
                                        isCancelled ? 'bg-sale' : 'bg-gray-200'
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main Component
interface ProfileMenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

export default function OrdersPage() {
    const t = useTranslations('profile');
    const orderT = useTranslations('orders');
    const addressT = useTranslations('address');
    const { user } = useClientAuth();
    const [activeTab, setActiveTab] = useState<'orders' | 'returns'>('orders');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);

    // Use the order API hook
    const { data: ordersResponse, isLoading, isError, refetch } = useMyOrders(
        { page: currentPage, limit: pageSize },
        {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );

    const orders: OrderResponse[] = ordersResponse?.data || [];
    const totalCount = ordersResponse?.totalCount || 0;

    const profileMenuItems: ProfileMenuItem[] = [
        { id: 'profile', title: t('menu.profile'), icon: User, href: '/profile' },
        { id: 'orders', title: t('menu.orders'), icon: ShoppingBag, href: '/profile/orders' },
        { id: 'addresses', title: t('menu.addresses'), icon: MapPin, href: '/profile/addresses' },
        { id: 'favorites', title: t('menu.favorites'), icon: Heart, href: '/profile/favorites'},
        { id: 'bonuses', title: t('menu.bonuses'), icon: Gift, href: '/profile/bonuses' },
        { id: 'help', title: t('menu.help'), icon: HelpCircle, href: '/help' }
    ];

    const getStatusConfig = (status: OrderStatus) => {
        const configs = {
            waiting: {
                label: 'Garaşylýar',
                color: 'text-orange-600 bg-orange-50 border-orange-200',
                icon: Clock
            },
            accepted: {
                label: 'Kabul edildi',
                color: 'text-green-600 bg-green-50 border-green-200',
                icon: CheckCircle
            },
            preparing: {
                label: 'Taýýarlanýar',
                color: 'text-orange-600 bg-orange-50 border-orange-200',
                icon: Package
            },
            on_way: {
                label: 'Ýola çykdy',
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                icon: Truck
            },
            delivered: {
                label: 'Eltip berildi',
                color: 'text-green-600 bg-green-50 border-green-200',
                icon: CheckCircle
            },
            returned: {
                label: 'Yzyna gaýtaryldy',
                color: 'text-gray-600 bg-gray-50 border-gray-200',
                icon: Package
            },
            cancelled: {
                label: 'Ýatyryldy',
                color: 'text-red-600 bg-red-50 border-red-200',
                icon: XCircle
            }
        };
        return configs[status];
    };

    const getOrderProgress = (status: OrderStatus, orderDate: string, statusHistory?: any[]): TimelineStep[] => {
        const steps = [
            { key: 'waiting', label: 'Garaşylýar' },
            { key: 'accepted', label: 'Kabul edildi' },
            { key: 'preparing', label: 'Taýýarlanýar' },
            { key: 'on_way', label: 'Ýola çykdy' },
            { key: 'delivered', label: 'Eltip berildi' }
        ];

        const statusOrder: OrderStatus[] = ['waiting', 'accepted', 'preparing', 'on_way', 'delivered'];
        const currentIndex = statusOrder.indexOf(status);
        const isCancelled = status === 'cancelled';

        return steps.map((step, index) => {
            const isCompleted = index <= currentIndex && !isCancelled;
            const stepIsCancelled = isCancelled && index > 0;

            // Try to get date from statusHistory if available, otherwise use orderDate for completed steps
            let stepDate = '';
            if (isCompleted && !stepIsCancelled) {
                stepDate = formatDate(orderDate);
            }

            return {
                key: step.key,
                label: step.label,
                date: stepDate,
                isCompleted,
                isActive: index === currentIndex && !isCancelled,
                isCancelled: stepIsCancelled
            };
        });
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('tk-TM', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const calculateOrderSubtotal = (order: OrderResponse) => {
        return order.products.reduce((total, product) => {
            const price = parseFloat(product.price) || 0;
            return total + (price * product.quantity);
        }, 0);
    };

    const Breadcrumb: React.FC = () => (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-blue-600 transition-colors">{t('breadcrumb.home')}</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{t('breadcrumb.personal_cabinet')}</span>
        </nav>
    );

    const UserHeader: React.FC = () => (
        <div className="bg-primary text-white p-6 mb-8">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user?.fullname || 'Aman Amanow'}</h1>
                    <p className="text-blue-100">{user?.phone_number || '+993 65 646362'}</p>
                </div>
            </div>
        </div>
    );

    const SidebarMenu: React.FC = () => {
        const currentPath = '/profile/orders';

        return (
            <div className="bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('sidebar.title')}</h2>
                <nav className="space-y-2">
                    {profileMenuItems.map((item) => {
                        const isActive = item.href === currentPath;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                                    isActive
                                        ? 'bg-blue-50'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className={`w-5 h-5 ${
                                        isActive
                                            ? 'text-blue-600'
                                            : 'text-gray-500 group-hover:text-blue-600'
                                    }`} />
                                    <span className={`${
                                        isActive
                                            ? 'text-blue-600 font-medium'
                                            : 'text-gray-700 group-hover:text-gray-900'
                                    }`}>{item.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronRight className={`w-4 h-4 ${
                                        isActive ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                </div>
                            </a>
                        );
                    })}
                </nav>
            </div>
        );
    };

    const OrderTabs: React.FC = () => (
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'orders'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Zakaz taryhy
                </button>
                <button
                    onClick={() => setActiveTab('returns')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'returns'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Yzyna gaýtarylmalar
                </button>
            </nav>
        </div>
    );

    const OrderCard: React.FC<{ order: OrderResponse }> = ({ order }) => {
        const statusConfig = getStatusConfig(order.status as OrderStatus);
        const StatusIcon = statusConfig.icon;
        const isExpanded = selectedOrderId === order.id;

        // Format date and time separately
        const orderDate = new Date(order.orderDate);
        const timeString = orderDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const dateString = orderDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        return (
            <div className="bg-white border border-border rounded-lg overflow-hidden">
                {/* Order Header */}
                <div
                    className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedOrderId(isExpanded ? null : order.id)}
                >
                    {/* Mobile Layout */}
                    <div className="flex sm:hidden items-start space-x-3">
                        {/* Left: Image with count */}
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                {order.products.length > 0 && order.products[0].photo ? (
                                    <Image
                                        src={order.products[0].photo}
                                        alt={order.products[0].name.tk || order.products[0].name.ru}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            {/* Product count badge */}
                            <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                +{order.products.length}
                            </div>
                        </div>

                        {/* Middle: Date, Status, Price */}
                        <div className="flex-1 min-w-0">
                            {/* Date and Time */}
                            <div className="flex items-center space-x-2 mb-2">
                                <p className="text-black font-medium text-sm">{timeString}</p>
                                <p className="text-passive text-xs">{dateString}</p>
                            </div>

                            {/* Status */}
                            <div className="flex items-center space-x-1 mb-2">
                                <StatusIcon className={`w-3 h-3 ${
                                    order.status === 'waiting' ? 'text-warning' :
                                        order.status === 'accepted' ? 'text-success' :
                                            order.status === 'preparing' ? 'text-warning' :
                                                order.status === 'on_way' ? 'text-primary' :
                                                    order.status === 'delivered' ? 'text-success' :
                                                        order.status === 'returned' ? 'text-passive' :
                                                            order.status === 'cancelled' ? 'text-sale' : 'text-passive'
                                }`} />
                                <span className={`font-medium text-xs ${
                                    order.status === 'waiting' ? 'text-warning' :
                                        order.status === 'accepted' ? 'text-success' :
                                            order.status === 'preparing' ? 'text-warning' :
                                                order.status === 'on_way' ? 'text-primary' :
                                                    order.status === 'delivered' ? 'text-success' :
                                                        order.status === 'returned' ? 'text-passive' :
                                                            order.status === 'cancelled' ? 'text-sale' : 'text-passive'
                                }`}>
                                    {statusConfig.label}
                                </span>
                            </div>

                            {/* Price */}
                            <p className="text-black font-bold text-base">{order.total} {order.currency}</p>
                        </div>

                        {/* Right: Chevron */}
                        <div className="flex items-center pt-1">
                            <ChevronRight
                                className={`w-4 h-4 text-gray-400 transition-transform ${
                                    isExpanded ? 'rotate-90' : ''
                                }`}
                            />
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center">
                        {/* Left: Rounded image with product count */}
                        <div className="relative mr-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                {order.products.length > 0 && order.products[0].photo ? (
                                    <Image
                                        src={order.products[0].photo}
                                        alt={order.products[0].name.tk || order.products[0].name.ru}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            {/* Product count badge */}
                            <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                +{order.products.length}
                            </div>
                        </div>

                        {/* Date and time */}
                        <div className="mr-4">
                            <p className="text-black font-medium text-sm">{timeString}</p>
                            <p className="text-passive text-sm">{dateString}</p>
                        </div>

                        {/* Status - middle */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center space-x-2">
                                <StatusIcon className={`w-4 h-4 ${
                                    order.status === 'waiting' ? 'text-warning' :
                                        order.status === 'accepted' ? 'text-success' :
                                            order.status === 'preparing' ? 'text-warning' :
                                                order.status === 'on_way' ? 'text-primary' :
                                                    order.status === 'delivered' ? 'text-success' :
                                                        order.status === 'returned' ? 'text-passive' :
                                                            order.status === 'cancelled' ? 'text-sale' : 'text-passive'
                                }`} />
                                <span className={`font-medium text-sm ${
                                    order.status === 'waiting' ? 'text-warning' :
                                        order.status === 'accepted' ? 'text-success' :
                                            order.status === 'preparing' ? 'text-warning' :
                                                order.status === 'on_way' ? 'text-primary' :
                                                    order.status === 'delivered' ? 'text-success' :
                                                        order.status === 'returned' ? 'text-passive' :
                                                            order.status === 'cancelled' ? 'text-sale' : 'text-passive'
                                }`}>
                                    {statusConfig.label}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mr-4">
                            <p className="text-black font-bold text-lg">{order.total} {order.currency}</p>
                        </div>

                        {/* Chevron */}
                        <div className="flex items-center">
                            <ChevronRight
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                    isExpanded ? 'rotate-90' : ''
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                    <div className="p-4 sm:p-6 space-y-6 border-t border-border">
                        {/* 1. Order Information Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-black mb-4">Maglumatlar</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-4 h-4 text-passive" />
                                    </div>
                                    <div>
                                        <p className="text-passive text-sm">Zakaz kody:</p>
                                        <p className="text-black font-semibold text-sm">{order.orderNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-passive" />
                                    </div>
                                    <div>
                                        <p className="text-passive text-sm">Zakaz ýň berlen wagty:</p>
                                        <p className="text-black font-semibold text-sm">{formatDate(order.orderDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-passive" />
                                    </div>
                                    <div>
                                        <p className="text-passive text-sm">Eltip berlen wagty:</p>
                                        <p className="text-black font-semibold text-sm">
                                            {order.deliveryDate ? formatDate(order.deliveryDate) : formatDate(order.orderDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <ShoppingBag className="w-4 h-4 text-passive" />
                                    </div>
                                    <div>
                                        <p className="text-passive text-sm">Haryt sany:</p>
                                        <p className="text-black font-semibold text-sm">{order.products.length} sany</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. General Status History Timeline */}
                        <div>
                            <h3 className="text-lg font-semibold text-black mb-4">Umumy Statusy</h3>
                            <HorizontalTimeline
                                steps={getOrderProgress(order.status as OrderStatus, order.orderDate, order.statusHistory)}
                                className="mb-4"
                            />
                        </div>

                        {/* 3. Products Information */}
                        <div className="space-y-4">
                            {order.products.map((product, index) => (
                                <div key={product.id} className="border border-border rounded-lg overflow-hidden">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left Side - Product Info */}
                                        <div className="flex-1 p-4">
                                            <div className="flex items-start space-x-3 mb-4">
                                                <p className="text-black text-sm">
                                                    Satyý: <span className="text-primary font-medium">{order.store.name}</span>
                                                </p>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                {/* Product Image */}
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={product.photo}
                                                        alt={product.name.tk || product.name.ru}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-black text-sm mb-1">
                                                        {product.name.tk || product.name.ru}
                                                    </h4>
                                                    <p className="text-passive text-sm mb-1">
                                                        Razmer: <span className="text-black">{product.size}</span>
                                                        {product.color && (
                                                            <span className="ml-4 text-primary">
                                                                Sonky {product.quantity} haryt
                                                            </span>
                                                        )}
                                                    </p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-passive text-sm line-through">
                                                            {product.originalPrice} TMT
                                                        </span>
                                                        <span className="text-sale font-semibold">
                                                            {product.price} TMT
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            {order.status === 'delivered' && (
                                                <div className="flex space-x-3 mt-4">
                                                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-primary rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                                        <Package className="w-4 h-4" />
                                                        <span>Yzyna tabsyrmak</span>
                                                    </button>
                                                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                        <span>Bahalandyrmak</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Vertical Divider */}
                                        <div className="hidden lg:block w-px bg-border"></div>

                                        {/* Right Side - Order Status Timeline */}
                                        <div className="lg:w-80 p-4 border-t lg:border-t-0 border-border">
                                            <h4 className="font-medium text-black mb-4">Kargo Hereketí</h4>
                                            <div className="space-y-4">
                                                {getOrderProgress(order.status as OrderStatus, order.orderDate, order.statusHistory).map((step, stepIndex, stepArray) => (
                                                    <div key={step.key} className="flex items-start space-x-3">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                            step.isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                                                        }`}>
                                                            {step.isCompleted ? (
                                                                <CheckCircle className="w-4 h-4" />
                                                            ) : (
                                                                <div className="w-2 h-2 bg-current rounded-full" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-medium ${
                                                                step.isCompleted ? 'text-black' : 'text-passive'
                                                            }`}>
                                                                {step.label}
                                                            </p>
                                                            {step.date && (
                                                                <p className="text-xs text-passive">
                                                                    {step.date}
                                                                </p>
                                                            )}
                                                            {stepIndex < stepArray.length - 1 && (
                                                                <div className={`w-px h-4 ml-3 mt-1 ${
                                                                    step.isCompleted ? 'bg-primary' : 'bg-gray-200'
                                                                }`} />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4. Address and Payment Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Address */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <MapPin className="w-5 h-5 text-black" />
                                    <h4 className="font-semibold text-black">Adres</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-black font-medium text-sm">{order.location.label} {order.location.phone}</p>
                                    <p className="text-passive text-sm mt-1">{order.location.fullAddress}</p>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div>
                                <div className="flex items-center space-x-2 mb-3">
                                    <CreditCard className="w-5 h-5 text-black" />
                                    <h4 className="font-semibold text-black">Töleg</h4>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-black">Harytlaryň jemi bahasy:</span>
                                        <span className="text-black font-medium">{calculateOrderSubtotal(order).toFixed(2)} TMT</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-black">Eltip bermek hyzmaty:</span>
                                        <span className="text-black font-medium">{order.deliveryFee} TMT</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-black">Arzanladys:</span>
                                        <span className="text-black font-medium">-{order.discount} TMT</span>
                                    </div>
                                    <hr className="border-border" />
                                    <div className="flex justify-between">
                                        <span className="text-black font-semibold">Jemi baha:</span>
                                        <span className="text-black font-bold text-lg">{order.total} TMT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const OrdersList: React.FC = () => {
        const filteredOrders = activeTab === 'orders'
            ? orders
            : orders.filter(order => order.status === 'returned');

        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Ýüklenýär...</span>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">Ýalňyşlyk ýüze çykdy</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Täzeden synanyşmak
                    </button>
                </div>
            );
        }

        if (filteredOrders.length === 0) {
            return (
                <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                        {activeTab === 'orders' ? 'Zakaz ýok' : 'Yzyna gaýtarylan zakaz ýok'}
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}

                {/* Pagination */}
                {totalCount > pageSize && (
                    <div className="flex items-center justify-between pt-6">
                        <p className="text-sm text-gray-600">
                            Görkezilýär {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalCount)} / {totalCount}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                disabled={currentPage === 0}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Öňki
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={(currentPage + 1) * pageSize >= totalCount}
                                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Indiki
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb />
                <UserHeader />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <SidebarMenu />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    Zakaz taryhy
                                </h3>
                                <OrderTabs />
                                <OrdersList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};