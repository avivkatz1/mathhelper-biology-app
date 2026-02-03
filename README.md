# Biology App - Creature Evolution Simulator

A full-stack application for creating and managing virtual creatures with customizable features and attributes.

## Features

- User authentication (register/login)
- Create custom creatures with:
  - Physical features (fur, wings, claws, tail, horn, shell, feathers, sharp teeth)
  - Attributes (color, legs, eyes, litter size, weight, height, speed, intelligence)
- View created creatures with visual representation
- Data persistence with Azure Cosmos DB

## Tech Stack

### Backend
- Node.js with Express
- Azure Cosmos DB (biologyDB/user container)
- ES6 modules

### Frontend
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Styled Components for styling
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v14+)
- Azure Cosmos DB account
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```
COSMOS_ENDPOINT=your_cosmos_endpoint
COSMOS_KEY=your_cosmos_key
PORT=5003
NODE_ENV=development
```

### Development

Run both client and server concurrently:
```bash
npm run dev
```

Run server only (port 5003):
```bash
npm run server
```

Run client only (port 3002):
```bash
npm run client
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
biology-app/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── api/           # API client and context
│       ├── components/    # Reusable components
│       ├── images/        # Image assets
│       ├── pages/         # Page components
│       │   ├── BioLogin.js
│       │   ├── CreatureCreation.js
│       │   ├── ViewCreature.js
│       │   └── Shell.js
│       ├── store/         # Redux store and slices
│       ├── App.js
│       └── index.js
└── server/                # Express backend
    ├── config/           # Database configuration
    ├── controllers/      # Business logic
    ├── routes/           # API routes
    └── index.js          # Server entry point
```

## API Endpoints

- `POST /biology/register` - Register a new user
- `POST /biology/login` - Login user
- `POST /biology/creature` - Add creature to user

## Routes

- `/biology` - Login/Register page
- `/biology/evolutionSimulator/creaturecreation` - Create a new creature
- `/biology/evolutionSimulator/viewcreature` - View created creature

## Database Schema

### User Document
```javascript
{
  id: string,
  username: string,
  password: string,
  createdBy: string,        // username + password
  creatures: [
    {
      features: {
        fur: boolean,
        wings: boolean,
        claws: boolean,
        tail: boolean,
        horn: boolean,
        shell: boolean,
        feathers: boolean,
        sharpTeeth: boolean
      },
      attributes: {
        color: string,
        numberOfLegs: number,
        numberOfEyes: number,
        litterSize: number,
        weight: number,
        height: number,
        speed: number,
        intelligence: number
      }
    }
  ],
  loginNumber: number
}
```

## Environment Variables

- `COSMOS_ENDPOINT` - Azure Cosmos DB endpoint URL
- `COSMOS_KEY` - Azure Cosmos DB access key
- `PORT` - Server port (default: 5003)
- `NODE_ENV` - Environment (development/production)

## License

MIT
