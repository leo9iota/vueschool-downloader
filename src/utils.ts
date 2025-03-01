import { promises as fs } from 'fs';
import path from 'path';

export async function saveToFile(filename: string, data: any): Promise<void> {
    const dir = path.dirname(filename);

    // Ensure the directory exists
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (error) {
        console.error(`❌ Failed to create directory: ${dir}`, error);
        return;
    }

    // Write data to file
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
        console.log(`✅ Data saved to ${filename}`);
    } catch (error) {
        console.error(`❌ Failed to write to file: ${filename}`, error);
    }
}
