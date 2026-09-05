/**
 * 个人主页配置
 * 修改此文件以更新个人信息
 */
export const siteConfig = {
  // 姓名
  name: '残颜',
  // 一句话简介
  title: '无业游民',
  // 详细描述
  bio: '无业游民一枚，对 IT 和 AI 上头，日常靠 AGENT 编程自娱自乐。',
  // 头像：支持 URL 图片路径，或留空使用默认生成的头像（首字母 SVG）
  avatar: '/avatar.jpg',

  // ---------- SEO 配置（由 vite 插件自动注入 index.html） ----------
  // 部署后的站点地址（用于 canonical / Open Graph / 结构化数据）
  siteUrl: 'https://zhouwanx.top/',
  seo: {
    // 搜索结果与社交分享标题，不影响页面内的自嘲身份文案
    title: '残颜的个人主页｜AI 与 Agent 编程、个人博客',
    // 页面描述（用于搜索引擎摘要与社交分享）
    description: '残颜的个人主页：无业游民一枚，喜欢 IT、AI 与 Agent 编程；这里提供个人博客、GitHub 与哔哩哔哩入口。',
    // 关键词（对 SEO 影响有限，供参考）
    keywords: '残颜,残颜个人主页,AI,Agent编程,个人博客,GitHub,哔哩哔哩',
    // 社交分享封面图
    image: '/og-card.png',
    imageAlt: '残颜的个人主页：AI 与 Agent 编程和个人博客',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    // 结构化数据中的真实兴趣方向
    knowsAbout: ['信息技术', '人工智能', 'Agent 编程'],
  },
  // 页面引言
  quote: '「UI参考了二叉树树，整个网站使用 DeepSeek 编写，部署在 Vercel 上。」',

  // 社交链接
  links: [
    {
      label: 'GitHub',
      icon: 'github',
      url: 'https://github.com/CanYanQwQ',
      color: '#18181B',
    },
    {
      label: '哔哩哔哩',
      icon: 'bilibili',
      url: 'https://space.bilibili.com/3546714340330136',
      color: '#FB7299',
    },
    {
      label: '邮箱',
      icon: 'mail',
      url: 'mailto:canyan886@gmail.com',
      color: '#D97706',
    },
  ],

  // 项目（下滑展示，名称点击跳转）
  projects: [
    { name: '博客', url: 'https://blog.zhouwanx.top' },
  ],

  // 备案号（可选，留空则不显示）
  beian: null,
}