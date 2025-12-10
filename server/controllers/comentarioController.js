import Comentario from '../models/Comentario.js';
import Local from '../models/Local.js';
import mongoose from 'mongoose';
import { adicionarPontos } from './pontuacaoController.js';

// CRIAR COMENTÁRIO
export const criarComentario = async (req, res) => {
    try {
        const { local_id, texto } = req.body;
        const autor_id = req.usuario._id;

        // Validações
        if (!local_id || !texto) {
            return res.status(400).json({
                message: "Local e texto são obrigatórios"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(local_id)) {
            return res.status(400).json({ message: "ID do local inválido" });
        }

        if (texto.length < 3 || texto.length > 500) {
            return res.status(400).json({
                message: "Comentário deve ter entre 3 e 500 caracteres"
            });
        }

        // Verifica se o local existe
        const local = await Local.findById(local_id);
        if (!local) {
            return res.status(404).json({ message: "Local não encontrado" });
        }

        // Cria o comentário
        const comentario = new Comentario({
            local_id,
            autor_id,
            texto
        });

        await comentario.save();

        // Popula dados do autor para retornar
        await comentario.populate('autor_id', 'nome');


        // DAR PONTOS AO USUÁRIO POR COMENTAR
        try {
            await adicionarPontos(autor_id, 'COMENTAR', {
                local_id: local._id,
                descricao: `Comentou no local "${local.nome}"`
            });

            await adicionarPontos(local.autor_id, 'RECEBER_COMENTARIO', {  
                local_id: local._id, descricao: `Recebeu comentario no local "${local.nome}"`
            });

        } catch (pontoError) {
            console.error('Erro ao adicionar pontos:', pontoError);
        }

        res.status(201).json({
            message: "Comentário publicado! Você ganhou 10 pontos! ",
            comentario,
            pontos_ganhos: 3
        });

    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({
            message: 'Erro ao criar comentário',
            error: error.message
        });
    }
};



// LISTAR COMENTÁRIOS DE UM LOCAL
export const listarComentarios = async (req, res) => {
    try {
        const { local_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(local_id)) {
            return res.status(400).json({ message: "ID do local inválido" });
        }

        const comentarios = await Comentario.find({ local_id })
            .populate('autor_id', 'nome')
            .sort({ criado_em: -1 });

        res.json(comentarios);

    } catch (error) {
        console.error('Erro ao listar comentários:', error);
        res.status(500).json({ message: 'Erro ao listar comentários' });
    }
};

// ATUALIZAR COMENTÁRIO
export const atualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;
        const autor_id = req.usuario._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID do comentário inválido" });
        }

        if (!texto || texto.length < 3 || texto.length > 500) {
            return res.status(400).json({
                message: "Comentário deve ter entre 3 e 500 caracteres"
            });
        }

        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({ message: "Comentário não encontrado" });
        }

        // Verifica se é o autor
        if (comentario.autor_id.toString() !== autor_id.toString()) {
            return res.status(403).json({
                message: "Você não tem permissão para editar este comentário"
            });
        }

        comentario.texto = texto;
        comentario.atualizado_em = Date.now();
        await comentario.save();

        res.json({
            message: "Comentário atualizado com sucesso",
            comentario
        });

    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        res.status(500).json({ message: 'Erro ao atualizar comentário' });
    }
};

// DELETAR COMENTÁRIO
export const deletarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const autor_id = req.usuario._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID do comentário inválido" });
        }

        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({ message: "Comentário não encontrado" });
        }

        // Verifica se é o autor
        if (comentario.autor_id.toString() !== autor_id.toString()) {
            return res.status(403).json({
                message: "Você não tem permissão para excluir este comentário"
            });
        }

        await comentario.deleteOne();

        res.json({ message: "Comentário excluído com sucesso" });

    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        res.status(500).json({ message: 'Erro ao deletar comentário' });
    }
};


