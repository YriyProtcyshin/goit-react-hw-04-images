import { Component } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"

const modalRoot = document.querySelector("#modal_root")


export class Modal extends Component{
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = (event) => {
        if (event.code === "Escape") {
            this.props.onCloseModal()
        }
    }   

    handBackDropClick = (event) => {     
        if (event.currentTarget === event.target) {
            this.props.onCloseModal()
        }
    }


    render() {
        const {onCloseModal, activeItem} = this.props
        return createPortal(
            <div className={css.Overlay} onClick={this.handBackDropClick }>
                <button type="button" className={css.button} onClick={onCloseModal}>Close</button>
                <div className={css.Modal }>
                    <img src={ activeItem.largeImageURL} alt={activeItem.tags} />
                </div>
            </div>,
            modalRoot
        )
    }
}