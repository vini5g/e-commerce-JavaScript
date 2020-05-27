function Main(){
    const nomeUsuario = pegarNomeUsuario();
    const idUsuario = pegarIdUsuario();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: `Olá ${nomeUsuario}`
    });
    
    document.getElementById('usuario').innerHTML = nomeUsuario;
    renderizar(document.getElementById('elementoManipulavel'), listarProdutos(idUsuario).contador);
    renderizarCarrinho();
};

