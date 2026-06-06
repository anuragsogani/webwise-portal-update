import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, Heart, Star, Map as MapIcon,
  List, X, ChevronLeft, ChevronRight, User, TrendingUp,
  DollarSign, Eye, ArrowUpRight, ShieldCheck, Settings,
  LogOut, Check, RefreshCw, Clock,
  Sparkles, MapPin, ChevronDown, Home, Maximize2
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import AiratShell from '../components/AiratShell';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import 'leaflet/dist/leaflet.css';
import '../styles/propertySearch.css';

// --- TYPES ---
interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  guests: number;
  images: string[];
  location: { lat: number; lon: number };
  description: string;
  amenities: string[];
  host: { name: string; image: string };
  tags: string[];
  score?: number;
}

// Removed Bounds as it's unused.

// --- CONFIGURATION ---
const ES_ENDPOINT = "https://airat.in/elastic/property_search/_search";
const ES_AUTH = "Basic " + btoa('airat_web:Sodala@MJRP2024');
const PAGE_SIZE = 12;

// --- UTILS ---
const formatINR = (amount: number) => {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
};

// --- LOGIC: ELASTICSEARCH HOOK ---
const useElasticsearch = () => {
  const [results, setResults] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [took, setTook] = useState(0);
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string, filters: any, mapBounds: any = null, page = 1, sortOption = 'relevance') => {
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    const must = [];
    const filter = [];

    if (query) {
      must.push({
        multi_match: {
          query: query,
          fields: ["title^3", "title.autocomplete", "title.ngram", "description", "amenities", "tags^2", "type"],
          fuzziness: "AUTO"
        }
      });
    } else {
      must.push({ match_all: {} });
    }

    if (filters.activeTag && filters.activeTag !== 'All') filter.push({ term: { "tags": filters.activeTag } });
    filter.push({ range: { price: { gte: filters.priceRange[0], lte: filters.priceRange[1] } } });
    if (filters.minGuests > 1) filter.push({ range: { guests: { gte: filters.minGuests } } });
    if (filters.propertyTypes?.length > 0) filter.push({ terms: { "type": filters.propertyTypes } });
    if (filters.amenities?.length > 0) filters.amenities.forEach((a: string) => filter.push({ term: { "amenities": a } }));

    if (mapBounds) {
      filter.push({
        geo_bounding_box: {
          location: { top_left: { lat: mapBounds.north, lon: mapBounds.west }, bottom_right: { lat: mapBounds.south, lon: mapBounds.east } }
        }
      });
    }

    let sortLogic: any[] = [];
    if (sortOption === 'price_asc') sortLogic = [{ "price": "asc" }];
    else if (sortOption === 'price_desc') sortLogic = [{ "price": "desc" }];
    else if (sortOption === 'rating') sortLogic = [{ "rating": "desc" }];
    else sortLogic = ["_score"];

    const requestBody = {
      from, size: PAGE_SIZE,
      query: { bool: { must, filter } },
      sort: sortLogic,
      suggest: {
        "text": query,
        "simple_phrase": {
          "phrase": {
            "field": "title.ngram", "size": 1, "gram_size": 3,
            "direct_generator": [{ "field": "title.ngram", "suggest_mode": "always" }],
            "collate": { "query": { "source": { "match": { "title": "{{suggestion}}" } } }, "prune": true }
          }
        }
      }
    };

    try {
      const response = await fetch(ES_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': ES_AUTH },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();

      if (data.hits) {
        setResults(data.hits.hits.map((h: any) => ({ ...h._source, id: h._id, score: h._score })));
        const actualTotal = data.hits.total.value;
        setTotal(actualTotal);
        setTook(data.took);
        setDisplayTotal(actualTotal > 0 ? Math.floor(actualTotal * (10 + Math.random() * 4) + Math.floor(Math.random() * 247)) : 0);
      }

      if (data.suggest?.simple_phrase?.[0]?.options?.length > 0) setDidYouMean(data.suggest.simple_phrase[0].options[0].text);
      else setDidYouMean(null);

    } catch (error) {
      console.error("Elasticsearch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (!text || text.length < 2) { setSuggestions([]); return; }
    try {
      const response = await fetch(ES_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': ES_AUTH },
        body: JSON.stringify({
          suggest: {
            "property-suggest": {
              "prefix": text,
              "completion": {
                "field": "suggest", "skip_duplicates": true, "fuzzy": { "fuzziness": "AUTO" },
                "contexts": { "property_type": ["Entire Home", "Private Room", "Hotel Room"] }
              }
            }
          }
        })
      });
      const data = await response.json();
      if (data.suggest?.['property-suggest']) setSuggestions(data.suggest['property-suggest'][0].options.map((o: any) => o.text));
    } catch (e) {
      console.error("Suggestion Error", e);
    }
  }, []);

  return { results, total, displayTotal, took, didYouMean, suggestions, loading, search, fetchSuggestions, setSuggestions, setDidYouMean };
};

// --- SUB-COMPONENTS ---

const AdvancedFilterModal = ({ isOpen, onClose, filters, setFilters, onApply }: any) => {
  const [tempFilters, setTempFilters] = useState(filters);
  useEffect(() => { setTempFilters(filters); }, [filters, isOpen]);

  if (!isOpen) return null;

  const handleApply = () => { setFilters({ ...filters, ...tempFilters }); onApply?.({ ...filters, ...tempFilters }); onClose(); };
  const handleClear = () => setTempFilters({ ...tempFilters, priceRange: [500, 20000], propertyTypes: [], amenities: [], minGuests: 1 });
  const togglePropertyType = (type: string) => setTempFilters((p: any) => ({ ...p, propertyTypes: p.propertyTypes.includes(type) ? p.propertyTypes.filter((t: string) => t !== type) : [...p.propertyTypes, type] }));
  const toggleAmenity = (am: string) => setTempFilters((p: any) => ({ ...p, amenities: p.amenities.includes(am) ? p.amenities.filter((a: string) => a !== am) : [...p.amenities, am] }));

  const allAmenities = ['Wifi', 'AC', 'Kitchen', 'Parking', 'Pool', 'Workspace', 'Gym', 'Garden', 'Balcony'];
  const propertyTypeOptions = ['Entire Home', 'Private Room', 'Hotel Room'];

  return (
    <div className="ps-modal-overlay" onClick={onClose}>
      <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="ps-filter-drawer" onClick={e => e.stopPropagation()}>
        <div className="ps-modal-header">
          <h3>Filters</h3>
          <button className="ps-btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="ps-modal-content ps-scrollbar">
          <div className="ps-filter-group">
            <h4>Price Range (Nightly)</h4>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label className="ps-label">Min Price</label>
                <input type="number" value={tempFilters.priceRange[0]} onChange={e => setTempFilters((p: any) => ({ ...p, priceRange: [Number(e.target.value), p.priceRange[1]] }))} className="ps-input" />
              </div>
              <div style={{ flex: 1 }}>
                <label className="ps-label">Max Price</label>
                <input type="number" value={tempFilters.priceRange[1]} onChange={e => setTempFilters((p: any) => ({ ...p, priceRange: [p.priceRange[0], Number(e.target.value)] }))} className="ps-input" />
              </div>
            </div>
            <input type="range" min="500" max="20000" step="500" value={tempFilters.priceRange[1]} onChange={e => setTempFilters((p: any) => ({ ...p, priceRange: [p.priceRange[0], Number(e.target.value)] }))} style={{ width: '100%', accentColor: 'var(--tiffany)' }} />
          </div>

          <div className="ps-filter-group">
            <h4>Property Type</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {propertyTypeOptions.map(type => {
                const isActive = tempFilters.propertyTypes.includes(type);
                return (
                  <button key={type} onClick={() => togglePropertyType(type)} className={`ps-selectable-btn ${isActive ? 'active' : ''}`}>
                    <span>{type}</span>
                    {isActive && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ps-filter-group">
            <h4>Amenities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {allAmenities.map(am => {
                const isActive = tempFilters.amenities.includes(am);
                return <button key={am} onClick={() => toggleAmenity(am)} className={`ps-selectable-btn ${isActive ? 'active' : ''}`} style={{ justifyContent: 'center' }}>{am}</button>;
              })}
            </div>
          </div>

          <div className="ps-filter-group">
            <h4>Guests</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setTempFilters((p: any) => ({ ...p, minGuests: Math.max(1, p.minGuests - 1) }))} className="ps-circle-btn">-</button>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{tempFilters.minGuests} <span style={{ fontSize: '14px', color: 'var(--dim)', fontWeight: 'normal' }}>guests</span></div>
              <button onClick={() => setTempFilters((p: any) => ({ ...p, minGuests: Math.min(10, p.minGuests + 1) }))} className="ps-circle-btn">+</button>
            </div>
          </div>
        </div>

        <div className="ps-modal-footer">
          <button className="ps-btn ps-btn-outline" style={{ flex: 1 }} onClick={handleClear}>Clear All</button>
          <button className="ps-btn ps-btn-primary" style={{ flex: 1 }} onClick={handleApply}>Show Results</button>
        </div>
      </motion.div>
    </div>
  );
};

const HostDashboard = () => (
  <div className="ps-dashboard ps-scrollbar">
    <div style={{ marginBottom: '32px' }}>
      <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: 'var(--white)' }}>Welcome back, Rajesh</h1>
      <p style={{ color: 'var(--dim)' }}>Here is what's happening with your listings today.</p>
    </div>

    <div className="ps-stats-grid">
      {[
        { icon: DollarSign, value: "₹45,200", label: "Earnings in October", change: "+12%" },
        { icon: Eye, value: "1,204", label: "Views in last 30 days", change: "+5%" },
        { icon: Star, value: "Superhost", label: "Status maintained", badge: "4.9" }
      ].map((stat, i) => (
        <div key={i} className="ps-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div className="ps-icon-box"><stat.icon size={20} /></div>
            {stat.change && <span className="ps-badge">{stat.change} <ArrowUpRight size={12} /></span>}
            {stat.badge && <span className="ps-badge">{stat.badge}</span>}
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--white)' }}>{stat.value}</div>
          <div style={{ fontSize: '14px', color: 'var(--dim)' }}>{stat.label}</div>
        </div>
      ))}
    </div>

    <div className="ps-alert-card">
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: 'var(--void)' }}>Complete listing</h3>
        <p style={{ color: 'rgba(13, 15, 18, 0.8)', marginBottom: '16px' }}>Your "Rooftop Fort View" is missing photos.</p>
        <button className="ps-btn" style={{ background: 'var(--void)', color: 'var(--white)' }}>Edit Listing</button>
      </div>
      <ShieldCheck size={120} style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1, color: 'var(--void)' }} />
    </div>
  </div>
);

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button className="ps-user-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <List size={16} style={{ color: 'var(--dim)' }} />
        <div className="ps-avatar"><User size={14} /></div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="ps-dropdown">
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--white)' }}>Guest User</div>
              <div style={{ fontSize: '12px', color: 'var(--dim)' }}>guest@example.com</div>
            </div>
            <div style={{ padding: '8px 0' }}>
              <button className="ps-dropdown-item"><User size={16} /> Profile</button>
              <button className="ps-dropdown-item"><Settings size={16} /> Settings</button>
            </div>
            <div style={{ padding: '8px 0', borderTop: '1px solid var(--border)' }}>
              <button className="ps-dropdown-item" style={{ color: '#f87171' }}><LogOut size={16} /> Log out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const next = (e: any) => { e.stopPropagation(); setIdx((c) => (c + 1) % images.length); };
  const prev = (e: any) => { e.stopPropagation(); setIdx((c) => (c - 1 + images.length) % images.length); };

  return (
    <div className="ps-carousel">
      <img src={images?.[idx] || "https://via.placeholder.com/800x600?text=No+Image"} alt="" loading="lazy" />
      {images?.length > 1 && (
        <>
          <div className="ps-carousel-nav">
            <button onClick={prev}><ChevronLeft size={16} /></button>
            <button onClick={next}><ChevronRight size={16} /></button>
          </div>
          <div className="ps-carousel-dots">
            {images.map((_, i) => <div key={i} className={`dot ${i === idx ? 'active' : ''}`} />)}
          </div>
        </>
      )}
    </div>
  );
};

const DetailPanel = ({ property, onClose }: any) => {
  if (!property) return null;
  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }}
      className="ps-detail-panel">
      <div style={{ position: 'relative', height: '280px', flexShrink: 0 }}>
        <button onClick={onClose} className="ps-btn-icon" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: 'rgba(13, 15, 18, 0.8)', backdropFilter: 'blur(4px)' }}><X size={20} color="#fff" /></button>
        <img src={property.images?.[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" loading="lazy" />
      </div>

      <div className="ps-modal-content ps-scrollbar" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--white)' }}>{property.title}</h2>
        <div style={{ fontSize: '14px', color: 'var(--dim)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {property.type} • <Star size={14} style={{ color: 'var(--tiffany)', fill: 'var(--tiffany)' }} /> {property.rating?.toFixed(2)} • {property.guests} guests
        </div>
        <div className="ps-divider" />
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <img src={property.host?.image} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--card2)', objectFit: 'cover' }} alt="" />
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--white)' }}>Hosted by {property.host?.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--dim)' }}>Superhost • 5 years hosting</div>
          </div>
        </div>
        <div className="ps-divider" />
        <p style={{ color: 'var(--dim)', lineHeight: 1.6, fontSize: '14px' }}>{property.description}</p>
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', marginBottom: '12px' }}>Amenities</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {property.amenities?.map((am: string) => (
              <span key={am} className="ps-tag ps-tag-outline">{am}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="ps-modal-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{formatINR(property.price)}</div>
          <div style={{ fontSize: '12px', color: 'var(--dim)' }}>per night</div>
        </div>
        <button className="ps-btn ps-btn-primary">Reserve</button>
      </div>
    </motion.div>
  );
};

const createMarkerIcon = (price: number, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="background-color: ${isSelected ? 'var(--tiffany)' : 'var(--card)'}; color: ${isSelected ? 'var(--void)' : 'var(--white)'}; padding: 6px 12px; border-radius: 20px; font-weight: 700; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); border: 2px solid ${isSelected ? 'var(--tiffany)' : 'var(--border)'}; white-space: nowrap; transition: all 0.2s;">${formatINR(price)}</div>`,
    iconSize: [80, 30], iconAnchor: [40, 15],
  });
};

const MapController = ({ center, onBoundsChanged }: any) => {
  const map = useMap();
  useEffect(() => { if (center) map.flyTo(center, 13, { duration: 1.2 }); }, [center, map]);
  useMapEvents({
    dragend: () => onBoundsChanged(map.getBounds()),
    zoomend: () => onBoundsChanged(map.getBounds())
  });
  return null;
};

const ThemeAwareTileLayer = () => {
  const { theme } = useTheme();
  const url = theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  return <TileLayer key={theme} url={url} />;
};

const MapWrapper = ({ properties, selectedId, hoveredId, center, onSelect, onRefresh, isLoading }: any) => {
  const [showRefreshBtn, setShowRefreshBtn] = useState(false);
  const [currentBounds, setCurrentBounds] = useState<{ north: number, south: number, east: number, west: number } | null>(null);

  const handleBoundsChange = (bounds: any) => {
    setShowRefreshBtn(true);
    setCurrentBounds({ north: bounds.getNorth(), south: bounds.getSouth(), east: bounds.getEast(), west: bounds.getWest() });
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      {showRefreshBtn && (
        <button onClick={() => { setShowRefreshBtn(false); onRefresh(currentBounds); }} className="ps-map-refresh-btn">
          {isLoading ? <RefreshCw className="ps-spin" size={14} /> : <MapPin size={14} />} Search this area
        </button>
      )}
      <MapContainer center={[26.9124, 75.7873]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', background: 'var(--void)' }} zoomControl={false}>
        <ThemeAwareTileLayer />
        <MapController center={center} onBoundsChanged={handleBoundsChange} />
        {properties.map((p: any) => (
          <Marker key={p.id} position={[p.location.lat, p.location.lon]} icon={createMarkerIcon(p.price, selectedId === p.id || hoveredId === p.id)} eventHandlers={{ click: () => onSelect(p.id) }} zIndexOffset={selectedId === p.id ? 999 : 0} />
        ))}
      </MapContainer>
    </div>
  );
};


// --- APP CONTENT ---
const PropertyAppContent = () => {
  const [isHostingMode, setIsHostingMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ activeTag: 'All', priceRange: [500, 20000], propertyTypes: [], amenities: [], minGuests: 1, sortBy: 'relevance' });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [isMobileMap, setIsMobileMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const { results, total, displayTotal, took, didYouMean, suggestions, loading, search, fetchSuggestions, setSuggestions, setDidYouMean } = useElasticsearch();

  useEffect(() => {
    const phrases = ["Try 'Heritage Villa'...", "Search 'Pool View Property'...", "Find 'Luxury Apartment'..."];
    const handleType = () => {
      const fullText = phrases[loopNum % phrases.length];
      setPlaceholder(isDeleting ? fullText.substring(0, placeholder.length - 1) : fullText.substring(0, placeholder.length + 1));
      if (!isDeleting && placeholder === fullText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && placeholder === "") { setIsDeleting(false); setLoopNum(loopNum + 1); }
    };
    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum]);

  useEffect(() => { search("", filters, null, 1, filters.sortBy); }, []);
  useEffect(() => { setCurrentPage(1); search(searchQuery, filters, null, 1, filters.sortBy); }, [filters]);

  const handleDidYouMean = () => {
    if (didYouMean) {
      executeSearch(didYouMean);
      setDidYouMean(null);
    }
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; setSearchQuery(val);
    if (val.length >= 2) { fetchSuggestions(val); setShowSuggestions(true); }
    else { setSuggestions([]); setShowSuggestions(false); }
  };

  const executeSearch = (query: string) => { setSearchQuery(query); setShowSuggestions(false); setCurrentPage(1); search(query, filters, null, 1, filters.sortBy); };
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const activeFiltersCount = (filters.priceRange[0] > 500 || filters.priceRange[1] < 20000 ? 1 : 0) + filters.propertyTypes.length + filters.amenities.length + (filters.minGuests > 1 ? 1 : 0);

  return (
    <div className="ps-root">
      {/* Header */}
      <header className="ps-header">
        <div className="ps-brand">
          <div style={{ width: 48, height: 48, borderRadius: 15, background: 'linear-gradient(135deg, var(--tiffany), rgba(118, 228, 223, 0.72))', display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(118, 228, 223, 0.18)' }}>
            <Home size={22} strokeWidth={2.5} style={{ color: 'var(--void)' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)', fontFamily: 'var(--font-display)', marginLeft: '0.8rem' }}>AiRAT<span style={{ color: 'var(--tiffany)' }}>.</span></span>
        </div>

        <div className="ps-search-wrapper">
          {!isHostingMode ? (
            <div className="ps-search-bar" style={{ borderRadius: showSuggestions && suggestions.length > 0 ? '24px 24px 0 0' : '24px', borderBottomColor: showSuggestions && suggestions.length > 0 ? 'transparent' : 'var(--border)' }}>
              <input type="text" value={searchQuery} onChange={handleSearchInput} onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)} onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchQuery)} placeholder={placeholder} className="ps-input" />
              {searchQuery && <button onClick={() => { setSearchQuery(""); setShowSuggestions(false); }} className="ps-btn-icon"><X size={14} /></button>}
              <button onClick={() => executeSearch(searchQuery)} className="ps-btn-search"><Search size={16} strokeWidth={2.5} /></button>

              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="ps-suggestions">
                    {suggestions.map((item, idx) => (
                      <div key={idx} onMouseDown={(e) => { e.preventDefault(); executeSearch(item); }} className="ps-suggestion-item">
                        <Search size={14} style={{ color: 'var(--muted)' }} /> <span dangerouslySetInnerHTML={{ __html: item.replace(new RegExp(`(${searchQuery})`, 'gi'), `<span style="color:var(--tiffany);font-weight:600">$1</span>`) }} />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
              <div style={{ padding: '8px', background: 'var(--tiffany-dim)', color: 'var(--tiffany)', borderRadius: '8px' }}><TrendingUp size={20} /></div> <span style={{ color: 'var(--white)' }}>Host Dashboard</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setIsHostingMode(!isHostingMode)} className="ps-btn ps-btn-outline" style={{ borderRadius: '24px', padding: '8px 16px', fontSize: '12px' }}>
            {isHostingMode ? "Travel Mode" : "Hosting Mode"}
          </button>
          <UserMenu />
        </div>
      </header>

      {/* Main Area */}
      <div className="ps-main-area">
        {isHostingMode ? <HostDashboard /> : (
          <>
            {/* Filter Bar */}
            <div className="ps-filter-bar">
              <button onClick={() => setShowAdvancedFilter(true)} className={`ps-btn ${activeFiltersCount > 0 ? 'ps-btn-primary' : 'ps-btn-outline'}`} style={{ padding: '10px 16px', fontSize: '12px', position: 'relative', borderRadius: '12px' }}>
                <SlidersHorizontal size={14} /> Filters
                {activeFiltersCount > 0 && <span className="ps-filter-badge">{activeFiltersCount}</span>}
              </button>

              <div className="ps-select-wrapper">
                <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} className="ps-select">
                  <option value="relevance">Best Match</option>
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--dim)' }} />
              </div>

              <div className="ps-divider-v" />

              <div className="ps-tags-scroll ps-scrollbar">
                {[{ name: 'All' }, { name: 'Heritage' }, { name: 'Pool' }, { name: 'Farm' }, { name: 'View' }, { name: 'Design' }].map((f) => (
                  <button key={f.name} onClick={() => setFilters({ ...filters, activeTag: f.name })} className={`ps-tag-btn ${filters.activeTag === f.name ? 'active' : ''}`}>
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="ps-content-split">
              {/* List View */}
              <div className={`ps-list-pane ps-scrollbar ${isMobileMap ? 'hide-mobile' : ''}`}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4px' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{loading ? "Searching..." : `${displayTotal.toLocaleString()} properties found`}</h1>
                    {!loading && <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'monospace' }}><Clock size={10} style={{ display: 'inline', marginRight: '4px' }} />{took}ms</span>}
                  </div>
                  {didYouMean && <div style={{ fontSize: '12px', color: '#f87171' }}>Did you mean: <button onClick={handleDidYouMean} style={{ background: 'none', border: 'none', color: '#f87171', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>{didYouMean}</button>?</div>}
                </div>

                <div className="ps-grid">
                  {loading ? [...Array(6)].map((_, i) => (
                    <div key={i} style={{ animation: 'pulse 1.5s infinite' }}>
                      <div style={{ aspectRatio: '1/0.95', background: 'var(--card2)', borderRadius: '16px', marginBottom: '12px' }} />
                      <div style={{ height: '16px', background: 'var(--card2)', borderRadius: '4px', width: '75%', marginBottom: '8px' }} />
                      <div style={{ height: '16px', background: 'var(--card2)', borderRadius: '4px', width: '50%' }} />
                    </div>
                  )) : results.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center', color: 'var(--dim)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="ps-empty-icon"><Search size={32} /></div>
                      <h3 style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '8px' }}>No properties found</h3>
                      <button onClick={() => executeSearch("")} className="ps-btn ps-btn-primary" style={{ marginTop: '16px' }}>Clear all filters</button>
                    </div>
                  ) : results.map((prop) => (
                    <div key={prop.id} className="ps-property-card" onMouseEnter={() => setHoveredId(prop.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => { setSelectedId(prop.id); setMapCenter([prop.location.lat, prop.location.lon]); }}>
                      <div className="ps-card-img-wrapper">
                        <ImageCarousel images={prop.images} />
                        <button className="ps-heart-btn" onClick={(e) => e.stopPropagation()}><Heart size={20} /></button>
                        {prop.tags.includes('Design') && <div className="ps-badge-overlay"><Sparkles size={10} /> Guest Favorite</div>}
                      </div>
                      <div style={{ padding: '4px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--white)', flexShrink: 0 }}><Star size={12} style={{ color: 'var(--tiffany)', fill: 'var(--tiffany)' }} /> {prop.rating?.toFixed(2)}</div>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--dim)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.type} • {prop.guests} guests</div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--white)' }}>{formatINR(prop.price)} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--dim)' }}>night</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                {!loading && total > PAGE_SIZE && (
                  <div className="ps-pagination">
                    <button onClick={() => { setCurrentPage(currentPage - 1); search(searchQuery, filters, null, currentPage - 1, filters.sortBy); }} disabled={currentPage === 1} className="ps-btn-icon"><ChevronLeft size={20} /></button>
                    <span style={{ fontSize: '14px', color: 'var(--dim)', fontWeight: 600 }}>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => { setCurrentPage(currentPage + 1); search(searchQuery, filters, null, currentPage + 1, filters.sortBy); }} disabled={currentPage === totalPages} className="ps-btn-icon"><ChevronRight size={20} /></button>
                  </div>
                )}
              </div>

              {/* Map View */}
              <div className={`ps-map-pane ${!isMobileMap ? 'hide-mobile' : ''}`}>
                <MapWrapper properties={results} selectedId={selectedId} hoveredId={hoveredId} center={mapCenter} onSelect={setSelectedId} onRefresh={(b: any) => { setCurrentPage(1); search(searchQuery, filters, b, 1, filters.sortBy); }} isLoading={loading} />
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="ps-mobile-toggle">
              <button onClick={() => setIsMobileMap(!isMobileMap)} className="ps-btn ps-btn-primary" style={{ borderRadius: '24px', padding: '12px 24px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                {isMobileMap ? <><List size={16} /> Show list</> : <><MapIcon size={16} /> Map</>}
              </button>
            </div>
          </>
        )}
      </div>

      <AdvancedFilterModal isOpen={showAdvancedFilter} onClose={() => setShowAdvancedFilter(false)} filters={filters} setFilters={setFilters} onApply={(f: any) => search(searchQuery, f, null, 1, f.sortBy)} />
      <AnimatePresence>{selectedId && <DetailPanel property={results.find((p: any) => p.id === selectedId)} onClose={() => setSelectedId(null)} />}</AnimatePresence>
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

// --- MAIN DEMO WRAPPER ---
const DemoPropertySearch = () => {
  return (
    <AiratShell>
      <SiteHeader />
      <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
        <section className="sp-hero dp-hero">
          <span className="sp-eyebrow">Property Search Discovery</span>
          <h1 className="sp-hero__h1">Immersive Property Discovery.</h1>
          <p className="sp-hero__body">
            Experience map-based geospatial search with live filters, interactive cards, and high-performance querying built for real estate scale.
          </p>
        </section>

        <div className="px-6 w-full relative z-10" style={{ marginTop: '2rem' }}>
          <Monitor title="AiRat Property Search Demo">
            <div id="demo-prop-root">
              <PropertyAppContent />
            </div>
          </Monitor>
        </div>
      </main>
      <SiteFooter />
    </AiratShell>
  );
};

export default DemoPropertySearch;
