import insertionSort from './insertionSort.js'
import {dados} from './dados.js'

let posicao = []
let servidorOnline = true;

export const chegada = (veiculo, corrida) => {
  return new Promise((resolve, reject) => {
      if (!servidorOnline) reject('servidor Offline')
      posicao.push({nome: veiculo.piloto, tempo: veiculo.feedback})
      resolve(posicao)
  })
}

export const consultaPodio = () => {
  return new Promise((resolve, reject) => {
      if (!servidorOnline) reject('servidor Offline')
      resolve(posicao) })
}

export const adicionaRecorde = (param) => {
  dados.recordes.push({nome: param.piloto, tempo: param.feedback});
  insertionSort(dados);
}

export const consultaRecorde = () => {
  return dados.recordes[0]
}

export const pesquisaPiloto = (nome) => {
  for (let i = 0; i < dados.recordes.length; i++) {
    if (dados.recordes[i].piloto.toLowerCase() == nome.toLowerCase()) {
      return dados.recordes[i]
    } else {
      return false
    }
  }
}