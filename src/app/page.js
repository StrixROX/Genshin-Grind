'use client'

import { useState } from "react"
import TargetSelector from "@features/TargetSelector"
import TargetStatSelector from "@features/TargetStatSelector"

export default function Home() {
  const [targets, setTargets] = useState([])

  return (
    <>
      <h1>Genshin Grind</h1>
      <TargetSelector onSubmit={(data) => setTargets(data)} />
      <p>Selected: {JSON.stringify(targets.map(el => el.name + (el.element ? ` (${el.element})` : '')))}</p>
      <TargetStatSelector targets={targets} />
    </>
  )
}
