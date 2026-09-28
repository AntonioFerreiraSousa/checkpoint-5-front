# Melodia

Landing page do **Melodia**, um app de músicas para quem quer ouvir com qualidade e descobrir algo novo. Projeto do **Check-point 05 de Front-end Design** (Engenharia de Software, FIAP), com orientação do Prof. Lucas Sousa.

> **Melodia: sua música, sua forma**

**Página publicada:** https://antonioferreirasousa.github.io/checkpoint-5-front/
**Repositório:** https://github.com/AntonioFerreiraSousa/checkpoint-5-front

## Sobre o projeto

- **Objetivo:** apresentar o app Melodia em uma landing page moderna, limpa e responsiva.
- **Público-alvo:** amantes de música, jovens e pessoas que buscam novas descobertas musicais.
- **Diferenciais do app:** som de alta qualidade, playlists personalizadas, descoberta de novos artistas e interface intuitiva.

## Seções da página

| Seção | O que tem |
|---|---|
| **Navbar** | Menu fixo com efeito de transparência, link ativo conforme a rolagem e menu mobile. Componente em `components/navbar.js`. |
| **Hero** | Título, descrição, botão "Ouvir Agora" e vídeo de destaque. |
| **Apresentação** | Benefícios com ícones Font Awesome e barras de equalizador animadas. |
| **Discos** | 5 discos de vinil com músicas reais da API Jamendo. Ao clicar, o disco sai da capa, gira e toca. |
| **Demonstrações** | Abas com telas ilustrativas do app: Player, Playlists e Descobrir. |
| **Avaliações** | Depoimentos de usuários em cards. |
| **Contato** | Formulário responsivo para receber novidades, com informações de contato e redes sociais. |
| **Rodapé** | Direitos reservados. |

## Tecnologias

- **HTML5** para a estrutura
- **CSS3** para as animações (`@keyframes`) e ajustes globais
- **Tailwind CSS** (via CDN) para o layout responsivo e a estilização
- **Font Awesome 6** para os ícones
- **Google Fonts** com Outfit (títulos) e Inter (texto)
- **JavaScript** para o player, a navbar e as abas
- **API Jamendo** para capas, nomes e áudio das músicas (`fetch`)

## Identidade visual

| Cor | Hex | Uso |
|---|---|---|
| Violeta | `#6D3BF5` | Cor principal |
| Rosa pulso | `#FF3D9A` | Destaques e ações |
| Amarelo nota | `#FFC53D` | Detalhes |
| Noite | `#14102B` | Fundos escuros e texto |
| Névoa | `#F6F3FF` | Fundos claros |
| Lavanda | `#B9A8FF` | Texto de apoio sobre Noite |

Botões em formato pílula (`rounded-full`), cards com `rounded-2xl` e campos com `rounded-xl`.

## Estrutura de arquivos

```
├── index.html
├── components/
│   └── navbar.js
├── script/
│   └── script.js
├── style/
│   └── styles.css
└── assets/
    └── videos/
        └── melodiav.mp4
```

## Como executar

Não há etapa de build. Clone o repositório e abra o `index.html` no navegador (ou use uma extensão como o Live Server). É preciso ter internet, pois Tailwind, Font Awesome, Google Fonts e a API Jamendo são carregados da web.

```bash
git clone https://github.com/AntonioFerreiraSousa/checkpoint-5-front.git
cd checkpoint-5-front
```

## Integrantes

| Integrante | Contribuição |
|---|---|
| [Guilherme Pereira](https://github.com/gprsilva) | Estrutura inicial e Apresentação|
| [Matheus Mendes](https://github.com/MatheusMendes777) | Hero Section |
| [Matheus Sato](https://github.com/MatheusSato00) | Seção de Avaliações |
| [Antonio Ferreira Sousa](https://github.com/AntonioFerreiraSousa) | Formulário de contato |
| [Gustavo Leal](https://github.com/777Leal) | Navbar e seção Demonstrações |

## Branches

- `main`: versão publicada
- `develop`: integração das seções
- `feature/*`: uma branch por integrante
