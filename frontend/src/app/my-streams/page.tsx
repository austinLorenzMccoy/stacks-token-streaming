"use client";

import { useEffect, useState } from "react";
import { getAllStreams, getCurrentBlockHeight, Stream } from "@/lib/stream-contract";
import { useStacks } from "@/hooks/use-stacks";
import { StreamCard } from "@/components/stream-card";
import { Wallet, Send, Inbox, Activity } from "lucide-react";

export default function MyStreamsPage() {
  const { userData, connectWallet } = useStacks();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allStreams = await getAllStreams();
      setStreams(allStreams);
      const block = await getCurrentBlockHeight();
      setCurrentBlock(block);
      setLoading(false);
    };

    fetchData();

    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="stream-card text-center py-16">
          <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-4">Connect Your Wallet</h3>
          <p className="text-gray-500 mb-6">
            Connect your wallet to view your streams
          </p>
          <button onClick={connectWallet} className="glass-button">
            <Wallet className="w-5 h-5 inline mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  const userAddress = userData.profile.stxAddress.testnet;
  const sentStreams = streams.filter((s) => s.sender === userAddress);
  const receivedStreams = streams.filter((s) => s.recipient === userAddress);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="stream-card text-center py-16">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-gray-400">Loading Your Streams...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-gradient">My Streams</span>
        </h1>
        <p className="text-gray-400">Manage all your payment streams in one place</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="stream-card text-center">
          <Send className="w-8 h-8 text-flow-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gradient mb-1">
            {sentStreams.length}
          </div>
          <div className="text-gray-400">Streams Sent</div>
        </div>
        <div className="stream-card text-center">
          <Inbox className="w-8 h-8 text-stream-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-stream-400 mb-1">
            {receivedStreams.length}
          </div>
          <div className="text-gray-400">Streams Received</div>
        </div>
        <div className="stream-card text-center">
          <Activity className="w-8 h-8 text-bitcoin-400 mx-auto mb-2" />
          <div className="text-3xl font-bold bitcoin-glow mb-1">
            {sentStreams.length + receivedStreams.length}
          </div>
          <div className="text-gray-400">Total Streams</div>
        </div>
      </div>

      {/* Sent Streams */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Send className="w-6 h-6 text-flow-400" />
          Streams You're Sending
        </h2>
        {sentStreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sentStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} currentBlock={currentBlock} />
            ))}
          </div>
        ) : (
          <div className="stream-card text-center py-12">
            <p className="text-gray-400">You haven't created any streams yet</p>
          </div>
        )}
      </div>

      {/* Received Streams */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Inbox className="w-6 h-6 text-stream-400" />
          Streams You're Receiving
        </h2>
        {receivedStreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {receivedStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} currentBlock={currentBlock} />
            ))}
          </div>
        ) : (
          <div className="stream-card text-center py-12">
            <p className="text-gray-400">You're not receiving any streams yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
