const BASE_URL_IMAGE = process.env.NEXT_PUBLIC_BASE_URL_IMAGE

export default function AvatarIcon({ data, isSelected, clickHandler }) {
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