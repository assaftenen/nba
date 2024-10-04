import { MutableRefObject } from 'react';
import { Player } from '../../core/types/player.types';
interface FavoritesProps {
    favoritesPlayers: Player[];
    removeFavoritePlayer: MutableRefObject<(id: number) => void>;
}

export const Favorites = ({ favoritesPlayers, removeFavoritePlayer }: FavoritesProps) => {
    return (
        <div className="w-1/2 flex flex-col pt-4">
            <div className=" text-2xl pb-[74px]">Favorite</div>
            {favoritesPlayers.length != 0 &&
                favoritesPlayers.map((player) => (
                    <div key={player.id} className="flex  justify-between text-start">
                        <div className="w-1/4">{player.first_name}</div>
                        <div className="w-1/4">{player.last_name}</div>
                        <div className="w-1/4">{player.team.name}</div>
                        <button
                            className="w-1/4 hover:text-red-400"
                            onClick={(e) => {
                                e.preventDefault();
                                removeFavoritePlayer.current(player.id);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
        </div>
    );
};
