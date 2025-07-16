'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/modals/Modal';
import { useModal } from '@/contexts/modal-context';

interface AddAddressModalProps {
  onAddressAdd?: (address: any) => void;
}

// Global instance for use with modal context
let globalOnAddressAdd: ((address: any) => void) | null = null;

export const setGlobalAddressHandler = (handler: (address: any) => void) => {
  globalOnAddressAdd = handler;
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({ onAddressAdd }) => {
  const t = useTranslations('address');
  const { isModalOpen, closeModal } = useModal();
  const [formData, setFormData] = useState({
    label: '',
    phone: '+993 65 646362',
    region: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = isModalOpen('addAddress');

  const handleClose = () => {
    closeModal('addAddress');
    // Reset form when modal closes
    setFormData({
      label: '',
      phone: '+993 65 646362',
      region: '',
      address: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Create the address object
      const newAddress = {
        id: Date.now().toString(), // Temporary ID generation
        label: formData.label,
        phone: formData.phone,
        fullAddress: `${formData.address}, ${formData.region}`,
        region: formData.region,
        address: formData.address,
        isDefault: false
      };

      // Call the onAddressAdd callback if provided, or use global handler
      const handler = onAddressAdd || globalOnAddressAdd;
      if (handler) {
        handler(newAddress);
      }

      // Close modal and reset form
      handleClose();
    } catch (error) {
      console.error('Error adding address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.label && formData.phone && formData.region && formData.address;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adress goşmak"
      size="md"
      closeOnClickOutside={true}
    >
      <div className="space-y-4 w-72">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <input
            type="text"
            placeholder="Adresiňizi atlandyryň #Öý"
            value={formData.label}
            onChange={(e) => handleInputChange('label', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-sm text-blue-500 font-medium mb-2 block">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        <div>
          <select
            value={formData.region}
            onChange={(e) => handleInputChange('region', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
          >
            <option value="" disabled>Raýonyňyz</option>
            <option value="Aşgabat">Aşgabat</option>
            <option value="Balkan">Balkan</option>
            <option value="Daşoguz">Daşoguz</option>
            <option value="Lebap">Lebap</option>
            <option value="Mary">Mary</option>
            <option value="Turkmenbashi">Turkmenbashi</option>
          </select>
        </div>

        <div>
          <textarea
            placeholder="Adress bellän"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isFormValid && !isLoading
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Goşulýar...' : 'Tassykla'}
        </button>
      </div>
    </Modal>
  );
};

export default AddAddressModal;