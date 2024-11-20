# Hotel Management API

## Overview
The **Hotel Management API** is a RESTful service built using Node.js and Express.js with TypeScript for strong typing and scalability. It provides an API to manage hotel and room data, including CRUD operations, image uploads, and data validation.

## Features
- **CRUD Operations**: Create, read, update hotel and room data.
- **Room Management**: Manage room information for each hotel.
- **Image Uploads**: Upload and associate images with hotels and rooms using `multer`.
- **Slug Generation**: Automatically generate slugs for hotel and room names.
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
    "target": "ES2019",                                  
    "lib": ["ES2020"],                                    
    "module": "commonjs",                                 
    "moduleResolution": "node",                          
    "resolveJsonModule": true,                           
    "esModuleInterop": true,                              
    "forceConsistentCasingInFileNames": true,            

  },
  "include": ["src/**/*"]
}
```
### Step 6: Set Up the Project Structure
Create the following folder structure:
```css
hotel-api-ts/
│
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── hotelRoutes.ts
│   ├── middlewares/
│   │   └── upload.ts
│   └── db.ts
│
└── package.json
```
### Step 7: Create an Entry Point (`src/index.ts`)
Create a basic Express server in `src/index.ts`:
```typescript
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import hotelRoutes from "./routes/hotelRoutes";
import path from "path";
// import cors from "cors";

const cors = require("cors");


const corsOptions = {
  origin: "http://localhost:3000", // restrict CORS to this origin
  optionsSuccessStatus: 200, // some legacy browsers require this
};



const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/", hotelRoutes);
app.use("/images", express.static(path.join(__dirname, "data/images")));
console.log("Serving images from:", path.join(__dirname, "data/images"));
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
},
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
### Step 10: Install Additional Middleware (Optional)
To enhance your project, you may want to install middleware like cors or helmet:
```bash
npm install cors helmet
npm install @types/cors @types/helmet --save-dev
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
NODE_ENV=development
PORT=8000
```
### 5. Build the Project
If you're using TypeScript and need to compile the code:
```bash
npm run build
```
### 6. Start the Server
```bash
npm start
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
    "title": "Seaside Retreat",
    "description": "A beautiful retreat by the sea.",
    "guestCount": 4,
    "bedroomCount": 2,
    "bathroomCount": 1,
    "amenities": ["WiFi", "Ocean View"],
    "hostInformation": {
        "name": "Jane Doe",
        "contact": "jane@example.com"
    },
    "address": "123 Ocean Drive, Seaside City",
    "latitude": 36.7783,
    "longitude": -119.4179,
    "rooms": [
        {
            "hotelSlug": "seaside-retreat",
            "roomSlug": "ocean-suite",
            "roomImage": "/images/ocean-suite.jpg",
            "roomTitle": "Ocean Suite",
            "bedroomCount": 1
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
       "title": "Seaside Retreat",
       "description": "A beautiful retreat by the sea.",
       "guestCount": 4,
       "bedroomCount": 2,
       "bathroomCount": 1,
       "amenities": ["WiFi", "Ocean View"],
       "hostInformation": {
           "name": "Jane Doe",
           "contact": "jane@example.com"
       },
       "address": "123 Ocean Drive, Seaside City",
       "latitude": 36.7783,
       "longitude": -119.4179,
       "rooms": [
           {
               "hotelSlug": "seaside-retreat",
               "roomSlug": "ocean-suite",
               "roomImage": "/data/images/ocean-suite.jpg",
               "roomTitle": "Ocean Suite",
               "bedroomCount": 1
           }
       ]
   }
   ```
6. **Send** the Request and view the response.
The hotel should be uploaded inside **/dist/data/hotels** with name ***{hotel-id}.json***

### GET /hotel
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
3. **Enter the URL**: `http://localhost:8080/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735`).
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### GET /hotels
**Retrieve all hotels**

#### cURL Command:
```bash
curl http://localhost:8080/hotel
```
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel`.
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### PUT /api/hotel
**Update an existing hotel**

#### cURL Command:
```bash
curl -X PUT http://localhost:8080/hotel/{hotelId} \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated Seaside Retreat",
    "description": "An updated description for the seaside retreat."
}'
```
The hotel with the specific id should be updated. Check if **src/data/hotel/{hotel-id}.json** file is updated.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select PUT** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/hotel/{hotelId}`. 
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Select Body**:
   - Choose `raw` and set `type` to `JSON`.
   - Paste the JSON data for updating the hotel:
   ```json
    {
        "title": "Updated Seaside Retreat",
        "description": "An updated description for the seaside retreat with a luxurious experience.",
        "guestCount": 5,
        "bedroomCount": 3,
        "bathroomCount": 2,
        "amenities": ["WiFi", "Ocean View", "Private Pool"],
        "hostInformation": {
            "name": "Jane Doe Updated",
            "contact": "jane.updated@example.com"
        },
        "address": "456 Ocean Drive, Seaside City Updated",
        "latitude": 36.7785,
        "longitude": -119.4175,
        "rooms": [
            {
                "hotelSlug": "updated-seaside-retreat",
                "roomSlug": "updated-ocean-suite",
                "roomImage": "/images/updated-ocean-suite.jpg",
                "roomTitle": "Updated Ocean Suite",
                "bedroomCount": 2
            }
        ]
    }
   ```
6. **Send** the Request and view the response.
The hotel with the specific id should be updated. Check if **src/data/hotels/{hotel-id}.json** file is updated.

### POST /images
**Upload images for a hotel**


The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of image/images. Check if **dist/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **dist/data/images/**.
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:8080/images`. 
4. **Set Body**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **form-data**.
   - Add a `key`: `images` for each image you want to upload, set the `type` to `File`, and choose the files from `Select files`.
6. **Send** the Request and view the response.
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images. Check if **src/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **src/data/images/**.
