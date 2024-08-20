import React, { useState, useEffect } from 'react';
import RandomProfiles from './components/RandomProfiles';
import ErrorOverlay from './components/ErrorOverlay';
import { fetchData } from './utils/dataUtils';
import { RandomUserData } from './utils/users.definitions';

const App: React.FC = (): JSX.Element => {
    const initialCount = 20;
    const [profiles, setProfiles] = useState<RandomUserData | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(initialCount);
    const [loadMoreProfiles, setLoadMoreProfiles] = useState<boolean>(false);
    const [loadNewProfiles, setLoadNewProfiles] = useState<boolean>(true);
    const [seed, setSeed] = useState<string>('');
   
    useEffect(() => {
        fetchedData(counter, loadMoreProfiles);
    },[counter, loadNewProfiles, loadMoreProfiles]);

    const fetchedData = async (count: number, moreProfiles: boolean): Promise<void> => {
        if (loadNewProfiles || loadMoreProfiles) {
            try {
                const data: RandomUserData | null = await fetchData(count, moreProfiles, seed);
                if (data !== null) {
                    console.log("data is", data);
                    
                    setProfiles(data);
                    if (loadNewProfiles) {
                        setSeed(data.info.seed);
                    } 
                } else {
                    setProfiles(null);
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

    const handleDelete = React.useCallback((index: number): void => {
        setProfiles((prevProfiles: RandomUserData | null) => {
            const newProfiles = { ...prevProfiles, results: prevProfiles?.results?.filter((item, i) => i !== index) ?? [] };
            return newProfiles as RandomUserData | null;
        });
        setCounter(counter-1);
    }, [counter]);

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        setLoadMoreProfiles(true);
        setCounter(counter+10);
    };

    const handleRenewProfiles = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        setLoadNewProfiles(true);
        setCounter(counter);
    };


    const LoadMoreButton = (): JSX.Element => (
        <button 
            type="button"  
            data-testid="fetchDataButton"  
            className='App--buttonWrapper--loadMoreButton' 
            onClick={handleLoadMore}
        >
            Load More
        </button>
    );

    const RenewProfilesButton = (): JSX.Element => (
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
                    {error ? <ErrorOverlay /> : <LoadMoreButton />}
                </>
            )}
        </div>
    );
}

export default App;