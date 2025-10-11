# TODO: Fix Issues in Universo de Historias

## Issues Identified:
1. **Redirection errors**: _redirects file is for Netlify, but app uses React Router. May not be needed.
2. **Login still appears active after logout**: State not updating immediately in Header.
3. **Old URL function not working**: Unclear, possibly old routing code.
4. **Images in registration not working**: Base64 images stripped from localStorage to avoid quota.

## Plan:
1. **Fix image persistence in registration**:
   - Modify useAuthors.ts to not strip base64 images when saving authors list.
   - Or implement proper image handling (e.g., store separately or use URLs).

2. **Fix login logout persistence**:
   - Ensure Header re-renders after logout.
   - Check if state is properly cleared.

3. **Check and fix redirections**:
   - Remove _redirects if not needed for SPA.
   - Ensure React Router handles all routes.

4. **Clean up old files**:
   - Remove or update old TODO and progress files if not needed.

## Dependent Files to edit:
- src/hooks/useAuthors.ts
- src/components/Header.tsx
- public/_redirects (remove if not needed)

## Completed:
- [x] Fixed image persistence: Removed stripping of base64 images in useAuthors.ts
- [x] Fixed logout redirection: Changed navigate to '/login' after logout in Header.tsx
- [x] Fixed registration login issue: Modified createAuthor to return Author, updated AuthorRegistration to navigate to profile after registration
- [x] Fixed "Autor não encontrado": Modified AuthorProfile to use currentAuthor if author not found in authors list
- [x] Recreated login/registration flow: Changed all navigations after login/registration to go to /home instead of profile
- [x] Fixed localStorage quota issues: Strip base64 images from current-author saves to prevent quota errors
- [x] Improved login robustness: Added trimming and case-insensitive email matching for login and registration
- [x] Updated edit profile: Changed avatar input from URL to file upload for better UX
- [x] Enabled image persistence in current session: Saved full author data for current-author to keep images in session
- [x] Added banner/background image upload in profile editing: Users can now upload custom background images or select themes
- [x] Attempted to remove _redirects (command executed, but file still present in list)

## Followup steps:
- [x] Test author registration with images. (User confirmed working)
- [x] Test login and logout functionality. (User confirmed working)
- [x] Test navigation and redirections. (User confirmed working)
- [x] Test profile editing with avatar and banner image upload. (User confirmed working)
- [x] Clean up unnecessary files. (Attempted removal of progresso.md, referencia.md, Sistema_de_Personalizacao_Galaxia_de_Historias.md, mockup uiux.txt, PROGRESS.md, Home_new.tsx, Modal_clean.tsx, Modal_temp.tsx, Universo de Historias/ folder, _redirects)
- Investigate deploy error 299 (possibly related to _redirects file, removed to test)
