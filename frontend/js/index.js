function Main()
{
    if (verificaDados() == 1)
        return Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
        });

    let inputs = document.getElementsByTagName("input");

    let verificarlogin = logar(inputs[0].value, inputs[1].value);

    if (verificarlogin == 1)
    {
        limpar(inputs[0]);
        return Swal.fire({
            icon: 'error',
            title: 'Email não cadastrado',
        });
    }

    if (verificarlogin == 2)
    {
        limpar(inputs[1]);
        return Swal.fire({
            icon: 'error',
            title: 'Senha incorreta',
        });
    }
    
    if (verificarlogin == 0)
    {
        
        window.location = './pages/index.html';
    }
}

function telaCadastro()
{
    window.location = 'cadastro.html';
}