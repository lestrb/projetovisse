import Pontuacao from '../models/Pontuacao.js';
import { capibaCheckIn } from '../services/capibaIntegrationService.js';

// Tabela de pontuação
const PONTOS = {
    CADASTRAR_LOCAL: 50,
    COMENTAR: 3,
    RECEBER_CURTIDA: 3,
    RECEBER_COMENTARIO: 5
};

// 10 pontos Visse = 7 Capibas
const TAXA_CONVERSAO = 0.7;
const MIN_PONTOS_CONVERSAO = 10;

// Adicionar pontos ao usuário
export const adicionarPontos = async (usuario_id, acao, detalhes = {}) => {
    try {
        // Busca ou cria registro de pontuação
        let pontuacao = await Pontuacao.findOne({ usuario_id });
        
        if (!pontuacao) {
            pontuacao = new Pontuacao({ usuario_id });
        }

        const pontos = PONTOS[acao] || 0;
        
        if (pontos > 0) {
            pontuacao.pontos_visse += pontos;
            pontuacao.historico.push({
                acao,
                pontos,
                local_id: detalhes.local_id,
                descricao: detalhes.descricao
            });
            
            await pontuacao.save();
        }

        return pontuacao;
    } catch (error) {
        console.error('Erro ao adicionar pontos:', error);
        throw error;
    }
};

// Buscar pontuação do usuário
export const buscarPontuacao = async (req, res) => {
    try {
        const usuario_id = req.usuario._id;
        
        let pontuacao = await Pontuacao.findOne({ usuario_id });
        
        if (!pontuacao) {
            pontuacao = new Pontuacao({ usuario_id });
            await pontuacao.save();
        }

        res.json({
            pontos_visse: pontuacao.pontos_visse,
            pontos_convertidos_capiba: pontuacao.pontos_convertidos_capiba,
            capibas_disponiveis: Math.floor(pontuacao.pontos_visse * TAXA_CONVERSAO),
            historico_recente: pontuacao.historico.slice(-10).reverse()
        });
    } catch (error) {
        console.error('Erro ao buscar pontuação:', error);
        res.status(500).json({ message: 'Erro ao buscar pontuação' });
    }
};

// Converter pontos Visse em Capibas (via check-in na API)
export const converterParaCapiba = async (req, res) => {
    try {
        const usuario_id = req.usuario._id;
        const { pontos_converter, latitude, longitude } = req.body;

        // Validações
        if (!pontos_converter || pontos_converter < MIN_PONTOS_CONVERSAO) {
            return res.status(400).json({ 
                message: `Mínimo de ${MIN_PONTOS_CONVERSAO} pontos para conversão` 
            });
        }

        const pontuacao = await Pontuacao.findOne({ usuario_id });

        if (!pontuacao || pontuacao.pontos_visse < pontos_converter) {
            return res.status(400).json({ 
                message: 'Pontos insuficientes' 
            });
        }

        // Calcula quantos Capibas vai ganhar
        const capibas_ganhar = Math.floor(pontos_converter * TAXA_CONVERSAO);

        // Faz check-in na API Capiba para dar os pontos
        const checkInData = {
            userIdentifier: req.usuario.cpf,
            eventName: `Conversão Visse: ${pontos_converter} pontos`,
            checkInDateTime: new Date().toISOString(),
            cidade: 'Recife',
            bairro: 'Centro', // Pode ajustar
            rua: 'Plataforma Visse',
            identifier: `visse-conversao-${Date.now()}`,
            document: req.usuario.cpf,
            latitude: latitude || -8.0476,
            longitude: longitude || -34.8770,
            eventDescription: `Conversão de ${pontos_converter} pontos Visse em ${capibas_ganhar} Capibas`,
            quantity: capibas_ganhar // Quantidade de pontos Capiba
        };

        // Chama API Capiba
        const token = req.headers.authorization?.split(' ')[1];
        const resultadoCapiba = await capibaCheckIn(token, checkInData);

        // Deduz pontos Visse e registra conversão
        pontuacao.pontos_visse -= pontos_converter;
        pontuacao.pontos_convertidos_capiba += capibas_ganhar;
        pontuacao.historico.push({
            acao: 'conversao_capiba',
            pontos: -pontos_converter,
            descricao: `Convertido ${pontos_converter} pontos em ${capibas_ganhar} Capibas`
        });

        await pontuacao.save();

        res.json({
            message: 'Conversão realizada com sucesso!',
            pontos_convertidos: pontos_converter,
            capibas_recebidos: capibas_ganhar,
            saldo_visse: pontuacao.pontos_visse,
            resultado_capiba: resultadoCapiba
        });

    } catch (error) {
        console.error('Erro ao converter pontos:', error);
        res.status(500).json({ 
            message: 'Erro ao converter pontos',
            error: error.message 
        });
    }
};
