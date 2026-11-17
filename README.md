# Núcleo · Jogo dos Átomos e Substâncias

Jogo educativo de química: combine átomos da tabela periódica no reator e descubra
substâncias reais, como água, sal de cozinha, metano, glicose e cafeína.

**Jogar:** https://naberezny.github.io/jogo-dos-atomos/

## Como jogar

1. No **Laboratório**, toque num elemento da tabela periódica para colocá-lo no reator, ou arraste-o até lá
   (no celular, segure o dedo sobre ele por meio segundo para "pegar" o átomo). O botão **Detalhes** abre a ficha
   do átomo selecionado no reator.
2. Ajuste a quantidade de cada átomo com `−`, `+` e `+5`. O painel ao lado diz se falta algum átomo
   (e você pode tocar na dica para adicioná-lo).
3. Quando a proporção bate com uma substância do catálogo, aparece o botão **Fundir**.
4. A nova substância entra na **Coleção**, rende XP e avança as **Missões** e as medalhas do **Perfil**.

Toque em qualquer elemento para abrir a **ficha** dele: eletrosfera em 3D com as camadas K–Q e, abaixo,
as abas **Básico** (como foi descoberto, origem do nome e curiosidades) e **Avançado** (grupo, período,
bloco, partículas, distribuição eletrônica, pontos de fusão e ebulição, densidade, eletronegatividade,
energia de ionização, afinidade eletrônica e estados de oxidação), além do botão para adicioná-lo ao reator.

Na aba **Estudos**, a tabela periódica e a ficha completa de cada elemento ficam lado a lado, com busca
por nome, símbolo ou número, sem o reator.

A tela inicial reúne um cartão para cada seção, e toda tela tem uma seta de voltar. A navegação entra no
histórico do navegador: o botão Voltar do celular funciona, e links como `…/#estudos` abrem direto na seção.

Na primeira visita, um tour de seis passos explica o essencial; ele pode ser reaberto pela tela inicial.

## Conteúdo

- 118 elementos com massa, raio atômico, categoria e distribuição eletrônica (com as exceções do Cr, Cu, Mo, Pd, Ag, Pt e Au)
- Espectro de emissão visível de 97 elementos e do deutério, com as linhas reais do NIST Atomic Spectra Database (`node scripts/baixar-espectros.mjs` atualiza os dados); no modo subatômico, os átomos descobertos também mostram o espectro
- 512 substâncias, de H₂O ao ATP, com estado físico, uso no dia a dia e curiosidade, usando 103 dos 118 elementos (os outros 15 ainda não formaram nenhum composto conhecido; o jogo explica o porquê)
- Foto real de 83 substâncias (Wikimedia Commons, com autor e licença) e molécula em 2D e em 3D
- 58 missões e 21 conquistas
- 156 medalhas de descoberta: 109 exclusivas de uma substância ou partícula e 47 de grupo (Bronze, Prata, Ouro e Platina)
- Modo subatômico: as 18 partículas do Modelo Padrão (e suas antipartículas) formam 70 hádrons, átomos, forças e processos e níveis a cada 300 XP
- Progresso salvo no navegador

## Desenvolvimento

```bash
npm install
npm run dev
```

```bash
npm run build
```

O build sai em `dist/`. A cada push na `main`, o GitHub Actions publica o jogo no GitHub Pages.

### Docker

```bash
docker compose up -d --build
```

Sobe o jogo com nginx na porta 8096 (mude com `PORTA=9000 docker compose up -d --build`).

## Estrutura

```
prototipo/        protótipo original feito no Claude Design (referência)
src/data/         elementos e substâncias
src/game/         regras do jogo (combinação, XP, missões) e estado salvo
src/components/   peças reutilizáveis: tabela periódica, ficha do elemento, átomo e molécula em canvas
src/hooks/        hooks compartilhados
src/screens/      telas: início, laboratório, coleção, subatômico, estudos, missões, perfil
```

## Créditos das fotos

As fotos em `public/fotos/` vêm da Wikimedia Commons. Autor, licença e página de origem de cada
uma estão em `src/data/fotos.json` e aparecem no jogo abaixo da foto. Para baixar de novo ou trocar
uma foto, edite `ARQUIVO` em `scripts/baixar-fotos.mjs` e rode `node scripts/baixar-fotos.mjs`.

## Dados dos elementos

Os dados físicos e químicos (`src/data/ciencia.json`) vêm da tabela periódica da
[PubChem](https://pubchem.ncbi.nlm.nih.gov/periodic-table/) (NIH). A história, a origem do nome e as
curiosidades (`src/data/historia/`) foram escritas para o jogo.
