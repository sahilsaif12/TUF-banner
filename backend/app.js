import express from "express";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.get('/', (req, res) =>{
    res.json({msg:"working......"})
})

import bannerRoutes from './src/routes/banner.route.js'

app.use("/api/v1/banner",bannerRoutes)

export default app