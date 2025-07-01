import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ImageI } from "@/types/types";

export interface Category {
    id: string;
    name: string;
    photos: ImageI;
}

interface CategoryCardProps {
    category: Category;
    className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
                                                       category,
                                                       className = '',
                                                   }) => {
    const categoryImage = category.photos && category.photos.path;

    return (
        <Link href={`/category/${category.id}`}>
            <div
                className={`
                    w-full
                    aspect-square
                    relative
                    cursor-pointer
                    rounded-2xl
                    overflow-hidden
                    bg-blue-shade-1
                    ${className}
                `}
                role="button"
                tabIndex={0}
                aria-label={`${category.name}`}
            >
                {/* Image Container */}
                <div className="w-full mb-2">
                    {categoryImage ? (
                        <Image
                            src={categoryImage}
                            alt={`${category.name}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-passive/20 rounded-lg flex items-center justify-center">
                            <span className="text-passive text-xs">No Image</span>
                        </div>
                    )}
                </div>

                {/* Category Name */}
            </div>
            <div className="text-center">
                <h3 className="text-md font-rubik text-black font-semibold">
                    {category.name}
                </h3>
            </div>
        </Link>
    );
};

export default CategoryCard;