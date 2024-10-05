import clsx from 'clsx';
import { MutableRefObject, useState } from 'react';
import { Player } from '../../core/types/player.types';
interface FavoritesProps {
    favoritesPlayers: Player[];
    removeFavoritePlayer: MutableRefObject<(id: number) => void>;
}

export const Favorites = ({ favoritesPlayers, removeFavoritePlayer }: FavoritesProps) => {
    const [isGrayBg, setIsGrayBg] = useState(true);

    const changeColor = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsGrayBg((prev) => !prev);
    };

    return (
        <div className={clsx('w-1/2 flex flex-col pt-4')}>
            <div className="pb-4 flex justify-between pr-8">
                <div className="text-3xl text-blue-300 font-bold">Favorite</div>
                <button className={clsx('text-sm', !isGrayBg ? 'text-white' : 'text-blue-400')} onClick={(e) => changeColor(e)}>
                    Changed Background
                </button>
            </div>

            {favoritesPlayers.length != 0 &&
                favoritesPlayers.map((player) => (
                    <div className={clsx(isGrayBg ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-800 to-blue-500')}>
                        <div
                            key={player.id}
                            className={
                                'flex justify-between text-middle items-center gap-3 border border-4 rounded-lg mb-4 h-20 border-blue-900 mr-6 '
                            }
                        >
                            <div className="w-1/4 p-4">{player.first_name}</div>
                            <div className="w-1/4">{player.last_name}</div>
                            <div className="w-1/4">{player.team.name}</div>
                            <button
                                className="w-1/4 text-red-400 hover:text-red-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeFavoritePlayer.current(player.id);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};
