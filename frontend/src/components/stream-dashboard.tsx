"use client";

import { Stream, getCurrentBlockHeight } from "@/lib/stream-contract";
import { useEffect, useState } from "react";
import { StreamCard } from "./stream-card";
import { Activity, Filter } from "lucide-react";

interface StreamDashboardProps {
  initialStreams: Stream[];
}

export function StreamDashboard({ initialStreams }: StreamDashboardProps) {
  const [streams, setStreams] = useState<Stream[]>(initialStreams);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [filter, setFilter] = useState<"all" | "active" | "pending" | "completed">("all");

  useEffect(() => {
    // Fetch current block height
    getCurrentBlockHeight().then(setCurrentBlock);

    // Update block height every 30 seconds
    const interval = setInterval(() => {
      getCurrentBlockHeight().then(setCurrentBlock);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredStreams = streams.filter((stream) => {
    if (filter === "all") return true;
    if (filter === "active") {
      return currentBlock >= stream.startBlock && currentBlock < stream.stopBlock;
    }
    if (filter === "pending") {
      return currentBlock < stream.startBlock;
    }
    if (filter === "completed") {
      return currentBlock >= stream.stopBlock;
    }
    return true;
  });

  if (streams.length === 0) {
    return (
      <div className="stream-card text-center py-16 morph-border">
        <Activity className="w-16 h-16 text-flow-teal mx-auto mb-4 mercury-drip" />
        <h3 className="text-2xl font-bold liquid-text mb-2">No Streams Yet</h3>
        <p className="text-mercury-300">Create your first stream to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <Filter className="w-5 h-5 text-flow-teal mercury-drip" />
        <div className="flex gap-2">
          {(["all", "active", "pending", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 border ripple-effect ${
                filter === f
                  ? "bg-mercury-flow text-white shadow-liquid border-flow-teal"
                  : "bg-mercury-800/50 text-mercury-300 hover:bg-mercury-700/50 border-liquid-chrome/30 hover:border-flow-teal/50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStreams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} currentBlock={currentBlock} />
        ))}
      </div>

      {filteredStreams.length === 0 && (
        <div className="stream-card text-center py-12">
          <p className="text-mercury-300">No {filter} streams found</p>
        </div>
      )}
    </div>
  );
}
