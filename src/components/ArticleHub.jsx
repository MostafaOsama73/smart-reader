import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Volume2, StopCircle, FileText, MessageSquare, ArrowRight, User, ThumbsUp, ThumbsDown, Minus, Loader2, Send, AlertCircle } from 'lucide-react';

export default function ArticleHub() {
  // --- State Management ---
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Feature States
  const [showSummary, setShowSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false); 
  
  // Comment States
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  // --- API Configuration ---
  // Must match your Spring Boot Controller Request Mappings
  const API_BASE_URL = 'http://localhost:8080/api/v1'; 

  // --- 1. Fetch Data on Load ---
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Calls GET http://localhost:8080/api/v1/articles
      const response = await fetch(`${API_BASE_URL}/articles`);
      if (!response.ok) {
        throw new Error('فشل الاتصال بالسيرفر. تأكد أن Spring Boot يعمل.');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers ---

  const handleSummarize = async () => {
    // If currently showing summary, hide it
    if (showSummary) {
      setShowSummary(false);
      return;
    }

    if (!selectedArticle?.id) return;

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/ai/articles/${selectedArticle.id}/summary`);
      if (!res.ok) {
        throw new Error('فشل جلب الملخص من الخادم');
      }

      // API returns plain text summary
      const summaryText = await res.text();

      const updatedArticle = { ...selectedArticle, summary: summaryText };
      setSelectedArticle(updatedArticle);
      setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
      setShowSummary(true);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setSummaryError(err.message || 'حدث خطأ أثناء جلب الملخص');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; 
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      alert("المتصفح لا يدعم القراءة الصوتية");
    }
  };

  const handleStopSpeak = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPostingComment(true);

    try {
        // --- Building Payload for CommentController ---
        // Your Java entity expects relations, so we send objects with IDs
        const payload = {
            text: newComment,
            // Hardcoded User ID 1 for testing (Assuming a user exists in DB with ID 1)
            user: { id: 1 }, 
            // Link comment to the current article
            article: { id: selectedArticle.id }
        };

        // Calls POST http://localhost:8080/api/v1/comments
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const savedComment = await response.json();
            
            // Update UI immediately with the new comment
            // We use the savedComment from backend to ensure we have the correct ID/Sentiment
            const updatedArticle = {
                ...selectedArticle,
                comments: [...(selectedArticle.comments || []), savedComment]
            };
            
            setSelectedArticle(updatedArticle);
            
            // Update the main list so data persists if user goes back
            setArticles(prev => prev.map(a => a.id === selectedArticle.id ? updatedArticle : a));

            setNewComment("");
        } else {
            alert("فشل في حفظ التعليق");
        }
    } catch (error) {
        console.error("Error posting comment:", error);
        alert("حدث خطأ أثناء الاتصال بالسيرفر");
    } finally {
        setIsPostingComment(false);
    }
  };

  const goBack = () => {
    handleStopSpeak();
    setShowSummary(false);
    setSelectedArticle(null);
    setNewComment("");
  };

  const getSentimentStyle = (sentiment) => {
    const s = sentiment ? String(sentiment).toUpperCase() : 'NEUTRAL';
    if (s === 'POSITIVE') return 'bg-green-50 text-green-700 ring-1 ring-green-200';
    if (s === 'NEGATIVE') return 'bg-red-50 text-red-700 ring-1 ring-red-200';
    return 'bg-gray-100 text-gray-600 ring-1 ring-gray-200';
  };

  const filteredArticles = articles.filter(article => 
    article.title?.includes(searchTerm) || article.category?.includes(searchTerm)
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-right">
      
      {/* Navbar */}
      <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition" onClick={goBack}>
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">اقرأ لي (Smart Reader)</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm bg-indigo-800 px-3 py-1 rounded-full">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400' : error ? 'bg-red-400' : 'bg-green-400'}`}></div>
            {isLoading ? 'جاري الاتصال...' : error ? 'خطأ في الاتصال' : 'متصل بـ /api/v1'}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        
        {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-500 text-lg">جاري جلب المقالات من قاعدة البيانات...</p>
            </div>
        ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">فشل الاتصال بالخادم</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <p className="text-sm text-gray-400 mb-6">تأكد أن Spring Boot يعمل على Port 8080 وأن CORS مفعل.</p>
                <button onClick={fetchArticles} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                    إعادة المحاولة
                </button>
            </div>
        ) : !selectedArticle ? (
          /* --- Home Page --- */
          <div className="space-y-8 animate-fade-in">
            <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">مركز المعرفة الذكي</h2>
              <p className="text-gray-500 mb-8">اكتشف {articles.length} مقال متوفر</p>
              
              <div className="max-w-xl mx-auto relative group">
                <input
                  type="text"
                  placeholder="ابحث عن موضوع..."
                  className="w-full p-4 pr-12 rounded-full border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none shadow-sm text-lg transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={article.image || "https://via.placeholder.com/400x300"} 
                      alt={article.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}}
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400 border-t pt-4">
                      <span className="flex items-center gap-1"><User size={14}/> {article.author}</span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">قراءة <ArrowRight size={14} className="rotate-180"/></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- Article Details Page --- */
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
            
            <div className="h-64 md:h-80 w-full relative">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <button onClick={goBack} className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg text-gray-800 z-10">
                <ArrowRight className="h-6 w-6" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3 inline-block border border-white/30">{selectedArticle.category}</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">{selectedArticle.title}</h2>
                <p className="opacity-90 flex items-center gap-2"><User size={16}/> {selectedArticle.author}</p>
              </div>
            </div>

            <div className="p-6 md:p-10">
              
              <div className="flex flex-wrap gap-3 mb-8 border-b pb-6 border-gray-100">
                <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${isSummarizing ? 'opacity-70 cursor-not-allowed' : ''} ${
                    showSummary 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {isSummarizing ? <><Loader2 className="animate-spin" size={18}/> جاري التلخيص...</> : <><FileText size={20} />{showSummary ? 'إخفاء الملخص' : 'عرض الملخص'}</>}
                </button>

                <button 
                  onClick={() => isSpeaking ? handleStopSpeak() : handleSpeak(selectedArticle.content)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
                    isSpeaking 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSpeaking ? <><StopCircle size={20} /> إيقاف</> : <><Volume2 size={20} /> قراءة</>}
                </button>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-loose text-lg">
                {showSummary && (
                  <div className="bg-amber-50 border border-amber-200 p-6 mb-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                    <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                      ملخص AI
                    </h4>
                    {summaryError ? (
                      <p className="text-red-600 mb-2">{summaryError}</p>
                    ) : (
                      <p className="text-amber-900/90">{selectedArticle.summary || "لا يوجد ملخص متاح لهذا المقال حالياً."}</p>
                    )}
                  </div>
                )}
                <p className="whitespace-pre-line">{selectedArticle.content}</p>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                  <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><MessageSquare size={24} /></span>
                  التعليقات ({selectedArticle.comments ? selectedArticle.comments.length : 0})
                </h3>
                
                <div className="bg-white p-1 mb-8 rounded-xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="اكتب تعليقك هنا..." 
                    className="w-full p-4 rounded-t-xl outline-none resize-none h-24 text-gray-700"
                  ></textarea>
                  <div className="bg-gray-50 p-2 flex justify-between items-center rounded-b-xl border-t border-gray-100">
                    <span className="text-xs text-gray-400 mr-2">سيتم تحليل المشاعر فورياً</span>
                    <button 
                      onClick={handlePostComment}
                      disabled={isPostingComment || !newComment.trim()}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                        !newComment.trim() ? 'bg-gray-200 text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isPostingComment ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>}
                      نشر
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedArticle.comments && selectedArticle.comments.length > 0 ? (
                    selectedArticle.comments.map((comment) => (
                      <div key={comment.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                            {comment.user?.name ? comment.user.name.charAt(0) : '?'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{comment.user?.name || "مستخدم"}</div>
                            <p className="text-gray-600 mt-1">{comment.text}</p>
                          </div>
                        </div>
                        
                        <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 whitespace-nowrap ${getSentimentStyle(comment.sentiment)}`}>
                          {comment.sentiment === 'POSITIVE' && <><ThumbsUp size={16}/> إيجابي</>}
                          {comment.sentiment === 'NEGATIVE' && <><ThumbsDown size={16}/> سلبي</>}
                          {(!comment.sentiment || comment.sentiment === 'NEUTRAL') && <><Minus size={16}/> محايد</>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">لا توجد تعليقات بعد.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}