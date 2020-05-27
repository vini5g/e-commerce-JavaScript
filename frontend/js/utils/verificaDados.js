function verificaDados()
{
    let inputs = document.getElementsByTagName("input");
    for (input of inputs)
    {
        if (input.value == '')
            return 1;
    }
}