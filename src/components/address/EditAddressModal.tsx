'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '@/components/modals/Modal';
import { useModal } from '@/contexts/modal-context';
import { usePutUserLocationMutation } from '@/hooks/useAddress';
import { LocationResponse, LocationCreateRequest } from '@/api/queryTypes/Location';
import { MapPin, User, Phone, Map, Edit3, AlertCircle } from 'lucide-react';

interface EditAddressModalProps {
    address: LocationResponse | null;
    onAddressUpdate?: (address: LocationResponse) => void;
}

// Global instance for use with modal context
let globalEditAddress: LocationResponse | null = null;
let globalOnAddressUpdate: ((address: LocationResponse) => void) | null = null;

export const setGlobalEditAddressHandler = (
    address: LocationResponse | null,
    handler?: (address: LocationResponse) => void
) => {
    globalEditAddress = address;
    if (handler) {
        globalOnAddressUpdate = handler;
    }
};

// Zod schema for form validation
const addressSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone_number: z.string().min(8, 'Phone number must be at least 8 characters'),
    district: z.string().min(1, 'District is required'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
});

type AddressFormData = z.infer<typeof addressSchema>;

const EditAddressModal: React.FC<EditAddressModalProps> = ({ address, onAddressUpdate }) => {
    const t = useTranslations('address');
    const { isModalOpen, closeModal } = useModal();
    const putLocationMutation = usePutUserLocationMutation();

    // Use passed address or global address
    const currentAddress = address || globalEditAddress;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid }
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: '',
            phone_number: '',
            district: '',
            address: ''
        },
        mode: 'onChange'
    });

    const isOpen = isModalOpen('editAddress');

    // Update form data when address changes or modal opens
    useEffect(() => {
        if (currentAddress && isOpen) {
            setValue('name', currentAddress.name);
            setValue('phone_number', currentAddress.phone_number);
            setValue('district', currentAddress.district);
            setValue('address', currentAddress.address);
        }
    }, [currentAddress, isOpen, setValue]);

    const handleClose = () => {
        closeModal('editAddress');
        reset();
    };

    const onSubmit = async (data: AddressFormData) => {
        if (!currentAddress) return;

        try {
            // Call the API to update the address
            const updatedAddress = await putLocationMutation.mutateAsync({
                id: currentAddress.id,
                data: data
            });

            // Call the onAddressUpdate callback if provided, or use global handler
            const handler = onAddressUpdate || globalOnAddressUpdate;
            if (handler) {
                handler(updatedAddress);
            }

            // Close modal and reset form
            handleClose();
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    // Define regions array for mapping
    const regions = [
        { value: 'ashgabat', key: 'regions.ashgabat' },
        { value: 'balkan', key: 'regions.balkan' },
        { value: 'dashoguz', key: 'regions.dashoguz' },
        { value: 'lebap', key: 'regions.lebap' },
        { value: 'mary', key: 'regions.mary' },
        { value: 'turkmenbashi', key: 'regions.turkmenbashi' }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title=""
            size="md"
            closeOnClickOutside={false}
        >
            <div className="space-y-6 w-full">
                {/* Header with Icon */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Edit3 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-h3-mobile sm:text-h3 text-black mb-2">
                        {t('edit_address')}
                    </h2>
                    <p className="text-body-description-mobile sm:text-body-description text-passive">
                        {t('update_address_details')}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="flex items-center text-body-description font-medium text-black mb-2">
                            <User className="w-4 h-4 mr-2 text-passive" />
                            {t('address_label')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('address_label_placeholder')}
                            {...register('name')}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 placeholder-passive text-body-description-mobile sm:text-body-description ${
                                errors.name ? 'border-sale bg-red-50' : 'border-border'
                            }`}
                        />
                        {errors.name && (
                            <div className="flex items-center mt-1 text-sale text-small">
                                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="flex items-center text-body-description font-medium text-black mb-2">
                            <Phone className="w-4 h-4 mr-2 text-passive" />
                            {t('phone')}
                        </label>
                        <input
                            type="tel"
                            {...register('phone_number')}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-body-description-mobile sm:text-body-description ${
                                errors.phone_number ? 'border-sale bg-red-50' : 'border-border'
                            }`}
                        />
                        {errors.phone_number && (
                            <div className="flex items-center mt-1 text-sale text-small">
                                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {errors.phone_number.message}
                            </div>
                        )}
                    </div>

                    {/* Region Field */}
                    <div>
                        <label className="flex items-center text-body-description font-medium text-black mb-2">
                            <Map className="w-4 h-4 mr-2 text-passive" />
                            {t('region')}
                        </label>
                        <select
                            {...register('district')}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 appearance-none bg-white text-body-description-mobile sm:text-body-description ${
                                errors.district ? 'border-sale bg-red-50' : 'border-border'
                            }`}
                        >
                            <option value="" className="text-passive">{t('select_region')}</option>
                            {regions.map((region) => (
                                <option key={region.value} value={region.value} className="text-black">
                                    {t(region.key)}
                                </option>
                            ))}
                        </select>
                        {errors.district && (
                            <div className="flex items-center mt-1 text-sale text-small">
                                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {errors.district.message}
                            </div>
                        )}
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="flex items-center text-body-description font-medium text-black mb-2">
                            <MapPin className="w-4 h-4 mr-2 text-passive" />
                            {t('address_details')}
                        </label>
                        <textarea
                            placeholder={t('address_details_placeholder')}
                            {...register('address')}
                            rows={3}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 placeholder-passive resize-none text-body-description-mobile sm:text-body-description ${
                                errors.address ? 'border-sale bg-red-50' : 'border-border'
                            }`}
                        />
                        {errors.address && (
                            <div className="flex items-center mt-1 text-sale text-small">
                                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {errors.address.message}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={putLocationMutation.isPending}
                            className="flex-1 py-2 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-tab text-accent-2 hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed text-body-description-mobile sm:text-body-description"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || putLocationMutation.isPending}
                            className={`flex-1 py-2 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-body-description-mobile sm:text-body-description ${
                                isValid && !putLocationMutation.isPending
                                    ? 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg'
                                    : 'bg-passive text-white cursor-not-allowed'
                            }`}
                        >
                            {putLocationMutation.isPending ? (
                                <>
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t('updating')}
                                </>
                            ) : (
                                <>
                                    <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                                    {t('update_address')}
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {putLocationMutation.isError && (
                    <div className="bg-red-50 border border-sale rounded-lg p-3 sm:p-4 flex items-center">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sale mr-2 sm:mr-3 flex-shrink-0" />
                        <div>
                            <h4 className="text-sale font-medium text-body-description-mobile sm:text-body-description">{t('update_failed')}</h4>
                            <p className="text-sale text-small mt-1">{t('try_again_later')}</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EditAddressModal;