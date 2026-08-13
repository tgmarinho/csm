# AGENTS.md

Instruções para agentes de IA trabalhando neste repositório.

## Contexto

Este é o site estático da CSM Psicologia, da psicóloga Carla Suzana Marinho em Dourados/MS.

O público principal são pessoas procurando atendimento psicológico para si, filhos, casal ou família, além de adolescentes, adultos, brasileiros no exterior e pessoas que buscam atendimento online em português ou inglês. A comunicação deve ser acolhedora, profissional, clara e ética.

## Arquivos e comandos

- Edite principalmente arquivos dentro de `public/`.
- A home em português é `public/index.html`.
- A home em inglês é `public/en/index.html`.
- O CSS principal é `public/assets/css/landing.css`; o CSS da página de links é `public/assets/css/links.css`.
- O JavaScript leve da home é `public/assets/js/site.js`; o da página de links é `public/assets/js/links.js`.
- O blog em português fica em `public/blog/`.
- O blog em inglês fica em `public/en/blog/`.
- As páginas de temas ficam em `public/temas/` e `public/en/topics/`.
- A página de links fica em `public/links/`.
- Imagens, ícones e preview social ficam em `public/assets/img/`.
- Fotos da Carla ficam em `public/assets/img/carla/`, com variantes responsivas `.webp` (320w, 640w, 960w, 1200w) e fallback `.jpg`.
- O manifesto PWA é `public/manifest.json`; favicons e ícones de app ficam em `public/assets/img/`.
- Arquivos para máquinas ficam em `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt`.
- Arquivos Netlify ficam em `netlify.toml`, `public/_headers` (cabeçalhos de segurança e cache) e `public/_redirects` (ex.: `/links` e `/bio` para `/links/`; catch-all para `404.html`).
- Capturas e artefatos temporários de agentes devem ficar em `.context/` ou `output/`, sem commit.
- Rode localmente com `npm start` e abra `http://localhost:3838`. Se a porta 3838 estiver ocupada por outro processo, o `serve` sobe em porta aleatória; confira a URL impressa no terminal.
- O cache-busting é feito por `scripts/stamp-assets.mjs` (rodado via `npm run build` no deploy da Netlify), que injeta `?v=<hash-do-conteúdo>` nas refs de CSS/JS. Não edite o `?v=` à mão; se alterar `landing.css`, `site.js`, `links.css` ou `links.js`, rode `npm run build` para reestampar. Isso é o que torna seguro servir os assets como `immutable` em `public/_headers`.
- `npm run check` roda o pacote local de qualidade: build/stamp, `html-validate`, `images:check` com Sharp e crawl interno de links/âncoras com `linkinator`.
- `npm run audit:lhci` roda Lighthouse CI em `/`, `/en/`, `/links/`, `/blog/` e `/en/blog/`, usando `public/` como pasta estática. Os relatórios ficam em `.context/lhci/`, sem commit.
- `npm run images:check` confirma que as variantes `.webp` esperadas existem; `npm run images:build` regenera fotos responsivas e logo `.webp` com Sharp.
- Configurações de qualidade ficam em `lighthouserc.cjs`, `.htmlvalidate.json`, `scripts/check-links.mjs`, `scripts/optimize-images.mjs` e `.github/workflows/quality.yml`.
- O Lighthouse CI trata acessibilidade, SEO, CLS e erros de console como falha. Performance e LCP estão como warning enquanto a página `/links/` ainda tem LCP alto.
- Deploy pela Netlify, publicando a pasta `public/` (a Netlify roda `npm run build` antes de publicar).

Não introduza frameworks, bundlers ou dependências novas sem necessidade. O projeto deve continuar simples, estático e fácil de publicar. O único passo de build é o stamp de assets, sem dependências além do Node.

## Direção visual

- Visual moderno, calmo, humano e confiável.
- Paleta atual: azul profundo `#3F556B`, azul acinzentado `#8FA3AD`, rosa queimado `#D6A5A4`, blush `#E8C7C3`, rosa claro `#F2DAD7`, bege claro `#F4EFEF` e cinza claro quente `#D9D9D9`.
- Use fotos reais existentes em `public/assets/img/` sempre que possível.
- Preserve contraste, legibilidade e respiro.
- Preserve a logo atual da CSM Psicologia, especialmente no header e nos cards de apoio.
- No mobile, mantenha header compacto com logo, identificação curta e botão Menu.
- Não volte ao estilo antigo de carrossel, overlays roxos, placeholders em inglês ou animações pesadas.
- Não use hero genérico com gradiente abstrato quando houver foto real adequada.
- Mantenha animações leves e respeite `prefers-reduced-motion`.

## Conteúdo e ética

Permitido:

- Descrever formação, abordagem clínica, públicos atendidos e formas de contato.
- Usar linguagem acolhedora, institucional e acessível.
- Explicar que a terapia pode ajudar no autoconhecimento, regulação emocional, reflexão e organização de estratégias.
- Criar conteúdo educativo de topo de funil sobre temas psicológicos de forma geral.

Evite:

- Prometer cura, melhora garantida ou resultado específico.
- Usar depoimentos reais ou simulados de pacientes.
- Criar senso de urgência comercial agressivo.
- Fazer diagnóstico ou aconselhamento psicológico individualizado no texto do site.
- Expor informações sensíveis de pacientes.
- Inventar formação, credenciais, números de registro, especialidades ou serviços.

Quando faltar dado profissional, use texto neutro ou peça confirmação.

## SEO e AI SEO

Mantenha:

- Uma única tag `h1` por página principal.
- `lang="pt-BR"` na versão em português e `lang="en"` na versão em inglês.
- Title e description focados em "psicóloga em Dourados/MS", terapia online e públicos atendidos.
- Canonical atual para `https://csmpsicologia.com/` e, na versão em inglês, `https://csmpsicologia.com/en/`.
- `hreflang` entre as versões PT-BR e EN.
- Open Graph e Twitter Card com `public/assets/img/preview.jpg`.
- JSON-LD com `WebSite`, `Person`, `LocalBusiness`/`MedicalBusiness` e `FAQPage`.
- `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt` atualizados.

Para AI SEO, prefira seções factuais, respostas diretas no FAQ e um `llms.txt` conciso. Não adicione conteúdo artificial só para palavras-chave.

## Blog e páginas de tema

- Artigos devem ser educativos, topo de funil e escritos em português brasileiro ou inglês claro, conforme a pasta.
- Não prometa cura, diagnóstico ou resultado específico.
- Use title, description, canonical, Open Graph e estrutura semântica por artigo.
- Ao criar, remover ou renomear páginas, atualize `public/sitemap.xml` e `public/llms.txt`.
- Mantenha equivalência entre PT-BR e EN quando houver página correspondente.

## Formulário e contato

Preserve:

- WhatsApp: `https://wa.me/5567996882030`
- Telefone: `+55 (67) 99688-2030`
- E-mail: `carlasuzanamarinho@gmail.com`
- Endereço: `Rua Oliveira Marques, 1430, Centro - Dourados/MS`

## Qualidade antes de finalizar

- Rode `npm run check` para verificar HTML, links internos, fragments, CSS URLs e imagens esperadas.
- Rode `npm run audit:lhci` quando alterar UI, imagens, CSS/JS crítico ou templates compartilhados.
- Verifique HTML quebrado, links, imagens e responsividade.
- Rode `npm start` quando alterar UI.
- Faça revisão visual em largura mobile e desktop.
- Confira que WhatsApp, telefone, e-mail, idioma e navegação interna continuam funcionando.
- Se usar Playwright ou capturas locais, salve em `.context/` ou `output/` e não versione esses artefatos.
- Mantenha mudanças pequenas e focadas no pedido.
