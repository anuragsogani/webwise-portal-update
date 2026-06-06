import React, {
    useState, useEffect, useCallback,
    createContext, useContext, useRef,
} from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
    ShoppingBag, Search, X, Grid, Smartphone, Laptop,
    Headphones, Plus, Minus, Trash2, CheckCircle, ArrowRight,
    Loader2, Star,
    Shirt, Armchair, Sparkles, Dumbbell, Tag,
    ChevronDown, ArrowUpDown, HelpCircle, Maximize2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import AiratShell from '../components/AiratShell';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import '../styles/demoEcom.css';

// ─────────────────────────────────────────────────────────────
//  ES CONFIG
// ─────────────────────────────────────────────────────────────
const ES = {
    url: 'https://airat.in/elastic',
    index: 'ecom_products',
    auth: 'Basic ' + btoa('airat_web:Sodala@MJRP2024'),
};

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
interface Product {
    id: string; name: string; description: string;
    category: string; sub_category: string; product_type: string;
    brand: string; price: number; discount_percentage: number;
    rating: number; stock: number; is_active: boolean;
    Icon: LucideIcon;
}
interface CartItem extends Product { quantity: number; }
interface Toast { id: number; message: string; }

interface ShopCtx {
    items: Product[]; isLoading: boolean;
    activeCategory: string; setActiveCategory: (c: string) => void;
    activeSubFilter: string | null; setActiveSubFilter: (f: string | null) => void;
    searchQuery: string; setSearchQuery: (q: string) => void;
    isCartOpen: boolean; setIsCartOpen: (o: boolean) => void;
    cart: CartItem[];
    addToCart: (p: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    toasts: Toast[];
    brands: string[];
    searchTime: number; sortBy: string; setSortBy: (s: string) => void;
    suggestions: string[]; didYouMean: string | null;
    applySuggestion: (s: string) => void; clearSuggestions: () => void;
    displayTotal: number;
    isSidebarOpen: boolean; setIsSidebarOpen: (o: boolean) => void;
    currentPage: number; setCurrentPage: (p: number) => void;
    pageSize: number;
}

function sortProducts(items: Product[], sortBy: string) {
    const sorted = [...items];
    if (sortBy === 'price_asc') return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') return sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
}

function filterProducts(items: Product[], activeCategory: string, activeSubFilter: string | null, sortBy: string) {
    const categoryFiltered = activeCategory === 'All'
        ? items
        : items.filter(item => item.category === activeCategory);

    const subFiltered = activeSubFilter
        ? categoryFiltered.filter(item => item.brand === activeSubFilter || item.sub_category === activeSubFilter)
        : categoryFiltered;

    return sortProducts(subFiltered, sortBy);
}

// ─────────────────────────────────────────────────────────────
//  CATEGORY MAP
// ─────────────────────────────────────────────────────────────
const CAT_ICONS: Record<string, LucideIcon> = {
    Electronics: Smartphone,
    Fashion: Shirt,
    'Home & Kitchen': Armchair,
    'Beauty & Personal Care': Sparkles,
    'Sports & Fitness': Dumbbell,
};

function pickIcon(cat: string, type = ''): LucideIcon {
    const c = cat.toLowerCase(); const t = type.toLowerCase();
    if (c.includes('electronics')) {
        if (t.includes('audio') || t.includes('head')) return Headphones;
        if (t.includes('laptop')) return Laptop;
        return Smartphone;
    }
    if (c.includes('fashion')) return Shirt;
    if (c.includes('home')) return Armchair;
    if (c.includes('beauty')) return Sparkles;
    if (c.includes('sports')) return Dumbbell;
    return Grid;
}

// ─────────────────────────────────────────────────────────────
//  CONTEXT
// ─────────────────────────────────────────────────────────────
const ShopContext = createContext<ShopCtx | undefined>(undefined);

const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [searchTime, setSearchTime] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');
    const [brands, setBrands] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [didYouMean, setDidYouMean] = useState<string | null>(null);
    const [displayTotal, setDisplayTotal] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        const run = async () => {
            setIsLoading(true);
            try {
                const must: object[] = searchQuery.trim()
                    ? [{ multi_match: { query: searchQuery, fields: ['name.search_autocomplete^3', 'name.ngram', 'brand^2', 'search_text'], fuzziness: 'AUTO' } }]
                    : [{ match_all: {} }];

                const t0 = performance.now();
                const res = await fetch(`${ES.url}/${ES.index}/_search`, {
                    method: 'POST',
                    headers: { Authorization: ES.auth, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        size: 300,
                        query: { bool: { must } },
                        ...(searchQuery.trim() && {
                            suggest: { spell: { text: searchQuery, term: { field: 'name' } } },
                        }),
                    }),
                });
                if (!res.ok) throw new Error();
                const data = await res.json();

                setSearchTime(performance.now() - t0);

                const dym = data.suggest?.spell?.[0]?.options?.[0]?.text;
                setDidYouMean(dym && dym !== searchQuery ? dym : null);
                setSuggestions(searchQuery.trim()
                    ? data.hits.hits.slice(0, 6).map((h: { _source: { name: string } }) => h._source.name)
                    : []);

                const mapped: Product[] = data.hits.hits.map((h: { _id: string; _source: Record<string, unknown> }) => ({
                    id: (h._source.product_id as string) || h._id,
                    name: h._source.name as string,
                    description: (h._source.description as string) ?? '',
                    category: h._source.category as string,
                    sub_category: h._source.sub_category as string,
                    product_type: h._source.product_type as string,
                    brand: h._source.brand as string,
                    price: (h._source.price as number) ?? 0,
                    discount_percentage: (h._source.discount_percentage as number) ?? 0,
                    rating: (h._source.rating as number) ?? 0,
                    stock: (h._source.stock as number) ?? 0,
                    is_active: h._source.is_active as boolean,
                    Icon: pickIcon(h._source.category as string, h._source.product_type as string),
                }));
                const visibleItems = filterProducts(mapped, activeCategory, activeSubFilter, sortBy);
                const visibleBrands = Array.from(new Set(
                    (activeCategory === 'All' ? mapped : mapped.filter(item => item.category === activeCategory))
                        .map(item => item.brand)
                ));

                setBrands(visibleBrands);
                setItems(visibleItems);
                setDisplayTotal(visibleItems.length);
            } catch {
                const MOCK_ITEMS: Product[] = [
                    { id: '1', name: 'Sony WH-1000XM5 Headphones', description: 'Industry leading noise cancellation.', category: 'Electronics', sub_category: 'Audio', product_type: 'Headphones', brand: 'Sony', price: 29990, discount_percentage: 10, rating: 4.8, stock: 12, is_active: true, Icon: pickIcon('Electronics', 'Headphones') },
                    { id: '2', name: 'Classic Pure Cotton T-Shirt', description: 'Comfortable everyday wear.', category: 'Fashion', sub_category: 'Clothing', product_type: 'Shirt', brand: 'Puma', price: 1299, discount_percentage: 5, rating: 4.4, stock: 120, is_active: true, Icon: pickIcon('Fashion', 'Shirt') },
                    { id: '3', name: 'Apple Watch Series 9', description: 'Advanced health features.', category: 'Electronics', sub_category: 'Wearables', product_type: 'Smartwatch', brand: 'Apple', price: 41900, discount_percentage: 0, rating: 4.9, stock: 6, is_active: true, Icon: pickIcon('Electronics', 'Watch') },
                    { id: '4', name: 'Ergonomic Office Chair', description: 'Posture support for long hours.', category: 'Home & Kitchen', sub_category: 'Furniture', product_type: 'Chair', brand: 'Green Soul', price: 15490, discount_percentage: 15, rating: 4.5, stock: 18, is_active: true, Icon: pickIcon('Home & Kitchen', 'Armchair') },
                    { id: '5', name: 'Vitamin C Luminous Serum', description: 'Skin brightening formula.', category: 'Beauty & Personal Care', sub_category: 'Skincare', product_type: 'Serum', brand: 'Minimalist', price: 699, discount_percentage: 0, rating: 4.6, stock: 50, is_active: true, Icon: pickIcon('Beauty & Personal Care', 'Sparkles') },
                    { id: '6', name: 'Hex Adjustable Dumbbells 20kg', description: 'Dynamic home workout weights.', category: 'Sports & Fitness', sub_category: 'Weights', product_type: 'Dumbbell', brand: 'Cultsport', price: 6500, discount_percentage: 20, rating: 4.7, stock: 4, is_active: true, Icon: pickIcon('Sports & Fitness', 'Dumbbell') },
                ];
                const visibleItems = filterProducts(MOCK_ITEMS, activeCategory, activeSubFilter, sortBy);
                const visibleBrands = Array.from(new Set(
                    (activeCategory === 'All' ? MOCK_ITEMS : MOCK_ITEMS.filter(item => item.category === activeCategory))
                        .map(item => item.brand)
                ));

                setBrands(visibleBrands);
                setItems(visibleItems);
                setDisplayTotal(visibleItems.length);
            } finally {
                setIsLoading(false);
            }
        };
        const t = setTimeout(run, 300);
        return () => clearTimeout(t);
    }, [searchQuery, activeCategory, activeSubFilter, sortBy]);

    useEffect(() => { setActiveSubFilter(null); }, [activeCategory]);
    useEffect(() => { setCurrentPage(1); }, [searchQuery, activeCategory, activeSubFilter, sortBy]);

    const toast = (msg: string) => {
        const id = Date.now();
        setToasts(p => [...p, { id, message: msg }]);
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
    };

    const addToCart = useCallback((product: Product) => {
        let message = '';
        setCart(prev => {
            const ex = prev.find(i => i.id === product.id);
            if (ex) {
                message = 'Qty updated';
                return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            message = `Added ${product.name}`;
            return [...prev, { ...product, quantity: 1 }];
        });
        if (message) toast(message);
        setIsCartOpen(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeFromCart = useCallback((id: string) => setCart(p => p.filter(i => i.id !== id)), []);
    const updateQuantity = useCallback((id: string, d: number) => setCart(p => p.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i)), []);
    const applySuggestion = useCallback((s: string) => { setSearchQuery(s); setSuggestions([]); setDidYouMean(null); }, []);
    const clearSuggestions = useCallback(() => setSuggestions([]), []);

    return (
        <ShopContext.Provider value={{
            items, isLoading, activeCategory, setActiveCategory,
            activeSubFilter, setActiveSubFilter, brands,
            searchQuery, setSearchQuery, isCartOpen, setIsCartOpen,
            cart, addToCart, removeFromCart, updateQuantity, toasts,
            searchTime, sortBy, setSortBy,
            suggestions, didYouMean, applySuggestion, clearSuggestions,
            displayTotal, isSidebarOpen, setIsSidebarOpen,
            currentPage, setCurrentPage, pageSize,
        }}>
            {children}
        </ShopContext.Provider>
    );
};

const useShop = () => {
    const c = useContext(ShopContext);
    if (!c) throw new Error('useShop outside ShopProvider');
    return c;
};

// ─────────────────────────────────────────────────────────────
//  SKELETON
// ─────────────────────────────────────────────────────────────
const Skeleton = () => (
    <div className="ec-skeleton">
        <div className="ec-skeleton-shimmer ec-shimmer" />
        <div className="ec-skeleton-img" />
        <div className="ec-skeleton-title" />
        <div className="ec-skeleton-sub" />
        <div className="ec-skeleton-btn" />
    </div>
);

// ─────────────────────────────────────────────────────────────
//  PRODUCT CARD
// ─────────────────────────────────────────────────────────────
const ProductCard = React.memo(({ product }: { product: Product }) => {
    const { addToCart } = useShop();
    const Icon = product.Icon;
    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            whileHover={{ y: -5, transition: { duration: 0.18 } }}
            className="ec-product-card"
        >
            {/* badges */}
            <div className="ec-card-badges">
                {product.rating > 4.7 && (
                    <span className="ec-badge-rating">
                        <Star size={8} fill="currentColor" /> {product.rating}
                    </span>
                )}
                {product.discount_percentage > 0 && (
                    <span className="ec-badge-discount">
                        -{product.discount_percentage}%
                    </span>
                )}
            </div>

            {/* icon area */}
            <div className="ec-card-icon-area">
                <motion.div whileHover={{ scale: 1.15, rotate: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Icon
                        size={44}
                        strokeWidth={1}
                        style={{ color: 'var(--dim)' }}
                    />
                </motion.div>
            </div>

            {/* info */}
            <div className="ec-card-body">
                <div className="ec-card-brand-label">{product.brand}</div>
                <h3 className="ec-card-name">{product.name}</h3>
                <p className="ec-card-sub">{product.sub_category} · {product.stock > 0 ? 'In Stock' : 'Out'}</p>

                <div className="ec-card-price-row">
                    <span className="ec-card-price">₹{product.price.toLocaleString()}</span>
                    {product.discount_percentage > 0 && (
                        <span className="ec-card-original-price">
                            ₹{(product.price * (1 + product.discount_percentage / 100)).toFixed(0)}
                        </span>
                    )}
                </div>

                <div>
                    <button
                        onClick={() => addToCart(product)}
                        className="ec-add-btn"
                    >
                        <Plus size={14} strokeWidth={2.5} /> Add to Bag
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

// ─────────────────────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────────────────────
const NavItems = () => {
    const { activeCategory, setActiveCategory, items, isLoading, setIsSidebarOpen } = useShop();
    const menu = [
        { name: 'All', Icon: Grid },
        ...Object.entries(CAT_ICONS).map(([name, Icon]) => ({ name, Icon })),
    ];

    return (
        <nav className="ec-sidebar-nav">
            <p className="ec-sidebar-dept">Departments</p>
            {menu.map(({ name, Icon }) => {
                const active = activeCategory === name;
                const count = name === 'All' ? items.length : items.filter(i => i.category === name).length;
                return (
                    <button key={name} onClick={() => { setActiveCategory(name); setIsSidebarOpen(false); }}
                        className={`ec-sidebar-btn${active ? ' active' : ''}`}
                    >
                        <div className="ec-sidebar-btn-inner">
                            <Icon size={16} strokeWidth={active ? 2 : 1.5} className="ec-sidebar-btn-icon" />
                            <span className="ec-sidebar-btn-label">{name}</span>
                        </div>
                        {!isLoading && (
                            <span className="ec-sidebar-count"
                                style={{ background: active ? 'var(--lime)' : 'transparent', color: active ? 'var(--void)' : 'inherit' }}>
                                {count}
                            </span>
                        )}
                       
                    </button>
                );
            })}
        </nav>
    );
};

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useShop();

    return (
        <>
            {/* Desktop */}
            <aside className="ec-sidebar-desktop">
                <div className="ec-sidebar-logo-row">
                    <div className="ec-sidebar-logo">
                        <Grid size={16} color="var(--white)" strokeWidth={2.5} />
                    </div>
                    <span className="ec-sidebar-brand-text">
                        AiRat<span style={{ color: 'var(--lime)' }}>.</span>
                    </span>
                </div>
                <NavItems />
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="ec-sidebar-overlay" style={{ background: 'rgba(20, 20, 19, 0.8)', backdropFilter: 'blur(8px)' }} />
                        <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                            className="ec-sidebar-mobile">
                            <div className="ec-sidebar-mobile-hdr">
                                <span className="ec-sidebar-mobile-brand">AiRat<span style={{ color: 'var(--lime)' }}>.</span></span>
                                <button onClick={() => setIsSidebarOpen(false)} className="ec-sidebar-close"><X size={18} /></button>
                            </div>
                            <NavItems />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// ─────────────────────────────────────────────────────────────
//  CART DRAWER
// ─────────────────────────────────────────────────────────────
const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity } = useShop();
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="ec-cart-overlay" style={{ background: 'rgba(20, 20, 19, 0.6)', backdropFilter: 'blur(8px)' }} />

                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        className="ec-cart-panel">

                        {/* header */}
                        <div className="ec-cart-hdr">
                            <div className="ec-flex-row">
                                <h2 className="ec-cart-title">Your Bag</h2>
                                <span className="ec-cart-count">
                                    {cart.reduce((a, i) => a + i.quantity, 0)} Items
                                </span>
                            </div>
                            <button onClick={() => setIsCartOpen(false)} className="ec-cart-close-btn">
                                <X size={18} />
                            </button>
                        </div>

                        {/* items */}
                        <div className="ec-cart-items-list">
                            {cart.length === 0 ? (
                                <div className="ec-cart-empty">
                                    <div className="ec-cart-empty-icon">
                                        <ShoppingBag size={28} strokeWidth={1.5} />
                                    </div>
                                    <p className="ec-cart-empty-text">Your bag is empty</p>
                                </div>
                            ) : (
                                <LayoutGroup>
                                    <AnimatePresence mode="popLayout">
                                        {cart.map(item => {
                                            const Icon = item.Icon;
                                            return (
                                                <motion.div key={item.id} layout
                                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                                    className="ec-cart-item">
                                                    <div className="ec-cart-item-icon">
                                                        <Icon size={28} strokeWidth={1.5} style={{ color: 'var(--dim)' }} />
                                                    </div>
                                                    <div className="ec-cart-item-body">
                                                        <div className="ec-cart-item-top">
                                                            <div className="ec-min-w0">
                                                                <p className="ec-cart-item-name">{item.name}</p>
                                                                <p className="ec-cart-item-brand">{item.brand}</p>
                                                            </div>
                                                            <span className="ec-cart-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                        </div>
                                                        <div className="ec-cart-item-bottom">
                                                            <div className="ec-qty-controls">
                                                                <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}
                                                                    className="ec-qty-btn">
                                                                    <Minus size={12} />
                                                                </button>
                                                                <span className="ec-qty-val">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, 1)} className="ec-qty-btn">
                                                                    <Plus size={12} />
                                                                </button>
                                                            </div>
                                                            <button onClick={() => removeFromCart(item.id)} className="ec-remove-btn">
                                                                <Trash2 size={12} /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </LayoutGroup>
                            )}
                        </div>

                        {/* footer */}
                        {cart.length > 0 && (
                            <div className="ec-cart-footer">
                                <div className="ec-cart-total-row">
                                    <span>Subtotal</span>
                                    <span style={{ color: 'var(--white)', fontWeight: 700 }}>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="ec-cart-total-row">
                                    <span>Shipping</span>
                                    <span style={{ color: 'var(--lime)', fontWeight: 700, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.05em' }}>Free</span>
                                </div>
                                <button className="ec-checkout-btn">
                                    Checkout securely
                                    <ArrowRight size={16} className="ec-arrow-icon" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// ─────────────────────────────────────────────────────────────
//  MAIN CONTENT
// ─────────────────────────────────────────────────────────────
const MainContent = () => {
    const {
        items, isLoading, activeCategory,
        searchQuery, setSearchQuery, cart, setIsCartOpen,
        toasts, brands, activeSubFilter, setActiveSubFilter,
        searchTime, sortBy, setSortBy,
        suggestions, didYouMean, applySuggestion, clearSuggestions,
        displayTotal, currentPage, setCurrentPage, pageSize,
    } = useShop();

    const searchRef = useRef<HTMLDivElement>(null);
    const totalPages = Math.ceil(items.length / pageSize);
    const paginatedItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) clearSuggestions();
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [clearSuggestions]);

    return (
        <div className="ec-main">

            {/* ── HEADER ── */}
            <header className="ec-header">

                {/* <button onClick={() => setIsSidebarOpen(true)} className="ec-menu-btn">
                    <Menu size={20} />
                </button> */}

                {/* search */}
                <div className="ec-search-box" ref={searchRef}>
                    <Search className="ec-search-icon" size={15} />
                    <input
                        type="text"
                        placeholder="Search products, brands…"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="ec-search-input"
                    />
                    <AnimatePresence>
                        {suggestions.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                className="ec-suggestions">
                                {suggestions.map((s, i) => (
                                    <button key={i} onClick={() => applySuggestion(s)}
                                        className="ec-suggestion-item">
                                        <Search size={13} style={{ color: 'var(--muted)' }} />
                                        <span className="ec-suggestion-text" dangerouslySetInnerHTML={{ __html: s.replace(new RegExp(`(${searchQuery})`, 'gi'), `<span style="color:var(--lime);font-weight:600">$1</span>`) }} />
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="ec-search-meta">
                        {!isLoading && displayTotal > 0 && (
                            <span className="ec-search-stats">
                                {displayTotal.toLocaleString()} Results · {searchTime.toFixed(0)}ms
                            </span>
                        )}
                        {didYouMean && (
                            <button onClick={() => applySuggestion(didYouMean)} className="ec-dym-btn">
                                <HelpCircle size={11} /> Did you mean <b style={{ fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{didYouMean}</b>?
                            </button>
                        )}
                    </div>
                </div>

                {/* sort */}
                <div className="ec-sort-ctrl">
                    <ArrowUpDown size={14} />
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                        className="ec-sort-select">
                        <option value="relevance" style={{ background: 'var(--card)' }}>Relevance</option>
                        <option value="price_asc" style={{ background: 'var(--card)' }}>Price: Low to High</option>
                        <option value="price_desc" style={{ background: 'var(--card)' }}>Price: High to Low</option>
                        <option value="rating" style={{ background: 'var(--card)' }}>Top Rated</option>
                    </select>
                    <ChevronDown size={13} />
                </div>

                {/* cart */}
                <button onClick={() => setIsCartOpen(true)} className="ec-cart-btn">
                    <ShoppingBag size={18} />
                    {cart.length > 0 && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="ec-cart-badge">
                            {cart.reduce((a, i) => a + i.quantity, 0)}
                        </motion.span>
                    )}
                </button>
            </header>

            {/* ── FEED ── */}
            <main className="ec-feed">
                {/* heading + brand pills */}
                <div className="ec-feed-inner">
                    <div className="ec-feed-title-row">
                        <div>
                            <motion.h1 key={activeCategory} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="ec-feed-title">
                                {activeCategory === 'All' ? 'Discover Products' : activeCategory}
                            </motion.h1>
                            <p className="ec-feed-subtitle">
                                {isLoading
                                    ? <span className="ec-flex-row"><Loader2 className="ec-spin" size={14} /> Fetching catalog…</span>
                                    : `Showing ${items.length} top selections`}
                            </p>
                        </div>
                    </div>

                    {brands.length > 0 && (
                        <div className="ec-brand-pills">
                            {[{ label: 'All Brands', value: null }, ...brands.map(b => ({ label: b, value: b }))].map(({ label, value }) => {
                                const active = activeSubFilter === value;
                                return (
                                    <button key={label} onClick={() => setActiveSubFilter(value)}
                                        className={`ec-brand-pill${active ? ' active' : ''}`}>
                                        {value && <Tag size={10} />} {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* grid */}
                <LayoutGroup>
                    <motion.div layout className="ec-product-grid">
                        <AnimatePresence mode="popLayout">
                            {isLoading
                                ? [...Array(10)].map((_, i) => <Skeleton key={i} />)
                                : items.length === 0
                                    ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="ec-no-results">
                                            <div className="ec-no-results-icon">
                                                <Search size={32} style={{ color: 'var(--dim)' }} />
                                            </div>
                                            <p className="ec-no-results-text">We couldn't find any matching products</p>
                                            <button onClick={() => setSearchQuery('')} className="ec-clear-btn">
                                                Clear Filters
                                            </button>
                                        </motion.div>
                                    )
                                    : paginatedItems.map(p => <ProductCard key={p.id} product={p} />)}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>

                {/* pagination */}
                {items.length > 0 && !isLoading && (
                    <div className="ec-pagination">
                        <button className="ec-page-btn" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                            <ChevronLeft size={14} /> Prev
                        </button>
                        <span className="ec-page-info">Page {currentPage} of {totalPages}</span>
                        <button className="ec-page-btn" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                            Next <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </main>

            {/* ── TOASTS ── */}
            <div className="ec-toasts">
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div key={t.id} layout
                            initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="ec-toast">
                            <CheckCircle size={18} style={{ color: 'var(--lime)' }} />
                            <span className="ec-toast-text">{t.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
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

// ─────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────
const DemoEcom = () => {
    return (
        <AiratShell>
            <SiteHeader />
            <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
                <section className="sp-hero dp-hero">
                    <span className="sp-eyebrow">E-Commerce Search</span>
                    <h1 className="sp-hero__h1">High-Performance E-Commerce Discovery.</h1>
                    <p className="sp-hero__body">
                        Experience lightning-fast, typo-tolerant search with intelligent filtering and 
                        dynamic result ranking. Built for conversion and scale.
                    </p>
                </section>

                <div className="px-6 w-full relative z-10" style={{ marginTop: '2rem' }}>
                    <Monitor title="AiRat E-Commerce Demo">
                        <div id="demo-ecom-root">
                            <ShopProvider>
                                <Sidebar />
                                <MainContent />
                                <CartDrawer />
                            </ShopProvider>
                        </div>
                    </Monitor>
                </div>
            </main>
            <SiteFooter />
        </AiratShell>
    );
};

export default DemoEcom;
