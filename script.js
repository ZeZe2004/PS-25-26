// ── Ponto 4 ──────────────────────────────────────────────────────────────────
// Altera o texto do h1 para "Olá, mundo!" quando a página for carregada
const h1 = document.querySelector("h1");
h1.textContent = "Olá, mundo!";

// ── Pontos 1, 3 & 5 ──────────────────────────────────────────────────────────
// Obter o elemento botão
const botao = document.getElementById("botao");

// Adicionar um event handler ao botão
botao.addEventListener("click", function() {
  // Ponto 3: Muda o texto do h1 para "Botão clicado!"
  h1.textContent = "Botão clicado!";

  // Ponto 5: Muda a cor de fundo do h1 para vermelho
  h1.style.backgroundColor = "red";
  h1.style.color = "white";
});

// ── Ponto 6 ──────────────────────────────────────────────────────────────────
// Campo de texto que imprime o valor na consola ao pressionar Enter
const campo = document.getElementById("campo");

campo.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("Valor do campo:", campo.value);
  }
});

// ── Ponto 7 ──────────────────────────────────────────────────────────────────
// Lista: remove o elemento ao clicar nele
const lista = document.getElementById("lista");

lista.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});
