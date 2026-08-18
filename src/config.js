/**
 * 个人主页配置
 * 修改此文件以更新个人信息
 */
export const siteConfig = {
  // 姓名
  name: '残颜',
  // 一句话简介
  title: '全栈开发者',
  // 详细描述
  bio: '热爱技术，专注于 Web 开发与用户体验设计。持续学习，乐于分享，用代码创造价值。',
  // 头像：支持 URL 图片路径，或留空使用默认生成的头像（首字母 SVG）
  avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Hu_Tao_%28Genshin_Impact%29.png',

  // ---------- SEO 配置（由 vite 插件自动注入 index.html） ----------
  // 部署后的站点地址（用于 canonical / Open Graph / 结构化数据）
  siteUrl: 'https://example.com/',
  seo: {
    // 页面描述（用于搜索引擎摘要与社交分享）
    description: '残颜的个人主页 —— 全栈开发者，专注 Web 开发与用户体验设计。查看博客文章，关注 GitHub / 哔哩哔哩。',
    // 关键词（对 SEO 影响有限，供参考）
    keywords: '残颜,个人主页,全栈开发者,Web开发,前端,Vue,个人博客',
    // 社交分享封面图：放 public/og-image.png，或改为绝对 URL
    image: '/og-image.png',
  },
  // 页面引言
  quote: '「UI参考了二叉树，整个网站使用 DeepSeek 编写，部署在 Cloudflare Worker 上。」',

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