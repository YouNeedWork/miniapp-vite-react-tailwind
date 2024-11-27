import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://app.goldminer.life';

const ASSETS = {
  IMAGES: {
    'public/imgs/me.png': `${BASE_URL}/imgs/me.png`,
    'public/nft/gold.png': `${BASE_URL}/nft/gold.png`,
    'public/imgs/earn.png': `${BASE_URL}/imgs/earn.png`,
    'public/imgs/icon.png': `${BASE_URL}/imgs/icon.png`,
    'public/imgs/logo.png': `${BASE_URL}/imgs/logo.png`,
    'public/imgs/logo.svg': `${BASE_URL}/imgs/logo.svg`,
    'public/imgs/mint.png': `${BASE_URL}/imgs/mint.png`,
    'public/imgs/earnBg.png': `${BASE_URL}/imgs/earnBg.png`,
    'public/imgs/g_icon.png': `${BASE_URL}/imgs/g_icon.png`,
    'public/imgs/task_1.png': `${BASE_URL}/imgs/task_1.png`,
    'public/imgs/task_2.png': `${BASE_URL}/imgs/task_2.png`,
    'public/imgs/task_3.png': `${BASE_URL}/imgs/task_3.png`,
    'public/imgs/task_4.png': `${BASE_URL}/imgs/task_4.png`,
    'public/imgs/task_5.png': `${BASE_URL}/imgs/task_5.png`,
    'public/imgs/friends.png': `${BASE_URL}/imgs/friends.png`,
    'public/imgs/me/lang.png': `${BASE_URL}/imgs/me/lang.png`,
    'public/imgs/mint/bg.png': `${BASE_URL}/imgs/mint/bg.png`,
    'public/nft/hambuger.png': `${BASE_URL}/nft/hambuger.png`,
    'public/imgs/mint/bad.png': `${BASE_URL}/imgs/mint/bad.png`,
    'public/imgs/coin_logo.svg': `${BASE_URL}/imgs/coin_logo.svg`,
    'public/imgs/friend/bg.png': `${BASE_URL}/imgs/friend/bg.png`,
    'public/imgs/me/avator.png': `${BASE_URL}/imgs/me/avator.png`,
    'public/nft/gold_ore_1.png': `${BASE_URL}/nft/gold_ore_1.png`,
    'public/nft/iron_ore_1.png': `${BASE_URL}/nft/iron_ore_1.png`,
    'public/imgs/earnHeader.png': `${BASE_URL}/imgs/earnHeader.png`,
    'public/imgs/earn_title.png': `${BASE_URL}/imgs/earn_title.png`,
    'public/imgs/logo_black.svg': `${BASE_URL}/imgs/logo_black.svg`,
    'public/imgs/me/account.png': `${BASE_URL}/imgs/me/account.png`,
    'public/nft/copper_ore_1.png': `${BASE_URL}/nft/copper_ore_1.png`,
    'public/nft/silver_ore_1.png': `${BASE_URL}/nft/silver_ore_1.png`,
    'public/imgs/me/my_orders.png': `${BASE_URL}/imgs/me/my_orders.png`,
    'public/imgs/mint/title_bg.png': `${BASE_URL}/imgs/mint/title_bg.png`,
    'public/imgs/me/arrow-right.png': `${BASE_URL}/imgs/me/arrow-right.png`,
    'public/imgs/me/wallet_icon.png': `${BASE_URL}/imgs/me/wallet_icon.png`,
    'public/imgs/mint/mint_icon.png': `${BASE_URL}/imgs/mint/mint_icon.png`,
    'public/imgs/mint/mint_icon_1.png': `${BASE_URL}/imgs/mint/mint_icon_1.png`,
    'public/nft/refining_potion_1.png': `${BASE_URL}/nft/refining_potion_1.png`,
    'public/imgs/friend/message_bg.png': `${BASE_URL}/imgs/friend/message_bg.png`,
    'public/imgs/friend/arrow-right.png': `${BASE_URL}/imgs/friend/arrow-right.png`
  },
  AUDIO: {
    'public/audio/background.mp3': `${BASE_URL}/audio/background.mp3`,
    'public/audio/coin.mp3': `${BASE_URL}/audio/coin.mp3`,
    'public/audio/mining.wav': `${BASE_URL}/audio/mining.wav`
  }
};

async function downloadFile(filepath, url) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function downloadAllAssets() {
  console.log('Starting assets download...');
  
  // Download images
  console.log('\nDownloading images...');
  for (const [filepath, url] of Object.entries(ASSETS.IMAGES)) {
    try {
      console.log(`Downloading ${url} to ${filepath}...`);
      await downloadFile(filepath, url);
      console.log(`✓ Successfully downloaded ${filepath}`);
    } catch (error) {
      console.error(`✗ Failed to download ${url}:`, error);
    }
  }
  
  // Download audio files
  console.log('\nDownloading audio files...');
  for (const [filepath, url] of Object.entries(ASSETS.AUDIO)) {
    try {
      console.log(`Downloading ${url} to ${filepath}...`);
      await downloadFile(filepath, url);
      console.log(`✓ Successfully downloaded ${filepath}`);
    } catch (error) {
      console.error(`✗ Failed to download ${url}:`, error);
    }
  }
  
  console.log('\nAsset download process completed');
}

downloadAllAssets().catch(console.error);