# CSM Psicologia

Landing page estática da psicóloga Carla Suzana Marinho, em Dourados/MS.

O site foi atualizado para comunicar acolhimento, ética profissional e clareza para quem procura atendimento psicológico. A home prioriza performance, SEO local e leitura por mecanismos de busca tradicionais e assistentes de IA.

## Stack

- HTML estático em `public/`
- CSS próprio em `public/assets/css/landing.css`
- Assets em `public/assets/img/`
- Deploy via GitHub Pages com `gh-pages`
- Formulário compatível com Netlify Forms

## Scripts

```bash
npm start
```

Sobe o site localmente em `http://localhost:3000`.

```bash
npm run deploy
```

Publica a pasta `public/` na branch `gh-pages`.

## Estrutura principal

- `public/index.html`: landing page principal.
- `public/en/index.html`: landing page em inglês.
- `public/assets/css/landing.css`: estilos modernos da landing.
- `public/assets/js/site.js`: smooth scroll e animações de entrada.
- `public/blog/`: índice e artigos estáticos do blog em português.
- `public/en/blog/`: índice e artigos estáticos do blog em inglês.
- `public/temas/` e `public/en/topics/`: páginas de temas por idioma.
- `public/robots.txt`: orientação para crawlers.
- `public/sitemap.xml`: sitemap XML para mecanismos de busca.
- `public/llms.txt`: resumo legível para assistentes de IA e crawlers semânticos.
- `public/sobre.html`: página antiga sobre a profissional, mantida no projeto.
- `AGENTS.md`: instruções para agentes de IA que forem editar o site.

## SEO

A landing inclui:

- `lang="pt-BR"`.
- Title e meta description com foco em "psicóloga em Dourados/MS".
- URL canônica.
- Open Graph e Twitter Card com imagem de preview.
- JSON-LD com `WebSite`, `LocalBusiness`, `MedicalBusiness` e `FAQPage`.
- Conteúdo em estrutura semântica com uma única tag `h1`.
- Seção de FAQ para capturar buscas conversacionais.
- Blog com artigos topo de funil sobre terapia, TCC, ansiedade, TDAH, depressão e terapia online.
- Versões PT-BR e EN com `hreflang` e URLs próprias.
- `robots.txt`, `sitemap.xml` e `llms.txt`.

## Direção editorial

Use linguagem acolhedora, objetiva e ética. Evite promessas de cura, garantias de resultado, urgência comercial agressiva, depoimentos de pacientes e qualquer texto que substitua avaliação profissional.

O objetivo da página é ajudar a pessoa a entender:

- quem é Carla Suzana Marinho;
- onde fica o consultório;
- quais públicos são atendidos;
- como entrar em contato;
- qual é a abordagem clínica geral.

## Checklist antes de publicar

- Rodar `npm start` e revisar a home em desktop e mobile.
- Conferir se links de WhatsApp, telefone, e-mail e redes sociais funcionam.
- Validar se o formulário mantém `name="contact"` e `data-netlify="true"`.
- Confirmar que metadados e Schema.org usam a URL `https://tgmarinho.github.io/csm/`.
- Evitar inserir informações clínicas sensíveis, diagnósticos ou promessas de resultado.
