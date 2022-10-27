
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
/*----------------------*/


// Inicio do script.
$(function() {
    
    start();
    
    function start(){
        $("#screen2").hide();
        

        // Função que gera os meses e anos.
        (function() {
            for (let months = 1; months <= 100; months++) {
                const value = months;
                
                /* Formata os meses e anos de forma 
                que seja melhor compreendido.*/
                const text = Math.floor(months / 12) != 0
                ? Math.floor(months / 12) + " anos e " + months % 12 + " meses" 
                : months % 12 + " meses";
                
                /* Manda o texto com meses e anos
                para a pagina.*/
                const optionElement = $("<option></option>");
                optionElement.val(value);
                optionElement.text(text);

                $("#contributionTime").append(optionElement);
            }
        })();
    }

    /* Animações suaves de mostrar e esconder
    algum elemento.*/
    function changeScreen(){
        $("#screen1").slideToggle("slow");
        $("#screen2").fadeToggle("slow");
    }
    
    /* Verifica os campos input's e adiciona
    funções a eles*/
    $("#inputForm").on("submit", function() { 
        
        // Input que solicita o nome do usuário.
        const name = $("#name").val();
        // Input que solicita a mensalidade.
        const payment = $("#payment").val();
        // Input que solicita o aporte inicial.
        const valueInit = $("#value-init").val();
        // Input qye solicita o tempo de contribuição.
        const contributionTime = $("#contributionTime").val();
        // Tempo de contribuição formatado.
        const contributionTime_formatted = $(`#contributionTime option[value='${contributionTime}']`).text();
        const interestRate = 0.517 / 100;

        // Valida os inputs.
        if (name === "" || name === undefined){
            return 0;
        }
        if (parseFloat(payment) <= 0 || isNaN(parseFloat(payment))){ // Checking if payment it's a number and if it's positive
            return 0;
        }
        
        /* Multiplica o valor total pelos
        meses.*/
        let montante = parseFloat(valueInit) + payment * contributionTime
        
        // Valores dos investimentos.
        TS = 0
        IPCA = 0
        PP = 0
        
        // Juros.
        jct_CDI = 0
        jct_IPCA = 0
        jct_PP = 0
        
        /* Calcula as taxas e soma mês a mês  */
        for (let i = 0; i < contributionTime; i++) {
            TS = (payment * 1.07) / 100
            jct_CDI += TS
            
            IPCA = (payment * 0.4) / 100
            jct_IPCA += IPCA
            
            PP = (payment * 0.5) / 100
            jct_PP += PP
        }
        
        // Soma o montante + juros
        let valorTS = montante + jct_CDI
        let valorIPCA = montante + jct_IPCA
        let valorPP = montante + jct_PP
        
        
        /* Formata os resultados obtidos nos
        cálculos para uma melhor visualização.*/
        let CDI_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valorTS)
        let IPCA_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valorIPCA)
        let PP_Format = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valorPP)
        
        /* Manda os resultados dos cálculos
        para a página.*/
        $("#TS").html(CDI_Format)
        $("#IPCA").html(IPCA_Format)
        $("#PP").html(PP_Format)
        
        // Mensagem de sucesso.
        const output = `Olá <strong>${name}</strong>, aqui está uma estimativa
        do quanto R$${payment} pode render em ${contributionTime_formatted}.`
        $("#outputText").html(output)

        changeScreen();
    });
    
    // Função do botão de tentar novamente.
    $("#simulateAgain").on("click", changeScreen);

})