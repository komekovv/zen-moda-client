'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useModal } from '@/contexts/modal-context';
import { MapPin } from "lucide-react";
import { LocationResponse } from "@/api/queryTypes/Location";
import { setGlobalEditAddressHandler } from './EditAddressModal';
import { setGlobalDeleteAddressHandler } from './ConfirmDeleteModal';

interface AddressSelectionProps {
  addresses: LocationResponse[];
  selectedAddressId?: string;
  onAddressSelect: (addressId: string) => void;
  onAddressUpdate?: (address: LocationResponse) => void;
  onAddressDelete?: (addressId: string) => void;
  className?: string;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({
                                                             addresses,
                                                             selectedAddressId,
                                                             onAddressSelect,
                                                             onAddressUpdate,
                                                             onAddressDelete,
                                                             className = ''
                                                           }) => {
  const t = useTranslations('address');
  const { openModal } = useModal();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAddNewAddress = () => {
    openModal('addAddress');
  };

  const handleMenuToggle = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === addressId ? null : addressId);
  };

  const handleEdit = (address: LocationResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);

    // Set the global handlers for the edit modal
    setGlobalEditAddressHandler(address, onAddressUpdate);
    openModal('editAddress');
  };

  const handleRemove = (address: LocationResponse, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);

    // Set the global handlers for the delete modal
    setGlobalDeleteAddressHandler(address, onAddressDelete);
    openModal('confirmDelete');
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };

    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  return (
      <div className={`bg-white border p-5 rounded-lg ${className}`}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('select_address')}
          </h2>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Existing Addresses */}
          {addresses.map((address) => (
              <div
                  key={address.id}
                  className={`h-64 relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedAddressId === address.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-white hover:border-gray-300'
                  }`}
                  onClick={() => onAddressSelect(address.id)}
              >
                {/* Selection Indicator */}
                <div className="absolute top-0 left-0 p-1 bg-white rounded-tl-lg rounded-br-lg">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAddressId === address.id
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                  }`}>
                    {selectedAddressId === address.id && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                  </div>
                </div>

                {/* Address Content */}
                <div className="mt-8">
                  {/* Location Icon and Label */}
                  <div className="mb-3">
                    <MapPin
                        className={`${
                            selectedAddressId === address.id ? 'text-white' : 'text-blue-500'
                        }`}
                        size={30}
                    />
                  </div>

                  <span className={`font-bold block mb-3 text-base ${
                      selectedAddressId === address.id ? 'text-white' : 'text-gray-900'
                  }`}>
                {address.name}
              </span>

                  {/* Phone */}
                  <div className={`text-sm mb-2 ${
                      selectedAddressId === address.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {address.phone_number}
                  </div>

                  {/* Full Address */}
                  <div className={`text-sm line-clamp-3 ${
                      selectedAddressId === address.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {address.address}
                    {address.district && `, ${address.district}`}
                  </div>
                </div>

                {/* Options Menu */}
                <div className="absolute top-3 right-3">
                  <button
                      className={`p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors ${
                          selectedAddressId === address.id ? 'text-white hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      onClick={(e) => handleMenuToggle(address.id, e)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === address.id && (
                      <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            onClick={(e) => handleEdit(address, e)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          {t('actions.edit')}
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            onClick={(e) => handleRemove(address, e)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          {t('actions.remove')}
                        </button>
                      </div>
                  )}
                </div>
              </div>
          ))}

          {/* Add New Address Card */}
          <div
              className="h-64 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex flex-col items-center justify-center group"
              onClick={handleAddNewAddress}
          >
            <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-200">
              <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-gray-500 group-hover:text-blue-600 text-sm font-medium transition-colors duration-200">
            {t('add_new_address')}
          </span>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t('payment_method')}
          </h3>

          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input
                  type="radio"
                  name="payment"
                  value="cash"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="ml-3 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-medium">{t('cash_payment')}</span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
  );
};

export default AddressSelection;