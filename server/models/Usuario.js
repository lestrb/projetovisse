import mongoose from "mongoose";
const UsuarioSchema = new mongoose.Schema ({
    nome : {type: String, required: true, trim: true},
    email : {type: String, required: true, lowercase: true, unique: true, trim: true},
    senha : {type: String, required: true},
    criado_em : {type: Date, default: Date.now}
})

export default mongoose.model("Usuario", UsuarioSchema);