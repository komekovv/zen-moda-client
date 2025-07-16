'use client'
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {useAddToCart} from "@/hooks/useCart";

interface ProductActionsProps {
    productId: string;
    selectedVariantId: string;
    selectedSize: string;
    selectedColor: string;
    availability: 'in_stock' | 'limited' | 'out_of_stock';
}

const ProductActions: React.FC<ProductActionsProps> = ({
                                                           productId,
                                                           selectedVariantId,
                                                           selectedSize,
                                                           selectedColor,
                                                           availability
                                                       }) => {
    const t = useTranslations('product_detail');
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const useAddToCartMutation = useAddToCart({
        onSuccess: () => {
            setIsAddingToCart(false);
            alert("added successfully")
        },
        onError: (error: any) => {
            setIsAddingToCart(false);
        }
    })

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        useAddToCartMutation.mutate({
            product_id: productId,
            variation_id: selectedVariantId,
            quantity: 1
        });
    };


    const isDisabled = availability === 'out_of_stock' || !selectedSize || !selectedColor;

    return (
        <button
            onClick={handleAddToCart}
            disabled={isDisabled || isAddingToCart}
            className={`flex-1 h-12 px-6 rounded-lg font-rubik text-body-brand font-semibold transition-colors ${
                isDisabled
                    ? 'bg-passive text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-blue-800 active:bg-blue-900'
            }`}
        >
            {isAddingToCart ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('actions.adding')}
                </div>
            ) : (
                t('actions.add_to_cart')
            )}
        </button>
    );
};

export default ProductActions;