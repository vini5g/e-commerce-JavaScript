function Main()
{
    const tdBody = document.getElementById("tdBodyCadastrados");
    tdBody.innerHTML = '';

    const idUsuario = pegarIdUsuario();
    const contador = listarProdutos(idUsuario).contador;

    if (contador > 0)
    {
        const produtos = listarProdutos(idUsuario).produto;

        for (const produto of produtos) {
            const produtoId = produto.id;
            let tr = document.createElement('tr');
            tr.innerHTML += `<th scope="row">${produto.id}</th>`
                         +  `<td>${produto.nome}</td>`
                         +  `<td>${produto.descricao}</td>`
                         +  `<td>${produto.qtd}</td>`
                         +  `<td>${produto.preco}</td>`
                         +  `<td>${produto.usuarioId}</td>`
                         +  `<td>
                                <button class = "btn btn-alterar" onclick = "loadProdutos(${produtoId})"><i class = "fa fa-edit"></i></button>
                                <button class = "btn btn-apagar" onclick = "deletar(${produtoId})"><i class = "fa fa-trash-o"></i></button>
                            </td>`

            tdBody.appendChild(tr);
        }
    }
    else
    {
        let tr = document.createElement('tr');
        tr.innerHTML += `<th>Não há produto cadastrado !!!</th>`

        tdBody.appendChild(tr);
    }

    renderizarCarrinho();

}

const inputs = document.getElementsByTagName("input");

const btnCadastrar = document.getElementById("btnCadastrar");
btnCadastrar.onclick = () => {
    if(verificaDados() == 1)
    {
        limparTudo(inputs);
        return Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
        });
    }

    const idUsuario = pegarIdUsuario();

    const verificaCadastro = cadastrarProdutos(
        inputs[0].value, 
        inputs[1].value, 
        inputs[2].value, 
        inputs[3].value,
        idUsuario,
    );

    if (verificaCadastro  != 0)
    {
        limparTudo(inputs);
        return Swal.fire({
            icon: 'error',
            title: `Não foi possível cadastrar este produto`,
        });
    }
    if (verificaCadastro == 0)
    {
        Swal.fire({
            icon: 'success',
            title: 'Produto cadastrado com sucesso',
            showConfirmButton: false,
            timer: 1500
        });

        limparTudo(inputs);
        Main();
    }
};

function loadProdutos(produtoId)
{
    const { nome, descricao, qtd, preco } = loadProduto(produtoId);
    inputs[0].value = nome;
    inputs[1].value = descricao;
    inputs[2].value = qtd;
    inputs[3].value = preco;

    const btnAlterar = document.getElementById("btnAlterar");

    btnAlterar.onclick = () => {
        if(verificaDados() == 1){
            limparTudo(inputs);
            return Swal.fire({
                icon: 'error',
                title: 'Preencha todos os campos para alterar o produto',
            });
        }

        const idUsuario = pegarIdUsuario();
        const produtoAlterado = alterarProduto(
            produtoId,
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            inputs[3].value,
            idUsuario
        );

        if (produtoAlterado)
        {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Produto alterado com sucesso'
              })
            limparTudo(inputs);
            Main();
        }
        else
        {
            return Swal.fire({
                icon: 'error',
                title: `Não foi possível alterar este produto`,
            });
        }
    }
}

function deletar(produtoId)
{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Quer mesmo deletar o produto?',
        text: "Você não irá poder recuperar ele depois",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
            const idUsuario = pegarIdUsuario();
            if (excluirProdutos(produtoId, idUsuario) == 0)
            {
                swalWithBootstrapButtons.fire(
                    'Produto deletado !!!',
                    'O produto foi deletado com sucesso.',
                    'success'
                );
                limparTudo(inputs);
                Main();
            }
            else
            {
                swalWithBootstrapButtons.fire(
                    'Não foi possível deletar o produto !!!',
                    'Ocorreu algum erro em deletar esse produto, tente novamente',
                    'warning'
                );
            }
        } 
    });
}

