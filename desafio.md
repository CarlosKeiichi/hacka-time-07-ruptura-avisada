# Desafio · Ruptura Avisada

**Frente:** Grandes Redes e Cadeia · apoio IFB

## A dor original
Dados fragmentados entre indústria, distribuidor e operador. O planejamento não bate com a demanda real e isso vira produto faltando no balcão ou estoque parado na loja.

## A pergunta do time
> Como poderíamos transformar o dado que cada elo já tem em um aviso de ruptura que chega antes da falta, até o nível da loja?

## O que construir em 2 dias (escopo máximo)
Histórico de venda por loja e item vira previsão de consumo dos próximos 7 dias; a previsão cruza com estoque e prazo de entrega do distribuidor e gera um painel de risco por item com três estados: tranquilo, atenção, vai faltar. Cada alerta vira uma ação sugerida: antecipar pedido ou substituir item.

## O elo da cadeia que este desafio atende
Indústria e distribuição, com o operador como destinatário final do alerta.

## A ponte até o operador de restaurante
O gerente da loja recebe o aviso antes de ficar sem, e o comprador da rede vê o consolidado. Um mesmo dado serve aos dois.

## Dados que precisam estar na pasta `dados/` (checklist)
- [ ] Venda por item de 2 a 3 lojas em 90 dias (CSV, anonimizado)
- [ ] Lista de itens críticos com fornecedor
- [ ] Lead time médio de entrega por item
- [ ] Histórico de rupturas do período (se houver)

## A demo que fecha o pitch
O painel aponta na tela os itens que vão faltar na semana que vem em uma loja real, e mostra ao lado quantas rupturas do histórico teriam sido evitadas se o aviso existisse.

---
Regras: 1 fluxo principal + 1 tela de resultado. O que passar disso vai pro `contexto/backlog.md`.
