<p align="center">
  <img src="./banner.svg" alt="Mr.Cyprinus — 以代码为舟，赴星辰大海。From sunset toward the stars." width="100%" />
</p>

<p align="center">
  Singapore<br />
  曾就职于 Shopee 与 ByteDance (AML) / Previously at Shopee &amp; ByteDance (AML)<br />
  <a href="https://cyprinus.algonavis.com/?lang=zh">中文主页</a> ·
  <a href="https://cyprinus.algonavis.com/?lang=en">Website in English</a> ·
  <a href="https://github.com/Cyprinus12138?tab=repositories">开源项目 / Repositories</a> ·
  <a href="https://x.com/mr_cyprinus">X</a> ·
  <a href="https://huggingface.co/Tristan12138">Hugging Face</a> ·
  <a href="https://scholar.google.com/citations?hl=en&amp;user=aPVNnf8AAAAJ">Google Scholar</a>
</p>

### 你好，我是 Mr.Cyprinus. / Hi, I'm Mr.Cyprinus.

我的作品包括面向新加坡买房与租房的 AI 产品，以及分布式向量搜索、服务可观测性和计算机视觉研究工具。

My work includes an AI product for buying and renting in Singapore, distributed vector search, service observability, and tools for computer vision research.

关注分布式系统、可观测性、推荐系统、LLM Infra、AI Agent 与计算机视觉。

Interested in distributed systems, observability, recommender systems, LLM infrastructure, AI agents, and computer vision.

### 精选项目 / Selected work

#### [ProProp ↗](https://proprop.algonavis.com/)

面向新加坡住宅市场的 AI 原生房产咨询平台。独立设计并上线，连接买家、卖家与持牌经纪人，支持 Web、iOS 与 Telegram。

An AI-native property advisory platform for Singapore residential real estate. Designed and launched solo, connecting buyers, sellers, and licensed agents across web, iOS, and Telegram.

**开源组件 / Open-source components**

源自 ProProp 生产实践的三个独立组件。 / Three standalone components from ProProp’s production systems.

| 组件 / Component | 做什么 / What it does |
| --- | --- |
| [dialogram](https://github.com/Cyprinus12138/dialogram)<br><sub>Go · MCP · Generative UI</sub> | Go Agent runtime，统一模型接口，支持生成式 UI、人工介入和可恢复流式响应。<br><br>A provider-neutral Go agent runtime with generative UI, human-in-the-loop pauses, and resumable streams. |
| [sg-property-engine](https://github.com/Cyprinus12138/sg-property-engine)<br><sub>Go · PostGIS · MCP</sub> | 定时同步新加坡官方房产数据到 PostgreSQL / PostGIS，通过空间查询 API 和 MCP 工具提供服务。<br><br>Scheduled ingestion of Singapore property data into PostgreSQL / PostGIS, served through spatial query APIs and MCP tools. |
| [fpextract](https://github.com/Cyprinus12138/fpextract)<br><sub>Python · Vision LLM · OpenCV</sub> | 用视觉模型从户型图提取结构化数据，支持批量任务恢复、OpenCV 裁切修正及带来源与置信度的项目汇总。<br><br>Structured floor-plan extraction with vision models, resumable batches, OpenCV-refined crops, and project rollups with provenance and confidence. |

<details>
<summary>平台实现 / Platform engineering</summary>

Go 多服务后端与 PostgreSQL / PostGIS 数据平台，配套 Web、管理后台、iOS 和 Telegram 客户端。

Multi-service Go backend and PostgreSQL / PostGIS data platform serving web, admin, iOS, and Telegram clients.

从零实现不依赖框架的 LLM Agent runtime，支持 53 个生产工具、生成式 UI 和人工介入；以确定性校验拦截缺乏依据的受监管数值，并在 CI 中运行每夜 LLM-as-judge 评估。

Built a provider-neutral LLM agent runtime from scratch, without a framework: 53 production tools, generative UI, and human-in-the-loop. Deterministic guards block unbacked regulated figures; nightly LLM-as-judge evaluations run in CI.

完整 CI/CD 与可观测性；Agent runtime 同时支持提示词缓存。 / Full CI/CD and observability; prompt caching in the agent runtime.

端到端构建数据平台：定时将官方房产数据导入地理空间数据库，并通过 Qwen-VL 视觉流水线，从约 3 万份户型图提取结构化房源数据，供咨询知识库使用。

Built the data platform end to end: scheduled ingestion of official property data into the geospatial store, plus a Qwen-VL vision pipeline extracting structured unit data from ~30,000 floor plans for the advisory knowledge base.


</details>

#### [Vectory ↗](https://github.com/Cyprinus12138/vectory)

基于 FAISS 的分布式向量搜索引擎，支持自动分片、副本、索引热加载与 etcd 集群协调。

A distributed vector search engine built on FAISS, with automatic sharding, replication, hot index reloads, and etcd-based coordination.

`Go` · `FAISS` · `etcd` · `gRPC`

#### [otelgin ↗](https://github.com/Cyprinus12138/otelgin)

为 Gin 服务集成 OpenTelemetry 链路追踪与 HTTP 指标的中间件。

OpenTelemetry tracing and HTTP metrics middleware for Gin services.

`Go` · `Gin` · `OpenTelemetry`

#### [fpvec-lab ↗](https://github.com/Cyprinus12138/fpvec-lab)

近期的户型图矢量化研究：整理代码、基准与评估工具，探索几何表示、标注修正和编辑成本指标。

Recent work on floorplan vectorization: code, benchmarks, and evaluation tools exploring geometric representations, annotation corrections, and edit-cost metrics.

`Python` · `Computer vision` · `Geometry` · `Evaluation`

---

<p align="center"><sub>Stay Simple, Stay Naive.</sub></p>
