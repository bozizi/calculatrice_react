import { ACTIONS } from "./App"

export default function BouttonOperation({ transfert, operation }) {
  return (
    <button className="boutton-operation"
      onClick={() =>
        transfert({ type: ACTIONS.OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}