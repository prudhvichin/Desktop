import RollDie from "./RollDie"
import "./DiceRolled3.css"

function DiceRolled3() {
    return (
        <div className="DiceRolled3">
            <h1>3 dices rolled</h1>
            <RollDie />
            <RollDie />
            <RollDie />

        </div>
    )
}

export default DiceRolled3