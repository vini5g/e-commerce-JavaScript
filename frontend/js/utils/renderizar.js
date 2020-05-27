function renderizar(tagHTML, valor)
{
    tagHTML.innerHTML = valor;
}

function renderizarCarrinho()
{
    const usuarioId = pegarIdUsuario();
    const badge = document.getElementById('carrinhoDeCompras');

    const produtos = listarCarrinho(usuarioId);
    if(produtos.length == undefined)
    {
        badge.innerHTML = 0;
    }
    else
    {
        badge.innerHTML = produtos.length;
    }
}