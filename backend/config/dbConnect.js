import mongoose from "mongoose"

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
export default dbConnect