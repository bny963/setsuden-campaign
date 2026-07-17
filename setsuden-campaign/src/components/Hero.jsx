import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.badge}>2026年 夏の節電キャンペーン</p>
        <h1 className={styles.title}>
          みんなで節電。<br />
          地球と未来を、<br className={styles.spBr} />守ろう。
        </h1>
        <p className={styles.sub}>
          今夏、節電に取り組んだ方の中から抽選で豪華賞品をプレゼント！<br />
          あなたの小さな一歩が、大きな変化につながります。
        </p>
        <a href="#form" className={styles.cta}>
          今すぐ応募する →
        </a>
        <p className={styles.period}>応募期間：2026年7月1日〜8月31日</p>
      </div>
    </section>
  )
}
