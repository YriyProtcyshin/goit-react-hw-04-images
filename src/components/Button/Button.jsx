import css from "./Button.module.css"
import PropsTypes from "prop-types"

export function Button({ nextPage}) {
    return (
        <button type="button" className={css.button} onClick={nextPage}>Load more</button>
    )
}


Button.propTypes = {
    nextPage: PropsTypes.func
}