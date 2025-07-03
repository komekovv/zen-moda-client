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

interface UserProfile {
    id: string;
    fullname: string;
    phone_number: string;
    gender: string;
}

interface ProfileMenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
}

interface TabItem {
    id: string;
    label: string;
    count?: number;
}

const mockUser: UserProfile = {
    id: '1',
    fullname: 'Aman Amanow',
    phone_number: '+993 65 646562',
    gender: 'male'
};

const profileMenuItems: ProfileMenuItem[] = [
    { id: 'profile', title: 'Profil', icon: User, href: '/profile/edit' },
    { id: 'orders', title: 'Sargytlarym', icon: ShoppingBag, href: '/profile/orders' },
    { id: 'addresses', title: 'Adreslerim', icon: MapPin, href: '/profile/addresses' },
    { id: 'favorites', title: 'Halanlaryм', icon: Heart, href: '/profile/favorites'},
    { id: 'bonuses', title: 'Baha bermek', icon: Gift, href: '/profile/bonuses' },
    // { id: 'payments', title: '', icon: CreditCard, href: '/profile/payments' },
    { id: 'help', title: 'Kömek', icon: HelpCircle, href: '/help' }
];

const profileTabs: TabItem[] = [
    { id: 'profile', label: 'Profil' },
    // { id: 'notifications', label: 'Nomer çalyşmak' }
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [profileData, setProfileData] = useState({
        fullName: 'Aman Amanow',
        phone_number: '+993 65 646562',
        gender: 'male',
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = () => {
        console.log('Saving profile:', profileData);
        setIsEditing(false);
    };

    const Breadcrumb: React.FC = () => (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">Şahsy otag</span>
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
                    <h1 className="text-2xl font-bold">{mockUser.fullname}</h1>
                    <p className="text-blue-100">{mockUser.phone_number}</p>
                </div>
            </div>
        </div>
    );

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
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </a>
                ))}
            </nav>
        </div>
    );

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

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doly Adynyz
                    </label>
                    <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
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
                    <div className="lg:col-span-1">
                        <SidebarMenu />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-black mb-4">Profil maglumatlarym</h3>

                            <ProfileTabs/>

                            {activeTab === 'profile' && <ProfileForm/>}

                            {/*{activeTab === 'password' && (*/}
                            {/*    <div className="text-center py-12">*/}
                            {/*        <h3 className="text-lg font-medium text-gray-900 mb-2">Parol çalyşmak</h3>*/}
                            {/*        <p className="text-gray-600">Bu bölüm häzirlikde işlenip barylýar.</p>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            {/*{activeTab === 'notifications' && (*/}
                            {/*    <div className="text-center py-12">*/}
                            {/*        <h3 className="text-lg font-medium text-gray-900 mb-2">Telefon belgisini*/}
                            {/*            çalyşmak</h3>*/}
                            {/*        <p className="text-gray-600">Bu bölüm häzirlikde işlenip barylýar.</p>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
