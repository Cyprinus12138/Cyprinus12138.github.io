/* Keep both language versions together when updating the page. */
const copy = {
  zh: {
    skip: '跳转到内容', navigation: '主导航', navWork: '项目', navAbout: '关于', navConnect: '联系',
    heroEyebrow: '软件、系统，以及好奇心', heroHello: '你好，我是', heroPunctuation: '。',
    heroDescription: '在新加坡，以代码探索系统、工具与新的想法。', exploreWork: '看看我的项目',
    visualCaption: '由好奇心连接。', interests: '技术方向', exploring: '正在探索', distributed: '分布式系统', observability: '可观测性', vision: '计算机视觉',
    selectedWork: '精选项目', workTitle: '把想法，写成项目。', allRepos: '所有仓库',
    vectoryDescription: '让向量搜索走向分布式。基于 FAISS，支持自动分片、副本与索引热加载，通过 etcd 协调集群。',
    otelginDescription: '看见每一次请求。为 Gin 服务集成 OpenTelemetry 链路追踪与 HTTP 指标的中间件。',
    fpvecDescription: '从图像到几何。面向户型图矢量化的研究代码、基准数据与评估工具，探索几何表达与编辑成本。',
    viewSource: '查看源码 ↗', geometry: '几何表达', benchmarks: '基准评估',
    aboutLabel: '关于我', aboutTitle: '认真构建，\n也保持好奇。',
    aboutLead: '这里是我在互联网上的一小块空间，收集做过的项目，也留给新的想法。',
    aboutText: '从分布式向量搜索、服务可观测性，到户型图的几何表达，我的公开项目围绕系统与工具展开。这个主页把它们串在一起，方便你了解我正在探索的方向。',
    basedIn: '所在城市', company: '公司', onlineAs: '在网上',
    connectLabel: '保持联系', connectTitle: '下一段对话，\n从一个想法开始。',
    connectDescription: '对某个项目感兴趣？欢迎在 GitHub 上交流。', findOnGithub: '在 GitHub 找到我',
    footerNote: '保持简单。保持好奇。持续探索。', backTop: '回到顶部 ↑',
    description: 'Mr.Cyprinus 的个人主页。探索分布式系统、可观测性与计算机视觉，分享开源项目与实验。'
  },
  en: {
    skip: 'Skip to content', navigation: 'Main navigation', navWork: 'Work', navAbout: 'About', navConnect: 'Connect',
    heroEyebrow: 'SOFTWARE, SYSTEMS & CURIOSITY', heroHello: 'Hello, I’m', heroPunctuation: '.',
    heroDescription: 'Based in Singapore. Exploring systems, tools, and new ideas through code.', exploreWork: 'Explore my work',
    visualCaption: 'Connected by curiosity.', interests: 'Areas of interest', exploring: 'EXPLORING', distributed: 'Distributed systems', observability: 'Observability', vision: 'Computer vision',
    selectedWork: 'SELECTED WORK', workTitle: 'Ideas, made tangible.', allRepos: 'All repositories',
    vectoryDescription: 'Vector search, distributed. Built on FAISS with automatic sharding, replication, hot index reloads, and etcd-based coordination.',
    otelginDescription: 'A closer look at every request. OpenTelemetry tracing and HTTP metrics middleware for Gin services.',
    fpvecDescription: 'From images to geometry. Research code, benchmarks, and evaluation tools for floorplan vectorization, geometry, and edit cost.',
    viewSource: 'Explore the source ↗', geometry: 'Geometry', benchmarks: 'Benchmarks',
    aboutLabel: 'A LITTLE ABOUT ME', aboutTitle: 'Build with care.\nStay curious.',
    aboutLead: 'A small corner of the internet for things I’ve built, and a little room for what comes next.',
    aboutText: 'From distributed vector search and service observability to floorplan geometry, my public projects explore systems and tools. This page brings them together, offering a glimpse into the ideas I’m exploring.',
    basedIn: 'BASED IN', company: 'COMPANY', onlineAs: 'ONLINE AS',
    connectLabel: 'LET’S CONNECT', connectTitle: 'Good conversations\nstart with an idea.',
    connectDescription: 'Interested in a project? Let’s talk on GitHub.', findOnGithub: 'Find me on GitHub',
    footerNote: 'Stay simple. Stay curious. Keep exploring.', backTop: 'Back to top ↑',
    description: 'The personal website of Mr.Cyprinus. Exploring distributed systems, observability, computer vision, and open-source tools.'
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
      element.append(document.createTextNode(line));
    });
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', copy[language][element.dataset.i18nAria]);
  });
  document.querySelector('#language-label').textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
  document.querySelector('meta[name="description"]').content = copy[language].description;
  try { localStorage.setItem('cyprinus-language', language); } catch { /* Storage is optional. */ }
}
let initialLanguage = 'zh';
try { initialLanguage = localStorage.getItem('cyprinus-language') || 'zh'; } catch { /* Use Chinese by default. */ }
setLanguage(initialLanguage);
languageButton.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
document.querySelector('#year').textContent = new Date().getFullYear();
