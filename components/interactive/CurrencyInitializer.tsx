"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/hooks/useCurrency";

export function CurrencyInitializer() {
  const initCurrency = useCurrencyStore((state) => state.initCurrency);

  useEffect(() => {
    initCurrency();
  }, [initCurrency]);

  return null;
}
