/** Palace-inspired arch, scallop, and floral vines  -  light sky on dark (tile with white linework) */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<!-- Vertical flutes (pillar rhythm) -->
<path stroke="#cfefff" stroke-opacity="0.06" stroke-width="0.4" d="M22 0v220M44 0v220M66 0v220M154 0v220M176 0v220M198 0v220"/>
<!-- Scalloped arch band -->
<path stroke="#bfe8ff" stroke-opacity="0.11" stroke-width="0.55" d="M10 48 Q55 8 110 48 T210 48"/>
<path stroke="#ffffff" stroke-opacity="0.06" stroke-width="0.45" d="M10 58 Q55 22 110 58 T210 58"/>
<!-- Floral arabesque (simplified vines) -->
<path stroke="#ffffff" stroke-opacity="0.055" stroke-width="0.42" d="M110 72c-28 0-52 18-52 48s24 52 52 52 52-22 52-52-24-48-52-48z"/>
<path stroke="#76e4df" stroke-opacity="0.09" stroke-width="0.4" d="M72 118 Q110 88 148 118 Q110 148 72 118"/>
<path stroke="#ffffff" stroke-opacity="0.05" stroke-width="0.38" d="M88 96 Q110 108 132 96 M88 140 Q110 128 132 140"/>
<!-- Corner lattice -->
<path stroke="#bfe8ff" stroke-opacity="0.07" stroke-width="0.4" d="M0 0l38 38M220 0l-38 38M0 220l38-38M220 220l-38-38"/>
<path stroke="#ffffff" stroke-opacity="0.045" stroke-width="0.35" d="M110 160v48M160 110h48M0 110h48M110 0v48"/>
<circle cx="110" cy="110" r="36" stroke="#76e4df" stroke-opacity="0.065"/>
</g>
</svg>`;

export const BRAND_BACKDROP_FILIGREE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(SVG)}`;
