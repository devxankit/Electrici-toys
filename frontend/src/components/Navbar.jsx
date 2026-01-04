import React, { useRef, useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { theme } from '../theme';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MegaMenu = ({ items }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: -20, display: 'none' },
      { opacity: 1, y: 0, display: 'block', duration: 0.3, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50">
      <div className="w-full bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group/item cursor-pointer">
              <div className="overflow-hidden mb-4 h-48 w-full flex items-center justify-center">
                <img src={item.image} alt={item.name} className="h-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">{item.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const navLinks = [
    {
      name: 'Hoverboards',
      items: [
        { name: 'Classic Hoverboards', image: 'https://images.unsplash.com/photo-1593953443285-168452735460?q=80&w=400&auto=format&fit=crop', desc: 'Starting from ₹8,999' },
        { name: 'Off-Road Series', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop', desc: 'All Terrain Capability' },
        { name: 'Premium Self-Balancing', image: 'https://images.unsplash.com/photo-1620802051782-48cb7cd75785?q=80&w=400&auto=format&fit=crop', desc: 'Top Tier Performance' }
      ]
    },
    {
      name: 'Segways',
      items: [
        { name: 'Commuter Segways', image: 'https://images.unsplash.com/photo-1517502839167-0e6d8c4c2317?q=80&w=400&auto=format&fit=crop', desc: 'Daily City Travel' },
        { name: 'Professional Series', image: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=400&auto=format&fit=crop', desc: 'For Work & Patrol' },
        { name: 'Mini Pros', image: 'https://images.unsplash.com/photo-1615555470659-c294132bb822?q=80&w=400&auto=format&fit=crop', desc: 'Compact Power' }
      ]
    },
    {
      name: 'Scooters',
      items: [
        { name: 'Kids E-Scooters', image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=400&auto=format&fit=crop', desc: 'K1 (Kids E-Scooter)' },
        { name: 'Folding E-Scooters', image: 'https://images.unsplash.com/photo-1593953443285-168452735460?q=80&w=400&auto=format&fit=crop', desc: 'X1 (15-20kms Range)' },
        { name: 'Offroader E-Scooter', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop', desc: 'Beast Air (10inch Off-Roader)' }
      ]
    },
    {
      name: 'Drifter',
      items: [
        { name: 'Drift Karts 360', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400&auto=format&fit=crop', desc: 'Spin & Drift Action' },
        { name: 'Electric Gokarts', image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?q=80&w=400&auto=format&fit=crop', desc: 'Track Ready Speed' },
        { name: 'Crazy Carts', image: 'https://plus.unsplash.com/premium_photo-1661293818249-fdd2f0bb231c?q=80&w=400&auto=format&fit=crop', desc: 'Fun for All Ages' }
      ]
    },
    {
      name: 'Kids RideONs',
      items: [
        { name: 'Electric Cars', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=400&auto=format&fit=crop', desc: 'Licensed Replicas' },
        { name: 'Mini Bikes', image: 'https://images.unsplash.com/photo-1622185135505-2d795043dfeb?q=80&w=400&auto=format&fit=crop', desc: 'First Two-Wheeler' },
        { name: 'Jeeps & ATVs', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop', desc: 'Off-Road fun for Kids' }
      ]
    },
    { name: 'Support', items: [] },
  ];

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const activeItems = navLinks.find(l => l.name === activeDropdown)?.items || [];

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-3xl font-black italic tracking-tighter text-gray-900">
              Electrici<span className="text-blue-600">Toys</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-full items-center">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="static h-full flex items-center group px-4"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${activeDropdown === link.name ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
                >
                  {link.name}
                </button>
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-pink-500 transition-colors relative">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors relative group">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">0</span>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Mega Menu - Rendered once outside the loop */}
      {activeDropdown && activeItems.length > 0 && (
        <div
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu items={activeItems} />
        </div>
      )}

      {/* Mobile Menu (Simplified for brevity, can be expanded) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

