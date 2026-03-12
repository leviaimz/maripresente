# 💌 Presente Digital — Mariana

Site romântico interativo feito com Next.js, TailwindCSS e Framer Motion.

## 📁 Estrutura do projeto

```
marypresente/
├── public/
│   ├── video/
│   │   └── presente.mp4      ← COLOQUE SEU VÍDEO AQUI
│   └── audio/
│       └── music.mp3         ← COLOQUE SUA MÚSICA AQUI (opcional)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← Página principal (orquestra as cenas)
│   │   └── globals.css
│   └── components/
│       ├── ParticlesBackground.tsx
│       ├── IntroScreen.tsx
│       ├── MessageSequence.tsx
│       ├── GiftBox.tsx
│       ├── VideoReveal.tsx
│       ├── FinalMessage.tsx
│       ├── HiddenLetter.tsx
│       └── MusicToggle.tsx
```

## 🎬 Passo 1 — Adicionar o vídeo

1. Coloque seu vídeo na pasta `public/video/`
2. Renomeie para `presente.mp4`
3. Formato recomendado: MP4 (H.264), 1080p

## 🎵 Passo 2 — Adicionar música (opcional)

1. Coloque uma música romântica na pasta `public/audio/`
2. Renomeie para `music.mp3`
3. Sugestões: River Flows In You (Yiruma), A Thousand Years (instrumental)

## 🚀 Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## 🌐 Deploy no Vercel

```bash
npm install -g vercel
vercel --prod
```

Ou conecte o repositório diretamente no [vercel.com](https://vercel.com).

## ✨ Funcionalidades

- **Tela inicial** — Gradiente suave com partículas animadas
- **Sequência de mensagens** — 10 frases com animação tipográfica cinematográfica
- **Caixa de presente** — SVG animado com efeito de abertura e confetti colorido
- **Revelação do vídeo** — Player estilizado com barras cinematográficas
- **Mensagem final** — Assinatura com coração pulsante
- **Carta escondida** — Easter egg com modal deslizante
- **Música de fundo** — Toggle elegante no canto inferior direito
- **Partículas** — Estrelas e faíscas suaves no fundo
