import Link from "next/link";
import { verificar, exemploPratico } from "@/lib/guia";
import Copiar from "../Copiar";
import AutoAtualiza from "../AutoAtualiza";
import LeituraIA from "../LeituraIA";

// Confere os passos a cada acesso, nao no build.
export const dynamic = "force-dynamic";

const CODIGO = "import { carregar } from \"@/lib/dados\";\n\nconst tabela = carregar(\"vendas-por-item-90dias.csv\");\nif (!tabela) throw new Error(\"arquivo nao encontrado\");\n\n// Soma \"quantidade_vendida\" para cada \"item\"\nconst porGrupo = new Map<string, number>();\nfor (const linha of tabela.linhas) {\n  const chave = linha[\"item\"];\n  const valor = Number(linha[\"quantidade_vendida\"]) || 0;\n  porGrupo.set(chave, (porGrupo.get(chave) ?? 0) + valor);\n}\n\nconst ranking = [...porGrupo.entries()].sort((a, b) => b[1] - a[1]);\n";

export default function Guia() {
  const passos = verificar();
  const feitos = passos.filter((p) => p.feito).length;
  const exemplo = exemploPratico(
    "vendas-por-item-90dias.csv",
    "item",
    "quantidade_vendida",
    "soma",
  );

  return (
    <main>
      <AutoAtualiza />
      <header className="cabeca">
        <div className="env">
          <span className="crachá">Time 07 · Guia</span>
          <h1>Do zero ao ar,<br />em seis passos</h1>
          <p className="sub">
            Esta página se confere sozinha. Cada passo vira verde quando passa a
            funcionar de verdade — não quando alguém clica numa caixinha.
          </p>
          <nav className="atalhos">
            <Link href="/passos">Plano do time</Link>
            <Link href="/">Conferência de dados</Link>
            <Link href="/pecas">Peças visuais</Link>
          </nav>
        </div>
      </header>

      <div className="env">
        <div className="bloco">
          <div className="entre">
            <h2>Onde vocês estão</h2>
            <span className="rotulo">{feitos} de {passos.length} passos</span>
          </div>
          <div className="trilha" style={{ marginTop: 14 }}>
            <span style={{ width: `${Math.max((feitos / passos.length) * 100, 3)}%` }} />
          </div>

          <div style={{ marginTop: 20 }}>
            {passos.map((p) => (
              <div key={p.numero} className={p.feito ? "passo ok" : "passo"}>
                <span className="bola">{p.feito ? "✓" : p.numero}</span>
                <span className="txt">
                  <span className="nome">{p.titulo}</span>
                  <span className="como">{p.detalhe}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <LeituraIA />

        <div className="bloco">
          <div className="entre">
            <h2>Passo 3, na prática</h2>
            <span className="rotulo">rodando no seu arquivo</span>
          </div>
          <p className="prosa" style={{ marginTop: 10 }}>
            Este código responde: <b>quais itens mais saem nas lojas</b>. Ele já rodou no seu{" "}
            <span className="mono">vendas-por-item-90dias.csv</span> — o resultado abaixo é do dado de vocês,
            não de exemplo genérico.
          </p>

          <Copiar codigo={CODIGO} />

          {exemplo.ok ? (
            <>
              <div className="rotulo" style={{ marginTop: 20 }}>O que deu</div>
              <div className="rolagem">
                <table>
                  <thead>
                    <tr>
                      <th>item</th>
                      <th>resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exemplo.resultados.map((r) => (
                      <tr key={r.chave}>
                        <td>{r.chave}</td>
                        <td className="mono">{r.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="prosa" style={{ fontSize: 14, marginTop: 12, opacity: .6 }}>
                Cuidado ao ler: a conta usa <b>todas as linhas do arquivo</b>. Se o seu CSV
                mistura coisas diferentes na mesma coluna — unidades, lojas, meses, tipos de
                operação —, o número mistura também. Quando um resultado parecer estranho,
                a primeira pergunta é <b>&quot;quais linhas entraram nessa média?&quot;</b>, não
                &quot;o código está errado?&quot;.
              </p>
            </>
          ) : (
            <div className="aviso erro">
              <p className="prosa">{exemplo.erro}</p>
            </div>
          )}

          <div className="aviso" style={{ marginTop: 20 }}>
            <div className="rotulo">Onde este guia para</div>
            <p className="prosa" style={{ marginTop: 6 }}>
              Isto é a técnica: carregar, agrupar, contar. Serve para qualquer coisa que
              vocês forem calcular. O que <b>continua sendo trabalho de vocês</b> é{" "}
              <b>cruzar giro com estoque e lead time para avisar antes da falta</b> — essa parte é o produto do desafio, e é ela que a banca
              vai olhar.
            </p>
          </div>
        </div>

        <div className="bloco">
          <h2>As quatro funções que resolvem quase tudo</h2>
          <p className="prosa" style={{ marginTop: 8 }}>
            Estão em <span className="mono">lib/dados.ts</span> e não precisam de biblioteca nenhuma.
          </p>
          <div className="rolagem">
            <table>
              <thead>
                <tr><th>função</th><th>o que faz</th></tr>
              </thead>
              <tbody>
                <tr><td className="mono">carregar(&quot;arquivo.csv&quot;)</td><td>lê um CSV e devolve colunas + linhas</td></tr>
                <tr><td className="mono">listarTudo()</td><td>lê todos os CSVs que existem</td></tr>
                <tr><td className="mono">somar(linhas, &quot;coluna&quot;)</td><td>soma uma coluna numérica</td></tr>
                <tr><td className="mono">agrupar(linhas, &quot;coluna&quot;)</td><td>junta as linhas por um valor</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
