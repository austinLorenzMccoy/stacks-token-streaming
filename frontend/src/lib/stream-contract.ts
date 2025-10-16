import { STACKS_TESTNET } from "@stacks/network";
import {
  fetchCallReadOnlyFunction,
  uintCV,
  principalCV,
  cvToValue,
} from "@stacks/transactions";

const CONTRACT_ADDRESS = "ST1QXWAQZCKF0X9YJDEY3EWCA7ABHKFJ0AN9AGCTC";
const CONTRACT_NAME = "stream-v2";

// Network configuration - using testnet API
const NETWORK = STACKS_TESTNET;

export interface Stream {
  id: number;
  sender: string;
  recipient: string;
  balance: number;
  withdrawnBalance: number;
  paymentPerBlock: number;
  startBlock: number;
  stopBlock: number;
}

export async function getStream(streamId: number): Promise<Stream | null> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-stream",
      functionArgs: [uintCV(streamId)],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });

    if (result.type === "none") {
      return null;
    }

    const streamData = cvToValue(result);
    
    return {
      id: streamId,
      sender: streamData.value.sender,
      recipient: streamData.value.recipient,
      balance: parseInt(streamData.value.balance),
      withdrawnBalance: parseInt(streamData.value["withdrawn-balance"]),
      paymentPerBlock: parseInt(streamData.value["payment-per-block"]),
      startBlock: parseInt(streamData.value.timeframe["start-block"]),
      stopBlock: parseInt(streamData.value.timeframe["stop-block"]),
    };
  } catch (error) {
    console.error("Error fetching stream:", error);
    return null;
  }
}

export async function getBalanceOf(streamId: number, address: string): Promise<number> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "balance-of",
      functionArgs: [uintCV(streamId), principalCV(address)],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });

    return parseInt(cvToValue(result));
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 0;
  }
}

export async function getLatestStreamId(): Promise<number> {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-latest-stream-id",
      functionArgs: [],
      senderAddress: CONTRACT_ADDRESS,
      network: NETWORK,
    });

    return parseInt(cvToValue(result));
  } catch (error) {
    // Contract not deployed yet - return 0 to show empty state
    console.warn("Contract not deployed yet. Please deploy the contract first.");
    return 0;
  }
}

export async function getAllStreams(): Promise<Stream[]> {
  try {
    const latestId = await getLatestStreamId();
    const streams: Stream[] = [];

    for (let i = 0; i < latestId; i++) {
      const stream = await getStream(i);
      if (stream) {
        streams.push(stream);
      }
    }

    return streams;
  } catch (error) {
    console.error("Error fetching all streams:", error);
    return [];
  }
}

export async function getCurrentBlockHeight(): Promise<number> {
  try {
    const response = await fetch("https://api.testnet.hiro.so/v2/info");
    const data = await response.json();
    return data.stacks_tip_height;
  } catch (error) {
    console.error("Error fetching block height:", error);
    return 0;
  }
}
