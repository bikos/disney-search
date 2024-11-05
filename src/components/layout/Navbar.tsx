import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import disneyLogo from '@/assets/logo/disney-logo.svg';
import profile from '@/assets/logo/profile.svg';

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      navigate(`/?q=${encodeURIComponent(debouncedSearch)}`);
    } else if (debouncedSearch.length === 0) {
      navigate('/');
    }
  }, [debouncedSearch, navigate]);

  return (
    <nav 
      className="bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto mb-1 mt-4 px-4 pt-4">
        <div className="flex items-center gap-8"> 
          {/* Logo/Home Link */}
          <Link 
            to="/" 
            className="flex-shrink-0"
            aria-label="Disney Home"
          > 
            <img 
              src={disneyLogo} 
              alt="Disney Logo"
              className="h-5 sm:h-11 w-auto hover:scale-110 transition-all duration-300"
              width="110"
              height="44"
            />
          </Link>
          
          {/* Search Form */}
          <div 
            className="flex-grow relative"
            role="search"
            aria-label="Search Disney characters"
          >
            <label htmlFor="search-input" className="sr-only">
              Search for Disney characters
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Find a character..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 h-11 border-none bg-light-blue rounded-full placeholder:text-sm w-full placeholder:font-lato placeholder:text-gray-400"
              aria-label="Search characters"
              autoComplete="off"
              role="searchbox"
            />
            <MagnifyingGlassIcon 
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              aria-hidden="true"
            />
          </div>
          
          {/* Profile Link */}
          <Link 
            to="/profile" 
            className="flex-shrink-0"
            aria-label="View profile"
          >
            <img 
              src={profile} 
              alt="Profile"
              className="h-11 w-auto hover:scale-110 transition-all duration-300"
              width="44"
              height="44"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}