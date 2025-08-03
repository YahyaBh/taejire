import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'دليل اختيار الأدوات المناسبة لمشروع البناء',
    excerpt: 'تعرف على كيفية اختيار الأدوات والمعدات المناسبة لنوع مشروعك، سواء كان بناء منزل أو تجديد شقة أو أعمال البريكولاج.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=400',
    date: '2024-01-15',
    category: 'نصائح البناء',
    readTime: '5 دقائق'
  },
  {
    id: 2,
    title: 'أهمية صيانة الأدوات والمعدات',
    excerpt: '��صائح مهمة حول كيفية المحافظة على الأدوات والمعدات لضمان عملها بكفاءة أطول وتجنب الأعطال المفاجئة.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=400',
    date: '2024-01-10',
    category: 'الصيانة',
    readTime: '7 دقائق'
  },
  {
    id: 3,
    title: 'أساسيات السلامة عند استخدام أدوات البناء',
    excerpt: 'معايير الأمان الضرورية والاحتياطات الواجب اتخاذها عند التعامل مع أدوات ومعدات البناء المختلفة.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/8bb45ea1b25d7a776cfdea40181b3995ae041545?width=400',
    date: '2024-01-05',
    category: 'السلامة',
    readTime: '6 دقائق'
  },
  {
    id: 4,
    title: 'كيفية تقدير تكلفة استئجار الأدوات',
    excerpt: 'دليل شامل لحساب التكلفة المتوقعة لاستئجار الأدوات والمعدات حسب نوع المشروع ومدة الاستخدام.',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=400',
    date: '2024-01-01',
    category: 'التخط��ط المالي',
    readTime: '8 دقائق'
  }
];

const categories = [
  'الكل',
  'نصائح البناء',
  'الصيانة',
  'السلامة',
  'التخطيط المالي',
  'أدوات متخصصة'
];

export default function Blog() {
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
              <Link to="/blog" className="text-orange font-medium text-sm lg:text-base">المدونة</Link>
              <Link to="/contact" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الاتصال</Link>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal/20 to-teal/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-4">
            مدونة منصة تأجير الأدوات
          </h1>
          <p className="text-lg md:text-xl text-dark-blue max-w-2xl mx-auto">
            نصائح مفيدة ودلائل شاملة حول استخدام أدوات البناء والبريكولاج
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base transition-colors ${
                index === 0 
                  ? 'bg-orange text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-orange hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              {/* Post Image */}
              <div className="relative h-48 bg-gray-50">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-orange text-white text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 text-right">
                {/* Meta Info */}
                <div className="flex justify-between items-center text-gray-500 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <span>{post.readTime}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                </div>

                {/* Post Title */}
                <h2 className="text-xl font-bold text-dark-blue mb-3 line-clamp-2">
                  {post.title}
                </h2>

                {/* Post Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-orange font-medium hover:text-orange/80 transition-colors"
                >
                  <span>اقرأ المزيد</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-dark-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              اشترك في النشرة الإخبارية
            </h2>
            <p className="text-white/80 mb-8">
              احصل على أحدث النصائح والمقالات حول أدوات البناء والبريكولاج
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg text-right outline-none"
                dir="rtl"
              />
              <button className="bg-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-orange/90 transition-colors">
                اشترك
              </button>
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
                منصة لتأجير أدوات البناء والبريكولاج بالمغرب. نربط بين أصحاب الأدوات والباحثين عن معدات مناسبة لمشاريعهم.
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
