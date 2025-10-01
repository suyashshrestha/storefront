import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  XMarkIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { closeMobileMenu } = useUIStore();

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Shop All', href: '/shop', icon: null },
    { name: 'Categories', href: '/categories', icon: null },
    { name: 'Sale', href: '/shop?filter=sale', icon: null },
    { name: 'New Arrivals', href: '/shop?filter=new', icon: null },
    { name: 'About', href: '/about', icon: null },
    { name: 'Contact', href: '/contact', icon: null },
  ];

  const userActions = [
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Wishlist', href: '/wishlist', icon: HeartIcon },
    { name: 'Orders', href: '/orders', icon: ShoppingBagIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    router.push('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        />

        {/* Slide-out menu */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">StoreFront</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* User Section */}
          {isAuthenticated && user ? (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary-600" />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  onClick={handleLinkClick}
                  className="block w-full bg-primary-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={handleLinkClick}
                  className="block w-full bg-white text-primary-600 text-center py-2 px-4 rounded-lg font-medium border border-primary-200 hover:bg-primary-50 transition-colors duration-200"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="py-4">
            <div className="px-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Navigation
              </h3>
            </div>
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 ${
                    router.pathname === item.href
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                      : 'text-gray-900 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Actions */}
          {isAuthenticated && (
            <div className="border-t border-gray-200 py-4">
              <div className="px-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Account
                </h3>
              </div>
              <div className="space-y-1">
                {userActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-900 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <action.icon className="h-5 w-5 mr-3" />
                    {action.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 mt-auto">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © 2024 StoreFront. All rights reserved.
              </p>
              <div className="mt-2 space-x-4">
                <Link
                  href="/privacy"
                  onClick={handleLinkClick}
                  className="text-xs text-gray-500 hover:text-primary-600"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  onClick={handleLinkClick}
                  className="text-xs text-gray-500 hover:text-primary-600"
                >
                  Terms
                </Link>
                <Link
                  href="/help"
                  onClick={handleLinkClick}
                  className="text-xs text-gray-500 hover:text-primary-600"
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MobileMenu;