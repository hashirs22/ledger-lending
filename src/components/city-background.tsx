"use client";

import dynamic from "next/dynamic";

const CityScene = dynamic(() => import("./city-scene"), { ssr: false });

export function CityBackground() {
  return <CityScene />;
}
