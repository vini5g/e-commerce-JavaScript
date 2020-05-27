function Main()
{
    if (verificaDados() == 1)
    {
        return Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
        });
    }

    let inputs = document.getElementsByTagName("input");

    const verificaCadastro = cadastrarUsuario(
        inputs[0].value, 
        inputs[1].value, 
        inputs[2].value, 
        inputs[3].value, 
        inputs[4].value, 
        inputs[5].value
    );

    if (verificaCadastro == 1)
    {
        limpar(inputs[3]);
        return Swal.fire({
            icon: 'error',
            title: `Este email pertence a outro usuário`,
        });
    }
    if (verificaCadastro == 0)
    {
        Swal.fire({
            icon: 'success',
            title: 'Usuário cadastrado com sucesso',
            showConfirmButton: true,
        }).then(() => {
            window.location = './pages/index.html';
        });
    }
}

function voltar()
{
    window.location = 'index.html';
}
