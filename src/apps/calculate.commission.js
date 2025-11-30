import { readFileSync } from "fs";

const data = JSON.parse(
  readFileSync(new URL("../database/vendas.json", import.meta.url))
);

function calcularComissoes(vendas) {
  const resultado = {};

  vendas.forEach((venda) => {
    let comissao = 0;

    // regra comissao
    if (venda.valor >= 500) {
      comissao = venda.valor * 0.05; // 5%
    } else if (venda.valor >= 100) {
      comissao = venda.valor * 0.01; // 1%
    }

    // adiciona vendedor
    if (!resultado[venda.vendedor]) {
      resultado[venda.vendedor] = 0;
    }

    // soma comissao
    resultado[venda.vendedor] = Number(
      (resultado[venda.vendedor] + comissao).toFixed(2)
    );
  });

  return resultado;
}

console.log(calcularComissoes(data.vendas));
