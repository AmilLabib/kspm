"use client";

import { useEffect, useRef } from "react";

interface TradingEconomicsWidgetProps {
  symbol: string;
}

const scriptSrc = "https://embed.tradingeconomics.com/widget.js";

export default function TradingEconomicsWidget({
  symbol,
}: TradingEconomicsWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    const widgetElement = document.createElement("div");
    widgetElement.className = "te-embed h-full";
    widgetElement.setAttribute("data-widget", "mc-pro");
    widgetElement.setAttribute("data-symbol", symbol.toLowerCase());

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;

    container.appendChild(widgetElement);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol]);

  return <div ref={containerRef} className="h-full w-full" />;
}
