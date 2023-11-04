import React from "react";
import bg from "/play_main.jpg";

const Banner = () => {
  return (
    <div
      className="hero h-[25rem]"
      style={{
        backgroundImage:
          "url(https://www.yamaha.com/en/musical_instrument_guide/common/images/acoustic_guitar/play_main.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Baaja Bazaar</h1>
          <p className="mb-5">
            All your musical needs and accessories in one place
          </p>
          <button className="btn btn-primary">Start Browsing</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
