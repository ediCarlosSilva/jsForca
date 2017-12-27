const criaController = jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

    const exibeLacunas = () => {

        $lacunas.empty();
        jogo.getLacunas().forEach(function(lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });

        // minha implementação
        // jogo.setPalavraSecreta($entrada.val());
        // var lacunasJogo = jogo.getLacunas();
        // // console.log(lacunasJogo);
        // // for (var i = 0; i < lacunasJogo.length; i++) {
        // //     var li = $('<li>');
        // //     li.addClass('lacuna');
        // //     li.append(lacunasJogo[i]);
        // //     $lacunas.append(li);
        // // }
        // lacunasJogo.forEach(function(lacuna) {
        //     var li = $('<li>');
        //     li.addClass('lacuna');
        //     li.append(lacuna);
        //     $lacunas.append(li);
        // });

        // console.log(jogo.getEtapa());
    };

    // muda o texto do placeHolder do campo de entrada    
    const mudaPlaceHolder = texto => {

        $entrada
            .val('')
            .attr('placeholder', texto);

    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    const guardaPalavraSecreta = () => {

        try {
            // passa para o jogo a palavra secreta digitada pelo usuario
            jogo.setPalavraSecreta($entrada.val().trim());

            // limpa o campo de entrada
            $entrada.val('');

            // exibe para o usuario as lacunas do jogo.getLacunas();
            exibeLacunas();

            // muda o texto do placeholder para chute
            mudaPlaceHolder('chute');
        } catch (err) {
            alert(err.message);
        }


    };

    const reinicia = () => {
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('Palavra Secreta');
    };

    const leChute = () => {

        try {
            // lê a entrada do usuário. envia para o jogo a entrada do usuário
            var chute = $entrada.val().trim().substr(0, 1);
            jogo.processaChute(chute);

            // limpa a entrada do usuário
            $entrada.val('');

            // exibe as lacunas as letras se acertou alguma. o processa chute atualiza o sprite(a forca)
            exibeLacunas();

            if (jogo.ganhouOuPerdeu()) {

                // atrasando a atualizacao do dom em 200 milisegundos
                setTimeout(() => {
                    if (jogo.ganhou()) {
                        alert("Você Venceu!!!!");
                    } else {
                        alert("Você Perdeu");
                    }

                    reinicia();
                }, 200);

            }
        } catch (err) {
            alert(err.message);
        }

    }

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    const inicia = () => {

        $entrada.keypress(event => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        // alert('etapa 1 - falta implementar');
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia };

};