import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Clock, Star } from 'lucide-react';

export default function About() {
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
            <Link to="/" className="text-dark-blue hover:text-orange transition-colors flex items-center gap-2">
              <span>العودة للرئيسية</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark-blue mb-4">من نحن</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              منصة رائدة في مجال تأجير أدوات البناء والبريكولاج بالمغرب
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-teal/10 to-teal/20 rounded-xl p-8 mb-12">
            <div className="text-right">
              <h2 className="text-3xl font-bold text-dark-blue mb-6">مهمتنا</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                نهدف إلى تسهيل الوصول إلى أدوات البناء والبريكولاج عالية الجودة من خلال منصة آمنة وموثوقة 
                تربط بين أصحاب الأدوات والباحثين عن معدات للإيجار. نسعى لجعل المشاريع أكثر اقتصادية وفعالية.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-blue mb-2">مجتمع موثوق</h3>
                  <p className="text-gray-600 text-sm">شبكة من المستخدمين الموثوقين</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-blue mb-2">أمان وثقة</h3>
                  <p className="text-gray-600 text-sm">معاملات آمنة ومراجعة دقيقة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dark-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-blue mb-2">سرعة ومرونة</h3>
                  <p className="text-gray-600 text-sm">وصول سريع للأدوات المطلوبة</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-blue mb-8 text-right">كيف نعمل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-4 text-right">للباحثين عن الأدوات</h3>
                <ul className="space-y-3 text-gray-700 text-right">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</span>
                    <span>تصفح مجموعة واسعة من الأدوات المتاحة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</span>
                    <span>استخدم الفلاتر للعثور على الأداة المناسبة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</span>
                    <span>تواصل مباشرة مع صاحب الأداة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</span>
                    <span>اتفق على التفاصيل واحصل على الأداة</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-4 text-right">لأصحاب الأدوات</h3>
                <ul className="space-y-3 text-gray-700 text-right">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</span>
                    <span>أضف أداتك مع الصور والوصف</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</span>
                    <span>حدد السعر والشروط المناسبة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</span>
                    <span>انتظر المراجعة والموافقة</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</span>
                    <span>استقبل طلبات الإيجار واحصل على دخل إضافي</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-blue mb-8 text-right">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-right">
                <h3 className="text-xl font-bold text-dark-blue mb-3">الشفافية</h3>
                <p className="text-gray-700">
                  نؤمن بالشفافية الكاملة في جميع المعاملات ونوفر معلومات واضحة ودقيقة عن كل أداة.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-right">
                <h3 className="text-xl font-bold text-dark-blue mb-3">الجودة</h3>
                <p className="text-gray-700">
                  نحرص على جودة الأدوات المعروضة من خلال عملية مراجعة دقيقة لكل إعلان.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-right">
                <h3 className="text-xl font-bold text-dark-blue mb-3">الأمان</h3>
                <p className="text-gray-700">
                  نوفر بيئة آمنة للمعاملات ونحمي بيانات المستخدمين بأعلى معايير الأمان.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-right">
                <h3 className="text-xl font-bold text-dark-blue mb-3">خدمة العملاء</h3>
                <p className="text-gray-700">
                  فريق دعم متاح للمساعدة في حل أي مشاكل أو الإجابة على الاستفسارات.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold text-red-800 mb-4 text-right">إشعار مهم</h3>
            <p className="text-gray-700 text-right leading-relaxed">
              منصة تأجير الأدوات هي وسيط إلكتروني فقط. نحن لا نمتلك الأدوات المعروضة ولسنا طرفاً في 
              المعاملات بين المستخدمين. كل مستخدم مسؤول عن التحقق من هوية الطرف الآخر وجودة الأدوات 
              قبل إتمام أي معاملة. لا نتحمل أي مسؤولية عن الأضرار أو الخسائر الناتجة عن استخدام المنصة.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dark-blue mb-4">هل لديك أسئلة؟</h2>
            <p className="text-gray-600 mb-6">
              فريقنا مستعد للمساعدة والإجابة على جميع استفساراتكم
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-teal text-dark-blue px-8 py-3 rounded-lg font-medium hover:bg-teal/90 transition-colors"
              >
                اتصل بنا
              </Link>
              <Link 
                to="/add-equipment" 
                className="bg-dark-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-dark-blue/90 transition-colors"
              >
                ابدأ الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
