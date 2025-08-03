import { useState } from "react";
import { Link } from "react-router-dom";
import ToolCard from "../components/ToolCard";

// Mock data for tools
const allTools = [
  {
    id: 1,
    name: "مثقاب كهربائي بوش",
    description: "مناسب لجميع انواع الحفر في الخشب والمعادن والخرسانة",
    price: 100,
    priceUnit: "اليوم",
    location: "الرباط، المدينة القديمة",
    category: "معدات الحفر",
    condition: "مستعمل",
    status: "للايجار",
    status_product: "متاح",
    owner: "مجاهد النجار",
    rating: 4.8,
    reviews: 1000,
    lastSeen: "ساعتان",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=244",
    isFavorite: false,
  },
  {
    id: 2,
    name: "منشار كهربائي ديوالت",
    description: "قطع دقيق للخشب والمعادن الرقيقة",
    price: 80,
    priceUnit: "اليوم",
    location: "سلا، طابريكت",
    category: "أدوات القطع",
    condition: "جديد",
    status: "للايجار",
    status_product: "متاح",
    owner: "أحمد الحسني",
    rating: 4.9,
    reviews: 850,
    lastSeen: "ساعة واحدة",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=244",
    isFavorite: false,
  },
  {
    id: 3,
    name: "مولد كهربائي هوندا",
    description: "طاقة موثوقة للمواقع البعيدة، 5000 واط",
    price: 200,
    priceUnit: "اليوم",
    location: "الرباط، أكدال",
    category: "مولدات",
    condition: "مستعمل",
    status: "للايجار",
    status_product: "متاح",
    owner: "يوسف التازي",
    rating: 4.7,
    reviews: 720,
    lastSeen: "3 ساعات",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=244",
    isFavorite: false,
  },
  {
    id: 4,
    name: "خلاط إسمنت صغ��ر",
    description: "مثالي للمشاريع الصغيرة والمتوسطة، سعة 120 لتر",
    price: 120,
    priceUnit: "اليوم",
    location: "سلا، المدينة",
    category: "معدات الخلط",
    condition: "جديد",
    status: "للايجار",
    status_product: "متاح",
    owner: "عبد الله السلاوي",
    rating: 4.8,
    reviews: 650,
    lastSeen: "30 دقيقة",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=244",
    isFavorite: false,
  },
  {
    id: 5,
    name: "سلم ألومنيوم قابل للطي",
    description: "سلم آمن وقوي، ارتفاع 3 أمتار",
    price: 60,
    priceUnit: "اليوم",
    location: "الرباط، حسان",
    category: "سلالم وسقالات",
    condition: "جديد",
    status: "للايجار",
    status_product: "متاح",
    owner: "خالد البناني",
    rating: 4.6,
    reviews: 430,
    lastSeen: "5 ساعات",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/02fd06bf781fced05d4e438e903380775eb37b26?width=244",
    isFavorite: false,
  },
  {
    id: 6,
    name: "رشاش طلاء كهربائي",
    description: "نتائج مثالية للطلاء الداخلي والخارجي",
    price: 90,
    priceUnit: "اليوم",
    location: "سلا، لقصيبة",
    category: "معدات الطلاء",
    condition: "مستعمل",
    status: "للايجار",
    status_product: "متاح",
    owner: "سعيد السلاوي",
    rating: 4.5,
    reviews: 320,
    lastSeen: "يوم واحد",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/0b20ea18c7be6ee0e972bf8fed9f7acf0262a986?width=244",
    isFavorite: false,
  },
  {
    id: 7,
    name: "شاكوش هدم كبير",
    description: "قوة هدم عالية للأعمال الثقيلة",
    price: 150,
    priceUnit: "اليوم",
    location: "الرباط، الرياض",
    category: "معدات الهدم",
    condition: "جديد",
    status: "للايجار",
    status_product: "متاح",
    owner: "محمد الرباطي",
    rating: 4.7,
    reviews: 890,
    lastSeen: "4 ساعات",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=244",
    isFavorite: false,
  },
  {
    id: 8,
    name: "مضخة مياه صغيرة",
    description: "لضخ المياه من الآبار والخزانات",
    price: 75,
    priceUnit: "اليوم",
    location: "سلا، العامرية",
    category: "معدات المياه",
    condition: "مستعمل",
    status: "للايجار",
    status_product: "متاح",
    owner: "فاطمة السلاوية",
    rating: 4.4,
    reviews: 520,
    lastSeen: "6 ساعات",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=244",
    isFavorite: false,
  },
];

const categories = [
  "الكل",
  "معدات الحفر",
  "أدوات القطع",
  "مولدات",
  "معدات الخلط",
  "سلالم وسقالات",
  "معدات الطلاء",
  "أدوات يدوية",
];

const locations = ["الكل", "الرباط", "سلا"];

const neighborhoods = {
  الكل: ["الكل"],
  الرباط: [
    "الكل",
    "المدينة القديمة",
    "أكدال",
    "الرياض",
    "حسان",
    "الشرفاء",
    "الأوقاف",
    "النكادة",
  ],
  سلا: [
    "الكل",
    "المدينة",
    "طابريكت",
    "لقصيبة",
    "سلا الجديدة",
    "بطانة",
    "العامرية",
    "حي السلام",
  ],
};

const conditions = ["الكل", "جديد", "مستعمل"];

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "price-low", label: "السعر: الأقل إلى الأعلى" },
  { value: "price-high", label: "السعر: الأعلى إلى الأقل" },
  { value: "rating", label: "التقييم ��لأعلى" },
  { value: "reviews", label: "الأكثر تقييماً" },
];

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLocation, setSelectedLocation] = useState("الكل");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("الكل");
  const [selectedCondition, setSelectedCondition] = useState("الكل");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tool-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleFavorite = (toolId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];

      localStorage.setItem("tool-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Get available neighborhoods for selected location
  const availableNeighborhoods =
    selectedLocation === "الكل"
      ? ["الكل"]
      : neighborhoods[selectedLocation] || ["الكل"];

  // Filter and sort tools
  const filteredTools = allTools
    .filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "الكل" || tool.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "الكل" || tool.location.includes(selectedLocation);
      const matchesNeighborhood =
        selectedNeighborhood === "الكل" ||
        tool.location.includes(selectedNeighborhood);
      const matchesCondition =
        selectedCondition === "الكل" || tool.condition === selectedCondition;
      const matchesPrice =
        tool.price >= priceRange[0] && tool.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesNeighborhood &&
        matchesCondition &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="شعار منصة تأجير الأدوات"
                className="h-8 md:h-10"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange transition-colors"
              >
                الرئيسية
              </Link>
              <Link to="/tools" className="text-orange font-semibold">
                الادوات
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-orange transition-colors"
              >
                المدونة
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange transition-colors"
              >
                الاتصال
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange transition-colors"
              >
                من نحن
              </Link>
            </nav>

            {/* Add Equipment & Favorites */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Link to="/favorites">
                  <svg
                    className="w-6 h-6 text-gray-600 hover:text-orange cursor-pointer transition-colors"
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
                className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange/90 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
      <div className="bg-white border-b py-3">
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
            <span className="text-orange font-medium">الأدوات</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            الأدوات المتاحة للإيجار
          </h1>
          <p className="text-gray-600">
            اكتشف مجموعة واسعة من الأدوات والمعدات
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="البحث عن الأدوات..."
              className="w-full px-12 py-3 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange hover:bg-orange/90 px-4 py-2 rounded-lg text-white font-medium transition-colors">
              بحث
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-72 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                الفلاتر
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدينة
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setSelectedNeighborhood("الكل");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Neighborhood Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحي
                </label>
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 disabled:opacity-50"
                  disabled={selectedLocation === "الكل"}
                >
                  {availableNeighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحالة
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نطاق السعر
                </label>
                <div className="mb-3">
                  <span className="text-orange font-semibold">
                    {priceRange[0]} - {priceRange[1]} درهم/اليوم
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("الكل");
                  setSelectedLocation("الكل");
                  setSelectedNeighborhood("الكل");
                  setSelectedCondition("الكل");
                  setPriceRange([0, 500]);
                  setSelectedSort("newest");
                }}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-sm">عرض:</span>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-orange text-white"
                          : "text-gray-600 hover:text-orange"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-orange text-white"
                          : "text-gray-600 hover:text-orange"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm">
                    <span className="font-semibold text-orange">
                      {filteredTools.length}
                    </span>{" "}
                    من أصل {allTools.length} أداة
                  </span>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-right outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tools Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={favorites.includes(tool.id)}
                  onToggleFavorite={toggleFavorite}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    لم يتم العثور على أدوات
                  </h3>
                  <p className="text-gray-600 mb-4">
                    جرب تغيير معايير البحث أو الفلاتر
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("الكل");
                      setSelectedLocation("الكل");
                      setSelectedNeighborhood("الكل");
                      setSelectedCondition("الكل");
                      setPriceRange([0, 500]);
                    }}
                    className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange/90 transition-colors"
                  >
                    إعادة تعيين البحث
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center md:text-right">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="شعار منصة تأجير الأدوات"
                className="h-8 mb-4 brightness-0 invert mx-auto md:mx-0"
              />
              <p className="text-gray-300 text-sm">
                منصة تأجير أدوات البناء والبريكولاج بالمغرب
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-3">روابط مفيدة</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    سياسة ��لخصوصية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    شروط الاستخدام
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-3">الفئات</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    to="/category/drilling"
                    className="hover:text-white transition-colors"
                  >
                    معدات الحفر
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/cutting"
                    className="hover:text-white transition-colors"
                  >
                    أدوات القطع
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/generators"
                    className="hover:text-white transition-colors"
                  >
                    المولدات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/ladders"
                    className="hover:text-white transition-colors"
                  >
                    السلالم
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-3">تواصل معنا</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span>+212 6XX XXX XXX</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span>contact@toolsrental.ma</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 منصة تأجير الأدوات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
