import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '摄像头AI监控大屏系统',
  description: '专业的摄像头监控管理系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <ConfigProvider
              locale={zhCN}
              theme={{
                token: {
                  colorPrimary: '#1890ff',
                  borderRadius: 6,
                },
              }}
            >
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
} 