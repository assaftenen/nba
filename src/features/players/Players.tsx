import { MutableRefObject, useCallback, useMemo, useState } from 'react';
import { useDebounce } from '../../core/hooks/useDebounce';
import { useFetchPlayer } from '../../core/hooks/useFetchPlayer';
import { useInfiniteScroll } from '../../core/hooks/useInfiniteScroll';
import { Player } from '../../core/types/player.types';
import { PlayerList } from './components/PlayerList';
import { SearchInput } from './components/SearchInput';

interface PlayersProps {
    addFavoritePlayer: (player: Player) => void;
    removeFavoritePlayer: MutableRefObject<(id: number) => void>;
    favoritesPlayers: Set<Player>;
}

export const Players = ({ addFavoritePlayer, removeFavoritePlayer, favoritesPlayers }: PlayersProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { debouncedTerm } = useDebounce(searchTerm);
    const { data, error: isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchPlayer(debouncedTerm);
    const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });
    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);
    const noResults = useMemo(() => {
        return !isLoading && !isError && data?.pages?.every((page) => page.data.length === 0);
    }, [data, isLoading, isError]);
    const hasData = useMemo(() => {
        return !noResults && !isLoading && !isError && data?.pages?.some((page) => page.data.length > 0);
    }, [data, isLoading, isError, noResults]);

    return (
        <div className="w-1/2 px-8 pt-4">
            <h1 className=" text-3xl pb-4 text-blue-300">Players List</h1>

            <div className="sticky top-0  bg-gray-700 z-10">
                <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            </div>

            {isLoading && <div className="mt-8 font-medium animate-pulse ">Loading...</div>}
            {isError && <div className="mt-4 text-center text-red-600">Error loading data</div>}
            {noResults && <div className="mt-4 text-center text-gray-400">No results found</div>}

            {hasData && (
                <div className="h-[700px] scroll-container overflow-y-auto">
                    {/* Render header only once */}
                    <div className="sticky top-0 flex text-orange-400 bg-gray-800 font-bold mt-4 mb-4">
                        <div className="w-[19.5%]">
                            <p>First name</p>
                        </div>
                        <div className="w-[32%]">Last Name</div>
                        <div className="w-1/6">Team</div>
                    </div>

                    {data?.pages.map((page) => (
                        <PlayerList
                            key={page.data[0].id}
                            players={page.data}
                            favoritesPlayers={favoritesPlayers}
                            addFavoritePlayer={addFavoritePlayer}
                            removeFavoritePlayer={removeFavoritePlayer.current}
                        />
                    ))}

                    {/* Infinite scroll observer */}
                    <div ref={observerRef} className="h-2" />
                    {isFetchingNextPage && <div>Loading more...</div>}
                </div>
            )}
        </div>
    );
};
