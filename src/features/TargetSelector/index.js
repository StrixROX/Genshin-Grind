'use client'

import { useState, useEffect } from 'react'

const BASE_URL_IMAGE = process.env.NEXT_PUBLIC_BASE_URL_IMAGE

function Icon({ data, isSelected, clickHandler }) {
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

export default function TargetSelector({ onSubmit }) {
  const [targets, setTargets] = useState({}) // { id1: {..., "id": id1, ...}, ... }
  useEffect(() => {
    fetch('/api/avatar')
    .then(res => res.json())
    .then(res => {
      const formattedData = {}

      for (let i in res) {
        formattedData[res[i].id] = res[i]
      }

      setTargets(formattedData)
    })
  }, [])

  const [selected, setSelected] = useState([]) // [ id1, id2, ... ]

  function handleIconClick(data) {
    if (!selected.includes(data.id)) {
      setSelected([...selected, data.id])
    }
    else {
      setSelected([...selected].filter((el) => el != data.id))
    }
  }

  function handleSubmit() {
    const selectedTargets = selected.map(el => targets[el])

    onSubmit(selectedTargets)
  }

  return (
    <>
      <div className="selector" style={{display: 'flex', flexWrap: 'wrap'}}>
        {
          Object.values(targets).map((el, i) => {
            return <Icon
              key={i}
              data={el}
              isSelected={() => selected.includes(el.id)}
              clickHandler={handleIconClick} />
          })
        }
      </div>
      <button onClick={handleSubmit}>Done</button>
    </>
  )
}