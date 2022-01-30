import { useReducer } from "react"
import BouttonChiffre from "./BouttonChiffre"
import BouttonOperation from "./BouttonOperation"
import TopBar from "./TopBar.js"
import "./App.css"

//Liste des différentes actions qu'il est possible d'effectuer avec la calculatrice
export const ACTIONS = {
  CHIFFRE: "chiffre",
  OPERATION: "operation",
  RESET: "reset",
  EFFACER: "effacer",
  CALCULER: "calculer",
}

//
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CHIFFRE:
      if (state.overwrite) {
        return {
          ...state,
          operationActuelle: payload.chiffre,
          overwrite: false,
        }
      }
      if (payload.chiffre === "0" && state.operationActuelle === "0") {
        return state
      }
      if (payload.chiffre === "." && state.operationActuelle.includes(".")) {
        return state
      }

      return {
        ...state,
        operationActuelle: `${state.operationActuelle || ""}${payload.chiffre}`,
      }
    case ACTIONS.OPERATION:
      if (state.operationActuelle == null && state.derniereOperation == null) {
        return state
      }

      if (state.operationActuelle == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.derniereOperation == null) {
        return {
          ...state,
          operation: payload.operation,
          derniereOperation: state.operationActuelle,
          operationActuelle: null,
        }
      }

      return {
        ...state,
        derniereOperation: calculer(state),
        operation: payload.operation,
        operationActuelle: null,
      }
    case ACTIONS.RESET:
      return {}
    case ACTIONS.EFFACER:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          operationActuelle: null,
        }
      }
      if (state.operationActuelle == null) return state
      if (state.operationActuelle.length === 1) {
        return { ...state, operationActuelle: null }
      }

      return {
        ...state,
        operationActuelle: state.operationActuelle.slice(0, -1),
      }
    case ACTIONS.CALCULER:
      if (
        state.operation == null ||
        state.operationActuelle == null ||
        state.derniereOperation == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        derniereOperation: null,
        operation: null,
        operationActuelle: calculer(state),
      }
  }
}

//Format d'affichage du nombre, en-us utilise . pour séparer les entiers des décimales et , pour séparer les groupes de trois entiers
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

//retourne un nombre entier/decimal avec le bon format à l'aide du formatter au dessus
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

//effectue le calcule entre la partie gauche de l'opération et la partie droite
function calculer({ operationActuelle, derniereOperation, operation }) {
  const gauche = parseFloat(derniereOperation)
  const droite = parseFloat(operationActuelle)
  if (isNaN(gauche) || isNaN(droite)) return ""
  let calcul = ""
  switch (operation) {
    case "+":
      calcul = gauche + droite
      break
    case "-":
      calcul = gauche - droite
      break
    case "*":
      calcul = gauche * droite
      break
    case "÷":
      calcul = gauche / droite
      break
  }

  return calcul.toString()
}

//frontend
function App() {
  const [{ operationActuelle, derniereOperation, operation }, transfert] = useReducer(
    reducer,
    {}
  )

  return (
    <div className="pp">
      <TopBar/>
      <div className="screen">
        
        <div className="calculatrice">
          <div className="calculatrice-ecran">
            <div className="derniere-operation">
              {formatOperand(derniereOperation)} {operation}
            </div>
            <div className="operation-actuelle">{formatOperand(operationActuelle)}</div>
          </div>
          <button
            className="AC"
            onClick={() => transfert({ type: ACTIONS.RESET })}
          >
            AC
          </button>
          <button 
            className="del"
            onClick={() => transfert({ type: ACTIONS.EFFACER })}>
            DEL
          </button>
          <BouttonOperation operation="÷" transfert={transfert} />
          <BouttonChiffre chiffre="1" transfert={transfert} />
          <BouttonChiffre chiffre="2" transfert={transfert} />
          <BouttonChiffre chiffre="3" transfert={transfert} />
          <BouttonOperation operation="*" transfert={transfert} />
          <BouttonChiffre chiffre="4" transfert={transfert} />
          <BouttonChiffre chiffre="5" transfert={transfert} />
          <BouttonChiffre chiffre="6" transfert={transfert} />
          <BouttonOperation operation="+" transfert={transfert} />
          <BouttonChiffre chiffre="7" transfert={transfert} />
          <BouttonChiffre chiffre="8" transfert={transfert} />
          <BouttonChiffre chiffre="9" transfert={transfert} />
          <BouttonOperation operation="-" transfert={transfert} />
          <BouttonChiffre chiffre="." transfert={transfert} />
          <BouttonChiffre chiffre="0" transfert={transfert} />
          <button
            className="egal"
            onClick={() => transfert({ type: ACTIONS.CALCULER })}
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default App