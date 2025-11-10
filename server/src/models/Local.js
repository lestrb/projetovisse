import mongoose from "mongoose";

const LocalSchema = new mongoose.Schema({
    nome: { type: String, required: true },         // Nome do local
    descricao: { type: String, required: true },    // Descrição única do local 
    curtidas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],   // Aray de IDs de usuários que curtiram o local
    imagem_url: { type: String, required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Quem cadastrou o local pela primeira vez
    endereco: {
        coordenadas: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        }
    },
    criado_em: { type: Date, default: Date.now }
});

// Indice único por coordenada (corrige o campo duplicado)
LocalSchema.index({ "endereco.coordenadas.latitude": 1, "endereco.coordenadas.longitude": 1 }, { unique: true });

const Local = mongoose.model("Local", LocalSchema);

export default Local;