import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../../widgets/header/header'
import { FooterUI } from "../../widgets/footer/footer"
import { Button } from '../../shared/ui/Button/Button'
import styles from "./NotFound404.module.css";

export const NotFound404: FC = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundPage}>
      <Header/>
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
          <div className={styles.buttons}>
          <Button variant="secondary" onClick={handleClickButton}>
           Сообщить об ошибке
          </Button>
          <Button variant={'primary'} onClick={handleClickButton}>
            На главную
          </Button>
          </div>
        </div>
      </main>
      <FooterUI/>
    </div>
  );
};
