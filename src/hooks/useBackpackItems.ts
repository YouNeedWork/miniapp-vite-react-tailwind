import { useQuery } from "@tanstack/react-query";
import { RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { PKG } from "@/constants/config";
import { NFT_IMAGES } from "@/constants/images";
import { useMinerInfo } from "./queries/useMinerInfo";

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
  objectId?: string;
}

export const ITEM_TYPES = {
  IRON_ORE: `${PKG}::iron_ore::IronOre`,
  SILVER_ORE: `${PKG}::silver_ore::SilverOre`,
  COPPER_ORE: `${PKG}::copper_ore::CopperOre`,
  HAMBURGER: `${PKG}::hamburger::Hamburger`,
  GOLD_ORE: `${PKG}::gold_ore::GoldOre`,
  REFINING_POTION: `${PKG}::refining_potion::RefiningPotion`,
  BOOST_CARD: `${PKG}::boost_nft::BoostNFT`,
  OG_CARD: `${PKG}::og_nft::OgNFT`,
  EARLY_CARD: `${PKG}::early_nft::EarlyNFT`,
} as const;

const DEFAULT_ITEMS: BackpackItemType[] = [
  ...Object.entries(ITEM_TYPES)
    .filter(([key]) => !key.includes("CARD"))
    .map(([key, type]) => ({
      id: key,
      type: type,
      name: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" "),
      image: NFT_IMAGES[key as keyof typeof NFT_IMAGES],
      quantity: 0,
    })),
  {
    id: "BOOST_CARD",
    type: ITEM_TYPES.BOOST_CARD,
    name: "Boost Card",
    image: NFT_IMAGES.BOOST_CARD,
    quantity: 0,
    isCard: true,
    cardType: "boost",
    isEquipped: false,
  },
  {
    id: "OG_CARD",
    type: ITEM_TYPES.OG_CARD,
    name: "OG Card",
    image: NFT_IMAGES.OG_CARD,
    quantity: 0,
    isCard: true,
    cardType: "og",
    isEquipped: false,
  },
  {
    id: "EARLY_CARD",
    type: ITEM_TYPES.EARLY_CARD,
    name: "Early Card",
    image: NFT_IMAGES.EARLY_CARD,
    quantity: 0,
    isCard: true,
    cardType: "early",
    isEquipped: false,
  }
];

export const useBackpackItems = () => {
  const address = useCurrentAddress();
  const { data: minerInfo } = useMinerInfo();

  return useQuery({
    queryKey: ["backpackItems", address?.toStr(), minerInfo?.boostInfo?.objectId],
    queryFn: async () => {
      if (!address) return DEFAULT_ITEMS;

      const roochAddress = address.toStr();
      const items = await Promise.all(
        DEFAULT_ITEMS.map(async (item) => {
          try {
            const objects = await client.queryObjectStates({
              filter: {
                object_type_with_owner: {
                  object_type: item.type,
                  owner: roochAddress,
                },
              },
            });

            // For cards, use miner info to determine if equipped
            if (item.isCard) {
              const isEquipped = minerInfo?.boostInfo?.type === item.cardType;
              return {
                ...item,
                quantity: objects.data.length,
                isEquipped,
                objectId: isEquipped ? minerInfo.boostInfo.objectId : undefined,
              };
            }

            return {
              ...item,
              quantity: objects.data.length,
            };
          } catch (error) {
            console.error(`Error fetching ${item.name}:`, error);
            return item;
          }
        })
      );

      return items;
    },
    enabled: !!address,
    initialData: DEFAULT_ITEMS,
    staleTime: 5000,
  });
};