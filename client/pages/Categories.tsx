import { Link } from 'react-router-dom';

const allCategories = [
  {
    id: 'electrical-handheld',
    name: 'الأدوات الكهربائية اليدوية',
    description: 'مثاقب كهربائية، مناشير، آلات صنفرة ومطارق كهربائية',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/e3d8e7c5d51c79991fb5574348055ff4532521e7?width=48',
    toolsCount: 45,
    color: 'bg-blue-500'
  },
  {
    id: 'ladders-scaffolding',
    name: 'السلالم والسقالات',
    description: 'سلالم الألومنيوم، سقالات متنقلة ومعدات السلامة',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/02fd06bf781fced05d4e438e903380775eb37b26?width=48',
    toolsCount: 28,
    color: 'bg-green-500'
  },
  {
    id: 'paint-finishing',
    name: 'معدات الطلاء والتشطيبات',
    description: 'رشاشات طلاء، فرش، رولات وخلاطات طلاء',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/0b20ea18c7be6ee0e972bf8fed9f7acf0262a986?width=48',
    toolsCount: 32,
    color: 'bg-purple-500'
  },
  {
    id: 'hand-tools',
    name: 'الأدوات اليدوية',
    description: 'مطارق، مفاتيح، مفكات وأدوات القياس',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/11042a150d8fa5f0ed02e7e590b16241115ec45f?width=48',
    toolsCount: 67,
    color: 'bg-orange'
  },
  {
    id: 'heavy-machinery',
    name: 'المعدات الثقيلة',
    description: 'حفارات، رافعات ومعدات البناء الثقيلة',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/2893ad07c734518a4f6dbcfbc870a1bd75b433ae?width=48',
    toolsCount: 15,
    color: 'bg-red-500'
  },
  {
    id: 'generators-compressors',
    name: 'المولدات والضواغط',
    description: 'مولدات كهربائية، ضواغط هواء ومعدات طاقة',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/6b567352cd6290cf151bdb707f4089668212d300?width=48',
    toolsCount: 22,
    color: 'bg-teal'
  },
  {
    id: 'concrete-tools',
    name: 'معدات الخرسانة',
    description: 'خلاطات إسمنت، منشر خرسانة ومعدات صب',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/8f801032aeb3bf5392e41f9f39bb16158cd4febf?width=48',
    toolsCount: 19,
    color: 'bg-gray-600'
  },
  {
    id: 'safety-equipment',
    name: 'معدات السلامة',
    description: 'خوذات أمان، أحزمة سلامة ومعدات الحماية',
    icon: 'https://api.builder.io/api/v1/image/assets/TEMP/e3d8e7c5d51c79991fb5574348055ff4532521e7?width=48',
    toolsCount: 38,
    color: 'bg-yellow-500'
  }
];

export default function Categories() {
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
                alt="شعار منصة تأجير ��لأدوات" 
                className="h-8 md:h-12"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link to="/" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الرئيسية</Link>
              <Link to="/tools" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">الادوات</Link>
              <Link to="/blog" className="text-dark-blue hover:text-orange transition-colors text-sm lg:text-base">المدونة</Link>
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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-orange transition-colors">الرئيسية</Link>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
            <span className="text-dark-blue font-medium">جميع الفئات</span>
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-blue mb-4">
            جميع فئات الأدوات
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            اكتشف مجموعتنا الواسعة من فئات الأدوات والمعدات المتاحة للإيجار
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              {/* Category Icon & Color */}
              <div className={`${category.color} p-6 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-16 h-16 mx-auto mb-4 relative z-10"
                />
                <h3 className="text-white font-bold text-lg relative z-10">
                  {category.name}
                </h3>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-orange font-bold">
                      {category.toolsCount}
                    </span>
                    <span className="text-gray-500 text-sm">أداة متاحة</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-orange group-hover:text-orange/80 transition-colors">
                    <span className="text-sm font-medium">تصفح</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-orange/10 to-orange/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">
            إحصائيات المنصة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange mb-2">
                {allCategories.reduce((total, cat) => total + cat.toolsCount, 0)}+
              </div>
              <div className="text-dark-blue font-medium">أداة متاحة</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange mb-2">
                {allCategories.length}
              </div>
              <div className="text-dark-blue font-medium">فئة رئيسية</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange mb-2">
                500+
              </div>
              <div className="text-dark-blue font-medium">مالك أداة</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange mb-2">
                24/7
              </div>
              <div className="text-dark-blue font-medium">دعم فني</div>
            </div>
          </div>
        </div>
      </div>

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
                منصة لتأجير أدوات البناء والبريكولاج بالمغرب. نربط بين أصحاب الأدوات والباحثين عن معدات مناسبة لمشاريعهم.
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">روابط مفيدة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-teal transition-colors">من نحن</Link></li>
                <li><Link to="/contact" className="hover:text-teal transition-colors">اتصل بنا</Link></li>
                <li><Link to="/privacy" className="hover:text-teal transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-teal transition-colors">شروط الاست��دام</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold mb-4">الفئات الشعبية</h4>
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
