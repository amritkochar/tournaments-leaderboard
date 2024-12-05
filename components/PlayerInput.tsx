'use client'

import { useState } from 'react'
import { useTournament } from '../context/TournamentContext'

export default function PlayerInput() {
  const { players, setPlayers } = useTournament()
  const [name, setName] = useState('')
  const [experience, setExperience] = useState(1)

  const addPlayer = () => {
    if (name) {
      setPlayers([...players, { name, experience, score: 0, gamesPlayed: [], playedWith: [] }])
      setName('')
      setExperience(1)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Add Players</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player Name"
          className="border p-2 rounded"
        />
        <select
          value={experience}
          onChange={(e) => setExperience(parseInt(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={1}>Beginner</option>
          <option value={2}>Intermediate</option>
          <option value={3}>Expert</option>
        </select>
        <button onClick={addPlayer} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Player
        </button>
      </div>
      <ul className="list-disc pl-5">
        {players.map((player, index) => (
          <li key={index}>
            {player.name} - Experience: {player.experience}
          </li>
        ))}
      </ul>
    </div>
  )
}

