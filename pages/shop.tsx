import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon,
  HeartIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product, Category, SearchFilters } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';

interface ShopProps {
  products: Product[];
  categories: Category[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  filters: SearchFilters;
}

const ShopPage: React.FC<ShopProps> = ({
  products,
  categories,
  totalProducts,
  currentPage,
  totalPages,
  filters,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
  
  const { addItem } = useCartStore();
  const { showToast } = useUIStore();

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' },
  ];

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlistItems);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      showToast('Removed from wishlist', 'info');
    } else {
      newWishlist.add(productId);
      showToast('Added to wishlist', 'success');
    }
    setWishlistItems(newWishlist);
  };

  const ProductCard: React.FC<{ product: Product; viewMode: 'grid' | 'list' }> = ({ product, viewMode }) => {
    const isWishlisted = wishlistItems.has(product.id);
    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    if (viewMode === 'list') {
      return (
        <div className="card flex overflow-hidden hover:shadow-lg transition-all duration-200">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isOnSale && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </div>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200"
            >
              {isWishlisted ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">{product.category.name}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>
              
              <p className="text-sm text-gray-500 mb-4">Brand: {product.brand}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Link
                  href={`/products/${product.id}`}
                  className="btn-outline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="card group hover:shadow-lg transition-all duration-200">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
        
        <div className="card-body">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary-600 font-medium">{product.category.name}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIconSolid
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-3">{product.brand}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 btn-outline text-center text-xs py-1"
            >
              View
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 btn-primary text-xs py-1"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="page-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Left side - Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
                <ChevronDownIcon className={`h-4 w-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="text-sm text-gray-600">
                Showing {products.length} of {totalProducts} products
              </div>
            </div>

            {/* Right side - Sort & View */}
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name} ({category.productCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">All Brands</option>
                    <option value="audiotech">AudioTech</option>
                    <option value="sportstyle">SportStyle</option>
                    <option value="techpro">TechPro</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                <button className="btn-primary">Apply Filters</button>
                <button className="btn-outline">Clear All</button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-6'
          }
        `}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 disabled:opacity-50">
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 disabled:opacity-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data - in a real app, this would come from an API
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Mock products data
  const allProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Product ${i + 1}`,
    description: `This is a great product with amazing features and excellent quality. Perfect for your needs.`,
    price: Math.floor(Math.random() * 500) + 50,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 600) + 100 : undefined,
    images: [`https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`],
    category: {
      id: Math.floor(i / 6 + 1).toString(),
      name: ['Electronics', 'Fashion', 'Home', 'Sports'][Math.floor(i / 6)],
      slug: ['electronics', 'fashion', 'home', 'sports'][Math.floor(i / 6)],
      productCount: 6,
    },
    brand: ['AudioTech', 'SportStyle', 'TechPro', 'HomeStyle'][i % 4],
    stock: Math.floor(Math.random() * 100) + 1,
    rating: Math.floor(Math.random() * 2) + 3.5,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    tags: ['tag1', 'tag2'],
    isOnSale: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const categories: Category[] = [
    { id: '1', name: 'Electronics', slug: 'electronics', productCount: 6 },
    { id: '2', name: 'Fashion', slug: 'fashion', productCount: 6 },
    { id: '3', name: 'Home', slug: 'home', productCount: 6 },
    { id: '4', name: 'Sports', slug: 'sports', productCount: 6 },
  ];

  const currentPage = parseInt(query.page?.toString() || '1');
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const products = allProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    props: {
      products,
      categories,
      totalProducts: allProducts.length,
      currentPage,
      totalPages: Math.ceil(allProducts.length / itemsPerPage),
      filters: {},
    },
  };
};

export default ShopPage;