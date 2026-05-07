import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currencyCode: string;
  exchangeRate: number;
  rates: Record<string, number>;
  isInitialized: boolean;
  setCurrency: (code: string) => void;
  initCurrency: () => Promise<void>;
}

// Common fallback rates in case API fails
const FALLBACK_RATES: Record<string, number> = {
  GBP: 1,
  USD: 1.25,
  EUR: 1.15,
  JPY: 190.5,
  AUD: 1.95,
  CAD: 1.70,
  CHF: 1.10,
  CNY: 9.0,
  INR: 105.0
};

export const formatPrice = (basePriceGBP: number, currencyCode: string, exchangeRate: number) => {
  const converted = basePriceGBP * exchangeRate;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(converted);
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currencyCode: 'GBP', // Default base
      exchangeRate: 1,
      rates: FALLBACK_RATES,
      isInitialized: false,
      
      setCurrency: (code: string) => {
        const { rates } = get();
        const rate = rates[code] || FALLBACK_RATES[code] || 1;
        set({ currencyCode: code, exchangeRate: rate });
      },

      initCurrency: async () => {
        if (get().isInitialized) return; // Prevent double fetch
        
        try {
          // 1. Fetch Exchange Rates based on GBP
          const ratesRes = await fetch('https://open.er-api.com/v6/latest/GBP');
          let newRates = FALLBACK_RATES;
          
          if (ratesRes.ok) {
            const ratesData = await ratesRes.json();
            if (ratesData.rates) {
              newRates = ratesData.rates;
            }
          }

          // 2. Try to get User's Location/Currency via ipapi.co
          // This requires no API key for standard limits
          let userCurrency = 'GBP';
          try {
            const geoRes = await fetch('https://ipapi.co/json/');
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData.currency && newRates[geoData.currency]) {
                userCurrency = geoData.currency;
              }
            }
          } catch (geoErr) {
            console.warn('Geolocation fetch failed, falling back to default/persisted currency.', geoErr);
            // Alternatively try ipwhois
            try {
               const geoWhoisRes = await fetch('https://ipwho.is/');
               if (geoWhoisRes.ok) {
                  const geoWhoisData = await geoWhoisRes.json();
                  if (geoWhoisData.connection && geoWhoisData.connection.currency && geoWhoisData.connection.currency.code && newRates[geoWhoisData.connection.currency.code]) {
                    userCurrency = geoWhoisData.connection.currency.code;
                  }
               }
            } catch (err) {
               // ignore
            }
          }
          
          // Check if we already have a persisted user preference
          // If the persisted currency isn't the default GBP, the user probably changed it, so don't overwrite.
          // For simplicity in this logic: if it's the first initialization across sessions, the persisted state handles initial value, but we can update the rate.
          
          const currentCode = get().currencyCode;
          // If we haven't ever set the code (it's GBP) and we detected a new one, use it
          const finalCode = currentCode === 'GBP' && userCurrency ? userCurrency : currentCode;

          set({
            rates: newRates,
            currencyCode: finalCode,
            exchangeRate: newRates[finalCode] || 1,
            isInitialized: true,
          });

        } catch (error) {
          console.error('Failed to initialize currency configuration:', error);
          // Setup basic initialization so it doesn't try endlessly
          set({ isInitialized: true });
        }
      }
    }),
    {
      name: 'diesel-currency-storage',
      // We only want to persist the user's selected code, not stale rates
      partialize: (state) => ({ currencyCode: state.currencyCode }),
    }
  )
);
