# AGENTS.md - 270运动

## 项目概览

270运动是一个三端分离的健身运动平台，包含：
- **前端（客户端）**：面向用户的移动端优先界面，包含首页、饮食、课程、商城、我的 5 个页面
- **中端（AI 中台）**：面向 AI 的数据分析与决策支持系统
- **后端（管理后台）**：系统管理界面，包含用户管理、课程管理、商城管理等功能

## 技术栈

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui 组件库
- lucide-react 图标库

## 目录结构

```
src/app/
├── (frontend)/          # 客户端路由组
│   ├── layout.tsx       # 客户端布局（底部 Tab 导航）
│   ├── page.tsx         # 首页
│   ├── diet/page.tsx    # 饮食管理
│   ├── courses/page.tsx # 训练课程
│   ├── mall/page.tsx    # 商城
│   └── profile/page.tsx # 我的
├── (ai)/                # AI 中台路由组
│   ├── layout.tsx       # AI 中台布局
│   └── ai/page.tsx      # AI 数据总览
├── (admin)/             # 管理后台路由组
│   ├── layout.tsx       # 管理后台布局
│   └── admin/page.tsx   # 管理后台首页
├── layout.tsx           # 根布局
└── globals.css          # 全局样式（品牌色彩、动画）
```

## 路由说明

| 路径 | 端 | 说明 |
|------|-----|------|
| `/` | 前端 | 首页 - 运动数据、今日计划、热门课程 |
| `/diet` | 前端 | 饮食管理 - 营养摄入、餐食记录 |
| `/courses` | 前端 | 训练课程 - 课程列表、分类筛选 |
| `/mall` | 前端 | 商城 - 商品列表、购物车 |
| `/profile` | 前端 | 我的 - 个人信息、运动数据、成就 |
| `/ai` | AI中台 | AI 数据总览 - 智能洞察、用户分析 |
| `/admin` | 后台 | 管理后台 - 用户管理、课程管理 |

## 设计规范

- 品牌主色：#FF6B35（活力橙）
- 暗色基底：#0F0F23（深空灰）
- 强调色：#00F5A0（荧光绿）、#4ECDC4（电光蓝）
- 客户端：移动端优先，最大宽度 480px，底部 Tab 导航
- AI/后台：桌面端优先，深色主题，左侧导航

## 构建命令

```bash
pnpm install       # 安装依赖
pnpm dev           # 开发环境
pnpm build         # 生产构建
pnpm ts-check      # TypeScript 检查
pnpm lint          # ESLint 检查
```

## 注意事项

- 三端通过右上角切换按钮互相跳转
- 所有页面使用 `use client` 客户端渲染
- 使用 CSS 变量和 Tailwind 实现品牌主题
- 数据目前为 Mock 数据，后续可对接 API
