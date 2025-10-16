export function abbreviateAddress(address: string): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function formatSTX(amount: number): string {
  return (amount / 1_000_000).toFixed(6);
}

export function parseSTX(amount: number): number {
  return Math.floor(amount * 1_000_000);
}

export function formatTimeRemaining(blocks: number): string {
  // Assuming ~10 minutes per block
  const minutes = blocks * 10;
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else {
    return `${minutes}m`;
  }
}

export function calculateProgress(startBlock: number, stopBlock: number, currentBlock: number): number {
  if (currentBlock <= startBlock) return 0;
  if (currentBlock >= stopBlock) return 100;
  
  const totalBlocks = stopBlock - startBlock;
  const elapsedBlocks = currentBlock - startBlock;
  return Math.floor((elapsedBlocks / totalBlocks) * 100);
}

export function getStreamStatus(startBlock: number, stopBlock: number, currentBlock: number): {
  status: "pending" | "active" | "completed";
  label: string;
  color: string;
} {
  if (currentBlock < startBlock) {
    return {
      status: "pending",
      label: "Pending",
      color: "text-yellow-400",
    };
  } else if (currentBlock >= stopBlock) {
    return {
      status: "completed",
      label: "Completed",
      color: "text-gray-400",
    };
  } else {
    return {
      status: "active",
      label: "Active",
      color: "text-flow-400",
    };
  }
}
