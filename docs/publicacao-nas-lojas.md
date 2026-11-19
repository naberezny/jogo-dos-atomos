# Publicação nas lojas de aplicativos (proposta)

Plano para levar o Núcleo às lojas de aplicativos, a partir do mesmo código do site. Ainda **não
começado**: faltam as decisões da última seção. Escrito em novembro de 2026; as regras das lojas
mudam com frequência, então confira cada ponto no painel da loja na hora de publicar.

## Situação do projeto

- Jogo em React + Vite, sem servidor; o progresso fica no `localStorage`.
- Publicado no GitHub Pages: https://naberezny.github.io/jogo-dos-atomos/
- Ainda não é uma PWA: não tem manifesto, ícones de app nem service worker.
- O jogo compilado (`dist/`) tem cerca de 58 MB, quase tudo fotos (`public/fotos`, ~57 MB).
  Cabe nos limites das lojas (o Google Play aceita até 200 MB por pacote, contando os recursos).
- As fotos são do Wikimedia Commons (licenças CC); os créditos já aparecem no jogo e precisam
  continuar aparecendo no app.

## Como transformar o jogo em app

| Caminho | Como funciona | Prós | Contras |
|---|---|---|---|
| **Capacitor** (recomendado) | Empacota o jogo dentro de um app nativo Android e iOS | Funciona sem internet; não depende do GitHub Pages; dá acesso a vibração e tela cheia nativas | Cada atualização exige enviar uma versão nova às lojas |
| TWA (Bubblewrap / PWABuilder) | O app Android abre o site em tela cheia | Atualiza sozinho a cada envio à `main` | Precisa de internet; o Google exige um arquivo de verificação na raiz do domínio (`/.well-known/assetlinks.json`), o que não dá para fazer em `naberezny.github.io/jogo-dos-atomos/` sem criar o repositório `naberezny.github.io` ou usar um domínio próprio; não serve para a App Store |
| **PWA** (complemento) | O site vira instalável e funciona sem internet | Útil no próprio site (aparece "Instalar app"); é o caminho para a Microsoft Store | Sozinha não entra no Google Play nem na App Store |

Proposta: **Capacitor** para Android e iOS, mais **PWA** no site (que também leva à Microsoft Store).

## Lojas

| Loja | Como entra | Custo | Observações |
|---|---|---|---|
| **Google Play** | App Android (Capacitor), arquivo `.aab` | US$ 25, uma vez | Verificação de identidade. Contas pessoais novas precisam de **teste fechado com 12 testadores por 14 dias seguidos** antes de publicar para todos. Exige a versão mínima de Android do momento (target API), política de privacidade, classificação indicativa, público-alvo e formulário de segurança dos dados |
| **Apple App Store** (iPhone e iPad) | App iOS (Capacitor) | US$ 99 por ano | Precisa de um Mac para gerar o app, ou de uma máquina macOS no GitHub Actions. Revisão mais rigorosa: a Apple às vezes rejeita apps "que são só um site" (diretriz 4.2); como o jogo funciona inteiro sem internet, tem boas chances, mas não é garantido |
| **Microsoft Store** (Windows) | PWA empacotada pelo PWABuilder | Grátis para conta pessoal | Precisa da PWA pronta (manifesto, ícones, service worker) |
| **Samsung Galaxy Store** | O mesmo app Android | Grátis | Revisão própria da Samsung |
| **Huawei AppGallery** | O mesmo app Android | Grátis | Para celulares Huawei sem serviços do Google |
| **Amazon Appstore** | O mesmo app Android | Grátis | A Amazon anunciou em 2025 o fim da loja em celulares Android comuns, mantendo-a nos tablets Fire. Confirmar antes de investir tempo |
| **F-Droid** | Compila direto do repositório | Grátis | Só aceita apps de código aberto, com licença livre no repositório |

## Ordem sugerida

1. **PWA no site atual** (sem custo e já útil) e, em seguida, **Microsoft Store**.
2. **Google Play**: é o mais demorado por causa dos 14 dias de teste fechado; vale começar cedo.
3. **Galaxy Store** e **AppGallery**, com o mesmo arquivo do Android.
4. **App Store**, quando a conta Apple estiver pronta.
5. **F-Droid**, se o código for aberto.

## Divisão do trabalho

### Parte técnica (pode ser feita nas sessões com o Claude)

1. **PWA**: manifesto, ícones (incluindo o adaptativo do Android), service worker para funcionar
   sem internet e tela de abertura.
2. **Capacitor**: projetos `android/` e `ios/` no repositório, com nome, identificador, ícone,
   tela travada na vertical, área segura (notch e barra de navegação) e o botão Voltar do Android
   (o jogo já usa o histórico do navegador; conferir).
3. **GitHub Actions**: um workflow que gera e assina o `.aab`/`.apk` do Android e outro, em máquina
   macOS, que gera o app iOS. As chaves de assinatura ficam nos *secrets* do GitHub, guardadas pelo dono.
4. **Material das lojas**:
   - ícone 512 × 512 e imagem de destaque 1024 × 500 (Google Play);
   - capturas de tela de celular (e de tablet, para a App Store);
   - descrição curta e longa em português;
   - página de política de privacidade publicada no GitHub Pages (o jogo não coleta dados,
     não tem anúncios nem login, então ela é curta).

### Parte do dono do projeto

1. Criar as contas: Google Play Console (US$ 25), Apple Developer (US$ 99/ano), Microsoft Partner
   Center, Samsung Seller Portal e Huawei AppGallery Connect (grátis).
2. Verificar a identidade em cada loja.
3. Preencher os formulários: classificação indicativa, público-alvo, segurança dos dados e
   política de privacidade.
4. Reunir os 12 testadores para o teste fechado do Google Play.
5. Guardar com cuidado as chaves de assinatura (o Google também guarda uma cópia pelo
   "Play App Signing", mas a chave de envio é do dono).

## Decisões pendentes (para começar)

1. **Caminho**: Capacitor + PWA (recomendado) ou TWA.
2. **Nome e identificador do app**: por exemplo, "Núcleo: Jogo dos Átomos" e
   `io.github.naberezny.nucleo`. O identificador é o mesmo em todas as lojas e **não pode ser
   trocado depois** de publicado.
3. **Público-alvo**: inclui crianças abaixo de 13 anos? Se sim, valem as regras de apps para
   famílias do Google Play e da Apple (o jogo já não tem anúncios, login nem coleta de dados, o
   que facilita).
4. **F-Droid**: tornar o código aberto, com uma licença como GPL ou MIT? Se não, essa loja fica de fora.

Com essas respostas, o primeiro passo é a PWA, seguido do projeto Android.
