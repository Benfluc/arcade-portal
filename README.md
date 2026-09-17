# NOVA ARCADE — portal privado de playtest

Portal para distribuir builds Web (HTML5) feitas no Godot para um grupo fechado
de testadores. O testador informa uma chave de acesso, vê a lista de jogos
liberados para ele e joga direto no navegador — PC ou celular, sem instalar nada.

React 19 · TypeScript · Vite · Tailwind CSS v4 · Lucide React

---

## Começando

```bash
npm install
npm run dev      # http://localhost:5173
```

Chaves já cadastradas para teste: `NOVA-DEMO-2026`, `PLAYTEST-ALPHA`,
`AMIGO-JOAO`.

O projeto vem com um mini-jogo de demonstração em `public/games/neon-drift/`
só para você ver o fluxo funcionando de ponta a ponta. **Apague essa pasta**
quando colocar sua primeira build do Godot.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera `dist/` para produção |
| `npm run preview` | serve o `dist/` localmente, com os mesmos cabeçalhos |

---

## As três coisas que você vai mexer

### 1. `src/config/access-keys.ts` — quem entra

```ts
{
  key: 'AMIGO-JOAO',
  label: 'João',              // aparece no topo depois do login
  games: ['neon-drift'],      // '*' para todos os jogos
  expiresAt: '2026-12-31',    // opcional
  revoked: false,             // desativa sem apagar
}
```

A chave é comparada sem diferenciar maiúsculas nem espaços.

### 2. `src/data/games.ts` — o catálogo

Cada jogo é um objeto tipado. O campo `slug` é o endereço da página
(`/jogo/neon-drift`) **e** o nome da pasta em `public/games/`.

### 3. `src/config/site.ts` — nome, tagline e link de contato

Cores, fontes e animações ficam em `src/index.css`, no bloco `@theme`.

---

## Publicando uma build do Godot

1. No Godot 4: **Projeto → Exportar → Web**
2. Export Path: `public/games/<slug>/index.html`
   (o nome do arquivo precisa ser exatamente `index.html`)
3. Em **Options → HTML**, use `Canvas Resize Policy: Adaptive` para o jogo
   acompanhar o tamanho do iframe.
4. Exporte com **Export Project**.
5. Adicione (ou atualize) a entrada correspondente em `src/data/games.ts`.
6. Opcional: coloque uma capa 16:9 em `public/games/<slug>/cover.png` e aponte
   o campo `cover`. Sem capa, o portal gera um gradiente próprio do jogo.

Detalhes em `public/games/README.md`.

---

## ⚠️ Até onde a chave de acesso protege

A validação acontece **no navegador**. As chaves são compiladas dentro do
JavaScript enviado ao usuário — quem abrir o DevTools consegue lê-las. Além
disso, os arquivos em `public/games/` continuam acessíveis por URL direta para
quem souber o caminho.

Isso é uma **porta**, não um **cofre**. Serve para manter o portal fora do
alcance de curiosos e de buscadores, e para organizar quem recebeu acesso a quê.
Não serve para proteger algo cujo vazamento traria prejuízo real.

Se você precisar de proteção de verdade, o ponto de troca é uma função só:
`validateKey` em `src/lib/auth.ts`. Ela já é `async`, então basta substituir o
corpo por uma chamada a um backend (Supabase, Cloudflare Workers, uma API sua) —
nada mais no app precisa mudar. Para proteger também os arquivos dos jogos, eles
precisariam sair de `public/` e passar a ser servidos com URL assinada.

---

## Deploy

O projeto já vem configurado para **Vercel** (`vercel.json`) e **Netlify**
(`netlify.toml`). Nos dois casos: conecte o repositório e faça o deploy — o
comando de build e a pasta de saída já estão declarados.

Lembre-se de que o `.gitignore` **ignora o conteúdo de `public/games/`** (builds
do Godot passam do limite de 100 MB do GitHub com facilidade). Para versionar
uma build específica:

```bash
git add -f public/games/neon-drift
```

### Cabeçalhos COOP/COEP — leia se o jogo não abrir

O Godot 4 exporta builds Web que usam `SharedArrayBuffer` (threads). O navegador
só libera esse recurso quando a página está em *cross-origin isolation*, o que
exige dois cabeçalhos:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Eles já estão configurados no `vercel.json`, no `netlify.toml` e no servidor de
desenvolvimento do Vite (via plugin em `vite.config.ts`).

**Se o jogo mostrar `SharedArrayBuffer is not defined` ou
`Cross origin isolation required`,** o problema é sempre de cabeçalho.
Verifique com:

```bash
curl -I https://seu-site.com/
```

Duas consequências de ligar o `COEP: require-corp`, que valem conhecer:

- Todo recurso externo precisa ser servido com CORS ou `Cross-Origin-Resource-Policy`.
  As Google Fonts usadas aqui já passam (o `<link>` no `index.html` tem
  `crossorigin`). Se você adicionar imagens ou scripts de outros domínios e eles
  sumirem, é isto.
- **GitHub Pages não permite cabeçalhos customizados.** Se for hospedar lá,
  exporte do Godot **sem threads** e remova os cabeçalhos deste projeto.

Para outros servidores:

<details>
<summary>Nginx</summary>

```nginx
add_header Cross-Origin-Opener-Policy   "same-origin"  always;
add_header Cross-Origin-Embedder-Policy "require-corp" always;
add_header Cross-Origin-Resource-Policy "same-origin"  always;

location / {
    try_files $uri $uri/ /index.html;   # rotas da SPA
}

types { application/wasm wasm; }        # MIME correto para .wasm
```
</details>

<details>
<summary>Apache (.htaccess)</summary>

```apache
Header always set Cross-Origin-Opener-Policy   "same-origin"
Header always set Cross-Origin-Embedder-Policy "require-corp"
Header always set Cross-Origin-Resource-Policy "same-origin"
AddType application/wasm .wasm

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
</details>

---

## Comportamento no celular

- O player abre em tela inteira, com barra de controles sempre acessível
  (sair, reiniciar, tela cheia). A barra **não** some sozinha de propósito:
  enquanto o dedo ou o cursor está sobre o iframe, a página de fora não recebe
  eventos — uma barra com auto-hide nunca reapareceria e prenderia o testador
  dentro do jogo.
- Jogos marcados com `orientation: 'paisagem'` mostram um aviso pedindo para
  girar o aparelho enquanto a tela estiver em retrato.
- Jogos com `mobileSupport: false` exibem um alerta antes de abrir, mas não são
  bloqueados.
- No botão de tela cheia o portal tenta travar a orientação em horizontal. Em
  iPhone o Safari não implementa a Fullscreen API em elementos comuns, então lá
  o botão não aparece e o jogo roda em modo imersivo via CSS.

---

## Estrutura

```
src/
  config/
    access-keys.ts     ← chaves de acesso
    site.ts            ← nome, tagline, contato
  data/games.ts        ← catálogo de jogos
  types/game.ts        ← o formato de um jogo
  lib/
    auth.ts            ← validação da chave (troque aqui para usar backend)
    format.ts          ← datas e capa procedural
  context/AuthContext.tsx
  hooks/               ← useAuth, useDevice, useFullscreen
  components/
    GamePlayer.tsx     ← o iframe, fullscreen, aviso de girar
    GameCard.tsx
    ProtectedRoute.tsx
  pages/               ← LoginPage, LibraryPage, GamePage
public/
  games/<slug>/        ← builds exportadas do Godot
```

Rotas: `/` (login) · `/biblioteca` · `/jogo/:slug`
