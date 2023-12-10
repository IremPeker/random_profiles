import React, { useEffect } from 'react';
import RandomProfiles from './components/RandomProfiles';
import ErrorOverlay from './components/ErrorOverlay';
import { fetchData } from './utils/dataUtils';

const App = () => {
    const initialCount = 20;
    const [profiles, setProfiles] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [counter, setCounter] = React.useState(initialCount);
    const [loadMoreProfiles, setLoadMoreProfiles] = React.useState(false);
    const [loadNewProfiles, setLoadNewProfiles] = React.useState(true);
    const [seed, setSeed] = React.useState('');

    useEffect(() => {
        fetchedData(counter, loadMoreProfiles);
    },[counter, loadNewProfiles]);

    const fetchedData = async (count, moreProfiles) => {
        if (loadNewProfiles || loadMoreProfiles) {
            try {
                const data = await fetchData(count, moreProfiles, seed);
                if (data !== null) {
                    setProfiles(data);
                    if (loadNewProfiles) {
                        setSeed(data.info.seed);
                    } 
                } else {
                    setProfiles([]);
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);
            }
            setLoadNewProfiles(false);
            setLoadMoreProfiles(false);
        }
    };

    const handleDelete = (index) => {  
        setLoadMoreProfiles(false);
        const profilesCopy = { ...profiles };
        profilesCopy.results.splice(index, 1);
        setProfiles(profilesCopy);
        setCounter(counter-1);
    };

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreProfiles(true);
        setCounter(counter+1);
    };

    const handleRenewProfiles = (e) => {
        e.preventDefault();
        setLoadMoreProfiles(false);
        setLoadNewProfiles(true);
        setCounter(initialCount);
    };

    return (
        <div className="App" data-testid="app">
            {profiles?.results?.length > 0 ? (
                <>
                    <RandomProfiles profiles={profiles.results} handleDelete={handleDelete} />
                    <div className='App--buttonWrapper'>
                        <button 
                            type="button" 
                            data-testid="fetchDataButton" 
                            className='App--buttonWrapper--loadMoreButton'
                            onClick={handleLoadMore}>
                                Load More
                        </button>
                        <button 
                            type="button" 
                            className='App--buttonWrapper--renewProfilesButton'
                            onClick={handleRenewProfiles}>
                                Renew Profiles
                        </button>
                    </div>
                </>
            ) : 
            error ? 
                <ErrorOverlay />
                :
                <div data-testid="loading" className='spin' />
            }
        </div>
    );
}

export default App;
