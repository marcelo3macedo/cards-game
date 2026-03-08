import { LifePoints } from "../../../components/game/LifePoints";

export function UserLifePoints() {
    return (
        <div className="absolute left-1 sm:left-10 top-1/2 -translate-y-1/2 -mt-2 sm:-mt-0">
            <LifePoints target="player" color="blue" align="left" />
        </div>
    )
}
