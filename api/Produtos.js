const produtos = JSON.parse(localStorage.getItem('listaProdutos')) || [];

function cadastrarProdutos(nome, descricao, qtd, preco, usuarioId)
{
    let id = Date.now();

    produtos.push({ id, nome, descricao, qtd, preco, usuarioId });
    localStorage.setItem('listaProdutos', JSON.stringify(produtos));
    
    return 0;
}

function listarProdutos(usuarioId)
{
    let objListar = {};
    let produtosDoUsuario = [];
    let contador = 0;

    for (const produto of produtos) {
        if (produto.usuarioId == usuarioId)
        {
            produtosDoUsuario.push(produto);
            contador++;
        }
    }

    objListar.produto = produtosDoUsuario;
    objListar.contador = contador;
    return objListar;
}

function listarProdutosCompra(usuarioId)
{
    let objListar = {};
    let produtosCompra = [];
    let contador = 0;

    for (const produto of produtos) {
        if (produto.usuarioId != usuarioId)
        {
            produtosCompra.push(produto);
            contador++;
        }
    }

    objListar.produto = produtosCompra;
    objListar.contador = contador;
    return objListar;
}

function loadProduto(produtoId)
{
    const produto = produtos.find((item)=>{
        if(item.id == produtoId)
            return item;
    });

    return produto;
}

function excluirProdutos(produtoId, usuarioId)
{
    const pos = produtos.findIndex((item) => {
        if (item.id == produtoId && item.usuarioId == usuarioId)
            return item;
    });

    if (pos)
    {
        localStorage.removeItem('listaProdutos'); 
        produtos.splice(pos, 1);
        localStorage.setItem('listaProdutos', JSON.stringify(produtos));

        return 0;
    }
    else
    {
        return 1;
    }
}

function alterarProduto(id, nome, descricao, qtd, preco, usuarioId)
{
    const produto = produtos.find((item) => {
        if (item.id == id && item.usuarioId == usuarioId)
            return item;
    })

    if (produto)
    {
        const produto = produtos.map((item) => {
            if(item.id == id)
            {
                item.nome = nome; 
                item.descricao = descricao;
                item.qtd = qtd;
                item.preco = preco;
            }
        });
        localStorage.setItem('listaProdutos', JSON.stringify(produtos));
        return produto;
    }
    else
    {
        return 1;
    }
}

const produtosCarrinho = JSON.parse(localStorage.getItem('Carrinho')) || [];

function addCarrinho(produtoId, usuarioId)
{
    const produto = produtos.find((item) => item.id == produtoId);
    if (produto)
    {
        const { nome, descricao, preco } = produto;

        const produtoCarrinho = produtosCarrinho.find((item) => {
            if (item.produtoId == produtoId)
                return item
        });

        if (produtoCarrinho)
        { 
            const { qtd } = produtoCarrinho;

            let qtde = Number(qtd) + 1;

            if (qtde > produto.qtd)
            {
                return 2;
            }

            produtosCarrinho.map((item) => {
                    if (item.produtoId == produtoId)
                        item.qtd = qtde;
            });
        }
        else
        {
            produtosCarrinho.push({ 
                produtoId,
                nome,
                descricao,
                qtd: 1,
                preco,
                usuarioId
            });
        }
        localStorage.setItem("Carrinho", JSON.stringify(produtosCarrinho));
        return 0;
    }
    else
    {
        return 1;
    }
}

function removerQtdCarrinho(produtoId, usuarioId)
{
    const produto = produtos.find((item) => item.id == produtoId);
    if (produto)
    {
        const { nome, descricao, preco } = produto;

        const produtoCarrinho = produtosCarrinho.find((item) => {
            if (item.produtoId == produtoId)
                return item
        });

        if (produtoCarrinho)
        { 
            const { qtd } = produtoCarrinho;

            let qtde = Number(qtd) - 1;

            if (qtde <= 0)
            {
                return 2;
            }

            produtosCarrinho.map((item) => {
                    if (item.produtoId == produtoId)
                        item.qtd = qtde;
            });
        }
        localStorage.setItem("Carrinho", JSON.stringify(produtosCarrinho));
        return 0;
    }
    else
    {
        return 1;
    }
}

function listarCarrinho(usuarioId)
{
    const produto = produtosCarrinho.filter((item) => item.usuarioId == usuarioId);

    if (produto.length != 0)
    {
        return produto;
    }
    else
    {
        return 1;
    }
}

function finalizarCompra(usuarioId)
{
    const produtosLista = produtosCarrinho.filter((item) => item.usuarioId == usuarioId);
    if (produtosLista.length != 0)
    {
        for (const produto of produtosLista)
        {
            let qtde = Number(produto.qtd);
            
            produtos.map((item, index)=>{
                if (item.id == produto.produtoId)
                {
                    let novaQtd = Number(item.qtd) - qtde;
                    
                    if (novaQtd <= 0)
                    {
                        produtos.splice(index, 1);
                    }
                    else
                    {
                        item.qtd = novaQtd;
                    }
                }
            });

            for (const produto of produtosLista) {
                let pos = produtosLista.findIndex((item)=>item.produtoId == produto.produtoId);
                produtosCarrinho.splice(pos, 1);
            }
        }

        localStorage.setItem('listaProdutos', JSON.stringify(produtos));
        localStorage.setItem("Carrinho", JSON.stringify(produtosCarrinho));
        return 0;
    }
    else
    {
        return 1;
    }
}

function excluirProdutosCarrinho(produtoId, idUsuario)
{
    const pos = produtosCarrinho.findIndex((item) => {
        if (item.produtoId == produtoId && item.usuarioId == idUsuario)
            return item;
    });
    console.log(produtoId, idUsuario, pos);
    if (pos != -1)
    { 
        produtosCarrinho.splice(pos, 1);
        localStorage.setItem('Carrinho', JSON.stringify(produtosCarrinho));

        return 0;
    }
    else
    {
        return 1;
    }
}