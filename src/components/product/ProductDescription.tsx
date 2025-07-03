'use client'
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProductDescriptionProps {
    description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const t = useTranslations('product_detail');
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const shortDescription = description.length > 200
        ? description.substring(0, 200) + '...'
        : description;

    return (
        <div className="bg-white rounded-lg border border-border overflow-hidden mb-8">
            <div className="bg-tab px-6 py-4 border-b border-border">
                <h2 className="text-h3 text-black font-rubik">
                    {t('description.title')}
                </h2>
            </div>

            <div className="px-6 py-4">
                <div className="text-body-description text-black font-rubik leading-relaxed">
                    {isExpanded ? description : shortDescription}
                </div>

                {description.length > 200 && (
                    <button
                        onClick={toggleExpanded}
                        className="mt-3 text-primary font-rubik text-body-description font-medium hover:underline"
                    >
                        {isExpanded ? t('description.show_less') : t('description.show_more')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDescription;