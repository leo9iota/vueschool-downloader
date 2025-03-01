// ./src/utils.ts
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Saves data to a JSON file, creating directories if they don't exist.
 * @param filename The path where the file should be saved
 * @param data The data to be saved as JSON
 * @returns Promise that resolves when data has been written to file
 */
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
