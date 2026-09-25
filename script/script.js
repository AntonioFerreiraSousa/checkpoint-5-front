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