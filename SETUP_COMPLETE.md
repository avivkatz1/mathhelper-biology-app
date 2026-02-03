# Biology App Setup Complete

## Summary

Successfully extracted the Biology App (Creature Evolution Simulator) from the monolith repository following the same pattern as the BB App.

## What Was Created

### Directory Structure
```
biology-app/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   └── bioContext.js
│   │   ├── components/
│   │   ├── images/
│   │   │   └── creature.png
│   │   ├── pages/
│   │   │   ├── BioLogin.js
│   │   │   ├── CreatureCreation.js
│   │   │   ├── ViewCreature.js
│   │   │   ├── Shell.js
│   │   │   └── index.js
│   │   ├── store/
│   │   │   ├── biologySlice.js
│   │   │   └── store.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userControllers.js
│   ├── routes/
│   │   └── biologyUserRoutes.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Files Copied from Monolith

### Frontend Files
- **Pages**: All 5 biology page components from `/client/src/features/biology/pages/`
  - BioLogin.js
  - CreatureCreation.js
  - ViewCreature.js
  - Shell.js
  - index.js

- **Images**: creature.png from `/client/src/features/biology/data/`

### Backend Files
- **Routes**: biologyUserRoutes.js from `/routes/`
- **Controllers**: userControllers.js from `/controllers/`

## Files Created from Scratch

### Redux Store
- **biologySlice.js**: Extracted from monolith store.js (lines 588-616)
  - Manages user state with creatures, username, password
  - Actions: createCreature, addUser

- **store.js**: Redux store configuration with biologyReducer

### API Layer
- **client.js**: Axios instance configured for port 5003
- **bioContext.js**: Copied from monolith and adapted
  - handleRegister
  - handleLogin
  - addCreature

### Server Configuration
- **database.js**: Cosmos DB configuration
  - Database: biologyDB
  - Container: user
  - Uses ES6 modules

- **index.js**: Express server
  - Port 5003 (local dev)
  - CORS configured
  - Biology routes mounted

### Package Files
- **Root package.json**: Server dependencies + scripts (ES6 module type)
- **Client package.json**: React + Redux + styled-components

### CRA Files
- **App.js**: React Router setup with biology routes
- **index.js**: React root rendering
- **index.css**: Global styles
- **public/index.html**: HTML template

### Documentation
- **README.md**: Complete setup and usage instructions
- **.env.example**: Environment variable template
- **.gitignore**: Ignore patterns for node_modules, .env, builds

## Import Path Updates

All imports were updated from monolith structure to new structure:

| Old Import | New Import |
|------------|------------|
| `../../../app/store` | `../store/biologySlice` |
| `../../../app/context/bioContext` | `../api/bioContext` |
| `../data/creature.png` | `../images/creature.png` |
| `./creaturecreation` | `/biology/evolutionSimulator/creaturecreation` |
| `./evolutionSimulator` | `/biology/evolutionSimulator/viewcreature` |

## Routes Configured

- `/` → Redirects to `/biology`
- `/biology` → BioLogin page (login/register)
- `/biology/evolutionSimulator` → Shell (layout with navigation)
  - `/biology/evolutionSimulator/creaturecreation` → Create creature
  - `/biology/evolutionSimulator/viewcreature` → View created creature

## Database Configuration

- **Database**: biologyDB
- **Container**: user
- **Port**: 5003 (local development)
- **Environment Variables Required**:
  - COSMOS_ENDPOINT
  - COSMOS_KEY

## Next Steps

1. **Install dependencies**:
   ```bash
   cd /Users/avivkatz/Desktop/PP/mathhelper/mathhelper-split/biology-app
   npm run install-all
   ```

2. **Create .env file**:
   ```bash
   cp .env.example .env
   # Add your Cosmos DB credentials
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

4. **Test the app**:
   - Frontend: http://localhost:3002
   - Backend: http://localhost:5003
   - Health check: http://localhost:5003/health

## Differences from BB App

1. **ES6 Modules**: Uses `import/export` instead of `require/module.exports`
2. **React Router**: Full routing setup (BB app had none)
3. **Nested Routes**: Uses Shell component as layout wrapper
4. **Multiple Pages**: 4 page components vs BB app's single page
5. **Additional Dependencies**: uuid package for ID generation

## Known Considerations

- The app uses username+password as a unique identifier (`createdBy`)
- Passwords are stored in plain text (security concern for production)
- Login increments loginNumber but doesn't persist the change
- No authentication tokens or session management
- Image is static (creature.png used for all creatures)
