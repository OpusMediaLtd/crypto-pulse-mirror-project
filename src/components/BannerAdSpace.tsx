
import React from 'react';

const BETPANDA_BANNER_IMAGE = "/lovable-uploads/6f6441e7-ae7a-4466-907f-7f6bace2ee41.png";
const BETPANDA_BANNER_LINK = "https://betpanda.io/";

interface BannerAdSpaceProps {
  message: string;
}

const BannerAdSpace = ({ message }: BannerAdSpaceProps) => (
  <div
    className="w-full max-w-[444px] h-[136px] mx-auto mb-8 rounded-lg overflow-hidden cursor-pointer flex justify-center items-center"
    style={{
      width: 444, 
      height: 136, 
      minHeight: 100,
      background: "#141e2a"
    }}
    onClick={() => window.open(BETPANDA_BANNER_LINK, '_blank', 'noopener,noreferrer')}
    aria-label="Betpanda 100% Casino Bonus"
  >
    <img
      src={BETPANDA_BANNER_IMAGE}
      alt="Betpanda 100% Casino Bonus up to 1 BTC - Regional Sponsor of the Argentina National Team"
      className="object-cover w-full h-full"
      style={{ width: "100%", height: "100%" }}
      draggable={false}
    />
  </div>
);

export default BannerAdSpace;
