import mongoose from "mongoose";

const cookieSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: false, maxlength: 1000 },
    priceInCents: { type: Number, required: true },
    isInStock: { type: Boolean, required: true, default: true }
})

export const Cookie = mongoose.model('Cookie', cookieSchema)