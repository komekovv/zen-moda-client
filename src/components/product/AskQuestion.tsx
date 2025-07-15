'use client'
import React, { useState } from 'react';
import { HelpCircle, User, Loader2 } from 'lucide-react';
import { ProductQuestionResponse } from "@/api/queryTypes/ProductQuestion";
import { ListResponse } from "@/api/queryTypes/Common";
import { usePostQuestionMutation } from "@/hooks/useProduct";
import { useQueryClient } from '@tanstack/react-query';

interface AskQuestionProps {
    productId: string;
    questions: ListResponse<ProductQuestionResponse>;
    error?: any;
    loading?: boolean;
    onViewAll?: () => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({
    productId,
    questions,
    onViewAll
}) => {
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const queryClient = useQueryClient();

    const postQuestionMutation = usePostQuestionMutation(productId, {
        onSuccess: () => {
            // Invalidate and refetch questions
            queryClient.invalidateQueries({ queryKey: ['product_questions', productId] });
            setNewQuestion('');
            setShowAskForm(false);
        },
        onError: (error) => {
            console.error('Error posting question:', error);
            // You can add a toast notification here if you have a toast system
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
        // Reset mutation state if needed
        if (postQuestionMutation.isError) {
            postQuestionMutation.reset();
        }
    };

    return (
        <div className="bg-white border-t border-border py-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3-mobile md:text-h3 text-black">Dükan bilen sorag jogap</h2>
                <button
                    className="text-[#A0A3BD] text-sm"
                    onClick={onViewAll}
                >
                    Hemmesini gör ({questions?.totalCount ? questions?.totalCount : 0})
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
                            Eger-de haryt barada soragyňyz bolsa onda "Sorag ber" duwmesini basyň
                        </span>
                    </div>
                    <button
                        className="bg-[#0762C8] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0651A8] transition-colors"
                        onClick={() => setShowAskForm(true)}
                    >
                        Sorag ber
                    </button>
                </div>
            ) : (
                <div className="bg-[#F8F9FA] border border-border rounded-lg p-4 mb-6">
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Soragyňyzy ýazyň..."
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
                            Sorag ugratmakda näsazlyk ýüze çykdy. Gaýtadan synanyşyň.
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
                            {postQuestionMutation.isPending ? 'Ugradylýar...' : 'Ugrat'}
                        </button>
                        <button
                            onClick={handleCancelQuestion}
                            disabled={postQuestionMutation.isPending}
                            className="bg-[#E5E5E5] text-[#161616] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D5D5D5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Ýatyr
                        </button>
                    </div>
                </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
                {questions?.data?.length > 0 ? (
                    questions.data.map((question) => (
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
                                        Heniz jogap berilmedi
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-[#A0A3BD]">
                        Heniz sorag berilmedi
                    </div>
                )}
            </div>
        </div>
    );
};

export default AskQuestion;