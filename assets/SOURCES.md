# Visual sources and character assets

Reviewed on 2026-10-22. This file records the assets used by this website separately from resources researched for a possible future version.

## Assets used in this version

### Reference and design direction

The user supplied an illustration of two characters beneath an orange, pink, violet, and deep-blue evening sky, and identified the characters as Claude 娘 and DeepSeek 娘. The website follows the requested palette and the theme **“追求星辰大海的浪漫主义技术工程师”** / **“A romantic engineer, reaching for the stars and the sea.”**

The reference illustration's artist and original publication have **not been verified**. Its signature is insufficient to establish attribution. Do not attribute that illustration to ZipZipPipe merely because that name is associated with the community character designs.

### `companions.png`

- AI-generated transparent character illustration created for this local website at the user's request, using the supplied image as a visual reference.
- An unofficial fan interpretation of the Claude 娘 and DeepSeek 娘 characters. It is **not** an official Anthropic or DeepSeek asset, an original-artist illustration, or an asset downloaded from any of the repositories below.
- The website applies lightweight motion to the complete illustration. It has no Live2D rig, Cubism model, independent character mesh, or original animation data.
- Generating a new image does not establish new permission for any underlying character design. No broader commercial-use or relicensing claim is made here.

### Procedural sky and profile banner

The website sky is drawn with browser graphics and CSS. `profile/banner.svg` is a self-contained, static vector illustration made for this project from SVG gradients, paths, stars, and text. It contains no external images, third-party character assets, scripts, or downloaded fonts.

The profile banner shares the website's dusk palette, but the GitHub profile does not execute its Canvas animation. GitHub's own [markup rendering documentation](https://github.com/github/markup#github-markup) explains that script tags, inline styles, and other HTML attributes are removed during rendering.

## Researched resources — not bundled or integrated

### DeepSeek 娘 Live2D

- Repository: [Andersen216/dsh-whale-girl-live2d](https://github.com/Andersen216/dsh-whale-girl-live2d).
- Model location: `assets/model/`; includes Cubism `.moc3`, textures, physics, expressions, and motions.
- License evidence: [PROVENANCE.md](https://github.com/Andersen216/dsh-whale-girl-live2d/blob/main/PROVENANCE.md), [NOTICE.md](https://github.com/Andersen216/dsh-whale-girl-live2d/blob/main/NOTICE.md), and [AUTHORS.md](https://github.com/Andersen216/dsh-whale-girl-live2d/blob/main/AUTHORS.md).
- The repository states that its code is MIT, while its model artwork is **CC BY-NC-SA 4.0**: attribution, noncommercial use, and share-alike. The code license does not cover the artwork. The bundled Live2D runtime has separate terms.
- Required creator chain according to the repository: [上善无形](https://space.bilibili.com/4456176), original whale-girl character “溟月”; [ZipZipPipe](https://space.bilibili.com/4168597), DeepSeek maid character adaptation; [氵六青](https://space.bilibili.com/11272072), Live2D modeling, motions, and expressions.
- The provenance file reproduces the model maker's usage notice and reports permission to redistribute the model. These are the repository's recorded statements; the original model-maker publication was not independently retrieved in this research.

This version does **not** download or embed that model or its runtime. Any later integration should preserve its notices and attribution and recheck current terms against the intended use.

### Claude 娘 original portrait

- Creator publication: [ZipZipPipe — AI娘化, Pixiv artwork 148186519](https://www.pixiv.net/artworks/148186519), image 3.
- Secondary catalog and download entry: [AI Moe Atlas — Claude · ZipZipPipe](https://selinlee.github.io/ai-moe-atlas/zh/characters/zipzippipe-claude/).
- Recorded source metadata: [source.json](https://selinlee.github.io/ai-moe-atlas/collected/zipzippipe-claude/source.json).
- The catalog describes a 3072 × 5504 JPG portrait with a white background, not a transparent PNG, SVG, or Live2D model. It records an author statement requiring attribution and prohibiting commercial use.
- **Verification limit:** the original Pixiv page could not be retrieved during this research. The catalog does not establish permission for broader creative alteration or Live2D rigging. Its notes explicitly distinguish Claude from the DeepSeek artwork's CC BY-NC-SA terms; do not apply the latter license to Claude by assumption.

This version does **not** embed that portrait. No matching Claude Live2D model or true vector asset with fully verified reuse terms was found in this research.

## Attribution scope

Claude, Anthropic, and DeepSeek names identify the community characters' inspirations. This personal website and its generated character illustration are unofficial and are not endorsed by those companies. The research links above are sources and future options, not a claim that their creators authored or licensed `companions.png`.

### `social-starlight.jpg`

Regenerated with the built-in image generation tool for the website social preview and GitHub profile banner. Prompt: preserve the two running companions and the painted golden sunset transitioning to blue starry night; retain one Chinese headline, Mr.Cyprinus, a factual project description, and the domain; remove repeated identity slogans. Exported at 1200 × 630. The same unofficial fan-art attribution scope as `companions.png` applies.
