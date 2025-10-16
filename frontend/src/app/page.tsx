import { StreamDashboard } from "@/components/stream-dashboard";
import { getAllStreams } from "@/lib/stream-contract";

export const dynamic = "force-dynamic";

export default async function Home() {
  const streams = await getAllStreams();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="liquid-text">Stream Tokens</span>
          <br />
          <span className="text-mercury-50 mercury-glow">Continuously</span>
        </h1>
        <p className="text-xl text-mercury-300 max-w-2xl mx-auto">
          Create payment streams for STX, sBTC, and any SIP-010 token.
          Real-time, trustless, and transparent.
        </p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-flow-teal/10 blur-3xl -z-10 blob-animate" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-flow-indigo/10 rounded-full blur-3xl -z-10 animate-morph" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="stream-card text-center morph-border ripple-effect">
          <div className="text-4xl font-bold liquid-text mb-2">
            {streams.length}
          </div>
          <div className="text-liquid-chrome">Total Streams</div>
        </div>
        <div className="stream-card text-center morph-border ripple-effect">
          <div className="text-4xl font-bold text-flow-teal teal-glow mb-2">
            {streams.filter(s => s.balance > 0).length}
          </div>
          <div className="text-liquid-chrome">Active Streams</div>
        </div>
        <div className="stream-card text-center morph-border ripple-effect">
          <div className="text-4xl font-bold text-flow-indigo indigo-glow mb-2">
            {streams.reduce((acc, s) => acc + s.balance, 0) / 1_000_000}
          </div>
          <div className="text-liquid-chrome">Total STX Locked</div>
        </div>
      </div>

      {/* Stream Dashboard */}
      <StreamDashboard initialStreams={streams} />
    </div>
  );
}
