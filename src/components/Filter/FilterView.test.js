import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FullWidthTextField from "./FilterView";

describe('FullWidthTextField', () => {
    const mockHandleSearchBy = jest.fn();
    const filterObj = {
        handleSearchBy: (val) => mockHandleSearchBy(val),
        setTypeFilter: jest.fn(),
        setGender: jest.fn(),
        // setFilterByStats: jest.fn(),
    };
    const options = [
        'Normal',
        'Fighting',
        'Flying',
        'Poison',
        'Ground',
        'Rock',
        'Fire',
        'Bug',
        'Water',
    ];

    beforeEach(() => {
        render(<FullWidthTextField filterObj={filterObj}/>);
    });

    test('renders search bar', () => {
        const searchBar = screen.getByPlaceholderText("Name or Number"); 
        expect(searchBar).toBeInTheDocument();
    });

    test('calls handleSearchBy on search bar input change', async () => {
        const inputField = screen.getByPlaceholderText('Name or Number');
    
        // Simulate typing in the input field
        fireEvent.change(inputField, { target: { value: 'Klang' } });
    
        await waitFor(() => new Promise((resolve) => setTimeout(resolve, 200))); 
    
        // Simulate clicking the search button
        const searchButton = screen.getByLabelText('Search');
        fireEvent.click(searchButton);
    
        // Assert that handleSearchBy was called with the updated value
        expect(mockHandleSearchBy).toHaveBeenCalledWith('Klang');
    });

    test('calls handleSearchBy with empty string when input is cleared', async () => {
        const inputField = screen.getByPlaceholderText('Name or Number');
    
        // Simulate typing in the input field to clear it
        fireEvent.change(inputField, { target: { value: '' } });
    
        // Wait for the timeout to finish and the state to update
        await waitFor(() => new Promise((resolve) => setTimeout(resolve, 200))); // Wait for 200ms
    
        // Simulate clicking the search button
        const searchButton = screen.getByLabelText('Search');
        fireEvent.click(searchButton);
    
        // Assert that handleSearchBy was called with an empty string
        expect(mockHandleSearchBy).toHaveBeenCalledWith('');
    });

    test('renders multi-select for types with correct options', () => {
        const typeSelect = screen.getByLabelText('Type');
        fireEvent.mouseDown(typeSelect);
    
        options.forEach(option => {
          expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test('calls setTypeFilter on selecting types', () => {
        const typeSelect = screen.getByLabelText('Type');
        fireEvent.mouseDown(typeSelect);
    
        const normalOption = screen.getByText('Normal');
        fireEvent.click(normalOption);
        expect(filterObj.setTypeFilter).toHaveBeenCalledWith(['Normal']);
    
        const fightingOption = screen.getByText('Fighting');
        fireEvent.click(fightingOption);
        expect(filterObj.setTypeFilter).toHaveBeenCalledWith(['Normal', 'Fighting']); // Adjust as needed for multi-select
    });

    test('renders select for gender with correct options', () => {
        const genderSelect = screen.getByLabelText("Gender"); 
        fireEvent.mouseDown(genderSelect);
    
        // Check if all options are rendered in the DOM
        expect(screen.getByText('Male')).toBeInTheDocument();
        expect(screen.getByText('Female')).toBeInTheDocument();
        expect(screen.getByText('Genderless')).toBeInTheDocument();
    });

    test('calls setGender on selecting gender', () => {
        const genderSelect = screen.getByLabelText("Gender"); 
        fireEvent.mouseDown(genderSelect);
    
        const maleOption = screen.getByText('Male');
        fireEvent.click(maleOption);

        expect(filterObj.setGender).toHaveBeenCalledWith('male');
    });

    test('opens modal for Stats range filtering', () => {
        const openModalButton = screen.getByLabelText('Stats');
        fireEvent.click(openModalButton);
    
        const modal = screen.getByText('Select Stats');
        expect(modal).toBeInTheDocument();
    });

    test('modal contains sliders for filtering different parameters', () => {
        const openModalButton = screen.getByLabelText('Stats');
        fireEvent.click(openModalButton);
    
        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);
        sliders.forEach(slider => {
          expect(slider).toBeInTheDocument();
        });
    });
});