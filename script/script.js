lista = [];

function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "https://nosleinad.github.io/projetoPascoa/produtos.json");
    ajax.send();
    ajax.onload = function () {
        lista = JSON.parse(this.response);
        replicar();
    }
}

function replicar() {
    let i = 0;
    for (const p of lista) {
        let id = i;
        let produto = document.querySelector(".produto").cloneNode(true);
        produto.querySelector(".titulo").innerHTML = p.nome;
        produto.querySelector("img").src = `https://nosleinad.github.io/projetoPascoa/img/${p.img}`;
        produto.querySelector(".valor").innerHTML = `R$ ${p.valor}`;
        produto.querySelector(".descricao").innerHTML = p.descricao;
        produto.querySelector(".quantidade").innerHTML = p.quantidade;

        produto.querySelector(".menos").addEventListener("click", function () { alteraQuantidade(id, -1) });
        produto.querySelector(".mais").addEventListener("click", function () { alteraQuantidade(id, 1) });

        document.querySelector(".lista").append(produto);
        i++;
    }
    document.querySelector(".produto").remove();
}

function alteraQuantidade(id, quantidade) {
    let p = lista[id];
    p.quantidade += quantidade;
    if (p.quantidade < 0) p.quantidade = 0;
    document.getElementsByClassName("quantidade")[id].innerHTML = p.quantidade;
    console.log(quantidade);
}

function mostrarPedidos() {
    let msgModal = "";
    let subTotal = 0;
    let total = 0;

    for (const produto of lista) {
        subTotal = (produto.valor * produto.quantidade).toFixed(2);
        total += subTotal;

        if (produto.quantidade > 0) {
            msgModal += `<p>${produto.nome.toUpperCase()} (R$ ${produto.valor} x ${produto.quantidade} = R$ ${subTotal})</p> `

        }
    }
   

    if (msgModal == "") {
        msgModal = `<p>Nenhum produto Selecionado.</p>`
        document.querySelector("#btEnviar").disabled = "disabled";
    } else {
        document.querySelector("#btEnviar").disabled = "";
    }

    document.querySelector(".modal-body").innerHTML = msgModal;
}

buscarListaProduto();