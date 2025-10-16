"use client";

import { TokenType, SUPPORTED_TOKENS, getTokenInfo } from "@/lib/tokens";
import { Coins } from "lucide-react";

interface TokenSelectorProps {
  selectedToken: TokenType;
  onTokenChange: (token: TokenType) => void;
  customTokenAddress?: string;
  onCustomTokenAddressChange?: (address: string) => void;
}

export function TokenSelector({
  selectedToken,
  onTokenChange,
  customTokenAddress,
  onCustomTokenAddressChange,
}: TokenSelectorProps) {
  const tokens: TokenType[] = ['STX', 'sBTC', 'CUSTOM'];

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm font-semibold text-mercury-300 mb-2">
        <Coins className="w-4 h-4 text-flow-teal" />
        Select Token
      </label>

      {/* Token Selection Grid */}
      <div className="grid grid-cols-3 gap-3">
        {tokens.map((tokenType) => {
          const token = getTokenInfo(tokenType);
          const isSelected = selectedToken === tokenType;

          return (
            <button
              key={tokenType}
              type="button"
              onClick={() => onTokenChange(tokenType)}
              className={`mercury-card p-4 transition-all duration-300 ripple-effect ${
                isSelected
                  ? 'border-2 border-flow-teal shadow-liquid morph-border'
                  : 'border border-liquid-chrome/30 hover:border-flow-teal/50'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${isSelected ? 'mercury-drip' : ''}`}>
                  {token.icon}
                </div>
                <div className={`font-bold ${isSelected ? 'liquid-text' : 'text-mercury-300'}`}>
                  {token.symbol}
                </div>
                <div className="text-xs text-liquid-chrome mt-1">
                  {token.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Token Address Input */}
      {selectedToken === 'CUSTOM' && (
        <div className="mercury-card p-4 space-y-3 animate-morph">
          <label className="text-sm font-semibold text-mercury-300">
            Custom Token Contract
          </label>
          <input
            type="text"
            value={customTokenAddress || ''}
            onChange={(e) => onCustomTokenAddressChange?.(e.target.value)}
            placeholder="SP2ABC123...XYZ.token-name"
            className="w-full mercury-card px-4 py-3 rounded-xl text-mercury-50 placeholder-liquid-chrome/50 focus:outline-none focus:ring-2 focus:ring-flow-teal border border-liquid-chrome/30"
          />
          <p className="text-xs text-liquid-chrome">
            Enter the full contract principal (address.contract-name)
          </p>
        </div>
      )}

      {/* Token Info Display */}
      <div className="mercury-card p-4 border border-liquid-chrome/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-liquid-chrome">Decimals:</span>
          <span className="font-semibold text-mercury-50">
            {getTokenInfo(selectedToken).decimals}
          </span>
        </div>
        {selectedToken === 'sBTC' && (
          <div className="mt-2 text-xs text-flow-indigo indigo-glow">
            sBTC is Bitcoin on Stacks - 1:1 pegged to BTC
          </div>
        )}
      </div>
    </div>
  );
}
