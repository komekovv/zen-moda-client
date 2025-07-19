'use client'
import React, { useState } from 'react';
import { HelpCircle, User, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useProductQuestions, usePostQuestionMutation } from "@/hooks/useProduct";
import { useQueryClient } from '@tanstack/react-query';
import QuestionsModal from './QuestionsModal';

interface AskQuestionProps {
    productId: string;
    productInfo: {
        image: string;
        brand: string;
        name: string;
    };
}

const AskQuestion: React.FC<AskQuestionProps> = ({
                                                     productId,
                                                     productInfo
                                                 }) => {
    const t = useTranslations('product_detail');
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [showQuestionsModal, setShowQuestionsModal] = useState(false);
    const queryClient = useQueryClient();

    // Fetch only 5 questions for the preview
    const {
        data: questionsData,
        isLoading,
        error
    } = useProductQuestions(productId, 1, 5);

    const postQuestionMutation = usePostQuestionMutation(productId, {
        onSuccess: () => {
            // Invalidate and refetch questions
            queryClient.invalidateQueries({ queryKey: ['product_questions', productId] });
            setNewQuestion('');
            setShowAskForm(false);
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

    const handleViewAll = () => {
        setShowQuestionsModal(true);
    };

    return (
        <>
            <div className="bg-white border-t border-border py-6 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h3-mobile md:text-h3 text-black">{t('questions.title')}</h2>
                    <button
                        className="text-[#A0A3BD] text-sm hover:text-[#0762C8] transition-colors"
                        onClick={handleViewAll}
                    >
                        {t('questions.view_all')} ({questionsData?.totalCount ? questionsData?.totalCount : 0})
                    </button>
                </div>

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
                    <div className="bg-[#F8F9FA] border border-border rounded-lg p-4 mb-6">
                        <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder={t('questions.placeholder')}
                            className="w-full p-3 border border-border rounded-lg resize-none h-24 focus:outline-none focus:border-[#0762C8]"
                            disabled={postQuestionMutation.isPending}
                            maxLength={500}
                        />

                        {/* Character count */}
                        <div className="text-right text-xs text-[#A0A3BD] mt-1">
                            {newQuestion.length}/500
                        </div>

                        {/* Error message */}
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

                {/* Questions List - Show only first 5 */}
                <div className="space-y-6">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0762C8]" />
                            <div className="text-[#A0A3BD]">{t('loading')}</div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="text-red-500">{t('error')}</div>
                        </div>
                    ) : questionsData?.data && questionsData.data.length > 0 ? (
                        questionsData.data.map((question) => (
                            <div key={question.id} className="border border-[#E5E5E5] rounded-lg p-3">
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
                        ))
                    ) : (
                        <div className="text-center py-8 text-[#A0A3BD]">
                            {t('questions.no_questions')}
                        </div>
                    )}
                </div>
            </div>

            {/* Questions Modal */}
            <QuestionsModal
                isOpen={showQuestionsModal}
                onClose={() => setShowQuestionsModal(false)}
                productId={productId}
                productInfo={productInfo}
            />
        </>
    );
};

export default AskQuestion;