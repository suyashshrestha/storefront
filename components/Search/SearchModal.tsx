import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { Product } from '@/types';

const SearchModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { closeSearch } = useUIStore();

  // Focus on search input when modal opens
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Mock search functionality
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length > 2) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setSearchResults(mockSearchResults.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
          ));
          setIsLoading(false);
        }, 300);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const popularSearches = [
    'headphones',
    'running shoes',
    'laptop',
    'smartphone',
    'coffee maker',
    'winter jacket',
  ];

  const recentSearches = [
    'wireless earbuds',
    'gaming chair',
    'yoga mat',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      closeSearch();
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleProductClick = () => {
    closeSearch();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeSearch}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 left-4 right-4 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden mx-auto max-w-2xl"
        >
          {/* Search Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-lg border-none outline-none placeholder-gray-400"
              />
            </form>
            <button
              onClick={closeSearch}
              className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {searchTerm.length === 0 ? (
              /* Default State */
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchTerm(search)}
                          className="block w-full text-left p-2 rounded-md hover:bg-gray-50 text-gray-700"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <FireIcon className="h-4 w-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(search)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              /* Loading State */
              <div className="p-8 text-center">
                <div className="loading-spinner mx-auto mb-4" />
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              /* Search Results */
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
                </p>
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={handleProductClick}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="relative w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {product.category.name} • {product.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-xs text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* View All Results */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    onClick={closeSearch}
                    className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    View All Results
                  </Link>
                </div>
              </div>
            ) : (
              /* No Results */
              <div className="p-8 text-center">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try searching for something else or check your spelling.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Popular suggestions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(search)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Mock search results - in a real app, this would come from an API
const mockSearchResults: Product[] = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock products as needed
];

export default SearchModal;