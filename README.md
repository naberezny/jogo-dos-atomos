# Núcleo · Jogo dos Átomos e Substâncias

Jogo educativo de química: combine átomos da tabela periódica no reator e descubra
substâncias reais, como água, sal de cozinha, metano, glicose e cafeína.

**Jogar:** https://naberezny.github.io/jogo-dos-atomos/

## Como jogar

1. No **Laboratório**, toque num elemento da tabela periódica para abrir a ficha e adicioná-lo, ou arraste-o direto para o reator.
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

## Conteúdo

- 118 elementos com massa, raio atômico, categoria e distribuição eletrônica (com as exceções do Cr, Cu, Mo, Pd, Ag, Pt e Au)
- 438 substâncias, de H₂O ao ATP, com estado físico, uso no dia a dia e curiosidade
- Foto real de 83 substâncias (Wikimedia Commons, com autor e licença) e molécula em 2D e em 3D
- 49 missões, 16 medalhas
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
