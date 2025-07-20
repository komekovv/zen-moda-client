'use client'
import React, {useEffect, useState} from 'react';

import { ChevronRight, Heart, Trash2, Plus, Minus, ChevronRightIcon } from 'lucide-react';
import { Link } from "@/i18n/navigation";
import { AddressSelection, OrderSummary, setGlobalAddressHandler } from '@/components/address';
import EditAddressModal from '@/components/address/EditAddressModal';
import ConfirmDeleteModal from '@/components/address/ConfirmDeleteModal';
import {useCart, useUpdateCartItem, useRemoveFromCart, useClearCart} from "@/hooks/useCart";
import {LocalizedText} from "@/types/types";
import {CartItem} from "@/api/queryTypes/Cart";
import { useTranslations } from 'next-intl';
import {LocationResponse} from "@/api/queryTypes/Location";
import {useUserLocation} from "@/hooks/useAddress";
import { useCreateOrderFromBasketMutation } from "@/hooks/useOrder";

export default function ShoppingCartPage() {
    const t = useTranslations();

    const {data: cartResponse, isLoading, isError, refetch } = useCart();
    const updateCartItem = useUpdateCartItem();
    const removeFromCart = useRemoveFromCart();
    const clearCart = useClearCart();
    const createOrderFromBasket = useCreateOrderFromBasketMutation();

    // Use the address API hook
    const {data: addressResponse, isLoading: addressLoading, isError: addressError, refetch: refetchAddresses} = useUserLocation();

    const [currentStep, setCurrentStep] = useState<'cart' | 'address'>('cart');

    // Get addresses from API response
    const addresses: LocationResponse[] = addressResponse?.data || [];

    const [selectedAddressId, setSelectedAddressId] = useState<string>(
        addresses.length > 0 ? addresses[0].id : ''
    );

    const [isOrderLoading, setIsOrderLoading] = useState(false);

    const cartItems: CartItem[] = cartResponse?.data || [];

    // Update selected address when addresses are loaded
    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            setSelectedAddressId(addresses[0].id);
        }
    }, [addresses, selectedAddressId]);

    // Set up global address handler
    React.useEffect(() => {
        setGlobalAddressHandler(handleAddNewAddress);
    }, []);

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            // Find the cart item to get basketItemId
            const cartItem = cartItems.find(item => item.id === itemId);
            if (!cartItem) return;

            await updateCartItem.mutateAsync({
                itemId: parseInt(cartItem.basketItemId),
                data: { quantity: newQuantity }
            });

            // Refetch cart data to get updated state
            refetch();

            console.log('Quantity updated:', itemId, newQuantity);
        } catch (error) {
            console.error(t('cart.errors.quantity_update'), error);
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            // Find the cart item to get basketItemId
            const cartItem = cartItems.find(item => item.id === itemId);
            if (!cartItem) return;

            await removeFromCart.mutateAsync(parseInt(cartItem.basketItemId));

            // Refetch cart data to get updated state
            refetch();

            console.log('Item removed:', itemId);
        } catch (error) {
            console.error(t('cart.errors.item_remove'), error);
        }
    };

    const handleToggleFavorite = (itemId: string) => {
        // This would require a separate API call to toggle wishlist status
        // For now, just log the action since the API endpoint isn't provided
        console.log('Favorite toggled:', itemId);
        // You'll need to implement this with your wishlist API
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.discountPrice) || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    const deliveryFee = 15;
    const total = calculateSubtotal() + deliveryFee;

    const handleProceedToAddress = () => {
        setCurrentStep('address');
    };

    const handleBackToCart = () => {
        setCurrentStep('cart');
    };

    const handleAddressSelect = (addressId: string) => {
        setSelectedAddressId(addressId);
    };

    const handleAddNewAddress = (newAddress: LocationResponse) => {
        // Refetch addresses to get the latest data including the new address
        refetchAddresses();
        setSelectedAddressId(newAddress.id);
    };

    const handleAddressUpdate = (updatedAddress: LocationResponse) => {
        // Refetch addresses to get the latest data
        refetchAddresses();
        console.log('Address updated:', updatedAddress);
    };

    const handleAddressDelete = (deletedAddressId: string) => {
        // Refetch addresses to get the latest data
        refetchAddresses();

        // If the deleted address was selected, select the first available address
        if (selectedAddressId === deletedAddressId && addresses.length > 1) {
            const remainingAddresses = addresses.filter(addr => addr.id !== deletedAddressId);
            if (remainingAddresses.length > 0) {
                setSelectedAddressId(remainingAddresses[0].id);
            } else {
                setSelectedAddressId('');
            }
        }

        console.log('Address deleted:', deletedAddressId);
    };

    const handleConfirmOrder = async () => {
        setIsOrderLoading(true);

        try {
            // Validate that we have an address selected
            if (!selectedAddressId) {
                alert(t('cart.errors.select_address'));
                return;
            }

            // Validate that we have items in cart
            if (cartItems.length === 0) {
                alert(t('cart.errors.empty_cart'));
                return;
            }

            // Get all basketItemIds from cart items
            const basketItemIds = cartItems.map(item => parseInt(item.basketItemId));

            // Create order from basket
            const orderData = {
                addressId: parseInt(selectedAddressId),
                basketItemIds: basketItemIds
            };

            console.log('Creating order with data:', orderData);

            // Call the API to create order
            const orderResponse = await createOrderFromBasket.mutateAsync(orderData);

            console.log('Order created successfully:', orderResponse);

            // Clear the cart after successful order creation
            await clearCart.mutateAsync();

            // Refetch cart to update UI
            refetch();

            // Show success message
            alert(t('cart.success.order_confirmed'));

            // Optionally redirect to orders page or show order details
            // You can uncomment this if you want to redirect
            // window.location.href = '/orders';

        } catch (error) {
            console.error('Order confirmation error:', error);

            // Show appropriate error message
            if (error instanceof Error) {
                alert(`${t('cart.errors.order_confirm')}: ${error.message}`);
            } else {
                alert(t('cart.errors.order_confirm'));
            }
        } finally {
            setIsOrderLoading(false);
        }
    };

    // Loading state
    if (isLoading || addressLoading) {
        return (
            <div className="max-w-7xl mx-auto py-2 px-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-lg">{t('cart.loading')}</div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError || addressError) {
        return (
            <div className="max-w-7xl mx-auto py-2 px-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-lg text-red-500">{t('cart.error')}</div>
                </div>
            </div>
        );
    }

    if (currentStep === 'address') {
        return (
            <div className="max-w-7xl mx-auto py-2 px-6">
                <div className="mx-auto py-4">
                    <nav className="text-sm flex items-center gap-2">
                        <Link href={`/`} className="text-black">{t('cart.breadcrumb.home')}</Link>
                        <ChevronRightIcon size={15} />
                        <Link href={`/profile`} className="text-black">{t('cart.breadcrumb.profile')}</Link>
                        <ChevronRightIcon size={15} />
                        <button onClick={handleBackToCart} className="text-black hover:text-primary">{t('cart.breadcrumb.cart')}</button>
                        <ChevronRightIcon size={15} />
                        <span className="text-primary font-medium">{t('cart.breadcrumb.address')}</span>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Address Selection - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <AddressSelection
                            addresses={addresses}
                            selectedAddressId={selectedAddressId}
                            onAddressSelect={handleAddressSelect}
                            onAddressUpdate={handleAddressUpdate}
                            onAddressDelete={handleAddressDelete}
                        />
                    </div>

                    {/* Order Summary - Takes 1 column on large screens */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <OrderSummary
                                subtotal={calculateSubtotal()}
                                deliveryFee={deliveryFee}
                                total={total}
                                currency="TMT"
                                onConfirmOrder={handleConfirmOrder}
                                isLoading={isOrderLoading || createOrderFromBasket.isPending}
                            />
                        </div>
                    </div>
                </div>

                {/* Edit Address Modal */}
                <EditAddressModal
                    address={null}
                    onAddressUpdate={handleAddressUpdate}
                />

                {/* Confirm Delete Modal */}
                <ConfirmDeleteModal
                    address={null}
                    onAddressDelete={handleAddressDelete}
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-2 px-6 mb-3">
            <div className="mx-auto py-4">
                <nav className="text-sm flex items-center gap-2">
                    <Link href={`/`} className="text-black">{t('cart.breadcrumb.home')}</Link>
                    <ChevronRightIcon size={15}/>
                    <Link href={`/profile`} className="text-black">{t('cart.breadcrumb.profile')}</Link>
                    <ChevronRightIcon size={15}/>
                    <span className="text-primary font-medium">{t('cart.breadcrumb.cart')}</span>
                </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <h1 className="text-[#161616] text-2xl font-bold">{t('cart.title')}</h1>
                        <span className="text-[#A0A3BD] text-lg">{cartItems.length} {t('cart.item_count')}</span>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-[#A0A3BD] text-lg">{t('cart.empty')}</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div
                                                className="w-20 h-20 bg-[#F8F9FA] rounded-lg border border-[#E5E5E5] flex items-center justify-center overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.photo}
                                                    alt={item.name.tk}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-[#161616] font-medium mb-1 truncate">
                                                    {item.name.tk}
                                                </h3>
                                                <div className="text-[#A0A3BD] text-sm mb-3">
                                                    {t('cart.size')}: <span
                                                    className="text-[#161616]">{item.size}</span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => handleToggleFavorite(item.id)}
                                                        className={`flex items-center gap-1 text-sm ${
                                                            item.isInWishlist ? 'text-[#FC185B]' : 'text-[#A0A3BD]'
                                                        }`}
                                                    >
                                                        <Heart
                                                            className={`w-4 h-4 ${item.isInWishlist ? 'fill-current' : ''}`}
                                                        />
                                                        {t('cart.actions.favorite')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="flex items-center gap-1 text-sm text-[#A0A3BD]"
                                                        disabled={removeFromCart.isPending}
                                                    >
                                                        <Trash2 className="w-4 h-4"/>
                                                        {t('cart.actions.remove')}
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
                                                        disabled={item.quantity <= 1 || updateCartItem.isPending}
                                                    >
                                                        <Minus className="w-4 h-4 text-[#A0A3BD]"/>
                                                    </button>
                                                    <span
                                                        className="px-3 py-1 text-sm border-x border-[#E5E5E5] min-w-[50px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-gray-50"
                                                        disabled={updateCartItem.isPending}
                                                    >
                                                        <Plus className="w-4 h-4 text-[#A0A3BD]"/>
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-[#A0A3BD] text-sm line-through">
                                                        {item.basePrice} TMT
                                                    </div>
                                                    <div className="text-[#FC185B] font-semibold">
                                                        {item.discountPrice} TMT
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 sticky top-6">
                        <h2 className="text-[#161616] text-xl font-semibold mb-4">
                            {t('cart.order_summary.title')}
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-[#161616]">{t('cart.order_summary.subtotal')}</span>
                                <span className="text-[#161616]">{calculateSubtotal().toFixed(2)} TMT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#161616]">{t('cart.order_summary.delivery_fee')}</span>
                                <span className="text-[#161616]">{deliveryFee} TMT</span>
                            </div>
                            <hr className="border-[#E5E5E5]"/>
                            <div className="flex justify-between font-semibold">
                                <span className="text-[#161616]">{t('cart.order_summary.total')}</span>
                                <span className="text-[#161616]">{total.toFixed(2)} TMT</span>
                            </div>
                        </div>

                        <button
                            onClick={handleProceedToAddress}
                            className="w-full bg-[#0762C8] text-white py-3 rounded-lg font-medium hover:bg-[#0651A8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0}
                        >
                            {t('cart.order_summary.confirm_cart')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};