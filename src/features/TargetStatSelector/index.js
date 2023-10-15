'use client'

import AvatarStatCard from "./components/AvatarStatSelector"
import WeaponStatCard from "./components/WeaponStatSelector"

export default function TargetStatSelector({ targets }) {
  return (
    <>
      {
        targets.map((el, i) => {
          if (el.type === 'avatar') {
            return <AvatarStatCard data={el} key={i} />
          }
          else if (el.type === 'weapon') {
            return <WeaponStatCard data={el} key={i} />
          }
        })
      }
    </>
  )
}