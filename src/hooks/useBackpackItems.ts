import { useQuery } from "@tanstack/react-query";
import { RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { NFT_IMAGES } from "@/constants/images";

const client = new RoochClient({ url: "https://test-seed.rooch.network/" });

export interface BackpackItemType {
  id: string;
  type: string;
  name: string;
  image: string;
  quantity: number;
  isCard?: boolean;
  cardType?: "boost" | "og" | "early";
  isEquipped?: boolean;
}
/*
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::daily_check_in
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::tasks
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::boost_nft
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::gold_ore
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::gold
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::iron_ore
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::auto_miner
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::merkle_proof
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::hamburger
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::admin
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::gold_miner
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::copper_ore
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::silver_ore
0x76dae881c28a36fa64f313bdda2a3a6613d14931b472f63089f2cd5f2fe41103::refining_potion
*/

export const ITEM_TYPES = {
  IRON_ORE: `${PKG}::iron_ore::IronOre`,
  SILVER_ORE: `${PKG}::silver_ore::SilverOre`,
  COPPER_ORE: `${PKG}::copper_ore::CopperOre`,
  HAMBURGER: `${PKG}::hamburger::Hambuger`,
  GOLD_ORE: `${PKG}::gold_ore::GoldOre`,
  REFINING_POTION: `${PKG}::refining_potion::RefiningPotion`,
  BOOST_CARD: `${PKG}::boost_nft::BoostNFT`,
  OG_CARD: `${PKG}::boost_nft::BoostNFT`,
  EARLY_CARD: `${PKG}::boost_nft::BoostNFT`,
} as const;

const ITEM_IMAGES = {
  IRON_ORE: NFT_IMAGES.IRON_ORE,
  SILVER_ORE: NFT_IMAGES.SILVER_ORE,
  COPPER_ORE: NFT_IMAGES.COPPER_ORE,
  HAMBURGER: NFT_IMAGES.HAMBURGER,
  GOLD_ORE: NFT_IMAGES.GOLD_ORE,
  REFINING_POTION: NFT_IMAGES.REFINING_POTION,
  BOOST_CARD: NFT_IMAGES.BOOST_CARD,
  OG_CARD: NFT_IMAGES.OG_CARD,
  EARLY_CARD: NFT_IMAGES.EARLY_CARD,
} as const;

const DEFAULT_ITEMS: BackpackItemType[] = [
  ...Object.entries(ITEM_TYPES)
    .filter(([key]) => !key.includes("CARD"))
    .map(([key, type]) => ({
      id: type,
      type: type,
      name: key
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
      image: ITEM_IMAGES[key as keyof typeof ITEM_IMAGES],
      quantity: 0,
    })),
  // Add card items
  {
    id: ITEM_TYPES.BOOST_CARD,
    type: ITEM_TYPES.BOOST_CARD,
    name: "Boost Card",
    image: ITEM_IMAGES.BOOST_CARD,
    quantity: 0,
    isCard: true,
    cardType: "boost",
    isEquipped: false,
  },
  {
    id: ITEM_TYPES.OG_CARD,
    type: ITEM_TYPES.OG_CARD,
    name: "OG Card",
    image: ITEM_IMAGES.OG_CARD,
    quantity: 0,
    isCard: true,
    cardType: "og",
    isEquipped: false,
  },
  {
    id: ITEM_TYPES.EARLY_CARD,
    type: ITEM_TYPES.EARLY_CARD,
    name: "Early Card",
    image: ITEM_IMAGES.EARLY_CARD,
    quantity: 0,
    isCard: true,
    cardType: "early",
    isEquipped: false,
  },
];

export const useBackpackItems = () => {
  const address = useCurrentAddress();

  return useQuery({
    queryKey: ["backpackItems", address],
    queryFn: async () => {
      if (!address) return DEFAULT_ITEMS;

      const roochAddress = address.toStr();
      const items = await Promise.all(
        DEFAULT_ITEMS.map(async (item) => {
          const objects = await client.queryObjectStates({
            filter: {
              object_type_with_owner: {
                object_type: `${item.type}`,
                owner: roochAddress,
              },
            },
          });

          return {
            ...item,
            quantity: objects.data.length,
          };
        })
      );

      return items;
    },
    enabled: !!address,
    initialData: DEFAULT_ITEMS,
  });
};
