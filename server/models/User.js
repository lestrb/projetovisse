import mongoose from "mongoose";
const UserSchema = new mongoose.Schema ({
    nome : {type: String, required: true, trim: true},
    email : {type: String, required: true, lowercase: true, unique: true, trim: true},
    senha : {type: String, required: true},
    data : {type: Date, default: Date.now}
})

export default mongoose.model("User", UserSchema);