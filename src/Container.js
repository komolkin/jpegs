import React from "react";
import NFT from "./NFT";

const Container = ({ nfts }) => {
  return (
    <div className="container">
      {nfts.map((nft, index) => {
        return <NFT nft={nft} key={index} />;
      })}
    </div>
  );
};

export default Container;
