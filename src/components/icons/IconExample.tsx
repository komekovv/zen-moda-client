'use client'

import React from 'react';
import {PhoneIcon} from "@/components/icons/PhoneIcon";
import {SearchIcon} from "@/components/icons/SearchIcon";
import {PersonIcon} from "@/components/icons/PersonIcon";
import {HeartIcon} from "@/components/icons/HeartIcon";
import {BoxIcon} from "@/components/icons/BoxIcon";
import {CartIcon} from "@/components/icons/CartIcon";
import {BagIcon} from "@/components/icons/BagIcon";
import {HouseIcon} from "@/components/icons/HouseIcon";
import {GridIcon} from "@/components/icons/GridIcon";
import {IconWrapper} from "@/components/icons/IconWrapper";

// Usage Examples Component
export const IconExamples: React.FC = () => {
    return (
        <div className="p-8 space-y-8">
            <h1 className="font-rubik text-h2 text-black">Icon Examples</h1>

            {/* Basic Icons */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Basic Icons</h2>
                <div className="flex items-center space-x-6">
                    <PhoneIcon width={20} height={20} color="black" />
                    <PhoneIcon width={20} height={20} color="blue" filled />

                    <SearchIcon width={24} height={24} color="white" className="bg-primary p-1 rounded" />
                    <SearchIcon width={24} height={24} color="black" filled={false} />

                    <PersonIcon width={20} height={20} color="black" />
                    <PersonIcon width={20} height={20} color="blue" filled={false} />
                </div>
            </section>

            {/* Icons with Custom Colors */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Custom Colors</h2>
                <div className="flex items-center space-x-6">
                    <HeartIcon width={24} height={24} color="#FC185B" />
                    <HeartIcon width={24} height={24} color="#FC185B" filled />

                    <BoxIcon width={24} height={24} color="#0762C8" />
                    <BoxIcon width={24} height={24} color="#0762C8" filled={false} />
                </div>
            </section>

            {/* Icons with Badges */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Icons with Badges</h2>
                <div className="flex items-center space-x-8">
                    <CartIcon
                        width={24}
                        height={24}
                        color="#A0A3BD"
                        showBadge
                        filled
                        badgeCount={5}
                    />

                    <CartIcon
                        width={24}
                        height={24}
                        color="#0762C8"
                        filled
                        showBadge
                        badgeCount={12}
                    />

                    <BagIcon
                        width={24}
                        height={24}
                        color="#A0A3BD"
                        showBadge
                        badgeCount={3}
                    />

                    <BagIcon
                        width={24}
                        height={24}
                        color="#0762C8"
                        filled
                        showBadge
                        badgeCount={99}
                    />

                    <BagIcon
                        width={24}
                        height={24}
                        color="#FC185B"
                        showBadge
                        badgeCount={150} // Shows 99+
                    />
                </div>
            </section>

            {/* Navigation Icons */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Navigation Icons</h2>
                <div className="flex items-center space-x-6">
                    <HouseIcon width={28} height={28} />
                    <GridIcon width={28} height={28} />
                    <HouseIcon width={28} height={28} filled={false} color="#A0A3BD" />
                    <GridIcon width={28} height={28} filled={false} color="#0762C8" />
                </div>
            </section>

            {/* Icon Wrapper Examples */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Icon Wrappers (Clickable)</h2>
                <div className="flex items-center space-x-4">
                    <IconWrapper
                        className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors"
                        onClick={() => alert('Phone clicked!')}
                    >
                        <PhoneIcon width={20} height={20} color="black" />
                    </IconWrapper>

                    <IconWrapper
                        className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors"
                        onClick={() => alert('Search clicked!')}
                    >
                        <SearchIcon width={20} height={20} color="black" />
                    </IconWrapper>

                    <IconWrapper
                        className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors"
                        onClick={() => alert('Cart clicked!')}
                    >
                        <CartIcon
                            width={20}
                            height={20}
                            color="black"
                            showBadge
                            badgeCount={7}
                        />
                    </IconWrapper>
                </div>
            </section>

            {/* Responsive Sizes */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Responsive Sizes</h2>
                <div className="flex items-center space-x-4">
                    <HeartIcon width={16} height={16} color="#FC185B" />
                    <HeartIcon width={20} height={20} color="#FC185B" />
                    <HeartIcon width={24} height={24} color="#FC185B" />
                    <HeartIcon width={32} height={32} color="#FC185B" />
                </div>
            </section>

            {/* Color Variants */}
            <section className="space-y-4">
                <h2 className="font-inter text-h3 text-black">Tailwind Color Classes</h2>
                <div className="flex items-center space-x-4">
                    <PersonIcon width={24} height={24} className="text-primary" color="currentColor" />
                    <PersonIcon width={24} height={24} className="text-success" color="currentColor" />
                    <PersonIcon width={24} height={24} className="text-warning" color="currentColor" />
                    <PersonIcon width={24} height={24} className="text-sale" color="currentColor" />
                    <PersonIcon width={24} height={24} className="text-passive" color="currentColor" />
                </div>
            </section>
        </div>
    );
};

// Header Component Usage Example
export const HeaderWithIcons: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            {/* Desktop Header Example */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h1 className="font-rubik text-h2 text-black">ZEN MODA</h1>

                    {/* Search */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Şu yerden gözle"
                                className="w-full pl-4 pr-12 py-3 border border-border rounded-lg font-inter text-body-description focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-md">
                                <SearchIcon width={16} height={16} color="white" />
                            </button>
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-4">
                        <IconWrapper className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors">
                            <PersonIcon width={20} height={20} color="#A0A3BD" />
                        </IconWrapper>

                        <IconWrapper className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors">
                            <BoxIcon width={20} height={20} color="#A0A3BD" />
                        </IconWrapper>

                        <IconWrapper className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors">
                            <HeartIcon width={20} height={20} color="#A0A3BD" />
                        </IconWrapper>

                        <IconWrapper className="p-2 hover:bg-blue-shade-1 rounded-lg transition-colors">
                            <CartIcon
                                width={20}
                                height={20}
                                color="#A0A3BD"
                                showBadge
                                badgeCount={12}
                            />
                        </IconWrapper>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation Example */}
            <div className="fixed bottom-0 left-0 right-0 bg-blue-shade-1 border-t border-border lg:hidden">
                <div className="flex items-center justify-around h-16">
                    <IconWrapper>
                        <HouseIcon width={24} height={24} />
                    </IconWrapper>

                    <IconWrapper>
                        <GridIcon width={24} height={24} />
                    </IconWrapper>

                    <IconWrapper>
                        <CartIcon
                            width={24}
                            height={24}
                            color="#A0A3BD"
                            showBadge
                            badgeCount={12}
                        />
                    </IconWrapper>

                    <IconWrapper>
                        <HeartIcon width={24} height={24} color="#A0A3BD" />
                    </IconWrapper>

                    <IconWrapper>
                        <PersonIcon width={24} height={24} color="#A0A3BD" />
                    </IconWrapper>
                </div>
            </div>
        </header>
    );
};