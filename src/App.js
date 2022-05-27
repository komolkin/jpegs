import "./App.css";

import Container from "./Container";

import "@rainbow-me/rainbowkit/styles.css";

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";
import { Connect } from "./Connect";
import { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const [nfts, setNfts] = useState([]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  };

  const getNftData = async () => {
    if (!walletAddress) return;
    const response = await fetch(
      `https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:${walletAddress}`
    );
    const data = await response.json();

    setNfts(data.items);
  };

  useEffect(() => {
    getNftData();
    connectWallet();
  });

  const initialText = "JPEGS.COOL";
  const [buttonText, setButtonText] = useState(initialText);

  function handleClick() {
    // connectWallet();
    setButtonText("Loading...");

    setTimeout(() => {
      setButtonText(
        walletAddress.replace("ETHEREUM:", "").substr(0, 4) +
          "..." +
          walletAddress.replace("ETHEREUM:", "").substr(-4)
      );
    }, 1000); // 👈️ change text back after 1 second
  }

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
        })}
        chains={chains}
      >
        <div className="header">
          <button onClick={handleClick}>{buttonText}</button>
          <Connect />
        </div>
        {/* <>Owns a total of 91 NFTs</> */}
        <Container nfts={nfts} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
