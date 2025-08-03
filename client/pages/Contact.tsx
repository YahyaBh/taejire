import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      title: 'الهاتف',
      value: '+212 6XX XXX XXX',
      description: 'متاح 24/7 للاستفسارات العاجلة'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'البريد الإلكتروني',
      value: 'contact@toolsrental.ma',
      description: 'رد خلال 24 ساعة'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: 'العنوان',
      value: 'الرباط، المغرب',
      description: 'مكتبنا ��لرئيسي'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      ),
      title: 'واتساب',
      value: '+212 6XX XXX XXX',
      description: 'تواصل سريع ومباشر'
    }
  ];

  const workingHours = [
    { day: 'الإثنين - الجمعة', hours: '8:00 - 18:00' },
    { day: 'السبت', hours: '9:00 - 15:00' },
    { day: 'الأحد', hours: 'مغلق' }
  ];

  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {/* Header */}
      <header className="border-b-2 border-gray-200 py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/86028ac2828b5d94bcb31edd5090cb07a26c25d4?width=279" 
                alt="شعار منصة تأجير الأدوات" 
                className="h-8 md:h-12"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الرئيسية</Link>
              <Link to="/tools" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الادوات</Link>
              <Link to="/blog" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">المدونة</Link>
              <Link to="/contact" className="text-orange font-medium text-sm lg:text-base">الاتصال</Link>
              <Link to="/about" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">من نحن</Link>
            </nav>

            {/* Add Equipment Button */}
            <Link
              to="/add-equipment"
              className="bg-dark-blue text-white px-2 md:px-4 lg:px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 text-xs md:text-sm lg:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              <span className="hidden sm:inline">أضف معداتك</span>
              <span className="sm:hidden">أضف</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-orange transition-colors">الرئيسية</Link>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
            <span className="text-dark-blue font-medium">اتصل بنا</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal/20 to-teal/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg md:text-xl text-dark-blue max-w-2xl mx-auto">
            نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو مساعدة تحتاجها
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-orange">
                  {info.icon}
                </div>
              </div>
              <h3 className="text-dark-blue font-bold text-lg mb-2">{info.title}</h3>
              <p className="text-orange font-medium mb-2">{info.value}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-6 text-right">
              أرسل لنا رسالة
            </h2>
            
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-blue font-medium mb-2 text-right">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange text-right"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-dark-blue font-medium mb-2 text-right">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange text-right"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-dark-blue font-medium mb-2 text-right">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange text-right"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-dark-blue font-medium mb-2 text-right">
                  موضوع الرسالة *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange text-right"
                >
                  <option value="">اختر الموضوع</option>
                  <option value="general">استفسار عام</option>
                  <option value="rental">حول تأجير الأدوات</option>
                  <option value="support">دعم فني</option>
                  <option value="partnership">شراكة</option>
                  <option value="complaint">شكوى</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-blue font-medium mb-2 text-right">
                  الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange text-right resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange text-white py-3 rounded-lg font-medium hover:bg-orange/90 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>

          {/* Map & Working Hours */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p className="text-gray-600">خريطة الموقع</p>
                <p className="text-gray-500 text-sm">الرباط، المغرب</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-dark-blue mb-4 text-right">
                ساعات العمل
              </h3>
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-dark-blue font-medium">{schedule.hours}</span>
                    <span className="text-gray-600">{schedule.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-orange/10 to-orange/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-dark-blue mb-4 text-right">
                تواصل سريع
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+212600000000"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>واتساب</span>
                </a>
                <a
                  href="tel:+212600000000"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">
              أسئلة شائعة حول التواصل
            </h2>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-dark-blue font-bold mb-2">كم يستغرق الرد؟</h3>
              <p className="text-gray-600 text-sm">نرد على جميع الاستفسارات خلال 24 ساعة كحد أقصى</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-dark-blue font-bold mb-2">هل يمكن الاتصال خارج ساعات العمل؟</h3>
              <p className="text-gray-600 text-sm">نعم، عبر الواتساب للحالات العاجلة</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-dark-blue font-bold mb-2">هل ي��كن زيارة المكتب؟</h3>
              <p className="text-gray-600 text-sm">نعم، بعد تحديد موعد مسبق</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-dark-blue font-bold mb-2">كيف أتابع طلبي؟</h3>
              <p className="text-gray-600 text-sm">سنرسل لك رقم مرجعي لمتابعة طلبك</p>
            </div>
          </div>
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
                منصة لتأجير أدوات البناء والبريكولاج بالمغرب. نربط بين أصحاب الأدوات والباحثي�� عن معدات مناسبة لمشاريعهم.
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
                <li><Link to="/category/electrical-handheld" className="hover:text-teal transition-colors">الأدوات الكهربائية</Link></li>
                <li><Link to="/category/ladders-scaffolding" className="hover:text-teal transition-colors">السلالم والسقالات</Link></li>
                <li><Link to="/category/paint-finishing" className="hover:text-teal transition-colors">معدات الطلاء</Link></li>
                <li><Link to="/category/hand-tools" className="hover:text-teal transition-colors">الأدوات اليدوية</Link></li>
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
