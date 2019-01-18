/* Variáveis de ambiente */

var pontosJogador = 0;
var pontosComputador = 0;
var clickPedra = 0;
var clickPapel = 0;
var clickTesoura = 0;
var vitoriasCont = 0;
var derrotasCont = 0;
var empateCont = 0;
var totalJogadas = 0;
var kda = 0;

var obj;

const pontosJogadorSpan = document.getElementById ("pontosJogador");
const pontosComputadorSpan = document.getElementById ("pontosComputador");

const pontuacaoDiv = document.querySelector(".pontuacao");

const resuladoP = document.querySelector(".resultado > p");
const jogoP = document.querySelector(".jogo > p");

const pedraDiv = document.getElementById("pedra");
const papelDiv = document.getElementById("papel");
const tesouraDiv = document.getElementById("tesoura");

myStorage = window.localStorage;


/* função de conversão de variáveis em palavras */

function converterEscolha (letra) {
	if (letra == "r") return "Pedra";
	if (letra == "p") return "Papel";
	return "Tesoura";
}

/* função randomização game para computador */ 

function computer() {
	var randomComputador = (Math.random());
	if (randomComputador <= 0.33) {
            randomComputador = "r";
        } else if(randomComputador <= 0.24) {
            randomComputador = "p";
        } else {
            randomComputador = "s";
        }
	return randomComputador;
}

//console.log(computer());


/* função de vitória */

function vitoria (userChoice, computerChoice)
{
	//console.log("Vitoria");
	pontosJogador = pontosJogador + 1;
	//console.log(pontosJogador);
	pontosJogadorSpan.innerHTML = pontosJogador;
	pontosComputadorSpan.innerHTML = pontosComputador;
	//console.log(userChoice);
	//console.log(computerChoice);
	resuladoP.innerHTML = converterEscolha(userChoice) + " ganha de " + converterEscolha(computerChoice) + ". Você ganhou!";
	jogoP.innerHTML = "[Jogador] " + converterEscolha(userChoice) + " vs " + converterEscolha(computerChoice) + " [Computador] ";

}

/* função de derrota */

function derrota (userChoice, computerChoice)
{
	//console.log("Derrota");
	pontosComputador = pontosComputador + 1;
	//console.log(pontosJogador);
	pontosJogadorSpan.innerHTML = pontosJogador;
	pontosComputadorSpan.innerHTML = pontosComputador;
	//console.log(userChoice);
	//console.log(computerChoice);
	resuladoP.innerHTML = converterEscolha(userChoice) + " perde de " + converterEscolha(computerChoice) + ". Você perdeu!";
	jogoP.innerHTML = "[Jogador] " + converterEscolha(userChoice) + " vs " + converterEscolha(computerChoice) + " [Computador] ";
	
}

/* função de empate */

function empate (userChoice, computerChoice)
{
	//console.log("Empate");
	//console.log(userChoice);
	//console.log(computerChoice);
	resuladoP.innerHTML = converterEscolha(userChoice) + " empata com " + converterEscolha(computerChoice) + ".";
	jogoP.innerHTML = "[Jogador] " + converterEscolha(userChoice) + " vs " + converterEscolha(computerChoice) + " [Computador] ";

}

/* função game para jogador */

function game(userChoice){
	const computerChoice = computer ();
	//console.log(computerChoice);
	//console.log("escolha usuário ->" + userChoice);
	//console.log("escolha computador ->" + computerChoice);
	
	switch(userChoice + computerChoice) {
		
		/* casos de vitória de jogador */
		case "rs":
		case "pr":
		case "sp":
		//console.log("Jogador venceu!");
		vitoriasCont = vitoriasCont + 1;
		vitoria(userChoice, computerChoice);
		break;

		/* casos de derrota do jogador */
		case "rp":
		case "ps":
		case "sr":
		//console.log("Jogador perdeu!");
		derrotasCont = derrotasCont + 1;
		derrota(userChoice, computerChoice);
		break;

		/* casos de empate */

		case "rr":
		case "pp":
		case "ss":
		//console.log("Empate!");
		empateCont = empateCont + 1;
		empate(userChoice, computerChoice);
		break;
	}


}

/* função para percentagens de jogo */

function gameStatus(vitoriasCont, derrotasCont, empateCont)
{
	totalJogadas = vitoriasCont + derrotasCont + empateCont; // somando total de jogadas
	//console.log("totalJogadas", totalJogadas);
	kda = vitoriasCont/totalJogadas; // cálculo de percentagens de vitória
	kda = kda * 100;
}

/* verificando se navegador suporta o uso de local storage 

if (typeof(Storage) !== "undefined")
    alert("Este navegador suporta o uso");
else
    alert("Este navegador não suporta o uso"); 
*/

/* função para salvar dados em storage (salva apenas um jogo por vez, sobrescreve e nao calcula todos os jogos juntos, apenas o último)

function AssignValues()
{

	gameStatus(vitoriasCont, derrotasCont, empateCont);

	localStorage.setItem("ClickPedra", clickPedra);
	localStorage.setItem("ClickPapel", clickPapel);
	localStorage.setItem("ClickTesoura", clickTesoura);
	localStorage.setItem("Vitorias:", vitoriasCont );
	localStorage.setItem("Derrotas", derrotasCont);
	localStorage.setItem("Empates", empateCont);
	localStorage.setItem("TotalJogadas", totalJogadas);
	localStorage.setItem("Percentagem Vitoria:", kda);

}
*/

/* função para salvar dados de todos os jogos e calcular em storage */

function assignStorage(){

    gameStatus(vitoriasCont, derrotasCont, empateCont);

    var testObject = { 'clickPedra': clickPedra, 'clickPapel': clickPapel, 'clickTesoura': clickTesoura, 'vitorias': vitoriasCont, 'derrotas': derrotasCont, 'empates': empateCont, 'totalJogadas': totalJogadas, 'percentagens': kda};

     // Colocar o objeto no  storage
    localStorage.setItem('dadosJogos', JSON.stringify(testObject));

    // Recuperar o objeto do storage
    var retornaObjeto = localStorage.getItem('dadosJogos');

    console.log(retornaObjeto);                  

}


/* limpar storage */
function clearStorage(){

	localStorage.clear();

}

/* função main */

function main(){


pedraDiv.addEventListener('click', function() {
	//console.log ("click em pedra");
	game("r");
	clickPedra = clickPedra + 1;
	//console.log("click em pedra:" + clickPedra);
})

papelDiv.addEventListener('click', function() {
	//console.log ("click em papel");
	game("p");
	clickPapel= clickPapel + 1;
	//console.log("click em papel:" + clickPapel);
})

tesouraDiv.addEventListener('click', function() {
	//console.log ("click em tesoura");
	game("s");
	clickTesoura = clickTesoura + 1;
	//console.log("click em tesoura:" + clickTesoura);
})



}

main ();


