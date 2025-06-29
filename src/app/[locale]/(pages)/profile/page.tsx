'use client'
import React, { useState } from 'react';
import {
    User,
    ShoppingBag,
    MapPin,
    Heart,
    Gift,
    CreditCard,
    HelpCircle,
    ChevronRight,
    Edit3,
    Phone,
    Calendar
} from 'lucide-react';

// Types for better TypeScript support
interface UserProfile {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
    joinDate: string;
    location: string;
}

interface ProfileMenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: string | number;
}

interface TabItem {
    id: string;
    label: string;
    count?: number;
}

// Mock user data - in real app, this would come from API/database
const mockUser: UserProfile = {
    id: '1',
    name: 'Aman Amanow',
    phone: '+993 65 646562',
    avatar: '/api/placeholder/80/80',
    joinDate: '2021-03-15',
    location: 'Aşgabat, Türkmenistan'
};

// Profile menu items configuration
const profileMenuItems: ProfileMenuItem[] = [
    { id: 'profile', title: 'Profil', icon: User, href: '/profile/edit' },
    { id: 'orders', title: 'Sargytlarym', icon: ShoppingBag, href: '/profile/orders', badge: '3' },
    { id: 'addresses', title: 'Adreslerim', icon: MapPin, href: '/profile/addresses' },
    { id: 'favorites', title: 'Halanlaryм', icon: Heart, href: '/profile/favorites', badge: '12' },
    { id: 'bonuses', title: 'Baha bermek', icon: Gift, href: '/profile/bonuses' },
    { id: 'payments', title: '', icon: CreditCard, href: '/profile/payments' },
    { id: 'help', title: 'Kömek', icon: HelpCircle, href: '/help' }
];

// Profile tabs configuration
const profileTabs: TabItem[] = [
    { id: 'profile', label: 'Profil' },
    { id: 'password', label: 'Parol çalyşmak' },
    { id: 'notifications', label: 'Nomer çalyşmak' }
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Profile form state
    const [profileData, setProfileData] = useState({
        firstName: 'Aman',
        lastName: 'Amanow',
        phone: '+993 65 646562',
        gender: 'male',
        birthDate: '',
        location: 'Aşgabat'
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = () => {
        // In real app, this would make API call to update profile
        console.log('Saving profile:', profileData);
        setIsEditing(false);
    };

    // Breadcrumb component
    const Breadcrumb: React.FC = () => (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Şahsy otag</span>
        </nav>
    );

    // User header component
    const UserHeader: React.FC = () => (
        <div className="bg-primary text-white p-6 mb-8">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                    <p className="text-blue-100">{mockUser.phone}</p>
                </div>
            </div>
        </div>
    );

    // Sidebar menu component
    const SidebarMenu: React.FC = () => (
        <div className="bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Şahsy otag</h2>
            <nav className="space-y-2">
                {profileMenuItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                            <span className="text-gray-700 group-hover:text-gray-900">{item.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {/*{item.badge && (*/}
                            {/*    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">*/}
                            {/*      {item.badge}*/}
                            {/*    </span>*/}
                            {/*)}*/}
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </a>
                ))}
            </nav>
        </div>
    );

    // Profile tabs component
    const ProfileTabs: React.FC = () => (
        <div className="bg-blue-shade-1 mb-6 px-4 py-2 rounded-lg">
            <nav className="flex space-x-8">
                {profileTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab.label}
                        {tab.count && (
                            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );

    // Profile form component
    const ProfileForm: React.FC = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditing ? 'Ýatyr' : 'Üýtgetmek'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adynyz
                    </label>
                    <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Familýaňyz
                    </label>
                    <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon belgisi
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jynsynyz
                    </label>
                    <select
                        value={profileData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Saýlaň</option>
                        <option value="male">Erkek</option>
                        <option value="female">Aýal</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doglan senesi
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            value={profileData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Bellenilmedik</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ýaşaýan ýeriňiz
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Erkek</p>
                </div>
            </div>

            {isEditing && (
                <div className="flex space-x-4 pt-4">
                    <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Ýatda sakla
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Ýatyr
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb />
                <UserHeader />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SidebarMenu />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profil maglumatlarym</h3>

                            <ProfileTabs/>

                            {activeTab === 'profile' && <ProfileForm/>}

                            {activeTab === 'password' && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Parol çalyşmak</h3>
                                    <p className="text-gray-600">Bu bölüm häzirlikde işlenip barylýar.</p>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Telefon belgisini
                                        çalyşmak</h3>
                                    <p className="text-gray-600">Bu bölüm häzirlikde işlenip barylýar.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
