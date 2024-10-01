import Home from "./Home";
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const initialState = {  
    pokemonList: {},
    offset: 0,
    pageOffset: 0,
    maleList: [],
    femaleList: [],
    genderLessList: [] 
};

describe('Home Component', () => {
  const mockStore = configureStore();
  const queryClient = createTestQueryClient();
  let store = mockStore(initialState);

  beforeEach(() => {
    render(<QueryClientProvider client={queryClient}><Provider store={store}><Home /></Provider></QueryClientProvider>);
  });

  test('renders Home Component in DOM at root path /', () => {
      const linkElement = screen.getByText("Pokédex");
      expect(linkElement).toBeInTheDocument();
  });

  test('renders Child component correctly', () => {

    // Check if the Child component is rendered
    const childElement = screen.getByRole('heading')
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Pokédex');
  });

  test('Rendering Pokemon listing inside the Dom', async () => {
    const cardWrapper = screen.getByLabelText('cardListing');
    expect(cardWrapper).toBeInTheDocument();
  })

  test('Rendering pagination inside the Dom', async () => {
    const pagination = screen.getByLabelText('pagination');
    expect(pagination).toBeInTheDocument();
  })

});