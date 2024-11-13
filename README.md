# Hotel Management API

## Overview
The **Hotel Management API** is a RESTful service built using Node.js and Express.js with TypeScript for strong type checking and scalability. It provides an API to manage hotel and room data, including Create,Read,Update operations, image uploads, and data validation.

## Features
- **CRUD Operations**: Create, read, update, and delete hotel and room data.
- **Room Management**: Manage room information for each hotel.
- **Image Uploads**: Upload and associate images with hotels and rooms using `multer`.
- **Slug Generation**: Automatically generate slugs for hotel title.
- **Validation and Error Handling**: Comprehensive validation and error handling for data integrity.
- **Unit Tests**: Coverage of all key API functionalities using `Jest` and `Supertest`.


## How to Set Up Node.js, Express.js, and TypeScript

This guide will help you set up a Node.js project with Express.js and TypeScript from scratch. Follow these steps to create your environment and start building your application.

### Prerequisites

Ensure that the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (Version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Step 1: Create a New Project Directory

```bash
mkdir hotel-api-ts
cd hotel-api-ts
```
### Step 2: Initialize the Node.js Project
```bash
npm init -y
```
This command will create a `package.json` file with default settings.
### Step 3: Install Express.js
```bash
npm install express
```
### Step 4: Install TypeScript and Related Dependencies
```bash
npm install typescript ts-node @types/node @types/express --save-dev
```
### Step 5: Create a tsconfig.json File
```bash
npx tsc --init
```
This file configures TypeScript options. Ensure the following basic settings are present:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"]
}
```
### Step 6: Set Up the Project Structure
Create the following folder structure:
```css
hotel-api-ts/
│
├── src/
│   ├── controllers/
│   │   └── hotelController.ts
│   ├── data/
│   │   └── images
|   |   └── hotel_id.json
│   ├── middlewares/
│   │   └── upload.ts
│   ├── routes/
│   │   └── hotelRoutes.ts
│   ├── index.ts
|   ├── db.ts
│───tests/
│   │└── hotelController.test.ts
|   |└── testImage.jpg
└──jest.config.ts   
└──tsconfig.json
└── package.json
```
### Step 7: Create an Entry Point (`src/index.ts`)
Create a basic Express server in `src/index.ts`:
```typescript
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import hotelRoutes from "./routes/hotelRoutes";
import path from "path";

const app = express();
app.use(bodyParser.json());

app.use("/", hotelRoutes);
app.use("/images", express.static(path.join(__dirname, "../data/images")));

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
### Step 8: Create a Script to Run the Project
Add the following scripts to `package.json`:
```json
"scripts": {
    "start": "ts-node-dev src/index.ts",
    "build": "tsc",
    "test": "jest"
}
```
- `start`: Runs the development server using ts-node.
- `build`: Compiles TypeScript to JavaScript.
- `start:prod`: Runs the compiled JavaScript.
 
### Step 9: Run the Project
1. To start the development server, run:
```bash
npm run start
```
2. To build and run the production server:
```bash
npm run build
npm run start:prod
```
3. To test the api:
```bash
npm run test
```
### Step 10: Install Additional Middleware (Optional)
To enhance your project, you may want to install middleware like multer:
```bash
npm install multer
npm install @types/multer --save-dev
```

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/pritom006/node-express-typescript-ass3.git
```
### 2. Navigate to the Project Directory
```bash
cd hotel-api-ts
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Create a .env File
```bash
PORT=8000
```
### 5. Build the Project
If you're using TypeScript and need to compile the code:
```bash
npm run build
```
### 6. Start the Server
```bash
npm run start
```
The server will run at `http://localhost:8080`.
## API Endpoints

### POST /hotel
**Create a new hotel**

#### cURL Command:
```bash
curl -X POST http://localhost:8080/hotel \
-H "Content-Type: application/json" \
-d '{
  "title": "Oceanfront Paradise Retreat",
  "description": "An exclusive hideaway on the coast, featuring panoramic ocean views and luxury amenities for a perfect getaway.",
  "guest_count": "8",
  "bedroom_count": "4",
  "bathroom_count": "3",
  "amenities": [
    "High-Speed Internet",
    "Infinity Pool",
    "Beach Access",
    "Outdoor Fireplace",
    "Private Chef"
  ],
  "host_information": {
    "name": "Sophia Williams",
    "contact": "4455667788"
  },
  "address": "456 Ocean Breeze Ave",
  "latitude": "36.7783",
  "longitude": "-119.4179",
  "rooms": [
    {
      "room_title": "Seaside Master Suite",
      "room_image": "/images/indoor.jpeg",
      "bedroom_count": "1"
    },
    {
      "room_title": "Ocean View Guest Room",
      "room_image": "/images/outdor.jpg",
      "bedroom_count": "1"
    },
    {
      "room_title": "Luxury Family Suite",
      "room_image": "/images/family.jpg",
      "bedroom_count": "2"
    },
    {
      "room_title": "Garden View Studio",
      "room_image": "/images/ocean-view-room.jpg",
      "bedroom_count": "1"
    }
  ]
}'
```
The hotel should be uploaded inside **/src/data/** with name ***{hotel-id}.json***
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel`.
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **raw** and set the type to **JSON**.
   - Paste the following JSON data:
   ```json
   {
       "title": "Oceanfront Paradise Retreat",
       "description": "An exclusive hideway on the coast, featuring panoramic ocean views and luxury amenities for a perfect getway.",
       "guest_count": "8",
       "bedroom_count": "4",
       "bathroom_count": "3",
       "amenities": ["High-Speed Internet", "Infinity Pool", "Beach Access", "Outdoor Fireplace", "Private Chef"],
       "host_information": {
           "name": "Sophia Williams",
           "contact": "4455667788"
       },
       "address": "456 Ocean Breeze Ave",
       "latitude": "36.7783",
       "longitude": "-119.4179",
       "rooms": [
           {
               "room_title": "Seaside Master Suite",
               "room_image": "/images/indoor.jpeg",
               "bedroomCount": 1
           },
           {
               "room_title": "Ocean View Guest Room",
               "room_image": "/images/outdor.jpg",
               "bedroomCount": 1
           },
           {
               "room_title": "Luxury Family Suite",
               "room_image": "/images/family.jpg",
               "bedroomCount": 1
           },
           {
               "room_title": "Garden View Studio",
               "room_image": "/images/ocean-view-room.jpg",
               "bedroomCount": 1
           }
       ]
   }
   ```
6. **Send** the Request and view the response.
The hotel should be uploaded inside **/src/data/** with name ***{hotel-id}.json***

### GET /hotel/{hotel-id}
**Retrieve a hotel by ID**

#### cURL Command:
```bash
curl http://localhost:8080/hotel/{hotelId}
```
Replace {hotelId} with the actual hotel ID. Example: `curl http://localhost:8080/hotel/h0f7`
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:8080/hotel/h0f7`).
4. **Send** the Request and view the response.
The hotel details should appear as a json file.


### PUT /hotel/{hotel-id}
**Update an existing hotel**

#### cURL Command:
```bash
curl -X PUT http://localhost:8080/hotel/{hotel-id} \
-H "Content-Type: application/json" \
-d '{
    "title": "Oceanfront Paradise Retreat Updated",
    "description": "Updated An exclusive hideway on the coast, featuring panoramic ocean views and luxury amenities for a perfect getway."
}'
```
The hotel with the specific id should be updated. Check if **src/data/{hotel-id}.json** file is updated.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select PUT** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel/{hotel-id}`. (Replace `{hotel-id}` with the actual hotel ID. Example: `http://localhost:8080/hotel/hof7`).
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Select Body**:
   - Choose `raw` and set `type` to `JSON`.
   - Paste the JSON data for updating the hotel:
   ```json
    {
       "title": "Oceanfront Paradise Retreat Updated",
       "description": "Updated An exclusive hideway on the coast, featuring panoramic ocean views and luxury amenities for a perfect getway.",
       "guest_count": "8",
       "bedroom_count": "4",
       "bathroom_count": "3",
       "amenities": ["High-Speed Internet", "Infinity Pool", "Beach Access", "Outdoor Fireplace", "Private Chef"],
       "host_information": {
           "name": "Sophia Williams",
           "contact": "4455667788"
       },
       "address": "456 Ocean Breeze Ave",
       "latitude": "36.7783",
       "longitude": "-119.4179",
       "rooms": [
           {
               "room_title": "Seaside Master Suite",
               "room_image": "/images/indoor.jpeg",
               "bedroomCount": 1
           },
           {
               "room_title": "Ocean View Guest Room",
               "room_image": "/images/outdor.jpg",
               "bedroomCount": 1
           },
           {
               "room_title": "Luxury Family Suite",
               "room_image": "/images/family.jpg",
               "bedroomCount": 1
           },
           {
               "room_title": "Garden View Studio",
               "room_image": "/images/ocean-view-room.jpg",
               "bedroomCount": 1
           }
       ]
   }
   ```
6. **Send** the Request and view the response.
The hotel with the specific id should be updated. Check if **src/data/{hotel-id}.json** file is updated.

### POST /hotel/images
**Upload images for a hotel**

#### cURL Command:
***Using Postman recommended for better experience***
```bash
curl -X POST http://localhost:8080/hotel/images \
-F "images=@path/to/your/image1.jpg" \
-F "images=@path/to/your/image2.jpg"
```
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images/image. Check if **src/data/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **src/data/images/**.
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel/images`. 
4. **Set Body**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **form-data**.
   - Add a `key`: hotel_id and `value`:{hotel_id}
   - Add a `key`: `images` for each image you want to upload, set the `type` to `File`, and choose the files from `Select files`.
6. **Send** the Request and view the response.
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images. Check if **src/data/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **src/data/images/**.

### Feel free to visit the 1st version (using node/ express) fo this project
**Link** `https://github.com/pritom006/node-express-assignment3`
