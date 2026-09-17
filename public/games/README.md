# Pasta dos jogos

Cada jogo mora em uma subpasta cujo nome é o `slug` cadastrado em
`src/data/games.ts`.

```
public/games/
  neon-drift/          ← slug: 'neon-drift'  → /jogo/neon-drift
    index.html
    index.js
    index.wasm
    index.pck
    index.audio.worklet.js
    cover.svg          ← opcional (capa 16:9)
  hollow-signal/
    ...
```

## Exportando do Godot 4

1. **Projeto → Exportar → Adicionar → Web**
2. Em **Export Path**, aponte para
   `<este-projeto>/public/games/<slug>/index.html`
   — o nome do arquivo precisa ser exatamente `index.html`.
3. Em **Options**:
   - `Variant → Extensions Support`: deixe **desligado** se não usar GDExtension.
   - `HTML → Canvas Resize Policy`: **Adaptive** (o jogo acompanha o tamanho do iframe).
   - Para jogos de celular, marque **Progressive Web App** só se quiser instalação;
     não é necessário para rodar no portal.
4. Exporte com **Export Project** (não "Export PCK/ZIP").

## Threads / SharedArrayBuffer

Se a sua exportação usar threads, o navegador só libera `SharedArrayBuffer`
quando a página está em *cross-origin isolation*. Os cabeçalhos necessários
(`COOP` + `COEP`) já estão configurados em `vercel.json`, `netlify.toml` e no
servidor de desenvolvimento do Vite.

Se o jogo mostrar um erro do tipo
`SharedArrayBuffer is not defined` ou `Cross origin isolation required`,
o problema é sempre de cabeçalho — confira o guia no `README.md` da raiz.

## Não versione builds pesadas

Arquivos `.wasm` e `.pck` passam facilmente dos 100 MB do limite do GitHub.
O `.gitignore` já ignora o conteúdo de `public/games/`, mantendo só este README.
Se quiser versionar uma build específica, force com:

```bash
git add -f public/games/neon-drift
```
