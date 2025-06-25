let usuarioLogado = false;

window.onload = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    document.getElementById('Login').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    usuarioLogado = true;
    iniciarPainel();
  } else {
    document.getElementById('Login').style.display = 'block';
    document.getElementById('painel').style.display = 'none';
  }
};

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('authToken', data.token);
    document.getElementById('Login').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    usuarioLogado = true;
    iniciarPainel();
  } else {
    document.getElementById('errorMessage').style.display = 'block';
  }
});

function iniciarPainel() {
  carregarStatus();
  carregarClientes();
  carregarConfiguracoes();
  showSection('status');
  setInterval(carregarStatus, 5000);
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.card');
  sections.forEach(section => section.style.display = 'none');
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'block';
}

async function carregarStatus() {
  const res = await fetch('/status');
  const data = await res.json();
  const statusEl = document.getElementById('statusBot');
  const qrContainer = document.getElementById('qrContainer');
  const qrCode = document.getElementById('qrCode');

  if (data.conectado) {
    statusEl.innerText = "✅ Bot Conectado!";
    qrContainer.style.display = 'none';
  } else {
    statusEl.innerHTML = "<div class='loading'></div>";
    qrContainer.style.display = 'block';
  }

  if (data.qr_code) qrCode.src = data.qr_code;
}

async function carregarClientes() {
  const res = await fetch('/clientes');
  const clientes = await res.json();
  const tabela = document.getElementById('tabelaClientes');
  tabela.innerHTML = '<tr><th>Nome</th><th>WhatsApp</th><th>Vencimento</th><th>Ação</th></tr>';

  clientes.forEach(cliente => {
    tabela.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.whatsapp}</td>
        <td>${cliente.data_expiracao}</td>
        <td><button onclick="removerCliente('${cliente.whatsapp}')">❌</button></td>
      </tr>
    `;
  });
}

async function adicionarCliente() {
  const nome = document.getElementById('nome').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const data_expiracao = document.getElementById('data_expiracao').value;

  await fetch('/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, whatsapp, data_expiracao }),
  });

  carregarClientes();
}

async function removerCliente(whatsapp) {
  await fetch(`/clientes/${whatsapp}`, { method: 'DELETE' });
  carregarClientes();
}

async function carregarConfiguracoes() {
  const res = await fetch('/configuracoes');
  const data = await res.json();
  document.getElementById('access_token').value = data.access_token;
  document.getElementById('empresaNome').value = data.empresaNome;
  document.getElementById('plano1m').value = data.planos['1m'];
  document.getElementById('plano6m').value = data.planos['6m'];
  document.getElementById('plano1a').value = data.planos['1a'];
}

async function atualizarConfiguracoes() {
  const access_token = document.getElementById('access_token').value;
  const empresaNome = document.getElementById('empresaNome').value;
  const planos = {
    '1m': document.getElementById('plano1m').value,
    '6m': document.getElementById('plano6m').value,
    '1a': document.getElementById('plano1a').value,
  };

  const res = await fetch('/configuracoes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token, empresaNome, planos }),
  });

  const result = await res.json();
  alert(result.message);
}

function salvarMensagens() {
  alert('Mensagens já estão configuradas no código!');
}
 // Função para exibir a seção de login
    function showLogin() {
      document.getElementById('Login').style.display = 'block';
      document.getElementById('painel').style.display = 'none';
      document.getElementById('tutorial').style.display = 'none';
    }

    // Função para exibir as seções do painel
    function showSection(sectionId) {
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'none';
      });
      document.getElementById(sectionId).style.display = 'block';
    }

    // Função para mostrar tutorial de conexão
    function showTutorial() {
      document.getElementById('tutorial').style.display = 'block';
      document.getElementById('Login').style.display = 'none';
    }

    // Chama a função de login após a submissão do formulário
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;

      if (usuario === 'admin' && senha === 'senha123') {
        document.getElementById('Login').style.display = 'none';
        document.getElementById('painel').style.display = 'block';
      } else {
        document.getElementById('errorMessage').style.display = 'block';
      }
    });