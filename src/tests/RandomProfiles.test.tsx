import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RandomProfiles from '../components/RandomProfiles';
import { mockedData } from '../mocks/mockUtils';

beforeEach(() => {
    render(<RandomProfiles profiles = {mockedData.results} handleDelete={() => {}}/>);
})

describe('RandomProfiles', () => {
    const getUlElement = (): HTMLUListElement => {
        const ulElement = screen.getByTestId('list') as HTMLUListElement;
        return ulElement;
    }
    const getListItems = (): HTMLLIElement[] => {
        const listItems: HTMLLIElement[] = screen.getAllByTestId('listItem') as HTMLLIElement[];
        return listItems;
    }

    test('1. RandomProfiles renders mockedData with 3 ul element with li, delete button, toggle details button and content wrapper inside each li', async() => {
        const ulElement = getUlElement();
        let listItems;
        if (ulElement) {
            await waitFor(() => {
                listItems = getListItems();
            })
        }
        if (listItems) {
            (listItems as HTMLLIElement[]).forEach(() => {
                const deleteProfileButton = screen.getAllByTestId('deleteProfile') as HTMLButtonElement[];
                const contentWrapper = screen.getAllByTestId('contentWrapper') as HTMLDivElement[];
                const toggleDetailsButton = screen.getAllByTestId('toggleDetails') as HTMLButtonElement[];
                expect(deleteProfileButton).toHaveLength(3);
                expect(contentWrapper).toHaveLength(3);
                expect(toggleDetailsButton).toHaveLength(3);
            });    
        }
    })

    test('2. Random profiles shows and hides profile details when corresponding buttons are clicked', async() => {
        const ulElement = getUlElement();
        let listItems;

        if (ulElement) {
            await waitFor(() => {
                listItems = getListItems();
            })
        }
    
        if (listItems) {
            const profileGeneral = screen.getAllByTestId('profileGeneral') as HTMLDivElement[];
            await waitFor(() => {
                expect(profileGeneral).toHaveLength(3);
            })
           
            const toggleDetailsButton = screen.getAllByTestId('toggleDetails') as HTMLButtonElement[];
            toggleDetailsButton.forEach(async(buttonElement) => {
                fireEvent.click(buttonElement);
                const profileDetails = screen.getAllByTestId('profileDetails') as HTMLDivElement[];
                await waitFor(() => {
                    expect(profileDetails).toHaveLength(3);
                })
            })
        }
    });
})