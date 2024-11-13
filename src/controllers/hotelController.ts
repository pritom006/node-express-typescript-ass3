import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import slugify from "slugify";

const generateHotelId = (): string => "h" + uuidv4().slice(0, 3);

// Create hotel
export const createHotel = (req: Request, res: Response): void => {
    try {
      const { title, description, guest_count, bedroom_count, bathroom_count, amenities, host_information, address, latitude, longitude, rooms } = req.body;
  
      const hotelId = generateHotelId();
      const slug = slugify(title, { lower: true, strict: true });
      const images = req.files ? (req.files as Express.Multer.File[]).map(file => `/images/${file.filename}`) : [];
  
      const newHotel = {
        hotel_id: hotelId,
        slug,
        images,
        title,
        description,
        guest_count: parseInt(guest_count),
        bedroom_count: parseInt(bedroom_count),
        bathroom_count: parseInt(bathroom_count),
        amenities: Array.isArray(amenities) ? amenities : amenities.split(","),
        host_information: typeof host_information === "string" ? JSON.parse(host_information) : host_information,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        rooms: typeof rooms === "string"
          ? JSON.parse(rooms).map((room: any) => ({
              hotel_slug: slug,
              room_slug: slugify(room.room_title, { lower: true, strict: true }),
              room_image: room.room_image,
              room_title: room.room_title,
              bedroom_count: parseInt(room.bedroom_count)
            }))
          : rooms.map((room: any) => ({
              hotel_slug: slug,
              room_slug: slugify(room.room_title, { lower: true, strict: true }),
              room_image: room.room_image,
              room_title: room.room_title,
              bedroom_count: parseInt(room.bedroom_count)
            })),
      };
  
      // Ensure the data directory exists
      const dataDirectory = path.join(__dirname, "..", "data");
      const imagesDirectory = path.join(dataDirectory, "images");
      if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory);
      }
      if (!fs.existsSync(imagesDirectory)) {
        fs.mkdirSync(imagesDirectory);
      }
  
      // Write the hotel data to a JSON file in the data directory
      const filePath = path.join(dataDirectory, `${hotelId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(newHotel, null, 2));
  
      res.status(201).json({ message: "Hotel created successfully", hotel: newHotel });
    } catch (error: any) {
      res.status(500).json({ error: "Error creating hotel: " + error.message });
    }
  };
  

// Upload images and update hotel record

export const uploadImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotelId = req.body.hotel_id;
    
    console.log("Received hotel ID:", hotelId);

    if (!hotelId) {
      res.status(400).json({ error: "Hotel ID is required" });
      return;
    }

    // Use __dirname to ensure the correct absolute path is used
    const filePath = path.join(__dirname, "../data", `${hotelId}.json`);
    console.log("Constructed file path:", filePath);

    // Check if hotel JSON file exists
    if (!fs.existsSync(filePath)) {
      console.log("Hotel file not found at path:", filePath);
      res.status(404).json({ error: "Hotel not found" });
      return;
    }

    console.log("Uploaded files:", req.files);

    // Retrieve image URLs from uploaded files
    const imageUrls = req.files ? (req.files as Express.Multer.File[]).map(file => `/images/${file.filename}`) : [];
    
    if (imageUrls.length === 0) {
      console.log("No image files found in the request.");
      res.status(400).json({ error: "No images uploaded" });
      return;
    }

    // Load existing hotel data
    const hotelData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!hotelData.images) {
      hotelData.images = [];
    }

    console.log("Current images:", hotelData.images);

    hotelData.images.push(...imageUrls);

    fs.writeFileSync(filePath, JSON.stringify(hotelData, null, 2));

    res.status(200).json({ message: "Images uploaded successfully", images: imageUrls });
  } catch (error: any) {
    console.error("Error uploading images:", error.message);
    res.status(500).json({ error: "Error uploading images: " + error.message });
  }
};

// Get hotel by ID

export const getHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hotelId } = req.params;

    console.log("Received hotel ID:", hotelId);

    // Use __dirname to construct an absolute path to the JSON file
    const filePath = path.join(__dirname, "../data", `${hotelId}.json`);
    console.log("Constructed file path:", filePath);

    // Check if the JSON file for the hotel exists
    if (!fs.existsSync(filePath)) {
      console.log("Hotel file not found at path:", filePath); // Log if file doesn't exist
      res.status(404).json({ error: "Hotel not found" });
      return;
    }

    // Read and parse the hotel data from the JSON file
    const hotelData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.status(200).json(hotelData);
  } catch (error: any) {
    console.error("Error retrieving hotel:", error.message); // Log error details
    res.status(500).json({ error: "Error retrieving hotel: " + error.message });
  }
};


// Update hotel by ID

export const updateHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hotelId } = req.params;
    const updatedData = req.body;

    // Construct the absolute path to the hotel's JSON file
    const filePath = path.join(__dirname, "../data", `${hotelId}.json`);
    console.log("Constructed file path:", filePath);

    if (!fs.existsSync(filePath)) {
      console.log("Hotel file not found at path:", filePath);
      res.status(404).json({ error: "Hotel not found" });
      return;
    }

    const hotelData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Update hotel fields with new data, ensuring numeric fields are parsed correctly
    const updatedHotel = {
      ...hotelData,
      ...updatedData,
      guest_count: updatedData.guest_count ? parseInt(updatedData.guest_count) : hotelData.guest_count,
      bedroom_count: updatedData.bedroom_count ? parseInt(updatedData.bedroom_count) : hotelData.bedroom_count,
      bathroom_count: updatedData.bathroom_count ? parseInt(updatedData.bathroom_count) : hotelData.bathroom_count,
      latitude: updatedData.latitude ? parseFloat(updatedData.latitude) : hotelData.latitude,
      longitude: updatedData.longitude ? parseFloat(updatedData.longitude) : hotelData.longitude,
      amenities: Array.isArray(updatedData.amenities) ? updatedData.amenities : hotelData.amenities,
      host_information: typeof updatedData.host_information === "object" && !Array.isArray(updatedData.host_information) 
        ? updatedData.host_information 
        : hotelData.host_information,
      rooms: Array.isArray(updatedData.rooms) ? updatedData.rooms : hotelData.rooms
    };

    // Save updated data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(updatedHotel, null, 2));

    res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error: any) {
    console.error("Error updating hotel:", error.message); // Log error details
    res.status(500).json({ error: "Error updating hotel: " + error.message });
  }
};


export default {
  createHotel,
  uploadImages,
  getHotel,
  updateHotel
};
