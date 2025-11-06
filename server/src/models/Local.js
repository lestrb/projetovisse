import mongoose from "mongoose";
const LocalSchema = new mongoose.Schema({
    nome: {type: String, required: True},
    descricao: {type: String, required: True},
    imagem_url: {type: String, required: True},
    autor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: True},
    endereco: {
        coordenadas: {
            latitude: {type: Number, required: True},
            longitude: {type: Number, required: True}
        }
    },
    criado_em: {type: Date, default: Date.now}

})

// Indice único por coordenada
LocalSchema.index({"endereco.coordenadas.latitude": 1, "endereco.coordenadas.latitude": 1}, {unique: True});


const Local = mongoose.model("Local", LocalSchema);

export default Local;