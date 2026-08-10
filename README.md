# CSM Psicologia

Site estático da psicóloga Carla Suzana Marinho, em Dourados/MS.

O projeto publica uma landing page bilíngue, páginas educativas por tema e blog estático. A comunicação deve permanecer acolhedora, profissional, ética e clara para pessoas que procuram atendimento psicológico presencial ou online.

## Stack

- HTML estático dentro de `public/`.
- CSS próprio em `public/assets/css/landing.css` (home) e `public/assets/css/links.css` (página de links).
- JavaScript leve em `public/assets/js/site.js` (home) e `public/assets/js/links.js` (página de links).
- Imagens reais e favicons em `public/assets/img/`, com fotos responsivas `.webp` (320w a 1200w) e fallback `.jpg`.
- Fotos da profissional em `public/assets/img/carla/`.
- PWA básico via `public/manifest.json` (nome, ícones, cores de tema).
- Headers de segurança e cache em `public/_headers`; redirects em `public/_redirects`.
- Deploy pela Netlify usando `public/` como diretório publicado.

Não há framework nem bundler. O único passo de build é `scripts/stamp-assets.mjs` (cache-busting por hash), leve e sem dependências.

## Scripts

```bash
npm start
```

Serve `public/` em `http://localhost:3838`.
Se a porta 3838 estiver ocupada, o `serve` sobe em outra porta; verifique a URL exibida no terminal.

```bash
npm run build
```

Roda `scripts/stamp-assets.mjs`, que injeta `?v=<hash-do-conteúdo>` nas referências de CSS/JS dos HTMLs.
É o mecanismo de cache-busting do projeto: como os assets não têm hash no nome, a versão na URL permite servi-los como `immutable` (cache de 1 ano) sem prender visitantes na versão antiga - a URL só muda quando o arquivo muda.
O script é idempotente e não tem dependências além do Node.

O deploy é feito pela Netlify. Use `public/` como publish directory; o `netlify.toml` roda `npm run build` (o stamp) antes de publicar.

## Estrutura

- `public/index.html`: landing principal em português.
- `public/en/index.html`: landing em inglês.
- `public/404.html`: página de erro.
- `public/sobre.html`: página antiga sobre a profissional, mantida no projeto.
- `public/blog/`: índice e artigos em português.
- `public/en/blog/`: índice e artigos em inglês.
- `public/temas/`: páginas de temas em português.
- `public/en/topics/`: páginas de temas em inglês.
- `public/links/`: página compacta de links para redes sociais e contato.
- `public/assets/css/links.css`: CSS da página de links.
- `public/assets/js/links.js`: JavaScript leve da página de links.
- `public/manifest.json`: manifesto PWA (nome, ícones, cores).
- `public/_headers`: cabeçalhos de segurança e política de cache da Netlify.
- `public/_redirects`: redirects da Netlify (`/links`, `/bio` e catch-all para `404.html`).
- `public/robots.txt`: orientação para crawlers.
- `public/sitemap.xml`: URLs indexáveis.
- `public/llms.txt`: resumo factual para assistentes de IA.
- `.context/`: capturas e arquivos temporários de agentes locais, não versionados.
- `output/`: artefatos locais de validação, não versionados.
- `AGENTS.md`: regras para agentes de IA editarem o repositório.
- `scripts/stamp-assets.mjs`: injeta `?v=<hash>` nas refs de CSS/JS (cache-busting no build).
- `.agents/skills/` e `skills-lock.json`: skills de design/frontend usadas por agentes, versionadas para reprodutibilidade.

## SEO e AI SEO

Manter a implementação atual alinhada a:

- Uma única tag `h1` por página principal.
- `lang="pt-BR"` na home e `lang="en"` na versão em inglês.
- Title e meta description focados em psicóloga em Dourados/MS, terapia online e públicos atendidos.
- Canonicals e `hreflang` usando a base publicada atual: `https://csmpsicologia.com/`.
- Open Graph e Twitter Card com `public/assets/img/preview.jpg`.
- JSON-LD com `WebSite`, `Person`, `LocalBusiness`/`MedicalBusiness` e `FAQPage`.
- Respostas diretas em FAQs, sem exagero de palavras-chave.
- `robots.txt`, `sitemap.xml` e `llms.txt` atualizados quando páginas forem criadas, removidas ou renomeadas.

## Conteúdo

Use linguagem acolhedora, objetiva e ética. O site pode explicar formação, abordagem clínica, públicos atendidos, atendimento online e formas de contato.

Evite promessas de cura, garantias de resultado, diagnósticos, aconselhamento psicológico individualizado, depoimentos de pacientes e urgência comercial agressiva. Quando faltar uma informação profissional, não invente.

## Checklist

- Rodar `npm start` e revisar `http://localhost:3838`.
- Conferir desktop e mobile.
- Verificar links de WhatsApp, telefone, e-mail, idiomas e navegação interna.
- Confirmar imagens carregando sem caminhos quebrados.
- Validar que SEO, sitemap e `llms.txt` acompanham mudanças de URL.
- Manter capturas, caches e saídas de Playwright fora do Git.
- Manter mudanças pequenas, estáticas e fáceis de publicar.
