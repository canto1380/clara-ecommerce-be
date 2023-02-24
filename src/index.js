import express from "express";
import dotenv from "dotenv";
import "./database.js";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import seedersUp from "./utils/seeders.js";

import signinRoutes from "./routes/signin.js";
import userRoutes from "./routes/users.routes.js";
import addressRoutes from "./routes/address.routes.js";
import countryRoutes from "./routes/country.routes.js";
import provinceRoutes from "./routes/province.routes.js";
import locationRoutes from "./routes/location.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import footwearRoutes from "./routes/footwear.routes.js";
import footwearTypeRoutes from "./routes/footwearType.routes.js";
import discountRoutes from "./routes/discount.routes.js";
import dataSheetRoutes from "./routes/dataSheet.routes.js";
import colorRoutes from "./routes/color.routes.js";

const app = express();
dotenv.config({ path: ".env" });

app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log(`Conectado desde el puerto ${app.get("port")}`);
});

app.use("/signin", signinRoutes);
app.use("/users", userRoutes);
app.use("/address", addressRoutes);
app.use("/country", countryRoutes);
app.use("/province", provinceRoutes);
app.use("/location", locationRoutes);
app.use("/branch", branchRoutes);
app.use("/footwear", footwearRoutes);
app.use("/footwearType", footwearTypeRoutes);
app.use("/discount", discountRoutes);
app.use("/datasheet", dataSheetRoutes);
app.use("/color", colorRoutes);
