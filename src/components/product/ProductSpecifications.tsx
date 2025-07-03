'use client'
import React from 'react';
import { useTranslations } from 'next-intl';

interface Specification {
    key: string;
    value: string;
}

interface ProductSpecificationsProps {
    specifications: Specification[];
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
                                                                         specifications
                                                                     }) => {
    const t = useTranslations('product_detail');

    const renderSpecificationRow = (spec: Specification, index: number) => (
        <div
            key={spec.key}
            className={`grid grid-cols-2 py-3 ${
                index !== specifications.length - 1 ? 'border-b border-border' : ''
            }`}
        >
            <div className="text-body-description text-black font-rubik">
                {/*{t(`specifications.${spec.key}`, spec.key)}*/}
            </div>
            <div className="text-body-description text-black font-rubik">
                {spec.value}
            </div>
        </div>
    );

    if (!specifications || specifications.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg border border-border overflow-hidden mb-8">
            <div className="bg-tab px-6 py-4 border-b border-border">
                <h2 className="text-h3 text-black font-rubik">
                    {t('specifications.title')}
                </h2>
            </div>

            <div className="px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {/* Left Column */}
                    <div>
                        {specifications.slice(0, Math.ceil(specifications.length / 2)).map((spec, index) =>
                            renderSpecificationRow(spec, index)
                        )}
                    </div>

                    {/* Right Column */}
                    <div>
                        {specifications.slice(Math.ceil(specifications.length / 2)).map((spec, index) =>
                            renderSpecificationRow(spec, index + Math.ceil(specifications.length / 2))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;