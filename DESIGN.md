# DESIGN.md - 270运动馆 v2.0

## 品牌与视觉方向
- **气质**：Apple 官网 + iOS 26 质感，极简高级、克制通透、微立体
- **对标**：Apple、lululemon、Alo Yoga
- **关键词**：极简、高级、克制、通透、生活方式感
- **品牌名**：270运动馆 / BEAUTY CYCLE 270
- **Slogan**：她的运动美学
- **定位**：女性专属健身服务品牌

## Design Tokens

### 色彩
- 品牌主色：陶土橙 #C45A2C（仅点缀，视觉占比 ≤ 5%）
- 橙色渐变按钮：linear-gradient(180deg, #D97A4A, #C45A2C, #A84A22)
- 背景色：奶油白 #FAF8F5 / 纯白 #FFFFFF
- 深色文字：Gray-700 #403E3B（正文）/ Gray-800 #272624（标题）/ Gray-900 #181817（大标题）
- 次要文字：Gray-500 #73716D
- 分割线/边框：Gray-200 #E7E5E1（极细，几乎不可见）
- 深色背景：Gray-900 #181817（CTA区块、VIP区）
- 暖沙色点缀：#EDE6DE（极小面积）
- 禁止：粉色、玫瑰金、紫色等非品牌色

### 字体
- 品牌英文标题：Inter Black（900），letter-spacing: -0.025em
- 中文正文：Noto Sans SC / 思源黑体
- 英文/数字：Inter
- 基础字号：17px，行高 1.75
- Display/Hero：80px（桌面）/ 44px（移动），900 weight
- H1：56px / 36px，800 weight
- H2：40px / 30px，700 weight
- H3：32px / 24px，700 weight

### 圆角（v2.0 收小）
- 卡片：12px
- 按钮/输入框：8px
- 标签：4px
- 大卡片/图片容器：16px
- Hero：20px（仅少量）

### 阴影（v2.0 大幅减少）
- 默认卡片：无阴影，1px Gray-200 边框
- 卡片悬停：scale(1.01) + 边框加深，不上移不加阴影
- 下拉菜单：shadow-sm
- 弹窗/模态框：shadow-md / shadow-lg
- 吸顶导航：shadow-nav（发丝线）
- 主按钮悬停：shadow-orange（唯一橙色阴影）

### 玻璃拟态（iOS 26 轻量版）
- 导航栏：rgba(255,255,255,0.82) + blur(20px) saturate(180%)
- 悬浮卡片：rgba(255,255,255,0.88) + blur(16px)
- 弹窗：rgba(255,255,255,0.92) + blur(24px)
- 内高光：inset 0 1px 0 rgba(255,255,255,0.6)

### 高光描边
- 按钮顶部内高光：inset 0 1px 0 rgba(255,255,255,0.18)
- 玻璃卡片内描边：inset 0 0 0 1px rgba(255,255,255,0.25)

### 渐变
- 深灰渐变：linear-gradient(180deg, #1F1E1C, #181817)
- 深灰带橙光：radial-gradient(ellipse at 20% 0%, rgba(196,90,44,0.15), transparent 50%)
- 白玻璃：linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82))

### 噪点纹理
- 深色背景叠加极细微噪点（3%-5%透明度，overlay混合）

## 布局
- 前端：顶部汉堡菜单 + 侧边栏（无底部Tab Bar）
- 首页6板块全屏叙事，板块间距 160px
- 容器最大宽度：1240px（桌面）/ 100%（移动）
- 移动内边距：20px，桌面：40px

## 动效
- 弹簧缓动：cubic-bezier(0.25, 0.1, 0.25, 1)
- 按钮按下：scale(0.97) 弹性回弹
- 卡片悬停：scale(1.01) + 边框加深
- 滚动渐显：stagger 0.1s 错落入场
- Hero视差：背景图随滚动轻微位移
- 横滑吸附：scroll-snap
- 导航栏：透明 → 玻璃拟态（滚动后）
- 页面转场：淡入 + 轻微上浮

## 设计禁忌
- ❌ 底部Tab Bar
- ❌ 大面积橙色背景
- ❌ 卡片大阴影+上移悬浮
- ❌ 小程序感/APP感/电商平台感
- ❌ 圆润可爱风
- ❌ 粉色系/玫瑰金/非品牌色
- ❌ 胶囊Tab作为主导航（用下划线Tab）
- ❌ 管理后台仪表盘混入前端
