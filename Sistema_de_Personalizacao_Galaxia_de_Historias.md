# 🌌 **Sistema de Personalização — Galáxia de Histórias**

## Objetivo
Permitir que os usuários expressem identidade visual e conquistem diferenciação dentro da comunidade, de forma leve, opcional e compatível com a proposta estética da plataforma.

---

## 🪐 1. Temas de Perfil (Cores e Estilo)

**Descrição:**  
Cada usuário escolhe um tema visual que altera o plano de fundo, as cores de destaque e a tipografia do perfil.  

**Exemplos de temas:**
- Noite Estelar — fundo azul escuro, botões lilás.  
- Crepúsculo Literário — fundo marrom quente, acentos dourados.  
- Neon Cósmico — fundo preto, efeitos ciano e magenta.

**Detalhes técnicos:**
- Implementar via CSS variables ou Tailwind themes.  
- Estrutura escalável para novos temas no futuro.

**Mock config:**
```js
themeColors = {
  "noite-estelar": { bg: "#0a0f1f", accent: "#6b5cff" },
  "crepusculo": { bg: "#2e1b0f", accent: "#ff8a3c" },
  "neon-cosmico": { bg: "#080808", accent: "#0ff" },
};
```

---

## ✨ 2. Badges e Títulos

**Descrição:**  
Itens cosméticos exibidos sob o nome do usuário e em sua bio.  
Desbloqueados por marcos (leituras, seguidores, publicações, etc).

**Exemplos:**
- “Autor Estreante” — publicou sua primeira história.  
- “Mil Leitores” — alcançou 1000 visualizações totais.  
- “Mentor Literário” — comentou em 100 histórias de outros usuários.  

**Extras:**
- Eventos mensais podem gerar badges limitadas (“Autor do Mês”, “Festival Cósmico”).  

---

## 🌠 3. Planetas e Constelações (Identidade Visual Única)

**Descrição:**  
Cada história publicada é representada como um planeta dentro da “Constelação do Autor”.  
Os planetas variam em brilho conforme a popularidade das histórias.

**Detalhes técnicos (versão simplificada inicial):**
- Sistema SVG/CSS animado 2D.  
- Cores e brilhos derivados do gênero da história.  
- Hover → exibe título e link.  

**Exemplo visual:**
```
[🌕] História A — 2k leituras  
[🪐] História B — 500 leituras  
[⭐] História C — 10k leituras (brilho máximo)
```

---

## 💫 4. Música de Fundo (Premium)

**Descrição:**  
Usuário pode escolher uma música instrumental curta (30–60s) que toca no perfil, com botão para desligar.  
Usar catálogo interno sem direitos autorais.

**Implementação:**  
- Player HTML5 com `autoplay` desativado.  
- Botão de play/stop com ícone animado.  

---

## 🌙 5. Vitrine de Destaques

**Descrição:**  
Seção fixa no topo do perfil.  
Usuário pode destacar até 3 itens:
- Histórias próprias,  
- Citações favoritas,  
- Ou obras de outros autores que admira.

**Layout:**  
Cards horizontais com capa + título + botão “Ler”.

---

## 🛸 6. Personalização Avançada (Futuro / Premium)

**Ideias para versão 2.0:**
- Banner animado no topo do perfil.  
- Molduras dinâmicas em torno do avatar.  
- Fonte customizável para o nome do usuário.  
- Stickers colecionáveis aplicáveis no perfil.  

---

## 💰 7. Monetização Ligada à Personalização

**Moeda interna:**  
“⭐ Estrelas” — ganhas com engajamento (ler, comentar, publicar).  
Podem ser usadas para desbloquear temas, músicas, molduras e badges raras.

**Forma de compra:**  
Pacotes opcionais via Pix/cartão.  
Sem interferir na experiência de leitura gratuita.  

---

## 📋 **Prioridades de Implementação**

| Etapa | Funcionalidade | Complexidade | Status |
|-------|----------------|---------------|--------|
| 1 | Temas de perfil | 🟢 Baixa | — |
| 2 | Badges de conquistas | 🟡 Média | — |
| 3 | Vitrine de destaques | 🟢 Baixa | — |
| 4 | Constelação literária | 🔵 Alta | — |
| 5 | Música de fundo | 🟡 Média | — |
| 6 | Sistema de estrelas (moeda virtual) | 🔵 Alta | — |
| 7 | Recursos premium (molduras, banners) | 🔴 Alta | — |
