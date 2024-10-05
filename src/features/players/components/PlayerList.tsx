import { Player } from '../../../core/types/player.types';
import { PlayerRow } from './PlayerRow';
interface PlayerListProps {
    players: Player[];
    favoritesPlayers: Set<Player>;
    addFavoritePlayer: (player: Player) => void;
    removeFavoritePlayer: (id: number) => void;
}

export const PlayerList = ({ players, favoritesPlayers, addFavoritePlayer, removeFavoritePlayer }: PlayerListProps) => {
    return (
        <>
            {players.map((player) => (
                <PlayerRow
                    key={player.id}
                    player={player}
                    isFavorite={favoritesPlayers.has(player)}
                    addFavoritePlayer={addFavoritePlayer}
                    removeFavoritePlayer={removeFavoritePlayer}
                />
            ))}
        </>
    );
};
