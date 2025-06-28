'use client'
import banner from "@/assets/images/banner.jpg"
import Image, {StaticImageData} from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/components/cards/ProductCard';

const sampleProducts = [
    {
        id: '1',
        title: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=400&h=400&fit=crop',
        currentPrice: 89.99,
        originalPrice: 119.99,
        currency: 'TMT',
        discount: 25,
        rating: 4.5,
        reviewCount: 128,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
    {
        id: '2',
        title: 'Smart Watch Series 8',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
        currentPrice: 299.99,
        originalPrice: 399.99,
        currency: 'TMT',
        discount: 25,
        rating: 4.8,
        reviewCount: 89,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    },
    {
        id: '3',
        title: 'Bluetooth Speaker Pro',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
        currentPrice: 59.99,
        currency: 'TMT',
        rating: 4.2,
        reviewCount: 234,
    },
    {
        id: '4',
        title: 'Wireless Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        currentPrice: 79.99,
        originalPrice: 99.99,
        currency: 'TMT',
        discount: 20,
        rating: 4.6,
        reviewCount: 156,
    },
    {
        id: '5',
        title: 'USB-C Hub 7-in-1',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        currentPrice: 45.99,
        currency: 'TMT',
        rating: 4.3,
        reviewCount: 67,
    },
    {
        id: '6',
        title: 'Portable Power Bank 20000mAh',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
        currentPrice: 34.99,
        originalPrice: 49.99,
        currency: 'TMT',
        discount: 30,
        rating: 4.4,
        reviewCount: 192,
        isOnSale: true,
        saleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    },
    {
        id: '7',
        title: 'Mechanical Keyboard RGB',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
        currentPrice: 129.99,
        currency: 'TMT',
        rating: 4.7,
        reviewCount: 98,
    },
    {
        id: '8',
        title: '4K Webcam Pro',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        currentPrice: 89.99,
        originalPrice: 119.99,
        currency: 'TMT',
        discount: 25,
        rating: 4.1,
        reviewCount: 45,
    },
];

export default function Home() {
    const handleFavoriteToggle = (productId: string) => {
        console.log('Favorite toggled for product:', productId);
    };

    const handleProductClick = (productId: string) => {
        console.log('Product clicked:', productId);
    };

    return (
        <div>
            <Image src={banner as StaticImageData} alt={'banner'}/>

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                <div className="mb-8 mt-4">
                    <h2 className="text-2xl font-bold text-black mb-2 font-rubik">Ýörite siziň üçin</h2>
                </div>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={6}
                    freeMode={true}
                    autoplay={false}
                    breakpoints={{
                        // Mobile
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        // Small tablets
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        // Tablets
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        // Small desktop
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                        // Medium desktop
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                        // Large desktop
                        1536: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                    className="product-slider"
                >
                    {sampleProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                {...product}
                                onFavoriteToggle={handleFavoriteToggle}
                                onCardClick={handleProductClick}
                                className="h-full"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="mb-8 mt-12">
                    <h2 className="text-2xl font-bold text-black mb-2 font-rubik">Köp görülýän kategoriýalar</h2>
                </div>
            </div>
        </div>
    );
}