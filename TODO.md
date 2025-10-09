# TODO - Correção e Implementações

## 1. Correção do Erro de Persistência nos Comentários
- [x] Atualizar `interactionService.ts`: Adicionar `chapterId` à interface `LocalComment` e atualizar funções para suportar comentários por capítulo.
- [x] Modificar `StoryDetail.tsx`: Usar `interactionService` para carregar e adicionar comentários por capítulo, removendo modificação direta de `mockStories.comments`.
- [x] Testar persistência: Adicionar comentário, recarregar página, verificar se comentário permanece.

## 2. Task 1.1: Adicionar Comentários por Parágrafo
- [x] Atualizar `StoryDetail.tsx`: Implementar sistema visual de comentários inline nos parágrafos (ícone no hover, modal/popover).
- [x] Atualizar `interactionService.ts`: Adicionar suporte para `paragraphIndex` nos comentários.
- [x] Testar: Clicar em parágrafo, adicionar comentário, verificar exibição.

## 3. Task 3.1: Página "Nova História"
- [x] Criar `NewStory.tsx`: Formulário para título, descrição, gêneros, tags, capa, capítulos dinâmicos.
- [x] Adicionar rota `/nova` em `App.tsx`.
- [x] Integrar com `useStories` para salvar histórias localmente.
- [x] Testar: Criar nova história, verificar se aparece na lista.

## 3. Task 3.3: Editar/Excluir histórias
- [x] Botões "Editar" e "Excluir" nos cards de histórias do autor
- [x] Página EditStory.tsx para edição de histórias
- [x] Rota /editar/:id adicionada
- [x] Confirmação antes de excluir
- [x] Navegação funcional entre páginas

## 4. Verificações Finais
- [x] Garantir que ao clicar em "explorar histórias", o conteúdo apareça corretamente (capítulos, comentários, etc.).
- [x] Testar responsividade e dark mode.

## 5. Create Reader Page and Enhance Login Page
- [x] Create `src/pages/Login.tsx` with cosmic theme, tabbed interface for login/registration.
- [x] Update `src/components/AuthorLogin.tsx` to cosmic theme (glassmorphism, gradients, animations).
- [x] Update `src/components/AuthorRegistration.tsx` to cosmic theme.
- [x] Create `src/pages/Reader.tsx` for immersive story reading with cosmic background.
- [x] Add routes `/login` and `/reader/:id` in `src/App.tsx`.
- [ ] Test new pages for cosmic theme consistency and functionality.

## 6. Próximas Tasks Prioritárias (Sprint 2)

### Task 3.3: Finalizar edição e exclusão de histórias
- [x] Implementar botão "Excluir" funcional em Authors.tsx
- [x] Adicionar confirmação de exclusão com modal
- [x] Testar exclusão completa da história e redirecionamento

### Task 3.4: Preview instantâneo aprimorado
- [ ] Melhorar preview em tempo real no NewStory.tsx
- [ ] Adicionar preview de capítulos no EditStory.tsx
- [ ] Otimizar performance do preview

### Task 4.1: Tema Wattpad (laranja + branco + preto)
- [ ] Atualizar `tailwind.config.js` com cores do Wattpad
- [ ] Modificar `src/index.css` com nova paleta
- [ ] Aplicar tema em componentes principais
- [ ] Testar dark mode com novo tema
