function verificaEmail(email)
{
    return usuarios.find((item)=> item.email == email);
}

function verificaSenha(senha)
{
    return usuarios.find((item)=> item.senha == senha);
}

function verificarUsuarioPeloId(id)
{
    return usuarios.find((item) => {
        if(item.id == id)
            return item
    })
}

function verificarUsuarioPelaPosicao(id)
{
    return usuarios.findIndex((item) => item.id == id);
}