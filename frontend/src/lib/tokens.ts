// Token type definitions for multi-token streaming

export type TokenType = 'STX' | 'sBTC' | 'CUSTOM';

export interface Token {
  type: TokenType;
  symbol: string;
  name: string;
  decimals: number;
  contractAddress?: string;
  contractName?: string;
  icon: string;
  color: string;
}

// Supported tokens
export const SUPPORTED_TOKENS: Record<TokenType, Token> = {
  STX: {
    type: 'STX',
    symbol: 'STX',
    name: 'Stacks',
    decimals: 6,
    icon: '₿',
    color: 'flow-teal',
  },
  sBTC: {
    type: 'sBTC',
    symbol: 'sBTC',
    name: 'Stacks Bitcoin',
    decimals: 8,
    contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9', // Example - update with actual
    contractName: 'token-sbtc',
    icon: '₿',
    color: 'flow-indigo',
  },
  CUSTOM: {
    type: 'CUSTOM',
    symbol: 'TOKEN',
    name: 'Custom Token',
    decimals: 6,
    icon: '🪙',
    color: 'flow-violet',
  },
};

// Format token amount based on decimals
export function formatTokenAmount(amount: number, tokenType: TokenType): string {
  const token = SUPPORTED_TOKENS[tokenType];
  return (amount / Math.pow(10, token.decimals)).toFixed(token.decimals);
}

// Parse token amount to micro units
export function parseTokenAmount(amount: number, tokenType: TokenType): number {
  const token = SUPPORTED_TOKENS[tokenType];
  return Math.floor(amount * Math.pow(10, token.decimals));
}

// Get token display info
export function getTokenInfo(tokenType: TokenType): Token {
  return SUPPORTED_TOKENS[tokenType];
}

// Check if token is SIP-010 (not native STX)
export function isSIP010Token(tokenType: TokenType): boolean {
  return tokenType !== 'STX';
}
