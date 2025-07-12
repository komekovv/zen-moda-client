'use client'
import React, { useState, useRef, useEffect } from 'react';
import {
    User,
    ShoppingBag,
    MapPin,
    Heart,
    Gift,
    HelpCircle,
    ChevronRight,
    Edit3,
    Loader2
} from 'lucide-react';
import { useClientAuth } from "@/contexts/auth-provider";
import { useUpdateProfileMutation } from "@/hooks/useAuth";
import { useTranslations } from 'next-intl';
import {GenderType, UpdateProfileRequest} from '@/api/queryTypes/User';

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

export default function ProfilePage() {
    const t = useTranslations('profile');
    const { user } = useClientAuth();
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Use refs for form inputs to avoid controlled component issues
    const fullnameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);

    // Initialize form values when user data is available
    useEffect(() => {
        if (user && fullnameRef.current && genderRef.current) {
            fullnameRef.current.value = user.fullname || '';
            genderRef.current.value = user.gender || '';
        }
    }, [user]);

    const profileMenuItems: ProfileMenuItem[] = [
        { id: 'profile', title: t('menu.profile'), icon: User, href: '/profile' },
        { id: 'orders', title: t('menu.orders'), icon: ShoppingBag, href: '/profile/orders' },
        { id: 'addresses', title: t('menu.addresses'), icon: MapPin, href: '/profile/addresses' },
        { id: 'favorites', title: t('menu.favorites'), icon: Heart, href: '/profile/favorites'},
        { id: 'bonuses', title: t('menu.bonuses'), icon: Gift, href: '/profile/bonuses' },
        { id: 'help', title: t('menu.help'), icon: HelpCircle, href: '/help' }
    ];

    const profileTabs: TabItem[] = [
        { id: 'profile', label: t('tabs.profile') }
    ];

    const updateProfileMutation = useUpdateProfileMutation({
        onSuccess: (response) => {
            setIsEditing(false);
            // You might want to show a success toast here
            console.log(t('messages.profile_updated_success'));
        },
        onError: (error) => {
            // Handle error - you might want to show an error toast
            console.error(t('messages.profile_update_error'), error);
        }
    });

    const handleSaveProfile = () => {
        if (!user?.id || !fullnameRef.current || !genderRef.current) return;

        const updateRequest: UpdateProfileRequest = {
            fullname: fullnameRef.current.value,
            gender: genderRef.current.value as GenderType,
        };

        updateProfileMutation.mutate(updateRequest);
    };

    const handleCancelEdit = () => {
        if (user && fullnameRef.current && genderRef.current) {
            fullnameRef.current.value = user.fullname || '';
            genderRef.current.value = user.gender || '';
        }
        setIsEditing(false);
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
                    <h1 className="text-2xl font-bold">{user?.fullname || t('default.unnamed_user')}</h1>
                    <p className="text-blue-100">{user?.phone_number || ''}</p>
                </div>
            </div>
        </div>
    );

    const SidebarMenu: React.FC = () => {
        const currentPath = '/profile';

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
                    disabled={updateProfileMutation.isPending}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Edit3 className="w-4 h-4" />
                    <span>{isEditing ? t('actions.cancel') : t('actions.edit')}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.full_name')}
                    </label>
                    <input
                        ref={fullnameRef}
                        type="text"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder={t('form.full_name_placeholder')}
                    />
                </div>

                {/*<div>*/}
                {/*    <label className="block text-sm font-medium text-gray-700 mb-2">*/}
                {/*        {t('form.phone_number')}*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={user?.phone_number || ''}*/}
                {/*        disabled={true}*/}
                {/*        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"*/}
                {/*        placeholder={t('form.phone_number_placeholder')}*/}
                {/*        readOnly*/}
                {/*    />*/}
                {/*    <p className="text-xs text-gray-500 mt-1">*/}
                {/*        {t('form.phone_number_note')}*/}
                {/*    </p>*/}
                {/*</div>*/}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.gender')}
                    </label>
                    <select
                        ref={genderRef}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">{t('form.gender_select')}</option>
                        <option value="male">{t('form.gender_male')}</option>
                        <option value="female">{t('form.gender_female')}</option>
                    </select>
                </div>
            </div>

            {isEditing && (
                <div className="flex space-x-4 pt-4">
                    <button
                        onClick={handleSaveProfile}
                        disabled={updateProfileMutation.isPending}
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updateProfileMutation.isPending && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <span>{t('actions.save')}</span>
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        disabled={updateProfileMutation.isPending}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('actions.cancel')}
                    </button>
                </div>
            )}

            {/* Error display */}
            {updateProfileMutation.isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">
                        {t('messages.profile_update_error')}
                    </p>
                </div>
            )}
        </div>
    );

    // Loading state while user data is being fetched
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-gray-600">{t('loading.user_data')}</span>
                </div>
            </div>
        );
    }

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
                            <h3 className="text-lg font-semibold text-black mb-4">
                                {t('content.profile_information')}
                            </h3>
                            <ProfileTabs/>
                            {activeTab === 'profile' && <ProfileForm/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};