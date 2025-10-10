# TODO.md - Sprint 3: UI/UX Polimento e Atualização de Mock Data

## Tasks from Approved Plan

### 1. Atualizar Mock Stories com Imagens Reais (Adicionado pelo Usuário)
- [x] Pesquisar e adicionar URLs de imagens da internet para as histórias mockadas em src/data/stories.ts (ex: Unsplash, Pexels para temas cósmicos/fantasia).
- [x] Garantir que as imagens sejam relevantes aos títulos/descrições das histórias.
- [x] Testar carregamento das imagens no Home.tsx e StoryCard.tsx.

### 2. Task 4.2: Framer Motion para Animações
- [x] Adicionar staggerChildren em listas de histórias no src/pages/Home.tsx (usar AnimatePresence e variants para StoryCards).
- [x] Implementar animate open/close no src/components/Modal.tsx (variants para scale/fade).
- [x] Adicionar page transitions no src/App.tsx (AnimatePresence para rotas, com variants para fade/slide).

### 3. Task 4.3: Hover States e Transições
- [x] Expandir hover em src/components/StoryCard.tsx (glow cósmico com boxShadow purple/blue, rotate icons).
- [x] Adicionar scale e glow em modais e botões no src/components/Modal.tsx e Header.tsx.

### 4. Task 4.4: Responsividade 100%
- [x] Otimizar grids para mobile em src/pages/Home.tsx (grid-cols-1 em sm, touch-friendly).
- [x] Garantir menu hambúrguer funcional no src/components/Header.tsx (stagger no mobile menu).
- [x] Testar em browser (resize window, mobile view).

### 5. Task 4.5: Lazy loading de imagens
- [x] Adicionar loading="lazy" em todas as imagens (StoryCard, Home, StoryDetail)

### Followup Steps
- [ ] Testar animações e responsividade no browser (yarn dev, interact with pages).
- [ ] Atualizar progresso.md para marcar Sprint 3 como 100% completa.
- [ ] Prosseguir para Sprint 4 (lazy loading, skeletons).

Progresso Atual: 0/9 tasks completas
