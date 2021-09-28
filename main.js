import http from 'http'
import url from 'url'

import Veiculo from "./Veiculo.js";
import Piloto from "./Piloto.js";
import Corrida from "./Corrida.js";
import { consultaRecorde, pesquisaPiloto } from './api.js'

let arnaldo = new Piloto("Arnaldo", 4, 15);
let pedro = new Piloto("Pedro", 2, 30);
let ana = new Piloto("Ana", 5, 30);

let ferrari = new Veiculo("carro", "ferrari", 2021, "vermelha", 400);
let bmw = new Veiculo("carro", "bmw", 2020, "azul", 350);
let carrango = new Veiculo("carro", "corsa", 2000, "cinza", 100);

let corrida = new Corrida(3, [{ nome: arnaldo.nome, veiculo: ferrari.nome, tempo: null }, { nome: pedro.nome, veiculo: carrango.nome, tempo: null }, { nome: ana.nome, veiculo: bmw.nome, tempo: null }], null);

corrida.largada([ferrari, carrango, bmw], [arnaldo, pedro, ana])

http.createServer(function (req, res) {
    let path = url.parse(req.url).pathname;
    let nome = url.parse(req.url, true).query.nome;
    let method = req.method;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if ((path === '/recorde') && (method == 'POST')) {
        let resposta = consultaRecorde();
        res.write(`###Recorde<br>
                Piloto: ${resposta.piloto}<br>
                Tempo: ${resposta.tempo}s`);
        res.end();
    } else if ((path == '/piloto') && (method == 'GET') && (nome)) {
        let resposta = pesquisaPiloto(nome);
        if (resposta) {
            res.write(`###Encontrado<br>
                    Piloto: ${resposta.piloto}<br>
                    Tempo: ${resposta.tempo}s`);
        } else {
            res.write(`###Nao encontrado`);
        }
        res.end();
    } else {
        res.write(`SOLICITACAO INVALIDA<br>
                URL: ${path}<br>
                Metodo: ${method}`);
        res.end();
    }

}).listen(3000, function () {
    console.log("Servidor ativo na porta 3000");
});