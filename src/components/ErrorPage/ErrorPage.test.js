// ErrorPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

// Mock useRouteError from react-router-dom
jest.mock('react-router-dom', () => ({
    useRouteError: jest.fn(),
}));

describe('ErrorPage Component', () => {
    test('renders default error message when no error is provided', () => {
        // Mock the useRouteError hook to return undefined or an empty object
        const mockUseRouteError = require('react-router-dom').useRouteError;
        mockUseRouteError.mockReturnValue({});

        render(<ErrorPage />);

        // Check if the default title and message are rendered
        expect(screen.getByText('An error occured!')).toBeInTheDocument();
        expect(screen.getByText('Could not find this page')).toBeInTheDocument();
    });

    test('renders 404 error message when error contains "404"', () => {
        const mockUseRouteError = require('react-router-dom').useRouteError;
        mockUseRouteError.mockReturnValue({
            isError: true,
            message: '404 Not Found',
        });

        render(<ErrorPage />);

        // Check if the correct title and message for a 404 error are rendered
        expect(screen.getByText('An error occured!')).toBeInTheDocument();
        expect(screen.getByText('404 Not Found Page not found.')).toBeInTheDocument();
    });

    test('renders custom error message for other errors', () => {
        const mockUseRouteError = require('react-router-dom').useRouteError;
        mockUseRouteError.mockReturnValue({
            isError: true,
            message: '500 Internal Server Error',
        });

        render(<ErrorPage />);

        // Check if the correct title and custom error message are rendered
        expect(screen.getByText('An error occured!')).toBeInTheDocument();
        expect(screen.getByText('500 Internal Server Error')).toBeInTheDocument();
    });

    test('renders default message if error does not contain isError', () => {
        const mockUseRouteError = require('react-router-dom').useRouteError;
        mockUseRouteError.mockReturnValue({
            message: 'Some random error',
        });

        render(<ErrorPage />);

        // Check if the default message is rendered when isError is missing
        expect(screen.getByText('An error occured!')).toBeInTheDocument();
        expect(screen.getByText('Could not find this page')).toBeInTheDocument();
    });
});