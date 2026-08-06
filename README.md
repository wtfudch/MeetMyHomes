# MeetMyHomes

Site de imobiliária e alojamento local na Madeira — venda de propriedades e arrendamento de curta duração.

## Estrutura do projeto

```
app.js                   → entrada da aplicação Express
config/media.js          → gera os URLs do Cloudinary (ou locais, em dev)
controllers/             → lógica de cada página
data/properties.json     → propriedades à venda (texto + contagem de media)
data/listings.json       → alojamentos para arrendar (texto + contagem de media)
models/Property.js       → schema Mongoose, por agora não usado (ver nota abaixo)
routes/                  → uma rota por secção do site
views/                   → templates EJS
public/css, public/js    → estilos e scripts do browser
public/images/           → SÓ imagens de marca (logo, fundos) — não fotos de imóveis
scripts/upload-to-cloudinary.js → script de migração para o Cloudinary
```

**O que mudou em relação ao projeto original:** todas as fotos, plantas e vídeos
deixaram de estar no código. Em vez de centenas de ficheiros binários no Git,
`data/properties.json` e `data/listings.json` guardam apenas *quantas* fotos
cada imóvel tem (`imageCount`, `plantCount`, `videoCount`) e `config/media.js`
constrói o URL do Cloudinary a partir disso. O repositório fica leve para
sempre, mesmo que adiciones 10 imóveis novos com 50 fotos cada.

---

## 1. Configurar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:3000`. Sem `CLOUDINARY_CLOUD_NAME` definido no `.env`,
as imagens de imóveis tentam carregar de `public/images/<id>/`,
`public/plants/<id>/`, `public/videos/<id>/` — útil para testar com 2-3 fotos
locais antes de subires tudo para o Cloudinary.

## 2. Adicionar ou editar um imóvel

Não precisas de tocar em código nenhum. Edita `data/properties.json` (à venda)
ou `data/listings.json` (arrendamento):

```json
"novo-terreno-ponta-do-sol": {
  "id": "novo-terreno-ponta-do-sol",
  "title": "Terreno com vista mar na Ponta do Sol",
  "price": "€180,000",
  "area": "850 m²",
  ...
  "media": { "imageCount": 12, "imageExt": "jpg", "plantCount": 0, "plantExt": "jpg", "videoCount": 1 }
}
```

O campo `media` diz ao site quantas fotos/plantas/vídeos esperar — o resto é
calculado automaticamente. Depois sobe os ficheiros correspondentes para o
Cloudinary (ver secção 3) com o nome `novo-terreno-ponta-do-sol-1.jpg`,
`novo-terreno-ponta-do-sol-2.jpg`, etc.

---

## 3. Migração de fotos/vídeos para o Cloudinary

### Criar a conta
1. Cria uma conta gratuita em [cloudinary.com](https://cloudinary.com) (plano
   grátis: 25 GB de armazenamento + 25 GB de transferência/mês — mais do que
   suficiente para começar).
2. No Dashboard, copia **Cloud Name**, **API Key** e **API Secret**.
3. Cola-os no `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=o-teu-cloud-name
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

### Preparar os ficheiros locais
Cria uma pasta `media-to-upload` **ao lado** desta pasta do projeto (não
dentro, para nunca ires por engano para o Git), com a mesma organização que já
tinhas:

```
media-to-upload/
  images/
    terreno-atouguia/terreno-atouguia-1.jpg ... -25.jpg
    casa-neves/casa-neves-1.jpeg ... -45.jpeg      (alojamento, mesma pasta "images")
  plants/
    terreno-atouguia/terreno-atouguia-1.jpg
    casa-laranjeiras/casa-laranjeiras-1.png, -2.png
  videos/
    terreno-atouguia/terreno-atouguia-1.mov ... -4.mov
```

Os IDs das pastas têm de corresponder exatamente aos IDs em
`data/properties.json` / `data/listings.json`.

### Correr a migração
```bash
node scripts/upload-to-cloudinary.js
```

O script sobe tudo e no final mostra um resumo a comparar quantos ficheiros
*esperava* (segundo o JSON) com quantos *encontrou* localmente — ficas logo a
saber se falta alguma foto antes de publicares.

### Vídeos: nota importante
Os teus vídeos originais são `.mov` (formato da Apple), que não funciona bem
no Chrome/Firefox/Android. O script sobe-os como estão, mas o site pede-os
sempre como `.mp4` — o Cloudinary converte automaticamente na primeira vez que
alguém vê o vídeo, e guarda essa versão em cache. Não precisas de converter
nada manualmente.

### Pôr no ar
No Render, define a variável de ambiente `CLOUDINARY_CLOUD_NAME` (Settings →
Environment) com o mesmo valor do `.env`. A partir daí todas as imagens vêm
do CDN do Cloudinary, otimizadas automaticamente (WebP/AVIF quando o browser
suporta) — páginas mais rápidas e site final muito mais leve no Git.

---

## 4. ⚠️ Ação de segurança necessária — chave do Google Maps

A chave da API do Google Maps estava escrita em **texto simples no código**
(em 4 ficheiros diferentes) e foi enviada para o GitHub. Isto significa que
qualquer pessoa com acesso ao histórico do repositório (mesmo privado) pode
ver essa chave e usá-la — incluindo gerar custos na tua conta Google Cloud.

**Faz isto antes de publicar a nova versão:**

1. Vai a [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Localiza a chave antiga e **regenera-a** (ou apaga e cria uma nova).
3. Na chave nova, em **Application restrictions → HTTP referrers**, adiciona
   só os domínios que precisas, por exemplo:
   ```
   https://meetmyhomes.com/*
   https://*.onrender.com/*
   http://localhost:3000/*
   ```
4. Cola a chave nova no `.env` (local) e nas variáveis de ambiente do Render
   (`GOOGLE_MAPS_API_KEY`) — nunca no código.

Já não há nenhuma chave escrita no código novo — tudo vem de `process.env`.

---

## 5. Deploy no Render

1. **New → Web Service**, liga ao teu repositório GitHub.
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. Em **Environment**, adiciona:
   ```
   GOOGLE_MAPS_API_KEY=...
   CLOUDINARY_CLOUD_NAME=...
   NODE_ENV=production
   ```
   (`PORT` é definido automaticamente pelo Render — não precisas de o definir.)
5. Liga o teu domínio em **Settings → Custom Domain**.

---

## O que foi corrigido nesta reorganização

- **Repositório pesado** → fotos/vídeos saíram do Git; ficam no Cloudinary.
  Clonar o projeto agora demora segundos, não minutos.
- **Chave do Google Maps exposta em texto simples** em 4 ficheiros → removida
  do código; vem agora de variável de ambiente (ver secção 4 — ainda precisas
  de regenerar a chave antiga).
- **Rotas de debug acessíveis publicamente** (`/debug-public`,
  `/debug-permissions`, etc.) expunham caminhos absolutos do servidor e
  permissões de ficheiros a qualquer visitante do site → removidas.
- **Bug nos dados do imóvel "Lombo das Laranjeiras"**: uma chave `images`
  duplicada no código original fazia com que a galeria mostrasse as plantas
  da casa em vez das fotos reais (e a aba de plantas nem aparecia). As 24
  fotos verdadeiras nunca tinham sido visíveis no site. Corrigido.
- **Título dos imóveis nunca aparecia corretamente**: o código tentava
  traduzir o título como se fosse multilingue (`property.title['en']`), mas o
  título era sempre texto simples — isso devolvia `undefined`. Corrigido.
- **JavaScript morto**: um ficheiro (`script.js`) tentava carregar um
  carrossel a partir de um ficheiro JSON que nunca existiu e referenciava
  botões que já não estão em nenhuma página — só gerava erros na consola.
  Removido.
- **Carregamento duplicado do Google Maps** na página de listagens de
  arrendamento (carregava a API do Maps sem existir nenhum mapa nessa
  página) → removido.
- **Dependências nunca usadas** (`mongoose`, `express-session`,
  `@google-cloud/translate`) → removidas do `package.json`. Reduzem o tempo
  de instalação e o tamanho do projeto sem perder nada, já que nenhuma
  estava a ser usada (a sessão nunca tinha sido registada como middleware, a
  tradução é feita pelo widget gratuito do Google Translate no browser).
- **`nodemon` em falta**: o script `npm run dev` chamava `nodemon` sem este
  estar instalado como dependência → adicionado.

## Imagens de marca a substituir

Foram criados placeholders simples em `public/images/` para o site não
mostrar ícones de imagem quebrada. Substitui estes ficheiros pelos teus
verdadeiros quando tiveres:

- `mmhlogo.png` — logótipo
- `home-hero-bg.jpg` — fundo da hero section da homepage
- `about-bg.jpg` — fundo da hero section da página "Sobre"
- `about-us-image.jpg` — foto da equipa/escritório
- `fallback.jpg` — imagem genérica para quando um imóvel ainda não tem fotos

Estas ficam em `public/images/` (não no Cloudinary), porque são só 5
ficheiros fixos de marca, não conteúdo que cresce por imóvel.
