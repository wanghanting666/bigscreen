#!/bin/bash

echo "正在启动摄像头AI监控大屏系统..."
echo

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到Node.js，请先安装Node.js 18+"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "错误: 未找到npm，请先安装npm"
    exit 1
fi

echo "正在安装依赖..."
npm install

echo
echo "正在启动开发服务器..."
echo "访问地址: http://localhost:3001"
echo "按 Ctrl+C 停止服务器"
echo

npm run dev 