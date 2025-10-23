# Vercel 构建问题修复指南

## 已修复的问题

### 1. Next.js 配置优化
- ✅ 添加了 `styled-components` 编译器支持
- ✅ 修复了配置文件语法问题（缺少分号）

### 2. TypeScript 配置优化
- ✅ 添加了 `allowSyntheticDefaultImports: true` 支持
- ✅ 确保模块解析配置正确

### 3. 代码安全性改进
- ✅ 修复了 API 路由中的不安全类型断言
- ✅ 添加了客户端代码的 SSR 安全检查
- ✅ 改进了 localStorage 和 document 的访问检查
- ✅ 修复了 Ant Design List 组件的 TypeScript 类型错误

### 4. 依赖版本更新
- ✅ 升级 Next.js 到最新稳定版本 (14.2.0)
- ✅ 更新 React 和 React-DOM 版本
- ✅ 添加了 styled-components 类型定义

### 5. 构建配置优化
- ✅ 创建了 `.eslintrc.json` 配置文件
- ✅ 优化了 ESLint 规则
- ✅ 移除了不必要的 `vercel.json` 文件（Next.js 项目会自动检测）

## 部署前检查清单

1. **确保所有依赖已安装**
   ```bash
   npm install
   ```

2. **运行本地构建测试**
   ```bash
   npm run build
   ```

3. **检查代码规范**
   ```bash
   npm run lint
   ```

4. **测试本地开发服务器**
   ```bash
   npm run dev
   ```

## 常见 Vercel 构建错误解决方案

### 错误 1: Module not found
- 确保所有导入路径正确
- 检查 `tsconfig.json` 中的路径映射

### 错误 2: TypeScript 编译错误
- 检查类型定义是否正确
- 确保所有依赖都有对应的类型定义

### 错误 3: Styled-components 错误
- 确保 `next.config.js` 中启用了 styled-components 编译器
- 检查组件是否正确导入

### 错误 4: SSR/客户端不匹配
- 确保所有客户端代码都有 `typeof window !== 'undefined'` 检查
- 避免在服务端渲染时访问浏览器 API

### 错误 5: Ant Design 组件类型错误
- 修复了 List 组件的 `renderItem` 类型问题
- 使用类型断言确保类型安全：`const alarmData = alarm as Alarm`

## 部署建议

1. **使用 Vercel CLI 部署**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **或者通过 GitHub 集成部署**
   - 将代码推送到 GitHub 仓库
   - 在 Vercel Dashboard 中导入项目
   - Vercel 会自动检测 Next.js 项目并配置构建设置

3. **检查构建日志**
   - 在 Vercel Dashboard 中查看详细的构建日志
   - 关注 TypeScript 和 ESLint 警告

4. **环境变量配置**
   - 确保所有必要的环境变量已在 Vercel 中配置
   - 检查 API 路由的环境变量使用

5. **Node.js 版本设置**
   - 在 Vercel 项目设置中确保 Node.js 版本为 18.x
   - Next.js 14 需要 Node.js 18 或更高版本

## 性能优化建议

1. **图片优化**
   - 使用 Next.js Image 组件
   - 配置正确的图片域名

2. **代码分割**
   - 使用动态导入减少初始包大小
   - 优化第三方库的导入

3. **缓存策略**
   - 配置适当的缓存头
   - 使用 Vercel 的 Edge 缓存

如果仍然遇到构建问题，请检查 Vercel 构建日志中的具体错误信息。
