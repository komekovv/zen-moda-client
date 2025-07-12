import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ImageI } from "@/types/types";

export interface Brand {
    id: string;
    name: string;
    photo: string;
}

interface BrandCardProps {
    brand: Brand;
    className?: string;
}

const BrandCard: React.FC<BrandCardProps> = ({
                                                 brand,
                                                 className = '',
                                             }) => {
    const brandImage = brand.photo && brand.photo;
    console.log(brand.photo)

    return (
        <Link href={`/brand/${brand.id}`} className="block">
            <div
                className={`
                    w-full
                    aspect-[1.5/1] sm:aspect-[1.8/1]
                    relative
                    cursor-pointer
                    rounded
                    overflow-hidden
                    bg-gray-100
                    flex items-center justify-center
                    ${className}
                `}
                role="button"
                tabIndex={0}
                aria-label={`${brand.name} `}
            >
                {brandImage ? (
                    <Image
                        src={brandImage}
                        alt={`${brand.name}`}
                        fill
                        className="object-contain p-4 transition-all duration-300 filter hover:brightness-110"
                    />
                ) : (
                    <div className="text-passive text-sm font-inter">
                        {brand.name}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default BrandCard;