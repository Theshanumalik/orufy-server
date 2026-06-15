import dotenv from "dotenv"
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import productRoutes from "./routes/product.routes.js"
import authRouter from "./routes/auth.js"
import uploadRouter from "./routes/upload.js"
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express();

import { handleApiError } from "./middlewares/error.js"

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/products", productRoutes)
app.use("/api/users", authRouter)
app.use("/api/upload", uploadRouter)

app.use(handleApiError);

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () =>
      console.log(`Server running on port https://localhost:${PORT}`)
    )
  })
  .catch((err) => console.error(err))
