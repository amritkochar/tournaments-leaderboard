'use client'

import { useState } from 'react'
import { TournamentProvider, useTournament } from '../context/TournamentContext'
import PlayerInput from '../components/PlayerInput'
import GameInput from '../components/GameInput'
import ScoringOptions from '../components/ScoringOptions'
import Leaderboard from '../components/Leaderboard'
import GameLayout from '../components/GameLayout'
import ResultsInput from '../components/ResultsInput'
import FinalLeaderboard from '../components/FinalLeaderboard'

function TournamentSetup({ onStart }: { onStart: () => void }) {
  const { players, games, resetTournament } = useTournament()

  const handleStart = () => {
    if (players.length > 0 && games.length > 0) {
      resetTournament()
      onStart()
    } else {
      alert('Please add at least one player and one game before starting the tournament.')
    }
  }

  return (
    <div className="space-y-8">
      <PlayerInput />
      <GameInput />
      <ScoringOptions />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleStart}
      >
        Start Tournament
      </button>
    </div>
  )
}

function TournamentInProgress() {
  const { isTournamentEnded } = useTournament()

  return (
    <div className="grid grid-cols-2 gap-8">
      <Leaderboard />
      <GameLayout />
      <div className="col-span-2">
        <ResultsInput />
      </div>
      {isTournamentEnded && <FinalLeaderboard />}
    </div>
  )
}

export default function Home() {
  const [setupComplete, setSetupComplete] = useState(false)

  return (
    <TournamentProvider>
      <main className="min-h-screen p-8">
        {!setupComplete ? (
          <TournamentSetup onStart={() => setSetupComplete(true)} />
        ) : (
          <TournamentInProgress />
        )}
      </main>
    </TournamentProvider>
  )
}

