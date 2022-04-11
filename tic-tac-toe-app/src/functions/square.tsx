interface SquareProps {
  value: string | null
  onClick: () => void
}

export function Square(props: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
