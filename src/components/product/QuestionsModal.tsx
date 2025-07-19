'use client'
import React, { useState } from 'react';
import { X, HelpCircle, User, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProductQuestionResponse } from "@/api/queryTypes/ProductQuestion";
import { ListResponse } from "@/api/queryTypes/Common";
import { useProductQuestions, usePostQuestionMutation } from "@/hooks/useProduct";
import { useQueryClient } from '@tanstack/react-query';

interface QuestionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    productInfo: {
        image: string;
        brand: string;
        name: string;
    };
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
                                                           isOpen,
                                                           onClose,
                                                           productId,
                                                           productInfo
                                                       }) => {
    const t = useTranslations('product_detail');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const queryClient = useQueryClient();

    const {
        data: questionsData,
        isLoading,
        error
    } = useProductQuestions(productId, currentPage, 10);

    const postQuestionMutation = usePostQuestionMutation(productId, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product_questions', productId] });
            setNewQuestion('');
            setShowAskForm(false);
            setCurrentPage(1); // Reset to first page to see new question
        },
        onError: (error) => {
            console.error('Error posting question:', error);
        }
    });

    const handleSubmitQuestion = () => {
        if (newQuestion.trim() && !postQuestionMutation.isPending) {
            postQuestionMutation.mutate({
                content: newQuestion.trim()
            });
        }
    };

    const handleCancelQuestion = () => {
        setNewQuestion('');
        setShowAskForm(false);
        if (postQuestionMutation.isError) {
            postQuestionMutation.reset();
        }
    };

    const totalPages = questionsData ? Math.ceil(questionsData.totalCount / 10) : 0;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
                    <h2 className="text-2xl font-bold text-[#161616]">
                        {t('questions.title')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-[#A0A3BD]" />
                    </button>
                </div>

                {/* Product Info */}
                <div className="p-6 border-b border-[#E5E5E5] bg-[#F8F9FA]">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-white rounded-lg border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
                            <img
                                src={productInfo.image}
                                alt={productInfo.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-[#0762C8] font-semibold mb-1">
                                {productInfo.brand}
                            </div>
                            <div className="text-[#161616] text-sm">
                                {productInfo.name}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {/* Ask Question Section */}
                    {!showAskForm ? (
                        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between bg-[#F8F9FA] border border-[#E5E5E5] rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FBA13A] rounded-full items-center justify-center hidden md:flex">
                                    <HelpCircle className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-[#161616]">
                                    {t('questions.ask_description')}
                                </span>
                            </div>
                            <button
                                className="bg-[#0762C8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0651A8] transition-colors"
                                onClick={() => setShowAskForm(true)}
                            >
                                {t('questions.ask_question')}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[#F8F9FA] border border-[#E5E5E5] rounded-lg p-4 mb-6">
                            <textarea
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder={t('questions.placeholder')}
                                className="w-full p-3 border border-[#E5E5E5] rounded-lg resize-none h-24 focus:outline-none focus:border-[#0762C8]"
                                disabled={postQuestionMutation.isPending}
                                maxLength={500}
                            />

                            <div className="text-right text-xs text-[#A0A3BD] mt-1">
                                {newQuestion.length}/500
                            </div>

                            {postQuestionMutation.isError && (
                                <div className="mt-2 text-sm text-red-600">
                                    {t('questions.error')}
                                </div>
                            )}

                            <div className="flex gap-3 mt-3">
                                <button
                                    onClick={handleSubmitQuestion}
                                    disabled={!newQuestion.trim() || postQuestionMutation.isPending}
                                    className="bg-[#0762C8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0651A8] disabled:bg-[#A0A3BD] disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                >
                                    {postQuestionMutation.isPending && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    {postQuestionMutation.isPending ? t('questions.submitting') : t('questions.submit_question')}
                                </button>
                                <button
                                    onClick={handleCancelQuestion}
                                    disabled={postQuestionMutation.isPending}
                                    className="bg-[#E5E5E5] text-[#161616] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D5D5D5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {t('questions.cancel')}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Questions List */}
                    {isLoading ? (
                        <div className="text-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#0762C8]" />
                            <div className="text-[#A0A3BD]">{t('loading')}</div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="text-red-500 mb-4">{t('error')}</div>
                        </div>
                    ) : questionsData?.data && questionsData.data.length > 0 ? (
                        <div className="space-y-6">
                            {questionsData.data.map((question) => (
                                <div key={question.id} className="border border-[#E5E5E5] rounded-lg p-4">
                                    {/* Question */}
                                    <div className="mb-4">
                                        <h3 className="text-[#161616] text-lg font-semibold mb-2">
                                            {question.question}
                                        </h3>
                                        <div className="text-[#A0A3BD] text-sm">
                                            {question.username} • {question.createdAt}
                                        </div>
                                    </div>

                                    {/* Answer */}
                                    {question.answer ? (
                                        <div className="bg-[#F8F9FA] rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-[#E5E5E5] rounded-full flex items-center justify-center">
                                                    {question.store.photo ? (
                                                        <img
                                                            src={question.store.photo}
                                                            alt={question.store.name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-4 h-4 text-[#A0A3BD]" />
                                                    )}
                                                </div>
                                                <span className="text-[#161616] font-medium">
                                                    {question.store.name}
                                                </span>
                                            </div>
                                            <p className="text-[#161616] leading-relaxed">
                                                {question.answer}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-[#F8F9FA] rounded-lg p-4">
                                            <div className="text-[#A0A3BD] text-sm italic">
                                                {t('questions.no_answer')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-[#A0A3BD]">
                            {t('questions.no_questions')}
                        </div>
                    )}

                    {/* Pagination */}
                    {questionsData && questionsData.totalCount > 10 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 border border-[#E5E5E5] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Page numbers */}
                            <div className="flex gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                currentPage === page
                                                    ? 'bg-[#0762C8] text-white'
                                                    : 'border border-[#E5E5E5] hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-[#E5E5E5] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsModal;