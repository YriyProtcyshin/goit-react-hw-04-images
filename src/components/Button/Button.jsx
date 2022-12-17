import css from "./Button.module.css"

export function Button({ nexPage}) {
    return (
        <button type="button" className={css.button} onClick={nexPage}>Load more</button>
    )
}