import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartSidebar from '../Cart/CartSidebar';
import SearchModal from '../Search/SearchModal';
import Toast from '../UI/Toast';
import { useUIStore } from '@/store/useUIStore';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'StoreFront - Your Premier Shopping Destination',
  description = 'Discover amazing products at great prices. Shop with confidence with our secure checkout and fast shipping.',
  keywords = 'online shopping, retail, ecommerce, products, store',
  ogImage = '/images/og-default.jpg',
  noIndex = false,
}) => {
  const { isMobileMenuOpen, isCartOpen, isSearchOpen, currentModal } = useUIStore();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
        
        {/* PWA */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StoreFront" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* SEO */}
        {noIndex && <meta name="robots" content="noindex,nofollow" />}
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <MobileMenu />}

        {/* Cart Sidebar */}
        {isCartOpen && <CartSidebar />}

        {/* Search Modal */}
        {isSearchOpen && <SearchModal />}

        {/* Toast Notifications */}
        <Toast />

        {/* Global Overlays */}
        {(isMobileMenuOpen || isCartOpen || isSearchOpen || currentModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        )}
      </div>

      {/* Service Worker Registration */}
      {typeof window !== 'undefined' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      )}
    </>
  );
};

export default Layout;