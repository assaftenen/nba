import { useCallback } from 'react';
import { Player } from '../../../core/types/player.types';
import { PlayerRow } from './PlayerRow';
interface PlayerListProps {
    players: Player[];
    favoritesPlayers: Player[];
    addFavoritePlayer: (player: Player) => void;
    removeFavoritePlayer: (id: number) => void;
}

export const PlayerList = ({ players, favoritesPlayers, addFavoritePlayer, removeFavoritePlayer }: PlayerListProps) => {
    const isFavorite = useCallback((player: Player) => favoritesPlayers.find((fp) => fp.id === player.id), [favoritesPlayers]);
    return (
        <>
            {players.map((player) => (
                <PlayerRow
                    key={player.id}
                    player={player}
                    isFavorite={!!isFavorite(player)}
                    addFavoritePlayer={addFavoritePlayer}
                    removeFavoritePlayer={removeFavoritePlayer}
                />
            ))}
        </>
    );
};
