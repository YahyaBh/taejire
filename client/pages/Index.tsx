import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from "@shared/strapi";
import ToolCard from '@/components/ToolCard';
import CategoriesDropdown from '@/components/CategoriesDropdown';

// Mock brands data
const brands = [
  { name: 'Bosch', logo: '/api/placeholder/60/30' },
  { name: 'Makita', logo: '/api/placeholder/60/30' },
  { name: 'DeWalt', logo: '/api/placeholder/60/30' },
  { name: 'Black & Decker', logo: '/api/placeholder/60/30' },
  { name: 'Hilti', logo: '/api/placeholder/60/30' },
  { name: 'Stanley', logo: '/api/placeholder/60/30' },
];

export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Fetch products from Strapi
  useEffect(() => {
    setLoadingProducts(true);
    setProductsError(null);
    getProducts({ populate: "images" })
      .then((res: any) => {
        if (res && res.data) {
          // Filter out products that are pending and approved 

          const filteredProducts = res.data.filter((product: any) => product.status_product === 'approved');
          setProducts(filteredProducts);
        } else {
          setProducts([]);
        }
      })
      .catch((err: any) => {
        setProductsError("تعذر تحميل المنتجات من الخادم");
        setProducts([]);
      })
      .finally(() => setLoadingProducts(false));
  }, []);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tool-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showFavoritesAlert, setShowFavoritesAlert] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleFavorite = (toolId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];

      localStorage.setItem('tool-favorites', JSON.stringify(newFavorites));
      
      // Show alert when adding to favorites
      if (!prev.includes(toolId)) {
        setShowFavoritesAlert(true);
        setTimeout(() => setShowFavoritesAlert(false), 3000);
      }
      
      return newFavorites;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

  // Close mobile menu when categories dropdown opens
  useEffect(() => {
    if (showCategoriesDropdown) {
      setShowMobileMenu(false);
    }
  }, [showCategoriesDropdown]);

  const faqItems = [
    {
      question: 'ماهي شروط الإيجار؟',
      answer: 'يمكنك استئجار الأدوات بسهولة عبر التواصل المباشر مع المالك. تحتاج فقط إلى هوية صالحة وضمان مادي حسب قيمة الأداة. كما يجب الاتفاق على مدة الإيجار وطريقة الدفع مسبقاً.'
    },
    {
      question: 'كيف يتم الدفع؟',
      answer: 'يتم الدفع مباشرة للمالك حسب الاتفاق بينكما. يمكن الدفع نقداً أو تحويل بنكي أو ��بر التطبيقات المصرفية حسب تفضيل المالك. ننصح بتوثيق عملية الدفع بإيصال.'
    },
    {
      question: 'ماهي طرق رد الأدوات؟',
      answer: 'يتم رد الأداة في نفس حالتها للمالك في الموعد والمكان المتفق عليه. يفضل التواصل قبل موعد الإرجاع بيوم واحد للتأكيد. في حالة وجود أضرار، سيتم تقييم التكلفة حسب الاتفاق المسبق.'
    },
    {
      question: 'ماهي التأمين؟ هل نحن مؤمن ضد الحوادث؟',
      answer: 'المنصة تعمل كوسيط فقط بين المؤجر والمستأجر. التأمين والضمان يكون بالاتفاق المباشر بينكما. ننصح بمناقشة هذا الأمر قبل استلام الأداة وتوثيق الاتفاق كتابياً.'
    },
    {
      question: 'ماهي مدة الإيجار الأدنى والأقصى؟',
      answer: 'مدة الإيجار تحدد حسب نوع الأداة والاتفاق مع المالك. عادة تكون من يوم واحد كحد أدنى إلى شهر كامل كحد أقصى. بعض الأدوات المتخصصة قد تتطلب حد أدنى أطول.'
    },
    {
      question: 'كيف أتواصل مع مالك الأداة؟',
      answer: 'يمكنك التواصل مع المالك مباشرة عبر رقم الهاتف أو الواتساب المعروض في صفحة الأداة. ننصح بالتواصل أولاً للتأكد من توفر الأداة وتحديد موعد الاستلام والتفاصيل الأخرى.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {/* Favorites Alert */}
      {showFavoritesAlert && (
        <div className="fixed top-4 right-4 left-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slide-down">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowFavoritesAlert(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span>تمت الإضافة إلى المفضلة ({favorites.length})</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-orange text-white py-2">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm font-medium">
            قوة وقيمة ممتازة
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-gray-200 py-4 sticky top-0 bg-white z-40 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279" 
                alt="شعار منصة تأجير الأدوات" 
                className="h-8 md:h-12"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 mobile-menu-button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                )}
              </svg>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <div className="relative">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    showCategoriesDropdown
                      ? 'bg-orange/10 text-orange'
                      : 'hover:bg-gray-50 text-dark-blue'
                  }`}
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  onMouseEnter={() => setShowCategoriesDropdown(true)}
                >
                  <svg className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors ${showCategoriesDropdown ? 'text-orange' : 'text-dark-blue'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
                  </svg>
                  <span className={`font-medium text-sm lg:text-base transition-colors ${showCategoriesDropdown ? 'text-orange' : 'text-dark-blue'}`}>
                    كل المنتجات
                  </span>
                  <svg className={`w-4 h-4 transition-all duration-200 ${
                    showCategoriesDropdown
                      ? 'rotate-180 text-orange'
                      : 'text-dark-blue'
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                  <div className="w-px h-6 bg-gray-300 mr-4"></div>
                </button>
              </div>
              <Link to="/tools" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الادوات</Link>
              <Link to="/blog" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">المدونة</Link>
              <Link to="/contact" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الاتصال</Link>
              <Link to="/about" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">من نحن</Link>
            </nav>

            {/* Add Equipment & Favorites */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <Link to="/favorites">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-dark-blue hover:text-orange cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
              <Link
                to="/add-equipment"
                className="bg-dark-blue text-white px-2 md:px-4 lg:px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 text-xs md:text-sm lg:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span className="hidden sm:inline">أضف مع��اتك</span>
                <span className="sm:hidden">أضف</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Dropdown */}
        <CategoriesDropdown
          isOpen={showCategoriesDropdown}
          onClose={() => setShowCategoriesDropdown(false)}
          onMobileMenuClose={() => setShowMobileMenu(false)}
        />

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-b-2 border-gray-200 shadow-lg mobile-menu animate-mobile-menu">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {/* Categories Section */}
                <div>
                  <button
                    className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-200 ${
                      showCategoriesDropdown
                        ? 'bg-orange/10 border-2 border-orange/20'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  >
                    <svg className={`w-5 h-5 transition-all duration-200 ${
                      showCategoriesDropdown
                        ? 'rotate-180 text-orange'
                        : 'text-dark-blue'
                    }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`font-bold transition-colors ${showCategoriesDropdown ? 'text-orange' : 'text-dark-blue'}`}>
                          كل المنتجات
                        </div>
                        <div className="text-gray-500 text-xs">
                          تصفح جميع الفئات
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg transition-colors ${
                        showCategoriesDropdown ? 'bg-orange/20' : 'bg-white'
                      }`}>
                        <svg className={`w-6 h-6 transition-colors ${showCategoriesDropdown ? 'text-orange' : 'text-dark-blue'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  <Link
                    to="/tools"
                    className="block p-3 text-dark-blue hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    الادوات
                  </Link>
                  <Link
                    to="/blog"
                    className="block p-3 text-dark-blue hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    المدونة
                  </Link>
                  <Link
                    to="/contact"
                    className="block p-3 text-dark-blue hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    الاتصال
                  </Link>
                  <Link
                    to="/about"
                    className="block p-3 text-dark-blue hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    من نحن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white border-2 border-orange rounded-xl overflow-hidden max-w-5xl mx-auto shadow-lg">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center">
            {/* Search Icon */}
            <div className="bg-orange p-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="البحث حسب العلامات التجارية، الموديل، الرقم المرجعي"
              className="flex-1 px-6 py-4 bg-cream text-right outline-none text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Location Filter */}
            <div className="flex items-center gap-3 px-4 border-r-2 border-orange">
              <svg className="w-8 h-8 text-orange" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <select 
                className="bg-transparent outline-none text-dark-blue font-medium"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">اختر موقع</option>
                <option value="rabat">الرباط</option>
                <option value="casablanca">الدار البيضاء</option>
                <option value="fes">فاس</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 px-4 border-r-2 border-orange">
              <svg className="w-8 h-8 text-dark-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
              </svg>
              <select 
                className="bg-transparent outline-none text-dark-blue font-bold text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">اختر فئة الاداة</option>
                <option value="drilling">معدات الحفر</option>
                <option value="construction">أدوات البناء</option>
                <option value="electrical">الأدوات الكهربائية</option>
              </select>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            {/* Search Input */}
            <div className="flex items-center bg-cream">
              <div className="bg-orange p-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="البحث حسب العلامة التجارية..."
                className="flex-1 px-4 py-3 bg-cream text-right outline-none text-gray-600 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-2 gap-0 border-t border-orange">
              <div className="flex items-center gap-2 p-3 border-l border-orange">
                <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <select 
                  className="bg-transparent outline-none text-dark-blue font-medium text-sm flex-1"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">الموقع</option>
                  <option value="rabat">الرباط</option>
                  <option value="casablanca">الدار ا��بيضاء</option>
                  <option value="fes">فاس</option>
                </select>
              </div>
              <div className="flex items-center gap-2 p-3">
                <svg className="w-5 h-5 text-dark-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
                </svg>
                <select 
                  className="bg-transparent outline-none text-dark-blue font-medium text-sm flex-1"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">الفئة</option>
                  <option value="drilling">معدات الحفر</option>
                  <option value="construction">أدوات البناء</option>
                  <option value="electrical">الأدوات الكهربائية</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-b from-teal/20 to-teal/30 rounded-xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-right">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark-blue mb-4 leading-tight">
                وجهتك الأولى لتأجير أدوات البناء و البريكولاج
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-dark-blue mb-8 max-w-2xl mx-auto lg:mx-0">
                اكتشف مجموعة واسعة من المعدات والمحركات. حلول مرنة لتلبية احتياجات مشروعك.
              </p>
              <Link
                to="/tools"
                className="bg-teal text-dark-blue px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>استكشف الأدوات</span>
              </Link>
            </div>

            {/* Hero Images - Hidden on mobile for better performance */}
            <div className="relative hidden lg:block">
              <div className="w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-b from-teal to-teal/50 rounded-full relative">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8bb45ea1b25d7a776cfdea40181b3995ae041545?width=562" 
                  alt="عامل بناء" 
                  className="absolute top-0 right-8 w-60 xl:w-72 h-auto"
                />
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=548" 
                  alt="أدوات" 
                  className="absolute bottom-8 left-8 w-48 xl:w-60 h-auto"
                />
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=736" 
                  alt="حفارة" 
                  className="absolute bottom-0 right-0 w-64 xl:w-80 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-cream rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-center gap-8 lg:gap-16 opacity-60 flex-wrap">
            {brands.map((brand, index) => (
              <img key={index} src={brand.logo} alt={brand.name} className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all" />
            ))}
          </div>
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-transparent to-cream"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-transparent to-cream"></div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link
            to="/tools"
            className="bg-teal text-dark-blue px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors order-2 sm:order-1"
          >
            عرض الكل
          </Link>
          <div className="text-center sm:text-right order-1 sm:order-2">
            <p className="text-dark-blue font-bold text-sm uppercase mb-2">اكتشف منتجاتنا</p>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-dark-blue">الفئات الشعبية</h2>
          </div>
        </div>

        {/* Category Tab */}
        <div className="flex justify-center sm:justify-end mb-8">
          <div className="border-b border-gray-200 flex">
            <button className="px-8 md:px-12 py-3 text-dark-blue font-bold text-base md:text-lg border-b-2 border-dark-blue">
              سلالم
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="responsive-grid grid gap-4 md:gap-6">
          {loadingProducts ? (
            <div className="col-span-full text-center py-8 text-lg text-gray-500">جاري تحميل المنتجات...</div>
          ) : productsError ? (
            <div className="col-span-full text-center py-8 text-lg text-red-500">{productsError}</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-8 text-lg text-gray-500">لا توجد منتجات متاحة حالياً</div>
          ) : (
            products.map((item) => {
              const attrs = item;
              return (
                <ToolCard
                  key={item.documentId}
                  tool={{
                    id: item.documentId,
                    name: attrs.name,
                    description: attrs.description,
                    price: attrs.price_per_day,
                    priceUnit: 'اليوم',
                    location: `${attrs.city}${attrs.district ? '، ' + attrs.district : ''}`,
                    category: attrs.category,
                    condition: attrs.condition,
                    status_product: attrs.status_product,
                    owner: attrs.provider || '',
                    rating: attrs.rating || 0,
                    reviews: attrs.reviews || 0,
                    lastSeen: attrs.lastSeen || '',
                    image: attrs.images && attrs.images.data && attrs.images.data.length > 0
                      ? attrs.images.data[0].attributes.url.startsWith('http')
                        ? attrs.images.data[0].attributes.url
                        : `${import.meta.env.VITE_STRAPI_URL || ''}${attrs.images.data[0].attributes.url}`
                      : '',
                    isFavorite: favorites.includes(item.docmuentId),
                  }}
                  isFavorite={favorites.includes(item.documentId)}
                  onToggleFavorite={toggleFavorite}
                  viewMode="grid"
                />
              );
            })
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-dark-blue mb-4">كيف يعمل الموقع</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            خطوات بسيطة للحصول على الأداة المناسبة لمشروعك
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange/10 to-orange/20 rounded-xl p-6 md:p-8">
          <div className="responsive-grid grid gap-6 md:gap-8">
            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">4</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-dark-blue mb-3">باشر العمل</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                احصل على الأداة وابدأ العمل على مشروعك.
              </p>
            </div>

            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">3</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-dark-blue mb-3">اتصل بالمالك</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                تواصل مباشرة مع المالك لتأكيد التفاصيل.
              </p>
            </div>

            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">2</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-dark-blue mb-3">اختر الأداة المناسبة</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                قارن بين الخيارات المتوفرة لدينا واختر الأداة التي تناسب مشروعك.
              </p>
            </div>

            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">1</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-medium text-dark-blue mb-3">تصفح الأدوات</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                تصفح تشكيلتنا الواسعة من الأدوات المتاحة للإيجار.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-dark-blue rounded-xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-right">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                هل لديك أداة ترغب في تأجيرها؟
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 opacity-90">
                انضم إلى شبكتنا وشارك أدواتك مع الآلاف من الباحثين عن معدات بناء. عملية بسيطة ومباشرة.
              </p>
              <Link
                to="/add-equipment"
                className="bg-teal text-dark-blue px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span>أضف معداتك</span>
              </Link>
            </div>

            <div className="relative hidden lg:block">
              <div className="w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-b from-teal to-dark-blue rounded-full relative">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8bb45ea1b25d7a776cfdea40181b3995ae041545?width=562" 
                  alt="عامل بناء" 
                  className="absolute top-0 right-8 w-60 xl:w-72 h-auto"
                />
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=548" 
                  alt="أدوات" 
                  className="absolute bottom-8 left-8 w-48 xl:w-60 h-auto"
                />
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=736" 
                  alt="حفارة" 
                  className="absolute bottom-0 right-0 w-64 xl:w-80 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-dark-blue mb-4">أسئلة متكررة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            أجوبة سريعة لأستفساراتكم الخاصة بمنصة تأجير الأدوات
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-cream rounded-xl border border-gray-100 hover:border-teal transition-colors overflow-hidden">
              <div 
                className="p-4 md:p-6 text-right cursor-pointer"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <svg 
                    className={`w-5 h-5 md:w-6 md:h-6 text-teal transition-transform duration-300 ${expandedFAQ === index ? 'rotate-45' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <h3 className="text-base md:text-lg font-medium text-dark-blue">{item.question}</h3>
                </div>
              </div>
              <div 
                className={`text-right transition-all duration-300 ease-in-out ${
                  expandedFAQ === index 
                    ? 'max-h-96 opacity-100 pb-4 md:pb-6 px-4 md:px-6' 
                    : 'max-h-0 opacity-0 pb-0 px-4 md:px-6'
                }`}
                style={{
                  transitionProperty: 'max-height, opacity, padding',
                }}
              >
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center md:text-right lg:col-span-1">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279" 
                alt="شعار منصة تأجير الأدوات" 
                className="h-10 md:h-12 mb-4 brightness-0 invert mx-auto md:mx-0"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                منصة لتأجير أدوات البناء والبريكولاج بالمغرب. نربط بين أصحاب الأدوا�� والباحثين عن معدات مناسبة لمشاريعهم.
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">روابط مفيدة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-teal transition-colors">من نحن</Link></li>
                <li><Link to="/contact" className="hover:text-teal transition-colors">اتصل بنا</Link></li>
                <li><Link to="/privacy" className="hover:text-teal transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-teal transition-colors">شروط الاستخدام</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">الفئات</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/category/drilling" className="hover:text-teal transition-colors">معدات الحفر</Link></li>
                <li><Link to="/category/construction" className="hover:text-teal transition-colors">أدوات البناء</Link></li>
                <li><Link to="/category/electrical" className="hover:text-teal transition-colors">الأدوات الكهربائية</Link></li>
                <li><Link to="/category/mechanical" className="hover:text-teal transition-colors">الأدوات الميكانيكية</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">+212 6XX XXX XXX</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">contact@toolsrental.ma</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">الرباط، المغرب</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 منصة تأجير الأدوات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
