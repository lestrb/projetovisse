import mongoose from "mongoose";

const LocalSchema = new mongoose.Schema({
    nome: { type: String, required: true },         // Nome do local
    descricao: { type: String, required: true },    // Descrição única do local
    tipo: { type: String, required: true }, 
    curtidas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],   // Array de IDs de usuários que curtiram o local
    imagem_url: { type: String },
    endereco: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Quem cadastrou o local 
    criado_em: { type: Date, default: Date.now }
  /*  comentarios: [{
        usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
        texto: { type: String, required: true },
        curtidas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
        criado_em: { type: Date, default: Date.now }
    }], */
});

LocalSchema.index({ latitude: 1, longitude: 1 });

export default mongoose.model("Local", LocalSchema, "locais");