import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RandomProfiles from '../components/RandomProfiles';
import { mockedData } from '../mocks/mockUtils';

beforeEach(() => {
    render(<RandomProfiles profiles = {mockedData.results} />);
})

describe('RandomProfiles', () => {
    const getUlElement = () => {
        const ulElement = screen.getByTestId('list');
        return ulElement;
    }
    const getListItems = (ulElement) => {
        const listItems = screen.getAllByTestId('listItem', {container: ulElement});
        return listItems;
    }

    test('1. RandomProfiles renders mockedData with 3 ul element with li, delete button, toggle details button and content wrapper inside each li', async() => {
        const ulElement = getUlElement();
        let listItems;
        if (ulElement) {
            await waitFor(() => {
                listItems = getListItems(ulElement);
            })
        }
        if (listItems) {
            listItems.forEach((liElement) => {
                const deleteProfileButton = screen.getAllByTestId('deleteProfile', {container: liElement});
                const contentWrapper = screen.getAllByTestId('contentWrapper', {container: liElement});
                const toggleDetailsButton = screen.getAllByTestId('toggleDetails', {container: liElement});
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
                listItems = getListItems(ulElement);
            })
        }
    
        if (listItems) {
            const contentWrapper = screen.getAllByTestId('contentWrapper', {container: listItems});
            const profileGeneral = screen.getAllByTestId('profileGeneral', {container: contentWrapper});
            await waitFor(() => {
                expect(profileGeneral).toHaveLength(3);
            })
           
            const toggleDetailsButton = screen.getAllByTestId('toggleDetails', {container: listItems});
            toggleDetailsButton.forEach(async(buttonElement) => {
                fireEvent.click(buttonElement);
                const profileDetails = screen.getAllByTestId('profileDetails', {container: contentWrapper});
                await waitFor(() => {
                    expect(profileDetails).toHaveLength(3);
                })
            })
        }
    });
})