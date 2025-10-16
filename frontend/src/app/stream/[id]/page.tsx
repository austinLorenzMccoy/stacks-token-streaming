"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { getStream, getBalanceOf, getCurrentBlockHeight, Stream } from "@/lib/stream-contract";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress, formatSTX, calculateProgress, getStreamStatus, formatTimeRemaining } from "@/lib/utils";
import { ArrowLeft, Droplets, Download, Fuel, DollarSign, Clock, TrendingUp, User, Activity } from "lucide-react";
import Link from "next/link";

export default function StreamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { userData, handleWithdraw, handleRefuel, handleRefund, isLoading } = useStacks();
  
  const [stream, setStream] = useState<Stream | null>(null);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [recipientBalance, setRecipientBalance] = useState(0);
  const [senderBalance, setSenderBalance] = useState(0);
  const [refuelAmount, setRefuelAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const streamData = await getStream(parseInt(id));
      setStream(streamData);

      const block = await getCurrentBlockHeight();
      setCurrentBlock(block);

      if (streamData && userData) {
        const recBalance = await getBalanceOf(parseInt(id), streamData.recipient);
        const senBalance = await getBalanceOf(parseInt(id), streamData.sender);
        setRecipientBalance(recBalance);
        setSenderBalance(senBalance);
      }
    };

    fetchData();

    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [id, userData]);

  if (!stream) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="stream-card text-center py-16">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-gray-400">Loading Stream...</h3>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(stream.startBlock, stream.stopBlock, currentBlock);
  const status = getStreamStatus(stream.startBlock, stream.stopBlock, currentBlock);
  const blocksRemaining = Math.max(0, stream.stopBlock - currentBlock);
  const isRecipient = userData?.profile.stxAddress.testnet === stream.recipient;
  const isSender = userData?.profile.stxAddress.testnet === stream.sender;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-flow-400 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="stream-card flowing-border mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Droplets className="w-12 h-12 text-flow-400" />
              <div className="absolute inset-0 bg-flow-400/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Stream #{stream.id}</h1>
              <p className="text-gray-400">Real-time payment stream</p>
            </div>
          </div>
          <span className={`text-lg font-bold ${status.color} px-4 py-2 glass-card rounded-lg`}>
            {status.label}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Stream Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-flow transition-all duration-500 animate-flow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-flow-400" />
              <span className="text-sm text-gray-400">Sender</span>
            </div>
            <p className="font-mono text-lg">{abbreviateAddress(stream.sender)}</p>
            {isSender && (
              <span className="text-xs text-flow-400 font-semibold">You</span>
            )}
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-stream-400" />
              <span className="text-sm text-gray-400">Recipient</span>
            </div>
            <p className="font-mono text-lg">{abbreviateAddress(stream.recipient)}</p>
            {isRecipient && (
              <span className="text-xs text-stream-400 font-semibold">You</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stream-card">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-bitcoin-400" />
            <span className="text-sm text-gray-400">Total Locked</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatSTX(stream.balance)} STX</p>
        </div>

        <div className="stream-card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-flow-400" />
            <span className="text-sm text-gray-400">Per Block</span>
          </div>
          <p className="text-2xl font-bold text-gradient">{formatSTX(stream.paymentPerBlock)} STX</p>
        </div>

        <div className="stream-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-stream-400" />
            <span className="text-sm text-gray-400">Time Remaining</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatTimeRemaining(blocksRemaining)}</p>
        </div>

        <div className="stream-card">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Withdrawn</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatSTX(stream.withdrawnBalance)} STX</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recipient Actions */}
        {isRecipient && (
          <div className="stream-card flowing-border">
            <h3 className="text-xl font-bold mb-4 text-gradient">Recipient Actions</h3>
            <div className="glass-card p-6 mb-4 bg-gradient-flow/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Available to Withdraw</span>
                <span className="text-3xl font-bold text-gradient">
                  {formatSTX(recipientBalance)} STX
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Accumulated from {currentBlock - stream.startBlock} blocks
              </p>
            </div>
            <button
              onClick={() => handleWithdraw(stream.id)}
              disabled={isLoading || recipientBalance === 0}
              className="w-full glass-button py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Withdraw Tokens
            </button>
          </div>
        )}

        {/* Sender Actions */}
        {isSender && (
          <div className="stream-card flowing-border">
            <h3 className="text-xl font-bold mb-4 text-gradient">Sender Actions</h3>
            
            {/* Refuel */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Refuel Stream</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.000001"
                  value={refuelAmount}
                  onChange={(e) => setRefuelAmount(e.target.value)}
                  placeholder="Amount in STX"
                  className="flex-1 glass-card px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-flow-500"
                />
                <button
                  onClick={() => {
                    const amount = parseFloat(refuelAmount) * 1_000_000;
                    handleRefuel(stream.id, amount);
                    setRefuelAmount("");
                  }}
                  disabled={isLoading || !refuelAmount}
                  className="glass-button px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Fuel className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Refund */}
            {status.status === "completed" && senderBalance > 0 && (
              <div className="glass-card p-4 mb-4 bg-green-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Excess Balance</span>
                  <span className="text-2xl font-bold text-green-400">
                    {formatSTX(senderBalance)} STX
                  </span>
                </div>
                <button
                  onClick={() => handleRefund(stream.id)}
                  disabled={isLoading}
                  className="w-full mt-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                >
                  Claim Refund
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
