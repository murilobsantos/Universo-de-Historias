# TODO List for Integration and Mock Removal

## Backend Changes
- [x] Remove mock mode logic from `backend/controllers/authController.js`
  - [x] Remove mockUsers array and file persistence
  - [x] Update register function to always use MongoDB
  - [x] Update login function to always use MongoDB (remove hardcoded password check)
  - [x] Update verify function to always use MongoDB
  - [x] Ensure User model is always loaded and required

## Frontend Changes
- [x] Add maintenance route to `src/App.tsx`
  - [x] Import Maintenance component
  - [x] Add conditional route for /maintenance based on VITE_MAINTENANCE_MODE env var

## Testing and Verification
- [x] Test backend login with real MongoDB
- [x] Verify maintenance page integration
