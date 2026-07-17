import { useState } from 'react'
import styles from './ApplicationForm.module.css'

const initialState = { name: '', email: '', agreed: false }

export default function ApplicationForm() {
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'お名前を入力してください'
    if (!form.email.trim()) {
      errs.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = '正しいメールアドレスを入力してください'
    }
    if (!form.agreed) errs.agreed = '個人情報の取り扱いに同意してください'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setServerError('')
    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      })
      if (!res.ok) {
        const data = await res.json()
        setServerError(data.message || '送信に失敗しました。再度お試しください。')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('サーバーに接続できませんでした。しばらく後に再試行してください。')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="form" className={styles.section}>
        <div className={styles.thanks}>
          <div className={styles.thanksIcon}>🎉</div>
          <h2 className={styles.thanksTitle}>応募ありがとうございます！</h2>
          <p className={styles.thanksMsg}>
            ご応募を受け付けました。<br />
            当選者の方には8月末までにメールでご連絡いたします。
          </p>
          <button className={styles.resetBtn} onClick={() => { setForm(initialState); setSubmitted(false) }}>
            トップに戻る
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="form" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>ENTRY</p>
        <h2 className={styles.heading}>応募フォーム</h2>
        <p className={styles.desc}>以下のフォームに必要事項を入力して応募してください。</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="name">
              お名前 <span className={styles.required}>必須</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="山田 太郎"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="email">
              メールアドレス <span className={styles.required}>必須</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
          </div>

          <div className={styles.checkField}>
            <label className={styles.checkLabel}>
              <input
                name="agreed"
                type="checkbox"
                className={styles.checkbox}
                checked={form.agreed}
                onChange={handleChange}
              />
              <span>
                <a href="#" className={styles.link}>個人情報の取り扱い</a>に同意する
              </span>
            </label>
            {errors.agreed && <p className={styles.errorMsg}>{errors.agreed}</p>}
          </div>

          {serverError && <p className={styles.errorMsg}>{serverError}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '送信中...' : '応募する →'}
          </button>
        </form>
      </div>
    </section>
  )
}
