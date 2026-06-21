# AGENTS.md

Instruções para agentes de IA trabalhando neste repositório.

## Contexto do projeto

Este é o site estático da CSM Psicologia, landing page da psicóloga Carla Suzana Marinho em Dourados/MS.

O público principal são pessoas procurando atendimento psicológico para si, para filhos, para casal ou para família. A comunicação deve ser acolhedora, profissional, clara e ética.

## Stack e comandos

- Edite arquivos dentro de `public/`.
- A landing principal é `public/index.html`.
- A landing em inglês é `public/en/index.html`.
- O CSS novo da landing é `public/assets/css/landing.css`.
- O JavaScript de interação leve é `public/assets/js/site.js`.
- O blog em português fica em `public/blog/`.
- O blog em inglês fica em `public/en/blog/`.
- As páginas de temas ficam em `public/temas/` e `public/en/topics/`.
- Rode localmente com `npm start`.
- Deploy com `npm run deploy`.

Não introduza frameworks, bundlers ou dependências novas sem necessidade. O projeto deve continuar simples, estático e fácil de publicar.

## Direção visual

- Visual moderno, calmo e confiável.
- Paleta atual: azul profundo `#3F556B`, azul acinzentado `#8FA3AD`, rosa queimado `#D6A5A4`, blush `#E8C7C3`, rosa claro `#F2DAD7`, bege claro `#F4EFEF` e cinza claro quente `#D9D9D9`.
- Use fotos reais existentes em `public/assets/img/` sempre que possível.
- Preserve contraste e legibilidade.
- Não volte ao estilo antigo de carrossel, overlays roxos, placeholders em inglês ou animações pesadas.
- Não use hero genérico com gradiente abstrato quando houver foto real do consultório.
- Mantenha animações leves, com `prefers-reduced-motion` respeitado.

## Conteúdo e ética profissional

Permitido:

- Descrever formação, abordagem clínica, públicos atendidos e formas de contato.
- Usar linguagem acolhedora e institucional.
- Explicar que a terapia pode ajudar no autoconhecimento, regulação emocional e organização de estratégias.

Evite:

- Prometer cura, melhora garantida ou resultado específico.
- Usar depoimentos reais ou simulados de pacientes.
- Criar senso de urgência comercial agressivo.
- Fazer diagnóstico ou aconselhamento psicológico no texto do site.
- Expor informações sensíveis de pacientes.

Quando faltar dado profissional, não invente. Use texto neutro ou peça confirmação.

## SEO e AI SEO

Mantenha:

- Uma única tag `h1` na home.
- `lang="pt-BR"`.
- Title e description focados em "psicóloga em Dourados/MS".
- Canonical para `https://tgmarinho.github.io/csm/`.
- Páginas em inglês com canonical próprio e `hreflang` apontando para a versão PT-BR equivalente.
- Open Graph e Twitter Card.
- JSON-LD com `WebSite`, `LocalBusiness`/`MedicalBusiness` e `FAQPage`.
- `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt` atualizados.

Para AI SEO, prefira seções factuais, respostas diretas no FAQ e um `llms.txt` conciso. Não adicione conteúdo artificial só para palavras-chave.

## Blog

- Artigos devem ser educativos, topo de funil e escritos em português brasileiro.
- Não prometa cura, diagnóstico ou resultado específico.
- Use title, description, canonical e Open Graph por artigo.
- Atualize `public/sitemap.xml` e `public/llms.txt` ao criar novas páginas.

## Formulário e contato

Preserve:

- WhatsApp: `https://wa.me/5567996882030`
- Telefone: `+55 (67) 99688-2030`
- E-mail: `carlasuzanamarinho@gmail.com`
- Endereço: `Rua Oliveira Marques, 1430, Centro - Dourados/MS`
- Formulário com `name="contact"` e `data-netlify="true"`.

## Qualidade antes de finalizar

- Verifique HTML quebrado, links, imagens e responsividade.
- Rode `npm start` quando alterar UI.
- Faça revisão visual em largura mobile e desktop.
- Mantenha mudanças pequenas e focadas no pedido.
