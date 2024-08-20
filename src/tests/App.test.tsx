import fetchMock from 'jest-fetch-mock';
import { fetchData } from '../utils/dataUtils';
import { mockedData } from '../mocks/mockUtils';

beforeEach(() => {
    fetchMock.resetMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
})

const errorMock: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation(() => {});

afterEach(() => {
    errorMock.mockRestore();
})

describe('App', () => {
    test('1. Data is fetched correctly', async() => {
        fetchMock.mockResponseOnce(JSON.stringify(mockedData));
        const data = await fetchData(20, false, "some-seed");
        expect(data).toEqual(mockedData);
    })
})

