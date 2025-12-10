import mongoose from "mongoose";

const PontuacaoSchema = new mongoose.Schema({
    usuario_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true},
    pontos_visse: {type: Number, default: 0},
    pontos_convertidos_capiba: {type: Number, default: 0},
    historico: [{
        acao: {type: String, required: true},
        pontos: {type: Number, required: true},
        local_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'},
        data: {type: Date, default: Date.now}
    }],
    criado_em: {type: Date, default: Date.now},
    atualizado_em: {type: Date, default: Date.now}
});

// Índice composto para queries rápidas
PontuacaoSchema.index({ usuario_id: 1, pontos_visse: -1 });

// Middleware para atualizar atualizado_em
PontuacaoSchema.pre('save', function (next) {
    this.atualizado_em = Date.now();
    next();
});

export default mongoose.model("Pontuacao", PontuacaoSchema);