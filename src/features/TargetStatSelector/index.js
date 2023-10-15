'use client'

import TargetStatCard from "./components/TargetStatCard"

export default function TargetStatSelector({ targets }) {
  return (
    <>
      {
        targets.map((el, i) => <TargetStatCard data={el} key={i} />)
      }
    </>
  )
}