'use client'

import { useTournament } from '../context/TournamentContext'

export default function ScoringOptions() {
  const { scoringOptions, setScoringOptions } = useTournament()

  const handleChange = (option: keyof typeof scoringOptions) => {
    setScoringOptions({ ...scoringOptions, [option]: !scoringOptions[option] })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Scoring Options</h2>
      <div className="space-y-2">
        <div>
          <input
            type="checkbox"
            id="includeExperience"
            checked={scoringOptions.includeExperience}
            onChange={() => handleChange('includeExperience')}
            className="mr-2"
          />
          <label htmlFor="includeExperience">Include player experience</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeTableStrength"
            checked={scoringOptions.includeTableStrength}
            onChange={() => handleChange('includeTableStrength')}
            className="mr-2"
          />
          <label htmlFor="includeTableStrength">Include table strength</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeGameComplexity"
            checked={scoringOptions.includeGameComplexity}
            onChange={() => handleChange('includeGameComplexity')}
            className="mr-2"
          />
          <label htmlFor="includeGameComplexity">Include game complexity</label>
        </div>
      </div>
    </div>
  )
}

