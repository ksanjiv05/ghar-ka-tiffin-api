import dotenv from "dotenv";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import "./db";
import router from "./routes/v1";
// import { fcm } from "./helper/fcm";
import  "./firebase";

dotenv.config();

globalThis.__dirname = __dirname;
const app: Express = express();
const port = 4001;
app.use(cors());
app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",router)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// fcm("cB5nUzbETf-WhjCLgtxkZh:APA91bEiMdoPB0lecF0cN5nTgc7rsz4RMZ5L5zO21ILMi-7kS1X1EcgQ84NpIBBi8Wgwc5scIVZkHbCLXR_mNWexYqghFL2Vg1uJK1d_1eFt9WWeeHgoYbPMh4dz9A4bjZItsJCUfxTI","hiii ","test22222222")
// fcm("fqGplQ2ITxy_zdPcFVt0Px:APA91bHXPY0r_XtbvT_nu8KCRo89XQFSHBWcFCo_oxtXYbk8lPuxGmFeettkkiR57a-aMI5DAUhh8GFEL-rH7hyBTPOSs8k--QBOhuMKOY0Bw0qXJNb2ogxo9uQ0rwSyI3l1KTsot4Aj","hiii ","test22222222")
// fcm("c9wSDnuBRFSKSTfe3EPIon:APA91bGolv7d8lvCQ9-MzhlUHiCqi9Z8iPgg_nUsS9Womg0alpGnpfXEieLvBX870y4MwPrr8kRnefstEqJwXlJVw32HMYb2qkfgskCLDNion15iKSSrOBUc2XZZkfuOL9wH_Qgndrfi","hiii ","test22222222")


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
