import mongoose from "mongoose";

// Sub-schema para a descrição do local
const DescricaoSchema = new mongoose.Schema({
    // Descrição única por local, com um único autor (por enquanto)
    texto: { type: String, required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Autor da descrição
    curtidas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }], // Array com id's de quem curtiu
    criado_em: { type: Date, default: Date.now }
});

const LocalSchema = new mongoose.Schema({
    nome: { type: String, required: true }, // Nome do local
    descricao: DescricaoSchema, // Objeto (embedado) que segue o DescricaoSchema, já que só terá uma descrição por local
    imagem_url: { type: String, required: true },
    autor_id_cadastro: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Quem cadastrou o local pela primeira vez
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