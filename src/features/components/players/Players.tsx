import clsx from 'clsx';
import { MutableRefObject, useState } from 'react';
import { useDebounce } from '../../../core/hooks/useDebounce';
import { useFetchPlayer } from '../../../core/hooks/useFetchPlayer';
import { Player } from '../../../core/types/player.types';
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    console.log({ addFavoritePlayer, removeFavoritePlayer });
    return (
        <div className="w-1/2  px-8 pt-4">
            <h1 className="pb-4 text-2xl">Players List</h1>
            <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading data</div>}
            {/* list */}
            <div>
                {data?.pages.map((page) =>
                    page.data.map((player) => (
                        <div key={player.id} className={clsx('flex justify-between text-start', favoritesPlayers.has(player) && 'text-green-500')}>
                            <div className="w-1/5">{player.first_name}</div>
                            <div className="w-2/6">{player.last_name}</div>
                            <div className="w-1/6">{player.team.name}</div>
                            <div className="w-2/6 flex gap-4">
                                <button
                                    disabled={favoritesPlayers.has(player)}
                                    className={clsx(
                                        'w-1/3 disabled:text-gray-400',
                                        !favoritesPlayers.has(player) && 'hover:text-blue-400 hover:font-bold',
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addFavoritePlayer(player);
                                    }}
                                >
                                    Add
                                </button>
                                <button
                                    disabled={!favoritesPlayers.has(player)}
                                    className={clsx(
                                        'w-1/3 disabled:text-gray-400',
                                        favoritesPlayers.has(player) && 'hover:text-red-400 hover:font-bold',
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavoritePlayer.current(player.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )),
                )}
            </div>
            {isFetchingNextPage && <div>Loading more...</div>}
            {hasNextPage && !isFetchingNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
        </div>
    );
};
