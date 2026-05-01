import Navbar from "../components/Common/navbar";
import TradingEconomicsWidget from "../components/TradingEconomicsWidget";
import TradingViewWidget from "../components/TradingViewWidget";

const instruments = [
  {
    id: "ihsg",
    title: "IHSG",
    subtitle: "IDX:COMPOSITE",
    description:
      "Indeks Harga Saham Gabungan sebagai barometer pasar modal Indonesia.",
    symbol: "IDX:COMPOSITE",
    provider: "tradingview",
  },
  {
    id: "bitcoin",
    title: "Bitcoin",
    subtitle: "BTCUSD",
    description: "Harga Bitcoin spot terhadap dolar AS (Binance).",
    symbol: "BINANCE:BTCUSD",
    provider: "tradingview",
  },
  {
    id: "gold",
    title: "Gold",
    subtitle: "XAUUSD",
    description: "Harga emas dunia terhadap dolar Amerika (spot).",
    symbol: "OANDA:XAUUSD",
    provider: "tradingview",
  },
  {
    id: "coal",
    title: "Coal",
    subtitle: "CL1:COM",
    description: "Harga batubara acuan (CL1:COM) dari Trading Economics.",
    symbol: "cl1:com",
    provider: "tradingeconomics",
  },
  {
    id: "cpo",
    title: "CPO",
    subtitle: "XAL1:COM",
    description: "Harga CPO global (XAL1:COM) dari Trading Economics.",
    symbol: "xal1:com",
    provider: "tradingeconomics",
  },
  {
    id: "brent",
    title: "Brent",
    subtitle: "USOIL",
    description: "Harga minyak mentah Brent (USOIL) sebagai acuan global.",
    symbol: "TVC:USOIL",
    provider: "tradingview",
  },
];

export default function MacroeconomicIndicatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-white pt-8 pb-16">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <header className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
              Macroeconomic Indicator
            </p>
            <h1 className="text-4xl font-bold text-slate-900">
              Pantau Pergerakan Komoditas Utama
            </h1>
            <p className="text-base text-slate-600">
              Ikuti harga indeks saham, komoditas energi, dan logam mulia untuk
              mendukung keputusan riset dan investasi KSPM.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {instruments.map((instrument) => (
              <section
                key={instrument.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {instrument.subtitle}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {instrument.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {instrument.description}
                  </p>
                </div>
                <div className="h-[320px] w-full">
                  {instrument.provider === "tradingview" ? (
                    <TradingViewWidget
                      symbol={instrument.symbol}
                      title={`${instrument.title} (${instrument.subtitle})`}
                    />
                  ) : (
                    <TradingEconomicsWidget symbol={instrument.symbol} />
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
