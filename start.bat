@echo off
echo 正在启动摄像头AI监控大屏系统...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到Node.js，请先安装Node.js 18+
    pause
    exit /b 1
)

REM 检查npm是否安装
npm --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到npm，请先安装npm
    pause
    exit /b 1
)

echo 正在安装依赖...
npm install

echo.
echo 正在启动开发服务器...
echo 访问地址: http://localhost:3001
echo 按 Ctrl+C 停止服务器
echo.

npm run dev 