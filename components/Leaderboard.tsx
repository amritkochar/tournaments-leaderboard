'use client'

import { useTournament } from '../context/TournamentContext'

export default function Leaderboard() {
  const { players, currentRound } = useTournament()

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="bg-white shadow-md rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <div className="text-xl font-semibold">Round: {currentRound}</div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Name</th>
            <th className="text-left">Experience</th>
            <th className="text-left">Score</th>
            <th className="text-left">Games Played</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={player.name} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.experience}</td>
              <td>{player.score.toFixed(2)}</td>
              <td>{player.gamesPlayed.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

