// Mostrar nome dos arquivos escolhidos
document.getElementById("documento")?.addEventListener("change", function() {
  const fileName = this.files[0] ? this.files[0].name : "Nenhum arquivo escolhido";
  document.getElementById("docName").textContent = fileName;
});

document.getElementById("exame")?.addEventListener("change", function() {
  const fileName = this.files[0] ? this.files[0].name : "Nenhum arquivo escolhido";
  document.getElementById("exameName").textContent = fileName;
});

// =================== CADASTRO MULTI-ETAPAS ===================
const steps = document.querySelectorAll(".step"); 
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
let currentStep = 0;

function showStep(step) {
  steps.forEach((s, i) => {
    s.style.display = i === step ? "block" : "none";
  });
}
showStep(currentStep);

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// =================== FINALIZAR CADASTRO ===================
const formCadastro = document.getElementById("formCadastro");

// Função para converter arquivo em Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const docFile = document.getElementById("documento").files[0];
    const exameFile = document.getElementById("exame").files[0];

    const usuario = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      telefone: document.getElementById("telefone").value,
      dataNascimento: document.getElementById("dataNascimento").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      areaInteresse: document.getElementById("areaInteresse").value,
      situacao: document.getElementById("situacao").value,
      documento: docFile ? await fileToBase64(docFile) : null,
      exame: exameFile ? await fileToBase64(exameFile) : null
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("logado", "false");

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

// =================== LOGIN ===================
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.email === email && usuario.senha === senha) {
      alert("Login realizado com sucesso!");
      localStorage.setItem("logado", "true");
      window.location.href = "dados.html";
    } else {
      alert("Email ou senha incorretos");
    }
  });
}

// =================== PÁGINA DE DADOS ===================
if (window.location.pathname.includes("dados.html")) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const logado = localStorage.getItem("logado");
  const perfil = document.getElementById("perfil");

  if (!usuario || logado !== "true") {
    perfil.innerHTML = "<p>Você precisa estar logado para acessar esta página.</p>";
  } else {
    perfil.innerHTML = `
      <div class="info-item"><strong>Nome:</strong> <span>${usuario.nome}</span></div>
      <div class="info-item"><strong>Email:</strong> <span>${usuario.email}</span></div>
      <div class="info-item"><strong>Telefone:</strong> <span>${usuario.telefone}</span></div>
      <div class="info-item"><strong>Data de Nascimento:</strong> <span>${usuario.dataNascimento}</span></div>
      <div class="info-item"><strong>Cidade:</strong> <span>${usuario.cidade}</span></div>
      <div class="info-item"><strong>Estado:</strong> <span>${usuario.estado}</span></div>
      <div class="info-item"><strong>Situação:</strong> <span>${usuario.situacao}</span></div>
      <div class="info-item"><strong>Ave Favorita:</strong> <span>${usuario.areaInteresse}</span></div>
    `;

    if (usuario.documento) {
      perfil.innerHTML += `
        <div class="info-item"><strong>Documento:</strong>
          <a href="${usuario.documento}" target="_blank">Ver arquivo</a>
        </div>`;
    }
    if (usuario.exame) {
      perfil.innerHTML += `
        <div class="info-item"><strong>Pokemon Favorito:</strong>
          <a href="${usuario.exame}" target="_blank">Ver arquivo</a>
        </div>`;
    }
  }
}

// =================== LOGOUT ===================
function logout() {
  localStorage.setItem("logado", "false");
  window.location.href = "login.html";
}

// =================== MENU DINÂMICO ===================
document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("logado");
  const menuLogin = document.getElementById("menuLogin");
  const menuCadastro = document.getElementById("menuCadastro");
  const menuConta = document.getElementById("menuConta");

  if (logado === "true") {
    if (menuLogin) menuLogin.style.display = "none";
    if (menuCadastro) menuCadastro.style.display = "none";
    if (menuConta) menuConta.style.display = "inline-block";
  } else {
    if (menuLogin) menuLogin.style.display = "inline-block";
    if (menuCadastro) menuCadastro.style.display = "inline-block";
    if (menuConta) menuConta.style.display = "none";
  }
});

// =================== BIBLIOTECA DE SERVIÇOS/CURSOS ===================
document.addEventListener("DOMContentLoaded", () => {
  const isServicosPage = window.location.pathname.includes("servicos.html");

  if (isServicosPage) {
    const servicos = [
      {
        titulo: "Captura Comum",
        modalidade: "Preço: R$ 350,00",
        local: "Operação básica",
        resumo: "Atendimento padrão para capturas simples com acompanhamento essencial.",
        imagem: "../IMG/servico1.jpg",
        video: "",
        material: "",
        arquivos: "",
        tempo: "2 dias",
        preco: "R$ 350,00",
        passo: "1) escolha o serviço; 2) confirme os dados; 3) a captura será realizada e entregue."
      },
      {
        titulo: "Captura Pro",
        modalidade: "Preço: R$ 700,00",
        local: "Operação especializada",
        resumo: "Equipe especializada para capturas com maior cuidado e controle técnico.",
        imagem: "../IMG/servico2.avif",
        video: "",
        material: "",
        arquivos: "",
        tempo: "4 dias",
        preco: "R$ 700,00",
        passo: "1) selecione a modalidade; 2) finalize o pedido; 3) acompanhe a execução; 4) recebimento final."
      },
      {
        titulo: "Aquisição ''Legal''",
        modalidade: "Preço: R$ 900,00",
        local: "Processo documentado",
        resumo: "Entrega com documentação e procedimento totalmente regularizado.",
        imagem: "../IMG/servico3.avif",
        video: "",
        material: "",
        arquivos: "",
        tempo: "5 dias",
        preco: "R$ 900,00",
        passo: "1) análise da solicitação; 2) validação legal; 3) cobrança e processamento; 4) entrega oficial."
      },
      {
        titulo: "Autógrafo do Giovanni",
        modalidade: "Preço: R$ 9.999.999",
        local: "Atendimento premium",
        resumo: "Serviço exclusivo com atenção premium e rotina personalizada.",
        imagem: "../IMG/servico4.jpg",
        video: "",
        material: "",
        arquivos: "",
        tempo: "7 dias",
        preco: "R$ 9.999.999",
        passo: "1) agendamento; 2) confirmação premium; 3) execução do serviço; 4) entrega final exclusiva."
      }
    ];

    const container = document.getElementById("cursosContainer");
    const modal = document.getElementById("cursoModal");
    const titulo = document.getElementById("modalTitulo");
    const resumo = document.getElementById("modalResumo");
    const videoEl = document.getElementById("modalVideo");
    const videoWrapper = document.querySelector(".video-wrapper");
    const modalidade = document.getElementById("modalModalidade");
    const localEl = document.getElementById("modalLocal");
    const linkMaterial = document.getElementById("linkMaterial");
    const linkArquivos = document.getElementById("linkArquivos");
    const fecharModal = document.getElementById("fecharModal");

    function renderServicos(lista) {
      container.innerHTML = "";
      lista.forEach(servico => {
        const card = document.createElement("section");
        card.className = "curso-card";
        if (servico.titulo === "Autógrafo do Giovanni") {
          card.classList.add("servico-imagem-acima");
        }
        card.innerHTML = `
          <div class="curso-imagem" aria-label="Imagem do serviço ${servico.titulo}">
            <img src="${servico.imagem || '../IMG/servico1.jpg'}" alt="Imagem do serviço ${servico.titulo}">
          </div>
          <h3>${servico.titulo}</h3>
          <div class="curso-detalhes hidden">
            <p><strong>${servico.modalidade}</strong> • ${servico.local}</p>
            <p>${servico.resumo}</p>
          </div>
          <button class="btn-sair btn-abrir" data-titulo="${servico.titulo}">Saiba mais</button>
        `;
        container.appendChild(card);
      });
    }

    renderServicos(servicos);

    const buscaCurso = document.getElementById("buscaCurso");
    const limparBusca = document.getElementById("limparFiltros");

    function pesquisarServicos() {
      if (!buscaCurso) return;

      const termo = buscaCurso.value.trim().toLowerCase();
      const resultado = servicos.filter(servico =>
        servico.titulo.toLowerCase().includes(termo)
      );

      renderServicos(resultado);
    }

    if (buscaCurso) {
      buscaCurso.addEventListener("input", pesquisarServicos);
    }

    if (limparBusca) {
      limparBusca.addEventListener("click", () => {
        buscaCurso.value = "";
        renderServicos(servicos);
      });
    }

    function abrirModal(servico) {
      titulo.textContent = servico.titulo;
      resumo.textContent = servico.resumo;
      modalidade.textContent = servico.modalidade;
      localEl.textContent = servico.local || "Atendimento";

      videoWrapper.classList.add("hidden");
      videoEl.removeAttribute("src");
      videoEl.load();

      linkMaterial.classList.add("hidden");
      linkArquivos.classList.add("hidden");
      linkMaterial.removeAttribute("href");
      linkArquivos.removeAttribute("href");

      const infoSection = document.querySelector(".curso-infos");
      infoSection.innerHTML = `
        <p><strong>Tempo de espera:</strong> ${servico.tempo}</p>
        <p><strong>Preço:</strong> ${servico.preco}</p>
        <p><strong>Passo a passo:</strong> ${servico.passo}</p>
      `;

      modal.classList.remove("hidden");
    }

    container.addEventListener("click", e => {
      const btn = e.target.closest(".btn-abrir");
      if (!btn) return;
      const tituloClicado = btn.dataset.titulo;
      const servico = servicos.find(item => item.titulo === tituloClicado);
      if (servico) abrirModal(servico);
    });

    fecharModal.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

    return;
  }

  const cursos = [
    { titulo: "Meowth", imagem: "../IMG/meowth.png", modalidade: " R$ 150,00", local: "Cidade de Vermelho", resumo: "Foi capturado com uma isca de peixe e um golpe rápido de distração.", video: "", material: "material/meowth.pdf", arquivos: "arquivos/meowth.zip", horas: " 18h30" },
    { titulo: "Ekans", imagem: "../IMG/ekans.png", modalidade: " R$ 180,00", local: "Pinwheel Forest", resumo: "Foi capturado após ser atraído por um saco de comida e preso em uma rede.", video: "", material: "material/ekans.pdf", arquivos: "", horas: " 19h15" },
    { titulo: "Koffing", imagem: "../IMG/koffing.png", modalidade: " R$ 210,00", local: "Caverna do Poço", resumo: "Foi capturado quando a equipe o encurralou com fumaça e uma armadilha de metal.", video: "", material: "material/koffing.pdf", arquivos: "arquivos/koffing.zip", horas: " 17h45" },
    { titulo: "Arbok", imagem: "../IMG/arbok.png", modalidade: " R$ 260,00", local: "Floresta de Viridian", resumo: "Foi capturado após uma perseguição em terreno fechado e uso de uma gaiola.", video: "", material: "material/arbok.pdf", arquivos: "", horas: " 20h00" },
    { titulo: "Persian", imagem: "../IMG/persian.png", modalidade: " R$ 320,00", local: "Rua de Celadon", resumo: "Foi capturado com uma distração de comida e um movimento de cercamento.", video: "", material: "material/persian.pdf", arquivos: "", horas: " 21h10" },
    { titulo: "Pikachu", imagem: "../IMG/pikachu.png", modalidade: " Indeterminado", local: "-", resumo: "Não capturado", video: "", material: "material/pikachu.pdf", arquivos: "", horas: "Previsão de entrega: Até termos algum" },
    { titulo: "Magikarp", imagem: "../IMG/magikarp.png", modalidade: " R$ 120,00", local: "Lago de Johto", resumo: "Foi capturado com um anzol reforçado e muita paciência na margem do lago.", video: "", material: "material/magikarp.pdf", arquivos: "", horas: " 15h45" },
    { titulo: "Weezing", imagem: "../IMG/weezing.png", modalidade: " R$ 280,00", local: "Desfiladeiro de Kanto", resumo: "Foi capturado após ser envolvido por gás de distração e encurralado em terreno estreito.", video: "", material: "material/weezing.pdf", arquivos: "", horas: " 22h00" },
    { titulo: "Mankey", imagem: "../IMG/mankey.png", modalidade: " R$ 170,00", local: "Morro da Montanha", resumo: "Foi capturado em uma corrida leve usando uma rede e uma distração sonora.", video: "", material: "material/mankey.pdf", arquivos: "", horas: " 18h05" },
    { titulo: "Nidoking", imagem: "../IMG/nidoking.png", modalidade: " R$ 390,00", local: "Caverna de Ouro", resumo: "Foi capturado depois de uma investida em terreno acidentado, com armadilha de ferro.", video: "", material: "material/nidoking.pdf", arquivos: "", horas: " 19h40" },
    { titulo: "Nidoqueen", imagem: "../IMG/nidoqueen.png", modalidade: " R$ 360,00", local: "Vale de Granite", resumo: "Foi capturado em uma emboscada de baixa altura e contido com cordas reforçadas.", video: "", material: "material/nidoqueen.pdf", arquivos: "", horas: " 17h15" },
    { titulo: "Snorlax", imagem: "../IMG/snorlax.png", modalidade: " R$ 500,00", local: "Trilha de Vermilion", resumo: "Foi capturado depois de dormir em um ponto de emboscada e ser levado sem resistência.", video: "", material: "material/snorlax.pdf", arquivos: "", horas: " 23h00" },
    { titulo: "Zubat", imagem: "../IMG/zubat.png", modalidade: " R$ 140,00", local: "Toca das Trevas", resumo: "Foi capturado em voo baixo usando redes de seda e um sinal de distração.", video: "", material: "material/zubat.pdf", arquivos: "", horas: " 14h50" },
    { titulo: "Muk", imagem: "../IMG/muk.png", modalidade: " R$ 330,00", local: "Riacho de Fumaça", resumo: "Foi capturado quando o grupo o isolou em uma área estreita e o prendeu com uma bolsa.", video: "", material: "material/muk.pdf", arquivos: "", horas: " 20h30" },
    { titulo: "Pidgeot", imagem: "../IMG/pidgeot.png", modalidade: " R$ 290,00", local: "Pico da Águia", resumo: "Foi capturado em pleno voo após ser encurralado e amarrado por uma linha de captura.", video: "", material: "material/pidgeot.pdf", arquivos: "", horas: " 18h55" },
    { titulo: "Gastly", imagem: "../IMG/gastly.png", modalidade: " R$ 240,00", local: "Cemitério de Saffron", resumo: "Foi capturado na escuridão, com uma armadilha de luz e um brilho de distração.", video: "", material: "material/gastly.pdf", arquivos: "", horas: " 21h25" },
  ];

  const container = document.getElementById("cursosContainer");
  const modal = document.getElementById("cursoModal");
  const titulo = document.getElementById("modalTitulo");
  const resumo = document.getElementById("modalResumo");
  const videoEl = document.getElementById("modalVideo");
  const videoWrapper = document.querySelector(".video-wrapper");
  const modalidade = document.getElementById("modalModalidade");
  const localEl = document.getElementById("modalLocal");
  const linkMaterial = document.getElementById("linkMaterial");
  const linkArquivos = document.getElementById("linkArquivos");
  const fecharModal = document.getElementById("fecharModal");

  function renderCursos(lista) {
    container.innerHTML = "";
    lista.forEach(curso => {
      const card = document.createElement("section");
      card.className = "curso-card";

      const imagem = curso.imagem || "IMG/padrao-pokemon.png";

      card.innerHTML = `
        <img src="${imagem}" alt="Imagem do Pokémon ${curso.titulo}" class="curso-imagem" />
        <h3>${curso.titulo}</h3>
        <div class="curso-detalhes hidden">
          <p><strong>${curso.modalidade}</strong> • ${curso.local}</p>
          <p>${curso.resumo}</p>
        </div>
        <button class="btn-sair btn-abrir" data-titulo="${curso.titulo}">Saiba mais</button>
      `;
      container.appendChild(card);
    });
  }

  renderCursos(cursos);

  const buscaCurso = document.getElementById("buscaCurso");
  const limparBusca = document.getElementById("limparFiltros");

  function pesquisarPokemons() {
    if (!buscaCurso) return;

    const termo = buscaCurso.value.trim().toLowerCase();
    const resultado = cursos.filter(curso =>
      curso.titulo.toLowerCase().includes(termo)
    );

    renderCursos(resultado);
  }

  if (buscaCurso) {
    buscaCurso.addEventListener("input", pesquisarPokemons);
  }

  if (limparBusca) {
    limparBusca.addEventListener("click", () => {
      buscaCurso.value = "";
      renderCursos(cursos);
    });
  }

  function abrirModal(curso) {
    titulo.textContent = curso.titulo;
    resumo.textContent = curso.resumo;
    modalidade.textContent = curso.modalidade;
    localEl.textContent = curso.local || "Unidade de ensino";

    // Player sempre visível com placeholder
    videoWrapper.classList.remove("hidden");
    videoEl.src = curso.video && curso.video.trim()
      ? curso.video
      : "https://www.w3schools.com/html/mov_bbb.mp4";
    videoEl.load();

    // Links de material e arquivos
    linkMaterial.href = curso.material || "material/padrao.pdf";
    linkArquivos.href = curso.arquivos || "arquivos/padrao.zip";

    // Adiciona informações complementares
    const infoSection = document.querySelector(".curso-infos");
    infoSection.innerHTML = `
      <p><strong>Local de captura:</strong> ${curso.local}</p>
      <p><strong>Previsão de entrega:</strong> ${curso.horas}</p>
      <p><strong>Preço:</strong> ${curso.modalidade}</p>
    `;

    modal.classList.remove("hidden");
  }

  container.addEventListener("click", e => {
    const btn = e.target.closest(".btn-abrir");
    if (!btn) return;
    const titulo = btn.dataset.titulo;
    const curso = cursos.find(c => c.titulo === titulo);
    if (curso) abrirModal(curso);
  });

  fecharModal.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.add("hidden"); });

});

// =================== MOSTRAR INFORMAÇÕES DO USUÁRIO NAS OUTRAS PÁGINAS ===================
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const logado = localStorage.getItem("logado");

  // Verifica se o usuário está logado
  if (logado === "true" && usuario) {
    // Cria o elemento de saudação
    const saudacao = document.createElement("p");
    saudacao.textContent = `Bem-vindo, ${usuario.nome.split(" ")[0]}!`;
    saudacao.style.color = "#f40000ff";
    saudacao.style.fontWeight = "bold";
    saudacao.style.marginRight = "10px";

    // Localiza o menu e adiciona a saudação antes do botão de sair ou login
    const nav = document.querySelector(".navbar");
    if (nav && !document.querySelector(".saudacao")) {
      const ul = nav.querySelector(".nav-links");
      const li = document.createElement("li");
      li.classList.add("saudacao");
      li.appendChild(saudacao);
      ul.appendChild(li);
    }
  }
});

