"use client";

import {
  AppConfig,
  showConnect,
  openContractCall,
  type UserData,
  UserSession,
} from "@stacks/connect";
import { PostConditionMode, uintCV, principalCV, tupleCV, contractPrincipalCV } from "@stacks/transactions";
import { useEffect, useState } from "react";

const appDetails = {
  name: "sBTC Streamr",
  icon: "https://cryptologos.cc/logos/stacks-stx-logo.png",
};

const CONTRACT_ADDRESS = "ST1QXWAQZCKF0X9YJDEY3EWCA7ABHKFJ0AN9AGCTC";
const CONTRACT_NAME = "stream-v3";

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  function connectWallet() {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }

  function disconnectWallet() {
    userSession.signUserOut();
    setUserData(null);
  }

  async function handleCreateStream(
    recipient: string,
    initialBalance: number,
    startBlock: number,
    stopBlock: number,
    paymentPerBlock: number,
    tokenContractAddress?: string // Optional: for SIP-010 tokens
  ) {
    if (!userData) {
      window.alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      // Determine if this is a token stream or STX stream
      const isTokenStream = !!tokenContractAddress;
      
      if (isTokenStream) {
        // Parse token contract address (format: "address.contract-name")
        const [address, contractName] = tokenContractAddress.split('.');
        
        await openContractCall({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: "stream-token-to",
          functionArgs: [
            contractPrincipalCV(address, contractName),
            principalCV(recipient),
            uintCV(initialBalance),
            tupleCV({
              "start-block": uintCV(startBlock),
              "stop-block": uintCV(stopBlock),
            }),
            uintCV(paymentPerBlock),
          ],
          appDetails,
          onFinish: (data) => {
            console.log("Token stream created:", data);
            window.alert("Token stream created successfully! 🎉");
          },
          postConditionMode: PostConditionMode.Allow,
        });
      } else {
        // STX stream
        await openContractCall({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName: "stream-to",
          functionArgs: [
            principalCV(recipient),
            uintCV(initialBalance),
            tupleCV({
              "start-block": uintCV(startBlock),
              "stop-block": uintCV(stopBlock),
            }),
            uintCV(paymentPerBlock),
          ],
          appDetails,
          onFinish: (data) => {
            console.log("STX stream created:", data);
            window.alert("STX stream created successfully! 🎉");
          },
          postConditionMode: PostConditionMode.Allow,
        });
      }
    } catch (error) {
      console.error("Error creating stream:", error);
      window.alert("Failed to create stream. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleWithdraw(streamId: number) {
    if (!userData) {
      window.alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "withdraw",
        functionArgs: [uintCV(streamId)],
        appDetails,
        onFinish: (data) => {
          console.log("Withdrawal successful:", data);
          window.alert("Withdrawal successful! 💰");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error withdrawing:", error);
      window.alert("Failed to withdraw. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRefuel(streamId: number, amount: number) {
    if (!userData) {
      window.alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "refuel",
        functionArgs: [uintCV(streamId), uintCV(amount)],
        appDetails,
        onFinish: (data) => {
          console.log("Refuel successful:", data);
          window.alert("Stream refueled successfully! ⛽");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error refueling:", error);
      window.alert("Failed to refuel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRefund(streamId: number) {
    if (!userData) {
      window.alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "refund",
        functionArgs: [uintCV(streamId)],
        appDetails,
        onFinish: (data) => {
          console.log("Refund successful:", data);
          window.alert("Refund successful! 💸");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (error) {
      console.error("Error refunding:", error);
      window.alert("Failed to refund. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userData,
    isLoading,
    connectWallet,
    disconnectWallet,
    handleCreateStream,
    handleWithdraw,
    handleRefuel,
    handleRefund,
  };
}
