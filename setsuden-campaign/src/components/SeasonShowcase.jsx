import { useState } from 'react'
import styles from './SeasonShowcase.module.css'

const seasons = [
  {
    key: 'spring',
    label: '春',
    emoji: '🌸',
    badge: '2026年 春の節電キャンペーン',
    title: '新生活を、\n省エネからはじめよう。',
    desc: '新生活シーズンにあわせて、家電の買い替え・使い方の見直しでムダな電力をカット。エコな暮らしのはじめの一歩を応援します。',
    period: '応募期間：2026年3月1日〜5月31日',
    prize: '賞品：エコ家電クーポン・観葉植物セット',
  },
  {
    key: 'summer',
    label: '夏',
    emoji: '☀️',
    badge: '2026年 夏の節電キャンペーン',
    title: 'みんなで節電。\n地球と未来を、守ろう。',
    desc: '今夏、節電に取り組んだ方の中から抽選で豪華賞品をプレゼント！あなたの小さな一歩が、大きな変化につながります。',
    period: '応募期間：2026年7月1日〜8月31日',
    prize: '賞品：ポータブル電源・エコ家電セット',
  },
  {
    key: 'autumn',
    label: '秋',
    emoji: '🍁',
    badge: '2026年 秋の節電キャンペーン',
    title: '過ごしやすい季節に、\n省エネ習慣を。',
    desc: '冷暖房を使わない過ごしやすい季節こそ、節電習慣の定着チャンス。日々の取り組みを記録して、素敵な賞品に応募しよう。',
    period: '応募期間：2026年9月1日〜11月30日',
    prize: '賞品：地域特産品詰め合わせ・図書カード',
  },
  {
    key: 'winter',
    label: '冬',
    emoji: '❄️',
    badge: '2026年 冬の節電キャンペーン',
    title: 'あたたかく、\n賢く乗り切る冬へ。',
    desc: '暖房需要が高まる冬こそ節電の効果が大きい季節。厚着や断熱グッズなど、無理なく続けられる工夫で応募しよう。',
    period: '応募期間：2026年12月1日〜2027年2月28日',
    prize: '賞品：あったかグッズセット・電気毛布',
  },
]

export default function SeasonShowcase() {
  const [active, setActive] = useState('summer')
  const current = seasons.find((s) => s.key === active)

  return (
    <section id="season" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>SEASON CAMPAIGN</p>
        <h2 className={styles.heading}>季節の節電チャレンジ</h2>
        <p className={styles.desc}>春夏秋冬、季節ごとにテーマを変えて開催中。気になる季節をタップしてチェック！</p>

        <div className={styles.tabs} role="tablist">
          {seasons.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active === s.key}
              data-season={s.key}
              className={`${styles.tab} ${active === s.key ? styles.tabActive : ''}`}
              onClick={() => setActive(s.key)}
            >
              <span className={styles.tabEmoji}>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.panel} data-season={current.key}>
          <div className={styles.panelOverlay} />
          <div className={styles.panelContent}>
            <p className={styles.panelBadge}>{current.badge}</p>
            <h3 className={styles.panelTitle}>
              {current.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < current.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p className={styles.panelDesc}>{current.desc}</p>
            <div className={styles.panelMeta}>
              <span className={styles.panelPrize}>{current.prize}</span>
              <span className={styles.panelPeriod}>{current.period}</span>
            </div>
            <a href="#form" className={styles.panelCta}>
              この季節のキャンペーンに応募する →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
