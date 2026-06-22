# CSM Psicologia

Site estático da psicóloga Carla Suzana Marinho, em Dourados/MS.

O projeto publica uma landing page bilíngue, páginas educativas por tema e blog estático. A comunicação deve permanecer acolhedora, profissional, ética e clara para pessoas que procuram atendimento psicológico presencial ou online.

## Stack

- HTML estático dentro de `public/`.
- CSS próprio em `public/assets/css/landing.css`.
- JavaScript leve em `public/assets/js/site.js`.
- Imagens reais e favicons em `public/assets/img/`.
- Formulário compatível com Netlify Forms.
- Deploy pela Netlify usando `public/` como diretório publicado.

Não há framework, bundler ou etapa de build.

## Scripts

```bash
npm start
```

Serve `public/` em `http://localhost:3000`.

O deploy é feito pela Netlify. Use `public/` como publish directory; o arquivo `netlify.toml` já define essa configuração.

## Estrutura

- `public/index.html`: landing principal em português.
- `public/en/index.html`: landing em inglês.
- `public/success.html`: retorno do formulário.
- `public/404.html`: página de erro.
- `public/sobre.html`: página antiga sobre a profissional, mantida no projeto.
- `public/blog/`: índice e artigos em português.
- `public/en/blog/`: índice e artigos em inglês.
- `public/temas/`: páginas de temas em português.
- `public/en/topics/`: páginas de temas em inglês.
- `public/robots.txt`: orientação para crawlers.
- `public/sitemap.xml`: URLs indexáveis.
- `public/llms.txt`: resumo factual para assistentes de IA.
- `docs/`: capturas de referência visual.
- `AGENTS.md`: regras para agentes de IA editarem o repositório.

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

Use linguagem acolhedora, objetiva e ética. O site pode explicar formação, abordagem clínica, públicos atendidos, endereço, atendimento online e formas de contato.

Evite promessas de cura, garantias de resultado, diagnósticos, aconselhamento psicológico individualizado, depoimentos de pacientes e urgência comercial agressiva. Quando faltar uma informação profissional, não invente.

## Contato

Preserve estes dados enquanto não houver orientação contrária:

- WhatsApp: `https://wa.me/5567996882030`
- Telefone: `+55 (67) 99688-2030`
- E-mail: `carlasuzanamarinho@gmail.com`
- Endereço: `Rua Oliveira Marques, 1430, Centro - Dourados/MS`
- Formulário: `name="contact"` e `data-netlify="true"`

## Checklist

- Rodar `npm start` e revisar `http://localhost:3000`.
- Conferir desktop e mobile.
- Verificar links de WhatsApp, telefone, e-mail, idiomas e navegação interna.
- Confirmar imagens carregando sem caminhos quebrados.
- Validar que SEO, sitemap e `llms.txt` acompanham mudanças de URL.
- Manter mudanças pequenas, estáticas e fáceis de publicar.
