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
