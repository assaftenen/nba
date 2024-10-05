import { useRef, useState } from 'react';
import { Player } from '../core/types/player.types';
import { Favorites } from '../features/favorites/Favorites';
import { Players } from '../features/players/Players';

function NbaPlayersPage() {
    const [favoritesPlayers, setFavoritesPlayers] = useState<Player[]>([]);
    const addFavoritePlayer = (player: Player) => {
        const isAlreadyFavorite = favoritesPlayers.find((nbaPlayer) => nbaPlayer.id === player.id);
        if (!isAlreadyFavorite) setFavoritesPlayers((prev) => [...prev, player]);
    };
    const removeFavoritePlayer = useRef((id: number) => {
        setFavoritesPlayers((prev) => prev.filter((player) => player.id !== id));
    });
    return (
        <div className="bg-gray-800 min-h-screen w-screen ">
            <div className="flex gap-1 mx-auto text-white ">
                <Players
                    favoritesPlayers={new Set(favoritesPlayers)}
                    removeFavoritePlayer={removeFavoritePlayer}
                    addFavoritePlayer={addFavoritePlayer}
                />
                <Favorites favoritesPlayers={favoritesPlayers} removeFavoritePlayer={removeFavoritePlayer} />
            </div>
        </div>
    );
}

export default NbaPlayersPage;
