'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModal } from '@/contexts/modal-context';
import { useClientAuth } from '@/contexts/auth-provider';
import Modal from "@/components/modals/Modal";
import Input from "@/components/ui/Input";
import {
    useLoginMutation,
    useVerifyOTPMutation,
    useUpdateProfileMutation,
    useResendLoginSMSMutation
} from '@/hooks/useAuth';
import {GenderType} from "@/api/queryTypes/User";

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

const LoginModal: React.FC<LoginModalProps> = ({ onSuccess, onError, closeOnClickOutside = false }) => {
    const { isModalOpen, closeModal, getModalProps } = useModal();
    const { setAuthData } = useClientAuth();
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

    // React Query mutations
    const loginMutation = useLoginMutation({
        onSuccess: (data) => {
            if (data.success) {
                setPhoneNumber(phoneForm.getValues('phone'));
                setStep('verification');
                setCountdown(60);
                setErrorMessage('');
            } else {
                throw new Error(data.message || 'SMS ugradylmady');
            }
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || error.message || 'SMS ugratmakda näsazlyk';
            setErrorMessage(errorMsg);
            (modalProps?.onError || onError)?.(errorMsg);
        }
    });

    const verifyOTPMutation = useVerifyOTPMutation({
        onSuccess: async (data) => {
            const { access_token, refresh_token, user, userAlreadyExist } = data;

            console.log(userAlreadyExist)

            if (userAlreadyExist === false) {
                setStep('profile');
            } else if (user && user.id) {

                if (!access_token || !refresh_token) {
                    throw new Error('Nädogry jogap');
                }

                setTokens({ access_token, refresh_token });

                await completeLogin(user, access_token, refresh_token);
            } else {
                setStep('profile');
            }
            setErrorMessage('');
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || error.message || 'Tassyklama kody nädogry';
            setErrorMessage(errorMsg);
            (modalProps?.onError || onError)?.(errorMsg);
        }
    });

    const updateProfileMutation = useUpdateProfileMutation({
        onSuccess: async (data) => {
            const updatedUser = data.user;

            if (!updatedUser || !tokens) {
                throw new Error('Profil täzelenmedi');
            }

            await completeLogin(updatedUser, tokens.access_token, tokens.refresh_token);
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || error.message || 'Profil döretmekde näsazlyk';
            setErrorMessage(errorMsg);
            (modalProps?.onError || onError)?.(errorMsg);
        }
    });

    const resendSMSMutation = useResendLoginSMSMutation({
        onSuccess: () => {
            setCountdown(60);
            setErrorMessage('');
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || error.message || 'SMS täzeden ugradylmady';
            setErrorMessage(errorMsg);
        }
    });

    // Countdown timer
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
        setErrorMessage('');
        loginMutation.mutate({ phone: data.phone });
    };

    const onVerificationSubmit = async (data: VerificationFormData) => {
        setErrorMessage('');
        verifyOTPMutation.mutate({
            phone_number: phoneNumber,
            code: data.code
        });
    };

    const onProfileSubmit = async (data: ProfileFormData) => {
        setErrorMessage('');
        updateProfileMutation.mutate({
            fullname: data.fullname,
            gender: data.gender as GenderType
        });
    };

    const completeLogin = async (user: any, accessToken: string, refreshToken: string) => {
        setAuthData(user, accessToken, refreshToken);

        if (modalProps?.onSuccess || onSuccess) {
            (modalProps?.onSuccess || onSuccess)?.({ user, tokens: { accessToken, refreshToken } });
        }

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
        setErrorMessage('');
        resendSMSMutation.mutate(phoneNumber);
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
                        <p className="text-sm text-black text-center px-4 sm:px-8 font-medium">
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
                                disabled={loginMutation.isPending}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loginMutation.isPending ? 'Ugradylýar...' : 'Tassykla'}
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

                            <input {...verificationForm.register('code')} type="hidden" />

                            {verificationForm.formState.errors.code && (
                                <p className="text-sm text-red-600 text-center">
                                    {verificationForm.formState.errors.code.message}
                                </p>
                            )}

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={resendCode}
                                    disabled={countdown > 0 || resendSMSMutation.isPending}
                                    className="text-sm text-blue-600 hover:text-blue-700 underline disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    {resendSMSMutation.isPending ? 'Ugradylýar...' : 'Kod gelmedi?'}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={verifyOTPMutation.isPending}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {verifyOTPMutation.isPending ? 'Tassyklanýar...' : 'Tassykla'}
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
                                    <p className="mt-1 text-sm text-red-600">
                                        {profileForm.formState.errors.gender.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {updateProfileMutation.isPending ? 'Döredilýär...' : 'Tassykla'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default LoginModal;