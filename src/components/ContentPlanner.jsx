import React, { useState } from 'react';
import {
    Banknote,
    Brain,
    Cpu,
    Users,
    GraduationCap,
    ShoppingBag,
    Home,
    Clock,
    Search,
    CheckCircle2,
    Copy,
    Check,
    Sparkles,
    X,
    Wand2,
    Loader2,
    ListPlus,
    Camera,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    LayoutGrid,
    Sun,
    Smile,
    Heart
} from 'lucide-react';
import { generateAIContent, isAIConfigured } from '../utils/aiService';

const ContentPlanner = () => {
    // --- CALENDAR EVENTS DATA (Sample for 2025/2026 context) ---
    const calendarEvents = [
        { date: '2025-01-01', title: "Tahun Baru Masehi", type: 'holiday' },
        { date: '2025-01-29', title: "Tahun Baru Imlek", type: 'cultural' },
        { date: '2025-02-14', title: "Hari Valentine", type: 'commercial' },
        { date: '2025-03-08', title: "Hari Perempuan Intl.", type: 'social' },
        { date: '2025-03-17', title: "St. Patrick's Day", type: 'cultural' },
        { date: '2025-03-20', title: "Awal Musim Semi", type: 'season' },
        { date: '2025-03-31', title: "Idul Fitri (Est)", type: 'religious' },
        { date: '2025-04-20', title: "Hari Paskah", type: 'religious' },
        { date: '2025-04-22', title: "Hari Bumi", type: 'social' },
        { date: '2025-05-11', title: "Hari Ibu (Intl)", type: 'commercial' },
        { date: '2025-06-21', title: "Titik Balik Matahari", type: 'season' },
        { date: '2025-07-04', title: "Kemerdekaan AS", type: 'holiday' },
        { date: '2025-08-17', title: "Kemerdekaan RI", type: 'holiday-id' },
        { date: '2025-10-31', title: "Halloween", type: 'commercial' },
        { date: '2025-11-28', title: "Black Friday", type: 'commercial' },
        { date: '2025-12-25', title: "Hari Natal", type: 'holiday' },
    ];

    // --- SPOTLIGHT DATA (Translated & Vibrantly Colored) ---
    const spotlightItems = [
        {
            title: "Musim Semi (Spring)",
            targetDate: "Maret - Mei",
            urgency: "Tinggi",
            desc: "Bunga bermekaran, bersih-bersih rumah, alergi, gaya hidup outdoor.",
            color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 text-pink-700 hover:border-pink-300"
        },
        {
            title: "Ramadan & Idul Fitri",
            targetDate: "Feb - Maret",
            urgency: "Kritis",
            desc: "Kumpul keluarga, ibadah, kurma, lampion, zakat/donasi.",
            color: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700 hover:border-emerald-300"
        },
        {
            title: "Hari Perempuan",
            targetDate: "8 Maret",
            urgency: "Sedang",
            desc: "Pemberdayaan wanita, karir beragam, konsep kesetaraan.",
            color: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 text-purple-700 hover:border-purple-300"
        },
        {
            title: "Paskah (Easter)",
            targetDate: "Akhir Maret",
            urgency: "Sedang",
            desc: "Telur hias, kelinci, warna pastel, makan siang keluarga.",
            color: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 text-amber-700 hover:border-amber-300"
        }
    ];

    // --- INITIAL DATA (Translated Categories) ---
    const initialData = [
        {
            id: 'finance',
            category: 'Bisnis & Keuangan',
            icon: <Banknote className="w-6 h-6 text-emerald-600" />,
            color: 'bg-emerald-50 border-emerald-200 shadow-emerald-100',
            items: [
                "Budget Planning", "Personal Finance Planning", "Financial Stress", "Invoice Deadline",
                "Monthly Billing", "Quarterly Report", "Annual Report", "Startup Pitch",
                "Business Forecast", "Cash Flow Management", "Payroll Day", "Tax Refund",
                "Audit Season", "Layoffs", "Hiring Season", "Business Growth",
                "Business Failure", "Investment Planning", "Retirement Planning"
            ]
        },
        {
            id: 'health',
            category: 'Kesehatan Mental & Wellness',
            icon: <Heart className="w-6 h-6 text-rose-500" />,
            color: 'bg-rose-50 border-rose-200 shadow-rose-100',
            items: [
                "Mental Health Awareness", "Burnout", "Work Stress", "Anxiety",
                "Depression Awareness", "Self Care", "Therapy Session", "Healthy Lifestyle",
                "Fitness Motivation", "Weight Loss Program", "Diet Planning", "Sleep Disorder",
                "Meditation", "Mindfulness", "Emotional Healing"
            ]
        },
        {
            id: 'tech',
            category: 'Teknologi & Digital',
            icon: <Cpu className="w-6 h-6 text-sky-500" />,
            color: 'bg-sky-50 border-sky-200 shadow-sky-100',
            items: [
                "Artificial Intelligence", "Automation", "Machine Learning Concept", "Data Privacy",
                "Cyber Security", "Remote Work", "Hybrid Work", "Digital Nomad Life",
                "App Launch", "SaaS Subscription", "System Update", "Software Bug / Error",
                "Online Meeting", "Virtual Team", "Digital Detox"
            ]
        },
        {
            id: 'social',
            category: 'Sosial & Gaya Hidup',
            icon: <Users className="w-6 h-6 text-violet-500" />,
            color: 'bg-violet-50 border-violet-200 shadow-violet-100',
            items: [
                "Work-Life Balance", "Career Change", "New Job", "Job Interview",
                "Resignation", "Promotion", "Office Politics", "Teamwork",
                "Leadership", "Employee Motivation", "Overtime Work", "Deadline Pressure",
                "Career Failure", "Personal Success"
            ]
        },
        {
            id: 'edu',
            category: 'Edukasi & Self Dev',
            icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
            color: 'bg-amber-50 border-amber-200 shadow-amber-100',
            items: [
                "Online Learning", "E-learning Platform", "Exam Stress", "Graduation Exam",
                "Skill Upgrade", "Language Learning", "Certification Program", "Internship Season",
                "Study Abroad", "Personal Development", "Productivity Improvement"
            ]
        },
        {
            id: 'marketing',
            category: 'Marketing & E-Commerce',
            icon: <ShoppingBag className="w-6 h-6 text-orange-500" />,
            color: 'bg-orange-50 border-orange-200 shadow-orange-100',
            items: [
                "Product Launch", "Product Promotion", "Customer Review", "Brand Loyalty",
                "Subscription Renewal", "Flash Sale", "Referral Program", "Loyalty Program",
                "Abandoned Cart", "Upselling", "Cross Selling", "Customer Support"
            ]
        },
        {
            id: 'home',
            category: 'Rumah & Keluarga',
            icon: <Home className="w-6 h-6 text-teal-500" />,
            color: 'bg-teal-50 border-teal-200 shadow-teal-100',
            items: [
                "Buying House", "Selling House", "Moving House", "Home Office Setup",
                "Interior Design", "Family Time", "Parenting", "Pregnancy",
                "Baby Shower", "Child Education", "Retirement Life"
            ]
        },
        {
            id: 'micro',
            category: 'Micro-Moments (Niche)',
            icon: <Clock className="w-6 h-6 text-indigo-500" />,
            color: 'bg-indigo-50 border-indigo-200 shadow-indigo-100',
            items: [
                "Monday Motivation", "Coffee Break", "Team Meeting", "Brainstorming",
                "Late Night Work", "Weekend Relax", "Morning Routine", "Work From Cafe",
                "Waiting Deadline", "Last Minute Rush"
            ]
        }
    ];

    // --- STATE ---
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [checkedItems, setCheckedItems] = useState({});
    const [copiedId, setCopiedId] = useState(null);
    const [copiedItemId, setCopiedItemId] = useState(null);

    // View State
    const [viewMode, setViewMode] = useState('ideas'); // 'ideas' or 'calendar'
    const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Default Jan 2025 for demo

    // AI States
    const [generatingCategory, setGeneratingCategory] = useState(null);
    const [draftingItem, setDraftingItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [aiSubThemes, setAiSubThemes] = useState([]);
    const [currentDraftTopic, setCurrentDraftTopic] = useState('');
    const [copiedSubThemeIndex, setCopiedSubThemeIndex] = useState(null);

    // Check AI configuration on mount
    React.useEffect(() => {
        const config = isAIConfigured();
        if (!config.configured) {
            console.warn('⚠️ AI tidak dikonfigurasi! Silakan tambahkan API key di file .env');
        } else {
            console.log('✅ AI tersedia:', config.providers);
        }
    }, []);

    // --- HANDLERS ---
    const toggleCheck = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleCopy = (categoryName, items, id) => {
        const text = `${categoryName}\n\n${items.map(i => `- ${i}`).join('\n')}`;
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCopyItem = (text, e) => {
        e?.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopiedItemId(text);
        setTimeout(() => setCopiedItemId(null), 1500);
    };

    const handleGenerateMoreIdeas = async (categoryId, categoryName) => {
        setGeneratingCategory(categoryId);
        const prompt = `Act as a top-selling Microstock Contributor. Give me 5 NEW, specific, and commercially viable stock photography or footage concepts for the category "${categoryName}". 
    Focus on visual descriptions and current market trends. 
    Return ONLY the list of 5 items, separated by newlines, no numbering, no intro text.`;

        const result = await generateAIContent(prompt);

        if (result && !result.includes('Maaf') && !result.includes('Error')) {
            const newItems = result.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^[-\d\.]+\s*/, '').trim());
            setData(prevData => prevData.map(cat => {
                if (cat.id === categoryId) {
                    return { ...cat, items: [...cat.items, ...newItems] };
                }
                return cat;
            }));
        } else {
            alert("Gagal menghubungi AI. Pastikan API Key sudah dipasang di file .env");
        }
        setGeneratingCategory(null);
    };

    const handleDraftContent = async (item, e) => {
        e?.stopPropagation();
        setDraftingItem(item);
        setCurrentDraftTopic(item);
        setModalOpen(true);
        setAiSubThemes([]);

        const prompt = `Act as a Microstock Expert. Provide 10 specific visual sub-themes, unique shooting angles, or high-value keywords for the stock concept: "${item}". 
    Focus on what buyers are searching for (commercial/lifestyle/business contexts).
    IMPORTANT: Output ONLY a raw list of 10 lines. 
    NO numbering (1. 2.). NO bullet points (-). 
    One concept/keyword per line. English language only.`;

        const result = await generateAIContent(prompt);

        if (result && !result.includes('Maaf') && !result.includes('Error')) {
            const themes = result.split('\n')
                .map(line => line.replace(/^[\d\-\.\s]+/, '').trim())
                .filter(line => line.length > 0);
            setAiSubThemes(themes);
        } else {
            setAiSubThemes(["Gagal memuat ide. Coba cek API Key di .env", "Pastikan kuota API masih tersedia."]);
        }
        setDraftingItem(null);
    };

    const copySingleSubTheme = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedSubThemeIndex(index);
        setTimeout(() => setCopiedSubThemeIndex(null), 1500);
    }

    const copyAllSubThemes = () => {
        const allText = aiSubThemes.join('\n');
        navigator.clipboard.writeText(allText);
        const btn = document.getElementById('copy-all-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "Tersalin!";
            setTimeout(() => btn.innerText = originalText, 2000);
        }
    }

    const getFilteredData = () => {
        return data.filter(cat => {
            const matchCategory = selectedCategory === 'Semua' || cat.category === selectedCategory;
            const matchSearch = cat.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())) ||
                cat.category.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('Semua');
    };

    // --- CALENDAR LOGIC ---
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        // Padding for empty start days
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 sm:h-32 bg-slate-50 border border-slate-100/50"></div>);
        }

        // Days of month
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = calendarEvents.filter(e => e.date === dateStr);
            const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

            days.push(
                <div
                    key={d}
                    className={`h-24 sm:h-32 border border-slate-100 p-2 relative group hover:bg-orange-50/50 transition-colors ${isToday ? 'bg-orange-50/80 border-orange-200' : 'bg-white'}`}
                >
                    <span className={`text-sm font-semibold block mb-1 ${isToday ? 'text-orange-600 bg-orange-100 w-7 h-7 rounded-full flex items-center justify-center shadow-sm' : 'text-slate-400'}`}>
                        {d}
                    </span>

                    <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100%-28px)] scrollbar-hide">
                        {dayEvents.map((evt, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleDraftContent(evt.title)}
                                className={`
                  text-[10px] sm:text-xs px-1.5 py-1 rounded border cursor-pointer hover:shadow-sm hover:scale-[1.02] transition-all truncate
                  ${evt.type === 'holiday' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                        evt.type === 'holiday-id' ? 'bg-red-50 text-red-700 border-red-100 font-medium' :
                                            evt.type === 'commercial' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                evt.type === 'season' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                    'bg-indigo-50 text-indigo-700 border-indigo-100'}
                `}
                                title={`Cari inspirasi untuk ${evt.title}`}
                            >
                                {evt.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    // Helper for Indonesia month names
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900">

            {/* HEADER HERO (STICKY) */}
            <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                <Camera className="text-orange-500 w-7 h-7" />
                                Momentum Planner
                                <span className="text-xs font-bold px-2.5 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full border border-orange-200 ml-2 align-middle flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    AI Powered
                                </span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                                <Sun className="w-4 h-4 text-amber-400" />
                                Inspirasi stok foto & video musiman yang cerah & positif.
                            </p>
                        </div>

                        {/* SEARCH BAR & VIEW TOGGLE */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            {viewMode === 'ideas' && (
                                <div className="relative flex-1 md:w-72 group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all shadow-sm group-hover:bg-white"
                                        placeholder="Cari ide (mis: Family, Business)..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                <button
                                    onClick={() => setViewMode('ideas')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'ideas' ? 'bg-white text-orange-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                                    title="Tampilan List"
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white text-orange-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                                    title="Tampilan Kalender"
                                >
                                    <CalendarIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CATEGORY TABS (Scrollable) - Only show in Ideas view */}
                    {viewMode === 'ideas' && (
                        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-right">
                            <button
                                onClick={() => setSelectedCategory('Semua')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${selectedCategory === 'Semua'
                                    ? 'bg-slate-800 text-white shadow-lg border-slate-800 scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                            >
                                Semua Topik
                            </button>
                            {data.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.category)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${selectedCategory === cat.category
                                        ? 'bg-white text-slate-800 shadow-lg border-slate-300 ring-2 ring-orange-100'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }`}
                                >
                                    {React.cloneElement(cat.icon, { className: `w-4 h-4 ${selectedCategory === cat.category ? 'text-orange-500' : 'opacity-70'}` })}
                                    {cat.category.split(' ')[0]}...
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {viewMode === 'ideas' ? (
                    <>
                        {/* SPOTLIGHT SECTION */}
                        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-orange-100 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-orange-600" />
                                </div>
                                <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">
                                    Sorotan Produksi (Potret Sekarang)
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {spotlightItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={(e) => handleDraftContent(item.title, e)}
                                        className={`
                      relative p-5 rounded-2xl border cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden
                      bg-white ${item.color.split(' ')[0]} ${item.color.split(' ')[2]} border-l-4
                    `}
                                    >
                                        {/* Decorative Circle */}
                                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 rounded-full bg-white opacity-20 pointer-events-none"></div>

                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-slate-700`}>
                                                🗓 {item.targetDate}
                                            </span>
                                            {item.urgency === 'Kritis' && (
                                                <span className="flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 relative z-10">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-2 leading-relaxed relative z-10 font-medium opacity-80">
                                            {item.desc}
                                        </p>
                                        <div className="absolute bottom-3 right-3 text-white/20 scale-150 rotate-12">
                                            {/* Abstract placeholder for icon */}
                                        </div>

                                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-full shadow-sm text-orange-500">
                                            <Wand2 className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* IDEAS GRID */}
                        {getFilteredData().length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                                <div className="inline-flex bg-orange-50 p-6 rounded-full mb-4 animate-bounce">
                                    <Smile className="w-10 h-10 text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Wah, konsepnya belum ketemu!</h3>
                                <p className="text-slate-500 mt-2">Coba kata kunci lain atau matikan filternya.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-6 px-6 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-medium shadow-lg shadow-slate-200"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                                {getFilteredData().map((group) => {
                                    const categoryMatch = group.category.toLowerCase().includes(searchTerm.toLowerCase());

                                    return (
                                        <div
                                            key={group.id}
                                            className={`group rounded-3xl border ${group.color.split(' ')[1]} bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}
                                        >
                                            <div className={`px-5 py-4 border-b border-dashed ${group.color.split(' ')[1]} flex items-start justify-between bg-gradient-to-b ${group.color.split(' ')[0]} to-white`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-2xl bg-white shadow-sm border border-white/50 ring-1 ring-slate-100`}>
                                                        {group.icon}
                                                    </div>
                                                    <h2 className="font-bold text-slate-800 leading-tight text-sm">
                                                        {group.category}
                                                    </h2>
                                                </div>
                                                <button
                                                    onClick={() => handleGenerateMoreIdeas(group.id, group.category)}
                                                    disabled={generatingCategory === group.id}
                                                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-white/80 transition-colors disabled:opacity-50"
                                                    title="Generate 5 ide baru dengan AI"
                                                >
                                                    {generatingCategory === group.id ? (
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <Sparkles className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="p-4 flex-1">
                                                <ul className="space-y-1.5">
                                                    {group.items.map((item, idx) => {
                                                        const isMatch = searchTerm && item.toLowerCase().includes(searchTerm.toLowerCase());
                                                        const isChecked = checkedItems[item];
                                                        const isDraftingThis = draftingItem === item;

                                                        if (searchTerm && !isMatch && !categoryMatch) return null;

                                                        return (
                                                            <li
                                                                key={idx}
                                                                onClick={() => toggleCheck(item)}
                                                                className={`
                                  group/item flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all select-none border border-transparent
                                  ${isMatch ? 'bg-orange-50 border-orange-200' : 'hover:bg-slate-50 hover:border-slate-100'}
                                  ${isChecked ? 'opacity-50 grayscale' : 'opacity-100'}
                                `}
                                                            >
                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                    <div className={`
                                    flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300
                                    ${isChecked
                                                                            ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                                                                            : 'border-slate-300 bg-white group-hover/item:border-orange-400'}
                                  `}>
                                                                        {isChecked && <Check className="w-3 h-3" strokeWidth={3} />}
                                                                    </div>
                                                                    <span className={`text-sm font-medium truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-600 group-hover/item:text-slate-800'}`}>
                                                                        {item}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                                    <button
                                                                        onClick={(e) => handleCopyItem(item, e)}
                                                                        className={`
                                                                            p-1.5 rounded-lg transition-all
                                                                            ${copiedItemId === item ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}
                                                                        `}
                                                                        title="Salin Teks"
                                                                    >
                                                                        {copiedItemId === item ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                                    </button>

                                                                    <button
                                                                        onClick={(e) => handleDraftContent(item, e)}
                                                                        className={`
                                                                            p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-100 transition-all
                                                                            ${isDraftingThis ? 'opacity-100 text-orange-600 bg-orange-50' : ''}
                                                                        `}
                                                                        title="Cari Angle / Kata Kunci"
                                                                    >
                                                                        {isDraftingThis ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>

                                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
                                                <span>
                                                    {searchTerm
                                                        ? `${group.items.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase())).length} Cocok`
                                                        : `${group.items.length} Konsep`}
                                                </span>
                                                <button
                                                    onClick={() => handleCopy(group.category, group.items, group.id)}
                                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 transition-all border border-transparent hover:border-slate-200"
                                                >
                                                    {copiedId === group.id ? (
                                                        <>
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                            <span className="text-emerald-700 font-bold">Disalin!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-4 h-4" />
                                                            <span>Salin</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    /* CALENDAR VIEW */
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                        {/* Calendar Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                <CalendarIcon className="w-6 h-6 text-orange-500" />
                                {currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevMonth}
                                    className="p-2 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md text-slate-600 transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(new Date())}
                                    className="px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 hover:bg-white hover:shadow-md text-slate-600 transition-all"
                                >
                                    Hari Ini
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md text-slate-600 transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid Header */}
                        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                                <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 bg-white">
                            {renderCalendar()}
                        </div>

                        <div className="p-4 bg-orange-50/50 text-xs text-orange-600 text-center border-t border-orange-100 font-medium">
                            💡 Tips: Klik tanggal merah atau event untuk meminta AI mencarikan ide foto!
                        </div>
                    </div>
                )}

            </main>

            {/* AI SUB-THEME MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-white/20">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                    <ListPlus className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-slate-800">Sudut Visual & Keyword</h3>
                                    <p className="text-sm text-slate-500">Konsep: <span className="font-bold text-orange-600">{currentDraftTopic}</span></p>
                                </div>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-0 overflow-y-auto bg-slate-50/30 flex-1">
                            {aiSubThemes.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {aiSubThemes.map((subTheme, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center justify-between px-6 py-4 hover:bg-orange-50/50 transition-colors cursor-pointer"
                                            onClick={() => copySingleSubTheme(subTheme, index)}
                                        >
                                            <span className="text-slate-700 font-medium text-sm flex-1 mr-4 bg-transparent selection:bg-orange-200">{subTheme}</span>
                                            <button
                                                className="p-2 rounded-xl text-slate-300 group-hover:text-orange-600 group-hover:bg-orange-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 scale-90 group-hover:scale-100"
                                                title="Salin"
                                            >
                                                {copiedSubThemeIndex === index ? (
                                                    <Check className="w-4 h-4 text-emerald-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-orange-200 blur-xl opacity-50 rounded-full animate-pulse"></div>
                                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4 relative z-10" />
                                    </div>
                                    <p className="text-slate-800 font-bold text-lg">Sedang mencari ide...</p>
                                    <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
                                        AI sedang menganalisis "{currentDraftTopic}" untuk mencari angle foto microstock yang laku.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors text-sm"
                            >
                                Tutup
                            </button>
                            <button
                                id="copy-all-btn"
                                disabled={aiSubThemes.length === 0}
                                onClick={copyAllSubThemes}
                                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-slate-200"
                            >
                                <Copy className="w-4 h-4" />
                                Salin Semua (10)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FLOATING CTA FOR MOBILE */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-orange-500 text-white p-4 rounded-full shadow-xl shadow-orange-500/30 hover:bg-orange-600 active:scale-90 transition-all"
                >
                    <Search className="w-6 h-6" />
                </button>
            </div>

        </div>
    );
};

export default ContentPlanner;
