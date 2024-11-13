import fs from "fs";
import path from "path";

const dataDir = path.join(__dirname, "../data");
const hotelsFilePath = path.join(dataDir, "hotels.json");

if (!fs.existsSync(hotelsFilePath)) {
  fs.writeFileSync(hotelsFilePath, "[]", "utf8");
}

export const readData = (): any[] => {
  try {
    const data = fs.readFileSync(hotelsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading hotels data:", error);
    return [];
  }
};

export const writeData = (data: any[]): boolean => {
  try {
    fs.writeFileSync(hotelsFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing hotels data:", error);
    return false;
  }
};
