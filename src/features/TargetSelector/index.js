'use client'

import { useState, useEffect } from 'react'

const BASE_URL_IMAGE = process.env.NEXT_PUBLIC_BASE_URL_IMAGE

function AvatarIcon({ data, isSelected, clickHandler }) {
  return (
    <div className="target" onClick={() => clickHandler(data)}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 100,
      alignItems: 'center',
      textAlign: 'center',
      margin: 10,
      border: (isSelected() ? "2px solid black": "none")
    }}>
      <img src={BASE_URL_IMAGE + data.icon + '.png'} alt={data.name} style={{'width': "100%"}} />
      <span className="name">{ data.name + ` (${data.element})`}</span>
    </div>
  )
}

function WeaponIcon({ data, isSelected, clickHandler }) {
  return (
    <div className="target" onClick={() => clickHandler(data)}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 100,
      alignItems: 'center',
      textAlign: 'center',
      margin: 10,
      border: (isSelected() ? "2px solid black": "none")
    }}>
      <img src={BASE_URL_IMAGE + data.icon + '.png'} alt={data.name} style={{'width': "100%"}} />
      <span className="name">{ data.name }</span>
    </div>
  )
}

export default function TargetSelector({ onSubmit }) {
  const [avatars, setAvatars] = useState({})
  const [weapons, setWeapons] = useState({})
  
  const [targetType, setTargetType] = useState('avatar')
  const [targets, setTargets] = useState({}) // { id1: {..., "id": id1, ...}, ... }
  const [selected, setSelected] = useState([]) // [ id1, id2, ... ]

  useEffect(() => {
    fetch('/api/avatar')
    .then(res => res.json())
    .then(res => {
      const formattedData = {}
      for (let i in res) {
        formattedData[res[i].id] = res[i]
      }
      setAvatars(formattedData)
      
      return formattedData
    })
    
    fetch('/api/weapon')
    .then(res => res.json())
    .then(res => {
      const formattedData = {}
      for (let i in res) {
        formattedData[res[i].id] = res[i]
      }
      setWeapons(formattedData)

      return formattedData
    })
  }, [])

  useEffect(() => {
    if (targetType === 'avatar') {
      setTargets(avatars)
    }
    else if (targetType === 'weapon') {
      setTargets(weapons)
    }
  }, [targetType, avatars, weapons])

  function handleIconClick(data) {
    if (!selected.includes(data.id)) {
      setSelected([...selected, data.id])
    }
    else {
      setSelected([...selected].filter((el) => el != data.id))
    }
  }

  function handleSubmit() {
    const selectedTargets = selected.map(el => avatars[el] || weapons[el])

    onSubmit(selectedTargets)
  }

  return (
    <>
      <div className="select-target-type">
        <button onClick={() => setTargetType('avatar')}>Characters</button>
        <button onClick={() => setTargetType('weapon')}>Weapons</button>
      </div>
      <div className="selector" style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          Object.values(targets).map((el, i) => {
            if (targetType === 'avatar') {
              return <AvatarIcon
                key={i}
                data={el}
                isSelected={() => selected.includes(el.id)}
                clickHandler={handleIconClick} />
            }
            else if (targetType === 'weapon') {
              return <WeaponIcon
                key={i}
                data={el}
                isSelected={() => selected.includes(el.id)}
                clickHandler={handleIconClick} />
            }
          })
        }
      </div>
      <button onClick={handleSubmit}>Done</button>
    </>
  )
}