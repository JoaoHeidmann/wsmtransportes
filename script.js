const form = document.getElementById("formNF");
const listaNF = document.getElementById("listaNF");

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

/* ===== EXCLUIR ===== */
function excluirAgendamento(botao) {
    const confirmar = confirm("Tem certeza que deseja excluir este agendamento?");
    if (confirmar) {
        botao.closest("tr").remove();
    }
}

/* ===== STATUS ===== */
function alterarStatus(select) {
    const statusTd = select.parentElement.parentElement.querySelector(".status");
    const status = select.value;

    statusTd.textContent = status;
    statusTd.className = "status";

    if (status === "Agendada") {
        statusTd.classList.add("agendada");
    } else if (status === "Em Transporte") {
        statusTd.classList.add("em-transporte");
    } else if (status === "Entregue") {
        statusTd.classList.add("entregue");
    }
}

/* ===== FILTRO ===== */
function filtrarStatus() {
    const filtro = document.getElementById("filtroStatus").value;
    const linhas = document.querySelectorAll("#listaNF tr");

    linhas.forEach(linha => {
        const status = linha.querySelector(".status").textContent;
        linha.style.display = (filtro === "Todos" || status === filtro) ? "" : "none";
    });
}

/* ===== DATA ===== */
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
