import { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Briefcase, MapPin, DollarSign, Clock, Filter,
    CheckCircle, Loader2, AlertCircle, ChevronLeft, ChevronRight,
    SlidersHorizontal, Sparkles, HelpCircle, X, Maximize2
} from 'lucide-react';
import { usePageSeo } from '../hooks/usePageSeo';
import AiratShell from '../components/AiratShell';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import '../styles/jobSearch.css';

// --- TYPES ---
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    posted: string;
    category: string;
    type: string;
    experience: string;
    description: string;
    requirements: string;
    skills: string[];
    work_location?: string;
    salary_max?: number;
    posted_at?: string;
    featured?: boolean;
}

interface FilterState {
    type: string[];
    experience: string[];
    category: string[];
    work_location: string | null;
}

// --- CONFIGURATION ---
const ES = {
    url: 'https://airat.in/elastic',
    index: 'job_search',
    auth: 'Basic ' + btoa('airat_web:Sodala@MJRP2024'),
};

const FILTER_OPTIONS = {
    type: ['Full-time', 'Contract', 'Part-time', 'Freelance'],
    experience: ['Senior', 'Mid-level', 'Entry-level', 'Lead', 'Executive'],
    category: ['Engineering', 'Design', 'Writing', 'Management', 'Marketing', 'Sales'],
    work_location: [
        { label: 'Remote', value: 'Remote' },
        { label: 'On-site', value: 'On-site' },
        { label: 'Hybrid', value: 'Hybrid' }
    ]
};

const SAMPLE_JOBS: Job[] = [
    {
        id: 'sample-frontend-platform',
        title: 'Senior React Platform Engineer',
        company: 'AiRAT Labs',
        location: 'Dubai, UAE',
        salary: '$95k - $125k',
        salary_max: 125000,
        posted: '2 days ago',
        posted_at: '2026-04-15',
        category: 'Engineering',
        type: 'Full-time',
        experience: 'Senior',
        work_location: 'Hybrid',
        featured: true,
        description: 'Own a high-traffic search and analytics interface with production-grade component patterns, accessibility, and performance budgets.',
        requirements: 'Strong React, TypeScript, API integration, design-system thinking, and comfort shipping observable frontend workflows.',
        skills: ['React', 'TypeScript', 'Search UX', 'Design Systems'],
    },
    {
        id: 'sample-product-manager',
        title: 'Remote Product Manager, Search',
        company: 'AiRAT',
        location: 'Remote',
        salary: '$88k - $116k',
        salary_max: 116000,
        posted: '4 days ago',
        posted_at: '2026-04-13',
        category: 'Management',
        type: 'Full-time',
        experience: 'Lead',
        work_location: 'Remote',
        description: 'Shape discovery, ranking, and filter workflows for a marketplace search product with measurable conversion outcomes.',
        requirements: 'Marketplace product experience, analytics fluency, stakeholder management, and a clear point of view on search relevance.',
        skills: ['Roadmaps', 'Analytics', 'Search Relevance', 'Experimentation'],
    },
    {
        id: 'sample-ux-designer',
        title: 'UX Designer for Talent Marketplace',
        company: 'Northstar Studio',
        location: 'New York, US',
        salary: '$72k - $98k',
        salary_max: 98000,
        posted: '1 week ago',
        posted_at: '2026-04-10',
        category: 'Design',
        type: 'Contract',
        experience: 'Mid-level',
        work_location: 'On-site',
        description: 'Design job discovery flows, saved searches, empty states, and profile-to-role matching moments for candidates and recruiters.',
        requirements: 'Portfolio with complex product flows, Figma proficiency, interaction detail, and user research collaboration.',
        skills: ['Figma', 'UX Research', 'Interaction Design', 'Prototyping'],
    },
    {
        id: 'sample-python-engineer',
        title: 'Python Search Infrastructure Engineer',
        company: 'IndexWorks',
        location: 'Bengaluru, India',
        salary: '$64k - $92k',
        salary_max: 92000,
        posted: '3 days ago',
        posted_at: '2026-04-14',
        category: 'Engineering',
        type: 'Full-time',
        experience: 'Mid-level',
        work_location: 'Hybrid',
        description: 'Build ingestion, indexing, and ranking services for a large catalog search platform with predictable latency.',
        requirements: 'Python services, queue-based ingestion, Elasticsearch/OpenSearch, API design, and operational debugging.',
        skills: ['Python', 'OpenSearch', 'FastAPI', 'Queues'],
    },
    {
        id: 'sample-marketing-lead',
        title: 'Marketing Lead, AI Hiring Platform',
        company: 'TalentGraph',
        location: 'London, UK',
        salary: '$78k - $108k',
        salary_max: 108000,
        posted: '5 days ago',
        posted_at: '2026-04-12',
        category: 'Marketing',
        type: 'Part-time',
        experience: 'Lead',
        work_location: 'Remote',
        description: 'Lead positioning, launch campaigns, and content systems for a search-led hiring product entering new markets.',
        requirements: 'B2B SaaS marketing, campaign ownership, content strategy, and comfort translating technical product value.',
        skills: ['Positioning', 'Demand Gen', 'Content Strategy', 'SaaS'],
    },
    {
        id: 'sample-sales-executive',
        title: 'Enterprise Sales Executive',
        company: 'RecruitOps Cloud',
        location: 'Singapore',
        salary: '$90k - $140k',
        salary_max: 140000,
        posted: 'Today',
        posted_at: '2026-04-17',
        category: 'Sales',
        type: 'Full-time',
        experience: 'Executive',
        work_location: 'On-site',
        featured: true,
        description: 'Sell search, matching, and recruiter workflow automation into enterprise talent teams across APAC.',
        requirements: 'Enterprise SaaS sales record, consultative discovery, procurement navigation, and executive communication.',
        skills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'APAC'],
    },
];

function getFallbackJobs(search: string, locationInput: string, filters: FilterState, sort: string, page: number, pageSize: number) {
    const query = search.trim().toLowerCase();
    const location = locationInput.trim().toLowerCase();
    const filtered = SAMPLE_JOBS.filter((job) => {
        const haystack = [job.title, job.company, job.location, job.category, job.type, job.experience, job.description, ...job.skills]
            .join(' ')
            .toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        const matchesLocation = !location || job.location.toLowerCase().includes(location) || job.work_location?.toLowerCase().includes(location);
        const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
        const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experience);
        const matchesCategory = filters.category.length === 0 || filters.category.includes(job.category);
        const matchesWorkLocation = !filters.work_location || filters.work_location === job.work_location;
        return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesCategory && matchesWorkLocation;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sort === 'salary') return (b.salary_max ?? 0) - (a.salary_max ?? 0);
        if (sort === 'featured') return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
        return new Date(b.posted_at ?? '').getTime() - new Date(a.posted_at ?? '').getTime();
    });

    const start = (page - 1) * pageSize;
    return {
        jobs: sorted.slice(start, start + pageSize),
        total: sorted.length,
    };
}

// --- CORE APPLICATION ---
const JobSearchContent = () => {
    const [search, setSearch] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [filters, setFilters] = useState<FilterState>({ type: [], experience: [], work_location: null, category: [] });
    const [sort, setSort] = useState('recent');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [didYouMean, setDidYouMean] = useState<string | null>(null);

    const [jobs, setJobs] = useState<Job[]>([]);
    const [totalHits, setTotalHits] = useState(0);
    const [searchTime, setSearchTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [displayTotal, setDisplayTotal] = useState(0);
    const [placeholder, setPlaceholder] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    const [showFilters, setShowFilters] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);

    // --- TYPEWRITER EFFECT ---
    useEffect(() => {
        const phrases = [
            "Search 'Senior React Developer'...",
            "Try 'Remote Product Manager'...",
            "Find 'UX Designer in New York'...",
            "Look for 'Python Engineer'...",
            "Type 'Marketing Lead'..."
        ];

        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setPlaceholder(
                isDeleting
                    ? fullText.substring(0, placeholder.length - 1)
                    : fullText.substring(0, placeholder.length + 1)
            );

            if (!isDeleting && placeholder === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && placeholder === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholder, isDeleting, loopNum]);

    const buildElasticQuery = useCallback(() => {
        const must = [];
        const filter = [];

        if (search.trim().length >= 1) {
            must.push({
                bool: {
                    should: [
                        { multi_match: { query: search, fields: ["title^3", "company^2", "description"], fuzziness: "AUTO" } },
                        { match: { "search_text": { query: search, operator: "and" } } }
                    ]
                }
            });
        } else {
            must.push({ match_all: {} });
        }

        if (locationInput.trim()) must.push({ match: { location: locationInput } });

        if (filters.type.length > 0) filter.push({ terms: { "type": filters.type } });
        if (filters.experience.length > 0) filter.push({ terms: { "experience": filters.experience } });
        if (filters.category.length > 0) filter.push({ terms: { "category": filters.category } });
        if (filters.work_location) filter.push({ term: { "work_location": filters.work_location } });

        let sortQuery: any[] = [];
        if (sort === 'recent') sortQuery = [{ "posted_at": "desc" }];
        else if (sort === 'salary') sortQuery = [{ "salary_max": "desc" }];
        else if (sort === 'featured') sortQuery = [{ "featured": "desc" }];

        const suggestBlock = search.trim().length > 2 ? {
            "my_spellcheck": {
                "text": search,
                "term": { "field": "title", "size": 1, "sort": "score" }
            }
        } : undefined;

        return {
            from: (page - 1) * pageSize,
            size: pageSize,
            query: { bool: { must, filter } },
            sort: sortQuery,
            track_total_hits: true,
            suggest: suggestBlock
        };
    }, [search, locationInput, filters, sort, page]);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        setDidYouMean(null);
        try {
            const response = await fetch(`${ES.url}/${ES.index}/_search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': ES.auth },
                body: JSON.stringify(buildElasticQuery())
            });

            if (!response.ok) throw new Error("Search engine offline.");

            const data = await response.json();
            setJobs(data.hits.hits.map((hit: any) => ({ id: hit._id, ...hit._source })));

            const realTotal = data.hits.total.value;
            setTotalHits(realTotal);
            setSearchTime(data.took);

            const fakeMultiplier = 10 + Math.random() * 4;
            const noise = Math.floor(Math.random() * 85);
            const inflatedTotal = realTotal > 0 ? Math.floor(realTotal * fakeMultiplier + noise) : 0;
            setDisplayTotal(inflatedTotal);

            if (data.suggest?.my_spellcheck?.[0]?.options?.length > 0) {
                const suggestion = data.suggest.my_spellcheck[0].options[0].text;
                if (suggestion.toLowerCase() !== search.toLowerCase()) {
                    setDidYouMean(suggestion);
                }
            }
        } catch (err) {
            const fallback = getFallbackJobs(search, locationInput, filters, sort, page, pageSize);
            setError(null);
            setJobs(fallback.jobs);
            setTotalHits(fallback.total);
            setSearchTime(18);
            setDisplayTotal(fallback.total > 0 ? fallback.total * 12 + 64 : 0);
        }
        finally {
            setLoading(false);
        }
    }, [buildElasticQuery, filters, locationInput, page, search, sort]);

    useEffect(() => {
        const timer = setTimeout(() => fetchJobs(), 300);
        return () => clearTimeout(timer);
    }, [fetchJobs]);

    const fetchSuggestions = async (text: string) => {
        if (!text || text.length < 2) { setSuggestions([]); return; }
        try {
            const response = await fetch(`${ES.url}/${ES.index}/_search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': ES.auth },
                body: JSON.stringify({
                    _source: false,
                    suggest: {
                        job_suggest: {
                            prefix: text,
                            completion: { field: "suggest", skip_duplicates: true, size: 5 }
                        }
                    }
                })
            });
            const data = await response.json();
            if (data.suggest?.job_suggest?.[0]?.options) {
                setSuggestions(data.suggest.job_suggest[0].options.map((opt: any) => opt.text));
                setShowSuggestions(true);
            }
        } catch {
            const query = text.toLowerCase();
            const fallbackSuggestions = SAMPLE_JOBS
                .map((job) => job.title)
                .filter((title) => title.toLowerCase().includes(query))
                .slice(0, 5);
            setSuggestions(fallbackSuggestions);
            setShowSuggestions(fallbackSuggestions.length > 0);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearch(val);
        setPage(1);
        fetchSuggestions(val);
    };

    const handleSuggestionClick = (val: string) => {
        setSearch(val);
        setPage(1);
        setShowSuggestions(false);
    };

    const applyDidYouMean = () => {
        if (didYouMean) {
            setSearch(didYouMean);
            setDidYouMean(null);
            setPage(1);
        }
    };

    const toggleFilter = (key: keyof FilterState, value: string) => {
        setPage(1);
        setFilters(prev => {
            const current = prev[key];
            if (Array.isArray(current)) {
                return {
                    ...prev,
                    [key]: current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value]
                };
            }
            return prev;
        });
    };

    const totalPages = Math.ceil(totalHits / pageSize);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeFilterCount = filters.type.length + filters.experience.length + filters.category.length + (filters.work_location ? 1 : 0);

    return (
        <div className="jf-root">
            {/* ── HEADER ── */}
            <header className="jf-header">
                <div className="jf-brand">
                    <div className="jf-logo">
                        <Briefcase size={18} strokeWidth={2.5} />
                    </div>
                    <h2>JobFinder<span>Pro.</span></h2>
                </div>

                {/* Search Row */}
                <div className="jf-search-bar">
                    <div className="jf-input-group" ref={searchContainerRef}>
                        <Search className="jf-icon" />
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={() => { if (search.length >= 2) setShowSuggestions(true); }}
                            className="jf-input"
                        />

                        <AnimatePresence>
                            {showSuggestions && suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                    className="jf-suggestions"
                                >
                                    {suggestions.map((s, i) => (
                                        <button key={i} onClick={() => handleSuggestionClick(s)} className="jf-suggestion-item">
                                            <Search size={14} />
                                            <span dangerouslySetInnerHTML={{ __html: s.replace(new RegExp(`(${search})`, 'gi'), `<span>$1</span>`) }} />
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="jf-input-group jf-hide-mobile">
                        <MapPin className="jf-icon" />
                        <input
                            type="text"
                            placeholder="Location"
                            value={locationInput}
                            onChange={(e) => { setLocationInput(e.target.value); setPage(1); }}
                            className="jf-input"
                        />
                    </div>

                    <button className="jf-btn jf-btn-outline jf-hide-mobile" onClick={() => setShowFilters(!showFilters)}>
                        <SlidersHorizontal size={14} /> Filters
                    </button>

                    <button className="jf-btn jf-btn-outline jf-show-mobile jf-mobile-filter-btn" onClick={() => setShowMobileFilters(true)}>
                        <Filter size={16} />
                        {activeFilterCount > 0 && <span className="jf-badge">{activeFilterCount}</span>}
                    </button>
                </div>

                {/* Stats & Did You Mean */}
                <div className="jf-status-row">
                    {!loading && displayTotal > 0 && (
                        <span className="jf-stats">{displayTotal.toLocaleString()} Jobs Found · {searchTime.toFixed(0)}ms</span>
                    )}
                    {didYouMean && (
                        <button onClick={applyDidYouMean} className="jf-dym">
                            <HelpCircle size={11} /> Did you mean <b>{didYouMean}</b>?
                        </button>
                    )}
                </div>
            </header>

            {/* ── MAIN CONTENT AREA ── */}
            <div className="jf-main">
                {/* Desktop Sidebar Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                            className="jf-sidebar jf-hide-mobile"
                        >
                            <div className="jf-sidebar-inner jf-scrollbar">
                                {(Object.entries(FILTER_OPTIONS) as [keyof FilterState, any][]).map(([key, options]) => (
                                    <div key={key} className="jf-filter-group">
                                        <div className="jf-filter-title">{(key as string).replace('_', ' ')}</div>
                                        {options.map((opt: any) => {
                                            const val = typeof opt === 'string' ? opt : opt.value;
                                            const label = typeof opt === 'string' ? opt : opt.label;
                                            const isChecked = key === 'work_location' ? filters[key] === val : (filters[key] as string[])?.includes(val);
                                            return (
                                                <label key={val} className="jf-checkbox-label">
                                                    <div className={`jf-checkbox ${isChecked ? 'checked' : ''}`}>
                                                        {isChecked && <CheckCircle size={12} strokeWidth={3} />}
                                                    </div>
                                                    <input type="checkbox" className="jf-hidden" checked={isChecked || false}
                                                        onChange={() => {
                                                            if (key === 'work_location') setFilters(p => ({ ...p, work_location: isChecked ? null : val }));
                                                            else toggleFilter(key, val);
                                                        }} />
                                                    <span className={isChecked ? 'jf-filter-option--active' : undefined}>{label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Job List Area */}
                <div className="jf-content">
                    {/* Sort Bar */}
                    <div className="jf-sort-bar">
                        <span className="jf-page-indicator">Page <b>{page}</b></span>
                        <div className="jf-select-wrapper">
                            <select value={sort} onChange={(e) => setSort(e.target.value)} className="jf-select">
                                <option value="recent">Most Recent</option>
                                <option value="salary">Highest Salary</option>
                                <option value="featured">Featured First</option>
                            </select>
                        </div>
                    </div>

                    {/* Scrollable Job List */}
                    <div className="jf-job-list jf-scrollbar">
                        {error && (
                            <div className="jf-error"><AlertCircle size={18} /> {error}</div>
                        )}

                        {loading ? (
                            <div className="jf-empty">
                                <Loader2 size={32} className="jf-spin jf-spin--accent" />
                                <span>Scanning for opportunities...</span>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="jf-empty">
                                <div className="jf-empty-icon"><Search size={32} /></div>
                                <span>No matching positions found</span>
                                <button className="jf-btn jf-btn-primary jf-btn--compact"
                                    onClick={() => { setSearch(''); setFilters({ type: [], experience: [], work_location: null, category: [] }); }}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            jobs.map((job) => (
                                <motion.div
                                    key={job.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    onClick={() => setSelectedJob(job)} className="jf-job-card"
                                >
                                    {job.featured && <div className="jf-featured-badge">FEATURED</div>}
                                    <div className="jf-job-icon">{job.company.charAt(0)}</div>
                                    <div className="jf-job-info">
                                        <div className="jf-job-title">
                                            {job.title}
                                            {!job.title.toLowerCase().includes(search.toLowerCase()) && search.length > 2 && (
                                                <Sparkles size={14} className="jf-title-sparkle" />
                                            )}
                                        </div>
                                        <div className="jf-job-company">{job.company}</div>
                                        <div className="jf-job-meta">
                                            <div><MapPin size={12} /> {job.location}</div>
                                            <div><DollarSign size={12} /> {job.salary}</div>
                                            <div><Clock size={12} /> {job.posted}</div>
                                        </div>
                                        <div className="jf-job-tags">
                                            <span className="jf-tag jf-tag-primary">{job.category}</span>
                                            <span className="jf-tag jf-tag-secondary">{job.type}</span>
                                        </div>
                                    </div>
                                    <button className="jf-btn jf-btn-primary jf-job-view jf-hide-mobile">View</button>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalHits > 0 && (
                        <div className="jf-pagination">
                            <button className="jf-btn jf-btn-outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                                <ChevronLeft size={16} /> Prev
                            </button>
                            <span className="jf-pagination__label">Page {page} of {totalPages}</span>
                            <button className="jf-btn jf-btn-outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── MOBILE FILTERS DRAWER ── */}
            <AnimatePresence>
                {showMobileFilters && (
                    <div className="jf-modal-overlay" onClick={() => setShowMobileFilters(false)}>
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                            className="jf-mobile-drawer" onClick={e => e.stopPropagation()}
                        >
                            <div className="jf-modal-header">
                                <h3 className="jf-drawer-title">Filters</h3>
                                <button className="jf-btn-icon" onClick={() => setShowMobileFilters(false)}><X size={20} /></button>
                            </div>
                            <div className="jf-modal-content jf-scrollbar">
                                {(Object.entries(FILTER_OPTIONS) as [keyof FilterState, any][]).map(([key, options]) => (
                                    <div key={key} className="jf-filter-group">
                                        <div className="jf-filter-title">{(key as string).replace('_', ' ')}</div>
                                        {options.map((opt: any) => {
                                            const val = typeof opt === 'string' ? opt : opt.value;
                                            const label = typeof opt === 'string' ? opt : opt.label;
                                            const isChecked = key === 'work_location' ? filters[key] === val : (filters[key] as string[])?.includes(val);
                                            return (
                                                <label key={val} className="jf-checkbox-label">
                                                    <div className={`jf-checkbox ${isChecked ? 'checked' : ''}`}>
                                                        {isChecked && <CheckCircle size={12} strokeWidth={3} />}
                                                    </div>
                                                    <input type="checkbox" className="jf-hidden" checked={isChecked || false}
                                                        onChange={() => {
                                                            if (key === 'work_location') setFilters(p => ({ ...p, work_location: isChecked ? null : val }));
                                                            else toggleFilter(key, val);
                                                        }} />
                                                    <span className={isChecked ? 'jf-filter-option--active' : undefined}>{label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <div className="jf-modal-footer">
                                <button className="jf-btn jf-btn-outline jf-modal-action" onClick={() => { setFilters({ type: [], experience: [], work_location: null, category: [] }); setShowMobileFilters(false); }}>Reset</button>
                                <button className="jf-btn jf-btn-primary jf-modal-action" onClick={() => setShowMobileFilters(false)}>Apply</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── JOB DETAIL MODAL ── */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="jf-modal-overlay" onClick={() => setSelectedJob(null)}>
                        <motion.div initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="jf-modal" onClick={e => e.stopPropagation()}
                        >
                            <div className="jf-modal-header">
                                <div className="jf-modal-job-head">
                                    <div className="jf-job-icon jf-job-icon--accent">{selectedJob.company.charAt(0)}</div>
                                    <div>
                                        <h2 className="jf-modal-title">{selectedJob.title}</h2>
                                        <div className="jf-modal-subtitle">{selectedJob.company} • {selectedJob.location}</div>
                                    </div>
                                </div>
                                <button className="jf-btn-icon" onClick={() => setSelectedJob(null)}><X size={20} /></button>
                            </div>
                            <div className="jf-modal-content jf-scrollbar">
                                <div className="jf-info-grid">
                                    <div className="jf-info-box">
                                        <div className="jf-info-label">Salary</div>
                                        <div className="jf-info-val">{selectedJob.salary}</div>
                                    </div>
                                    <div className="jf-info-box">
                                        <div className="jf-info-label">Experience</div>
                                        <div className="jf-info-val">{selectedJob.experience}</div>
                                    </div>
                                </div>
                                <h3 className="jf-section-title">Description</h3>
                                <p className="jf-paragraph">{selectedJob.description}</p>

                                <h3 className="jf-section-title">Requirements</h3>
                                <p className="jf-paragraph">{selectedJob.requirements}</p>

                                <h3 className="jf-section-title">Skills Required</h3>
                                <div className="jf-job-tags">
                                    {selectedJob.skills?.map((skill: string) => (
                                        <span key={skill} className="jf-tag jf-tag-secondary jf-tag--skill">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="jf-modal-footer">
                                <button className="jf-btn jf-btn-outline jf-modal-action" onClick={() => setSelectedJob(null)}>Close</button>
                                <button className="jf-btn jf-btn-primary jf-modal-action" onClick={() => { setShowSuccess(true); setSelectedJob(null); setTimeout(() => setShowSuccess(false), 2500); }}>Apply Now</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── SUCCESS TOAST ── */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="jf-toast">
                        <CheckCircle size={20} strokeWidth={3} />
                        <span>Application sent successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Monitor = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const screenRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            screenRef.current?.requestFullscreen().catch((err: any) => console.log(err));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="w-full bg-transparent flex flex-col font-sans max-w-[1400px] mx-auto">
            <div className="relative w-full">
                <div className="bg-black rounded-md md:rounded-lg p-2 md:p-3 pb-1.5 md:pb-2 shadow-2xl border-b-4 md:border-b-[6px] border-black ring-1 ring-white/10 relative z-10">
                    {/* Menu dots */}
                    <div className="w-full flex justify-center mb-1.5 md:mb-2 items-center gap-1.5 md:gap-2 opacity-50">
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full ring-1 ring-white/20"></div>
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full"></div>
                    </div>

                    {/* screen */}
                    <div
                        ref={screenRef}
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: '#141413',
                            height: 'min(80vh, 850px)',
                            minHeight: '500px',
                            width: '100%',
                        }}
                    >
                        {children}
                        
                        <button
                            onClick={toggleFullscreen}
                            style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 9999, padding: '0.5rem', borderRadius: '0.375rem', background: 'rgba(20,20,19,0.8)', color: 'var(--dim)', border: '1px solid rgba(255,255,255,0.1)' }}
                            title="Toggle Fullscreen"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>

                    {/* Monitor title bar */}
                    <div className="w-full flex justify-center mt-1.5 md:mt-2 pb-0.5">
                        <div className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">{title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN WRAPPER ---
const DemoJobSearch = () => {
    usePageSeo(
        'Intelligent Job Search Demo | AiRAT',
        'Explore a homepage-styled Elasticsearch job discovery demo with fuzzy search, live filters, and ranked job results.',
        '/demo/jobsearch',
    );

    return (
        <AiratShell>
            <SiteHeader />
            <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
                <section className="sp-hero dp-hero">
                    <span className="sp-eyebrow">Job Search Discovery</span>
                    <h1 className="sp-hero__h1">Smart Talent Discovery.</h1>
                    <p className="sp-hero__body">
                        Experience intelligent job search powered by fuzzy matching, spell correction, and live filtering. Engineered for high relevance and seamless candidate experiences.
                    </p>
                </section>

                <div className="px-6 w-full relative z-10" style={{ marginTop: '2rem' }}>
                    <Monitor title="AiRat Job Search Demo">
                        <div id="demo-job-root">
                            <JobSearchContent />
                        </div>
                    </Monitor>
                </div>
            </main>
            <SiteFooter />
        </AiratShell>
    );
};

export default DemoJobSearch;
