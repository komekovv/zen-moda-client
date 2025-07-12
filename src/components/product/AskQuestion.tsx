import React, { useState } from 'react';
import { HelpCircle, User } from 'lucide-react';

interface Question {
    id: string;
    question: string;
    author: string;
    date: string;
    answer?: {
        author: string;
        content: string;
        avatar?: string;
    };
}

interface AskQuestionProps {
    questions?: Question[];
    totalQuestions?: number;
    onAskQuestion?: (question: string) => void;
    onViewAll?: () => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({
                                                     questions = [
                                                         {
                                                             id: '1',
                                                             question: 'Why black color is so expensive?',
                                                             author: 'A*** B***',
                                                             date: '25 Mart 2025 16:57',
                                                             answer: {
                                                                 author: 'Samsung',
                                                                 content: 'Hello, thank you for your interest. When you add product to your favorites, you can be aware',
                                                                 avatar: '/samsung-logo.png'
                                                             }
                                                         },
                                                         {
                                                             id: '2',
                                                             question: 'Why black color is so expensive?',
                                                             author: 'A*** B***',
                                                             date: '25 Mart 2025 16:57',
                                                             answer: {
                                                                 author: 'Samsung',
                                                                 content: 'Hello, thank you for your interest. When you add product to your favorites, you can be aware',
                                                                 avatar: '/samsung-logo.png'
                                                             }
                                                         },
                                                         {
                                                             id: '3',
                                                             question: 'Why black color is so expensive?',
                                                             author: 'A*** B***',
                                                             date: '25 Mart 2025 16:57',
                                                             answer: {
                                                                 author: 'Samsung',
                                                                 content: 'Hello, thank you for your interest. When you add product to your favorites, you can be aware',
                                                                 avatar: '/samsung-logo.png'
                                                             }
                                                         }
                                                     ],
                                                     totalQuestions = 213,
                                                     onAskQuestion,
                                                     onViewAll
                                                 }) => {
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');

    const handleSubmitQuestion = () => {
        if (newQuestion.trim()) {
            onAskQuestion?.(newQuestion);
            setNewQuestion('');
            setShowAskForm(false);
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
                    Hemmesini gör ({totalQuestions})
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
                        className="bg-[#0762C8] text-white px-6 py-3 rounded-lg font-medium"
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
                      />
                    <div className="flex gap-3 mt-3">
                        <button
                            onClick={handleSubmitQuestion}
                            className="bg-[#0762C8] text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Ugrat
                        </button>
                        <button
                            onClick={() => setShowAskForm(false)}
                            className="bg-[#E5E5E5] text-[#161616] px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Ýatyr
                        </button>
                    </div>
                </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
                {questions.map((question) => (
                    <div key={question.id} className="border border-[#E5E5E5] rounded-lg p-3">
                        {/* Question */}
                        <div className="mb-4">
                            <h3 className="text-[#161616] text-lg font-semibold mb-2">
                                {question.question}
                            </h3>
                            <div className="text-[#A0A3BD] text-sm">
                                {question.author} • {question.date}
                            </div>
                        </div>

                        {/* Answer */}
                        {question.answer && (
                            <div className="bg-[#F8F9FA] rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-[#E5E5E5] rounded-full flex items-center justify-center">
                                        {question.answer.avatar ? (
                                            <img
                                                src={question.answer.avatar}
                                                alt={question.answer.author}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-4 h-4 text-[#A0A3BD]" />
                                        )}
                                    </div>
                                    <span className="text-[#161616] font-medium">
                                        {question.answer.author}
                                    </span>
                                </div>
                                <p className="text-[#161616] leading-relaxed">
                                    {question.answer.content}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AskQuestion;