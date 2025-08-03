import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Product data structure that matches AddEquipment form fields
interface ProductDetail {
  id: number;
  // Basic tool information (from AddEquipment form)
  toolName: string;
  category: string;
  brand: string;
  model: string;
  condition: string;
  description: string;
  specifications: string;
  dailyPrice: number;
  priceUnit: string;

  // Location information (from AddEquipment form)
  city: string;
  neighborhood: string;

  // Contact information (from AddEquipment form)
  contactPhone: string;
  contactWhatsApp: string;

  // Additional platform data
  images: string[];
  owner: string;
  rating: number;
  reviews: number;
  lastSeen: string;
  status_product: string;
}

// Mock product data that matches AddEquipment form structure
const mockProductData: ProductDetail = {
  id: 1,
  // Basic tool information (exactly as filled in AddEquipment form)
  toolName: 'مثقاب كهربائي بوش',
  category: 'معدات الحفر',
  brand: 'بوش',
  model: 'GSB 21-2 RCT',
  condition: 'مستعمل - حالة ممتازة',
  description: 'مثقاب كهربائي قوي ومناسب لجميع أنواع الحفر في الخشب والمعادن والخرسانة. يتميز بسهولة الاستخدام والدقة في العمل. مثالي للمقاولين وأصحاب المشاريع الصغيرة.',
  specifications: 'القوة: 850 واط، الوزن: 2.4 كجم، الأبعاد: 32 × 8 × 26 سم، الفولتية: 220-240 فولت، السرعة: 0-1200 دورة/دقيقة، عمق الحفر في الخشب: 30 مم، عمق الحفر في المعدن: 13 مم، عمق الحفر في الخرسانة: 20 مم',
  dailyPrice: 100,
  priceUnit: 'اليوم',

  // Location information (exactly as filled in AddEquipment form)
  city: 'الرباط',
  neighborhood: 'المدينة القديمة',

  // Contact information (exactly as filled in AddEquipment form)
  contactPhone: '+212 661 234 567',
  contactWhatsApp: '+212 661 234 567',

  // Additional platform data
  images: [
    'https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=400',
    'https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=400',
    'https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=400'
  ],
  owner: 'مجاهد النجار',
  rating: 4.8,
  reviews: 1000,
  lastSeen: 'ساعتان',
  status_product: 'للايجار'
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tool-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For now, we'll use mock data
    if (id) {
      setProduct({ ...mockProductData, id: parseInt(id) });
    }
  }, [id]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('tool-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-arabic flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات المنتج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-arabic" dir="rtl">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-white/20 py-4 sticky top-0 z-40 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-200">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="شعار منصة تأجير الأدوات"
                className="h-8 md:h-12 drop-shadow-sm"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/" className="text-slate-700 hover:text-orange transition-all duration-300 text-sm lg:text-base font-medium relative group">
                الرئيسية
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/tools" className="text-orange font-semibold text-sm lg:text-base relative">
                الادوات
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange"></span>
              </Link>
              <Link to="/blog" className="text-slate-700 hover:text-orange transition-all duration-300 text-sm lg:text-base font-medium relative group">
                المدونة
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="text-slate-700 hover:text-orange transition-all duration-300 text-sm lg:text-base font-medium relative group">
                الاتصال
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="text-slate-700 hover:text-orange transition-all duration-300 text-sm lg:text-base font-medium relative group">
                من نحن
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <Link
              to="/add-equipment"
              className="bg-gradient-to-r from-orange to-red-500 text-white px-4 lg:px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-orange/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm lg:text-base font-medium"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span className="hidden sm:inline">أضف معداتك</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white/60 backdrop-blur-sm py-4 border-b border-white/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-slate-600 hover:text-orange transition-all duration-300 flex items-center gap-1 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
              </svg>
              الرئيسية
            </Link>
            <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
            <Link to="/tools" className="text-slate-600 hover:text-orange transition-all duration-300 flex items-center gap-1 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14,12.94C19.73,12.94 20.20,12.47 20.20,11.88C20.20,11.29 19.73,10.82 19.14,10.82C18.55,10.82 18.08,11.29 18.08,11.88C18.08,12.47 18.55,12.94 19.14,12.94M19.14,9.41C20.46,9.41 21.61,10.56 21.61,11.88C21.61,13.20 20.46,14.35 19.14,14.35C17.82,14.35 16.67,13.20 16.67,11.88C16.67,10.56 17.82,9.41 19.14,9.41M4.86,12.94C5.45,12.94 5.92,12.47 5.92,11.88C5.92,11.29 5.45,10.82 4.86,10.82C4.27,10.82 3.80,11.29 3.80,11.88C3.80,12.47 4.27,12.94 4.86,12.94M4.86,9.41C6.18,9.41 7.33,10.56 7.33,11.88C7.33,13.20 6.18,14.35 4.86,14.35C3.54,14.35 2.39,13.20 2.39,11.88C2.39,10.56 3.54,9.41 4.86,9.41M12,12.94C12.59,12.94 13.06,12.47 13.06,11.88C13.06,11.29 12.59,10.82 12,10.82C11.41,10.82 10.94,11.29 10.94,11.88C10.94,12.47 11.41,12.94 12,12.94M12,9.41C13.32,9.41 14.47,10.56 14.47,11.88C14.47,13.20 13.32,14.35 12,14.35C10.68,14.35 9.53,13.20 9.53,11.88C9.53,10.56 10.68,9.41 12,9.41Z"/>
              </svg>
              الأدوات
            </Link>
            <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
            <span className="text-slate-800 font-semibold bg-orange/10 px-3 py-1 rounded-full text-xs">{product.toolName}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-white/20">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 h-[500px]">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-10 group"
                >
                  <svg
                    className={`w-6 h-6 transition-all duration-300 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400 group-hover:text-red-400 group-hover:scale-110'}`}
                    fill={favorites.includes(product.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Image zoom indicator */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                  <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <span className="text-xs text-slate-600 font-medium">انقر للتكبير</span>
                </div>

                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.toolName}
                  className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay for better image integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-white/30">
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                          selectedImageIndex === index
                            ? 'border-orange shadow-lg shadow-orange/25 scale-105'
                            : 'border-white/60 hover:border-orange/50'
                        }`}
                      >
                        <img src={image} alt={`${product.toolName} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="mt-8 space-y-6">
              {/* Main Info Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-white/20">
                <div className="bg-gradient-to-r from-orange/10 via-red/5 to-orange/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange to-red-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.14,12.94C19.73,12.94 20.20,12.47 20.20,11.88C20.20,11.29 19.73,10.82 19.14,10.82C18.55,10.82 18.08,11.29 18.08,11.88C18.08,12.47 18.55,12.94 19.14,12.94M19.14,9.41C20.46,9.41 21.61,10.56 21.61,11.88C21.61,13.20 20.46,14.35 19.14,14.35C17.82,14.35 16.67,13.20 16.67,11.88C16.67,10.56 17.82,9.41 19.14,9.41M4.86,12.94C5.45,12.94 5.92,12.47 5.92,11.88C5.92,11.29 5.45,10.82 4.86,10.82C4.27,10.82 3.80,11.29 3.80,11.88C3.80,12.47 4.27,12.94 4.86,12.94M4.86,9.41C6.18,9.41 7.33,10.56 7.33,11.88C7.33,13.20 6.18,14.35 4.86,14.35C3.54,14.35 2.39,13.20 2.39,11.88C2.39,10.56 3.54,9.41 4.86,9.41M12,12.94C12.59,12.94 13.06,12.47 13.06,11.88C13.06,11.29 12.59,10.82 12,10.82C11.41,10.82 10.94,11.29 10.94,11.88C10.94,12.47 11.41,12.94 12,12.94M12,9.41C13.32,9.41 14.47,10.56 14.47,11.88C14.47,13.20 13.32,14.35 12,14.35C10.68,14.35 9.53,13.20 9.53,11.88C9.53,10.56 10.68,9.41 12,9.41Z"/>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">تفاصيل المنتج</h2>
                  </div>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Tool Information */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">معلومات الأداة</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'اسم الأداة', value: product.toolName, icon: '🔧' },
                        { label: 'الفئة', value: product.category, icon: '📦' },
                        { label: 'العلامة التجارية', value: product.brand || 'غير محدد', icon: '🏷️' },
                        { label: 'الموديل', value: product.model || 'غير محدد', icon: '🔢' },
                        { label: 'حالة الأداة', value: product.condition, icon: '⭐' },
                        { label: 'السعر اليومي', value: `${product.dailyPrice} درهم`, icon: '💰', highlight: true }
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r ${item.highlight ? 'from-orange/10 to-red/10 border-orange/20' : 'from-slate-50 to-blue-50/30 border-slate-200/50'} border rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-slate-600 text-sm">{item.label}:</span>
                            </div>
                            <span className={`font-semibold ${item.highlight ? 'text-orange text-lg' : 'text-slate-800'}`}>
                              {item.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">وصف الأداة</h3>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200/50">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">{product.description}</p>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  {product.specifications && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8.5,7A1.5,1.5 0 0,1 10,8.5A1.5,1.5 0 0,1 8.5,10A1.5,1.5 0 0,1 7,8.5A1.5,1.5 0 0,1 8.5,7M15.5,7A1.5,1.5 0 0,1 17,8.5A1.5,1.5 0 0,1 15.5,10A1.5,1.5 0 0,1 14,8.5A1.5,1.5 0 0,1 15.5,7M8.5,14A1.5,1.5 0 0,1 10,15.5A1.5,1.5 0 0,1 8.5,17A1.5,1.5 0 0,1 7,15.5A1.5,1.5 0 0,1 8.5,14M15.5,14A1.5,1.5 0 0,1 17,15.5A1.5,1.5 0 0,1 15.5,17A1.5,1.5 0 0,1 14,15.5A1.5,1.5 0 0,1 15.5,14Z"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">المواصفات التقنية</h3>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50/30 rounded-xl p-6 border border-purple-200/50">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">{product.specifications}</p>
                      </div>
                    </div>
                  )}

                  {/* Location Information */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">معلومات الموقع</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-red-50 to-pink-50/30 border border-red-200/50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🏙️</span>
                            <span className="text-slate-600 text-sm">المدينة:</span>
                          </div>
                          <span className="font-semibold text-slate-800">{product.city}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50/30 border border-red-200/50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🏠</span>
                            <span className="text-slate-600 text-sm">الحي:</span>
                          </div>
                          <span className="font-semibold text-slate-800">{product.neighborhood}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-orange mb-2">
                  {product.dailyPrice} درهم
                  <span className="text-sm text-gray-600 font-normal"> / {product.priceUnit}</span>
                </div>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full border border-green-200">
                    {product.status_product}
                  </span>
                  <span className="bg-gray-50 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {product.condition}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-6 text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{product.city}، {product.neighborhood}</span>
              </div>

              {/* Tool Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-dark-blue mb-3">ملخص المنتج</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الفئة:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  {product.brand && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">العلامة التجارية:</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                  )}
                  {product.model && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">الموديل:</span>
                      <span className="font-medium">{product.model}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <span className="font-medium">{product.condition}</span>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-orange text-white py-3 rounded-lg font-medium hover:bg-orange/90 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  اتصل الآن
                </button>
                
                {product.contactWhatsApp && (
                  <a
                    href={`https://wa.me/${product.contactWhatsApp.replace(/\s+/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    واتساب
                  </a>
                )}
              </div>

              {/* Owner Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-blue">{product.owner}</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-orange font-bold">{product.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-orange' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-2">آخر ظهور: {product.lastSeen}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>معلومات الاتصال:</strong><br/>
                      الهاتف: {product.contactPhone}<br/>
                      {product.contactWhatsApp && `واتساب: ${product.contactWhatsApp}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-dark-blue">معلومات الاتصال</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <p className="font-medium">الهاتف</p>
                  <a href={`tel:${product.contactPhone}`} className="text-orange hover:underline">{product.contactPhone}</a>
                </div>
              </div>

              {product.contactWhatsApp && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <div>
                    <p className="font-medium">واتساب</p>
                    <a
                      href={`https://wa.me/${product.contactWhatsApp.replace(/\s+/g, '').replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      {product.contactWhatsApp}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
