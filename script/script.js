const CLIENT_ID = "0061c005";

const API_URL =
    `https://api.jamendo.com/v3.0/albums/tracks/` +
    `?client_id=${CLIENT_ID}` +
    `&format=json` +
    `&limit=5` +
    `&order=popularity_total` +
    `&audioformat=mp32`;

const player = document.querySelector("#audio-player");
let discoAtual = null;

async function buscarMusicas() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível acessar a API da Jamendo.");
        }

        const dados = await resposta.json();
        return dados.results;

    } catch (erro) {
        console.error("Erro ao buscar músicas:", erro);
        return [];
    }
}

function pararDisco() {
    player.pause();
    discoAtual?.classList.remove("tocando");
    discoAtual = null;
}

function alternarDisco(disco) {
    const jaTocando = discoAtual === disco;
    pararDisco();
    if (jaTocando) return;

    player.src = disco.dataset.audio;
    player.play();
    disco.classList.add("tocando");
    discoAtual = disco;
}

async function carregarDiscos() {
    const albuns = await buscarMusicas();

    albuns.forEach((album, index) => {
        const disco = document.querySelector(`.disco-wrapper[data-index="${index}"]`);
        const faixa = album.tracks[0];

        if (!disco || !faixa) return;

        const capa = disco.querySelector("img");
        capa.src = album.image;
        capa.alt = `Capa do álbum ${album.name}`;

        disco.querySelector(".disco-titulo").textContent = faixa.name;
        disco.querySelector(".disco-artista").textContent = album.artist_name;
        disco.dataset.audio = faixa.audio;
        disco.addEventListener("click", () => alternarDisco(disco));
    });
}

player.addEventListener("ended", pararDisco);
carregarDiscos();

document.querySelector("#btn-ouvir-agora").addEventListener("click", () => {
    const secaoDiscos = document.querySelector("#apresentacao");
    const primeiroDisco = document.querySelector('.disco-wrapper[data-index="0"]');

    secaoDiscos?.scrollIntoView({ behavior: "smooth" });

    if (primeiroDisco) {
        setTimeout(() => alternarDisco(primeiroDisco), 400);
    }
});

/* ===== Demonstrações ===== */
const abasDemo = [...document.querySelectorAll(".demo-tab")];
const paineisDemo = document.querySelectorAll(".demo-panel");

function selecionarAbaDemo(aba) {
    abasDemo.forEach((item) => {
        const ativa = item === aba;
        item.setAttribute("aria-selected", ativa);
        item.tabIndex = ativa ? 0 : -1;
    });

    paineisDemo.forEach((painel) => {
        painel.hidden = painel.id !== aba.getAttribute("aria-controls");
    });
}

abasDemo.forEach((aba, indice) => {
    aba.addEventListener("click", () => selecionarAbaDemo(aba));

    // Navegação por teclado (setas) entre as abas
    aba.addEventListener("keydown", (evento) => {
        const passos = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(evento.key in passos)) return;

        evento.preventDefault();
        const proxima = abasDemo[(indice + passos[evento.key] + abasDemo.length) % abasDemo.length];
        proxima.focus();
        selecionarAbaDemo(proxima);
    });
});

// Player ilustrativo: pausa e retoma a barra de progresso
const botaoDemoPlay = document.querySelector("#demo-play");
const iconeDemoPlay = document.querySelector("#demo-play-icon");
const barraDemo = document.querySelector("#demo-progress");

botaoDemoPlay.addEventListener("click", () => {
    const pausado = barraDemo.classList.toggle("pausado");

    iconeDemoPlay.classList.toggle("fa-pause", !pausado);
    iconeDemoPlay.classList.toggle("fa-play", pausado);
    iconeDemoPlay.classList.toggle("ml-[3px]", pausado);
    botaoDemoPlay.setAttribute("aria-label", pausado ? "Tocar demonstração" : "Pausar demonstração");
});

// Botões "Seguir" da tela Descobrir
document.querySelectorAll(".demo-seguir").forEach((botao) => {
    botao.addEventListener("click", () => {
        const seguindo = botao.getAttribute("aria-pressed") !== "true";
        botao.setAttribute("aria-pressed", seguindo);
        botao.textContent = seguindo ? "Seguindo" : "Seguir";
    });
});