/** Function to fetch the random profiles data from the API */
export const fetchData = async (number, loadMoreProfiles, seed) => {

    const url = loadMoreProfiles ? `${process.env.REACT_APP_API_URL}${number}&seed=${seed}` : `${process.env.REACT_APP_API_URL}${number}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.text();
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error during fetch:', error);
        return null;
    }
};