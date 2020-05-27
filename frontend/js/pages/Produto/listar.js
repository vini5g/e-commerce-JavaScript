function Main()
{
    const areaLista = document.getElementById("listaCompras");
    areaLista.innerHTML = '';

    const idUsuario = pegarIdUsuario();
    const contador = listarProdutosCompra(idUsuario).contador;
    let row = document.createElement('div');
    row.setAttribute('class', 'row mt-1');

    if (contador > 0)
    {
        const produtos = listarProdutosCompra(idUsuario).produto;

        for (const produto of produtos) {
            const produtoId = produto.id;
            let preco = Number(produto.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let div = document.createElement('div');
            div.setAttribute('class', 'col-md-3');
            div.innerHTML = `<div class="card">
                                <div class="card-header">
                                    <h5>${produto.nome}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="text-left" id="card-text">${produto.descricao}</p>
                                    <p class="text-left" id="card-text">Quantidade: 1</p>
                                    <h3 class="card-text text-left mb-3">${preco}</h3>
                                    <button class="btn btn-primary" onclick="comprar(${produtoId})">Comprar</button>
                                </div>
                            </div>`

            areaLista.appendChild(div);
        }
    }
    else
    {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-md-12 text-center');
        div.innerHTML += `<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                            <div class="card-header">Produtos disponíveis</div>
                            <div class="card-body">
                                <h5 class="card-title">Não há produtos disponíveis</h5>
                            </div>
                        </div>`;

        areaLista.appendChild(div);
    }

    renderizarCarrinho();
}

function comprar(produtoId)
{
    const idUsuario = pegarIdUsuario();
    const add = addCarrinho(produtoId, idUsuario);

    if (add == 0)
    {
        Swal.fire({
            icon: 'success',
            title: `Produto adicionado ao carrinho`,
        });
        renderizarCarrinho();
    }
    else if (add == 1)
    {
        Swal.fire({
            icon: 'error',
            title: `Não foi possível adicionar ao carrinho`,
        });
    }
    else
    {
        Swal.fire({
            icon: 'error',
            title: `Não há mais estoque para este produto`,
        }); 
    }
}
