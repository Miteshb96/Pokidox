# Pokémon Listing SPA

This is a React Single Page Application (SPA) that allows users to browse a list of Pokémon. The application includes filtering options, pagination, and detailed views for each Pokémon.

## Features

- **Home Page**: Displays a listing of Pokémon cards with their names and unique IDs.
- **Header Component**: Provides navigation and filtering options.
- **Filter Functionality**: Users can filter Pokémon by:
  - Search text
  - Type selection (dropdown)
  - Gender selection
  - Stats range selection
- **Pokémon Cards**: Each card is clickable and navigates to a detail page with the route `/detail/:id`, where `id` is the unique identifier for each Pokémon.
- **Pagination**: Displays 20 Pokémon per page and fetches dynamic data based on the selected page.
- **Routing**: Utilizes `react-router-dom` for navigation.
- **Data Fetching**: Uses `tanStack Query` for making API calls to fetch Pokémon data.
- **State Management**: Managed using `Redux Toolkit` for a centralized application state.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A package manager like npm or yarn.

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd [repository-folder]
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

   The application will be running at `http://localhost:3000`.

### Running Tests

To run all tests together:

```bash
npm run test
```

To run a specific test file:

```bash
npm run test [filepath/name]
```

## Folder Structure

```
/src
  ├── components
  │   ├── Header.jsx
  │   ├── PokemonCard.jsx
  │   └── ... (other components)
  ├── pages
  │   ├── Home.jsx
  │   ├── Detail.jsx
  │   └── ... (other pages)
  ├── store
  │   ├── index.js
  │   └── ... (Redux slices)
  ├── hooks
  │   ├── usePokemon.js
  │   └── ... (custom hooks)
  ├── App.jsx
  └── index.js
```

## Technologies Used

- React
- Redux Toolkit
- react-router-dom
- tanStack Query
- JavaScript (ES6+)