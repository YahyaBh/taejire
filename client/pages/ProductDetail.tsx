import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import { getProduct } from "../../shared/strapi";

// Product data structure that matches AddEquipment form fields
interface ProductDetail {
  documentId?: string; // Optional document ID for Strapi
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

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tool-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (!id) return;
    setProduct(null);
    (async () => {
      try {
        const res = await getProduct(id);
        console.log(res);
        
        if (!res || (res as any).error) {
          setProduct(null);
          return;
        }

        if ((res as any).data && (res as any).data) {
          const attr = (res as any).data;
          setProduct({
            documentId : (res as any).data.documentId || "",
            id: (res as any).data.id,
            toolName: attr.name || "--",
            category: attr.category || "--",
            brand: attr.brand || "--",
            model: attr.model || "--",
            condition: attr.condition || "--",
            description: attr.description || "--",
            specifications: attr.specs || "----",
            dailyPrice: attr.price_per_day || 0,
            priceUnit: "اليوم",
            city: attr.city || "--",
            neighborhood: attr.district || "--",
            contactPhone: attr.phone_number || "--",
            contactWhatsApp: attr.whatsapp_number || "--",
            images: Array.isArray(attr.images?.data)
              ? attr.images.data.map((img: any) =>
                  img.attributes?.url?.startsWith("http")
                    ? img.attributes.url
                    : `${import.meta.env.VITE_STRAPI_URL || ""}${img.attributes.url}`
                )
              : [],
            owner: attr.owner_name || "--",
            rating: attr.rating || 0,
            reviews: attr.reviews || 0,
            lastSeen: attr.last_seen || "-",
            status_product: attr.status_product || "",
          });
        } else {
          setProduct(null);
        }
      } catch {
        setProduct(null);
      }
    })();
  }, [id]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("tool-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  if (!product) {
    return (
      <div
        className="min-h-screen bg-white font-arabic flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange/20 border-t-orange mx-auto mb-4"></div>
          <p className="text-dark-blue font-medium">
            جاري تحميل بيانات المنتج...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {/* Top Banner */}
      <div className="bg-orange text-white py-2">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm font-medium">
            قوة وقيمة ممتازة
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-2 border-gray-200 py-4 sticky top-0 bg-white z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="شعار منصة تأجير الأدوات"
                className="h-8 md:h-12"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                to="/"
                className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base"
              >
                الرئيسية
              </Link>
              <Link
                to="/tools"
                className="text-orange font-medium text-sm lg:text-base"
              >
                الادوات
              </Link>
              <Link
                to="/blog"
                className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base"
              >
                المدونة
              </Link>
              <Link
                to="/contact"
                className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base"
              >
                الاتصال
              </Link>
              <Link
                to="/about"
                className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base"
              >
                من نحن
              </Link>
            </nav>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <Link to="/favorites">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-dark-blue hover:text-orange cursor-pointer transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
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
                className="bg-dark-blue text-white px-2 md:px-4 lg:px-6 py-2 rounded-lg hover:bg-dark-blue/90 transition-colors flex items-center gap-2 text-xs md:text-sm lg:text-base"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <span className="hidden sm:inline">أضف معداتك</span>
                <span className="sm:hidden">أضف</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-cream py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-600 hover:text-orange transition-colors"
            >
              الرئيسية
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
            <Link
              to="/tools"
              className="text-gray-600 hover:text-orange transition-colors"
            >
              الأدوات
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-dark-blue font-medium">
              {product.toolName}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Product Images and Details */}
          <div className="lg:col-span-2">
            {/* Product Images */}
            <div className="bg-white border-2 border-gray-200 rounded-xl mb-6 overflow-hidden">
              <div className="relative">
                <div className="w-64 h-64 bg-cream mx-auto">
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.toolName}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200"
                  >
                    <svg
                      className={`w-5 h-5 ${favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
                  <div className="flex gap-3 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index
                            ? "border-orange"
                            : "border-gray-200 hover:border-orange/50"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.toolName} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">
                {product.toolName}
              </h1>

              {/* Product Status */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full border border-green-200">
                  {product.status_product}
                </span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {product.condition}
                </span>
                <span className="bg-orange/10 text-orange text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      العلامة التجارية:
                    </span>
                    <span className="font-semibold text-dark-blue">
                      {product.brand}
                    </span>
                  </div>
                </div>
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">الموديل:</span>
                    <span className="font-semibold text-dark-blue">
                      {product.model}
                    </span>
                  </div>
                </div>
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">المدينة:</span>
                    <span className="font-semibold text-dark-blue">
                      {product.city}
                    </span>
                  </div>
                </div>
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">الحي:</span>
                    <span className="font-semibold text-dark-blue">
                      {product.neighborhood}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-dark-blue mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  وصف الأداة
                </h3>
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-bold text-dark-blue mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 2C13.8 2 12.3 2.9 11.8 4.2C11.3 2.9 9.8 2 8.1 2C5.9 2 4.1 3.8 4.1 6C4.1 8.2 5.9 10 8.1 10H11.8C11.3 11.1 9.8 12 8.1 12C5.9 12 4.1 13.8 4.1 16C4.1 18.2 5.9 20 8.1 20C9.8 20 11.3 19.1 11.8 17.8C12.3 19.1 13.8 20 15.5 20C17.7 20 19.5 18.2 19.5 16C19.5 13.8 17.7 12 15.5 12C13.8 12 12.3 12.9 11.8 14.2V9.8C12.3 11.1 13.8 12 15.5 12C17.7 12 19.5 10.2 19.5 8C19.5 5.8 17.7 4 15.5 4Z" />
                  </svg>
                  المواصفات التقنية
                </h3>
                <div className="bg-cream border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.specifications}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Pricing and Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-24">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="bg-orange border-2 border-orange rounded-lg p-4 mb-4">
                  <div className="text-3xl font-bold text-white">
                    {product.dailyPrice}
                    <span className="text-lg font-normal"> درهم</span>
                  </div>
                  <div className="text-orange-100 text-sm">
                    / {product.priceUnit}
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-cream border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-dark-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-dark-blue">
                      {product.owner}
                    </div>
                    <div className="text-sm text-gray-600">
                      آخر ظهور: {product.lastSeen}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{product.reviews} تقييم</span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-orange border-2 border-orange text-white py-3 rounded-lg font-bold hover:bg-orange/90 transition-colors"
                >
                  عرض معلومات الاتصال
                </button>
                <a
                  href={`https://wa.me/${product.contactWhatsApp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 border-2 border-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
                  </svg>
                  تواصل عبر واتساب
                </a>
                <button className="w-full bg-teal border-2 border-teal text-dark-blue py-3 rounded-lg font-bold hover:bg-teal/90 transition-colors flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  مشاركة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-dark-blue">
                معلومات الاتصال
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-cream border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">رقم الهاتف</div>
                    <div className="font-bold text-dark-blue">
                      {product.contactPhone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-cream border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">واتساب</div>
                    <div className="font-bold text-dark-blue">
                      {product.contactWhatsApp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Similar Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">
            منتجات مشابهة
          </h2>
          <p className="text-gray-600">اكتشف المزيد من الأدوات المماثلة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard
            tool={{
              id: 2,
              name: "منشار كهربائي ديوالت",
              description: "قطع دقيق للخشب والمعادن الرقيقة",
              price: 80,
              priceUnit: "اليوم",
              location: "سلا، طابريكت",
              category: "أدوات القطع",
              condition: "جديد",
              status_product: "للايجار",
              owner: "أحمد الحسني",
              rating: 4.9,
              reviews: 850,
              lastSeen: "ساعة واحدة",
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=244",
              isFavorite: false,
            }}
            isFavorite={favorites.includes(2)}
            onToggleFavorite={toggleFavorite}
            viewMode="grid"
          />

          <ToolCard
            tool={{
              id: 3,
              name: "مولد كهربائي هوندا",
              description: "طاقة موثوقة للمواقع البعيدة، 5000 واط",
              price: 200,
              priceUnit: "اليوم",
              location: "الرباط، أكدال",
              category: "مولدات",
              condition: "مستعمل",
              status_product: "للايجار",
              owner: "يوسف التازي",
              rating: 4.7,
              reviews: 720,
              lastSeen: "3 ساعات",
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=244",
              isFavorite: false,
            }}
            isFavorite={favorites.includes(3)}
            onToggleFavorite={toggleFavorite}
            viewMode="grid"
          />

          <ToolCard
            tool={{
              id: 4,
              name: "خلاط إسمنت صغير",
              description: "مثالي للمشاريع الصغيرة والمتوسطة، سعة 120 لتر",
              price: 120,
              priceUnit: "اليوم",
              location: "سلا، المدينة",
              category: "معدات الخلط",
              condition: "جديد",
              status_product: "للايجار",
              owner: "عبد الله السلاوي",
              rating: 4.8,
              reviews: 650,
              lastSeen: "30 دقيقة",
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=244",
              isFavorite: false,
            }}
            isFavorite={favorites.includes(4)}
            onToggleFavorite={toggleFavorite}
            viewMode="grid"
          />

          <ToolCard
            tool={{
              id: 5,
              name: "سلم ألومنيوم قابل للطي",
              description: "سلم آمن وقوي، ارتفاع 3 أمتار",
              price: 60,
              priceUnit: "اليوم",
              location: "الرباط، حسان",
              category: "سلالم وسقالات",
              condition: "جديد",
              status_product: "للايجار",
              owner: "خالد البناني",
              rating: 4.6,
              reviews: 430,
              lastSeen: "5 ساعات",
              image:
                "https://api.builder.io/api/v1/image/assets/TEMP/02fd06bf781fced05d4e438e903380775eb37b26?width=244",
              isFavorite: false,
            }}
            isFavorite={favorites.includes(5)}
            onToggleFavorite={toggleFavorite}
            viewMode="grid"
          />
        </div>

        <div className="text-center mt-8">
          <Link
            to="/tools"
            className="bg-teal text-dark-blue px-6 py-3 rounded-lg font-bold hover:bg-teal/90 transition-colors inline-flex items-center gap-2"
          >
            <span>عرض جميع الأدوات</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center md:text-right lg:col-span-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="شعار منصة تأجير الأدوات"
                className="h-10 md:h-12 mb-4 brightness-0 invert mx-auto md:mx-0"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                منصة لتأجير أدوات البناء والبر��كولاج بالمغرب. نربط بين أصحاب
                الأدوات والباحثين عن معدات مناسبة لمشاريعهم.
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">روابط مفيدة</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-teal transition-colors"
                  >
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-teal transition-colors"
                  >
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-teal transition-colors"
                  >
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-teal transition-colors"
                  >
                    شروط الاستخدام
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">الفئات</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    to="/category/electrical-handheld"
                    className="hover:text-teal transition-colors"
                  >
                    الأدوات الكهربائية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/ladders-scaffolding"
                    className="hover:text-teal transition-colors"
                  >
                    السلالم والسقالات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/paint-finishing"
                    className="hover:text-teal transition-colors"
                  >
                    معدات الطلاء
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/hand-tools"
                    className="hover:text-teal transition-colors"
                  >
                    الأدوات اليدوية
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">+212 6XX XXX XXX</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">contact@toolsrental.ma</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-sm">الرباط، المغرب</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
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
