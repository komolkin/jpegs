import React from "react";

const NFT = ({ nft }) => {
  return (
    <div className="nft">
      <a
        href={
          "https://beta.rarible.com/token/" + nft.id.replace("ETHEREUM:", "")
        }
      >
        <img
          src={nft.meta.content[0].url}
          alt={nft.meta.name}
          className="nft-image"
          // onError={(i) => (i.target.style.display = "none")}
        />
        {/* <div className="nft-title">{nft.meta.name}</div>
        <div className="nft-creator">
          by{" "}
          <a
            href={
              "https://beta.rarible.com/user/" +
              nft.creators[0].account.replace("ETHEREUM:", "")
            }
            className="nft-address"
          >
            {nft.creators[0].account.replace("ETHEREUM:", "").substr(0, 4) +
              "..." +
              nft.creators[0].account.replace("ETHEREUM:", "").substr(-4)}
          </a>
        </div> */}
      </a>
    </div>
  );
};

export default NFT;
