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
        console.log("renewing profiles, counter: ", counter);
        
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
                <button 
                    type="button" 
                    className='App--buttonWrapper--renewProfilesButton'
                    onClick={handleRenewProfiles}>
                        Renew Profiles
                </button>
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