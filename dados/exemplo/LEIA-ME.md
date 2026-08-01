# Dados de EXEMPLO · Ruptura Avisada

> **Estes dados são inventados.** Foram gerados para o time conseguir construir antes de a
> rede parceira entregar os dados reais. Quando os reais chegarem, vão para `dados/` e esta
> pasta pode ser apagada.

## A operação que estes dados descrevem

Uma rede de três lojas de alimentação rápida, 30 itens no estoque, 90 dias de venda
(de 03/05/2026 a 31/07/2026). Sete fornecedores, com prazos de entrega bem diferentes:
o hortifruti entrega em 1 dia, a embalagem demora 7.

| loja | perfil | movimento |
|---|---|---|
| Loja 001 | Shopping, Zona Sul | referência |
| Loja 002 | Rua, Centro | 28% menor |
| Loja 003 | Rodovia, região metropolitana | 28% maior |

## Os arquivos

### `vendas-por-item-90dias.csv` — 8.100 linhas
A venda diária por loja e por item. É o arquivo grande: 3 lojas × 30 itens × 90 dias.

| coluna | o que é |
|---|---|
| `data` | AAAA-MM-DD |
| `loja` | Loja 001, 002 ou 003 |
| `sku` | Código do item (SKU-1001...) — **use o SKU para cruzar**, não o nome |
| `item` | Nome legível |
| `unidade_medida` | cx, pct, un, kg, gl, pt |
| `quantidade_vendida` | Saída do dia |

Sexta e sábado vendem bem mais que segunda. Hortifruti e padaria têm giro mais irregular
que congelado. Há uma leve tendência de alta ao longo dos 90 dias.

### `estoque-atual.csv` — 90 linhas
A foto do estoque hoje (01/08/2026), item por item, loja por loja. **É a linha de partida
do cálculo de risco.**

| coluna | o que é |
|---|---|
| `loja` / `sku` / `item` / `categoria` | Identificação |
| `estoque_atual` | O que tem na loja agora |
| `estoque_minimo` | O ponto de pedido usado hoje pela rede |
| `fornecedor` / `lead_time_dias` | Quem entrega e em quantos dias |
| `ultima_entrega` | Quando chegou a última |
| `proxima_entrega_prevista` | Quando chega a próxima |

A conta do produto mora aqui: **estoque atual ÷ consumo médio diário = dias de cobertura.**
Se os dias de cobertura forem menores que o tempo até a próxima entrega, vai faltar.

### `lead-time-fornecedor.csv` — 30 linhas
As regras de cada fornecedor.

| coluna | o que é |
|---|---|
| `sku` / `item` / `fornecedor` | Identificação |
| `lead_time_dias` | Do pedido até a entrega |
| `frequencia_entrega_dias` | De quantos em quantos dias ele passa |
| `pedido_minimo` | Quantidade mínima aceita |
| `validade_dias` | Vida útil — **pedir demais também é prejuízo** |

### `rupturas-historico.csv` — 46 linhas
As faltas que já aconteceram no período. É com este arquivo que se prova o valor.

| coluna | o que é |
|---|---|
| `data_inicio` / `data_fim` | Período sem o produto |
| `loja` / `sku` / `item` | O quê e onde |
| `dias_sem_produto` | Duração |
| `venda_perdida_estimada` | Estimativa do que deixou de vender |
| `causa_registrada` | O que o gerente anotou na época |

## Confira se você leu certo

- 8.100 linhas de venda, 30 SKUs, 3 lojas, 90 dias
- 46 rupturas registradas no período
- **16 itens estão hoje com estoque insuficiente para chegar até a próxima entrega**
- 5 itens estão no limite, com menos de um dia de folga

(essa conta é: `estoque_atual` ÷ consumo médio dos últimos 14 dias, comparado com os dias
que faltam para `proxima_entrega_prevista`)

## O que dá pra provar com este dado

Os itens em risco estão espalhados pelas três lojas e vários são de alto giro: hambúrguer e
cheddar na Loja 001, pão de hambúrguer e alface na Loja 002, filé de frango e embalagem na
Loja 003. A batata pré-frita está apertada em duas lojas ao mesmo tempo — e é o congelado de
maior prazo de entrega, cinco dias.

Os casos mais graves são de horas, não de dias: o pão de hambúrguer da Loja 002 tem 0,6 dia de
cobertura e a entrega só chega em 1 dia. A alface da mesma loja, 0,7 dia. Esses são os que
viram cliente indo embora amanhã de manhã.

Olhe também a coluna `causa_registrada` do histórico: "pedido feito em cima da hora" e
"pedido abaixo do necessário" aparecem bastante. Não é falta de estoque no fornecedor.
É falta de aviso. E aviso é software.

## O caminho da demo

Rode o modelo contra as rupturas do histórico: quantas delas teriam um aviso com pelo menos
um dia de antecedência, considerando o consumo médio e o lead time? Esse número, junto com a
venda perdida estimada daquelas faltas, é a resposta para "quanto isso vale".

## Como o dado real substitui este

Peça à rede parceira:

1. **Venda por item e por loja, 90 dias** — sai do PDV ou do ERP. Precisa do código do item.
2. **Posição de estoque atual por loja** — inventário ou saldo do sistema.
3. **Lead time e frequência de entrega por fornecedor** — o comprador tem isso, mesmo que de cabeça.
4. **Histórico de rupturas** — raramente existe registro formal. Se não houver, dá para inferir
   dos dias em que a venda de um item foi zero numa loja que costuma vender todo dia.

Anonimize nome de loja e de fornecedor antes de subir. Volume de venda por loja é informação
estratégica da rede.
