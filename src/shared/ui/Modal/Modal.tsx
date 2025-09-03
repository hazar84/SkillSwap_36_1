import styles from './Modal.module.css';
import type { FC, ReactNode} from 'react';
import { useEffect } from 'react';

interface ModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const ModalUI: FC<ModalUIProps> = ({ isOpen, onClose, children }) => {
  {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;}

 return(
    <>
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
    </>)}
