import mongoose from "mongoose";
const UsuarioSchema = new mongoose.Schema({
    capiba_id: {type: String, unique: true, required: true, index: true},
    cpf: {type: String, unique: true, required: true, index: true},
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true, trim: true },
    criado_em: { type: Date, default: Date.now }
})

export default mongoose.model("Usuario", UsuarioSchema);