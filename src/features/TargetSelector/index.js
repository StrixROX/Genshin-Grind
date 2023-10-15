import { useState } from 'react'

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
      <span className="name">{data.name}</span>
    </div>
  )
}

export default function TargetSelector({ onSubmit }) {
  // sample data from db
  const targets = {
    "10000002": {
      "_id": {
        "$oid": "652a3f04fcc838608c413c7a"
      },
      "id": 10000002,
      "rank": 5,
      "name": "Kamisato Ayaka",
      "element": "Ice",
      "weaponType": "WEAPON_SWORD_ONE_HAND",
      "icon": "UI_AvatarIcon_Ayaka",
      "birthday": [
        9,
        28
      ],
      "release": 1626814800,
      "route": "Kamisato Ayaka"
    },
    "10000003": {
      "_id": {
        "$oid": "652a3f04fcc838608c413c7b"
      },
      "id": 10000003,
      "rank": 5,
      "name": "Jean",
      "element": "Wind",
      "weaponType": "WEAPON_SWORD_ONE_HAND",
      "icon": "UI_AvatarIcon_Qin",
      "birthday": [
        3,
        14
      ],
      "release": 1600131600,
      "route": "Jean"
    }
  } // { id1: {..., "id": id1, ...}, ... }

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