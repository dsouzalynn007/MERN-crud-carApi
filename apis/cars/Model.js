import { Schema, model } from "mongoose";

let carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    fuel:{type: String, required: true },
    mfg: { type: String, required: true },
    totalKms: { type: String, required: true },
    PhotoUrl: { type: Object || String, required: true },
    price: { type: String, required: true },
    sold: { type: Boolean , required: true }
}, { timestamps: true });

let carModel = model("cars", carSchema, "cars")
export default carModel