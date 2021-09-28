import { chegada, consultaPodio, adicionaRecorde } from "./api.js";

export default class Corrida {
    constructor(totalVeiculos, competidores, podio) {
        this.totalVeiculos = totalVeiculos; //num
        this.competidores = competidores; //array de obj (nome, veiculo, tempo)
        this.podio = podio // num (inicializado null)
    }

    relatorio(veiculo, corrida) {
        chegada(veiculo, corrida)
            .then((respostaDistancia) => {
                if (respostaDistancia.length == corrida.totalVeiculos) {
                    consultaPodio()
                        .then((resposta) => {
                            let primeiroLugar;
                            console.log(`\n### Pódio`);
                            for (let i = 0; i< corrida.totalVeiculos; i++) {

                                (i == 0) ? (
                                    console.log(`${i+1}º lugar: ${resposta[i].nome} | ${resposta[i].tempo.toFixed(2)}s`),
                                    primeiroLugar = resposta[i].tempo,
                                    adicionaRecorde(resposta[i].nome,resposta[i].tempo.toFixed(2))
                                ) : ( 
                                    console.log(`${i+1}º lugar: ${resposta[i].nome} | +${(resposta[i].tempo - primeiroLugar).toFixed(2)}s`)
                                )
                            }
                        })
                        .catch((erro) => console.log(erro));                }
            })
            .catch((erro) => console.log(erro));

        console.log(`${veiculo.piloto} com motor de ${veiculo.potenciaMotor}cv demorou ${veiculo.feedback} segundos de 0 a 100 km`);
    };

    largada(veiculo, piloto) {
  
            for (let i = 0; i < this.totalVeiculos; i++) {
                let feedback = veiculo[i].acelerando0a100(piloto[i], this)
                if (this.competidores[i].nome == piloto[i].nome) {this.competidores[i].tempo = feedback}
            }
    } 
}