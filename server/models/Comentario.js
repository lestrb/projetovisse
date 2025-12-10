import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
    local_id: { type: mongoose.Schema.Types.ObjectId, ref: "Local", required: true, index: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    texto: { type: String, required: true, trim: true, minlength: 3, maxlength: 500 },
    criado_em: { type: Date, default: Date.now }
});

// Índices para performance
ComentarioSchema.index({ local_id: 1, criado_em: -1 });
ComentarioSchema.index({ autor_id: 1 });

export default mongoose.model("Comentario", ComentarioSchema);