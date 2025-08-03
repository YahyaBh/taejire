import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  MapPin,
  Phone,
  Heart,
  Grid,
  ArrowLeft,
  Camera,
  X,
  Check,
  Loader2,
} from "lucide-react";
import {
  createProduct,
  mapCategoryToEnglish,
  mapConditionToEnglish,
  type StrapiProduct,
} from "@shared/strapi";

export default function AddEquipment() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    condition: "",
    description: "",
    specs: "",
    price_per_day: "",
    city: "",
    district: "",
    phone_number: "",
    whatsapp_number: "",
    images: [] as File[],
    terms_accepted: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    "معدات الحفر",
    "أدوات البناء",
    "الأدوات الكهربائية",
    "الأدوات الميكانيكية",
    "معدات الرفع",
    "أدوات القياس",
    "معدات السلامة",
    "أخرى",
  ];

  const conditions = [
    "جديد",
    "مستعمل - حالة جيدة",
    "مستعمل - حالة متوسطة",
  ];

  const cities = [
    "الرباط",
    "الدار البيضاء",
    "فاس",
    "مراكش",
    "أكادير",
    "طنجة",
    "تطوان",
    "وجدة",
    "القنيطرة",
    "مكناس",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 6 - formData.images.length);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formData.terms_accepted) {
        throw new Error("يجب الموافقة على شروط الاستخدام");
      }

      if (!formData.images || formData.images.length === 0) {
        throw new Error("يجب إضافة صورة واحدة على الأقل للأداة");
      }

      const product: StrapiProduct = {
        name: formData.name,
        category: mapCategoryToEnglish(formData.category),
        brand: formData.brand || undefined,
        model: formData.model || undefined,
        condition: mapConditionToEnglish(formData.condition),
        price_per_day: formData.price_per_day ? parseFloat(formData.price_per_day) : 0,
        description: formData.description,
        specs: formData.specs || undefined,
        city: formData.city,
        district: formData.district,
        phone_number: formData.phone_number,
        whatsapp_number: formData.whatsapp_number || undefined,
        terms_accepted: formData.terms_accepted,
        status_product: "pending",
        images: formData.images,
      };

      await createProduct(product);
      // setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting product:", error);
      setSubmitError(
        error instanceof Error ? error.message : "حدث خطأ أثناء إرسال البيانات"
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white" dir="rtl">
        {/* Header */}
        <header className="border-b-2 border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                  alt="Logo"
                  className="h-12"
                />
              </div>
              <Link
                to="/"
                className="text-dark-blue hover:text-orange transition-colors flex items-center gap-2 font-arabic"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span>العودة للرئيسية</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-dark-blue mb-4">
              تم استلام طلبكم بنجاح!
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              شكراً لكم على إضافة أداتكم إلى منصتنا. سيتم مراجعة المعلومات
              والصور المرسلة من قبل فريقنا وسيتم نشر إعلانكم في أقرب وقت ممكن.
            </p>
            <div className="bg-orange/10 border border-orange/20 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-orange mb-2">
                ما هي الخطوات التالية؟
              </h3>
              <ul className="text-right space-y-2 text-gray-700">
                <li>• مراجعة المعلومات والصور</li>
                <li>• التحقق من صحة البيانات</li>
                <li>• نشر الإعلان على المنصة</li>
                <li>• إشعاركم عبر الهاتف عند النشر</li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <Link
                to="/add-equipment"
                onClick={() => window.location.reload()}
                className="bg-teal text-dark-blue px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors"
              >
                إضافة أداة أخرى
              </Link>
              <Link
                to="/"
                className="bg-dark-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-dark-blue/90 transition-colors"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279"
                alt="Logo"
                className="h-12"
              />
            </div>
            <Link
              to="/"
              className="text-dark-blue hover:text-orange transition-colors flex items-center gap-2 font-arabic"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-dark-blue mb-4 font-arabic">
              أضف أداتك للإيجار
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-arabic">
              شارك أدواتك مع الآلاف من الباحثين عن معدات البناء والبريكولاج
              واحصل على دخل إضافي
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tool Information */}
            <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-dark-blue mb-6 text-right font-arabic">
                معلومات الأداة
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                    اسم الأداة *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="مثال: مثقاب كهربائي بوش"
                    required
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الفئة *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العلامة التجارية
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="مثال: بوش، ماكيتا، ديوالت"
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموديل
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="رقم الموديل أو الاسم التجاري"
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حالة الأداة *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    required
                  >
                    <option value="">اختر الحالة</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر اليومي (درهم) *
                  </label>
                  <input
                    type="number"
                    name="price_per_day"
                    value={formData.price_per_day}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف الأداة *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                  placeholder="اكتب وصفاً مفصلاً للأداة واستخداماتها..."
                  required
                />
              </div>

              <div className="mt-6 text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المواصفات التقنية
                </label>
                <textarea
                  name="specs"
                  value={formData.specs}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                  placeholder="القوة، الوزن، الأبعاد، وأي مواصفات تقنية أخرى..."
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-dark-blue mb-6 text-right">
                معلومات الموقع
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المدينة *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    required
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحي *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="مثال: المدينة القديمة، أكدال، المعاريف"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-dark-blue mb-6 text-right">
                معلومات التواصل
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="+212 6XX XXX XXX"
                    required
                  />
                </div>

                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الواتساب
                  </label>
                  <input
                    type="tel"
                    name="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-right"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-dark-blue mb-6 text-right">
                صور الأداة
              </h2>

              <div className="text-right mb-6">
                <p className="text-gray-600 mb-2">
                  أضف صوراً واضحة للأداة (حد أقصى 6 صور)
                </p>
                <p className="text-sm text-gray-500">
                  الصور الجيدة تزيد من فرص تأجير أداتك
                </p>
              </div>

              {/* Image Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                  ? "border-teal bg-teal/5"
                  : formData.images.length > 0
                    ? "border-teal"
                    : "border-gray-300"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      اسحب الصور هنا أو انقر للاختيار
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG - حد أقصى 5 ميجابايت لكل صورة
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="bg-teal text-dark-blue px-6 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors cursor-pointer inline-flex items-center gap-2 font-arabic"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span>اختر الصور</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 text-right">
                    الصور المختارة ({formData.images.length}/6)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`صورة ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Terms and Submit */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-right space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    أوافق على{" "}
                    <Link to="/terms" className="text-teal hover:underline">
                      شروط الاستخدام
                    </Link>{" "}
                    و{" "}
                    <Link to="/privacy" className="text-teal hover:underline">
                      سياسة الخصوصية
                    </Link>
                    . أفهم أن المنصة هي وسيط فقط وليست مسؤولة عن المعاملات بين
                    المستخدمين.
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="review"
                    required
                    className="mt-1 w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                  />
                  <label htmlFor="review" className="text-sm text-gray-700">
                    أفهم أن إعلاني سيخضع للمراجعة قبل النشر وقد يستغرق ذلك 24-48
                    ساعة
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-right">
                    {submitError}
                  </p>
                </div>
              )}

              <div className="mt-8 flex gap-4 justify-center">
                <Link
                  to="/"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal text-dark-blue px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors flex items-center gap-2 font-arabic disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                  <span>
                    {isSubmitting ? "جاري الإرسال..." : "إرسال للمراجعة"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
