'use client'

import { useTournament } from '../context/TournamentContext'

export default function GameLayout() {
  const { gameLayout, games } = useTournament()

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Current Round Layout</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <div key={game.name} className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
            {gameLayout[game.name] && gameLayout[game.name].length > 0 ? (
              <ul className="list-disc pl-5">
                {gameLayout[game.name].map((player) => (
                  <li key={player.name}>
                    {player.name} (Exp: {player.experience})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No players assigned to this game yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

