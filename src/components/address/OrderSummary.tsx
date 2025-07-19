'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  currency?: string;
  onConfirmOrder: () => void;
  isLoading?: boolean;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                     subtotal,
                                                     deliveryFee,
                                                     discount = 0,
                                                     total,
                                                     currency = 'TMT',
                                                     onConfirmOrder,
                                                     isLoading = false,
                                                     className = ''
                                                   }) => {
  const t = useTranslations('address');

  return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('order_summary')}
        </h3>

        <div className="space-y-3 mb-6">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('subtotal')}</span>
            <span className="font-medium text-gray-900">
            {subtotal.toLocaleString()} {currency}
          </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('delivery_fee')}</span>
            <span className="font-medium text-gray-900">
            {deliveryFee.toLocaleString()} {currency}
          </span>
          </div>

          {/* Discount (if any) */}
          {discount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('discount')}</span>
                <span className="font-medium text-red-500">
              -{discount.toLocaleString()} {currency}
            </span>
              </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">{t('total')}</span>
            <span className="text-lg font-bold text-gray-900">
            {total.toLocaleString()} {currency}
          </span>
          </div>
        </div>

        {/* Confirm Order Button */}
        <button
            onClick={onConfirmOrder}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLoading
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isLoading ? t('processing') : t('confirm_order')}
        </button>
      </div>
  );
};

export default OrderSummary;