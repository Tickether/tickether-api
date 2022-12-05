import mongoose from "mongoose";

const UpgradedTokenSchema = new mongoose.Schema({
    tokens: {
        type: [String],
        required: true,
        unique: true
    }
});

export default mongoose.model('UpgradedToken', UpgradedTokenSchema)