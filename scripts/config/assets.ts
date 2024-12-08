import { BASE_URL } from './constants';

export const ASSETS = {
  IMAGES: {
    // Core images
    'public/imgs/me.png': `${BASE_URL}/imgs/me.png`,
    'public/imgs/icon.png': `${BASE_URL}/imgs/icon.png`,
    'public/imgs/logo.png': `${BASE_URL}/imgs/logo.png`,
    'public/imgs/logo.svg': `${BASE_URL}/imgs/logo.svg`,
    'public/imgs/logo_black.svg': `${BASE_URL}/imgs/logo_black.svg`,
    'public/imgs/coin_logo.svg': `${BASE_URL}/imgs/coin_logo.svg`,
    'public/imgs/g_icon.png': `${BASE_URL}/imgs/g_icon.png`,

    // Game section images
    'public/imgs/mint.png': `${BASE_URL}/imgs/mint.png`,
    'public/imgs/earn.png': `${BASE_URL}/imgs/earn.png`,
    'public/imgs/friends.png': `${BASE_URL}/imgs/friends.png`,
    'public/imgs/earnBg.png': `${BASE_URL}/imgs/earnBg.png`,
    'public/imgs/earnHeader.png': `${BASE_URL}/imgs/earnHeader.png`,
    'public/imgs/earn_title.png': `${BASE_URL}/imgs/earn_title.png`,

    // Task images
    'public/imgs/task_1.png': `${BASE_URL}/imgs/task_1.png`,
    'public/imgs/task_2.png': `${BASE_URL}/imgs/task_2.png`,
    'public/imgs/task_3.png': `${BASE_URL}/imgs/task_3.png`,
    'public/imgs/task_4.png': `${BASE_URL}/imgs/task_4.png`,
    'public/imgs/task_5.png': `${BASE_URL}/imgs/task_5.png`,

    // NFT images
    'public/nft/gold.png': `${BASE_URL}/nft/gold.png`,
    'public/nft/og_card.png': `${BASE_URL}/nft/og_card.png`,
    'public/nft/hambuger.png': `${BASE_URL}/nft/hambuger.png`,
    'public/nft/boost_card.png': `${BASE_URL}/nft/boost_card.png`,
    'public/nft/early_card.png': `${BASE_URL}/nft/early_card.png`,
    'public/nft/gold_ore_1.png': `${BASE_URL}/nft/gold_ore_1.png`,
    'public/nft/iron_ore_1.png': `${BASE_URL}/nft/iron_ore_1.png`,
    'public/nft/copper_ore_1.png': `${BASE_URL}/nft/copper_ore_1.png`,
    'public/nft/silver_ore_1.png': `${BASE_URL}/nft/silver_ore_1.png`,
    'public/nft/refining_potion_1.png': `${BASE_URL}/nft/refining_potion_1.png`,

    // UI section images
    'public/imgs/mint/bg.png': `${BASE_URL}/imgs/mint/bg.png`,
    'public/imgs/mint/bag.png': `${BASE_URL}/imgs/mint/bag.png`,
    'public/imgs/mint/title_bg.png': `${BASE_URL}/imgs/mint/title_bg.png`,
    'public/imgs/mint/mint_icon.png': `${BASE_URL}/imgs/mint/mint_icon.png`,
    'public/imgs/mint/mint_icon_1.png': `${BASE_URL}/imgs/mint/mint_icon_1.png`,

    // Friend section images
    'public/imgs/friend/bg.png': `${BASE_URL}/imgs/friend/bg.png`,
    'public/imgs/friend/message_bg.png': `${BASE_URL}/imgs/friend/message_bg.png`,
    'public/imgs/friend/arrow-right.png': `${BASE_URL}/imgs/friend/arrow-right.png`,

    // Profile section images
    'public/imgs/me/lang.png': `${BASE_URL}/imgs/me/lang.png`,
    'public/imgs/me/avator.png': `${BASE_URL}/imgs/me/avator.png`,
    'public/imgs/me/account.png': `${BASE_URL}/imgs/me/account.png`,
    'public/imgs/me/my_orders.png': `${BASE_URL}/imgs/me/my_orders.png`,
    'public/imgs/me/arrow-right.png': `${BASE_URL}/imgs/me/arrow-right.png`,
    'public/imgs/me/wallet_icon.png': `${BASE_URL}/imgs/me/wallet_icon.png`,
  },
  
  AUDIO: {
    'public/audio/background.mp3': `${BASE_URL}/audio/background.mp3`,
    'public/audio/coin.mp3': `${BASE_URL}/audio/coin.mp3`,
    'public/audio/mining.wav': `${BASE_URL}/audio/mining.wav`
  }
} as const;