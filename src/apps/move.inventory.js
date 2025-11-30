import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const data = JSON.parse(
  readFileSync(new URL("../database/estoque.json", import.meta.url))
);

let movimentos = [];

function movimentarEstoque(codigoProduto, tipo, quantidade, descricao) {
  let produto = data.estoque.find((p) => p.codigoProduto === codigoProduto);

  if (!produto) {
    return "Produto não encontrado!";
  }

  if (tipo === "saida" && produto.estoque < quantidade) {
    return "Estoque insuficiente";
  }

  const id = randomUUID();

  if (tipo === "entrada") {
    produto.estoque += quantidade;
  } else {
    produto.estoque -= quantidade;
  }

  movimentos.push({
    id,
    codigoProduto,
    tipo,
    descricao,
    quantidade,
    estoqueAtualizado: produto.estoque,
  });

  return {
    mensagem: "Movimentação realizada com sucesso!!!",
    id,
    estoqueAtualizado: produto.estoque,
  };
}

console.log(movimentarEstoque(101, "saida", 35, "Reposição na prateleira"));
