import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      role="document"
    >
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      <header role="banner">
        <Navbar />
      </header>

      <main 
        id="main-content"
        className="flex-grow container mx-auto px-4 py-8"
        role="main"
        aria-label="Main content"
        tabIndex={-1} 
      >
        <Outlet />
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
}