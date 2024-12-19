import { NFT_IMAGES } from "@/constants/images";

export interface ShopItem {
  id: string;
  name: string;
  type: "manual" | "hydro" | "electric" | "boost";
  image: string;
  clicksPerSecond?: number;
  rentalPeriods: {
    days: number;
    price: number;
  }[];
  description: string;
  currency?: "GOLD" | "RGAS";
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "manual-miner",
    name: "Manual Miner",
    type: "manual",
    image: NFT_IMAGES.GOLD_ORE,
    clicksPerSecond: 3,
    rentalPeriods: [
      { days: 3, price: 30000 },
      { days: 7, price: 60000 },
      { days: 21, price: 150000 },
    ],
    description: "Basic mining machine with 3 clicks/s",
    currency: "GOLD"
  },
  {
    id: "hydro-miner",
    name: "Hydro Miner",
    type: "hydro",
    image: NFT_IMAGES.SILVER_ORE,
    clicksPerSecond: 5,
    rentalPeriods: [
      { days: 3, price: 50000 },
      { days: 7, price: 100000 },
      { days: 30, price: 250000 },
    ],
    description: "Advanced mining machine with 5 clicks/s",
    currency: "GOLD"
  },
  {
    id: "electric-miner",
    name: "Electric Miner",
    type: "electric",
    image: NFT_IMAGES.IRON_ORE,
    clicksPerSecond: 10,
    rentalPeriods: [
      { days: 3, price: 100000 },
      { days: 7, price: 200000 },
      { days: 30, price: 500000 },
    ],
    description: "Premium mining machine with 10 clicks/s",
    currency: "GOLD"
  },
  {
    id: "boost-card",
    name: "Boost Card",
    type: "boost",
    image: NFT_IMAGES.BOOST_CARD,
    rentalPeriods: [
      { days: 7, price: 100 },
      { days: 30, price: 300 }
    ],
    description: "Boost acceleration card, provides 2.5x speed boost",
    currency: "RGAS"
  }
];