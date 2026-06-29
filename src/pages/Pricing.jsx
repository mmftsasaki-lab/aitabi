import { Button, CTABand, Icon, SectionTitle } from "../components";
import { photos } from "../data.js";

const plans = [
  { name: "無料プラン", price: "¥0", lead: "まずは旅の記録を試したい方へ", features: ["月3件まで記事作成", "写真30枚まで", "公開・非公開設定"] },
  { name: "Plusプラン", price: "¥680 / 月", lead: "定期的に旅を残したい方へ", recommended: true, features: ["月30件まで記事作成", "写真300枚まで", "AIトーン調整", "SNS要約"] },
  { name: "Premiumプラン", price: "¥1,480 / 月", lead: "旅の記録を深く管理したい方へ", features: ["保存容量を大きく拡張", "旅程テンプレート", "優先サポート"] }
];

export default function Pricing() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page py-16">
        <SectionTitle eyebrow="PRICING" title="旅の記録を、あなたのペースで。" body="無料ではじめて、記録が増えてきたら必要な分だけアップグレードできます。" align="center" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`rounded-card border bg-paper p-7 shadow-soft ${plan.recommended ? "border-gold ring-4 ring-gold/15" : "border-line"}`}>
              {plan.recommended ? <span className="rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">おすすめ</span> : null}
              <h2 className="mt-5 font-serif text-3xl">{plan.name}</h2>
              <p className="mt-3 text-sm leading-7 text-ink">{plan.lead}</p>
              <p className="mt-6 font-serif text-4xl text-teal">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-ink">
                    <Icon name="check" className="h-5 w-5 text-teal" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-7 w-full" href="/create" variant={plan.recommended ? "primary" : "secondary"}>{plan.recommended ? "Plusで残す" : "無料ではじめる"}</Button>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-paper py-16">
        <div className="container-page">
          <h2 className="font-serif text-3xl">よくある質問</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[["無料でも使えますか？", "はい。月3件まで記事作成をお試しいただけます。"], ["公開せずに保存できますか？", "できます。非公開の旅日記として残せます。"], ["AIが作った文章は編集できますか？", "もちろんです。あとから自由に書き換えられます。"]].map(([q, a]) => (
              <article key={q} className="rounded-card border border-line bg-ivory p-6">
                <h3 className="font-serif text-xl">{q}</h3>
                <p className="mt-3 text-sm leading-7 text-ink">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="まずは、ひとつの旅から。" body="写真を数枚選ぶだけで、あなたの旅が読み返せる記録になります。" image={photos.breakfast} />
    </main>
  );
}
