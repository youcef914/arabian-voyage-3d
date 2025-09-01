import { create } from 'zustand';

// Arabic countries data with their coordinates and information
export const arabCountries = [
  { id: 'DZ', name: 'الجزائر', nameEn: 'Algeria', position: [3, 28], color: '#D4AF37' },
  { id: 'BH', name: 'البحرين', nameEn: 'Bahrain', position: [50.6, 26.2], color: '#C9A96E' },
  { id: 'KM', name: 'جزر القمر', nameEn: 'Comoros', position: [43.2, -11.6], color: '#B8960A' },
  { id: 'DJ', name: 'جيبوتي', nameEn: 'Djibouti', position: [43, 11.6], color: '#D4AF37' },
  { id: 'EG', name: 'مصر', nameEn: 'Egypt', position: [30, 26], color: '#C9A96E' },
  { id: 'IQ', name: 'العراق', nameEn: 'Iraq', position: [44, 33], color: '#B8960A' },
  { id: 'JO', name: 'الأردن', nameEn: 'Jordan', position: [36, 31], color: '#D4AF37' },
  { id: 'KW', name: 'الكويت', nameEn: 'Kuwait', position: [47.8, 29.3], color: '#C9A96E' },
  { id: 'LB', name: 'لبنان', nameEn: 'Lebanon', position: [35.8, 33.9], color: '#B8960A' },
  { id: 'LY', name: 'ليبيا', nameEn: 'Libya', position: [17, 25], color: '#D4AF37' },
  { id: 'MR', name: 'موريتانيا', nameEn: 'Mauritania', position: [-10, 20], color: '#C9A96E' },
  { id: 'MA', name: 'المغرب', nameEn: 'Morocco', position: [-6, 32], color: '#B8960A' },
  { id: 'OM', name: 'عُمان', nameEn: 'Oman', position: [56, 21], color: '#D4AF37' },
  { id: 'PS', name: 'فلسطين', nameEn: 'Palestine', position: [35.2, 31.9], color: '#C9A96E' },
  { id: 'QA', name: 'قطر', nameEn: 'Qatar', position: [51.2, 25.3], color: '#B8960A' },
  { id: 'SA', name: 'السعودية', nameEn: 'Saudi Arabia', position: [45, 24], color: '#D4AF37' },
  { id: 'SO', name: 'الصومال', nameEn: 'Somalia', position: [46, 5.2], color: '#C9A96E' },
  { id: 'SD', name: 'السودان', nameEn: 'Sudan', position: [30, 12.9], color: '#B8960A' },
  { id: 'SY', name: 'سوريا', nameEn: 'Syria', position: [38, 35], color: '#D4AF37' },
  { id: 'TN', name: 'تونس', nameEn: 'Tunisia', position: [9, 34], color: '#C9A96E' },
  { id: 'AE', name: 'الإمارات', nameEn: 'UAE', position: [54, 24], color: '#B8960A' },
  { id: 'YE', name: 'اليمن', nameEn: 'Yemen', position: [48, 15.4], color: '#D4AF37' },
];

interface AppState {
  selectedCountry: string | null;
  hoveredCountry: string | null;
  cameraPosition: [number, number, number];
  isLoading: boolean;
  showWelcome: boolean;
  sidebarOpen: boolean;
  
  // Actions
  setSelectedCountry: (country: string | null) => void;
  setHoveredCountry: (country: string | null) => void;
  setCameraPosition: (position: [number, number, number]) => void;
  setLoading: (loading: boolean) => void;
  setShowWelcome: (show: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Getters
  getCountryByCode: (code: string) => typeof arabCountries[0] | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedCountry: null,
  hoveredCountry: null,
  cameraPosition: [0, 0, 5],
  isLoading: false,
  showWelcome: true,
  sidebarOpen: false,
  
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setHoveredCountry: (country) => set({ hoveredCountry: country }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setLoading: (loading) => set({ isLoading: loading }),
  setShowWelcome: (show) => set({ showWelcome: show }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  getCountryByCode: (code) => arabCountries.find(country => country.id === code),
}));