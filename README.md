# Mr.Cyprinus · Personal website

个人主页：[cyprinus.algonavis.com](https://cyprinus.algonavis.com/)

A lightweight bilingual personal website built with plain HTML, CSS, and JavaScript. No framework, build step, or external fonts. Cloudflare Web Analytics runs only on the production hostname.

## 本地预览 / Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 / Open <http://127.0.0.1:4173>.

## 修改内容 / Editing

- `index.html`：页面结构、默认中文内容、项目链接和示意图。
- `script.js`：完整中英文文案；修改文字时同步更新两种语言。
- `styles.css`：配色、排版与响应式布局。
- `assets/`：网站图标与分享图。
- `profile/README.md` 和 `profile/banner.svg`：GitHub 个人资料页的内容副本及独立窄幅横幅。

Language priority: `?lang=en` / `?lang=zh`, then an explicitly saved choice, then the browser language (Chinese for Chinese browsers, English otherwise). Switching languages updates the URL without reloading and preserves other parameters and the section anchor. The page remains readable if JavaScript or browser storage is unavailable.

## 流量统计 / Web analytics

`analytics.js` loads the Cloudflare Web Analytics beacon only on `cyprinus.algonavis.com`; localhost, preview hosts, and the default GitHub Pages hostname are excluded. The beacon token is a public site identifier, not an API credential. Keep Cloudflare automatic snippet injection disabled for this hostname while using this manual installation to avoid duplicate collection.

View the dashboard in Cloudflare → Observability → Analytics → Web analytics → `cyprinus.algonavis.com`. Metrics include page views, visits, country, referrer, device, and web performance. Visits are not unique people. Collection begins after installation; historical traffic cannot be reconstructed by the beacon.

## GitHub Pages

仓库：`Cyprinus12138/Cyprinus12138.github.io`。发布源为 `main` 分支的根目录，`.nojekyll` 禁用 Jekyll 处理。

Push changes to `main`; GitHub Pages publishes the static files directly. No secrets or deployment tokens are stored in this repository.

## GitHub 个人资料 / GitHub Profile

GitHub Profile uses a separate public repository, `Cyprinus12138/Cyprinus12138`. Copy `profile/README.md` and `profile/banner.svg` to that repository’s root. Updating this directory does not automatically update the separate profile repository.

## 内容来源 / Content sources

Personal details and project descriptions are based on the public GitHub profile and repositories, reviewed on 2026-10-22:

- [GitHub profile](https://github.com/Cyprinus12138)
- [Vectory](https://github.com/Cyprinus12138/vectory)
- [otelgin](https://github.com/Cyprinus12138/otelgin)
- [fpvec-lab](https://github.com/Cyprinus12138/fpvec-lab)

No unpublished biography, private repository details, or unverified experience claims are included.
