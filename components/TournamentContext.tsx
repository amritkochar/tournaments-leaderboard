'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Player {
  name: string
  experience: number
  score: number
  gamesPlayed: string[]
  playedWith: string[]
}

interface Game {
  name: string
  players: number
  complexity: number
}

interface ScoringOptions {
  includeExperience: boolean
  includeTableStrength: boolean
  includeGameComplexity: boolean
}

interface TournamentContextType {
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  games: Game[]
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
  scoringOptions: ScoringOptions
  setScoringOptions: React.Dispatch<React.SetStateAction<ScoringOptions>>
  currentRound: number
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>
  gameLayout: { [key: string]: Player[] }
  setGameLayout: React.Dispatch<React.SetStateAction<{ [key: string]: Player[] }>>
  updateScores: (results: { [key: string]: { [key: string]: number } }) => void
  resetTournament: () => void
  isTournamentEnded: boolean
  setIsTournamentEnded: React.Dispatch<React.SetStateAction<boolean>>
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export const useTournament = () => {
  const context = useContext(TournamentContext)
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider')
  }
  return context
}

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [scoringOptions, setScoringOptions] = useState<ScoringOptions>({
    includeExperience: false,
    includeTableStrength: false,
    includeGameComplexity: false,
  })
  const [currentRound, setCurrentRound] = useState(1)
  const [gameLayout, setGameLayout] = useState<{ [key: string]: Player[] }>({})
  const [isTournamentEnded, setIsTournamentEnded] = useState(false)

  const generateGameLayout = () => {
    const newLayout: { [key: string]: Player[] } = {}
    let availablePlayers = [...players]

    games.forEach(game => {
      newLayout[game.name] = []
      const playersNeeded = Math.min(game.players, availablePlayers.length)

      for (let i = 0; i < playersNeeded; i++) {
        let bestPlayer: Player | null = null
        let bestScore = -1

        for (const player of availablePlayers) {
          if (player.gamesPlayed.includes(game.name)) continue

          const playedWithCount = newLayout[game.name].filter(p => player.playedWith.includes(p.name)).length
          const score = playedWithCount === 0 ? 2 : playedWithCount === 1 ? 1 : 0

          if (score > bestScore) {
            bestScore = score
            bestPlayer = player
          }
        }

        if (!bestPlayer) {
          bestPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)]
        }

        newLayout[game.name].push(bestPlayer)
        availablePlayers = availablePlayers.filter(p => p.name !== bestPlayer!.name)
      }
    })

    // Update players' gamesPlayed and playedWith
    const updatedPlayers = players.map(player => {
      const playingGame = Object.entries(newLayout).find(([_, gamePlayers]) =>
        gamePlayers.some(p => p.name === player.name)
      )
      if (playingGame) {
        const newPlayedWith = newLayout[playingGame[0]]
          .filter(p => p.name !== player.name)
          .map(p => p.name)
        return {
          ...player,
          gamesPlayed: [...player.gamesPlayed, playingGame[0]],
          playedWith: [...new Set([...player.playedWith, ...newPlayedWith])]
        }
      }
      return player
    })

    setPlayers(updatedPlayers)
    setGameLayout(newLayout)
  }

  const updateScores = (results: { [key: string]: { [key: string]: number } }) => {
    const updatedPlayers = players.map(player => {
      let roundScore = 0
      Object.entries(results).forEach(([gameName, gameResults]) => {
        if (gameResults[player.name]) {
          const game = games.find(g => g.name === gameName)
          if (game) {
            const rank = gameResults[player.name]
            const baseScore = game.players - rank + 1
            let multiplier = 1

            if (scoringOptions.includeExperience) {
              const avgExperience = gameLayout[gameName].reduce((sum, p) => sum + p.experience, 0) / game.players
              multiplier *= (avgExperience / player.experience)
            }

            if (scoringOptions.includeTableStrength) {
              const tableStrength = gameLayout[gameName].reduce((sum, p) => sum + p.experience, 0) / game.players
              multiplier *= tableStrength
            }

            if (scoringOptions.includeGameComplexity) {
              multiplier *= game.complexity
            }

            roundScore += baseScore * multiplier
          }
        }
      })

      return {
        ...player,
        score: player.score + roundScore
      }
    })

    setPlayers(updatedPlayers)
    setCurrentRound(currentRound + 1)

    // Check if the tournament has ended
    const totalRounds = games.length
    if (currentRound >= totalRounds) {
      setIsTournamentEnded(true)
    } else {
      generateGameLayout()
    }
  }

  const resetTournament = () => {
    setPlayers(players.map(player => ({ ...player, score: 0, gamesPlayed: [], playedWith: [] })))
    setCurrentRound(1)
    setIsTournamentEnded(false)
    generateGameLayout()
  }

  return (
    <TournamentContext.Provider
      value={{
        players,
        setPlayers,
        games,
        setGames,
        scoringOptions,
        setScoringOptions,
        currentRound,
        setCurrentRound,
        gameLayout,
        setGameLayout,
        updateScores,
        resetTournament,
        isTournamentEnded,
        setIsTournamentEnded,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

