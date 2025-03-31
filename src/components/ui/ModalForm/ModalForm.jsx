import css from './ModalForm.module.css';
import Button from '../Button/Button';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalFormStyles = {
  content: {
    position: 'relative',
    border: 'none',
    borderRadius: '30px',
    padding: '64px',
    maxWidth: '565px',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    backgroundColor: '#fbfbfb',
  },
  overlay: {
    zIndex: '99999999999999999',
    backgroundColor: 'rgba(11, 11, 11, 0.6)',
  },
};

export default function ModalForm({ modalIsOpen, closeModal, children }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={ModalFormStyles}
      bodyOpenClassName={css.modalOpen}
      contentLabel="Example Modal"
    >
      <Button type={'button'} variant="close-modal" onClick={closeModal}>
        <svg width={32} height={32}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </Button>
      {children}
    </Modal>
  );
}
