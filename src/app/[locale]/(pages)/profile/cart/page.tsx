'use client'
import React, { useState } from 'react';

import { ChevronRight, Heart, Trash2, Plus, Minus, ChevronRightIcon } from 'lucide-react';
import { Link } from "@/i18n/navigation";
import { AddressSelection, OrderSummary, Address, setGlobalAddressHandler } from '@/components/address';
import {useCart} from "@/hooks/useCart";

interface CartItem {
    id: string;
    storeId: string;
    storeName: string;
    image: string;
    name: string;
    size: string;
    originalPrice: number;
    discountedPrice: number;
    quantity: number;
    deliveryTime: string;
    isFavorite: boolean;
}

export default function ShoppingCartPage() {

    const {data: cartItems, isLoading, isError } = useCart();
    // Initial cart items - in a real app, this would come from a context or API
    const initialCartItems: CartItem[] = [
        {
            id: '1',
            storeId: 'apple',
            storeName: 'Apple',
            image: '/xiaomi-bluetooth.jpg',
            name: 'XIAOMI Mijia Bluetooth of the Ther...',
            size: 'XS',
            originalPrice: 2455,
            discountedPrice: 2455,
            quantity: 100,
            deliveryTime: '1 - 3 gün',
            isFavorite: false
        },
        {
            id: '2',
            storeId: 'samsung',
            storeName: 'Samsung',
            image: '/xiaomi-bluetooth.jpg',
            name: 'XIAOMI Mijia Bluetooth of the Ther...',
            size: 'XS',
            originalPrice: 2455,
            discountedPrice: 2455,
            quantity: 1,
            deliveryTime: '1 - 3 gün',
            isFavorite: false
        },
        {
            id: '3',
            storeId: 'apple',
            storeName: 'Apple',
            image: '/xiaomi-bluetooth.jpg',
            name: 'XIAOMI Mijia Bluetooth of the Ther...',
            size: 'XS',
            originalPrice: 2455,
            discountedPrice: 2455,
            quantity: 1,
            deliveryTime: '1 - 3 gün',
            isFavorite: false
        }
    ];
    
    const [items, setItems] = useState(initialCartItems);
    const [currentStep, setCurrentStep] = useState<'cart' | 'address'>('cart');
    
    // Address management
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            label: 'Öýüm',
            phone: '+993 65 646362',
            fullAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            isDefault: true
        },
        {
            id: '2',
            label: 'Öýüm',
            phone: '+993 65 646362',
            fullAddress: 'Aşgabat, Mir 1, Sport işewürlik merkezi',
            isDefault: false
        }
    ]);
    
    const [selectedAddressId, setSelectedAddressId] = useState<string>(
        addresses.find(addr => addr.isDefault)?.id || addresses[0]?.id || ''
    );
    
    const [isOrderLoading, setIsOrderLoading] = useState(false);

    // Set up global address handler
    React.useEffect(() => {
        setGlobalAddressHandler(handleAddNewAddress);
    }, []);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        console.log('Quantity updated:', itemId, newQuantity);
    };

    const handleRemoveItem = (itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        console.log('Item removed:', itemId);
    };

    const handleToggleFavorite = (itemId: string) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
        console.log('Favorite toggled:', itemId);
    };

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
    };

    const deliveryFee = 15;
    const discount = -10;
    const total = calculateSubtotal() + deliveryFee + discount;

    const handleProceedToAddress = () => {
        setCurrentStep('address');
    };

    const handleBackToCart = () => {
        setCurrentStep('cart');
    };

    const handleAddressSelect = (addressId: string) => {
        setSelectedAddressId(addressId);
    };

    const handleAddNewAddress = (newAddress: Address) => {
        setAddresses(prev => [...prev, newAddress]);
        setSelectedAddressId(newAddress.id);
    };

    const handleConfirmOrder = async () => {
        setIsOrderLoading(true);
        
        try {
            // Order processing logic here
            console.log('Order confirmed:', {
                addressId: selectedAddressId,
                items: items,
                total: total
            });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            alert('Sargydyňyz üstünlikli kabul edildi!');
            
        } catch (error) {
            console.error('Order confirmation error:', error);
            alert('Sargyt taýýarlamakda ýalňyşlyk boldy. Gaýtadan synanyşyň.');
        } finally {
            setIsOrderLoading(false);
        }
    };

    // Group items by store
    const itemsByStore = items.reduce((groups, item) => {
        const storeKey = item.storeId;
        if (!groups[storeKey]) {
            groups[storeKey] = {
                storeName: item.storeName,
                items: []
            };
        }
        groups[storeKey].items.push(item);
        return groups;
    }, {} as Record<string, { storeName: string; items: CartItem[] }>);

    if (currentStep === 'address') {
        return (
            <div className="max-w-7xl mx-auto py-2 px-6">
                <div className="mx-auto py-4">
                    <nav className="text-sm flex items-center gap-2">
                        <Link href={`/`} className="text-black">Home</Link>
                        <ChevronRightIcon size={15} />
                        <span className="text-black">Profile</span>
                        <ChevronRightIcon size={15} />
                        <button onClick={handleBackToCart} className="text-black hover:text-primary">Cart</button>
                        <ChevronRightIcon size={15} />
                        <span className="text-primary font-medium">Address</span>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Address Selection - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <AddressSelection
                            addresses={addresses}
                            selectedAddressId={selectedAddressId}
                            onAddressSelect={handleAddressSelect}
                        />
                    </div>

                    {/* Order Summary - Takes 1 column on large screens */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <OrderSummary
                                subtotal={calculateSubtotal()}
                                deliveryFee={deliveryFee}
                                discount={Math.abs(discount)}
                                total={total}
                                currency="TMT"
                                onConfirmOrder={handleConfirmOrder}
                                isLoading={isOrderLoading}
                            />
                        </div>
                    </div>
                </div>


            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-2 px-6">
            <div className="mx-auto py-4">
                <nav className="text-sm flex items-center gap-2">
                    <Link href={`/`} className="text-black">Home</Link>
                    <ChevronRightIcon size={15} />
                    <span className="text-black">Profile</span>
                    <ChevronRightIcon size={15} />
                    <span className="text-primary font-medium">Cart</span>
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <h1 className="text-[#161616] text-2xl font-bold">Sebetim</h1>
                        <span className="text-[#A0A3BD] text-lg">{items.length} haryt</span>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(itemsByStore).map(([storeId, storeData]) => (
                            <div key={storeId} className="space-y-4">
                                {/* Store Header */}
                                <div className="flex items-center gap-1 text-sm">
                                    <span className="text-[#161616]">Satyjy:</span>
                                    <span className="text-[#0762C8] font-medium">{storeData.storeName}</span>
                                    <ChevronRight className="w-3 h-3 text-[#0762C8]" />
                                </div>

                                {/* Store Items */}
                                <div className="space-y-4">
                                    {storeData.items.map((item) => (
                                        <div key={item.id} className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <div
                                                    className="w-20 h-20 bg-[#F8F9FA] rounded-lg border border-[#E5E5E5] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-[#161616] font-medium mb-1 truncate">
                                                        {item.name}
                                                    </h3>
                                                    <div className="text-[#A0A3BD] text-sm mb-3">
                                                        Razmer: <span className="text-[#161616]">{item.size}</span>
                                                        <span className="ml-4 text-[#FC185B]">Solky 3 haryt</span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => handleToggleFavorite(item.id)}
                                                            className={`flex items-center gap-1 text-sm ${item.isFavorite ? 'text-[#FC185B]' : 'text-[#A0A3BD]'
                                                                }`}
                                                        >
                                                            <Heart
                                                                className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                                                            Haladym
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="flex items-center gap-1 text-sm text-[#A0A3BD]"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Aýyrmak
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Quantity and Price */}
                                                <div className="flex flex-col items-end gap-3">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-[#E5E5E5] rounded">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="p-1 hover:bg-gray-50"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4 text-[#A0A3BD]" />
                                                        </button>
                                                        <span className="px-3 py-1 text-sm border-x border-[#E5E5E5] min-w-[50px] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="p-1 hover:bg-gray-50"
                                                        >
                                                            <Plus className="w-4 h-4 text-[#A0A3BD]" />
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <div className="text-[#A0A3BD] text-sm line-through">
                                                            {item.originalPrice} TMT
                                                        </div>
                                                        <div className="text-[#FC185B] font-semibold">
                                                            {item.discountedPrice} TMT
                                                        </div>
                                                    </div>

                                                    {/* Delivery */}
                                                    <div className="text-[#A0A3BD] text-xs">
                                                        Gowşurmak: {item.deliveryTime}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 sticky top-6">
                        <h2 className="text-[#161616] text-xl font-semibold mb-4">
                            Sargyt barada
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-[#161616]">Harytlaryň jemi bahasy:</span>
                                <span className="text-[#161616]">{calculateSubtotal()} TMT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#161616]">Eltip bermek hyzmatý:</span>
                                <span className="text-[#161616]">{deliveryFee} TMT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#161616]">Arzanladyş:</span>
                                <span className="text-[#161616]">{discount} TMT</span>
                            </div>
                            <hr className="border-[#E5E5E5]" />
                            <div className="flex justify-between font-semibold">
                                <span className="text-[#161616]">Jemi baha</span>
                                <span className="text-[#161616]">{total} TMT</span>
                            </div>
                        </div>

                        <button
                            onClick={handleProceedToAddress}
                            className="w-full bg-[#0762C8] text-white py-3 rounded-lg font-medium hover:bg-[#0651A8] transition-colors duration-200"
                        >
                            Sebeti tassykla
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};