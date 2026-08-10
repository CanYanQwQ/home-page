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

  // 社交链接
  links: [
    {
      label: 'GitHub',
      icon: 'github',
      url: 'https://github.com/your-username',
      color: '#18181B',
    },
    {
      label: '哔哩哔哩',
      icon: 'bilibili',
      url: 'https://space.bilibili.com/your-id',
      color: '#FB7299',
    },
    {
      label: '邮箱',
      icon: 'mail',
      url: 'mailto:hello@example.com',
      color: '#D97706',
    },
  ],

  // 项目（下滑展示，一行3个，名称点击跳转）
  projects: [
    { name: '个人主页', url: 'https://github.com/your-username' },
    { name: '博客系统', url: 'https://your-blog.com' },
    { name: '工具箱', url: 'https://github.com/your-username' },
    { name: '数据可视化', url: 'https://github.com/your-username' },
  ],

  // 备案号（可选，留空则不显示）
  beian: null,
}