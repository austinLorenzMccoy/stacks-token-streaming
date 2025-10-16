"use client";

import { Stream } from "@/lib/stream-contract";
import { abbreviateAddress, formatSTX, calculateProgress, getStreamStatus, formatTimeRemaining } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Clock, TrendingUp, User } from "lucide-react";

interface StreamCardProps {
  stream: Stream;
  currentBlock: number;
}

export function StreamCard({ stream, currentBlock }: StreamCardProps) {
  const progress = calculateProgress(stream.startBlock, stream.stopBlock, currentBlock);
  const status = getStreamStatus(stream.startBlock, stream.stopBlock, currentBlock);
  const blocksRemaining = Math.max(0, stream.stopBlock - currentBlock);
  const availableBalance = Math.min(
    (currentBlock - stream.startBlock) * stream.paymentPerBlock,
    stream.balance
  ) - stream.withdrawnBalance;

  return (
    <Link href={`/stream/${stream.id}`} className="block">
      <div className="stream-card morph-border group">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-flow-teal mercury-drip" />
            <span className="text-sm font-medium text-liquid-chrome">Stream #{stream.id}</span>
          </div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-xl border ${
            status.status === 'active' ? 'text-flow-teal border-flow-teal/50 bg-flow-teal/10 teal-glow' :
            status.status === 'pending' ? 'text-flow-sky border-flow-sky/50 bg-flow-sky/10' :
            'text-mercury-400 border-mercury-600/50 bg-mercury-600/10'
          }`}>
            {status.label}
          </span>
        </div>

        {/* Participants */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-flow-teal" />
            <span className="text-liquid-chrome">From:</span>
            <span className="font-mono text-mercury-50">{abbreviateAddress(stream.sender)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-flow-indigo" />
            <span className="text-liquid-chrome">To:</span>
            <span className="font-mono text-mercury-50">{abbreviateAddress(stream.recipient)}</span>
          </div>
        </div>

        {/* Balance Info */}
        <div className="mercury-card p-4 mb-4 border border-liquid-chrome/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-liquid-chrome">Total Locked</span>
            <span className="text-lg font-bold text-mercury-50 mercury-glow">
              {formatSTX(stream.balance)} STX
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-liquid-chrome">Available Now</span>
            <span className="text-lg font-bold liquid-text">
              {formatSTX(Math.max(0, availableBalance))} STX
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-liquid-chrome mb-2">
            <span>Progress</span>
            <span className="teal-glow">{progress}%</span>
          </div>
          <div className="h-2 bg-mercury-800 rounded-full overflow-hidden border border-liquid-chrome/30 relative">
            <div
              className="h-full bg-liquid-gradient transition-all duration-500"
              style={{ width: `${progress}%`, backgroundSize: '200% 100%', animation: 'chrome-reflect 4s linear infinite' }}
            />
          </div>
        </div>

        {/* Stream Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-flow-teal mercury-drip" />
            <div>
              <div className="text-liquid-chrome">Per Block</div>
              <div className="font-semibold text-mercury-50">{formatSTX(stream.paymentPerBlock)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-flow-violet" />
            <div>
              <div className="text-liquid-chrome">Remaining</div>
              <div className="font-semibold text-mercury-50">{formatTimeRemaining(blocksRemaining)}</div>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-flow-teal/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
      </div>
    </Link>
  );
}
