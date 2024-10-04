import React, { useState } from 'react';
import { useFetchPlayer } from './core/hooks/useFetchPlayer';
import { useDebounce } from './core/hooks/useDebounce';


function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const {debouncedTerm} = useDebounce(searchTerm)
    const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPlayer(debouncedTerm);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h1>Player List</h1>
            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search players..." />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading data</div>}
            <div>{data?.pages.map((page) => page.data.map((player) => <div key={player.id}>{player.id}</div>))}</div>
            {isFetchingNextPage && <div>Loading more...</div>}
            {hasNextPage && !isFetchingNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
        </div>
    );
}

export default App;



// create debounce
// create additonal component under app - players
// create additional component on the right - favorites
// debounce
// scroller
// by clicking => create new hook - add to list of fav

