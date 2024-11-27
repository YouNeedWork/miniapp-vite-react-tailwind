import { NFT_IMAGES } from '@/constants/images';

export interface ShopItem {
  id: string;
  name: string;
  type: 'manual' | 'hydro' | 'electric';
  image: string;
  clicksPerSecond: number;
  rentalPeriods: {
    days: number;
    price: number;
  }[];
  description: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'manual-miner',
    name: 'Manual Miner',
    type: 'manual',
    image: NFT_IMAGES.GOLD_ORE,
    clicksPerSecond: 3,
    rentalPeriods: [
      { days: 3, price: 1000 },
      { days: 7, price: 2000 },
      { days: 30, price: 7500 },
    ],
    description: 'Basic mining machine with 3 clicks/s',
  },
  {
    id: 'hydro-miner',
    name: 'Hydro Miner',
    type: 'hydro',
    image: NFT_IMAGES.SILVER_ORE,
    clicksPerSecond: 10,
    rentalPeriods: [
      { days: 3, price: 2500 },
      { days: 7, price: 5000 },
      { days: 30, price: 18000 },
    ],
    description: 'Advanced mining machine with 10 clicks/s',
  },
  {
    id: 'electric-miner',
    name: 'Electric Miner',
    type: 'electric',
    image: NFT_IMAGES.IRON_ORE,
    clicksPerSecond: 30,
    rentalPeriods: [
      { days: 3, price: 6000 },
      { days: 7, price: 12000 },
      { days: 30, price: 40000 },
    ],
    description: 'Premium mining machine with 30 clicks/s',
  },
];