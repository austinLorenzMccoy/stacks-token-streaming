"use client";

import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/utils";
import Link from "next/link";
import { Droplets, Wallet, LogOut, Plus } from "lucide-react";

export function Navbar() {
  const { userData, connectWallet, disconnectWallet } = useStacks();

  return (
    <nav className="mercury-card m-4 p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative mercury-drip">
            <Droplets className="w-8 h-8 text-flow-teal group-hover:text-flow-indigo transition-all duration-500" />
            <div className="absolute inset-0 bg-flow-teal/20 blur-xl group-hover:bg-flow-indigo/30 transition-all duration-500 blob-animate" />
          </div>
          <div>
            <h1 className="text-2xl font-bold liquid-text">sBTC Streamr</h1>
            <p className="text-xs text-liquid-chrome">Continuous Token Payments</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-mercury-300 hover:text-flow-teal hover:teal-glow transition-all duration-300 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/create"
            className="text-mercury-300 hover:text-flow-sky hover:indigo-glow transition-all duration-300 font-medium"
          >
            Create Stream
          </Link>
          <Link
            href="/my-streams"
            className="text-mercury-300 hover:text-flow-violet hover:mercury-glow transition-all duration-300 font-medium"
          >
            My Streams
          </Link>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center gap-3">
          {userData ? (
            <>
              <Link
                href="/create"
                className="liquid-button flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                New Stream
              </Link>
              <div className="flex items-center gap-2 mercury-card px-4 py-2">
                <Wallet className="w-4 h-4 text-flow-teal mercury-drip" />
                <span className="text-sm font-medium chrome-shine">
                  {abbreviateAddress(userData.profile.stxAddress.testnet)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2 rounded-xl bg-mercury-800/50 hover:bg-mercury-700/50 text-flow-teal border border-liquid-chrome/30 transition-all hover:shadow-liquid ripple-effect"
                title="Disconnect Wallet"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button onClick={connectWallet} className="liquid-button flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
