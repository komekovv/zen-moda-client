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
    Eye
} from 'lucide-react';
import { useClientAuth } from "@/contexts/auth-provider";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Types
interface OrderItem {
    id: string;
    name: string;
    image: string;
    size: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'waiting' | 'accepted' | 'preparing' | 'on_way' | 'delivered' | 'returned' | 'cancelled';
    items: OrderItem[];
    total: number;
    deliveryAddress: string;
    deliveryFee: number;
    discount: number;
    seller: string;
}

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

    // Sample orders data - replace with actual API data
    const sampleOrders: Order[] = [
        {
            id: '1',
            orderNumber: '#RTQY-42125',
            date: '13:38 23.12.2020',
            status: 'delivered',
            items: [
                {
                    id: '1',
                    name: 'XIAOMI Mijia Bluetooth of the Ther...',
                    image: '/xiaomi-bluetooth.jpg',
                    size: 'XS',
                    price: 2455,
                    quantity: 1
                }
            ],
            total: 3253,
            deliveryAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            deliveryFee: 20,
            discount: 120,
            seller: 'Apple'
        },
        {
            id: '2',
            orderNumber: '#RTQY-42126',
            date: '13:38 23.12.2020',
            status: 'accepted',
            items: [
                {
                    id: '2',
                    name: 'XIAOMI Mijia Bluetooth of the Ther...',
                    image: '/xiaomi-bluetooth.jpg',
                    size: 'XS',
                    price: 2455,
                    quantity: 1
                }
            ],
            total: 3253,
            deliveryAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            deliveryFee: 20,
            discount: 120,
            seller: 'Apple'
        },
        {
            id: '3',
            orderNumber: '#RTQY-42127',
            date: '13:38 23.12.2020',
            status: 'on_way',
            items: [
                {
                    id: '3',
                    name: 'XIAOMI Mijia Bluetooth of the Ther...',
                    image: '/xiaomi-bluetooth.jpg',
                    size: 'XS',
                    price: 2455,
                    quantity: 1
                }
            ],
            total: 3253,
            deliveryAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            deliveryFee: 20,
            discount: 120,
            seller: 'Apple'
        },
        {
            id: '4',
            orderNumber: '#RTQY-42128',
            date: '13:38 23.12.2020',
            status: 'preparing',
            items: [
                {
                    id: '4',
                    name: 'XIAOMI Mijia Bluetooth of the Ther...',
                    image: '/xiaomi-bluetooth.jpg',
                    size: 'XS',
                    price: 2455,
                    quantity: 1
                }
            ],
            total: 3253,
            deliveryAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            deliveryFee: 20,
            discount: 120,
            seller: 'Apple'
        },
        {
            id: '5',
            orderNumber: '#RTQY-42129',
            date: '13:38 23.12.2020',
            status: 'cancelled',
            items: [
                {
                    id: '5',
                    name: 'XIAOMI Mijia Bluetooth of the Ther...',
                    image: '/xiaomi-bluetooth.jpg',
                    size: 'XS',
                    price: 2455,
                    quantity: 1
                }
            ],
            total: 3253,
            deliveryAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            deliveryFee: 20,
            discount: 120,
            seller: 'Apple'
        }
    ];

    const profileMenuItems: ProfileMenuItem[] = [
        { id: 'profile', title: t('menu.profile'), icon: User, href: '/profile' },
        { id: 'orders', title: t('menu.orders'), icon: ShoppingBag, href: '/profile/orders' },
        { id: 'addresses', title: t('menu.addresses'), icon: MapPin, href: '/profile/addresses' },
        { id: 'favorites', title: t('menu.favorites'), icon: Heart, href: '/profile/favorites'},
        { id: 'bonuses', title: t('menu.bonuses'), icon: Gift, href: '/profile/bonuses' },
        { id: 'help', title: t('menu.help'), icon: HelpCircle, href: '/help' }
    ];

    const getStatusConfig = (status: Order['status']) => {
        const configs = {
            waiting: { 
                label: orderT('status.waiting'), 
                color: 'text-orange-600 bg-orange-50 border-orange-200',
                icon: Clock 
            },
            accepted: { 
                label: orderT('status.accepted'), 
                color: 'text-green-600 bg-green-50 border-green-200',
                icon: CheckCircle 
            },
            preparing: { 
                label: orderT('status.preparing'), 
                color: 'text-orange-600 bg-orange-50 border-orange-200',
                icon: Package 
            },
            on_way: { 
                label: orderT('status.on_way'), 
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                icon: Truck 
            },
            delivered: { 
                label: orderT('status.delivered'), 
                color: 'text-green-600 bg-green-50 border-green-200',
                icon: CheckCircle 
            },
            returned: { 
                label: orderT('status.returned'), 
                color: 'text-gray-600 bg-gray-50 border-gray-200',
                icon: Package 
            },
            cancelled: { 
                label: orderT('status.cancelled'), 
                color: 'text-red-600 bg-red-50 border-red-200',
                icon: XCircle 
            }
        };
        return configs[status];
    };

    const getOrderProgress = (status: Order['status']) => {
        const steps = [
            { key: 'accepted', label: orderT('progress.step_waiting'), date: '13:51/23.12.202' },
            { key: 'preparing', label: orderT('progress.step_accepted'), date: '13:51/23.12.202' },
            { key: 'on_way', label: orderT('progress.step_preparing'), date: '13:51/23.12.202' },
            { key: 'delivered', label: orderT('progress.step_on_way'), date: '13:51/23.12.202' },
            { key: 'completed', label: orderT('progress.step_delivered'), date: '' }
        ];

        const statusOrder = ['waiting', 'accepted', 'preparing', 'on_way', 'delivered'];
        const currentIndex = statusOrder.indexOf(status);
        
        return steps.map((step, index) => ({
            ...step,
            isCompleted: index <= currentIndex,
            isActive: index === currentIndex
        }));
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
                    {orderT('order_history')}
                </button>
                <button
                    onClick={() => setActiveTab('returns')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'returns'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {orderT('returns')}
                </button>
            </nav>
        </div>
    );

    const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
        const statusConfig = getStatusConfig(order.status);
        const StatusIcon = statusConfig.icon;
        const isExpanded = selectedOrderId === order.id;

        return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">+{order.items.length}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">{order.total} TMT</p>
                                <button
                                    onClick={() => setSelectedOrderId(isExpanded ? null : order.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                    <div className="p-4 space-y-6">
                        {/* Order Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500">{orderT('order_number')}:</span>
                                <span className="font-medium">{order.orderNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500">{orderT('order_date')}:</span>
                                <span className="font-medium">{order.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500">{orderT('delivery_date')}:</span>
                                <span className="font-medium">{order.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500">{orderT('item_count')}:</span>
                                <span className="font-medium">{order.items.length} sany</span>
                            </div>
                        </div>

                        {/* Order Progress */}
                        {order.status !== 'cancelled' && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-4">{orderT('progress.title')}</h4>
                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        {getOrderProgress(order.status).map((step, index) => (
                                            <div key={step.key} className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                                    step.isCompleted 
                                                        ? 'bg-blue-500 border-blue-500 text-white' 
                                                        : 'bg-gray-100 border-gray-300 text-gray-400'
                                                }`}>
                                                    {step.isCompleted ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <div className="w-2 h-2 bg-current rounded-full" />
                                                    )}
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <p className={`text-xs font-medium ${
                                                        step.isCompleted ? 'text-gray-900' : 'text-gray-500'
                                                    }`}>
                                                        {step.label}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
                                        <div 
                                            className="h-full bg-blue-500 transition-all duration-300"
                                            style={{ 
                                                width: `${(getOrderProgress(order.status).filter(s => s.isCompleted).length - 1) * 25}%` 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {orderT('item_details.size')}: <span className="text-gray-900">{item.size}</span>
                                            <span className="ml-4 text-red-500">{orderT('item_details.items_left')} 3 {orderT('item_details.items_text')}</span>
                                        </p>
                                        <p className="text-sm text-gray-500">{orderT('item_details.seller')}: <span className="text-blue-600">{order.seller}</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">{item.price} TMT</p>
                                    </div>
                                    {order.status === 'delivered' && (
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                                                {orderT('actions.return')}
                                            </button>
                                            <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                                                {orderT('actions.review')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Address and Payment Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {orderT('address_title')}
                                </h4>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">#Öýüm +993-65-646362</p>
                                    <p className="text-sm text-gray-900">{order.deliveryAddress}</p>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">{orderT('payment_title')}</h4>
                                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{addressT('subtotal')}</span>
                                        <span className="text-gray-900">{order.total - order.deliveryFee + order.discount} TMT</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{addressT('delivery_fee')}</span>
                                        <span className="text-gray-900">{order.deliveryFee} TMT</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{addressT('discount')}</span>
                                        <span className="text-gray-900">-{order.discount} TMT</span>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-gray-900">{addressT('total')}</span>
                                        <span className="text-gray-900">{order.total} TMT</span>
                                    </div>
                                </div>
                                <button className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center">
                                    <Download className="w-4 h-4 mr-2" />
                                    {orderT('actions.download_invoice')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const OrdersList: React.FC = () => {
        const orders = activeTab === 'orders' ? sampleOrders : sampleOrders.filter(o => o.status === 'returned');
        
        return (
            <div className="space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb />
                <UserHeader />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <SidebarMenu />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    {orderT('title')}
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