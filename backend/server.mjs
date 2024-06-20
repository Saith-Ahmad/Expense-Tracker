import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import { router } from "./routes/userRoute.mjs";
import connectDB from "./config/connectionDB.mjs";
import { Transactionroute } from "./routes/transactionRoute.mjs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1", router);
app.use("/api/v1/transactions", Transactionroute);

// // Serve static files from the 'frontend/dist' directory
// const frontendDistPath = path.join(path.dirname(new URL(import.meta.url).pathname), "/frontend/dist");
// app.use(express.static(frontendDistPath));

// // Serve 'index.html' for any other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(frontendDistPath, 'index.html'));
// });

// Port
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(`${PORT}` || PORT);
});
