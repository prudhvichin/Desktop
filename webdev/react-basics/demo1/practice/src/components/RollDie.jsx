import "./RollDie.css"

function RollDie() {
    const random = Math.floor(Math.random() * 6) + 1
    return (
        <h1 className="RollDie">roll die = {random}</h1>
    )
}


export default RollDie