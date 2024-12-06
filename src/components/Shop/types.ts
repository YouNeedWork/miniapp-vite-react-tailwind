import { NFT_IMAGES } from "@/constants/images";

export interface ShopItem {
  id: string;
  name: string;
  type: "manual" | "hydro" | "electric";
  image: string;
  clicksPerSecond: number;
  rentalPeriods: {
    days: number;
    price: number;
  }[];
  description: string;
}

// manual_miner_cost: 30_000, //3w
// hydro_miner_cost: 50_000, //5w
// electric_miner_cost: 100_000, //10w

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
  },
];
