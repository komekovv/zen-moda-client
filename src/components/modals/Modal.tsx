'use client';

import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
    footer?: React.ReactNode;
    closeOnClickOutside?: boolean;
}

interface StandardModalProps extends BaseModalProps {
    type?: 'standard';
    icon?: never;
    iconBgColor?: never;
}

interface IconModalProps extends BaseModalProps {
    type: 'icon';
    icon: React.ReactNode;
    iconBgColor?: string;
}

type ModalProps = StandardModalProps | IconModalProps;

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         title,
                                         children,
                                         size = 'md',
                                         footer,
                                         closeOnClickOutside = true,
                                         type = 'standard',
                                         ...iconProps
                                     }) => {
    const sizeClasses: Record<BaseModalProps['size'], string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'max-w-full'
    };

    const handleClose = () => {
        if (closeOnClickOutside) {
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnClickOutside) {
            return;
        } else {
            e.stopPropagation();
        }
    };

    // Get icon props if type is 'icon'
    const { icon, iconBgColor } = type === 'icon' ? iconProps as IconModalProps : { icon: null, iconBgColor: undefined };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50 font-rubik"
                onClose={handleClose}
                static={!closeOnClickOutside}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div
                        className={`flex min-h-full items-center justify-center p-4 text-center bg-[#0000005C] font-sans ${
                            type === 'icon' ? 'pt-12' : ''
                        }`}
                        onClick={closeOnClickOutside ? undefined : handleBackdropClick}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={`relative ${sizeClasses[size]} w-full`}>
                                {/* Icon positioned half outside modal - only for icon type */}
                                {type === 'icon' && icon && (
                                    <div
                                        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                                            iconBgColor || 'bg-primary'
                                        }`}
                                    >
                                        {icon}
                                    </div>
                                )}

                                <Dialog.Panel
                                    className={`w-full transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className={`flex justify-end ${type === 'icon' ? 'pb-2' : 'pb-2'}`}>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </div>

                                    <Dialog.Title
                                        as="div"
                                        className="text-center"
                                    >
                                        <h3 className="text-lg font-bold leading-6 text-black">
                                            {title}
                                        </h3>
                                    </Dialog.Title>

                                    <div className="mt-4">
                                        {children}
                                    </div>

                                    {footer && (
                                        <div className="mt-6 flex justify-end space-x-2 border-t border-gray-200 pt-4">
                                            {footer}
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;