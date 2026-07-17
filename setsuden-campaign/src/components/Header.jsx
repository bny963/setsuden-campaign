import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>節電チャレンジ！</span>
        </div>
        <nav className={styles.nav}>
          <a href="#campaign">キャンペーン内容</a>
          <a href="#form">応募する</a>
        </nav>
      </div>
    </header>
  )
}
