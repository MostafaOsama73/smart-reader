import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, BarChart2, ArrowRight, BookOpen, Users, Headphones, Moon, Sun } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();


    return (
        <div dir="rtl" className="min-h-screen bg-white dark:bg-gray-900 font-sans text-right transition-colors duration-300">
            {/* Navigation */}
            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            اقرأ لي
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                            title={isDarkMode ? "الوضع النهاري" : "الوضع الليلي"}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => navigate('/app')}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            جرب التطبيق
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative overflow-hidden pt-20 pb-32 bg-white dark:bg-gray-900 transition-colors">
                <div className="absolute inset-0 z-0 opacity-50 dark:opacity-20">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50 dark:bg-indigo-900/30 skew-x-12 transform origin-top-right"></div>
                    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-50 dark:bg-purple-900/30 -skew-x-12 transform origin-bottom-left"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
                        v2.0 أصبح متاحاً الآن ✨
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight animate-fade-in-up delay-100">
                        تجربة قراءة <span className="text-indigo-600 dark:text-indigo-400 relative inline-block">
                            ذكية
                            <svg className="absolute bottom-2 left-0 w-full h-3 text-indigo-200 dark:text-indigo-800 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 0 Q 50 5 0 0 Z" fill="currentColor" />
                            </svg>
                        </span> <br />
                        تختصر عليك الوقت
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        حوّل القراءة إلى متعة مع ميزة التلخيص الذكي وتحليل المشاعر. منصة "اقرأ لي" هي رفيقك الذكي للمعرفة.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                        <button
                            onClick={() => navigate('/app')}
                            className="px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group"
                        >
                            ابدأ القراءة الآن
                            <ArrowRight className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-lg font-bold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                            معرفة المزيد
                        </button>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">مميزات خارقة</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">نستخدم أحدث تقنيات الذكاء الاصطناعي لنقدم لك تجربة مستخدم لا مثيل لها.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">تلخيص ذكي</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                وفر وقتك واحصل على زبدة الموضوع. يقوم الذكاء الاصطناعي بتلخيص المقالات الطويلة في ثوانٍ معدودة بدقة عالية.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <BarChart2 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">تحليل مشاعر التعليقات</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                افهم انطباعات القراء من خلال تحليل تعليقاتهم تلقائياً. الميزة توضح ما إذا كانت التعليقات إيجابية، سلبية، أو محايدة.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/50 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                                <Headphones size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">قراءة صوتية</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                استمع إلى مقالاتك المفضلة بصوت طبيعي وواضح. ميزة القراءة الصوتية تدعم اللغة العربية وتساعدك على الاستمتاع بالمحتوى أثناء التنقل.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* About Us Section */}
            <section className="py-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-gray-900 to-indigo-900 rounded-3xl p-10 text-white shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                                <Users className="w-12 h-12 mb-6 text-indigo-300" />
                                <h3 className="text-2xl font-bold mb-4">مهمتنا</h3>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    نسعى لتمكين القارئ العربي من الوصول للمعرفة بأسهل الطرق وأكثرها تطوراً. نؤمن بأن التكنولوجيا يجب أن تخدم الإنسان وتجعل حياته أسهل وأكثر إنتاجية.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-4 space-x-reverse">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-indigo-900 flex items-center justify-center text-xs">U{i}</div>
                                        ))}
                                    </div>
                                    <span className="text-sm text-indigo-300 p-1">+1000 قارئ سعيد</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">من نحن؟</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                نحن فريق من المطورين والمصممين الشغوفين باللغة العربية والذكاء الاصطناعي. انطلقنا من فكرة بسيطة: كيف نجعل القراءة الرقمية أكثر ذكاءً وتفاعلية؟
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                "اقرأ لي" ليس مجرد موقع، بل هو منصة متكاملة تجمع بين قوة الخوارزميات وجمال المحتوى العربي.
                            </p>
                            <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2">
                                تعرف على الفريق <ArrowRight className="rotate-180" size={18} />
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <BookOpen className="h-6 w-6 text-indigo-500" />
                        <span className="text-xl font-bold text-white">اقرأ لي</span>
                    </div>
                    <div className="flex justify-center gap-8 mb-8 text-sm">
                        <a href="#" className="hover:text-white transition-colors">الرئيسية</a>
                        <a href="#" className="hover:text-white transition-colors">المميزات</a>
                        <a href="#" className="hover:text-white transition-colors">من نحن</a>
                        <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
                    </div>
                    <p dir="ltr" className="text-xs opacity-50">&copy; 2024 Smart Reader. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
