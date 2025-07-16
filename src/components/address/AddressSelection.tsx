'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useModal } from '@/contexts/modal-context';
import {Check, MapPin} from "lucide-react";
import Modal from "@/components/modals/Modal";

interface Address {
  id: string;
  label: string;
  phone: string;
  fullAddress: string;
  isDefault?: boolean;
}

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId?: string;
  onAddressSelect: (addressId: string) => void;
  className?: string;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({
                                                             addresses,
                                                             selectedAddressId,
                                                             onAddressSelect,
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

  const handleEdit = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);
    // Add edit functionality here
    console.log('Edit address:', addressId);
  };

  const handleRemove = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);
    // Add remove functionality here
    console.log('Remove address:', addressId);
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
            Adres Saýlaň
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
                          : 'border-border bg-white'
                  }`}
                  onClick={() => onAddressSelect(address.id)}
              >
                {/* Selection Indicator */}
                <div className="absolute top-0 left-0 p-1 bg-white rounded-tl-lg rounded-br-lg">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAddressId === address.id
                          ? 'border-primary bg-primary'
                          : 'border-border'
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
                          selectedAddressId === address.id ? 'text-white' : 'text-black'
                      }`}
                      size={30}
                    />
                  </div>
                  <span className={`font-bold block mb-3 ${
                          selectedAddressId === address.id ? 'text-white' : 'text-gray-900'
                        }`}
                  >
                    {address.label}
                  </span>

                  {/* Phone */}
                  <div className={`text-sm mb-2 ${
                      selectedAddressId === address.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {address.phone}
                  </div>

                  {/* Full Address */}
                  <div className={`text-sm ${
                      selectedAddressId === address.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {address.fullAddress}
                  </div>
                </div>

                {/* Options Menu */}
                <div className="absolute top-3 right-3">
                  <button
                      className={`${
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
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={(e) => handleEdit(address.id, e)}
                        >
                          Edit
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 transition-colors"
                            onClick={(e) => handleRemove(address.id, e)}
                        >
                          Remove
                        </button>
                      </div>
                  )}
                </div>
              </div>
          ))}

          {/* Add New Address Card */}
          <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors duration-200 flex flex-col items-center justify-center min-h-[140px]"
              onClick={handleAddNewAddress}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-gray-500 text-sm font-medium">Täze adres goş</span>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Töleg görnüşi
          </h3>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                  type="radio"
                  name="payment"
                  value="cash"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">Nagt töleg</span>
            </label>
            {/* Add other payment methods here if needed */}
          </div>
        </div>
      </div>
  );
};

export default AddressSelection;