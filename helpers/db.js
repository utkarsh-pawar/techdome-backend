import mongoose from "mongoose"
import { config } from "./config"


export default db  =()=>{

    
    mongoose.connect(config.MONGO_URI).then(()=>{
        console.log("connected DB");
    }).catch(()=>{
        console.log("error occurred");
        process.exit()
    })
}