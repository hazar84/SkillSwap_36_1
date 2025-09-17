import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from '../../widgets/header/header'
import { FooterUI } from "../../widgets/footer/footer"
import { Button } from '../../shared/ui/Button/Button'
import styles from "./ServerError500.module.css";

export const ServerError500: FC = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.serverErrorPage}>
      <Header/>
      <main className={styles.main}>
        <img src='/icons/500.svg' alt="" />
        <div className={styles.containerWrap}>
          <div className={styles.textWrap}>
            <h2 className={styles.errorLabel}>На сервере произошла ошибка</h2>
            <span className={styles.errorText}>
              Попробуйте позже или вернитесь на главную страницу
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
