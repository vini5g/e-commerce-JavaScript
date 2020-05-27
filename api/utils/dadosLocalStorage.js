function setarUsuarioLogado(id, nome)
{
    localStorage.setItem("UsuarioId", id);
    localStorage.setItem("UsuarioNome", nome);
}

function removerUsuarioLogado()
{
    localStorage.removeItem('UsuarioId');
    localStorage.removeItem('UsuarioNome');
}

function pegarNomeUsuario()
{
    return localStorage.getItem("UsuarioNome")
}

function pegarIdUsuario()
{
    return localStorage.getItem("UsuarioId")
}

