import React, { useState } from 'react';
import { useFetchPlayer } from './core/hooks/useFetchPlayer';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPlayer(searchTerm);

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
