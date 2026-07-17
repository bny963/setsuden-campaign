import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span>⚡ 節電チャレンジ！</span>
        </div>
        <p className={styles.copy}>
          ※このサイトはポートフォリオ用の架空キャンペーンサイトです。
        </p>
        <p className={styles.copy}>
          © 2026 節電チャレンジ！キャンペーン事務局（架空）
        </p>
      </div>
    </footer>
  )
}
