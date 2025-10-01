import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import {
  ArrowRightIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Product, Category } from '@/types';

interface HomeProps {
  featuredProducts: Product[];
  categories: Category[];
}

const HomePage: React.FC<HomeProps> = ({ featuredProducts, categories }) => {
  const features = [
    {
      name: 'Free Shipping',
      description: 'Free shipping on orders over $75',
      icon: TruckIcon,
    },
    {
      name: 'Secure Payment',
      description: '100% secure payment processing',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Easy Returns',
      description: '30-day hassle-free returns',
      icon: CreditCardIcon,
    },
    {
      name: '24/7 Support',
      description: 'Customer support around the clock',
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply" />
        </div>
        
        <div className="relative page-container py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="block text-primary-200">Products</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Shop from thousands of products with fast shipping, secure payments, and unbeatable customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Shop Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-semibold rounded-lg border border-white hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-500 rounded-full opacity-20 animate-pulse" />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group card hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={category.image || 'https://via.placeholder.com/300x300?text=Category'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-0">Featured Products</h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link
              href="/shop?filter=featured"
              className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
            >
              View All
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group hover:shadow-lg transition-all duration-200">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Sale
                    </div>
                  )}
                </div>
                
                <div className="card-body">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 w-full btn-primary text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Latest Offers
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special promotions.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mock data - in a real app, this would come from an API
export const getStaticProps: GetStaticProps = async () => {
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 299.99,
      originalPrice: 399.99,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
      category: { id: '1', name: 'Electronics', slug: 'electronics', productCount: 150 },
      brand: 'AudioTech',
      stock: 25,
      rating: 4.5,
      reviewCount: 128,
      tags: ['wireless', 'premium', 'noise-cancelling'],
      isOnSale: true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Stylish Running Shoes',
      description: 'Comfortable and stylish running shoes for everyday wear',
      price: 129.99,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
      category: { id: '2', name: 'Footwear', slug: 'footwear', productCount: 200 },
      brand: 'SportStyle',
      stock: 50,
      rating: 4.8,
      reviewCount: 95,
      tags: ['running', 'comfortable', 'stylish'],
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more mock products...
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300',
      productCount: 150,
    },
    {
      id: '2',
      name: 'Fashion',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300',
      productCount: 300,
    },
    {
      id: '3',
      name: 'Home & Garden',
      slug: 'home-garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
      productCount: 120,
    },
    {
      id: '4',
      name: 'Sports',
      slug: 'sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
      productCount: 85,
    },
    {
      id: '5',
      name: 'Books',
      slug: 'books',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      productCount: 250,
    },
    {
      id: '6',
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
      productCount: 180,
    },
  ];

  return {
    props: {
      featuredProducts,
      categories,
    },
  };
};

export default HomePage;