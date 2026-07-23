# 270运动馆 v3.0 - API 接口文档

## 基础信息
- Base URL: `https://your-domain.vercel.app/api`
- 响应格式: JSON
- 统一响应结构: `{ code: number, message: string, data: any }`

---

## 公开接口（无需鉴权）

### 1. 品牌信息
```
GET /api/brand
```
响应示例：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "name": "270运动馆",
    "nameEn": "BEAUTY CYCLE 270",
    "company": "福州坤成体育发展有限公司",
    "founder": "徐宁",
    "founded": "2022",
    "mission": "让每位女性，平等享有运动健身的权利",
    "values": ["安全私密", "专业适配", "高粘性社群"],
    "stats": {
      "members": "1000+",
      "renewalRate": "68%",
      "served": "10W+",
      "valuation": "500万"
    }
  }
}
```

### 2. 课程列表
```
GET /api/courses?page=1&pageSize=10&category=all
```
查询参数：
- `page`: 页码（默认 1）
- `pageSize`: 每页数量（默认 10）
- `category`: 分类筛选（all/yoga/pilates/dance/strength）

### 3. 课程详情
```
GET /api/courses/:id
```

### 4. 教练列表
```
GET /api/coaches
```

### 5. 门店信息
```
GET /api/stores
```
响应示例：
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "1",
      "name": "Beauty cycle女子运动美学馆（晓康苑店）",
      "address": "福建福州鼓楼区湖东路208号晓康苑南楼1303",
      "phone": "13950306600",
      "hours": "09:00-21:00"
    }
  ]
}
```

### 6. 媒体报道
```
GET /api/news
```

### 7. 会员统计
```
GET /api/members/stats
```
响应示例：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalMembers": 1000,
    "vipMembers": 450,
    "newThisMonth": 35,
    "renewalRate": 68,
    "activeRate": 82
  }
}
```

---

## 管理后台接口（需 API Key 鉴权）

### 鉴权方式
在请求头中添加：
```
Authorization: Bearer YOUR_API_KEY
```

### 内容管理
```
GET    /api/admin/content          # 获取首页内容配置
PUT    /api/admin/content          # 更新首页内容
POST   /api/admin/content/section  # 添加板块
DELETE /api/admin/content/section/:id  # 删除板块
```

### 课程管理
```
GET    /api/admin/courses          # 课程列表（管理）
POST   /api/admin/courses          # 创建课程
PUT    /api/admin/courses/:id      # 更新课程
DELETE /api/admin/courses/:id      # 删除课程
```

### 会员管理
```
GET    /api/admin/members          # 会员列表
GET    /api/admin/members/:id      # 会员详情
PUT    /api/admin/members/:id      # 更新会员信息
PUT    /api/admin/members/:id/vip  # 开通/续费 VIP
```

### 订单管理
```
GET    /api/admin/orders           # 订单列表
GET    /api/admin/orders/:id       # 订单详情
PUT    /api/admin/orders/:id/status  # 更新订单状态
POST   /api/admin/orders/:id/refund  # 处理退款
```

### 数据看板
```
GET /api/admin/dashboard/stats     # 核心统计数据
GET /api/admin/dashboard/trends    # 趋势数据（图表）
GET /api/admin/dashboard/export    # 数据导出（CSV）
```

### 系统设置
```
GET    /api/admin/settings         # 获取系统设置
PUT    /api/admin/settings         # 更新系统设置
GET    /api/admin/settings/api-keys  # API Key 列表
POST   /api/admin/settings/api-keys  # 生成新 API Key
DELETE /api/admin/settings/api-keys/:id  # 删除 API Key
```

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（需要登录或 API Key） |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 管理员测试账号

- 路径：`/admin/login`
- 账号：`admin`
- 密码：`admin123`

---

## 访问地址

- 前台首页：`https://your-domain.vercel.app`
- 管理后台：`https://your-domain.vercel.app/admin`
- API 文档：`https://your-domain.vercel.app/api/docs`
