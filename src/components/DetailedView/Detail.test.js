import Detail from "./Detail";
import { render, screen, fireEvent } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {detailed_data} from "../../utils/constants"

export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};
// const errorObject = { isError: true, message: "Something went wrong while fetching species data!" };
const router = createBrowserRouter([
    { 
        path: "/",
        element: <Detail/>,
        loader: () => {return [detailed_data]}
    }
]);

const initialState = {  
    pokemonList: {},
    offset: 0,
    pageOffset: 0,
    maleList: [],
    femaleList: [],
    genderLessList: [] 
};


describe('Detail Component', () => {
    const mockStore = configureStore();
    const queryClient = createTestQueryClient();
    let store = mockStore(initialState);

  beforeEach(() => {
    render(<QueryClientProvider client={queryClient}><Provider store={store}> <RouterProvider router={router} /> </Provider></QueryClientProvider>);
  });

  test('renders header component correctly', () => {
    // Check if the Child component is rendered
    const childElement = screen.getAllByRole('heading')
    expect(childElement[0]).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  test('renders Image component correctly', () => {
    // Check if the Child component is rendered
    const imgElement = screen.getByLabelText('pokemon-default');
    expect(imgElement).toBeInTheDocument();
  });

  test('renders Description element correctly', () => {
    // Check if the Child component is rendered
    const imgElement = screen.getByLabelText('description');
    expect(imgElement).toBeInTheDocument();
  });

  test('Pokemon configuration listing section rendring in DOM',() => {
    const configuration = screen.getByLabelText('configuration');
    expect(configuration).toBeInTheDocument();
  })

  test('Pokemon Stats Status listing section rendring in DOM',() => {
    const configuration = screen.getByLabelText('Stats-Status');
    expect(configuration).toBeInTheDocument();
  })

  test('Pokemon Evolution chain listing section rendring in DOM',() => {
    const configuration = screen.getByLabelText("evolution-chain");
    expect(configuration).toBeInTheDocument();
  })
});