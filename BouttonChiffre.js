import { ACTIONS } from "./App"

export default function BouttonChiffre({ transfert, chiffre }) {
  return (
    <button className="bouton-chiffre"
      onClick={() => transfert({ type: ACTIONS.CHIFFRE, payload: { chiffre } })}
    >
      {chiffre}
    </button>
  )
}