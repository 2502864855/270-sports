import { getSupabaseClient } from '@/storage/database/supabase-client';
import { hashPassword } from '@/lib/auth/password';

async function seed() {
  console.log('🌱 开始填充种子数据...');
  const client = getSupabaseClient();

  try {
    // 1. 超级管理员
    console.log('📝 创建超级管理员...');
    const passwordHash = await hashPassword('admin123');
    const { error: adminError } = await client.from('admin_users').upsert({
      username: 'admin',
      password_hash: passwordHash,
      real_name: '超级管理员',
      role: 'SUPER_ADMIN',
      email: 'admin@270sports.com',
      status: 'ACTIVE',
    }, { onConflict: 'username' });
    if (adminError) throw new Error(`管理员创建失败: ${adminError.message}`);
    console.log('✅ 超级管理员创建完成 (admin / admin123)');

    // 2. 网站默认设置
    console.log('📝 创建网站设置...');
    const { error: settingsError } = await client.from('site_settings').insert({
      site_name: '270运动馆',
      site_logo: '/logo.png',
      site_description: '女性专属健身服务品牌，让每位女性平等享有运动健身的权利',
      keywords: '270运动馆,女性健身,瑜伽,普拉提,私教,福州',
      icp: '闽ICP备XXXXXXXX号',
      contact_email: 'contact@270sports.com',
      contact_phone: '13950306600',
      social_links: { wechat: '270sports', weibo: '270运动馆', douyin: '270运动馆' },
    });
    if (settingsError) throw new Error(`网站设置创建失败: ${settingsError.message}`);
    console.log('✅ 网站设置创建完成');

    // 3. 品牌信息
    console.log('📝 创建品牌信息...');
    const { error: brandError } = await client.from('brand_info').insert({
      brand_name: '270运动馆',
      brand_name_en: 'BEAUTY CYCLE 270',
      slogan: '她的运动美学',
      mission: '让每位女性，平等享有运动健身的权利',
      description: '270运动馆是一家专注于女性健身的服务品牌，致力于为女性提供安全、私密、专业的运动空间。我们相信每位女性都值得拥有健康、自信的生活方式。',
      core_values: ['安全私密', '专业适配', '高粘性社群'],
      founded_year: 2022,
      founder: '徐宁',
      founder_bio: '270运动馆创始人，深耕女性健身领域多年，致力于为中国女性打造专属的运动美学空间。2025年荣获「年度女性影响力人物」称号。',
      founder_avatar: '/founder-avatar.png',
      total_members: 100000,
      core_members: 1000,
      renewal_rate: 68,
      valuation: '5000000',
    });
    if (brandError) throw new Error(`品牌信息创建失败: ${brandError.message}`);
    console.log('✅ 品牌信息创建完成');

    // 4. 首页板块
    console.log('📝 创建首页板块...');
    const sections = [
      { section_key: 'hero', title: '270运动馆', subtitle: '让每位女性，平等享有运动健身的权利', content: { brandNameEn: 'BEAUTY CYCLE 270' }, primary_button_text: '了解品牌', primary_button_link: '#brand-story', secondary_button_text: '预约体验', secondary_button_link: '/login', sort_order: 1 },
      { section_key: 'mission', title: '品牌使命', subtitle: '为女性创造安全、私密、专业的运动空间', content: { values: [{ title: '安全私密', desc: '纯女性空间，无评判环境' }, { title: '专业适配', desc: '女性专属训练体系' }, { title: '高粘性社群', desc: '1000+核心会员，68%续费率' }] }, sort_order: 2 },
      { section_key: 'stats', title: '品牌实力', subtitle: '用数据说话', content: { stats: [{ value: 100000, label: '累计服务女性', suffix: '+' }, { value: 1000, label: '核心会员', suffix: '+' }, { value: 68, label: '月度续费率', suffix: '%' }, { value: 2022, label: '品牌创立', suffix: '' }] }, sort_order: 3 },
      { section_key: 'story', title: '品牌故事', subtitle: '从福州出发，为女性而来', sort_order: 4 },
      { section_key: 'founder', title: '创始人', subtitle: '徐宁', content: { quote: '让每位女性，平等享有运动健身的权利', honor: '2025年度女性影响力人物' }, sort_order: 5 },
      { section_key: 'stores', title: '门店信息', subtitle: '女性专属空间', sort_order: 6 },
      { section_key: 'news', title: '媒体报道', subtitle: '品牌荣誉与认可', sort_order: 7 },
      { section_key: 'cta', title: '开启你的女性专属健身之旅', subtitle: '首次体验免费咨询 + 身体评估', primary_button_text: '立即预约体验', primary_button_link: '/login', sort_order: 8 },
    ];
    const { error: sectionsError } = await client.from('home_sections').insert(sections);
    if (sectionsError) throw new Error(`首页板块创建失败: ${sectionsError.message}`);
    console.log('✅ 首页板块创建完成 (8个)');

    // 5. 品牌时间线
    console.log('📝 创建品牌时间线...');
    const timeline = [
      { year: 2022, month: 1, title: '品牌创立', description: '270运动馆于福州成立，创始人徐宁', icon_type: 'flag', is_highlight: true, sort_order: 1 },
      { year: 2023, month: 6, title: '首家门店落地', description: '首家门店正式运营，积累首批500名会员', icon_type: 'building', is_highlight: false, sort_order: 2 },
      { year: 2024, month: 3, title: '课程体系迭代', description: '完成课程体系全面升级，会员突破1000人', icon_type: 'book', is_highlight: false, sort_order: 3 },
      { year: 2025, month: 1, title: '荣获行业大奖', description: '创始人徐宁获「年度女性影响力人物」，品牌获「最具投资价值项目奖」', icon_type: 'award', is_highlight: true, sort_order: 4 },
      { year: 2026, month: 1, title: '完成种子轮融资', description: '完成种子轮融资，投后估值500万，开启规模化发展', icon_type: 'rocket', is_highlight: true, sort_order: 5 },
    ];
    const { error: timelineError } = await client.from('timeline_events').insert(timeline);
    if (timelineError) throw new Error(`时间线创建失败: ${timelineError.message}`);
    console.log('✅ 品牌时间线创建完成 (5个节点)');

    // 6. 媒体报道/荣誉
    console.log('📝 创建媒体报道...');
    const newsItems = [
      { title: '深耕"她力量"健身赛道', source: '凤凰网', type: 'NEWS', summary: '270运动馆以专业、私密的女性专属空间，在健身行业开辟出独特的赛道。', link_url: 'https://news.ifeng.com/', publish_date: '2025-03-15T00:00:00Z', is_published: true, sort_order: 1 },
      { title: '2025最具投资价值项目', source: '第36届华商创新论坛', type: 'AWARD', summary: '270运动馆凭借独特的商业模式和强劲的增长潜力，荣获最具投资价值项目奖。', publish_date: '2025-06-20T00:00:00Z', is_published: true, sort_order: 2 },
      { title: '亚洲影响力创新奖', source: 'ABEC', type: 'HONOR', summary: '270运动馆荣获ABEC亚洲影响力创新奖，成为女性健身领域的标杆品牌。', publish_date: '2025-09-10T00:00:00Z', is_published: true, sort_order: 3 },
      { title: '年度女性影响力人物', source: '行业评选', type: 'HONOR', summary: '创始人徐宁凭借在女性健身领域的杰出贡献，荣获2025年度女性影响力人物。', publish_date: '2025-12-01T00:00:00Z', is_published: true, sort_order: 4 },
    ];
    const { error: newsError } = await client.from('news').insert(newsItems);
    if (newsError) throw new Error(`媒体报道创建失败: ${newsError.message}`);
    console.log('✅ 媒体报道创建完成 (4条)');

    // 7. 门店信息
    console.log('📝 创建门店信息...');
    const { error: storeError } = await client.from('stores').insert({
      name: 'Beauty cycle女子运动美学馆（晓康苑店）',
      address: '福建福州鼓楼区湖东路208号晓康苑南楼1303',
      city: '福州',
      district: '鼓楼区',
      phone: '13950306600',
      business_hours: { weekday: '09:00-21:00', weekend: '10:00-18:00', holiday: '10:00-18:00' },
      latitude: '26.0845000',
      longitude: '119.3035000',
      description: '女性专属空间，安全私密舒适。配备专业训练设备、瑜伽室、休息区，为会员提供高品质的运动体验。',
      facilities: ['瑜伽室', '力量训练区', '有氧训练区', '更衣室', '休息区', '储物柜'],
      status: 'OPEN',
      sort_order: 1,
    });
    if (storeError) throw new Error(`门店创建失败: ${storeError.message}`);
    console.log('✅ 门店信息创建完成');

    // 8. 会员等级
    console.log('📝 创建会员等级...');
    const levels = [
      { name: '普通会员', level: 1, description: '基础会员，享受基础权益', base_price: '0', color: '#86868B', icon: 'star', benefits: { bodyAssessment: true }, upgrade_condition: '注册即享' },
      { name: '银卡会员', level: 2, description: '进阶会员，享受更多专属权益', base_price: '1999', color: '#C0C0C0', icon: 'medal', benefits: { courses: true, bodyAssessment: true, priorityBooking: true }, upgrade_condition: '累计消费满1999元' },
      { name: '金卡会员', level: 3, description: '高级会员，享受VIP专属服务', base_price: '4999', color: '#FFD700', icon: 'crown', benefits: { courses: true, privateCoach: true, nutritionPlan: true, bodyAssessment: true, priorityBooking: true }, upgrade_condition: '累计消费满4999元' },
      { name: '钻石会员', level: 4, description: '顶级会员，享受全部权益和专属定制服务', base_price: '9999', color: '#B9F2FF', icon: 'diamond', benefits: { courses: true, privateCoach: true, nutritionPlan: true, bodyAssessment: true, priorityBooking: true, exclusiveEvents: true }, upgrade_condition: '累计消费满9999元' },
    ];
    const { error: levelsError } = await client.from('member_levels').insert(levels);
    if (levelsError) throw new Error(`会员等级创建失败: ${levelsError.message}`);
    console.log('✅ 会员等级创建完成 (4级)');

    // 9. 前台测试用户
    console.log('📝 创建前台测试用户...');
    const userPasswordHash = await hashPassword('270sport888');
    const { error: userError } = await client.from('users').upsert({
      username: 'user270',
      password_hash: userPasswordHash,
      phone: '13800138000',
      nickname: '周女士',
      gender: 'FEMALE',
      status: 'ACTIVE',
      avatar: null,
      total_training_count: 128,
      total_training_minutes: 3840,
      consecutive_days: 21,
    }, { onConflict: 'username' });
    if (userError) throw new Error(`测试用户创建失败: ${userError.message}`);
    console.log('✅ 前台测试用户创建完成 (user270 / 270sport888)');

    console.log('');
    console.log('🎉 种子数据填充完成！');
    console.log('');
    console.log('📋 测试账号：');
    console.log('   管理后台 - 用户名: admin / 密码: admin123');
    console.log('   前台用户 - 用户名: user270 / 密码: 270sport888');
  } catch (error) {
    console.error('❌ 种子数据填充失败:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('👋 再见！');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 执行失败:', error);
    process.exit(1);
  });
