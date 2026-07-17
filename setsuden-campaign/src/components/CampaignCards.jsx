import styles from './CampaignCards.module.css'

const cards = [
  {
    icon: '🌿',
    title: 'エコ行動を記録しよう',
    desc: '毎日の節電行動（冷房の温度設定・待機電力カット・LED化など）をチェックリストで記録。達成した内容をフォームで報告するだけで応募完了！',
    tag: 'STEP 1',
  },
  {
    icon: '🎁',
    title: '豪華賞品が当たる！',
    desc: '抽選で「最新ポータブル電源」「エコ家電セット」「地域特産品詰め合わせ」など、全100名様に豪華賞品をプレゼント。ぜひご応募ください！',
    tag: 'STEP 2',
  },
  {
    icon: '🌍',
    title: '結果を社会に還元',
    desc: '応募者全員の節電量を集計し、その結果をWebサイトで公開します。みんなの取り組みが可視化され、社会全体のエコ意識向上につながります。',
    tag: 'STEP 3',
  },
]

export default function CampaignCards() {
  return (
    <section id="campaign" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>CAMPAIGN</p>
        <h2 className={styles.heading}>キャンペーンの流れ</h2>
        <p className={styles.desc}>3ステップで簡単参加。あなたの節電が地球を救う！</p>
        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.tag} className={styles.card}>
              <span className={styles.tag}>{card.tag}</span>
              <div className={styles.icon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
