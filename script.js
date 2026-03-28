const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Gabriel, você está assistindo a um jogo decisivo do campeonato. Uma nova tecnologia de IA promete prever jogadas e resultados com 95% de precisão. Qual sua reação?",
        alternativas: [
            {
                texto: "Isso pode acabar com a emoção do futebol!",
                afirmacao: "Gabriel ficou preocupado que a IA pudesse tirar a imprevisibilidade que torna o futebol tão emocionante. "
            },
            {
                texto: "Incrível! Isso vai revolucionar a tática e treinamentos!",
                afirmacao: "Gabriel ficou animado com as possibilidades táticas que a IA poderia trazer para o futebol."
            }
        ]
    },
    {
        enunciado: "O técnico do seu time favorito quer usar IA para escalar os jogadores baseado em dados estatísticos. Como você se sente sobre isso?",
        alternativas: [
            {
                texto: "Concordo! Dados são importantes para decisões mais precisas.",
                afirmacao: "Gabriel passou a defender o uso de dados e IA para otimizar escalações e estratégias."
            },
            {
                texto: "Discordo! O feeling do técnico e a intuição são insubstituíveis.",
                afirmacao: "Gabriel valorizava a experiência humana e o conhecimento tático tradicional acima de algoritmos."
            }
        ]
    },
    {
        enunciado: "Na escolinha de futebol onde você treina, surge a proposta de usar um sistema de IA para analisar os movimentos dos jovens jogadores e sugerir melhorias. Qual sua posição?",
        alternativas: [
            {
                texto: "Apoio! Isso pode acelerar o desenvolvimento dos atletas.",
                afirmacao: "Gabriel viu na IA uma ferramenta poderosa para formação de novos talentos."
            },
            {
                texto: "Prefiro o treinamento tradicional com técnicos humanos.",
                afirmacao: "Gabriel acreditava que o contato humano é essencial no desenvolvimento esportivo."
            }
        ]
    },
    {
        enunciado: "Você precisa criar uma arte para o campeonato de futebol da escola. Como você faz?",
        alternativas: [
            {
                texto: "Desenho manualmente no papel ou uso programas tradicionais.",
                afirmacao: "Gabriel desenvolveu habilidades artísticas manuais e valorizou o processo criativo tradicional."
            },
            {
                texto: "Uso um gerador de imagens com IA para criar algo profissional.",
                afirmacao: "Gabriel descobriu que a IA pode ajudar a criar artes incríveis rapidamente."
            }
        ]
    },
    {
        enunciado: "Seu amigo usou IA para escrever uma análise tática do próximo jogo, mas o texto ficou muito genérico. O que você faz?",
        alternativas: [
            {
                texto: "Uso o texto da IA como base e adiciono minhas próprias análises.",
                afirmacao: "Gabriel aprendeu que a IA deve ser uma ferramenta de apoio, não o trabalho final."
            },
            {
                texto: "Entrego do jeito que está, afinal a IA é muito inteligente.",
                afirmacao: "Gabriel percebeu que confiar cegamente na IA pode levar a resultados superficiais."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "🏆 O FUTURO DE GABRIEL NO FUTEBOL 🏆";
    textoResultado.innerHTML = `<strong>⚽ Gabriel em 2030... ⚽</strong><br><br>${historiaFinal}<br><br>🏅 A jornada de Gabriel mostra como a IA e o futebol podem caminhar juntos, mantendo sempre a essência do esporte: a paixão, a emoção e o talento humano! 🏅`;
    caixaAlternativas.textContent = "";
    
    // Adiciona botão para reiniciar
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "⚽ RECOMEÇAR JORNADA ⚽";
    botaoReiniciar.style.background = "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";
    botaoReiniciar.style.color = "#1a472a";
    botaoReiniciar.style.marginTop = "20px";
    botaoReiniciar.addEventListener("click", () => {
        atual = 0;
        historiaFinal = "";
        mostraPergunta();
        caixaResultado.style.display = "none";
        caixaPerguntas.style.display = "block";
        caixaAlternativas.style.display = "flex";
    });
    
    caixaAlternativas.appendChild(botaoReiniciar);
    caixaResultado.style.display = "block";
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "flex";
}

// Relógio
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

function atualizarRelogio() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    horas.textContent = hr < 10 ? '0' + hr : hr;
    minutos.textContent = min < 10 ? '0' + min : min;
    segundos.textContent = s < 10 ? '0' + s : s;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Inicialização
caixaResultado.style.display = "none";
mostraPergunta();
