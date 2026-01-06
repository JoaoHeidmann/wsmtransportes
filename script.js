/* ===============================
   PROTEÇÃO DE LOGIN (OBRIGATÓRIO)
================================ */
const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "login.html";
}

/* ===============================
   MOSTRAR USUÁRIO LOGADO + SAIR
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const spanUsuario = document.getElementById("usuarioLogado");
    const btnSair = document.getElementById("btnSair");

    if (spanUsuario) {
        spanUsuario.textContent = usuarioLogado;
    }

    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
        });
    }
});

/* ===============================
   AGENDAMENTO DE NOTA FISCAL
================================ */
const form = document.getElementById("formNF");
const listaNF = document.getElementById("listaNF");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nf = document.getElementById("nf").value;
        const volumes = document.getElementById("volumes").value;
        const remetente = document.getElementById("remetente").value;
        const destinatario = document.getElementById("destinatario").value;
        const dataInput = document.getElementById("dataAgendamento").value;
        const motorista = document.getElementById("motorista").value;

        const dataFormatada = formatarDataComDiaSemana(dataInput);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${nf}</td>
            <td>${volumes}</td>
            <td>${remetente}</td>
            <td>${destinatario}</td>
            <td>${dataFormatada}</td>
            <td>${motorista}</td>
            <td class="status agendada">Agendada</td>
            <td>
                <select onchange="alterarStatus(this)">
                    <option value="Agendada">Agendada</option>
                    <option value="Em Transporte">Em Transporte</option>
                    <option value="Entregue">Entregue</option>
                </select>
                <button class="btn-excluir" onclick="excluirAgendamento(this)">🗑️</button>
            </td>
        `;

        listaNF.appendChild(tr);
        form.reset();
    });
}

/* ===============================
   EXCLUIR AGENDAMENTO
================================ */
function excluirAgendamento(botao) {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
        botao.closest("tr").remove();
    }
}

/* ===============================
   ALTERAR STATUS
================================ */
function alterarStatus(select) {
    const statusTd = select.closest("tr").querySelector(".status");
    const status = select.value;

    statusTd.textContent = status;
    statusTd.className = "status";

    if (status === "Agendada") {
        statusTd.classList.add("agendada");
    } else if (status === "Em Transporte") {
        statusTd.classList.add("em-transporte");
    } else {
        statusTd.classList.add("entregue");
    }
}

/* ===============================
   FILTRO DE STATUS
================================ */
function filtrarStatus() {
    const filtro = document.getElementById("filtroStatus").value;
    const linhas = document.querySelectorAll("#listaNF tr");

    linhas.forEach(linha => {
        const status = linha.querySelector(".status").textContent;
        linha.style.display =
            filtro === "Todos" || status === filtro ? "" : "none";
    });
}

/* ===============================
   DATA COM DIA DA SEMANA
================================ */
function formatarDataComDiaSemana(data) {
    const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    const [ano, mes, dia] = data.split("-");
    const dataObj = new Date(ano, mes - 1, dia);
    const diaSemana = diasSemana[dataObj.getDay()];

    return `${dia}/${mes}/${ano} – ${diaSemana}`;
}
