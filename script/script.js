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
    /*  console.log(quantidade); */
}
let msgModal = "";


function mostrarPedidos() {
    msgModal = "";
    let subTotal = 0;
    let total = 0;

    for (const produto of lista) {

        if (produto.quantidade > 0) {
            subTotal = (produto.valor * produto.quantidade).toFixed(2);
            total += +subTotal;
            msgModal += `<p>${produto.nome.toUpperCase()} (R$ ${produto.valor} x ${produto.quantidade} = <b>R$ ${subTotal}</b>)</p> `;

        }
    }

    if (msgModal == "") {
        msgModal = `<p>Nenhum produto Selecionado.</p>`;
        document.querySelector("#btEnviar").disabled = "disabled";
    } else {
        msgModal += `<b>Total: R$ ${total.toFixed(2)}</b>`;
        document.querySelector("#btEnviar").disabled = "";
    }

    document.querySelector(".modal-body").innerHTML = msgModal;
}

function enviar() {

    let fone = '5561982222994';
    msgModal = msgModal.replaceAll("<p>", "").replaceAll("</p>", "\n");
    msgModal = msgModal.replaceAll("<b>", "*").replaceAll("</b>", "*");
    let nome = document.querySelector("#nome").value;
    let endereco = document.querySelector("#endereco").value;
    msgModal += `\n\nOlá me chamo *${nome.toUpperCase()}*, desejo fazer um pedido.`;
    msgModal += `\nMeu endereço é: *${endereco.toUpperCase()}*`;
    msgModal = encodeURI(msgModal);

    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msgModal}`;
    window.open(link, '_blanck')
}

buscarListaProduto();
