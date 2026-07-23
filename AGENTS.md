# AGENTS.md - 270运动馆品牌官网

## 项目概览

270运动馆（BEAUTY CYCLE 270）是一个面向女性的专属健身品牌官网，由福州坤成体育发展有限公司运营。包含三端：
- **前端（客户端）**：面向女性用户的移动端优先界面，含首页、课程、商城、我的、饮食、会员中心、登录注册
- **中端（AI 中台）**：面向 AI 的数据分析与决策支持系统，含会员分析、收入趋势、智能洞察
- **后端（管理后台）**：系统管理界面，含用户/课程/教练/商品/订单/财务/内容管理

## 技术栈

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui 组件库
- lucide-react 图标库
- Supabase PostgreSQL（数据库）
- Supabase SDK（数据操作）
- Drizzle ORM（Schema 定义 & 迁移）
- jose（JWT 鉴权）
- bcryptjs（密码哈希）
- GSAP + ScrollTrigger（滚动视差动效）

## 目录结构

```
src/app/
├── (frontend)/          # 客户端路由组（移动端优先）
│   ├── layout.tsx       # 客户端布局（底部4Tab导航：首页/课程/商城/我的）
│   ├── page.tsx         # 首页 - Banner轮播、品牌故事、热门课程、教练团队、会员蜕变
│   ├── courses/page.tsx # 课程预约 - 分类筛选、课程详情、在线预约
│   ├── mall/page.tsx    # 商城 - 商品网格、会员价、购物车
│   ├── diet/page.tsx    # 营养管理 - 营养摄入、饮食记录、AI建议、推荐食谱
│   ├── profile/page.tsx # 个人中心 - 运动数据、成就、身体数据、功能菜单
│   ├── vip/page.tsx     # 会员中心 - 等级权益、对比表、购买选项、积分兑换
│   └── login/page.tsx   # 登录注册 - 手机号+验证码、微信登录入口
├── (ai)/                # AI 中台路由组
│   ├── layout.tsx       # AI 中台布局（深色主题）
│   └── ai/page.tsx      # AI 数据总览 - 会员分析、收入趋势、智能洞察、用户分层
├── (admin)/             # 管理后台路由组
│   ├── layout.tsx       # 管理后台布局（深色主题）
│   └── admin/page.tsx   # 管理后台 - 用户/课程/教练/订单管理、数据统计
├── layout.tsx           # 根布局
└── globals.css          # 全局样式（品牌色彩、动画）
```

## 路由说明

| 路径 | 端 | 说明 |
|------|-----|------|
| `/` | 前端 | 首页 - Banner轮播、品牌故事、热门课程、教练团队、会员蜕变 |
| `/courses` | 前端 | 课程预约 - 分类筛选、课程详情弹窗、在线预约 |
| `/mall` | 前端 | 商城 - 商品网格、会员价标签、购物车抽屉 |
| `/diet` | 前端 | 营养管理 - 营养摄入环形图、饮食记录、AI建议、推荐食谱 |
| `/profile` | 前端 | 个人中心 - 运动数据、成就系统、身体数据、功能菜单 |
| `/vip` | 前端 | 会员中心 - 等级权益对比、月/季/年卡购买、积分兑换 |
| `/login` | 前端 | 登录注册 - 手机号+验证码、密码登录、微信入口 |
| `/ai` | AI中台 | AI 数据总览 - 会员分析、收入趋势、智能洞察、用户分层 |
| `/admin` | 后台 | 管理后台首页 |
| `/admin/login` | 后台 | 管理员登录 |
| `/admin/content` | 后台 | 内容管理 |
| `/admin/courses` | 后台 | 课程管理 |
| `/admin/members` | 后台 | 会员管理 |
| `/admin/orders` | 后台 | 订单管理 |
| `/admin/settings` | 后台 | 系统设置 |
| `/admin/api` | 后台 | API 接口管理 |

## 设计规范

- 品牌主色（橙）：陶土橙 #C45A2C / 焦糖橙 #D4612F（偏深偏暖的橙棕色）
- 背景色：纯白色 #FFFFFF（大面积留白）
- 文字色：苹果黑 #1D1D1F / 苹果灰 #86868B
- 分割线：#D2D2D7 或极浅灰 #F5F5F7
- 标题字体：系统无衬线字体（SF Pro / PingFang SC），粗体大字号（48-80px）
- 客户端：移动端优先，最大宽度 480px，底部 Tab 导航
- AI/后台：桌面端优先，深色主题（#1D1D1F 基底），左侧导航
- 整体气质：苹果官网极简高级感，大量留白，大标题排版，克制有质感

## 品牌信息

- 品牌名称：270运动馆 / BEAUTY CYCLE 270
- 运营主体：福州坤成体育发展有限公司
- 创始人：徐宁（2022年创立于福州）
- 核心数据：1000+核心会员、68%月度续费率、累计服务10W+女性
- 会员体系：普通/银卡/金卡/钻石 四级

## 构建命令

```bash
pnpm install       # 安装依赖
pnpm dev           # 开发环境
pnpm build         # 生产构建
pnpm ts-check      # TypeScript 检查
pnpm lint          # ESLint 检查
pnpm db:seed       # 填充种子数据
```

## 后端系统

### 数据库
- 使用 Supabase PostgreSQL，通过 Supabase SDK 进行 CRUD 操作
- Schema 定义在 `src/storage/database/shared/schema.ts`（Drizzle ORM 语法）
- 迁移命令：`coze-coding-ai db upgrade`
- 模型同步：`coze-coding-ai db generate-models`
- Supabase 客户端：`src/storage/database/supabase-client.ts`

### API 接口

| 方法 | 路径 | 说明 | 鉴权 |
|------|------|------|------|
| POST | `/api/admin/auth/login` | 管理员登录 | 无 |
| GET | `/api/admin/auth/profile` | 获取当前管理员信息 | JWT |
| PUT | `/api/admin/auth/password` | 修改密码 | JWT |

### 鉴权机制
- 管理员登录：JWT（jose 库），7天有效期
- API Key：用于第三方数据接口（待实现）
- 密码哈希：bcryptjs，10轮盐
- 中间件：`src/lib/auth/middleware.ts`

### 数据表
- `admin_users` - 管理员
- `api_keys` - API 密钥
- `site_settings` - 网站设置
- `brand_info` - 品牌信息
- `home_sections` - 首页板块
- `timeline_events` - 品牌时间线
- `news` - 媒体报道
- `stores` - 门店
- `coaches` - 教练
- `course_categories` - 课程分类
- `courses` - 课程
- `users` - 用户
- `member_levels` - 会员等级
- `memberships` - 会员记录
- `user_body_data` - 体测数据
- `orders` - 订单
- `order_items` - 订单明细
- `bookings` - 预约
- `content_images` - 图片库

### 测试账号
- 管理员：admin / admin123

## 注意事项

- 三端通过右上角切换按钮互相跳转
- 所有页面使用 `use client` 客户端渲染
- 使用 CSS 变量和 Tailwind 实现品牌主题
- 管理后台路由在 `/admin/*` 路径下
- 数据库操作使用 Supabase SDK（`client.from()`），不用 Drizzle ORM 查询语法
- 字段名统一 snake_case
- 所有 Supabase 操作必须检查 `{ data, error }` 并 throw error
