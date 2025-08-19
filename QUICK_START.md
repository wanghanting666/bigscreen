# 快速启动指南

## 🚀 立即开始

### 方法 1：使用启动脚本（推荐）

**Windows 用户：**

```bash
# 双击运行
start.bat
```

**Linux/Mac 用户：**

```bash
# 给脚本执行权限
chmod +x start.sh

# 运行脚本
./start.sh
```

### 方法 2：手动启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

## 🌐 访问应用

启动成功后，在浏览器中访问：
**http://localhost:3001**

## 📋 功能预览

### 🎯 主要功能

- ✅ **实时视频流展示** - 模拟摄像头画面
- ✅ **数据可视化图表** - 访问量、告警数趋势
- ✅ **系统状态监控** - CPU、内存、存储使用率
- ✅ **智能告警系统** - 多类型告警展示
- ✅ **摄像头网格** - 所有摄像头状态概览

### 🎨 界面特色

- 🌙 **深色主题** - 专业的监控大屏风格
- ✨ **毛玻璃效果** - 现代化视觉设计
- 📱 **响应式布局** - 适配各种屏幕尺寸
- 🎭 **流畅动画** - 优雅的交互动画

## 🔧 配置说明

### 环境要求

- Node.js 18+
- npm 或 yarn

### 端口配置

- 默认端口：**3001**
- 如需修改端口，编辑 `package.json` 中的 `dev` 脚本

### 环境变量

项目已预配置 `.env.local` 文件，包含：

- 海康威视 SDK 配置
- API 地址配置
- 应用名称配置

## 🐳 Docker 部署

```bash
# 构建镜像
docker build -t camera-monitor-dashboard .

# 运行容器
docker run -p 3001:3001 camera-monitor-dashboard
```

或使用 docker-compose：

```bash
docker-compose up -d
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── VideoStream.tsx    # 视频流组件
│   ├── DataChart.tsx      # 数据图表组件
│   ├── AlarmList.tsx      # 告警列表组件
│   └── CameraGrid.tsx     # 摄像头网格组件
├── data/                  # 数据文件
│   └── mockData.ts        # Mock数据
├── services/              # 服务层
│   └── hikvision.ts       # 海康威视服务
└── lib/                   # 工具库
    └── AntdRegistry.tsx   # Ant Design样式注册
```

## 🔌 海康威视集成

### 当前状态

- ✅ 服务接口已定义
- ✅ Mock 数据已配置
- ⏳ 需要集成实际的海康威视 SDK

### 集成步骤

1. 下载海康威视 Web3.0 控件
2. 在 HTML 中引入 SDK
3. 配置摄像头信息
4. 调用服务接口

详细说明请参考 `src/services/hikvision.ts` 文件。

## 🎯 下一步计划

### 功能增强

- [ ] 实时视频流集成
- [ ] WebSocket 实时数据推送
- [ ] 用户认证系统
- [ ] 权限管理
- [ ] 历史数据查询
- [ ] 导出报表功能

### 技术优化

- [ ] 性能优化
- [ ] 错误处理
- [ ] 单元测试
- [ ] E2E 测试
- [ ] CI/CD 流程

## 🆘 常见问题

### Q: 端口被占用怎么办？

A: 修改 `package.json` 中的端口配置，或使用 `npm run dev -p 3002`

### Q: 依赖安装失败？

A: 确保 Node.js 版本为 18+，清除缓存：`npm cache clean --force`

### Q: 页面显示异常？

A: 检查浏览器控制台错误，确保所有依赖正确安装

### Q: 如何修改摄像头配置？

A: 编辑 `src/data/mockData.ts` 文件中的摄像头信息

## 📞 技术支持

如有问题，请：

1. 查看控制台错误信息
2. 检查网络连接
3. 确认环境配置
4. 提交 Issue 到项目仓库

---

🎉 **享受你的监控大屏系统！**
