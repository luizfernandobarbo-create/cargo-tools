# Cargo Tools — Cubagem e Giro

App de celular para conferir se um volume cabe nos porões e calcular o peso taxado.

- Aeronaves: Boeing 737-800 e 737-700 (GOL) e Airbus A320 (Avianca, somente voos internacionais)
- Cubagem (C × L × A ÷ 6.000) e peso taxado (o maior entre cubado e bruto)
- Comprimento máximo pela tabela de giro de cada porão
- Peso máximo por volume conforme o destino (padrão de 200 kg)
- Sugestão de outra posição quando a carga não cabe, com desenho da caixa
- Tema claro e escuro
- Funciona sem internet depois do primeiro acesso

## Arquivos do pacote

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app |
| `manifest.webmanifest` | Nome, cores e ícones usados na instalação |
| `sw.js` | Guarda o app no celular para uso sem internet |
| `icons/` | Ícones do app |
| `fonts/` | Fontes Barlow (licença OFL, arquivo `OFL.txt`) |
| `logos/` | Logos oficiais das companhias (opcional, veja abaixo) |
| `.nojekyll` | Faz o GitHub Pages publicar os arquivos exatamente como estão (opcional) |

## Publicar no GitHub Pages

> **Atenção:** no plano gratuito do GitHub, o Pages só funciona com repositório **público**. Qualquer pessoa com o endereço consegue abrir o app e ver as tabelas. Confirme se isso está de acordo com as regras internas antes de publicar.

1. Entre em [github.com](https://github.com) com a sua conta.
2. Clique em **+** (canto superior direito) e depois em **New repository**.
3. Em **Repository name**, digite `cargo-tools`. Marque **Public** e clique em **Create repository**.
4. Na página do repositório, clique no link **uploading an existing file** (ou em **Add file → Upload files**).
5. Descompacte o `.zip`, abra a pasta `cargo-tools` e arraste **o conteúdo dela** para a página do GitHub: `index.html`, `manifest.webmanifest`, `sw.js` e as pastas `icons`, `fonts` e `logos`. Arraste o conteúdo, não a pasta `cargo-tools`.
6. Clique em **Commit changes**.
7. Vá em **Settings → Pages**. Em **Build and deployment**, escolha **Source: Deploy from a branch**, **Branch: main** e a pasta **/ (root)**. Clique em **Save**.
8. Aguarde 1 a 2 minutos e recarregue a página. O endereço do app aparece no topo:
   `https://SEU-USUARIO.github.io/cargo-tools/`

## Instalar no celular

**Android (Chrome)**
1. Abra o endereço do app no Chrome.
2. Toque no menu **⋮** e em **Instalar app** (em alguns aparelhos: **Adicionar à tela inicial**).
3. O ícone **Cargo Tools** aparece junto com os outros apps.

**iPhone (Safari)**
1. Abra o endereço do app no Safari.
2. Toque em **Compartilhar** (quadrado com a seta para cima).
3. Toque em **Adicionar à Tela de Início** e depois em **Adicionar**.

Depois do primeiro acesso, o app abre mesmo sem internet.

## Atualizar o app

1. No repositório, clique em **Add file → Upload files**, envie o novo `index.html` e clique em **Commit changes**.
2. Quem já instalou recebe a versão nova na próxima vez que abrir o app com internet.
3. Se também mudar ícones, fontes ou logos, abra o `sw.js` no GitHub, clique no lápis e aumente o número da linha `const VERSAO = 'cargo-tools-…'` (por exemplo, de `2.0.0` para `2.0.1`). O app mostra o aviso **Nova versão do app disponível** com o botão **Atualizar**.

## Logos oficiais (opcional)

Sem arquivo de logo, o cabeçalho mostra um selo com o nome da companhia (GOL ou AVIANCA). Para usar o logo oficial:

1. Use a versão do logo **para fundo escuro**, porque o cabeçalho do app é azul-escuro.
2. Salve com um destes nomes: `gol.svg` ou `gol.png`, e `avianca.svg` ou `avianca.png`. Um PNG com fundo transparente e cerca de 120 px de altura fica nítido.
3. No repositório, abra a pasta `logos`, clique em **Add file → Upload files**, envie o arquivo e clique em **Commit changes**.

O logo aparece no cabeçalho quando uma aeronave da companhia está selecionada: B737 para a GOL e A320 para a Avianca.

## Regras aplicadas

| Regra | B737-800 / 737-700 (GOL) | A320 (Avianca) |
|---|---|---|
| Altura máxima | 82 cm | 115 cm |
| Base (a carga pode girar: C × L ou L × C) | menor lado até 122 cm | menor lado até 140 cm (dimensão máxima para aceite) |
| Comprimento máximo | tabela de giro do porão | tabela de giro do porão |
| Medida entre valores da tabela | usa a altura e a largura logo acima | alturas em faixas: até 70, 71 a 97 e 98 a 115 cm |
| Peso por volume | 200 kg ou o limite do destino | 200 kg ou o limite do destino |
| Malha | nacional e internacional | somente internacional |
| Fonte | MN-CGO-FF-006 Rev.05 | Manual Geral de Cargas, título 1, cap. 5, seção 7 |

Quando a carga não cabe, o app testa as outras posições (deitar ou virar a carga) e mostra a alternativa com o desenho da caixa.

## Onde editar tabelas e limites

Tudo fica no `index.html`, dentro do bloco `<script>`:

- `T738_FWD`, `T738_AFT`, `T737_FWD`, `T737_AFT`: tabelas de giro do B737
- `T320_FWD`, `T320_AFT`: tabelas de giro do A320
- `FROTA`: limites de cada aeronave (altura máxima, menor lado da base, porta, compartimentos)
- `AIRPORTS_INTL` e `AIRPORTS_NAC`: peso máximo por volume em cada destino

Para editar pelo GitHub: abra o `index.html`, clique no lápis, altere o valor e clique em **Commit changes**.

## Instalador Android (opcional)

Com o app publicado, o [PWABuilder](https://www.pwabuilder.com) gera um pacote Android a partir do endereço do GitHub Pages, caso queira distribuir o app por loja.
