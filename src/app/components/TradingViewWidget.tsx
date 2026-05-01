"use client";

import { memo, useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol: string;
  title: string;
}

const TradingViewWidget = memo(({ symbol, title }: TradingViewWidgetProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "allow_symbol_change": true,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "hide_volume": false,
        "hotlist": false,
        "interval": "D",
        "locale": "en",
        "save_image": true,
        "style": "1",
        "symbol": "${symbol}",
        "theme": "light",
        "timezone": "Etc/UTC",
        "backgroundColor": "#ffffff",
        "gridColor": "rgba(46, 46, 46, 0.06)",
        "watchlist": [],
        "withdateranges": false,
        "compareSymbols": [],
        "studies": [],
        "autosize": true
      }`;

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol]);

  const symbolSlug = symbol.replace(/:/g, "-");
  const symbolLink = `https://www.tradingview.com/symbols/${symbolSlug}/`;

  return (
    <div
      className="tradingview-widget-container h-full w-full"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      />
      <div className="tradingview-widget-copyright text-xs text-slate-500">
        <a
          href={symbolLink}
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-600"
        >
          <span className="blue-text">{title} chart</span>
        </a>
        <span className="pl-1">by TradingView</span>
      </div>
    </div>
  );
});

TradingViewWidget.displayName = "TradingViewWidget";

export default TradingViewWidget;
