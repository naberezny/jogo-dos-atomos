# Núcleo · Jogo dos Átomos e Substâncias

Jogo educativo de química: combine átomos da tabela periódica no reator e descubra
substâncias reais, como água, sal de cozinha, metano, glicose e cafeína.

**Jogar:** https://naberezny.github.io/jogo-dos-atomos/

## Como jogar

1. No **Laboratório**, toque ou arraste um elemento da tabela periódica para o reator.
2. Ajuste a quantidade de cada átomo com `−` e `+`. O painel ao lado diz se falta algum átomo
   (e você pode tocar na dica para adicioná-lo).
3. Quando a proporção bate com uma substância do catálogo, aparece o botão **Fundir**.
4. A nova substância entra na **Coleção**, rende XP e avança as **Missões** e as medalhas do **Perfil**.

Use o **raio‑x** de qualquer elemento para ver a eletrosfera em 3D, as camadas K–Q e a
distribuição eletrônica de Linus Pauling.

## Conteúdo

- 118 elementos com massa, raio atômico, categoria e distribuição eletrônica (com as exceções do Cr, Cu, Mo, Pd, Ag, Pt e Au)
- 26 substâncias, com estado físico, uso no dia a dia e curiosidade
- Molécula em 2D e em 3D (bolas e varetas)
- 7 missões, 8 medalhas e níveis a cada 300 XP
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
src/components/   átomo e molécula animados em canvas
src/screens/      telas: início, laboratório, raio-x, resultado, coleção, missões, perfil
```
