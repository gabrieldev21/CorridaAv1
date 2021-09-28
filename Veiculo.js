export default class Veiculo {
  constructor(tipo, modelo, ano, cor, potenciaMotor) {
    this.tipo = tipo;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    this.potenciaMotor = potenciaMotor;
    this.feedback = null;
  }

  acelerando0a100(piloto, corrida) {
    let aux = 50;
    if (this.potenciaMotor <= 100) {
      aux = 0.9;
    } else if (this.potenciaMotor > 100 && this.potenciaMotor <= 200) {
      aux = 0.7;
    } else if (this.potenciaMotor > 200 && this.potenciaMotor <= 300) {
      aux = 0.6;
    } else if (this.potenciaMotor > 300) {
      aux = 0.2;
    }

    let start = new Date().getTime();
    let velocidade = 0;
    let animacao = ".";
    let intervalo = setInterval(() => {
      velocidade += 1;
      animacao =
        animacao == "."
          ? ".."
          : animacao == ".."
            ? "..."
            : animacao == "..."
              ? "."
              : "";
      console.log(`acelerando ${this.modelo}${animacao} ${velocidade}km`);
      if (velocidade === 100) {
        clearInterval(intervalo);
        const end = new Date().getTime();
        this.piloto = piloto.nome;
        this.feedback = (end - start) / 1000.0;
        return corrida.relatorio(this, corrida);
      }
    }, 100 * (aux / piloto.xp()));
  }
}