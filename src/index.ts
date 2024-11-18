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
app.use("/images", express.static(path.join(__dirname, "../data/images")));
console.log("Serving images from:", path.join(__dirname, "../data/images"));
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
