const usuarios = JSON.parse(localStorage.getItem('listaUsuario')) || [];

function cadastrarUsuario(nome, endereco, telefone, email, senha, cidade)
{   
    let id = Date.now();

    if (verificaEmail(email))
    {
        return 1;
    }

    usuarios.push({ id, nome, endereco, telefone, email, senha, cidade });
    
    localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
    setarUsuarioLogado(id, nome);
    return 0;
}

function logar(email, senha)
{
    if (!verificaEmail(email))
    {
        return 1;
    }
    else if (!verificaSenha(senha))
    {
        return 2;
    }
    else
    {
        let usuario = usuarios.find((item)=>{
            if (item.email == email && item.senha == senha) 
                return item;
        });
        setarUsuarioLogado(usuario.id, usuario.nome);
        return 0;
    }
}

function listar(id)
{
    return usuarios.find((item) => {
        if(item.id == id)
            return item
    })
}

function alterarUsuario(id, nome, endereco, telefone, email, senha, cidade)
{
    const usuario = verificarUsuarioPeloId(id);
    if(usuario)
    {
        localStorage.removeItem('listaUsuario');
        usuarios.map((item) => {
            if(item.id == usuario.id)
            {
                item.nome = nome;
                item.endereco = endereco;
                item.telefone = telefone;
                item.email = email;
                item.senha = senha;
                item.cidade = cidade;
            }
        });
        setarUsuarioLogado(id, nome);
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
        return 0;
    }
    else
    {
        return 1;
    }
}

function excluirUsuario(id)
{
    const usuario = verificarUsuarioPeloId(id);
    if(usuario)
    {
        const posUsuario = verificarUsuarioPelaPosicao(id);

        usuarios.splice(posUsuario, 1);
        localStorage.setItem('listaUsuario', JSON.stringify(usuarios));
        
        const listaProdutos = produtos.filter((item) => item.usuarioId == usuario.id);
        const listaCarrinho = produtosCarrinho.filter((item) => item.usuarioId == usuario.id);

        if (listaProdutos.length != 0)
        {
            for (const produto of listaProdutos) 
            {
                excluirProdutos(produto.id, usuario.id);
            }
        }

        if (listaCarrinho.length != 0)
        {
            for (const produto of listaCarrinho) 
            {
                excluirProdutosCarrinho(produto.id, usuario.id);
            }
        }

        removerUsuarioLogado();
        return 0;
    }
    else
    {
        return 1;
    }
}
