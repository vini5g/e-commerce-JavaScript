const inputs = document.getElementsByTagName("input");

function Main()
{
    const idUsuario = pegarIdUsuario();
    const { nome, endereco, telefone, email, senha, cidade } = listar(idUsuario);
    inputs[0].value = nome;
    inputs[1].value = endereco;
    inputs[2].value = telefone;
    inputs[3].value = email;
    inputs[4].value = senha;
    inputs[5].value = cidade;

    renderizarCarrinho();
}

const btnAlterar = document.getElementById("alterar");
const btnDeletar = document.getElementById("deletar");

btnAlterar.onclick = () => {
    const idUsuario = pegarIdUsuario();
    const usuarioAlterado = alterarUsuario(
        idUsuario,
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        inputs[3].value,
        inputs[4].value,
        inputs[5].value
    );
    if(usuarioAlterado == 0)
    {
        return Swal.fire({
            icon: 'success',
            title: 'Usuário alterado com sucesso',
        });
        Main();
    }
}

btnDeletar.onclick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn-confirmar',
          cancelButton: 'btn-cancelar'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Quer mesmo deletar este Usuário?',
        text: "Você não irá poder recuperá-lo depois",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'cancelar!',
    }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) 
        {
            const idUsuario = pegarIdUsuario();

            if (excluirUsuario(idUsuario) == 0)
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuário deletado com sucesso',
                    showConfirmButton: true,
                }).then(() => {
                    window.location = '../../index.html';
                });
            }
        } 
    });
}


