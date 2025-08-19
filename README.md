# 摄像头 AI 监控大屏系统

一个基于 Next.js 和 Ant Design 的现代化摄像头监控大屏系统，支持海康威视摄像头集成、实时视频流展示、数据可视化和智能告警。

## 🚀 功能特性

### 📹 视频监控

- **实时视频流展示** - 支持多路摄像头实时画面
- **海康威视 SDK 集成** - 完整的摄像头控制接口
- **PTZ 云台控制** - 支持云台摄像头的远程控制
- **视频快照** - 支持实时截图功能
- **多画面切换** - 支持摄像头画面的快速切换

### 📊 数据可视化

- **实时数据图表** - 使用 ECharts 展示监控数据趋势
- **系统状态监控** - CPU、内存、存储使用率实时监控
- **访问量统计** - 实时访问量和告警数量统计
- **响应式设计** - 适配不同尺寸的显示设备

### 🚨 智能告警

- **多类型告警** - 支持移动侦测、人脸识别、车辆识别、系统告警
- **告警分级** - 低、中、高、紧急四个告警级别
- **实时告警推送** - 告警信息的实时显示和处理
- **告警历史** - 告警记录的查询和管理

### 🎨 现代化 UI

- **深色主题** - 专业的监控大屏深色主题
- **毛玻璃效果** - 现代化的视觉设计
- **动画效果** - 流畅的交互动画
- **响应式布局** - 适配各种屏幕尺寸

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 组件库**: Ant Design 5.x
- **图表库**: ECharts 5.x
- **样式方案**: Styled Components
- **类型检查**: TypeScript
- **摄像头 SDK**: 海康威视 Web3.0 控件

## 📦 安装和运行

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

### 生产环境构建

```bash
npm run build
npm start
# 或
yarn build
yarn start
```

访问 [http://localhost:3001](http://localhost:3001) 查看应用。

## 🔧 配置说明

### 海康威视摄像头配置

在 `src/services/hikvision.ts` 中配置摄像头信息：

```typescript
const mockCameras = [
  {
    id: '1',
    config: {
      ip: '192.168.1.100', // 摄像头IP地址
      port: 8000, // 端口号
      username: 'admin', // 用户名
      password: 'admin123', // 密码
      channel: 1, // 通道号
    },
  },
];
```

### 环境变量配置

创建 `.env.local` 文件：

```env
# 海康威视SDK配置
HIKVISION_SDK_URL=http://your-sdk-url
HIKVISION_APP_KEY=your-app-key
HIKVISION_APP_SECRET=your-app-secret

# 其他配置
NEXT_PUBLIC_API_URL=http://localhost:3001/api
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

## 🔌 海康威视 SDK 集成

### 1. 安装海康威视 Web3.0 控件

下载并安装海康威视 Web3.0 控件，然后在 HTML 中引入：

```html
<script src="path/to/webVideoCtrl.js"></script>
```

### 2. 初始化 SDK

```typescript
import { hikVisionService } from '@/services/hikvision';

// 初始化SDK
await hikVisionService.initializeSDK();
```

### 3. 获取视频流

```typescript
// 获取摄像头视频流
const streamUrl = await hikVisionService.getVideoStream('1', {
  width: 1920,
  height: 1080,
  fps: 30,
  quality: 'high',
});
```

### 4. PTZ 控制

```typescript
// 控制云台
await hikVisionService.controlPTZ('1', 'up', 1);
await hikVisionService.controlPTZ('1', 'left', 2);
await hikVisionService.controlPTZ('1', 'zoomIn', 1);
```

## 🎯 主要功能模块

### 视频流组件 (VideoStream)

- 实时视频流展示
- 摄像头切换
- 播放控制
- 全屏显示

### 数据图表组件 (DataChart)

- 访问量趋势图
- 告警数量统计
- 系统资源监控
- 实时数据更新

### 告警列表组件 (AlarmList)

- 实时告警显示
- 告警级别标识
- 告警处理状态
- 时间显示

### 摄像头网格组件 (CameraGrid)

- 摄像头状态展示
- 详细信息显示
- 快速操作按钮
- 状态指示器

## 🚀 部署说明

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

### 构建 Docker 镜像

```bash
docker build -t camera-monitor-dashboard .
docker run -p 3001:3001 camera-monitor-dashboard
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Ant Design](https://ant.design/) - UI 组件库
- [ECharts](https://echarts.apache.org/) - 图表库
- [海康威视](https://www.hikvision.com/) - 摄像头 SDK

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
