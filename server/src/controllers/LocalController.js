import Local from '../models/Local.js';

// CRIAR LOCAL
export const createLocal = async (req, res) => {
    try {
        // Pega os dados do frontend
        const { 
            nome, 
            imagem_url, 
            descricao, // O texto da descrição
            autor_id,       // ID do usuário logado (que está criando)
            latitude, 
            longitude 
        } = req.body;

        // Valida se tem os dados mínimos
        if (!nome || !imagem_url || !textoDescricao || !autor_id || !latitude || !longitude) {
            return res.status(400).json({ message: "Dados incompletos. Verifique os campos obrigatórios." });
        }

        // Cria o objeto 'novoLocal' seguindo o Schema de Local
        const novoLocal = new Local({
            nome,
            descricao,
            curtidas: [], // Começa com um array de curtidas vazio
            imagem_url,
            autor_id, // O autor que cadastrou o local
            endereco: {
                coordenadas: {
                    latitude,
                    longitude
                }
            }
        });

        // Salva no Banco de Dados
        await novoLocal.save();

        // Envia resposta de sucesso para o frontend
        res.status(201).json({ message: "Local criado com sucesso!", local: novoLocal });

    } catch (error) {
        // Trata erros
        console.error("Erro ao criar local:", error);
        
        if (error.code === 11000) {
             return res.status(409).json({ message: "Já existe um local cadastrado nessas coordenadas." });
        }
        
        res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

// EM BREVE OUTRAS FUNÇÕES DE CONTROLE DE LOCAIS (listar, atualizar, deletar, etc.)