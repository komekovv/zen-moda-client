'use client'
import React from 'react';
import { useTranslations } from 'next-intl';

export interface Specification {
    label: string;
    value: string;
}

interface ProductSpecificationsProps {
    specifications: Specification[];
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
                                                                         specifications
                                                                     }) => {
    const t = useTranslations('product_detail');

    const getSpecificationLabel = (key: string) => {
        try {
            return t(`specifications.${key}`);
        } catch (error) {
            return key;
        }
    };

    const renderSpecificationRow = (spec: Specification, index: number) => (
        <div
            key={spec.label}
            className="flex py-2"
        >
            <div className="text-body-description text-passive font-rubik ">
                {getSpecificationLabel(spec.label)}
            </div>
            <div className="flex-1 border-b border-accent-2 border-dashed min-w-[20px] mx-2"></div>
            <div className="text-body-description text-black font-rubik flex-shrink-0 w-32">
                {spec.value}
            </div>
        </div>
    );

    if (!specifications || specifications.length === 0) {
        return null;
    }

    return (
        <div className="border-t border-border overflow-hidden mb-8">
            <div className="py-4 border-b border-border">
                <h2 className="text-h3-mobile md:text-h3 text-black font-rubik">
                    {t('specifications.title')}
                </h2>
            </div>

            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="space-y-1">
                        {specifications.slice(0, Math.ceil(specifications.length / 2)).map((spec, index) =>
                            renderSpecificationRow(spec, index)
                        )}
                    </div>

                    <div className="space-y-1">
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