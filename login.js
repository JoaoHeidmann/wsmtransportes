const usuarios = [
    { user: "MARINA", pass: "2021" },
    { user: "JOAO", pass: "2020" },
];

// LOGIN COM LOADING
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = this.querySelector("button");
    const usuario = usuarioInput().value;
    const senha = senhaInput().value;
    const erro = document.getElementById("erro");

    btn.classList.add("loading");
    erro.textContent = "";

    setTimeout(() => {
        const valido = usuarios.find(
            u => u.user === usuario && u.pass === senha
        );

        btn.classList.remove("loading");

        if (valido) {
            localStorage.setItem("logado", "true");
            window.location.href = "index.html";
        } else {
            erro.textContent = "Usuário ou senha inválidos";
        }
    }, 1200);
});

// MOSTRAR / OCULTAR SENHA
function mostrarSenha() {
    const input = document.getElementById("senha");
    input.type = input.type === "password" ? "text" : "password";
}

// MODO CLARO / ESCURO
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

// MANTER TEMA SALVO
if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
}

// Helpers
function usuarioInput(){ return document.getElementById("usuario"); }
function senhaInput(){ return document.getElementById("senha"); }
