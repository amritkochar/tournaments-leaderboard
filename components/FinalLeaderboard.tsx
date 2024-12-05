'use client'

import { useTournament } from '../context/TournamentContext'

export default function FinalLeaderboard() {
  const { players } = useTournament()

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white shadow-md rounded p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Final Leaderboard</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Name</th>
              <th className="text-left">Experience</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={player.name} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.experience}</td>
                <td>{player.score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

