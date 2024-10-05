import clsx from 'clsx';
import { MutableRefObject, useState } from 'react';
import { useDebounce } from '../../core/hooks/useDebounce';
import { useFetchPlayer } from '../../core/hooks/useFetchPlayer';
import { useInfiniteScroll } from '../../core/hooks/useInfiniteScroll';
import { Player } from '../../core/types/player.types';
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
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="w-1/2 px-8 pt-4">
            <h1 className=" text-3xl pb-4 text-blue-300">Players List</h1>

            <div className="sticky top-0  bg-gray-700 z-10 ">
                <SearchInput searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            </div>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading data</div>}

            <div className="h-[700px] scroll-container overflow-y-auto">
                <div className="sticky top-0 flex text-orange-400 bg-gray-800 font-bold mt-4 mb-4">
                    <div className="w-[19.5%]">
                        <p>First name</p>
                    </div>
                    <div className="w-[32%]">Last Name</div>
                    <div className="w-1/6">Team</div>
                </div>
                {data?.pages.map((page) =>
                    page.data.map((player) => (
                        <div
                            key={player.id}
                            className={clsx('flex justify-between text-start', favoritesPlayers.has(player) && 'text-blue-300 font-bold')}
                        >
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
                                        favoritesPlayers.has(player) && 'hover:text-red-400 hover:font-bold text-white',
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

                <div ref={observerRef} className="h-2" />
                {isFetchingNextPage && <div>Loading more...</div>}
            </div>
        </div>
    );
};
