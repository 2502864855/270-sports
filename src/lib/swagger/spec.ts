export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: '270运动馆 AI 数据接口',
    description: `## 简介

270运动馆（BEAUTY CYCLE 270）AI 数据接口文档。提供品牌信息、课程、教练、门店、媒体报道、会员统计等数据，供 AI 应用集成使用。

## 认证方式

所有接口需要在请求头中携带 API Key：

\`\`\`
X-API-Key: sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

API Key 在管理后台生成，支持权限范围控制。

## 基础 URL

\`\`\`
/api/v1
\`\`\`

## 响应格式

所有接口统一返回 JSON 格式：

\`\`\`json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
\`\`\`

## 错误码

| code | 说明 |
|------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（API Key 无效或权限不足） |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

## 字段命名

所有响应字段使用英文驼峰命名（camelCase）。`,
    version: '1.0.0',
    contact: {
      name: '270运动馆',
      email: 'admin@270sports.com',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'AI 数据接口',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API Key，格式为 sk_ 前缀 + 32位随机字符串',
      },
    },
    schemas: {
      Brand: {
        type: 'object',
        properties: {
          brandName: { type: 'string', example: '270运动馆' },
          brandNameEn: { type: 'string', example: 'BEAUTY CYCLE 270' },
          slogan: { type: 'string', example: '她的运动美学' },
          mission: { type: 'string', example: '让每位女性，平等享有运动健身的权利' },
          description: { type: 'string' },
          coreValues: { type: 'array', items: { type: 'string' }, example: ['安全私密', '专业适配', '高粘性社群'] },
          foundedYear: { type: 'integer', example: 2022 },
          founder: { type: 'string', example: '徐宁' },
          founderBio: { type: 'string' },
          founderAvatar: { type: 'string', format: 'uri' },
          totalMembers: { type: 'integer', example: 100000 },
          coreMembers: { type: 'integer', example: 1000 },
          renewalRate: { type: 'number', example: 68 },
          valuation: { type: 'integer', example: 5000000 },
        },
      },
      Course: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          subtitle: { type: 'string' },
          categoryName: { type: 'string' },
          description: { type: 'string' },
          highlights: { type: 'array', items: { type: 'string' } },
          suitableFor: { type: 'array', items: { type: 'string' } },
          duration: { type: 'integer', description: '课程时长（分钟）' },
          difficulty: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
          price: { type: 'number' },
          originalPrice: { type: 'number' },
          memberPrice: { type: 'number' },
          coverImage: { type: 'string', format: 'uri' },
          coachName: { type: 'string' },
          rating: { type: 'number', example: 5.0 },
          reviewCount: { type: 'integer' },
          totalBookings: { type: 'integer' },
          isRecommended: { type: 'boolean' },
          isHot: { type: 'boolean' },
        },
      },
      CourseDetail: {
        allOf: [
          { $ref: '#/components/schemas/Course' },
          {
            type: 'object',
            properties: {
              outline: { type: 'array', items: { type: 'object' } },
              images: { type: 'array', items: { type: 'string' } },
              coach: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  title: { type: 'string' },
                  avatar: { type: 'string' },
                  bio: { type: 'string' },
                  specialties: { type: 'array', items: { type: 'string' } },
                  certifications: { type: 'array', items: { type: 'string' } },
                  experienceYears: { type: 'integer' },
                },
              },
            },
          },
        ],
      },
      Coach: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          title: { type: 'string' },
          avatar: { type: 'string', format: 'uri' },
          bio: { type: 'string' },
          specialties: { type: 'array', items: { type: 'string' } },
          certifications: { type: 'array', items: { type: 'string' } },
          experienceYears: { type: 'integer' },
        },
      },
      Store: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' },
          district: { type: 'string' },
          phone: { type: 'string' },
          businessHours: { type: 'object' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
          coverImage: { type: 'string', format: 'uri' },
          description: { type: 'string' },
          facilities: { type: 'array', items: { type: 'string' } },
        },
      },
      News: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          source: { type: 'string' },
          type: { type: 'string', enum: ['NEWS', 'AWARD', 'HONOR'] },
          coverImage: { type: 'string', format: 'uri' },
          summary: { type: 'string' },
          linkUrl: { type: 'string', format: 'uri' },
          publishDate: { type: 'string', format: 'date-time' },
        },
      },
      MemberStats: {
        type: 'object',
        properties: {
          totalUsers: { type: 'integer' },
          totalVipMembers: { type: 'integer' },
          vipConversionRate: { type: 'number', description: 'VIP转化率（%）' },
          levelDistribution: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                count: { type: 'integer' },
              },
            },
          },
          newMembersThisMonth: { type: 'integer' },
          expiringThisMonth: { type: 'integer' },
        },
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          list: { type: 'array', items: {} },
          total: { type: 'integer' },
          page: { type: 'integer' },
          pageSize: { type: 'integer' },
          totalPages: { type: 'integer' },
        },
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],
  paths: {
    '/brand': {
      get: {
        tags: ['品牌'],
        summary: '获取品牌基本信息',
        description: '返回270运动馆的品牌信息，包括品牌名称、使命、创始人信息、核心数据等。',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/Brand' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/courses': {
      get: {
        tags: ['课程'],
        summary: '获取课程列表',
        description: '返回已发布的课程列表，支持分页、分类筛选、关键词搜索。',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'pageSize', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'categoryId', in: 'query', schema: { type: 'integer' }, description: '分类ID' },
          { name: 'keyword', in: 'query', schema: { type: 'string' }, description: '关键词搜索' },
          { name: 'difficulty', in: 'query', schema: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] } },
          { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['sortOrder', 'createdAt', 'price', 'totalBookings'] } },
          { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } },
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/PaginatedResponse' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/courses/{id}': {
      get: {
        tags: ['课程'],
        summary: '获取课程详情',
        description: '返回单个课程的完整信息，包含教练详情和课程大纲。',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/CourseDetail' },
                  },
                },
              },
            },
          },
          '404': { description: '课程不存在' },
        },
      },
    },
    '/members/stats': {
      get: {
        tags: ['会员'],
        summary: '获取会员统计数据',
        description: '返回会员相关统计数据，包括总用户数、VIP会员数、转化率、等级分布等。',
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/MemberStats' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/coaches': {
      get: {
        tags: ['教练'],
        summary: '获取教练列表',
        description: '返回在职教练列表。',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'pageSize', in: 'query', schema: { type: 'integer', default: 20 } },
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        list: { type: 'array', items: { $ref: '#/components/schemas/Coach' } },
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        pageSize: { type: 'integer' },
                        totalPages: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/stores': {
      get: {
        tags: ['门店'],
        summary: '获取门店信息',
        description: '返回营业中的门店列表。',
        parameters: [
          { name: 'city', in: 'query', schema: { type: 'string' }, description: '城市筛选' },
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Store' } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/news': {
      get: {
        tags: ['媒体'],
        summary: '获取媒体报道列表',
        description: '返回已发布的媒体报道/荣誉列表。',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'pageSize', in: 'query', schema: { type: 'integer', default: 20 } },
          { name: 'type', in: 'query', schema: { type: 'string', enum: ['NEWS', 'AWARD', 'HONOR'] }, description: '类型筛选' },
        ],
        responses: {
          '200': {
            description: '成功',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        list: { type: 'array', items: { $ref: '#/components/schemas/News' } },
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        pageSize: { type: 'integer' },
                        totalPages: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    { name: '品牌', description: '品牌基本信息' },
    { name: '课程', description: '课程列表与详情' },
    { name: '会员', description: '会员统计数据' },
    { name: '教练', description: '教练列表' },
    { name: '门店', description: '门店信息' },
    { name: '媒体', description: '媒体报道与荣誉' },
  ],
};
