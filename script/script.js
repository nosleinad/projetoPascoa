lista = [];

function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "produtos.json");
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
        produto.querySelector("img").innerHTML = p.img;
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

function alteraQuantidade(id, quantidade){
    let p = lista[id];
    p.quantidade += quantidade;
    if(p.quantidade < 0) p.quantidade = 0;
    document.getElementsByClassName("quantidade")[id].innerHTML = p.quantidade;
    console.log(quantidade);
}

buscarListaProduto();