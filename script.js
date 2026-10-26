/* Keep both language versions together when updating the page. */
const copy = {
  zh: {
    skip: '跳转到内容', navigation: '主导航', navWork: '项目', navAbout: '关于', navConnect: '联系',
    heroHello: '你好，我是', heroPunctuation: '。',
    heroTitle: '以代码为舟，\n赴星辰大海。',
    heroDescription: '这里收集我做的产品、开源项目和工程实验。', exploreWork: '看看我的项目',
    companionsAlt: 'Claude 娘与 DeepSeek 娘牵手向星空奔跑的同人立绘',
    pauseSky: '暂停星空', resumeSky: '播放星空',
    workTitle: '精选项目', allRepos: '所有仓库',
    componentsTitle: "开源组件",
    componentsIntro: "源自 ProProp 生产实践，可独立使用：对话运行时、空间数据服务与户型图提取。",
    dialogramDescription: "Go Agent runtime，统一模型接口，支持生成式 UI、人工介入和可恢复流式响应。",
    sgpropertyengineDescription: "定时同步新加坡官方房产数据到 PostgreSQL / PostGIS，通过空间查询 API 和 MCP 工具提供服务。",
    fpextractDescription: "用视觉模型从户型图提取结构化数据，支持批量任务恢复、OpenCV 裁切修正及带来源与置信度的项目汇总。",
    propropDescription: "面向新加坡住宅市场的 AI 原生房产咨询平台，连接买家、卖家与持牌经纪人。独立完成多服务后端、数据平台及 Web、iOS、Telegram 客户端的架构与上线。",
    propropDetails: "自研 LLM Agent runtime，集成 53 个生产工具；定时导入官方房产数据，并用 Qwen-VL 从约 3 万份户型图提取结构化房源数据。",
    propropCategory: "独立产品 · AI / PROPTECH", visitProduct: '访问 ProProp ↗',
    vectoryDescription: '基于 FAISS 的分布式向量搜索引擎，支持分片、副本和索引热加载，通过 etcd 协调集群。',
    otelginDescription: '为 Gin 服务集成 OpenTelemetry 链路追踪与 HTTP 指标的中间件。',
    fpvecDescription: '面向户型图矢量化的研究代码、基准数据与评估工具，包含标注修正和编辑成本指标。',
    viewSource: '查看源码 ↗', geometry: '几何表达', benchmarks: '基准评估',
    aboutTitle: '关于我',
    aboutLead: '目前在新加坡，曾就职于 Shopee 和 ByteDance（AML）。',
    aboutText: '我关注分布式系统、可观测性、推荐系统、LLM Infra、AI Agent 和计算机视觉。上面的项目是其中一部分实践，其他代码与实验可以在 GitHub 和 Hugging Face 找到。',
    alsoOn: '其他平台', alsoOnAria: '其他账号',
    connectTitle: '找到我',
    connectDescription: '项目相关的问题，欢迎在对应仓库提 issue。你也可以在这些平台找到我。', findOnGithub: '在 GitHub 找到我',
    footerNote: 'Stay simple. Stay naive.', backTop: '回到顶部 ↑',
    title: 'Mr.Cyprinus — 个人主页',
    description: 'Mr.Cyprinus 的个人主页。开源项目、工程实验、技术方向与工作经历。'
  },
  en: {
    skip: 'Skip to content', navigation: 'Main navigation', navWork: 'Projects', navAbout: 'About', navConnect: 'Contact',
    heroHello: 'Hello, I’m', heroPunctuation: '.',
    heroTitle: 'With code as my craft,\ntoward the stars.',
    heroDescription: 'These are my products, open-source projects, and engineering experiments.', exploreWork: 'View my projects',
    companionsAlt: 'Fan-art companions Claude and DeepSeek holding hands and running toward the stars',
    pauseSky: 'Pause sky', resumeSky: 'Play sky',
    workTitle: 'Selected projects', allRepos: 'All repositories',
    componentsTitle: "Open-source components",
    componentsIntro: "Standalone components from ProProp’s production systems: conversations, spatial data, and floor-plan extraction.",
    dialogramDescription: "A provider-neutral Go agent runtime with generative UI, human-in-the-loop pauses, and resumable streams.",
    sgpropertyengineDescription: "Scheduled ingestion of Singapore property data into PostgreSQL / PostGIS, served through spatial query APIs and MCP tools.",
    fpextractDescription: "Structured floor-plan extraction with vision models, resumable batches, OpenCV-refined crops, and project rollups with provenance and confidence.",
    propropDescription: "An AI-native property advisory platform connecting buyers, sellers, and licensed agents in Singapore. Architected and launched solo across web, iOS, and Telegram.",
    propropDetails: "A custom LLM agent runtime with 53 production tools, scheduled official-data ingestion, and a Qwen-VL pipeline extracting structured unit data from ~30,000 floor plans.",
    propropCategory: "SOLO PRODUCT · AI / PROPTECH", visitProduct: 'Visit ProProp ↗',
    vectoryDescription: 'A distributed vector search engine built on FAISS, with sharding, replication, hot index reloads, and etcd-based coordination.',
    otelginDescription: 'OpenTelemetry tracing and HTTP metrics middleware for Gin services.',
    fpvecDescription: 'Research code, benchmarks, and evaluation tools for floorplan vectorization, including annotation corrections and an edit-cost metric.',
    viewSource: 'Explore the source ↗', geometry: 'Geometry', benchmarks: 'Benchmarks',
    aboutTitle: 'About me',
    aboutLead: 'Based in Singapore. Previously at Shopee and ByteDance (AML).',
    aboutText: 'My interests include distributed systems, observability, recommender systems, LLM infrastructure, AI agents, and computer vision. The projects above cover some of that work; more code and experiments are on GitHub and Hugging Face.',
    alsoOn: 'Also on', alsoOnAria: 'Other profiles',
    connectTitle: 'Find me online',
    connectDescription: 'For project questions, open an issue in the relevant repository. You can also find me on these platforms.', findOnGithub: 'Find me on GitHub',
    footerNote: 'Stay simple. Stay naive.', backTop: 'Back to top ↑',
    title: 'Mr.Cyprinus — Personal website',
    description: 'Open-source projects, engineering experiments, and the work of Mr.Cyprinus.'
  }
};

const languageButton = document.querySelector('#language-toggle');
let language = 'zh';
function setLanguage(next) {
  language = next === 'en' ? 'en' : 'zh';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[language][element.dataset.i18n];
    if (value === undefined) return;
    const lines = value.split('\n');
    element.replaceChildren();
    lines.forEach((line, index) => {
      if (index) element.append(document.createElement('br'));
      if (element.id === 'hero-title' && index === lines.length - 1) {
        const emphasis = document.createElement('em');
        emphasis.textContent = line;
        element.append(emphasis);
      } else {
        element.append(document.createTextNode(line));
      }
    });
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', copy[language][element.dataset.i18nAria]);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    element.alt = copy[language][element.dataset.i18nAlt];
  });
  document.querySelector('#language-label').textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
  document.querySelector('meta[name="description"]').content = copy[language].description;
  document.querySelector('meta[property="og:description"]').content = copy[language].description;
  document.querySelector('meta[property="og:title"]').content = copy[language].title;
  document.title = copy[language].title;
  updateMotionLabel();
}
function updateMotionLabel() {
  const button = document.querySelector('#motion-toggle');
  if (!button) return;
  const paused = button.getAttribute('aria-pressed') === 'true';
  document.querySelector('#motion-label').textContent = copy[language][paused ? 'resumeSky' : 'pauseSky'];
  document.querySelector('#motion-icon').textContent = paused ? '▷' : 'Ⅱ';
}
window.addEventListener('sky-motion-change', updateMotionLabel);
function normalizeLanguage(value) {
  if (/^zh(?:-|$)/i.test(value || '')) return 'zh';
  if (/^en(?:-|$)/i.test(value || '')) return 'en';
  return null;
}
function resolveLanguage() {
  const requested = normalizeLanguage(new URL(location.href).searchParams.get('lang'));
  if (requested) return requested;
  try {
    const saved = normalizeLanguage(localStorage.getItem('cyprinus-language'));
    if (saved) return saved;
  } catch { /* Browser language still works without storage. */ }
  // Chinese browsers receive Chinese; all other first-time visitors get English.
  return /^zh(?:-|$)/i.test(navigator.languages?.[0] || navigator.language || '') ? 'zh' : 'en';
}
setLanguage(resolveLanguage());
languageButton.addEventListener('click', () => {
  const next = language === 'zh' ? 'en' : 'zh';
  const url = new URL(location.href);
  url.searchParams.set('lang', next);
  history.pushState(null, '', url);
  try { localStorage.setItem('cyprinus-language', next); } catch { /* Storage is optional. */ }
  setLanguage(next);
});
window.addEventListener('popstate', () => setLanguage(resolveLanguage()));
document.querySelector('#year').textContent = new Date().getFullYear();
