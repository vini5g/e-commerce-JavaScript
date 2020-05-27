function Main()
{
    renderizarCarrinho();
    const tdBody = document.getElementById("tdBodyCarrinho");
    const card = document.getElementById("card");

    tdBody.innerHTML = '';
    card.innerHTML = '';

    const idUsuario = pegarIdUsuario()
    const carrinho = listarCarrinho(idUsuario);

    if (carrinho != 1)
    {
        for (const produto of carrinho) {
            let tr = document.createElement('tr');
            tr.innerHTML += `<td>${produto.nome}</td>`
                         +  `<td>${produto.descricao}</td>`
                         +  `<td>
                                <button class = "btn btn-outline-success" onclick = "addQtd(${produto.produtoId})">
                                    <i class = "fa fa-plus"></i>
                                </button>
                                ${produto.qtd}
                                <button class = "btn btn-apagar" onclick = "removerQtd(${produto.produtoId})">
                                    <i class = "fa fa-minus"></i>
                                </button>
                            </td>`
                         +  `<td>${produto.preco}</td>`
                         +  `<td>
                                <button class = "btn btn-apagar" onclick = "excluirDoCarrinho(${produto.produtoId})">
                                    <i class = "fa fa-trash-o"></i>
                                </button>
                            </td>`
                        
            tdBody.appendChild(tr);
        }
        let resumo = renderizarResumo(idUsuario);
        let total = renderizarTotal(idUsuario);
        card.innerHTML = `<h5 class="card-header">RESUMO DO PEDIDO</h5>
                        <div class="card-body">
                                ${resumo}
                            <hr>
                            <div class="row">
                                ${total}
                            </div>
                            <div class="row mt-4" id="areaButton">
                                <div class="col-12">
                                    <button type="button" id="finalizaCompra" onclick="finalizaCompra(${idUsuario})">Finalizar Compra</button>
                                </div>
                            </div>
                        </div>`                      
    }
    else
    {
        let tr = document.createElement('tr');
        tr.innerHTML += `<th>Não há produtos para serem comprados</th>`;
        tdBody.appendChild(tr);

        const cardBody = document.createElement('div');
        cardBody.setAttribute("class", "cardBody");

        let div = document.createElement('div');
        div.setAttribute('class', 'col-md-12 text-center');
        div.innerHTML += `<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                            <div class="card-header">FINALIZAR COMPRA</div>
                            <div class="card-body">
                                <h5 class="card-title">Não há produtos para serem comprados</h5>
                            </div>
                        </div>`;

        cardBody.appendChild(div);
        card.appendChild(cardBody); 
    }

    
}

function renderizarResumo(idUsuario)
{
    let conteudo = '';

    const carrinho = listarCarrinho(idUsuario);
    if (carrinho != 1)
    {
        for (const produto of carrinho) {
            let preco = Number(produto.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            conteudo += `<div class="row">
                            <div class="col-sm-6">
                                <p class="card-text" id="resumoProduto">${produto.nome}</p>
                            </div>
                            <div class="col-sm-6">
                                <p class="card-text" id="resumoProduto">${produto.qtd}x -- ${preco}</p>
                            </div>
                         </div>`
        }
        return conteudo;
    }
}

function renderizarTotal(idUsuario)
{
    let total = 0;

    const carrinho = listarCarrinho(idUsuario);
    if (carrinho != 1)
    {
        for (const produto of carrinho) {
            total += (Number(produto.preco) * Number(produto.qtd));
        }

        let preco = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        let conteudo = `<div class="col-sm-6">
                            <p class="card-text">Total a pagar: </p>
                        </div>
                        <div class="col-sm-6">
                            <p class="card-text">${preco}</p>
                        </div>`
        return conteudo;
    }
}

function addQtd(produtoId)
{
    const idUsuario = pegarIdUsuario();
    const addQtd = addCarrinho(produtoId, idUsuario);
    if (addQtd == 0)
    {
        Main();
    }
    else if (addQtd == 2)
    {
        Swal.fire({
            icon: 'error',
            title: `Não há mais estoque para este produto`,
        }); 
    }
    
}

function removerQtd(produtoId)
{
    const idUsuario = pegarIdUsuario();
    const removerQtd = removerQtdCarrinho(produtoId, idUsuario);
    if (removerQtd == 0)
    {
        Main();
    }
    else if (removerQtd == 2)
    {
        Swal.fire({
            icon: 'error',
            title: `Quantidade mínima do produto atingida`,
        }); 
    }
    else
    {
        Swal.fire({
            icon: 'error',
            title: `Não foi possível diminuir a quantidade do produto`,
        }); 
    }
}

function excluirDoCarrinho(produtoId)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Quer mesmo remover o item do carrinho?',
        text: "Você não irá poder recuperar ele depois",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, remover!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
            const idUsuario = pegarIdUsuario();
            if (excluirProdutosCarrinho(produtoId, idUsuario) == 0)
            {
                swalWithBootstrapButtons.fire(
                    'Produto removido !!!',
                    'O produto foi removido com sucesso.',
                    'success'
                );
                Main();
            }
            else
            {
                swalWithBootstrapButtons.fire(
                    'Não foi possível remover o produto !!!',
                    'Ocorreu algum erro em remover esse produto, tente novamente',
                    'warning'
                );
            }
        } 
    });
}

function finalizaCompra(idUsuario)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Quer mesmo finalizar a compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, finalizar!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
            if (finalizarCompra(idUsuario) == 0)
            {
                swalWithBootstrapButtons.fire(
                    'Compra realizada com sucesso !!!',
                    'Muito obrigado pela preferência',
                    'success'
                );
                Main();
            }
            else
            {
                swalWithBootstrapButtons.fire(
                    'Não foi possível realizar a compra !!!',
                    'Ocorreu algum erro em realizar a compra, tente novamente',
                    'warning'
                );
            }
        } 
    });
}

