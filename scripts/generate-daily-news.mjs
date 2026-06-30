import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const root = fileURLToPath(new URL("..", import.meta.url));
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const sampleMode = args.has("--sample");

const itemCount = Number(process.env.NEWS_ITEM_COUNT || 14);
const aiItemCount = Number(process.env.NEWS_AI_ITEM_COUNT || 7);
const deepGenAiItemCount = Number(process.env.NEWS_DEEP_GENAI_ITEM_COUNT || 2);
const maxCandidates = Number(process.env.NEWS_MAX_CANDIDATES || 90);
const timezone = process.env.NEWS_TIMEZONE || "Asia/Tokyo";
const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";

const feeds = [
  { name: "NHKニュース", url: "https://www3.nhk.or.jp/rss/news/cat0.xml" },
  { name: "ITmedia NEWS", url: "https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml" },
  { name: "Impress Watch", url: "https://www.watch.impress.co.jp/data/rss/1.0/ipw/feed.rdf" },
  { name: "PC Watch", url: "https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf" },
  { name: "家電 Watch", url: "https://kaden.watch.impress.co.jp/data/rss/1.0/kdw/feed.rdf" }
];

const negativePatterns = [
  /死亡|死去|訃報|殺害|殺人|遺体|自殺|暴行|強盗|逮捕|容疑|起訴|詐欺|犯罪/,
  /事故|火災|爆発|墜落|衝突|転落|けが|怪我|重体|重傷|被害/,
  /地震|津波|噴火|台風|豪雨|洪水|土砂|災害|避難|猛暑被害/,
  /戦争|攻撃|侵攻|ミサイル|軍事|テロ|紛争|衝突/,
  /炎上|批判殺到|不祥事|差別|虐待|ハラスメント/,
  /感染|病気|疾患|がん|ウイルス|医療崩壊|痛み|偏見|軽視|死んだ|死体|白骨/,
  /値上げ|倒産|破綻|不況|赤字|解雇|リストラ|円安|コスト上昇|仕入れコスト/,
  /懸念|抗議|販売終了|終了へ|中止|停止|トラブル|公開見送り|地面師|交尾/
];

const positiveHints = [
  /発見|開発|公開|発売|開始|オープン|イベント|展示|受賞|記録|便利|季節|観光|文化|科学|宇宙|AI|ロボット|新サービス|キャンペーン|地域/
];

const aiPatterns = [
  /AI|人工知能|生成AI|ChatGPT|OpenAI|LLM|大規模言語モデル|機械学習|ディープラーニング/,
  /ロボット|自動運転|画像生成|音声認識|翻訳|Copilot|Gemini|Claude|Meta AI/
];

const deepGenAiPatterns = [
  /生成AI|ChatGPT|OpenAI|LLM|大規模言語モデル|基盤モデル|推論|AIエージェント|RAG|ファインチューニング/,
  /画像生成|動画生成|音声生成|マルチモーダル|プロンプト|AIチップ|GPU|データセンター|Gemini|Claude|Copilot/
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  textNodeName: "text",
  trimValues: true
});

function formatDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function formatJapaneseDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function textValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object") return value.text || value.href || value["#text"] || "";
  return "";
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function stripTags(value) {
  return decodeHtmlEntities(normalizeWhitespace(value.replace(/<[^>]+>/g, " ")));
}

function decodeHtmlEntities(value) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " "
  };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const lower = entity.toLowerCase();
    if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    return named[lower] || match;
  });
}

function getRssItems(parsed, source) {
  const rssItems = toArray(parsed?.rss?.channel?.item);
  const rdfItems = toArray(parsed?.["rdf:RDF"]?.item);
  const atomItems = toArray(parsed?.feed?.entry);
  return [...rssItems, ...rdfItems, ...atomItems].map((item) => {
    const rawLink = item.link;
    const link = typeof rawLink === "object" && rawLink.href ? rawLink.href : textValue(rawLink);
    return {
      source,
      title: stripTags(textValue(item.title)),
      summary: stripTags(textValue(item.description || item.summary || item.content || item["content:encoded"])),
      url: link,
      publishedAt: textValue(item.pubDate || item["dc:date"] || item.published || item.updated)
    };
  });
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: {
      "User-Agent": "daily-friendly-news/1.0 (+https://github.com/)",
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`${feed.name}: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  return getRssItems(parsed, feed.name);
}

async function getSampleItems() {
  const samplePath = join(root, "scripts", "sample-news-items.json");
  if (existsSync(samplePath)) {
    return JSON.parse(await readFile(samplePath, "utf8"));
  }

  return [
    {
      source: "サンプル通信",
      title: "初夏の地域イベントで新しい体験型展示が公開",
      summary: "親子で楽しめる展示や地元店舗の企画が始まりました。",
      url: "https://example.com/local-event",
      publishedAt: new Date().toISOString()
    },
    {
      source: "サンプル科学",
      title: "小型ロボットを使った新しい学習プログラムが開始",
      summary: "学校や地域施設で使える教材として注目されています。",
      url: "https://example.com/robot-learning",
      publishedAt: new Date().toISOString()
    }
  ];
}

async function collectItems() {
  if (sampleMode) return getSampleItems();

  const results = await Promise.allSettled(feeds.map(fetchFeed));
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason.message);
  const items = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));

  if (errors.length) {
    console.warn(`RSS取得に失敗したフィード: ${errors.join(" / ")}`);
  }

  return items;
}

function scoreItem(item) {
  const haystack = `${item.title} ${item.summary}`;
  if (!item.title || !item.url) return -100;
  if (negativePatterns.some((pattern) => pattern.test(haystack))) return -100;

  let score = 0;
  if (isDeepGenAiRelatedText(haystack)) score += 10;
  if (isAiRelatedText(haystack)) score += 6;
  if (positiveHints.some((pattern) => pattern.test(haystack))) score += 4;
  if (/日本|国内|東京|大阪|京都|北海道|沖縄|地域|自治体|企業|大学/.test(haystack)) score += 3;
  if (/AI|科学|宇宙|文化|観光|食|季節|便利|アプリ|ガジェット|展示/.test(haystack)) score += 2;
  if (item.summary.length > 40) score += 1;
  return score;
}

function isAiRelatedText(value) {
  return aiPatterns.some((pattern) => pattern.test(value));
}

function isDeepGenAiRelatedText(value) {
  return deepGenAiPatterns.some((pattern) => pattern.test(value));
}

function dedupeAndFilter(items) {
  const seen = new Set();
  return items
    .map((item) => ({
      ...item,
      title: normalizeWhitespace(item.title || ""),
      summary: normalizeWhitespace(item.summary || "")
    }))
    .filter((item) => {
      const key = `${item.title.toLowerCase()}|${item.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({
      ...item,
      aiRelated: isAiRelatedText(`${item.title} ${item.summary}`) || isDeepGenAiRelatedText(`${item.title} ${item.summary}`),
      deepGenAiRelated: isDeepGenAiRelatedText(`${item.title} ${item.summary}`),
      score: scoreItem(item)
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCandidates);
}

function candidateToSummaryItem(item) {
  return {
    title: item.title,
    source: item.source,
    url: item.url,
    summary: item.summary || "詳細はリンク先で確認できます。",
    conversationStarter: item.deepGenAiRelated
      ? "生成AIの仕組みや仕事への影響まで、少し深く話せそうです。"
      : item.aiRelated
      ? "AIが身近な道具としてどう広がるか、話題にしやすそうです。"
      : "この話題、日常でどう使われそうか話しやすそうです。",
    tone: item.deepGenAiRelated ? "生成AI深掘り" : item.aiRelated ? "AI" : "穏やか",
    aiRelated: item.aiRelated || item.deepGenAiRelated,
    deepGenAiRelated: item.deepGenAiRelated
  };
}

function pickFallbackItems(candidates) {
  const deepGenAiItems = candidates.filter((item) => item.deepGenAiRelated).slice(0, deepGenAiItemCount);
  const used = new Set(deepGenAiItems.map((item) => item.url));
  const aiItems = candidates
    .filter((item) => item.aiRelated && !used.has(item.url))
    .slice(0, Math.max(0, aiItemCount - deepGenAiItems.length));
  for (const item of aiItems) used.add(item.url);
  const nonAiItems = candidates
    .filter((item) => !item.aiRelated && !used.has(item.url))
    .slice(0, Math.max(0, itemCount - deepGenAiItems.length - aiItems.length));
  for (const item of nonAiItems) used.add(item.url);
  const backfillItems = candidates
    .filter((item) => !used.has(item.url))
    .slice(0, Math.max(0, itemCount - deepGenAiItems.length - aiItems.length - nonAiItems.length));
  return [...deepGenAiItems, ...aiItems, ...nonAiItems, ...backfillItems].slice(0, itemCount).map(candidateToSummaryItem);
}

function fallbackSummaries(candidates, dateString) {
  return {
    date: dateString,
    title: `${formatJapaneseDate(dateString)}の雑談向けニュース`,
    intro: `公開RSSから、朝に軽く話しやすい話題を${itemCount}本集めました。うち${aiItemCount}本はAI関連、さらに${deepGenAiItemCount}本はディープな生成AI話題を優先しています。`,
    items: pickFallbackItems(candidates)
  };
}

function extractOutputText(responseJson) {
  if (responseJson.output_text) return responseJson.output_text;
  const chunks = [];
  for (const output of responseJson.output || []) {
    for (const content of output.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
    }
  }
  return chunks.join("\n");
}

function parseJsonLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("OpenAI response did not contain JSON.");
    return JSON.parse(match[0]);
  }
}

async function summarizeWithOpenAI(candidates, dateString) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY が未設定のため、簡易要約で生成します。");
    return fallbackSummaries(candidates, dateString);
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "あなたは日本語のニュース編集者です。朝の雑談に使いやすく、読み手の気分を重くしない話題を選びます。事件、事故、災害、訃報、炎上、病気、強い政治対立、強い不況感のある話題は避けます。誇張せず、出典候補の範囲だけで要約します。指定された本数を守り、そのうち指定された本数をAI関連ニュースにします。AI関連は生成AI、人工知能、LLM、ロボット、自動化、AI搭載サービス、AIガジェット、AI研究、AI活用事例を含みます。さらに指定された本数はディープな生成AI話題にします。ディープな生成AI話題は、生成AIモデル、LLM、AIエージェント、RAG、推論、マルチモーダル、AIチップ、GPU、データセンター、業務実装、研究開発など、少し踏み込んで話せるものです。"
        },
        {
          role: "user",
          content: JSON.stringify({
            date: dateString,
            itemCount,
            aiItemCount,
            deepGenAiItemCount,
            selectionRule: `${itemCount}本を選び、そのうち${aiItemCount}本はaiRelated=trueのAI関連ニュースにする。AI関連ニュース${aiItemCount}本のうち${deepGenAiItemCount}本はdeepGenAiRelated=trueのディープな生成AI話題にする。残り${itemCount - aiItemCount}本はaiRelated=falseの非AIニュースにする。候補が不足する場合のみ、候補内で可能な最大数に調整する。`,
            outputLanguage: "ja-JP",
            requiredShape: {
              date: "YYYY-MM-DD",
              title: "string",
              intro: "string",
              items: [
                {
                  title: "string",
                  source: "string",
                  url: "string",
                  summary: "2から3文",
                  conversationStarter: "雑談の切り口を1文",
                  tone: "生成AI深掘り/AI/穏やか/前向き/便利/季節/文化/科学 など",
                  aiRelated: "boolean",
                  deepGenAiRelated: "boolean"
                }
              ]
            },
            candidates: candidates.map(({ title, source, summary, url, publishedAt, aiRelated, deepGenAiRelated }) => ({
              title,
              source,
              summary,
              url,
              publishedAt,
              aiRelated,
              deepGenAiRelated
            }))
          })
        }
      ],
      text: { format: { type: "text" } },
      temperature: 0.4,
      max_output_tokens: 3500
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const json = await response.json();
  return parseJsonLoose(extractOutputText(json));
}

function normalizeSummary(summary, dateString, candidates) {
  const byUrl = new Map(candidates.map((item) => [item.url, item]));
  const items = toArray(summary.items)
    .filter((item) => item.title && item.url)
    .map((item) => {
      const candidate = byUrl.get(item.url);
      const aiRelated = Boolean(item.aiRelated ?? candidate?.aiRelated ?? isAiRelatedText(`${item.title} ${item.summary || ""}`));
      const deepGenAiRelated = Boolean(
        item.deepGenAiRelated ?? candidate?.deepGenAiRelated ?? isDeepGenAiRelatedText(`${item.title} ${item.summary || ""}`)
      );
      return {
        title: normalizeWhitespace(item.title),
        source: normalizeWhitespace(item.source || candidate?.source || "出典"),
        url: item.url,
        summary: normalizeWhitespace(item.summary || candidate?.summary || ""),
        conversationStarter: normalizeWhitespace(item.conversationStarter || "会話のきっかけにしやすい話題です。"),
        tone: normalizeWhitespace(item.tone || (deepGenAiRelated ? "生成AI深掘り" : aiRelated ? "AI" : "穏やか")),
        aiRelated,
        deepGenAiRelated
      };
    });

  if (!items.length) return fallbackSummaries(candidates, dateString);
  const filledItems = enforceItemMix(items, candidates);

  return {
    date: summary.date || dateString,
    title: summary.title || `${formatJapaneseDate(dateString)}の雑談向けニュース`,
    intro:
      summary.intro ||
      `朝に読みやすい、穏やかな話題を${itemCount}本まとめました。うち${aiItemCount}本はAI関連で、${deepGenAiItemCount}本はディープな生成AI話題です。`,
    items: filledItems
  };
}

function enforceItemMix(items, candidates) {
  const targetAiCount = Math.min(aiItemCount, candidates.filter((item) => item.aiRelated).length);
  const targetDeepGenAiCount = Math.min(deepGenAiItemCount, candidates.filter((item) => item.deepGenAiRelated).length);
  const usedUrls = new Set(items.map((item) => item.url));
  const fillFromCandidates = (predicate) =>
    candidates
      .filter((candidate) => predicate(candidate) && !usedUrls.has(candidate.url))
      .map((candidate) => {
        usedUrls.add(candidate.url);
        return candidateToSummaryItem(candidate);
      });

  const selected = items.slice(0, itemCount);
  const missingDeepGenAiCount = Math.max(
    0,
    targetDeepGenAiCount - selected.filter((item) => item.deepGenAiRelated).length
  );
  if (missingDeepGenAiCount > 0) {
    const deepFill = fillFromCandidates((candidate) => candidate.deepGenAiRelated).slice(0, missingDeepGenAiCount);
    for (const fillItem of deepFill) {
      const replaceIndex = selected.findLastIndex((item) => !item.deepGenAiRelated);
      if (replaceIndex >= 0) selected[replaceIndex] = fillItem;
      else selected.push(fillItem);
    }
  }

  const missingAiCount = Math.max(0, targetAiCount - selected.filter((item) => item.aiRelated).length);
  if (missingAiCount > 0) {
    const aiFill = fillFromCandidates((candidate) => candidate.aiRelated).slice(0, missingAiCount);
    for (const fillItem of aiFill) {
      const replaceIndex = selected.findLastIndex((item) => !item.aiRelated);
      if (replaceIndex >= 0) selected[replaceIndex] = fillItem;
      else selected.push(fillItem);
    }
  }

  let extraDeepGenAiCount = Math.max(
    0,
    selected.filter((item) => item.deepGenAiRelated).length - targetDeepGenAiCount
  );
  if (extraDeepGenAiCount > 0) {
    const aiFill = fillFromCandidates((candidate) => candidate.aiRelated && !candidate.deepGenAiRelated).slice(
      0,
      extraDeepGenAiCount
    );
    for (const fillItem of aiFill) {
      const replaceIndex = selected.findLastIndex((item) => item.deepGenAiRelated);
      if (replaceIndex >= 0) {
        selected[replaceIndex] = fillItem;
        extraDeepGenAiCount -= 1;
      }
      if (extraDeepGenAiCount <= 0) break;
    }
  }

  let extraAiCount = Math.max(0, selected.filter((item) => item.aiRelated).length - targetAiCount);
  if (extraAiCount > 0) {
    const nonAiFill = fillFromCandidates((candidate) => !candidate.aiRelated).slice(0, extraAiCount);
    for (const fillItem of nonAiFill) {
      const replaceIndex = selected.findLastIndex((item) => item.aiRelated && !item.deepGenAiRelated);
      if (replaceIndex >= 0) {
        selected[replaceIndex] = fillItem;
        extraAiCount -= 1;
      }
      if (extraAiCount <= 0) break;
    }
  }

  if (selected.length < itemCount) {
    selected.push(...fillFromCandidates(() => true).slice(0, itemCount - selected.length));
  }

  return selected.slice(0, itemCount).map((item) => ({
    ...item,
    tone: item.deepGenAiRelated ? "生成AI深掘り" : item.aiRelated ? normalizeNonDeepAiTone(item.tone) : item.tone || "穏やか"
  }));
}

function normalizeNonDeepAiTone(tone) {
  if (!tone || tone.includes("生成AI深掘り")) return "AI";
  return tone;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMarkdown(summary) {
  const lines = [
    `# ${summary.title}`,
    "",
    summary.intro,
    "",
    `生成日: ${formatJapaneseDate(summary.date)}`,
    "",
    ...summary.items.flatMap((item, index) => [
      `## ${index + 1}. ${item.title}`,
      "",
      `- 出典: [${item.source}](${item.url})`,
      `- 雰囲気: ${item.tone}`,
      "",
      item.summary,
      "",
      `雑談の切り口: ${item.conversationStarter}`,
      ""
    ])
  ];
  return `${lines.join("\n").trim()}\n`;
}

function renderHtml(summary) {
  const cards = summary.items
    .map(
      (item, index) => `<article class="news-card">
        <div class="meta"><span>${index + 1}</span><span>${escapeHtml(item.tone)}</span><span>${escapeHtml(item.source)}</span></div>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.summary)}</p>
        <p class="starter">${escapeHtml(item.conversationStarter)}</p>
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">出典を読む</a>
      </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(summary.title)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f4ef;
      --paper: #fffdf8;
      --ink: #26312f;
      --muted: #68736f;
      --line: #ded6ca;
      --accent: #2f6f73;
      --warm: #b99a5b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.75;
    }
    header, main, footer {
      width: min(100% - 32px, 920px);
      margin: 0 auto;
    }
    header {
      padding: 44px 0 22px;
    }
    .eyebrow {
      margin: 0 0 10px;
      color: var(--accent);
      font-size: 0.86rem;
      font-weight: 700;
      letter-spacing: 0;
    }
    h1 {
      margin: 0 0 14px;
      font-family: "Noto Serif JP", "Yu Mincho", serif;
      font-size: clamp(2rem, 7vw, 3.4rem);
      line-height: 1.18;
      letter-spacing: 0;
    }
    .intro {
      margin: 0;
      color: var(--muted);
      font-size: 1rem;
    }
    .news-list {
      display: grid;
      gap: 14px;
      padding: 8px 0 36px;
    }
    .news-card {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 10px 28px rgba(58, 47, 42, 0.06);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
      color: var(--muted);
      font-size: 0.82rem;
    }
    .meta span {
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 2px 9px;
      background: #fbf8f2;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 1.18rem;
      line-height: 1.45;
      letter-spacing: 0;
    }
    p {
      margin: 0 0 12px;
    }
    .starter {
      color: #4f625d;
      border-left: 3px solid var(--warm);
      padding-left: 12px;
    }
    a {
      color: var(--accent);
      font-weight: 700;
      text-decoration-thickness: 1px;
      text-underline-offset: 4px;
    }
    footer {
      padding: 0 0 36px;
      color: var(--muted);
      font-size: 0.88rem;
    }
  </style>
</head>
<body>
  <header>
    <p class="eyebrow">${escapeHtml(formatJapaneseDate(summary.date))}</p>
    <h1>${escapeHtml(summary.title)}</h1>
    <p class="intro">${escapeHtml(summary.intro)}</p>
  </header>
  <main class="news-list">
    ${cards}
  </main>
  <footer>
    <p>公開RSSをもとに、朝の雑談向けに自動生成しています。詳細は各出典で確認してください。</p>
  </footer>
</body>
</html>
`;
}

function renderIndex(summary) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=./${summary.date}/">
  <title>雑談向けニュース 最新号</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 32px; line-height: 1.8; }
    a { color: #2f6f73; font-weight: 700; }
  </style>
</head>
<body>
  <p><a href="./${summary.date}/">最新の雑談向けニュースを開く</a></p>
</body>
</html>
`;
}

async function writeOutput(summary) {
  const markdownPath = join(root, "docs", "daily-news", `${summary.date}.md`);
  const htmlPath = join(root, "public", "daily-news", summary.date, "index.html");
  const indexPath = join(root, "public", "daily-news", "index.html");

  if (dryRun) {
    console.log(renderMarkdown(summary));
    return;
  }

  await mkdir(dirname(markdownPath), { recursive: true });
  await mkdir(dirname(htmlPath), { recursive: true });
  await mkdir(dirname(indexPath), { recursive: true });
  await writeFile(markdownPath, renderMarkdown(summary), "utf8");
  await writeFile(htmlPath, renderHtml(summary), "utf8");
  await writeFile(indexPath, renderIndex(summary), "utf8");
  console.log(`Generated ${markdownPath}`);
  console.log(`Generated ${htmlPath}`);
}

async function main() {
  const dateString = formatDate();
  const rawItems = await collectItems();
  const candidates = dedupeAndFilter(rawItems);

  if (!candidates.length) {
    throw new Error("ニュース候補が見つかりませんでした。RSSフィードまたは除外条件を確認してください。");
  }

  const generated = await summarizeWithOpenAI(candidates, dateString);
  const summary = normalizeSummary(generated, dateString, candidates);
  await writeOutput(summary);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
