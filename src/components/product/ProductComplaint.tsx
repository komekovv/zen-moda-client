'use client'
import React, { useState } from 'react';

interface ComplaintProps {
    onSubmitComplaint?: (complaint: string) => void;
}

const ProductComplaint: React.FC<ComplaintProps> = ({ onSubmitComplaint }) => {
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [complaintText, setComplaintText] = useState('');

    const handleSubmitComplaint = () => {
        if (complaintText.trim()) {
            onSubmitComplaint?.(complaintText);
            setComplaintText('');
            setShowComplaintForm(false);
        }
    };

    return (
        <div className="bg-white border-t border-[#E5E5E5] p-6 mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h2 className="text-[#161616] text-xl font-semibold mb-3">
                    Şikaýat etmek
                </h2>
                <p className="text-[#161616] text-sm leading-relaxed">
                    Eger harytda ýalňyş bir maglumat ýa-da ýetmezçilik görünse habar beriň
                </p>
            </div>

            {/* Complaint Button or Form */}
            {!showComplaintForm ? (
                <div className="text-center">
                    <button
                        className="bg-[#E5E5E5] text-[#FC185B] px-8 py-3 rounded-lg font-medium"
                        onClick={() => setShowComplaintForm(true)}
                    >
                        Şikaýat et
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
          <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder="Şikaýatyňyzy ýazyň..."
              className="w-full p-3 border border-[#E5E5E5] rounded-lg resize-none h-32 focus:outline-none focus:border-primary"
          />
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={handleSubmitComplaint}
                            className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium"
                        >
                            Ugrat
                        </button>
                        <button
                            onClick={() => setShowComplaintForm(false)}
                            className="bg-[#E5E5E5] text-[#161616] px-6 py-2 rounded-lg text-sm font-medium"
                        >
                            Ýatyr
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductComplaint;