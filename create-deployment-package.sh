#!/bin/bash

# 创建轻量级部署包脚本
# 使用方法: ./create-deployment-package.sh

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置
PACKAGE_NAME="camera-ai-monitor-deployment"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_DIR="${PACKAGE_NAME}-${TIMESTAMP}"

echo -e "${BLUE}🚀 创建轻量级部署包...${NC}"

# 创建部署包目录
mkdir -p "$PACKAGE_DIR"

echo "📁 复制核心源代码..."
# 复制源代码
cp -r src/ "$PACKAGE_DIR/"
cp -r public/ "$PACKAGE_DIR/" 2>/dev/null || mkdir -p "$PACKAGE_DIR/public"

echo "📋 复制配置文件..."
# 复制配置文件
cp package.json "$PACKAGE_DIR/"
cp package-lock.json "$PACKAGE_DIR/"
cp tsconfig.json "$PACKAGE_DIR/"
cp next.config.js "$PACKAGE_DIR/"
cp Dockerfile "$PACKAGE_DIR/"
cp docker-compose.yml "$PACKAGE_DIR/"
cp nginx.conf "$PACKAGE_DIR/"

echo "🔧 复制部署脚本..."
# 复制部署脚本
cp deploy.sh "$PACKAGE_DIR/"
cp monitor.sh "$PACKAGE_DIR/"
cp backup.sh "$PACKAGE_DIR/"
cp camera-ai-monitor.service "$PACKAGE_DIR/"

echo "📚 复制文档..."
# 复制文档
cp README.md "$PACKAGE_DIR/" 2>/dev/null || echo "# Camera AI Monitor Dashboard" > "$PACKAGE_DIR/README.md"
cp DEPLOYMENT.md "$PACKAGE_DIR/" 2>/dev/null || echo "# Deployment Guide" > "$PACKAGE_DIR/DEPLOYMENT.md"

echo "📝 创建部署说明..."
# 创建部署说明
cat > "$PACKAGE_DIR/DEPLOY_INSTRUCTIONS.md" << 'EOF'
# 🚀 快速部署说明

## 📋 部署前准备
1. 确保服务器已安装Docker和Docker Compose
2. 上传此文件夹到服务器
3. 给脚本执行权限

## 🚀 一键部署
```bash
# 进入部署目录
cd camera-ai-monitor-deployment-*

# 给脚本执行权限
chmod +x deploy.sh monitor.sh backup.sh

# 执行部署
./deploy.sh
```

## 📱 访问应用
- HTTP: http://your-server-ip
- HTTPS: https://your-server-ip

## 🔧 管理命令
- 查看状态: ./deploy.sh status
- 更新应用: ./deploy.sh update
- 系统监控: ./monitor.sh
- 数据备份: ./backup.sh

## ⚠️ 注意事项
- 首次部署会自动安装Docker等依赖
- 使用自签名SSL证书，生产环境请替换
- 建议定期运行备份脚本
EOF

echo "📦 创建生产环境package.json..."
# 创建生产环境package.json（移除开发依赖）
cat > "$PACKAGE_DIR/package.prod.json" << 'EOF'
{
  "name": "camera-ai-monitor-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.0.4",
    "antd": "^5.12.8",
    "@ant-design/icons": "^5.2.6",
    "styled-components": "^6.1.1",
    "echarts": "^5.4.3"
  },
  "devDependencies": {},
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

echo "🔒 设置权限..."
# 设置权限
chmod +x "$PACKAGE_DIR"/*.sh

echo "📊 计算包大小..."
# 计算包大小
PACKAGE_SIZE=$(du -sh "$PACKAGE_DIR" | cut -f1)

echo "📦 创建压缩包..."
# 创建压缩包
tar czf "${PACKAGE_DIR}.tar.gz" "$PACKAGE_DIR"

# 清理临时目录
rm -rf "$PACKAGE_DIR"

echo -e "${GREEN}✅ 部署包创建完成！${NC}"
echo "📦 文件名: ${PACKAGE_DIR}.tar.gz"
echo "📏 包大小: $PACKAGE_SIZE"
echo ""
echo "🚀 现在你可以："
echo "1. 将 ${PACKAGE_DIR}.tar.gz 上传到服务器"
echo "2. 在服务器上解压: tar xzf ${PACKAGE_DIR}.tar.gz"
echo "3. 进入目录执行: ./deploy.sh"
