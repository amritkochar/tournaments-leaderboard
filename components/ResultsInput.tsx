'use client'

import { useState } from 'react'
import { useTournament } from '../context/TournamentContext'

export default function ResultsInput() {
  const { gameLayout, updateScores, games, isTournamentEnded } = useTournament()
  const [results, setResults] = useState<{ [key: string]: { [key: string]: number } }>({})

  const handleRankChange = (game: string, player: string, rank: number) => {
    setResults((prevResults) => ({
      ...prevResults,
      [game]: {
        ...prevResults[game],
        [player]: rank,
      },
    }))
  }

  const handleSubmit = () => {
    // Validate results
    const isValid = games.every((game) => {
      const gameResults = results[game.name] || {}
      const ranks = Object.values(gameResults)
      return (
        ranks.length === (gameLayout[game.name]?.length || 0) &&
        new Set(ranks).size === ranks.length
      )
    })

    if (isValid) {
      updateScores(results)
      setResults({})
    } else {
      alert('Please ensure all players have unique ranks for each game.')
    }
  }

  if (isTournamentEnded) {
    return null
  }

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Input Results</h2>
      <div className="space-y-4">
        {games.map((game) => (
          <div key={game.name} className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
            {gameLayout[game.name] && gameLayout[game.name].length > 0 ? (
              gameLayout[game.name].map((player) => (
                <div key={player.name} className="flex items-center space-x-2 mb-2">
                  <span>{player.name}:</span>
                  <select
                    value={results[game.name]?.[player.name] || ''}
                    onChange={(e) => handleRankChange(game.name, player.name, parseInt(e.target.value))}
                    className="border p-1 rounded"
                  >
                    <option value="">Select rank</option>
                    {gameLayout[game.name].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <p>No players assigned to this game yet.</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Results and Start Next Round
      </button>
    </div>
  )
}

