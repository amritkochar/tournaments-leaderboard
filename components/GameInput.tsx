'use client'

import { useState } from 'react'
import { useTournament } from '../context/TournamentContext'

export default function GameInput() {
  const { games, setGames } = useTournament()
  const [name, setName] = useState('')
  const [players, setPlayers] = useState(2)
  const [complexity, setComplexity] = useState(1)

  const addGame = () => {
    if (name) {
      setGames([...games, { name, players, complexity }])
      setName('')
      setPlayers(2)
      setComplexity(1)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Add Games</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Game Name"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={players}
          onChange={(e) => setPlayers(parseInt(e.target.value))}
          placeholder="Number of players"
          min={2}
          className="border p-2 rounded w-20"
        />
        <input
          type="number"
          value={complexity}
          onChange={(e) => setComplexity(parseFloat(e.target.value))}
          min={0}
          max={5}
          step={0.01}
          placeholder="Complexity"
          className="border p-2 rounded w-20"
        />
        <button onClick={addGame} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Game
        </button>
      </div>
      <ul className="list-disc pl-5">
        {games.map((game, index) => (
          <li key={index}>
            {game.name} - Players: {game.players}, Complexity: {game.complexity}
          </li>
        ))}
      </ul>
    </div>
  )
}

