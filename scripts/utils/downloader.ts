import fs from 'fs';
import path from 'path';
import https from 'https';

export async function downloadFile(filepath: string, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    
    // Create directory if it doesn't exist
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

export async function downloadAssets(assets: Record<string, string>, type: string): Promise<void> {
  console.log(`\nDownloading ${type}...`);
  
  for (const [filepath, url] of Object.entries(assets)) {
    try {
      console.log(`Downloading ${url} to ${filepath}...`);
      await downloadFile(filepath, url);
      console.log(`✓ Successfully downloaded ${filepath}`);
    } catch (error) {
      console.error(`✗ Failed to download ${url}:`, error);
    }
  }
}