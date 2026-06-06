import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Wallet, ShoppingBag, User, Search, MapPin, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
  Trash2, Edit3, Filter, ListFilter, X, Tag, Bell, 
  Check, Plus, Minus, Truck, Play 
} from 'lucide-react';
import AiratShell from '../components/AiratShell';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import '../styles/androidDemo.css';

// ─── White-label Config ───────────────────────────────────────────────────────
const APP_CONFIG = {
  appName: 'BloomDaily',
  tagline: 'Fresh Flowers, Every Morning',
  address: '123 Green Avenue, Your City.',
  addressShort: 'Home',
  deliveryWindow: '7:00 AM – 9:00 AM',
  currency: '₹',
  supportText: 'Our customer care is available 24/7',
  quoteOfDay: '"Every flower is a soul blossoming in nature."',
  freeDeliveryText: 'Free Delivery • 5–15 min slots',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type TabType = 'home' | 'shop' | 'wallet' | 'basket' | 'account';
type ScreenType = 'main' | 'productDetail' | 'thankyou' | 'exploreCategory';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  interval: string;
  gradient: string;
  category: 'Puja Packs' | 'Exotic Packs';
  tag?: string;
  description?: string;
  includes?: string[];
  weight?: string;
  emoji: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  emoji: string;
  bg: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PUJA_PRODUCTS: Product[] = [
  {
    id: 'p1', name: 'Sacred Pack', price: 25, originalPrice: 35,
    interval: 'Day', gradient: 'linear-gradient(135deg,#f59e0b,#b45309)',
    category: 'Puja Packs',
    tag: 'SellFast', description: 'Mixed flowers daily', emoji: '🌼',
    includes: ['Bel Leaves', 'Lotus', 'Marigold', 'White Lotus'], weight: '120 grams',
  },
  {
    id: 'p2', name: 'Blossom Pack', price: 25, originalPrice: 35,
    interval: 'Day', gradient: 'linear-gradient(135deg,#fbbf24,#d97706)',
    category: 'Puja Packs',
    tag: 'Daily', description: 'Mixed flowers daily', emoji: '🌸',
    includes: ['Bel Leaves', 'Lotus', 'Marigold'], weight: '100 grams',
  },
  {
    id: 'p3', name: 'Divine Pack', price: 25, originalPrice: 35,
    interval: 'Day', gradient: 'linear-gradient(135deg,#92400e,#78350f)',
    category: 'Puja Packs',
    tag: 'Daily', description: 'Mixed flowers daily', emoji: '🪷',
    includes: ['Bel Leaves', 'Lotus', 'Rose', 'White Lotus'], weight: '150 grams',
  },
];

const EXOTIC_PRODUCTS: Product[] = [
  { id: 'e1', name: 'Oriental Lily', price: 25, interval: 'Day', gradient: 'linear-gradient(135deg,#7c3aed,#4c1d95)', category: 'Exotic Packs', tag: 'Daily', description: 'Mixed flowers daily', emoji: '🌷' },
  { id: 'e2', name: 'Rose Devotion', price: 25, interval: 'Day', gradient: 'linear-gradient(135deg,#dc2626,#991b1b)', category: 'Exotic Packs', tag: 'Daily', description: 'Mixed flowers daily', emoji: '🌹' },
  { id: 'e3', name: 'Blue Orchid', price: 25, interval: 'Day', gradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', category: 'Exotic Packs', tag: 'Daily', description: 'Mixed flowers daily', emoji: '💐' },
];

const ADD_ONS: AddOn[] = [
  { id: 'a1', name: 'Marigold Garland', price: 20, originalPrice: 25, emoji: '🪻', bg: 'var(--ad-amber-50)' },
  { id: 'a2', name: 'Rose Garland', price: 30, originalPrice: 35, emoji: '🌹', bg: 'var(--ad-red-50)' },
  { id: 'a3', name: 'Lotus Garland', price: 30, originalPrice: 35, emoji: '🌸', bg: 'var(--ad-pink-50)' },
];

const DELIVERY_HISTORY = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: 'Premium Daily Pack',
  time: 'Today, 7:30 AM',
  status: i % 2 === 0 ? 'Delivered' : 'Undelivered',
}));

const C = APP_CONFIG.currency;

// ─── Shared Icons ─────────────────────────────────────────────────────────────
const IC = {
  Home: () => <Home size={20} />,
  Wallet: () => <Wallet size={20} />,
  Basket: () => <ShoppingBag size={20} />,
  User: () => <User size={20} />,
  Search: () => <Search size={15} strokeWidth={2.5} />,
  MapPin: () => <MapPin size={13} strokeWidth={2.5} />,
  ChevLeft: () => <ChevronLeft size={22} strokeWidth={2.5} />,
  ChevRight: () => <ChevronRight size={11} strokeWidth={2.5} />,
  ChevDown: () => <ChevronDown size={11} strokeWidth={2.5} />,
  ChevUp: () => <ChevronUp size={11} strokeWidth={2.5} />,
  Trash: () => <Trash2 size={15} />,
  Edit: () => <Edit3 size={14} />,
  Filter: () => <Filter size={13} />,
  SortIco: () => <ListFilter size={13} />,
  X: () => <X size={17} strokeWidth={2.5} />,
  Tag: () => <Tag size={14} />,
  Loc: () => <MapPin size={13} />,
  Bell: () => <Bell size={18} />,
  Check: () => <Check size={26} strokeWidth={3} color="white" />,
  Plus: () => <Plus size={13} strokeWidth={2.5} />,
  Minus: () => <Minus size={13} strokeWidth={2.5} />,
  Truck: () => <Truck size={14} />,
  Play: () => <Play size={11} fill="currentColor" />,
};

// ─── Shared Components ────────────────────────────────────────────────────────
function DayPills({ activeIdx = [0, 1, 2] }: { activeIdx?: number[] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="ad-dp-days">
      {days.map((d, i) => (
        <span key={d} className={`ad-dp-dbtn ${activeIdx.includes(i) ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{d}</span>
      ))}
    </div>
  );
}

function FlowerImg({ product, h = 'h-[88px]' }: { product: Product; h?: string }) {
  return (
    <div className="ad-p-img" style={{ background: product.gradient, height: h.replace('h-', '').replace('[', '').replace(']', '').replace('88px', '5.5rem') }}>
      <span className="ad-p-emoji">{product.emoji}</span>
    </div>
  );
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  return (
    <div onClick={() => onSelect(product)} className="ad-p-card">
      <div className="ad-p-img-cont">
        <FlowerImg product={product} />
        <span className="ad-p-badge-tl">Bestseller</span>
        {product.tag && (
          <span className="ad-p-badge-tr" style={{ backgroundColor: product.tag === 'SellFast' ? 'var(--ad-orange-500)' : 'var(--ad-amber-400)' }}>
            {product.tag}
          </span>
        )}
      </div>
      <div className="ad-p-body">
        <h3 className="ad-p-name">{product.name}</h3>
        <p className="ad-p-desc">{product.description}</p>
        <div className="ad-p-price-row">
          <span className="ad-p-price">{C}{product.price}/<span className="ad-p-int">{product.interval}</span></span>
          <span className="ad-gray-400"><IC.ChevRight /></span>
        </div>
      </div>
    </div>
  );
}


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="ad-sec-header">
        <h2 className="ad-sec-title">{title}</h2>
      </div>
      <div className="ad-slide-list ad-no-scrollbar">{children}</div>
    </div>
  );
}

// ─── Android Shell ────────────────────────────────────────────────────────────
const AndroidShell = ({ children }: { children: React.ReactNode }) => (
  <div className="ad-phone-container">
    <div data-guide-card="-50" className="ad-phone-hardware">
      <div className="ad-phone-vol-up" />
      <div className="ad-phone-vol-down" />
      <div className="ad-phone-power" />
      <div className="ad-phone-screen">
        <div className="ad-status-bar">
          <span className="ad-status-time">9:41</span>
          <div className="ad-notch" />
          <div className="ad-status-icons">
            <svg width="12" height="9" viewBox="0 0 16 12" fill="#374151"><rect x="0" y="8" width="3" height="4" rx="0.5" /><rect x="4" y="5" width="3" height="7" rx="0.5" /><rect x="8" y="3" width="3" height="9" rx="0.5" /><rect x="12" y="0" width="3" height="12" rx="0.5" /></svg>
            <svg width="13" height="8" viewBox="0 0 20 14" fill="none" stroke="#374151" strokeWidth="1.5"><path d="M10 11c-1.5 0-2.8.6-3.8 1.5L10 17l3.8-4.5C12.8 11.6 11.5 11 10 11z" /><path d="M10 7C7 7 4.3 8.3 2.5 10.3L4 12c1.4-1.5 3.3-2.5 6-2.5s4.6 1 6 2.5l1.5-1.7C15.7 8.3 13 7 10 7z" /><path d="M10 3C5.5 3 1.6 5 0 8.2L1.8 10C3.7 7.2 6.7 5.5 10 5.5s6.3 1.7 8.2 4.5L20 8.2C18.4 5 14.5 3 10 3z" /></svg>
            <svg width="20" height="10" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="19" height="11" rx="2.5" stroke="#374151" /><rect x="1.5" y="1.5" width="14" height="9" rx="1.5" fill="#374151" /><path d="M21 4v4a2 2 0 0 0 0-4z" fill="#374151" /></svg>
          </div>
        </div>
        <div className="ad-app-scroll">{children}</div>
      </div>
    </div>
  </div>
);


function HomeScreen({ onSelect }: { onSelect: (p: Product) => void }) {
  return (
    <div className="ad-app-flex">
      <div className="ad-app-scroll ad-screen-pad ad-space-y-3 ad-no-scrollbar">
        {/* Header */}
        <div data-guide-card="-51" className="ad-flex-between">
          <div>
            <div className="ad-location">
              <IC.MapPin /><span>{APP_CONFIG.addressShort}</span><IC.ChevDown />
            </div>
            <p className="ad-loc-sub">{APP_CONFIG.address}</p>
          </div>
          <div className="ad-avatar-cir"><IC.User /></div>
        </div>

        {/* Search */}
        <div className="ad-search-box">
          <span className="ad-search-icon"><IC.Search /></span>
          <input readOnly placeholder="Search anything...." className="ad-search-input" />
        </div>

        {/* Festival banner */}
        <div data-guide-card="-52" className="ad-fest-banner">
          <div style={{ width: '58%' }}>
            <h2 className="ad-fest-title">Special Festival Offers Available</h2>
            <span className="ad-fest-link">Curated for you →</span>
          </div>
          <span className="ad-absolute" style={{ right: '0.75rem', top: '0.5rem', fontSize: '1.5rem', pointerEvents: 'none' }}>🌸</span>
          <span className="ad-absolute" style={{ right: '2.75rem', bottom: '0.25rem', fontSize: '1.25rem', pointerEvents: 'none', opacity: 0.7 }}>🌼</span>
          <span className="ad-absolute" style={{ right: '0.25rem', bottom: '0', fontSize: '1.875rem', pointerEvents: 'none', opacity: 0.5 }}>🌺</span>
        </div>

        {/* Order on hold */}
        <div data-guide-card="-53" className="ad-hold-alert">
          <div className="ad-hold-title">
            <div style={{ width: '1rem', height: '1rem', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'white', borderRadius: '9999px' }} /></div>
            <span>Order in hold</span>
          </div>
          <p className="ad-hold-desc">Your wallet balance is low. Recharge now to continue your daily deliveries.</p>
          <button className="ad-hold-btn">Recharge Now</button>
        </div>

        {/* Upcoming delivery */}
        <div data-guide-card="-54" className="ad-up-deliv">
          <button className="ad-up-manage">Manage</button>
          <h3 className="ad-up-title">Welcome back! 👋</h3>
          <div className="ad-up-list">
            <div className="ad-up-item"><span style={{ fontSize: '13px' }}>🚚</span><span>Tomorrow – Fri, 19 Sept</span></div>
            <div className="ad-up-item"><span style={{ fontSize: '13px' }}>🕒</span><span>{APP_CONFIG.deliveryWindow}</span></div>
            <div className="ad-up-item"><span style={{ fontSize: '13px' }}>📦</span><span>Premium Daily Pack</span></div>
          </div>
        </div>


        <div data-guide-card="-55"><Section title="Puja Packs">
          {PUJA_PRODUCTS.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}
        </Section></div>

        <div data-guide-card="-56"><Section title="Exotic Packs">
          {EXOTIC_PRODUCTS.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}
        </Section></div>

        <button className="ad-btn-big">View All Category</button>

        <div className="ad-quote">
          <p className="ad-quote-lbl">Quote of the Day</p>
          <p className="ad-quote-txt">{APP_CONFIG.quoteOfDay}</p>
          <div style={{ marginTop: '0.5rem', fontSize: '1.125rem' }}>🌻</div>
        </div>
      </div>
    </div>
  );
}

// ─── Shop Screen ──────────────────────────────────────────────────────────────
function ShopScreen({ onSelect }: { onSelect: (p: Product) => void }) {
  const [activeTab, setActiveTab] = useState<'puja' | 'exotic'>('puja');
  const [activeCat, setActiveCat] = useState('All');
  const [modal, setModal] = useState<null | 'filter' | 'sort'>(null);
  const [activeSort, setActiveSort] = useState('Recommended');
  const [activeFilters, setActiveFilters] = useState<string[]>(['All Products']);
  const cats = ['All', 'Marigold', 'Roses', 'Lilies', 'Mixed'];
  const sections = ['Puja Packs', 'Exotic Packs', 'Seasonal Packs', 'Bestsellers'];
  const sortOpts = [{ l: 'Recommended', c: 120 }, { l: 'Price Low to High', c: 130 }, { l: 'Price High to Low', c: 90 }, { l: 'Rating', c: 300 }];
  const filterGroups = [
    { label: 'All Products', chips: ['All Products'] },
    { label: 'Daily Pack Only', chips: ['Daily Pack Only'] },
    { label: 'By Color', chips: ['Red', 'Yellow', 'Orange', 'White'] },
    { label: 'By Occasions', chips: ['Wedding', 'Puja', 'Birthday', 'Anniversary'] },
  ];
  const toggle = (c: string) => setActiveFilters((p: string[]) => p.includes(c) ? p.filter((x: string) => x !== c) : [...p, c]);

  return (
    <div className="ad-app-flex">
      <div className="ad-app-scroll ad-screen-pad ad-space-y-3 ad-no-scrollbar">
        <div>
          <div className="ad-location"><IC.MapPin /><span>{APP_CONFIG.addressShort}</span><IC.ChevDown /></div>
          <p className="ad-loc-sub">{APP_CONFIG.address}</p>
        </div>
        <div className="ad-search-box">
          <span className="ad-search-icon"><IC.Search /></span>
          <input readOnly placeholder="Search anything...." className="ad-search-input" />
        </div>
        <div className="ad-pill-tab-c">
          {(['puja', 'exotic'] as const).map(ft => (
            <button key={ft} onClick={() => setActiveTab(ft)} 
              className={`ad-pill-tab ${activeTab === ft ? 'active' : ''}`}>
              {ft === 'puja' ? '🪷 Puja Flowers' : '🌸 Exotic Flowers'}
            </button>
          ))}
        </div>
        <div className="ad-slide-list ad-no-scrollbar">
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`ad-cat-pill ${activeCat === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="ad-flex" style={{ gap: '0.5rem' }}>
          <button onClick={() => setModal(modal === 'sort' ? null : 'sort')} className={`ad-opt-btn ${modal === 'sort' ? 'active' : ''}`}>
            <IC.SortIco /> Sort
          </button>
          <button onClick={() => setModal(modal === 'filter' ? null : 'filter')} className={`ad-opt-btn ${modal === 'filter' ? 'active' : ''}`}>
            <IC.Filter /> Filter
          </button>
        </div>
        <p className="ad-deliv-txt"><IC.Truck />{APP_CONFIG.freeDeliveryText}</p>
        {sections.map(sec => (
          <Section key={sec} title={sec}>
            {(sec === 'Puja Packs' || sec === 'Seasonal Packs' ? PUJA_PRODUCTS : sec === 'Bestsellers' ? [...PUJA_PRODUCTS.slice(0, 2), ...EXOTIC_PRODUCTS.slice(0, 1)] : EXOTIC_PRODUCTS)
              .map(p => <ProductCard key={p.id + sec} product={p} onSelect={onSelect} />)}
          </Section>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div className="ad-modal-bg" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} onClick={() => setModal(null)}>
            <motion.div className="ad-modal" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 400 }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <div className="ad-modal-head">
                <h3 className="ad-modal-t">{modal === 'sort' ? 'Sort' : 'Filter'}</h3>
                <button className="ad-modal-x" onClick={() => setModal(null)}><IC.X /></button>
              </div>
              {modal === 'sort' ? sortOpts.map(({ l, c }) => (
                <div key={l} onClick={() => setActiveSort(l)} className="ad-sort-row">
                  <span className={`ad-sort-l ${activeSort === l ? 'active' : ''}`}>{l}</span>
                  <div className="ad-sort-r">
                    <span className="ad-sort-c">{c}</span>
                    <div className={`ad-radio-sq ${activeSort === l ? 'active' : ''}`}>
                      {activeSort === l && <svg width="9" height="9" fill="none" stroke="white" strokeWidth="3"><polyline points="1 5 4 8 9 2" /></svg>}
                    </div>
                  </div>
                </div>
              )) : filterGroups.map(g => (
                <div key={g.label} className="ad-filt-grp">
                  <p className="ad-filt-lbl">{g.label}</p>
                  <div className="ad-filt-row">
                    {g.chips.map(chip => (
                      <button key={chip} onClick={() => toggle(chip)} className={`ad-filt-chip ${activeFilters.includes(chip) ? 'active' : ''}`}>{chip}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="ad-modal-acts">
                <button onClick={() => { setActiveSort('Recommended'); setActiveFilters(['All Products']); }} className="ad-btn-half-sec">Reset</button>
                <button onClick={() => setModal(null)} className="ad-btn-half-pri">Apply</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Explore Category ─────────────────────────────────────────────────────────
function ExploreCategoryScreen({ onBack, onSelect }: { onBack: () => void; onSelect: (p: Product) => void }) {
  const grid = [...PUJA_PRODUCTS, ...PUJA_PRODUCTS, ...PUJA_PRODUCTS.slice(0, 2)];
  return (
    <div className="ad-app-flex">
      <div className="ad-top-head">
        <button className="ad-back-btn" onClick={onBack}><IC.ChevLeft /></button>
        <h1 className="ad-top-title">Puja Pack</h1>
      </div>
      <div className="ad-app-scroll ad-no-scrollbar" style={{ padding: '0.75rem 1rem 6rem' }}>
        <div className="ad-grid-2">
          {grid.map((p, i) => (
            <div key={i} onClick={() => onSelect(p)} className="ad-p-card" style={{ width: '100%', minWidth: '0', maxWidth: 'none' }}>
              <div className="ad-p-img-cont">
                <FlowerImg product={p} h="6rem" />
                <span className="ad-p-badge-tl" style={{ fontSize: '0.4375rem', top: '0.375rem', left: '0.375rem' }}>Bestseller</span>
              </div>
              <div className="ad-p-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.125rem' }}>
                  <h3 className="ad-p-name">{p.name}</h3>
                  <span style={{ backgroundColor: 'var(--ad-amber-400)', color: 'var(--ad-white)', fontSize: '0.4375rem', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontWeight: 700, marginLeft: '0.25rem', flexShrink: 0 }}>Daily</span>
                </div>
                <p className="ad-p-desc">{p.description}</p>
                <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: 'var(--ad-gray-900)' }}>{C}{p.price}/<span style={{ fontWeight: 400, fontSize: '0.5625rem', color: 'var(--ad-gray-400)' }}>Day</span></p>
              </div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', textAlign: 'center', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-gray-400)', textDecoration: 'underline', padding: '1.25rem 0', background: 'transparent', border: 'none', cursor: 'pointer' }}>Load More</button>
      </div>
    </div>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────
function ProductDetailScreen({ product, onBack, onSubscribe }: { product: Product; onBack: () => void; onSubscribe: () => void }) {
  const [qty, setQty] = useState(1);
  const [addonQtys, setAddonQtys] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<'daily' | 'monsat' | 'custom'>('custom');
  const [selDays, setSelDays] = useState([0, 1, 2]);
  const [descTab, setDescTab] = useState(0);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const invalid = mode === 'custom' && selDays.length < 3;
  const adjAddon = (id: string, d: number) => setAddonQtys((p: Record<string, number>) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) + d) }));
  const toggleDay = (i: number) => setSelDays((p: number[]) => p.includes(i) ? p.filter((x: number) => x !== i) : [...p, i]);

  return (
    <div className="ad-app-flex ad-no-scrollbar" style={{ backgroundColor: 'var(--ad-phone-bg)' }}>
      <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem 0.25rem' }}>
        <button onClick={onBack} style={{ width: '1.75rem', height: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}><IC.ChevLeft /></button>
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ad-gray-800)' }}>Puja Pack</span>
      </div>

      <div className="ad-pd-img-box" style={{ background: product.gradient }}>
        <span className="ad-pd-emoji">{product.emoji}</span>
        <span className="ad-pd-tag">{APP_CONFIG.appName}</span>
      </div>

      <div className="ad-app-scroll ad-pd-body ad-space-y-4">
        <div className="ad-pd-title-row">
          <div>
            <h2 className="ad-pd-title">{product.name}</h2>
            <div className="ad-pd-price-div">
              <span className="ad-pd-cur">{C}249/Pack</span>
              <span className="ad-pd-old">{C}299</span>
            </div>
          </div>
          <span className="ad-pd-wt">{product.weight ?? '120 grams'}</span>
        </div>

        <div>
          <p className="ad-pd-sblbl">Includes</p>
          <div className="ad-pd-tags">
            {(product.includes ?? ['Bel Leaves', 'Lotus', 'Marigold', 'White Lotus']).map(t => (
              <span key={t} className="ad-pd-tg">{t}</span>
            ))}
          </div>
        </div>

        <div className="ad-pd-qty-row">
          <span className="ad-pd-qty-l">Quantity</span>
          <div className="ad-pd-qty-c">
            <button onClick={() => setQty((q: number) => Math.max(1, q - 1))} className="ad-qty-btn"><IC.Minus /></button>
            <span className="ad-qty-v">{qty}</span>
            <button onClick={() => setQty((q: number) => q + 1)} className="ad-qty-btn"><IC.Plus /></button>
          </div>
        </div>

        <div data-guide-card="-58">
          <p className="ad-pd-sblbl" style={{ marginBottom: '0.625rem' }}>Combine with</p>
          <div className="ad-slide-list ad-no-scrollbar">
            {ADD_ONS.map(a => {
              const q = addonQtys[a.id] ?? 0;
              return (
                <div key={a.id} className="ad-addon-col">
                  <div className="ad-addon-img" style={{ background: a.bg }}>{a.emoji}</div>
                  <div className="ad-addon-bdy">
                    <p className="ad-addon-nm">{a.name}</p>
                    <div className="ad-addon-prc"><span className="ad-addon-o">{C}{a.originalPrice}</span><span className="ad-addon-c">{C}{a.price}</span></div>
                    <div className="ad-addon-acts">
                      <button onClick={() => adjAddon(a.id, -1)} className="ad-addon-qm"><IC.Minus /></button>
                      <span className="ad-addon-qv">{q}</span>
                      <button onClick={() => adjAddon(a.id, 1)} className="ad-addon-qp"><IC.Plus /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div data-guide-card="-57">
          <p className="ad-pd-sblbl" style={{ marginBottom: '0.5rem' }}>Select Delivery Days</p>
          <div className="ad-dp-modes">
            {(['daily', 'monsat', 'custom'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`ad-dp-btn ${mode === m ? 'active' : ''}`}>
                {m === 'daily' ? 'Daily' : m === 'monsat' ? 'Mon-Sat' : 'Customize'}
              </button>
            ))}
          </div>
          <div className="ad-dp-days">
            {days.map((d, i) => (
              <button key={d} onClick={() => toggleDay(i)} className={`ad-dp-dbtn ${selDays.includes(i) ? 'active' : ''}`}>{d.slice(0, 2)}</button>
            ))}
          </div>
          <AnimatePresence>
            {invalid && (
              <motion.div initial={{ opacity: 1, height: 'auto' }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 1, height: 0 }} style={{ overflow: 'hidden' }}>
                <div className="ad-dp-err">
                  <span style={{ color: 'var(--ad-red-400)' }}>⚠</span>
                  <p style={{ fontSize: '0.625rem', color: 'var(--ad-red-600)' }}>Please select at least 3 days for a 1-week subscription</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={!invalid ? onSubscribe : undefined} className={`ad-btn-sub ${invalid ? 'dis' : 'active'}`}>
          Subscribe for {C}249/Pack
        </button>

        <div className="ad-pd-trk">
          <span style={{ marginTop: '0.125rem', flexShrink: 0 }}><IC.Truck /></span>
          <p className="ad-pd-trk-t">Orders placed before 8 PM will be delivered next day. Sunday deliveries available on request.</p>
        </div>

        <div>
          <div className="ad-pd-tabs">
            {['Description', 'Product Info', 'More'].map((t, i) => (
              <button key={t} onClick={() => setDescTab(i)} className={`ad-pd-tbtn ${descTab === i ? 'active' : ''}`}>{t}</button>
            ))}
          </div>
          {descTab === 0 && <p className="ad-pd-tdesc">The {product.name} is perfect for your daily needs. Handpicked at dawn, these fresh flowers bring divine energy to your prayers and rituals. Each pack is carefully assembled with the finest blooms.</p>}
          {descTab === 1 && <p className="ad-pd-tdesc">Weight: {product.weight ?? '120 grams'}. Includes a mix of seasonal and traditional flowers sourced fresh from local farms every morning.</p>}
          {descTab === 2 && <p className="ad-pd-tdesc">For bulk orders or corporate gifting, please contact our support team. Customization available on request.</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Thank You Screen ─────────────────────────────────────────────────────────
function ThankYouScreen({ onViewSubs }: { onViewSubs: () => void }) {
  return (
    <div className="ad-ty-wrap ad-no-scrollbar">
      <motion.div initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 18 }}>
        <div className="ad-ty-icon" style={{ backgroundColor: 'var(--ad-amber-500)' }}><IC.Check /></div>
      </motion.div>
      <h1 className="ad-ty-t">Thank you</h1>
      <p className="ad-ty-s">Your daily flower subscription is confirmed.</p>

      <div className="ad-ty-card">
        <div className="ad-ty-loc"><IC.Loc /><span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-gray-700)' }}>Enterprise Portal</span></div>

        <div className="ad-ty-map">
          <svg viewBox="0 0 200 90"><line x1="0" y1="45" x2="200" y2="45" stroke="#065f46" strokeWidth="1" /><line x1="100" y1="0" x2="100" y2="90" stroke="#065f46" strokeWidth="1" /><line x1="50" y1="0" x2="50" y2="90" stroke="#065f46" strokeWidth="0.5" /><line x1="150" y1="0" x2="150" y2="90" stroke="#065f46" strokeWidth="0.5" /></svg>
          <div className="ad-ty-pin"><div className="ad-ty-pin-c"><IC.MapPin /></div></div>
        </div>
        <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}><span style={{ fontSize: '0.8125rem' }}>🕐</span><span style={{ fontSize: '0.6875rem', fontWeight: 600 }}>Tomorrow – 7:00 AM</span></div>
        <DayPills activeIdx={[0, 1, 2]} />
        <div className="ad-ty-sum-t">
          <div className="ad-ty-sr">
            <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem' }}><span>📦</span><span style={{ fontWeight: 600 }}>Puja Pack × 1</span></div>
            <span style={{ fontWeight: 700 }}>{C}299/Pack</span>
          </div>
          <div className="ad-ty-sr">
            <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--ad-gray-400)', fontSize: '0.8125rem' }}>{C}</span><span style={{ color: 'var(--ad-gray-500)', fontWeight: 600 }}>Total Amount</span></div>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--ad-gray-900)' }}>{C}299</span>
          </div>
        </div>
      </div>

      <div className="ad-ty-sav">
        <span className="ad-ty-sav-1">You're saving</span>
        <span className="ad-ty-sav-2">50</span>
        <span className="ad-ty-sav-1">this month!</span>
        <span>🌸</span>
      </div>

      <button onClick={onViewSubs} className="ad-btn-sub active" style={{ marginBottom: '0.75rem' }}>
        View My Subscription
      </button>
      <p style={{ fontSize: '0.625rem', color: 'var(--ad-gray-400)' }}>{APP_CONFIG.supportText}</p>
    </div>
  );
}

// ─── Basket Screen ────────────────────────────────────────────────────────────
function BasketScreen() {
  const [showAddons, setShowAddons] = useState(true);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="ad-app-flex ad-no-scrollbar">
      <div className="ad-app-scroll ad-screen-pad">
        <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><IC.ChevLeft /><h1 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>My Basket</h1></div>

        <div className="ad-bsk-card">
          <div className="ad-bsk-hd">
            <div className="ad-bsk-img" style={{ backgroundImage: 'linear-gradient(135deg,#dc2626,#991b1b)' }}>🌹</div>
            <div style={{ flex: 1 }}>
              <h3 className="ad-bsk-t">Premium Pack x1</h3>
              <p style={{ fontSize: '0.6875rem', color: 'var(--ad-gray-500)', marginTop: '0.125rem' }}>{C}299/Pack</p>
            </div>
            <button className="ad-bsk-del"><IC.Trash /></button>
          </div>
          <button onClick={() => setShowAddons((s: boolean) => !s)} className="ad-bsk-tog">
            {showAddons ? <IC.ChevUp /> : <IC.ChevDown />} Add-ons (2)
          </button>
          <AnimatePresence>
            {showAddons && (
              <motion.div initial={{ height: 0, opacity: 1 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 1 }} style={{ overflow: 'hidden' }}>
                <div style={{ paddingLeft: '0.25rem', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[{ e: '🌸', bg: 'var(--ad-pink-50)', n: 'Jasmine Garland', q: '2 × ₹50', p: '₹100' }, { e: '🌹', bg: 'var(--ad-red-50)', n: 'Rose Petals', q: '1 × ₹80', p: '₹80' }].map(item => (
                    <div key={item.n} className="ad-bsk-ad-r">
                      <div className="ad-bsk-ad-i" style={{ backgroundColor: item.bg }}>{item.e}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-gray-800)' }}>{item.n}</p>
                        <p style={{ fontSize: '0.5625rem', color: 'var(--ad-gray-400)' }}>Qty: {item.q}</p>
                      </div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--ad-gray-800)' }}>{item.p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="ad-bsk-div">
            <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--ad-gray-800)', marginBottom: '0.5rem' }}>Subscribed Days</p>
            <DayPills activeIdx={[0, 1, 2]} />
            <p style={{ fontSize: '0.625rem', color: 'var(--ad-gray-400)', marginTop: '0.5rem' }}><span style={{ fontWeight: 600, color: 'var(--ad-gray-700)' }}>First Delivery:</span> Mon, 10 Nov 2025</p>
          </div>
        </div>

        <div className="ad-bsk-card">
          <div className="ad-flex-between" style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>Delivery Details</h3>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--ad-gray-400)', cursor: 'pointer' }}><IC.Edit /></button>
          </div>
          <div className="ad-flex" style={{ alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ marginTop: '0.125rem', color: 'var(--ad-gray-500)' }}><IC.Loc /></span>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>Home</p>
              <p style={{ fontSize: '0.625rem', color: 'var(--ad-gray-400)' }}>{APP_CONFIG.address}</p>
            </div>
          </div>
        </div>

        <div className="ad-bsk-promo">
          <button onClick={() => setPromoOpen((o: boolean) => !o)} className="ad-bsk-pbtn">
            <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem', color: 'var(--ad-amber-500)' }}><IC.Tag /><span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-amber-600)' }}>Add Promo Code</span></div>
            <span style={{ color: 'var(--ad-amber-400)', fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>{promoOpen ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {promoOpen && (
              <motion.div initial={{ height: 0, opacity: 1 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 1 }} style={{ overflow: 'hidden', borderTop: '1px solid var(--ad-amber-50)' }}>
                <div className="ad-flex" style={{ padding: '0.75rem 1rem', gap: '0.5rem' }}>
                  <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter promo code" className="ad-bsk-inp" />
                  <button className="ad-bsk-ibtn">Apply</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ad-bsk-sum">
          {[['Subtotal', '₹898'], ['Delivery Fee', '—'], ['Tax', '₹30'], ['Surcharge', '₹70']].map(([k, v]) => (
            <div key={k} className="ad-bsk-sr"><span>{k}</span><span>{v}</span></div>
          ))}
          <div className="ad-flex-between" style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--ad-gray-200)' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>Total</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ad-gray-900)' }}>{C}948</span>
          </div>
        </div>

        <button className="ad-btn-sub active">Proceed</button>
      </div>
    </div>
  );
}

// ─── Subscriptions Screen ─────────────────────────────────────────────────────
function SubscriptionsScreen() {
  const [tab, setTab] = useState<'sub' | 'history'>('sub');
  const [menu, setMenu] = useState<string | null>(null);
  const [addons, setAddons] = useState(true);

  return (
    <div className="ad-app-flex ad-no-scrollbar">
      <div className="ad-app-scroll ad-screen-pad">
        <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><IC.ChevLeft /><h1 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>Your Flower Subscriptions</h1></div>
        <div data-guide-card="-60" className="ad-sub-tabs">
          {([['sub', 'Subscriptions'], ['history', 'Delivery History']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`ad-sub-tb ${tab === key ? 'active' : ''}`}>{label}</button>
          ))}
        </div>

        {tab === 'sub' ? (
          <div className="ad-space-y-4">
            {/* Active */}
            <div className="ad-sub-c">
              <div className="ad-flex-between" style={{ marginBottom: '0.5rem' }}>
                <div className="ad-bsk-hd">
                  <div className="ad-bsk-img" style={{ backgroundImage: 'linear-gradient(135deg,#dc2626,#991b1b)' }}>🌹</div>
                  <div><h3 className="ad-bsk-t">Premium Pack x1</h3><p style={{ fontSize: '0.6875rem', color: 'var(--ad-gray-500)' }}>{C}299/Pack</p></div>
                </div>
                <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--ad-green-500)', color: 'var(--ad-white)', fontSize: '0.5625rem', fontWeight: 700, padding: '0.1875rem 0.5rem', borderRadius: '9999px' }}>Active</span>
                  <button onClick={() => setMenu(menu === 'a' ? null : 'a')} style={{ background: 'transparent', border: 'none', color: 'var(--ad-gray-400)', cursor: 'pointer' }}><IC.Edit /></button>
                </div>
              </div>
              <AnimatePresence>
                {menu === 'a' && (
                  <motion.div initial={{ opacity: 1, y: 0, scale: 1 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 1, scale: 0.95 }} className="ad-sub-menu">
                    <button className="ad-sub-mbtn" style={{ color: 'var(--ad-gray-700)' }}>⚙️ Modify</button>
                    <button onClick={() => setMenu(null)} className="ad-sub-mbtn" style={{ color: 'var(--ad-red-500)' }}>✕ Cancel</button>
                  </motion.div>
                )}
              </AnimatePresence>
              <button onClick={() => setAddons((s: boolean) => !s)} className="ad-bsk-tog">
                {addons ? <IC.ChevUp /> : <IC.ChevDown />} Add-ons (2)
              </button>
              <AnimatePresence>
                {addons && (
                  <motion.div initial={{ height: 0, opacity: 1 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 1 }} style={{ overflow: 'hidden' }}>
                    <div style={{ paddingLeft: '0.25rem', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[{ e: '🌸', bg: 'var(--ad-pink-50)', n: 'Jasmine Garland', q: '2 × ₹50' }, { e: '🌹', bg: 'var(--ad-red-50)', n: 'Rose Petals', q: '1 × ₹80', p: '₹80' }].map(item => (
                        <div key={item.n} className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '2.25rem', height: '2.25rem', backgroundColor: item.bg, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0 }}>{item.e}</div>
                          <div style={{ flex: 1 }}><p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--ad-gray-800)' }}>{item.n}</p><p style={{ fontSize: '0.5625rem', color: 'var(--ad-gray-400)' }}>Qty: {item.q}</p></div>
                          {item.p && <span style={{ fontSize: '0.625rem', fontWeight: 700 }}>{item.p}</span>}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="ad-bsk-div">
                <div className="ad-flex-between" style={{ fontSize: '0.6875rem', marginBottom: '0.5rem' }}><span style={{ color: 'var(--ad-gray-500)' }}>Total Amount</span><span style={{ fontWeight: 700 }}>{C}479</span></div>
                <p style={{ fontSize: '0.625rem', color: 'var(--ad-gray-400)', marginBottom: '0.5rem' }}>Subscription Daily</p>
                <DayPills activeIdx={[0, 1, 2]} />
                <p style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '0.5rem' }}>Next Delivery: <span style={{ fontWeight: 700, color: 'var(--ad-gray-900)' }}>Today</span></p>
              </div>
            </div>

            {/* Paused */}
            <div data-guide-card="-61" className="ad-sub-c" style={{ opacity: 0.9 }}>
              <div className="ad-flex-between" style={{ marginBottom: '0.75rem' }}>
                <div className="ad-bsk-hd">
                  <div className="ad-bsk-img" style={{ backgroundImage: 'linear-gradient(135deg,#dc2626,#991b1b)' }}>🌹</div>
                  <div><h3 className="ad-bsk-t">Standard Pack x1</h3><p style={{ fontSize: '0.6875rem', color: 'var(--ad-gray-500)' }}>{C}299/Pack</p></div>
                </div>
                <div className="ad-flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--ad-yellow-400)', color: 'var(--ad-white)', fontSize: '0.5625rem', fontWeight: 700, padding: '0.1875rem 0.5rem', borderRadius: '9999px' }}>Paused</span>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--ad-gray-400)' }}><IC.Edit /></button>
                </div>
              </div>
              <div className="ad-bsk-div">
                <div className="ad-flex-between" style={{ fontSize: '0.6875rem', marginBottom: '0.5rem' }}><span style={{ color: 'var(--ad-gray-500)' }}>Total Amount</span><span style={{ fontWeight: 700 }}>{C}299</span></div>
                <p style={{ fontSize: '0.625rem', color: 'var(--ad-gray-400)', marginBottom: '0.5rem' }}>Subscription Daily</p>
                <DayPills activeIdx={[0, 2, 5]} />
                <div className="ad-flex-between" style={{ marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--ad-gray-500)' }}>Next Delivery: <span style={{ color: 'var(--ad-gray-700)' }}>Paused</span></p>
                  <button style={{ border: '1px solid var(--ad-blue-400)', color: 'var(--ad-blue-500)', backgroundColor: 'transparent', fontSize: '0.625rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>Resume <IC.Play /></button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {DELIVERY_HISTORY.map(item => (
              <div key={item.id} className="ad-sub-his">
                <div className="ad-sub-hi" style={{ backgroundColor: item.status === 'Delivered' ? 'var(--ad-green-50)' : 'var(--ad-red-50)' }}>📦</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-gray-800)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                  <p style={{ fontSize: '0.5625rem', color: 'var(--ad-gray-400)' }}>{item.time}</p>
                </div>
                <span style={{ fontSize: '0.5625rem', fontWeight: 700, padding: '0.25rem 0.5rem', borderRadius: '9999px', flexShrink: 0, backgroundColor: item.status === 'Delivered' ? 'var(--ad-green-50)' : 'var(--ad-red-50)', color: item.status === 'Delivered' ? 'var(--ad-green-600)' : 'var(--ad-red-500)' }}>{item.status}</span>
                <button style={{ fontSize: '0.5625rem', color: 'var(--ad-blue-400)', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Support</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Wallet Screen ────────────────────────────────────────────────────────────
function WalletScreen() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const quick = [100, 200, 500, 1000];

  return (
    <div className="ad-app-flex ad-no-scrollbar">
      <div className="ad-app-scroll ad-screen-pad">
        <div className="ad-flex-between" style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ad-gray-900)' }}>My Wallet</h1>
          <button style={{ position: 'relative', color: 'var(--ad-gray-500)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <IC.Bell />
            <span style={{ position: 'absolute', top: '-0.125rem', right: '-0.125rem', width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--ad-red-500)', borderRadius: '9999px' }} />
          </button>
        </div>
        <div data-guide-card="-59" className="ad-wal-card">
          <div className="ad-flex-between" style={{ alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, opacity: 0.8, marginBottom: '0.25rem' }}>Available Balance</p>
              <p style={{ fontSize: '1.875rem', fontWeight: 800, lineHeight: 1 }}>{C}250.00</p>
            </div>
            <div className="ad-wal-icon"><IC.Wallet /></div>
          </div>
          <div className="ad-flex-between" style={{ alignItems: 'flex-end' }}>
            <p style={{ fontSize: '0.625rem', opacity: 0.6 }}>Wallet ID: WL-XXXX-XX</p>
            <span style={{ fontSize: '0.625rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 700 }}>Active</span>
          </div>
        </div>

        <button onClick={() => setOpen((o: boolean) => !o)} className="ad-btn-sub active" style={{ marginBottom: '1rem' }}>
          + Recharge Wallet
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 1 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 1 }} style={{ overflow: 'hidden', marginBottom: '1rem' }}>
              <div className="ad-bsk-card" style={{ marginBottom: 0 }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--ad-gray-800)', marginBottom: '0.5rem' }}>Quick Select</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {quick.map(a => (
                    <button key={a} onClick={() => setAmount(String(a))} className={`ad-wal-qbtn ${amount === String(a) ? 'active' : ''}`}>
                      {C}{a}
                    </button>
                  ))}
                </div>
                <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Custom amount" className="ad-bsk-inp" style={{ width: '100%', padding: '0.625rem 0.75rem', marginBottom: '0.75rem' }} />
                <button onClick={() => setOpen(false)} className="ad-btn-sub active" style={{ padding: '0.625rem 0' }}>
                  Pay {amount ? `${C}${amount}` : 'Now'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ad-bsk-card">
          <p className="ad-wal-ih">Recent Transactions</p>
          {[
            { l: 'Premium Pack Delivery', a: '-₹299', d: 'Today, 7:30 AM', cr: false },
            { l: 'Wallet Recharge', a: '+₹500', d: 'Yesterday, 3:00 PM', cr: true },
            { l: 'Jasmine Add-on', a: '-₹50', d: '2 days ago', cr: false },
            { l: 'Wallet Recharge', a: '+₹200', d: '3 days ago', cr: true },
          ].map((tx, i) => (
            <div key={i} className="ad-wal-tr">
              <div><p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ad-gray-800)' }}>{tx.l}</p><p style={{ fontSize: '0.5625rem', color: 'var(--ad-gray-400)', marginTop: '0.125rem' }}>{tx.d}</p></div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: tx.cr ? 'var(--ad-green-600)' : 'var(--ad-red-500)' }}>{tx.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────
function NavBar({ tab, setTab }: { tab: TabType; setTab: (t: TabType) => void }) {
  const items: { key: TabType; icon: React.ReactNode; label: string }[] = [
    { key: 'home', icon: <IC.Home />, label: 'Home' },
    { key: 'shop', icon: <span style={{ fontSize: '1rem', lineHeight: 1 }}>🌸</span>, label: 'Daily' },
    { key: 'wallet', icon: <IC.Wallet />, label: 'Wallet' },
    { key: 'basket', icon: <IC.Basket />, label: 'Basket' },
    { key: 'account', icon: <IC.User />, label: 'Account' },
  ];
  return (
    <div className="ad-nav-bar">
      {items.map(({ key, icon, label }) => (
        <button key={key} data-guide-id={`android-nav-${key}`} onClick={() => setTab(key)} className={`ad-nav-btn ${tab === key ? 'active' : ''}`}>
          <div className="ad-nav-icon">{icon}</div>
          <span className="ad-nav-label">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── App Root (inside phone) ──────────────────────────────────────────────────
const AppContent = () => {
  const [tab, setTab] = useState<TabType>('home');
  const [screen, setScreen] = useState<ScreenType>('main');
  const [selected, setSelected] = useState<Product | null>(null);

  const goProduct = (p: Product) => { setSelected(p); setScreen('productDetail'); };
  const goBack = () => { setSelected(null); setScreen('main'); };
  const goThanks = () => setScreen('thankyou');
  const goSubs = () => { setScreen('main'); setTab('account'); };

  return (
    <div className="ad-app-flex">
      <div className="ad-app-scroll">
        <AnimatePresence mode="wait">
          {screen === 'productDetail' && selected ? (
            <motion.div key="detail" className="ad-absolute ad-inset-0" style={{ zIndex: 10, backgroundColor: 'var(--ad-white)' }}
              initial={{ x: '100%', opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 1 }} transition={{ type: 'spring', damping: 28, stiffness: 320 }}>
              <ProductDetailScreen product={selected} onBack={goBack} onSubscribe={goThanks} />
            </motion.div>
          ) : screen === 'thankyou' ? (
            <motion.div key="ty" className="ad-absolute ad-inset-0" style={{ zIndex: 10, backgroundColor: 'var(--ad-white)' }}
              initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <ThankYouScreen onViewSubs={goSubs} />
            </motion.div>
          ) : screen === 'exploreCategory' ? (
            <motion.div key="explore" className="ad-absolute ad-inset-0" style={{ zIndex: 10, backgroundColor: 'var(--ad-white)' }}
              initial={{ x: '100%', opacity: 1 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 1 }} transition={{ type: 'spring', damping: 28, stiffness: 320 }}>
              <ExploreCategoryScreen onBack={goBack} onSelect={goProduct} />
            </motion.div>
          ) : (
            <motion.div key={`tab-${tab}`} style={{ height: '100%' }}
              initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.15 }}>
              {tab === 'home' && <HomeScreen onSelect={goProduct} />}
              {tab === 'shop' && <ShopScreen onSelect={goProduct} />}
              {tab === 'wallet' && <WalletScreen />}
              {tab === 'basket' && <BasketScreen />}
              {tab === 'account' && <SubscriptionsScreen />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {screen === 'main' && <NavBar tab={tab} setTab={setTab} />}
    </div>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function DailySubscriptionDemo({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phoneScale, setPhoneScale] = useState(1);
  const [isLg, setIsLg] = useState(true);

  const PHONE_W = 357;
  const PHONE_SECTION_H = 780;

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const lg = w >= 1024;
      setIsLg(lg);
      if (lg) {
        setPhoneScale(1);
      } else {
        const padding = w < 640 ? 32 : 48;
        setPhoneScale(Math.min((w - padding) / PHONE_W, 1));
      }
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  if (isEmbedded) {
    return (
      <div className="ad-flex ad-justify-center" style={{ width: '100%', marginTop: '1.5rem', pointerEvents: 'none', transform: 'scale(0.9)', transformOrigin: 'top center' }}>
        <AndroidShell>
          <AppContent />
        </AndroidShell>
      </div>
    );
  }

  return (
    <AiratShell>
      <SiteHeader />
      <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
        <section className="sp-hero dp-hero">
          <span className="sp-eyebrow">Mobile Subscription App</span>
          <h1 className="sp-hero__h1">Daily Flower Deliveries, Built for Scale.</h1>
          <p className="sp-hero__body">
            A production-ready mobile subscription platform. Fully customizable and ready for your brand. 
            Experience a seamless mobile-first journey covering discovery, selection, and checkout flows.
          </p>
        </section>

        <div className="px-6 w-full relative z-10" style={{ marginTop: '2rem' }}>
          <div
            ref={ref}
            className="ad-app-section"
            style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="ad-flex ad-flex-col ad-items-center" style={{ flexShrink: 0 }}>
              {!isLg && phoneScale < 1 ? (
                <div style={{ transform: `scale(${phoneScale})`, transformOrigin: 'top center', height: `${PHONE_SECTION_H * phoneScale}px` }}>
                  <AndroidShell>
                    <AppContent />
                  </AndroidShell>
                </div>
              ) : (
                <AndroidShell>
                  <AppContent />
                </AndroidShell>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </AiratShell>
  );
}