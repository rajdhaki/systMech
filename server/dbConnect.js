import mongoose from "mongoose";
const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connect");
    }
    catch (error) {
        console.log(`Connection Fail ${error}`);
    }
}


export {dbConnect}