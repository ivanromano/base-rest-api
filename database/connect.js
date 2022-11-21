import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI)
    console.log("cone ctada");
} catch (error) {
    console.log("nono data base" + error);
}
