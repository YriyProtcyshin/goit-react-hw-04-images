import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { SlClose } from 'react-icons/sl';

const modalRoot = document.querySelector('#modal_root');

export function Modal({ activeItem, onCloseModal }) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }

  function handBackDropClick(event) {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={handBackDropClick}>
      <button type="button" className={css.button} onClick={onCloseModal}>
        <SlClose />
      </button>
      <div className={css.Modal}>
        <img src={activeItem.largeImageURL} alt={activeItem.tags} />
      </div>
    </div>,
    modalRoot
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onCloseModal();
//     }
//   };

//   handBackDropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onCloseModal();
//     }
//   };

//   render() {
//     const { onCloseModal, activeItem } = this.props;
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handBackDropClick}>
//         <button type="button" className={css.button} onClick={onCloseModal}>
//           <SlClose />
//         </button>
//         <div className={css.Modal}>
//           <img src={activeItem.largeImageURL} alt={activeItem.tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
