import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchData } from '../utils/dataUtils';
import { mockedData } from '../mocks/mockUtils';
import App from '../App';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    fetch.resetMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
})

afterEach(() => {
    console.error.mockRestore();
})

describe('App', () => {
    test('1. Data is fetched correctly', async() => {
        fetch.mockResponseOnce(JSON.stringify(mockedData));
        const data = await fetchData();
        expect(data).toEqual(mockedData);
    })
    
    test('2. When data is not fetched correctly, error overlay appaears on the screen', async() => {
        fetch.mockReject(() => Promise.reject(new Error('Data couldn\'t be fetched')));
        const data = await fetchData();
        expect(data).toEqual(null);
        act(() => {
            render(<App data={null} />);
         })
        const errorOverlay = await screen.findByTestId('error-overlay');
        expect(errorOverlay).toBeInTheDocument();
    })
})

