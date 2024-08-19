import React, { useState, useEffect } from 'react';
import RandomProfiles from './components/RandomProfiles';
import ErrorOverlay from './components/ErrorOverlay';
import { fetchData } from './utils/dataUtils';

const App = () => {
    const initialCount = 20;
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(false);
    const [counter, setCounter] = useState(initialCount);
    const [loadMoreProfiles, setLoadMoreProfiles] = useState(false);
    const [loadNewProfiles, setLoadNewProfiles] = useState(true);
    const [seed, setSeed] = useState('');
   
    useEffect(() => {
        fetchedData(counter, loadMoreProfiles);
    },[counter, loadNewProfiles, loadMoreProfiles]);

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
        setProfiles(state => ({
            ...state,
            results: state.results.filter((item, i) => i !== index)
        }));
        setCounter(counter-1);
    };

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreProfiles(true);
        setCounter(counter+10);
    };

    const handleRenewProfiles = (e) => {
        e.preventDefault();
        setLoadMoreProfiles(false);
        setLoadNewProfiles(true);
        setCounter(counter);
    };


    const LoadMoreButton = () => (
        <button 
            type="button"  
            data-testid="fetchDataButton"  
            className='App--buttonWrapper--loadMoreButton' 
            onClick={handleLoadMore}
        >
            Load More
        </button>
    );

    const RenewProfilesButton = () => (
        <button 
            type="button"  
            className='App--buttonWrapper--renewProfilesButton' 
            onClick={handleRenewProfiles}
        >
            Renew Profiles
        </button>
    );
    
    if (!profiles || loadMoreProfiles || loadNewProfiles) {
        return <div data-testid="loading" className='spin' />;
    } 

    return (
        <div className="App" data-testid="app">
            {profiles?.results?.length > 0 ? (
                <>
                    <RandomProfiles profiles={profiles.results} handleDelete={handleDelete} />
                    <div className='App--buttonWrapper'>
                        <LoadMoreButton />
                        <RenewProfilesButton />
                    </div>
                </>
            ) : (
                <>
                    <LoadMoreButton />
                    {error && <ErrorOverlay />}
                </>
            )}
        </div>
    );
}

export default App;