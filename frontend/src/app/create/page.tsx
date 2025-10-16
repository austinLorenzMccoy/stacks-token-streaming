"use client";

import { useStacks } from "@/hooks/use-stacks";
import { parseSTX } from "@/lib/utils";
import { TokenType, parseTokenAmount, formatTokenAmount } from "@/lib/tokens";
import { useState } from "react";
import { Droplets, Calendar, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { TokenSelector } from "@/components/token-selector";

export default function CreateStream() {
  const { userData, connectWallet, handleCreateStream, isLoading } = useStacks();
  const router = useRouter();

  const [recipient, setRecipient] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [duration, setDuration] = useState("");
  const [paymentPerBlock, setPaymentPerBlock] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenType>('STX');
  const [customTokenAddress, setCustomTokenAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData) {
      connectWallet();
      return;
    }

    const initialBalance = parseSTX(parseFloat(totalAmount));
    const start = parseInt(startBlock);
    const stop = start + parseInt(duration);
    const payment = parseSTX(parseFloat(paymentPerBlock));

    await handleCreateStream(recipient, initialBalance, start, stop, payment);
    
    // Redirect to dashboard after creation
    setTimeout(() => router.push("/"), 2000);
  };

  const calculateTotalCost = () => {
    if (!duration || !paymentPerBlock) return "0";
    const blocks = parseInt(duration);
    const perBlock = parseFloat(paymentPerBlock);
    return (blocks * perBlock).toFixed(8);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <Droplets className="w-12 h-12 text-flow-teal mercury-drip" />
          <h1 className="text-4xl font-bold liquid-text">Create New Stream</h1>
        </div>
        <p className="text-mercury-300">
          Set up a continuous payment stream for STX, sBTC, or custom tokens
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="stream-card morph-border">
        <div className="space-y-6">
          {/* Token Selector */}
          <TokenSelector
            selectedToken={selectedToken}
            onTokenChange={setSelectedToken}
            customTokenAddress={customTokenAddress}
            onCustomTokenAddressChange={setCustomTokenAddress}
          />

          {/* Recipient */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
              <Wallet className="w-4 h-4 text-flow-teal" />
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
              className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-teal border border-liquid-chrome/30"
              required
            />
          </div>

          {/* Grid for Amount and Start Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
                <TrendingUp className="w-4 h-4 text-flow-teal" />
                Total Amount ({selectedToken})
              </label>
              <input
                type="number"
                step="0.00000001"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="100.00000000"
                className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-teal border border-liquid-chrome/30"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
                <Calendar className="w-4 h-4 text-flow-indigo" />
                Start Block
              </label>
              <input
                type="number"
                value={startBlock}
                onChange={(e) => setStartBlock(e.target.value)}
                placeholder="0 (immediate)"
                className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-indigo border border-liquid-chrome/30"
                required
              />
            </div>
          </div>

          {/* Grid for Duration and Payment Per Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
                <Calendar className="w-4 h-4 text-flow-violet" />
                Duration (Blocks)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="1000"
                className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-violet border border-liquid-chrome/30"
                required
              />
              <p className="text-xs text-liquid-chrome mt-1">
                ~{duration ? Math.floor(parseInt(duration) * 10 / 60) : 0} hours
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
                <TrendingUp className="w-4 h-4 text-flow-sky" />
                Payment Per Block ({selectedToken})
              </label>
              <input
                type="number"
                step="0.00000001"
                value={paymentPerBlock}
                onChange={(e) => setPaymentPerBlock(e.target.value)}
                placeholder="0.10000000"
                className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-sky border border-liquid-chrome/30"
                required
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mercury-card p-6 border border-flow-teal/30 morph-border">
            <h3 className="text-lg font-semibold mb-4 liquid-text">Stream Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-liquid-chrome">Total Cost:</span>
                <span className="font-bold text-mercury-50 teal-glow">{calculateTotalCost()} {selectedToken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-liquid-chrome">Duration:</span>
                <span className="font-bold text-mercury-50">{duration || 0} blocks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-liquid-chrome">Rate:</span>
                <span className="font-bold text-mercury-50">{paymentPerBlock || 0} {selectedToken}/block</span>
              </div>
              <div className="flex justify-between">
                <span className="text-liquid-chrome">Token Type:</span>
                <span className="font-bold liquid-text">{selectedToken}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {userData ? (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full liquid-button py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                "Creating Stream..."
              ) : (
                <>
                  Create Stream
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="w-full liquid-button py-4 text-lg flex items-center justify-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet to Continue
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
