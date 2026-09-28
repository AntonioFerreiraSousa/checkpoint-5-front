/* =====================================================================
   Componente: Navbar do Melodia
   ---------------------------------------------------------------------
   Como usar em qualquer página (logo no início do <body>):

       <div data-navbar></div>
       <script src="components/navbar.js"></script>

   O script troca o <div data-navbar> pela navbar completa (Tailwind),
   ajusta os links conforme a página atual e liga o menu mobile.
   Para adicionar/remover um item do menu, edite só o array ITENS_MENU.
   ===================================================================== */
(function () {
    const PAGINA_INICIAL = "index.html";

    // Itens do menu. "id" é a seção da página inicial; "pagina" (opcional)
    // marca o link como ativo quando a página atual for essa.
    const ITENS_MENU = [
        { id: "inicio", rotulo: "Início" },
        { id: "apresentacao", rotulo: "Sobre" },
        { id: "demonstracoes", rotulo: "Demonstrações" },
        { id: "avaliacoes", rotulo: "Avaliações" },
        { id: "contato", rotulo: "Contato" },
    ];

    const paginaAtual = location.pathname.split("/").pop() || PAGINA_INICIAL;
    const naPaginaInicial = paginaAtual === PAGINA_INICIAL;

    // Na página inicial usa âncora simples (#secao); nas demais volta para o index.
    const href = (id) => `${naPaginaInicial ? "" : PAGINA_INICIAL}#${id}`;

    const classesLinkDesktop =
        "nav-link inline-block font-[Inter,sans-serif] font-[500] text-[15px] text-white/70 hover:text-white py-[6px] border-b-2 border-transparent transition-colors duration-[200ms] aria-[current=true]:text-white aria-[current=true]:border-[#FF3D9A]";
    const classesLinkMobile =
        "nav-link block font-[Inter,sans-serif] font-[500] text-[16px] text-white/70 hover:text-white hover:bg-white/5 px-[12px] py-[12px] rounded-lg transition-colors duration-[200ms] aria-[current=true]:text-white aria-[current=true]:bg-white/10";

    const linksHTML = (classes, itemClasses = "") =>
        ITENS_MENU.map(
            (item) => `
                <li${itemClasses ? ` class="${itemClasses}"` : ""}>
                    <a href="${href(item.id)}" data-secao="${item.id}" class="${classes}">${item.rotulo}</a>
                </li>`
        ).join("");

    const botaoOuvir = (extra) => `
        <button type="button" class="nav-ouvir items-center gap-[10px] bg-[#FF3D9A] text-white font-[Outfit,sans-serif] font-[500] text-[15px] px-[24px] rounded-full hover:bg-[#e6338a] transition-colors duration-[200ms] ${extra}">
            <i class="fas fa-play text-[12px]"></i>
            Ouvir Agora
        </button>`;

    const NAVBAR_HTML = `
    <header id="navbar" class="sticky top-0 z-[100] bg-[#14102B]/95 backdrop-blur border-b border-white/10">
        <nav class="w-[90%] max-w-[1440px] mx-auto px-[16px] h-[72px] flex items-center justify-between gap-[24px]" aria-label="Navegação principal">

            <!-- Logo -->
            <a href="${href("inicio")}" class="flex items-center gap-[10px]" aria-label="Melodia — voltar ao início">
                <span class="w-[36px] h-[36px] rounded-full bg-[#6d3bf5] flex items-center justify-center">
                    <i class="fas fa-music text-[16px] text-white"></i>
                </span>
                <span class="font-[Outfit,sans-serif] font-[700] text-[22px] text-white">Melodia</span>
            </a>

            <!-- Links (desktop) -->
            <ul class="hidden md:flex items-center gap-[32px]">${linksHTML(classesLinkDesktop)}
            </ul>

            <div class="flex items-center gap-[12px]">
                <!-- CTA (desktop) -->
                ${botaoOuvir("hidden md:inline-flex py-[10px]")}

                <!-- Botão do menu (mobile) -->
                <button id="nav-toggle" type="button"
                    class="md:hidden w-[44px] h-[44px] flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors duration-[200ms]"
                    aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menu">
                    <i class="fas fa-bars text-[20px]"></i>
                </button>
            </div>
        </nav>

        <!-- Menu (mobile) -->
        <div id="nav-menu" class="hidden md:hidden border-t border-white/10 bg-[#14102B]">
            <ul class="w-[90%] mx-auto px-[16px] py-[16px] flex flex-col gap-[4px]">${linksHTML(classesLinkMobile)}
            </ul>
            <div class="w-[90%] mx-auto px-[16px] pb-[20px]">
                ${botaoOuvir("flex w-full justify-center py-[14px]")}
            </div>
        </div>
    </header>`;

    // Troca o marcador pela navbar (o <header> fica filho direto do <body>,
    // o que é necessário para o "sticky" funcionar).
    const marcador = document.querySelector("[data-navbar]");
    if (!marcador) return;

    const molde = document.createElement("template");
    molde.innerHTML = NAVBAR_HTML.trim();
    marcador.replaceWith(molde.content);

    /* ---------- Comportamento ---------- */
    const navToggle = document.querySelector("#nav-toggle");
    const navMenu = document.querySelector("#nav-menu");
    const navLinks = document.querySelectorAll("#navbar .nav-link");

    function alternarMenu(abrir) {
        const aberto = abrir ?? navMenu.classList.contains("hidden");
        const icone = navToggle.querySelector("i");

        navMenu.classList.toggle("hidden", !aberto);
        navToggle.setAttribute("aria-expanded", aberto);
        navToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        icone.classList.toggle("fa-bars", !aberto);
        icone.classList.toggle("fa-xmark", aberto);
    }

    navToggle.addEventListener("click", () => alternarMenu());
    navMenu.querySelectorAll("a, button").forEach((item) => {
        item.addEventListener("click", () => alternarMenu(false));
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") alternarMenu(false);
    });
    window.matchMedia("(min-width: 768px)").addEventListener("change", (evento) => {
        if (evento.matches) alternarMenu(false);
    });

    // "Ouvir Agora": na página inicial aciona o botão da Hero; nas outras, volta ao index.
    document.querySelectorAll("#navbar .nav-ouvir").forEach((botao) => {
        botao.addEventListener("click", () => {
            const botaoHero = document.querySelector("#btn-ouvir-agora");
            if (botaoHero) botaoHero.click();
            else location.href = PAGINA_INICIAL;
        });
    });

    /* ---------- Link ativo ---------- */
    function marcarLinkAtivo(id) {
        navLinks.forEach((link) => {
            link.setAttribute("aria-current", link.dataset.secao === id);
        });
    }

    const itemDaPagina = ITENS_MENU.find((item) => item.pagina === paginaAtual);

    if (itemDaPagina) {
        // Página própria (ex.: contatos.html): destaca o item correspondente.
        marcarLinkAtivo(itemDaPagina.id);
    } else if (naPaginaInicial) {
        // Página inicial: destaca a seção que está visível na tela.
        const observadorSecoes = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) marcarLinkAtivo(entrada.target.id);
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        ITENS_MENU.forEach(({ id }) => {
            const secao = document.getElementById(id);
            if (secao) observadorSecoes.observe(secao);
        });
    }
})();