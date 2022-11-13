
/* Funções que decidem se as informações dos investimentos
aparecerão ou não (BOTÃO SAIBA MAIS). -*/
function TSC() {
    const inf = document.querySelector(".infos")
    if (inf.style.display === "block") {
        $("#infos").slideToggle("slow")
    } else {
        $("#infos").slideToggle("slow")
    }
}
function IP() {
    const inf = document.querySelector(".infos2")
    if (inf.style.display === "block") {
        $("#IP").slideToggle("slow")
    } else {
        $("#IP").slideToggle("slow")
    }
}
function PPC() {
    const inf = document.querySelector(".infos3")
    if (inf.style.display === "block") {
        $("#PPC").slideToggle("slow")
    } else {
        $("#PPC").slideToggle("slow")
    }
}   
function RVB() {
    const inf = document.querySelector(".infos4")
    if (inf.style.display === "block") {
        $("#RVB").slideToggle("slow")
    } else {
        $("#RVB").slideToggle("slow")
    }
}   
/*----------------------*/


// Inicio do script.
$(function() {
    
    start();
    
    function start(){
        $("#screen2").hide();
        
        // Função que gera os meses e anos.
        (function() {
            for (let months = 1; months <= 600; months++) {
                const value = months;
                
                // Formata os meses e anos de forma 
                // que seja melhor compreendido.*/
                const text = Math.floor(months / 12) != 0
                ? Math.floor(months / 12) + " anos e " + months % 12 + " meses" 
                : months % 12 + " meses";
                
                // Manda o texto com meses e anos
                // para a pagina.
                const optionElement = $("<option></option>");
                optionElement.val(value);
                optionElement.text(text);

                $("#contributionTime").append(optionElement);
            }
        })();
    }

    //Animações suaves de mostrar e esconder
    //algum elemento.
    function changeScreen(){
        $("#screen1").slideToggle("slow");
        $("#screen2").fadeToggle("slow");
    }
    
    //Verifica os campos input's e adiciona
    //funções a eles
    $("#inputForm").on("submit", function() { 
        
        // Input que solicita o nome do usuário.
        const name = $("#name").val();
        // Input que solicita a mensalidade.
        const payment = $("#payment").val();
        // Input que solicita o aporte inicial.
        const valueInit = $("#value-init").val();
        // Input qye solicita o tempo de contribuição.
        const tempoDeContribuicao = $("#contributionTime").val();
        // Tempo de contribuição formatado.
        const tempoDeContribuicao_formatted = $(`#contributionTime option[value='${tempoDeContribuicao}']`).text();
        const interestRate = 0.517 / 100;

        // Valida os inputs.
        if (name === "" || name === undefined){
            return 0;
        }
        if (parseFloat(payment) <= 0 || isNaN(parseFloat(payment))){ // Checking if payment it's a number and if it's positive
            return 0;
        }
        
        // Multiplica o valor total pelo meses.
        let montante = parseFloat(valueInit) + (parseFloat(payment) * tempoDeContribuicao)

        // Valores dos investimentos.
        tesouroSelic = 0
        IPCA = 0
        poupança = 0
        rendaVariavel = 0
        
        // Juros.
        jurosTotalTS = 0
        jurosTotalIPCA = 0
        jurosTotalPP = 0
        jurosTotalRV = 0
        
        // Valor mensal e inicial formatados.
        valorMensalRV = parseFloat(payment) 
        valorMensalTS = parseFloat(payment)
        valorMensalIPCA = parseFloat(payment)
        valorMensalPP = parseFloat(payment)

        valorInicialRV = parseFloat(valueInit)
        valorInicialTS = parseFloat(valueInit)
        valorInicialIPCA = parseFloat(valueInit)
        valorInicialPP = parseFloat(valueInit)

        // Calcula as taxas e soma mês a mês.
        for (var i = 0; i < tempoDeContribuicao; i++) {
            
            // Cálculo de taxa TESOURO SELIC.
            tesouroSelic = (valorInicialTS * 1.07) / 100
            jurosTotalTS += tesouroSelic
            valorInicialTS += tesouroSelic + valorMensalTS
            
            // Cálculo de taxa TESOURO IPCA +.
            IPCA = (valorInicialIPCA * 0.4) / 100
            jurosTotalIPCA += IPCA
            valorInicialIPCA += IPCA + valorMensalIPCA
            
            // Cálculo de taxa POUPANÇA.
            poupança = (valorInicialPP * 0.5) / 100
            jurosTotalPP += poupança
            valorInicialPP += poupança + valorMensalPP
            
            //Cálculo de taxa RENDA VARIÁVEL.
            rendaVariavel = (valorInicialRV * 1.53) / 100
            jurosTotalRV += rendaVariavel
            valorInicialRV += rendaVariavel + valorMensalRV
        }

        // Soma o montante + juros
        let totalTS = montante + jurosTotalTS
        let totalIPCA = montante + jurosTotalIPCA
        let totalPP = montante + jurosTotalPP
        let totalRV = montante + jurosTotalRV
        
        // Formata os resultados obtidos nos
        // cálculos para uma melhor visualização.
        let RV_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(totalRV)
        let CDI_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(totalTS)
        let IPCA_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(totalIPCA)
        let PP_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(totalPP)
        let jctTS_F = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(tesouroSelic)
        let jctRV_F = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(rendaVariavel)
        let jctPP_F = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(poupança)
        let jctIPCA_F = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(IPCA)
        
        // Manda os resultados dos cálculos
        // para a página.
        $("#TS").html("Valor Total: " + CDI_Format)
        $("#IPCA").html(IPCA_Format)
        $("#PP").html(PP_Format)
        $("#RV").html("Valor Total: " + RV_Format)
        
        const infRV = jctRV_F + ' ao mês'
        $("#RVinf").html(infRV)
        const infTS = jctTS_F + ' ao mês'
        $("#TSinf").html(infTS)
        const infIPCA = jctIPCA_F + ' ao mês'
        $("#IPCAinf").html(infIPCA)
        const infPP = jctPP_F + ' ao mês'
        $("#PPinf").html(infPP)
        
        // Mensagem de sucesso.
        const output = `Olá <strong>${name}</strong>, aqui está uma estimativa
        do quanto R$${payment} pode render em ${tempoDeContribuicao_formatted}.`
        $("#outputText").html(output)

        changeScreen();
    });
    
    // Função do botão de tentar novamente.
    $("#simulateAgain").on("click", changeScreen);

})
