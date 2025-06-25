'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useModal } from '@/contexts/modal-context';
import Modal from "@/components/modals/Modal";
import Input from "@/components/ui/Input";

const phoneSchema = z.object({
    phone: z
        .string()
        .min(1, 'Telefon belgisi hökman')
        .regex(/^[0-9]{8}$/, 'Nädogry telefon belgisi. 8 san girizmeli')
        .transform((val) => {
            // Remove any non-digits and take last 8 digits
            const cleaned = val.replace(/\D/g, '');
            return cleaned.slice(-8);
        })
});

const verificationSchema = z.object({
    code: z
        .string()
        .min(4, 'Tassyklama kody azyndan 4 san bolmaly')
        .max(6, 'Tassyklama kody köp bolsa 6 san bolmaly')
        .regex(/^[0-9]+$/, 'Diňe sanlar girizmeli')
});

const profileSchema = z.object({
    fullname: z
        .string()
        .min(2, 'Adyňyz azyndan 2 harp bolmaly')
        .max(50, 'Adyňyz köp bolsa 50 harp bolmaly'),
    gender: z.enum(['male', 'female'], {
        required_error: 'Jynsyňyzy saýlaň'
    })
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
type ProfileFormData = z.infer<typeof profileSchema>;

interface LoginModalProps {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
    closeOnClickOutside?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSuccess, onError ,closeOnClickOutside = false}) => {
    const { isModalOpen, closeModal, getModalProps } = useModal();
    const modalProps = getModalProps('login') as LoginModalProps;

    const [step, setStep] = useState<'phone' | 'verification' | 'profile'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tokens, setTokens] = useState<{ access_token: string; refresh_token: string } | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(0);

    // Phone form
    const phoneForm = useForm<PhoneFormData>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: ''
        }
    });

    // Verification form
    const verificationForm = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema)
    });

    // Profile form
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema)
    });

    // Countdown timer for resend
    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [countdown]);

    const onPhoneSubmit = async (data: PhoneFormData) => {
        try {
            setErrorMessage('');

            const response = await axios.post('https://zen-moda.com/api/auth/login', {
                phone: data.phone
            });

            if (response.data.success) {
                setPhoneNumber(data.phone);
                setStep('verification');
                setCountdown(60); // 60 second countdown for resend
            } else {
                throw new Error(response.data.message || 'SMS ugradylmady');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'SMS ugratmakda näsazlyk';
            setErrorMessage(errorMessage);
            if (modalProps?.onError || onError) {
                (modalProps?.onError || onError)?.(errorMessage);
            }
        }
    };

    const onVerificationSubmit = async (data: VerificationFormData) => {
        try {
            setErrorMessage('');

            const response = await axios.post('https://zen-moda.com/api/auth/confirm-otp', {
                phone_number: phoneNumber,
                code: data.code
            });

            const { access_token, refresh_token, user } = response.data;

            if (!access_token || !refresh_token) {
                throw new Error('Nädogry jogap');
            }

            setTokens({ access_token, refresh_token });

            // Check if user exists (not null) - existing user
            if (user && user.id) {
                // Complete login for existing user
                await completeLogin(user, access_token, refresh_token);
            } else {
                // New user needs to complete profile
                setStep('profile');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Tassyklama kody nädogry';
            setErrorMessage(errorMessage);
            if (modalProps?.onError || onError) {
                (modalProps?.onError || onError)?.(errorMessage);
            }
        }
    };

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            setErrorMessage('');

            if (!tokens) {
                throw new Error('Sessiýa tanyş däl');
            }

            const response = await axios.post('https://zen-moda.com/api/auth/update-profile', {
                fullname: data.fullname,
                gender: data.gender
            }, {
                headers: {
                    'Authorization': `Bearer ${tokens.access_token}`
                }
            });

            const updatedUser = response.data.user;

            if (!updatedUser) {
                throw new Error('Profil täzelenmedi');
            }

            // Complete login with updated user data
            await completeLogin(updatedUser, tokens.access_token, tokens.refresh_token);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Profil döretmekde näsazlyk';
            setErrorMessage(errorMessage);
            if (modalProps?.onError || onError) {
                (modalProps?.onError || onError)?.(errorMessage);
            }
        }
    };

    const completeLogin = async (user: any, accessToken: string, refreshToken: string) => {
        // Store tokens and user data
        localStorage.setItem('client_auth_token', accessToken);
        localStorage.setItem('client_refresh_token', refreshToken);
        localStorage.setItem('client_auth_user', JSON.stringify(user));

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Call success callback
        if (modalProps?.onSuccess || onSuccess) {
            (modalProps?.onSuccess || onSuccess)?.({ user, tokens: { accessToken, refreshToken } });
        }

        // Close modal and reset
        handleClose();
    };

    const handleClose = () => {
        closeModal('login');
        setStep('phone');
        setPhoneNumber('');
        setTokens(null);
        setErrorMessage('');
        setCountdown(0);
        phoneForm.reset();
        verificationForm.reset();
        profileForm.reset();
    };

    const handleBackToPhone = () => {
        setStep('phone');
        setErrorMessage('');
        verificationForm.reset();
    };

    const resendCode = async () => {
        try {
            setErrorMessage('');
            await axios.post('https://zen-moda.com/api/auth/login', {
                phone: phoneNumber
            });
            setCountdown(60);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'SMS täzeden ugradylmady');
        }
    };

    const getStepTitle = () => {
        switch (step) {
            case 'phone':
                return 'Hoş geldiňiz';
            case 'verification':
                return 'Tassyklaýjy kod';
            case 'profile':
                return 'Agza bol';
            default:
                return 'Hoş geldiňiz';
        }
    };

    const shouldCloseOnClickOutside = modalProps?.closeOnClickOutside ?? closeOnClickOutside;

    return (
        <Modal
            isOpen={isModalOpen('login')}
            onClose={handleClose}
            title={getStepTitle()}
            size="sm"
            closeOnClickOutside={shouldCloseOnClickOutside}
        >
            <div className="space-y-4 font-rubik">
                {step === 'phone' && (
                    <>
                        <p className="text-sm text-black text-center px-4 sm:px-8 font-medium ">
                            Tassyklaýjy kody almak üçin telefon belgiňizi giriziň
                        </p>

                        {errorMessage && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-8">
                            <Input
                                {...phoneForm.register('phone')}
                                type="tel"
                                label="Telefon"
                                prefix="+993"
                                maxLength={8}
                                error={phoneForm.formState.errors.phone?.message}
                            />

                            <div className="flex items-start space-x-2 justify-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="text-xs text-gray-600 leading-4">
                                    <span className="text-blue-600 hover:text-blue-700 cursor-pointer underline">Ulanyş kadalaryny </span>
                                    kabul edyarin
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={phoneForm.formState.isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {phoneForm.formState.isSubmitting ? 'Ugradylýar...' : 'Tassykla'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'verification' && (
                    <>
                        <div className="text-center">
                            <p className="text-sm text-black mb-2">
                                Telefon belgiňize baran sms kodynyň ýazyň we programmanyň mümkinçiliklerii ulanyň
                            </p>
                            {countdown > 0 && (
                                <p className="text-sm text-red-500 font-mono">
                                    0:{countdown.toString().padStart(2, '0')}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={handleBackToPhone}
                                className="text-xs text-blue-600 hover:text-blue-700 underline mt-2"
                            >
                            Telefon belgiňizi üýtgetmek
                            </button>
                        </div>

                        {errorMessage && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
                            <div className="flex justify-center space-x-2">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value && /^\d$/.test(value)) {
                                                const nextInput = e.target.nextElementSibling as HTMLInputElement;
                                                if (nextInput) nextInput.focus();
                                            }

                                            // Update form value
                                            const allInputs = Array.from(e.target.parentElement!.children) as HTMLInputElement[];
                                            const code = allInputs.map(input => input.value).join('');
                                            verificationForm.setValue('code', code);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !e.currentTarget.value) {
                                                const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                if (prevInput) {
                                                    prevInput.focus();
                                                    prevInput.value = '';
                                                }
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            <input
                                {...verificationForm.register('code')}
                                type="hidden"
                            />

                            {verificationForm.formState.errors.code && (
                                <p className="text-sm text-red-600 text-center">{verificationForm.formState.errors.code.message}</p>
                            )}

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={resendCode}
                                    disabled={countdown > 0}
                                    className="text-sm text-blue-600 hover:text-blue-700 underline disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Kod gelmedi?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={verificationForm.formState.isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {verificationForm.formState.isSubmitting ? 'Tassyklanýar...' : 'Tassykla'}
                            </button>
                        </form>
                    </>
                )}

                {step === 'profile' && (
                    <>
                        <p className="text-sm text-black text-center">
                            Applikasiýanyň mümkinçiliklerinden peýdalanmak üçin aşakdaky maglumatläri dolduruň
                        </p>

                        {errorMessage && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                            <Input
                                {...profileForm.register('fullname')}
                                type="text"
                                label="Adyňyz familiýaňyz"
                                error={profileForm.formState.errors.fullname?.message}
                            />


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Jynsy
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            {...profileForm.register('gender')}
                                            type="radio"
                                            value="male"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Erkek</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            {...profileForm.register('gender')}
                                            type="radio"
                                            value="female"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Aýal</span>
                                    </label>
                                </div>
                                {profileForm.formState.errors.gender && (
                                    <p className="mt-1 text-sm text-red-600">{profileForm.formState.errors.gender.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={profileForm.formState.isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {profileForm.formState.isSubmitting ? 'Döredilýär...' : 'Tassykla'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </Modal>
    );
};export default LoginModal;