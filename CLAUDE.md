# Jogo dos Átomos (Núcleo): contexto para o Claude

Jogo educativo em React + Vite (sem backend; progresso no `localStorage`). Publicado no GitHub Pages:
https://naberezny.github.io/jogo-dos-atomos/ (o GitHub Actions publica a cada push na `main`).
Todo o jogo, o código, os comentários e os commits são em **português do Brasil**.

## Como trabalhar neste projeto

- **Fluxo de git:** desenvolver no branch da sessão, fazer commit e push nele e, quando a mudança
  estiver testada, **mandar direto para a `main`** (fast-forward), sem perguntar. O dono do projeto
  autorizou isso de forma permanente.
- **Exceção:** quando o pedido for "mostre/tire um print antes do commit", não commitar até a aprovação.
- **Testar sempre no navegador** antes do commit: `npx vite --port 5173` em segundo plano e um script
  Playwright (Chromium já instalado; `require('playwright')`). Testar no celular (`devices['Pixel 7']`)
  e no computador. Para gestos de toque (segurar, arrastar, pinça) usar CDP `Input.dispatchTouchEvent`.
  Mandar capturas ao usuário quando a mudança for visual. Não deixar `.png` de teste na pasta do projeto.
- **Conferir dados** com `node scripts/verificar-catalogo.mjs --geometria` (fórmulas, SMILES, geometria)
  sempre que mexer em substâncias.
- **Dados científicos devem ser reais.** Não inventar linhas de espectro, valores ou fatos; na dúvida,
  buscar a fonte (NIST, PubChem) ou deixar de fora.
- **Rede:** o ambiente de nuvem "jogo-dos-atomos" libera `physics.nist.gov` (script de espectros) e
  Wikimedia (commons, en.wikipedia, upload, thumb). No Node, rodar com `NODE_USE_ENV_PROXY=1`. O ambiente "Default" não libera.

## Mapa do código

```
src/App.jsx                 navegação, barras de nível, sequência de comemoração (revelação → XP → nível)
src/nav.js                  seções (a de medalhas é `oculta`: fora do menu)
src/game/logic.js           regras: combinação, XP/nível, MISSIONS, medals (conquistas), geom3d, mensagens do reator
src/game/useGame.js         estado salvo (SAVED), fusão, `revelar` (abre a tela "Uau!")
src/game/estrutura.js       SMILES → átomos/ligações e geometria 2D/3D (raios COV/ION por elemento)
src/game/cor.js             cores CPK dos átomos nos modelos moleculares
src/data/nucleo.js          118 elementos + catálogo (junta src/data/grupos/*.js)
src/data/grupos/*.js        substâncias por tamanho: muito-faceis (2–4 átomos), faceis (5–9), medias (10–26), desafio
src/data/estruturas.js      SMILES de cada substância (maiúsculas só; `~` = atração iônica; [X+n] = íon)
src/data/medalhas.js        medalhas: exclusivas, grupos (fs e/ou regex no nome) e do subatômico; frases da revelação
src/data/espectros.json     linhas de emissão visíveis (NIST) de 97 elementos + D
src/data/ciencia.json       dados físico-químicos (PubChem) e cor CPK por elemento
src/data/subatomico.js      partículas e receitas do modo subatômico
src/hooks/usePegarElemento.js  gestos da tabela: toque = adiciona, arrastar = pega na hora, segurar 0,45 s = detalhes
src/components/             Celebracao (revelação + XP em tela cheia), LevelUp, Medalha, Mol3D (3D com zoom), Foto (galeria),
                            ElementFicha (ficha do elemento), Espectro, PeriodicTable, Tour (onboarding)
src/screens/                Lab, Collection (filtros), Subatomico, Estudos, Missions, Profile, Medalhas, ResultModal
scripts/                    verificar-catalogo.mjs, baixar-espectros.mjs (NIST), baixar-fotos.mjs (Wikimedia)
```

## Estado atual (novembro de 2026)

- **512 substâncias**, usando 103 dos 118 elementos. Os 15 restantes (Fr, Fm–Lr, Mt–Og) não têm
  composto conhecido; o reator e a ficha explicam o porquê (`SEM_COMPOSTO` em `logic.js`).
  Isômeros (frutose, lactose…) não entram: a combinação é identificada só pela fórmula.
- **Descoberta nova:** tela "Uau!" com título e frase da medalha principal → barra de XP em tela cheia
  → subida de nível, se houver. Opção no perfil para mostrar a revelação também em repetidas (padrão: desligada).
- **Medalhas:** 156 (109 exclusivas, 47 de grupo com Bronze/Prata/Ouro/Platina); tela própria, aberta
  pela ficha da substância ou pelo perfil. Toda substância tem ao menos uma medalha (conferir ao adicionar).
- **Missões:** 58, todas concluíveis com o catálogo completo; conquistas: 21.
- **Coleção:** filtro principal (Todas/Descobertas) + subfiltros (estado, composição, tamanho, grupo) e busca.
- **Laboratório (celular):** tabela compacta que rola pela faixa vazia do topo ("Arraste aqui para rolar
  a tabela"); botões − + +5 só no átomo ativo (o último adicionado); toque no vazio do reator tira a seleção.
- **Fotos:** 503 das 512 substâncias têm foto (Wikimedia Commons, 500 px), ~1.200 no total, todas
  escolhidas à mão e com legenda. A 1ª é a principal (capa, coleção, revelação): a própria substância
  ou onde ela é encontrada/usada (água → mar, PVC → cano). Na ficha da substância, a galeria fica abaixo
  de "No dia a dia" e antes da curiosidade (setas, miniaturas, arrastar para o lado); cada foto tem
  título e uma descrição de 1–2 frases com um fato real ligado à substância. O quadro da estrutura
  tem só 2D/3D e abre no 3D (no computador ele fica parado enquanto a coluna da direita rola). Lista em `scripts/fotos-escolhidas.mjs` ([arquivo, título, descrição]; null = sem foto); `scripts/baixar-fotos.mjs` baixa para `public/fotos/<f>.jpg`, `<f>-2.jpg`… A API da Wikimedia
  dá muito 429 aqui; para buscar candidatas use as páginas HTML (Special:MediaSearch) e miniaturas de
  thumb.wikimedia.org.
- **Modelo 3D da molécula:** cores CPK, luz que gira com a molécula, varetas 28% mais curtas
  (`VARETA` em `logic.js`), zoom por pinça/roda (60–400%) e botão ↺ que restaura zoom e ângulo.
- **Ficha do elemento:** topo com símbolo + prótons/nêutrons/elétrons (alinhados à base do símbolo);
  átomo 3D e camadas sempre visíveis (seletor de vista dentro do quadro); abas Básico (badges de
  descoberta/estado, história, nome, curiosidades, no jogo) e Avançado (espectro de emissão,
  identidade, distribuição eletrônica, propriedades).
- **Modo subatômico:** espectro nas descobertas de átomos (H, D, He, anti-H); núcleos e átomos exóticos
  explicam por que não têm linhas visíveis.

## Ideias que ficaram em aberto

- No computador ainda existe o botão largo "Detalhes" ao lado do reator do laboratório, e no modo
  subatômico o reator ainda tem o botão "Detalhes" (celular) e a lista de partículas abaixo do reator;
  no laboratório esses dois foram removidos a pedido. Perguntar antes de remover.
- Sons curtos nas comemorações (com opção de desligar) e raridade das substâncias ("Rara", "Lendária")
  foram sugeridos e ainda não pedidos.
