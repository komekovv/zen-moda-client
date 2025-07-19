'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/modals/Modal';
import { useModal } from '@/contexts/modal-context';
import { useDeleteUserLocationMutation } from '@/hooks/useAddress';
import { LocationResponse } from '@/api/queryTypes/Location';
import { Trash2, AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
    address: LocationResponse | null;
    onAddressDelete?: (addressId: string) => void;
}

// Global instance for use with modal context
let globalDeleteAddress: LocationResponse | null = null;
let globalOnAddressDelete: ((addressId: string) => void) | null = null;

export const setGlobalDeleteAddressHandler = (
    address: LocationResponse | null,
    handler?: (addressId: string) => void
) => {
    globalDeleteAddress = address;
    if (handler) {
        globalOnAddressDelete = handler;
    }
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ address, onAddressDelete }) => {
    const t = useTranslations('address');
    const { isModalOpen, closeModal } = useModal();
    const deleteLocationMutation = useDeleteUserLocationMutation();

    // Use passed address or global address
    const currentAddress = address || globalDeleteAddress;

    const isOpen = isModalOpen('confirmDelete');

    const handleClose = () => {
        closeModal('confirmDelete');
    };

    const handleConfirmDelete = async () => {
        if (!currentAddress) return;

        try {
            // Call the API to delete the address
            await deleteLocationMutation.mutateAsync(currentAddress.id);

            // Call the onAddressDelete callback if provided, or use global handler
            const handler = onAddressDelete || globalOnAddressDelete;
            if (handler) {
                handler(currentAddress.id);
            }

            // Close modal
            handleClose();
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title=""
            size="sm"
            closeOnClickOutside={false}
        >
            <div className="space-y-6 w-80">
                {/* Warning Icon */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {t('delete_address')}
                    </h2>
                    <p className="text-gray-600">
                        {t('are_you_sure_delete')}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        disabled={deleteLocationMutation.isPending}
                        className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('cancel')}
                    </button>

                    <button
                        onClick={handleConfirmDelete}
                        disabled={deleteLocationMutation.isPending}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            !deleteLocationMutation.isPending
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {deleteLocationMutation.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {t('deleting')}
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                {t('delete')}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;