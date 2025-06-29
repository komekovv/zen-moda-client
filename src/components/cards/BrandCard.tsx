import React from 'react';

// Brand data interface
export interface Brand {
    id: string;
    name: string;
    logo: string;
    website?: string;
}

// BrandCard component props
interface BrandCardProps {
    brand: Brand;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'outlined' | 'minimal' | 'elevated';
    className?: string;
    logoClassName?: string;
    onClick?: (brand: Brand) => void;
    showName?: boolean;
    rounded?: boolean;
}

const BrandCard: React.FC<BrandCardProps> = ({
                                                 brand,
                                                 size = 'md',
                                                 variant = 'default',
                                                 className = '',
                                                 logoClassName = '',
                                                 onClick,
                                                 showName = false,
                                                 rounded = true
                                             }) => {
    const sizeClasses = {
        sm: {
            container: 'p-3 min-h-[60px] w-20 h-20',
            logo: 'h-6 md:h-8',
            text: 'text-xs'
        },
        md: {
            container: 'p-4 min-h-[80px] w-34 h-24 md:w-28 md:h-28',
            logo: 'h-8 md:h-10',
            text: 'text-sm'
        },
        lg: {
            container: 'p-6 min-h-[100px] w-32 h-32 md:w-36 md:h-36',
            logo: 'h-10 md:h-12',
            text: 'text-base'
        },
        xl: {
            container: 'p-8 min-h-[120px] w-40 h-40 md:w-44 md:h-44',
            logo: 'h-12 md:h-16',
            text: 'text-lg'
        }
    };

    // Variant styles
    const variantClasses = {
        default: 'bg-white shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200',
        outlined: 'bg-transparent border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50',
        minimal: 'bg-gray-50 border-none',
        elevated: 'bg-white shadow-lg hover:shadow-xl border-none'
    };

    const handleClick = () => {
        if (onClick) {
            onClick(brand);
        } else if (brand.website) {
            window.open(brand.website, '_blank', 'noopener,noreferrer');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            className={`
        ${variantClasses[variant]}
        ${rounded ? 'rounded-lg' : ''}
        h-[140px] w-[200px]
        flex flex-col items-center justify-center
        cursor-pointer
        ${className}
      `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${brand.name} brand card${brand.website ? ' - Click to visit website' : ''}`}
        >
            <div className="flex-1 flex items-center justify-center w-full">
                <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={`
            ${sizeClasses[size].logo}
            max-w-full object-contain
            filter grayscale hover:grayscale-0 transition-all duration-300
            ${logoClassName}
          `}
                    loading="lazy"
                />
            </div>

            {showName && (
                <div className={`mt-2 text-center ${sizeClasses[size].text} font-medium text-gray-700`}>
                    {brand.name}
                </div>
            )}
        </div>
    );
};

// Demo component showing different use cases
const BrandCardDemo: React.FC = () => {
    const sampleBrand: Brand = {
        id: '1',
        name: 'Apple',
        logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png',
        website: 'https://apple.com'
    };

    const brands: Brand[] = [
        {
            id: '1',
            name: 'Reebok',
            logo: 'https://logos-world.net/wp-content/uploads/2020/09/Reebok-Logo.png',
            website: 'https://reebok.com'
        },
        {
            id: '2',
            name: 'Adidas',
            logo: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
            website: 'https://adidas.com'
        },
        {
            id: '3',
            name: 'Samsung',
            logo: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png',
            website: 'https://samsung.com'
        }
    ];

    const handleBrandClick = (brand: Brand) => {
        console.log(`Clicked on ${brand.name}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">BrandCard Component Examples</h1>

                {/* Different Sizes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Different Sizes</h2>
                    <div className="flex flex-wrap gap-6 items-end">
                        <BrandCard brand={sampleBrand} size="sm" />
                        <BrandCard brand={sampleBrand} size="md" />
                        <BrandCard brand={sampleBrand} size="lg" />
                        <BrandCard brand={sampleBrand} size="xl" />
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Different Variants</h2>
                    <div className="flex flex-wrap gap-6">
                        <BrandCard brand={sampleBrand} variant="default" />
                        <BrandCard brand={sampleBrand} variant="outlined" />
                        <BrandCard brand={sampleBrand} variant="minimal" />
                        <BrandCard brand={sampleBrand} variant="elevated" />
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">With Brand Names</h2>
                    <div className="flex flex-wrap gap-6">
                        {brands.map((brand) => (
                            <BrandCard
                                key={brand.id}
                                brand={brand}
                                showName={true}
                                onClick={handleBrandClick}
                            />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Custom Styling</h2>
                    <div className="flex flex-wrap gap-6">
                        <BrandCard
                            brand={sampleBrand}
                            size="lg"
                            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                            logoClassName="drop-shadow-lg"
                        />
                        <BrandCard
                            brand={sampleBrand}
                            size="lg"
                            variant="outlined"
                            rounded={false}
                            className="border-purple-300 hover:border-purple-500"
                        />
                    </div>
                </section>

                {/* Real-world Example */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">Real-world Grid Example</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {brands.concat(brands).map((brand, index) => (
                            <BrandCard
                                key={`${brand.id}-${index}`}
                                brand={brand}
                                size="md"
                                variant="default"
                                onClick={handleBrandClick}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BrandCard;