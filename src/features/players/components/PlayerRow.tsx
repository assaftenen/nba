import clsx from 'clsx';
import { Player } from '../../../core/types/player.types';

interface PlayerRowProps {
    player: Player;
    isFavorite: boolean;
    addFavoritePlayer: (player: Player) => void;
    removeFavoritePlayer: (id: number) => void;
}

export const PlayerRow = ({ player, isFavorite, addFavoritePlayer, removeFavoritePlayer }: PlayerRowProps) => {
    return (
        <div
            key={player.id}
            className={clsx('flex justify-between text-start', isFavorite && 'text-blue-300 font-bold')}
        >
            <div className="w-1/5">{player.first_name}</div>
            <div className="w-2/6">{player.last_name}</div>
            <div className="w-1/6">{player.team.name}</div>
            <div className="w-2/6 flex gap-4">
                <button
                    disabled={isFavorite}
                    className={clsx(
                        'w-1/3 disabled:text-gray-400',
                        !isFavorite && 'hover:text-blue-400 hover:font-bold',
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        addFavoritePlayer(player);
                    }}
                >
                    Add
                </button>
                <button
                    disabled={!isFavorite}
                    className={clsx(
                        'w-1/3 disabled:text-gray-400',
                        isFavorite && 'hover:text-red-400 hover:font-bold text-white',
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        removeFavoritePlayer(player.id);
                    }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};