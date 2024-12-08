import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ASSETS } from './config/assets';
import { downloadAssets } from './utils/downloader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function downloadAllAssets() {
  console.log('Starting assets download...');
  
  // Download images
  await downloadAssets(ASSETS.IMAGES, 'images');
  
  // Download audio files
  await downloadAssets(ASSETS.AUDIO, 'audio files');
  
  console.log('\nAsset download process completed');
}

downloadAllAssets().catch(console.error);