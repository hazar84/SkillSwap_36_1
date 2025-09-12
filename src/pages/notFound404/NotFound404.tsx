import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMin } from '../../widgets/header-min/header-min'
import { FooterUI } from "../../widgets/footer/footer"
import { Button } from '../../shared/ui/Button/Button'
import styles from "./page-404.module.css";

export const NotFound404: FC = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundPage}>
      <HeaderMin/>
      <main className={styles.main}>
        <img src='/icons/404.svg' alt="Страница не найдена" />
        <div className={styles.containerWrap}>
          <div className={styles.textWrap}>
            <h2 className={styles.errorLabel}>Страница не найдена</h2>
            <span className={styles.errorText}>
              К сожалению, эта страница недоступна. Вернитесь на главную
              страницу или попробуйте позже
            </span>
          </div>
          <Button variant="secondary" onClick={handleClickButton}>
          Сообщить об ошибке
          </Button>
          <Button variant={'primary'} className={styles.customButton} onClick={handleClickButton}>
            <span className={styles.button}>На главную</span>
          </Button>
        </div>
      </main>
      <FooterUI/>
    </div>
  );
};