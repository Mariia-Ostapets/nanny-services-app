import css from './ModalForm.module.css';
import Button from '../Button/Button';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalForm({
  modalIsOpen,
  closeModal,
  children,
  variant = null,
}) {
  const ModalFormStyles = {
    content: {
      position: 'relative',
      border: 'none',
      borderRadius: '30px',
      padding: '64px',
      maxWidth: variant === 'makeAppointment' ? '600px' : '565px',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      backgroundColor: '#fbfbfb',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    overlay: {
      zIndex: '99999999999999999',
      backgroundColor: 'rgba(11, 11, 11, 0.6)',
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={ModalFormStyles}
      bodyOpenClassName={css.modalOpen}
      contentLabel="Example Modal"
      // contentClassName="modal-scroll"
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
