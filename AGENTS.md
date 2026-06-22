# AGENTS.md

Instruções para agentes de IA trabalhando neste repositório.

## Contexto

Este é o site estático da CSM Psicologia, da psicóloga Carla Suzana Marinho em Dourados/MS.

O público principal são pessoas procurando atendimento psicológico para si, filhos, casal ou família, além de adolescentes, adultos, brasileiros no exterior e pessoas que buscam atendimento online em português ou inglês. A comunicação deve ser acolhedora, profissional, clara e ética.

## Arquivos e comandos

- Edite principalmente arquivos dentro de `public/`.
- A home em português é `public/index.html`.
- A home em inglês é `public/en/index.html`.
- O CSS principal é `public/assets/css/landing.css`.
- O JavaScript leve é `public/assets/js/site.js`.
- O blog em português fica em `public/blog/`.
- O blog em inglês fica em `public/en/blog/`.
- As páginas de temas ficam em `public/temas/` e `public/en/topics/`.
- Imagens, ícones e preview social ficam em `public/assets/img/`.
- Capturas de referência visual ficam em `docs/`.
- Rode localmente com `npm start` e abra `http://localhost:3000`.
- Deploy pela Netlify, publicando a pasta `public/`.

Não introduza frameworks, bundlers ou dependências novas sem necessidade. O projeto deve continuar simples, estático e fácil de publicar.

## Direção visual

- Visual moderno, calmo, humano e confiável.
- Paleta atual: azul profundo `#3F556B`, azul acinzentado `#8FA3AD`, rosa queimado `#D6A5A4`, blush `#E8C7C3`, rosa claro `#F2DAD7`, bege claro `#F4EFEF` e cinza claro quente `#D9D9D9`.
- Use fotos reais existentes em `public/assets/img/` sempre que possível.
- Preserve contraste, legibilidade e respiro.
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
- Formulário com `name="contact"` e `data-netlify="true"`.

## Qualidade antes de finalizar

- Verifique HTML quebrado, links, imagens e responsividade.
- Rode `npm start` quando alterar UI.
- Faça revisão visual em largura mobile e desktop.
- Confira que WhatsApp, telefone, e-mail, idioma e navegação interna continuam funcionando.
- Mantenha mudanças pequenas e focadas no pedido.
