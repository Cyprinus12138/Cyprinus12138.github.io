/* Keep both language versions together when updating the page. */
const copy = {
  zh: {
    skip: '跳转到内容', navigation: '主导航', navWork: '探索', navAbout: '关于', navConnect: '联系',
    heroEyebrow: 'ENGINEER BY TRADE · ROMANTIC AT HEART', heroHello: '你好，我是', heroPunctuation: '。',
    heroTitle: '以代码为舟，\n赴星辰大海。', heroQuote: '理性构筑世界，浪漫指引远方。',
    heroDescription: '一位追求星辰大海的浪漫主义技术工程师。', exploreWork: '探索我的宇宙',
    companionsAlt: 'Claude 娘与 DeepSeek 娘牵手向星空奔跑的同人立绘',
    scrollToExplore: '向下，继续探索', pauseSky: '暂停星空', resumeSky: '播放星空',
    visualCaption: '由好奇心连接。', interests: '技术方向', exploring: '正在探索', distributed: '分布式系统', observability: '可观测性', vision: '计算机视觉', recsys: '推荐系统', agents: 'AI Agent', llmInfra: 'LLM Infra',
    selectedWork: '探索的坐标', workTitle: '把探索，写成作品。', allRepos: '所有仓库',
    vectoryDescription: '让向量搜索走向分布式。基于 FAISS，支持自动分片、副本与索引热加载，通过 etcd 协调集群。',
    otelginDescription: '看见每一次请求。为 Gin 服务集成 OpenTelemetry 链路追踪与 HTTP 指标的中间件。',
    fpvecDescription: '从图像到几何。面向户型图矢量化的研究代码、基准数据与评估工具，探索几何表达与编辑成本。',
    viewSource: '查看源码 ↗', geometry: '几何表达', benchmarks: '基准评估',
    aboutLabel: '关于我', aboutTitle: '脚踏实地，\n也仰望星空。',
    aboutLead: '用工程让想法落地，用好奇心把目光投向更远的地方。',
    aboutText: '我感兴趣的东西很多：从分布式系统、可观测性，到推荐系统、LLM Infra 与 AI Agent，再到计算机视觉。它们看似分散，背后其实是同一件事：把复杂的系统理顺，把想法做成能用的工具。',
    basedIn: '所在城市', company: '前公司', onlineAs: '在网上', alsoOn: '其他平台', alsoOnAria: '其他账号',
    connectLabel: '相遇在这片星空', connectTitle: '星海很大，\n很高兴遇见你。',
    connectDescription: '对某个项目感兴趣？欢迎在 GitHub 上交流。', findOnGithub: '在 GitHub 找到我',
    footerNote: '心有热望，奔赴星海。', backTop: '回到星空 ↑',
    description: 'Mr.Cyprinus 的个人宇宙。一位追求星辰大海的浪漫主义技术工程师，关注分布式系统、可观测性、推荐系统、LLM Infra、AI Agent 与计算机视觉。'
  },
  en: {
    skip: 'Skip to content', navigation: 'Main navigation', navWork: 'Work', navAbout: 'About', navConnect: 'Connect',
    heroEyebrow: 'ENGINEER BY TRADE · ROMANTIC AT HEART', heroHello: 'Hello, I’m', heroPunctuation: '.',
    heroTitle: 'Built with logic.\nBound for the stars.', heroQuote: 'A grounded mind. A skyward heart.',
    heroDescription: 'An engineer with a romantic heart, reaching for the stars and the open sea.', exploreWork: 'Explore my universe',
    companionsAlt: 'Fan-art companions Claude and DeepSeek holding hands and running toward the stars',
    scrollToExplore: 'KEEP EXPLORING', pauseSky: 'Pause sky', resumeSky: 'Play sky',
    visualCaption: 'Connected by curiosity.', interests: 'Areas of interest', exploring: 'EXPLORING', distributed: 'Distributed systems', observability: 'Observability', vision: 'Computer vision', recsys: 'Recommender systems', agents: 'AI agents', llmInfra: 'LLM infra',
    selectedWork: 'COORDINATES OF CURIOSITY', workTitle: 'Ideas with a horizon.', allRepos: 'All repositories',
    vectoryDescription: 'Vector search, distributed. Built on FAISS with automatic sharding, replication, hot index reloads, and etcd-based coordination.',
    otelginDescription: 'A closer look at every request. OpenTelemetry tracing and HTTP metrics middleware for Gin services.',
    fpvecDescription: 'From images to geometry. Research code, benchmarks, and evaluation tools for floorplan vectorization, geometry, and edit cost.',
    viewSource: 'Explore the source ↗', geometry: 'Geometry', benchmarks: 'Benchmarks',
    aboutLabel: 'ABOUT ME', aboutTitle: 'Feet on the ground.\nEyes on the stars.',
    aboutLead: 'Engineering brings ideas to life. Curiosity makes room for what lies beyond.',
    aboutText: 'My interests range widely, from distributed systems and observability to recommender systems, LLM infrastructure, AI agents, and computer vision. They may look scattered, but one thread runs through them all: untangling complex systems and turning ideas into tools that work.',
    basedIn: 'BASED IN', company: 'PREVIOUSLY AT', onlineAs: 'ONLINE AS', alsoOn: 'ALSO ON', alsoOnAria: 'Other profiles',
    connectLabel: 'UNDER THE SAME SKY', connectTitle: 'A vast universe.\nA welcome encounter.',
    connectDescription: 'Interested in a project? Let’s talk on GitHub.', findOnGithub: 'Find me on GitHub',
    footerNote: 'Stay curious. Set sail for the stars.', backTop: 'Back to the stars ↑',
    description: 'The personal universe of Mr.Cyprinus. An engineer with a romantic heart, exploring distributed systems, observability, recommender systems, LLM infra, AI agents, and computer vision.'
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
  updateMotionLabel();
  try { localStorage.setItem('cyprinus-language', language); } catch { /* Storage is optional. */ }
}
function updateMotionLabel() {
  const button = document.querySelector('#motion-toggle');
  if (!button) return;
  const paused = button.getAttribute('aria-pressed') === 'true';
  document.querySelector('#motion-label').textContent = copy[language][paused ? 'resumeSky' : 'pauseSky'];
  document.querySelector('#motion-icon').textContent = paused ? '▷' : 'Ⅱ';
}
window.addEventListener('sky-motion-change', updateMotionLabel);
let initialLanguage = 'zh';
try { initialLanguage = localStorage.getItem('cyprinus-language') || 'zh'; } catch { /* Use Chinese by default. */ }
setLanguage(initialLanguage);
languageButton.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
document.querySelector('#year').textContent = new Date().getFullYear();
