'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    openModal: (modalName: string, props?: any) => void;
    closeModal: (modalName: string) => void;
    isModalOpen: (modalName: string) => boolean;
    getModalProps: (modalName: string) => any;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalState {
    [modalName: string]: {
        isOpen: boolean;
        props?: any;
    };
}

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<ModalState>({});

    const openModal = (modalName: string, props?: any) => {
        setModals(prev => ({
            ...prev,
            [modalName]: { isOpen: true, props }
        }));
    };

    const closeModal = (modalName: string) => {
        setModals(prev => ({
            ...prev,
            [modalName]: { isOpen: false, props: undefined }
        }));
    };

    const isModalOpen = (modalName: string) => {
        return modals[modalName]?.isOpen || false;
    };

    const getModalProps = (modalName: string) => {
        return modals[modalName]?.props;
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, getModalProps }}>
            {children}
        </ModalContext.Provider>
    );
};