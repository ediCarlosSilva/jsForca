const criaJogo = sprite => {

    let etapa = 1;
    let palavraSecreta = '';
    let lacunas = [];
    // etapa 1: informar a palavra secreta através de setPalavraSecreta
    // estapa 2: leitura dos chutes, após setPalavras

    const criaLacunas = () => {
        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
        }

        // outra maneira de preencher as lacunas
        // lacunas = Array(palavraSecreta.length).fill('');
    };

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {

        if (!palavra.trim()) throw Error("Palavra inválida");

        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    const processaChute = chute => {

        if (!chute.trim()) throw Error('Chute Inválido');

        const exp = new RegExp(chute, 'gi');
        let resultado,
            acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            acertou = lacunas[resultado.index] = chute;
            // alert(acertou);
        }

        if (!acertou) {
            sprite.nextFrame();
        }

        return acertou;
        // minha implementação:
        // var temLetra = false;

        // for (var i = 0; i < palavraSecreta.length; i++) {
        //     if (palavraSecreta[i] == letra) {
        //         lacunas[i] = letra;
        //         temLetra = true;
        //     }
        // }

        // if (!temLetra) {
        //     sprite.nextFrame();
        // }

        // return temLetra;
    };

    const ganhou = () => {

        return lacunas.length ? !lacunas.some(function(lacuna) { return lacuna == ''; }) : false;

        // minha implentação:
        // var venceu = false;

        // var preencheu = 0;

        // if (lacunas.length != 0) {
        //     lacunas.forEach(function(elemento) {
        //         if (elemento != '') {
        //             preencheu++;
        //         }
        //     });
        // }

        // if (preencheu == palavraSecreta.length) {
        //     venceu = true;
        // }

        // return venceu;
    };

    const perdeu = () => sprite.isFinished();

    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {
        etapa = 1;
        lacunas = [];
        sprite.reset();
        palavraSecreta = '';
    };

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
};