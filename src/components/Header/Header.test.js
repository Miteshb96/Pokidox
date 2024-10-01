import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('./Header.module.css', () => ({
    header: 'header',
    logo: 'logo',
    pipe: 'pipe',
    classOne: 'classOne',
    classTwo: 'classTwo',
}));

describe('Header Component', () => {
    test('renders title and description', () => {
        render(<Header title="Test Title" description="Test Description" />);

        // Check if the title is rendered correctly
        expect(screen.getByText('Test Title')).toBeInTheDocument();

        // Check if the description is rendered correctly
        expect(screen.getByText('Test Description')).toBeInTheDocument();

        // Check that the extrahtml is not rendered when not provided
        expect(screen.queryByText('Extra HTML')).toBeNull();
    });

    test('renders extrahtml when provided', () => {
        render(<Header title="Test Title" description="Test Description" extrahtml={<div>Extra HTML</div>} />);

        // Check if the extra HTML is rendered
        expect(screen.getByText('Extra HTML')).toBeInTheDocument();
    });

    test('applies the correct class names', () => {
        const className = ['classOne', 'classTwo'];
        render(<Header title="Test Title" description="Test Description" className={className} />);

        // Check if the wrapper has the correct class
        const header = screen.getByRole('banner'); // Role 'banner' is used for header elements
        expect(header).toHaveClass('classOne header');

        // Check if the title has the correct class
        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toHaveClass('classTwo logo');
    });

    test('does not render extrahtml if not provided', () => {
        render(<Header title="Test Title" description="Test Description" />);

        // Check that extrahtml is not present
        const extraElement = screen.queryByText('Extra HTML');
        expect(extraElement).toBeNull();
    });
});