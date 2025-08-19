'use client'

import React, { useState } from 'react'
import { Layout, Row, Col, Card, Statistic, Progress, Tag, Space, Menu } from 'antd'
import { 
  VideoCameraOutlined, 
  EyeOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import VideoStream from '@/components/VideoStream'
import DataChart from '@/components/DataChart'
import AlarmList from '@/components/AlarmList'
import CameraGrid from '@/components/CameraGrid'
import ThemeToggle from '@/components/ThemeToggle'
import { mockData } from '@/data/mockData'
import { useTheme } from '@/contexts/ThemeContext'
import styled from 'styled-components'
import type { Camera } from '@/data/mockData'

const { Header, Content, Sider } = Layout

// 主色调定义
const PRIMARY_COLOR = '#1890ff'
const PRIMARY_LIGHT = '#40a9ff'
const PRIMARY_DARK = '#096dd9'
const SUCCESS_COLOR = '#52c41a'
const WARNING_COLOR = '#faad14'
const ERROR_COLOR = '#ff4d4f'

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: var(--bg-primary);
`

const StyledHeader = styled(Header)`
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)' 
    : 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)'};
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 80px;
`

const StyledSider = styled(Sider)`
  background: var(--bg-secondary) !important;
  border-right: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow: 1px 0 3px var(--shadow-light);
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  
  .ant-menu {
    background: transparent !important;
    border-right: none !important;
    flex: 1;
  }
  
  .ant-menu-item {
    color: var(--text-secondary) !important;
    border-right: none !important;
    margin: 4px 8px !important;
    border-radius: 6px !important;
    
    &:hover {
      background: rgba(24, 144, 255, 0.15) !important;
      color: var(--text-primary) !important;
    }
    
    &.ant-menu-item-selected {
      background: rgba(24, 144, 255, 0.25) !important;
      color: var(--text-primary) !important;
      border-right: 3px solid ${PRIMARY_COLOR} !important;
      box-shadow: 0 1px 3px var(--shadow-light);
    }
  }
  
  .ant-menu-item-icon {
    color: inherit !important;
  }
`

const StyledContent = styled(Content)`
  padding: 1.5rem;
  background: var(--bg-primary);
  min-height: calc(100vh - 80px);
`

const StyledCard = styled(Card)`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  box-shadow: 0 1px 3px var(--shadow-light), 0 1px 2px var(--shadow-color);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px var(--shadow-medium), 0 2px 4px var(--shadow-color);
    transform: translateY(-1px);
  }
  
  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 16px 20px;
  }
  
  .ant-card-head-title {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .ant-card-body {
    color: var(--text-primary);
    padding: 20px;
  }
`

const Title = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const StatisticWrapper = styled.div`
  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
  
  .ant-statistic-content {
    color: #fff !important;
    font-size: 1.5rem;
    font-weight: 600;
  }
`

const ProgressWrapper = styled.div`
  margin-bottom: 16px;
  
  .progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .progress-value {
    color: var(--text-primary);
    font-weight: 600;
  }
  
  .ant-progress-text {
    color: var(--text-primary) !important;
    font-weight: 600;
  }
`

const QuickActionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
  
  .action-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .action-icon {
    color: ${SUCCESS_COLOR};
    font-size: 1.1rem;
  }
`

const WhiteStatusTag = styled(Tag)`
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary) !important;
  font-weight: 500;
`

const SidebarHeader = styled.div`
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-light);
  text-align: center;
  
  .sidebar-title {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
  
  .sidebar-subtitle {
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-top: 4px;
  }
`

export default function Dashboard() {
  const { statistics, alarms, cameras: initialCameras } = mockData
  const [selectedMenu, setSelectedMenu] = useState('monitor')
  const [selectedCameraId, setSelectedCameraId] = useState('1')
  const [cameras, setCameras] = useState(initialCameras)
  const { theme } = useTheme()

  const menuItems = [
    {
      key: 'monitor',
      icon: <VideoCameraOutlined />,
      label: '实时监控',
    },
    {
      key: 'analysis',
      icon: <BarChartOutlined />,
      label: '智能分析',
    },
    {
      key: 'visualization',
      icon: <DashboardOutlined />,
      label: '数据可视化',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedMenu(key)
  }

  const handleCameraView = (camera: Camera) => {
    // 设置选中的摄像头
    setSelectedCameraId(camera.id)
    
    // 回到顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleCameraChange = (cameraId: string) => {
    setSelectedCameraId(cameraId)
  }

  const handleCameraUpdate = (cameraId: string, updates: Partial<Camera>) => {
    setCameras(prevCameras => 
      prevCameras.map(camera => 
        camera.id === cameraId 
          ? { 
              ...camera, 
              ...updates, 
              lastUpdate: new Date().toLocaleString('zh-CN') 
            }
          : camera
      )
    )
  }

  return (
    <StyledLayout>
      <StyledHeader theme={theme}>
        <div>
          <Title>摄像头AI监控大屏系统</Title>
        </div>
        <Space size="large">
          <StatisticWrapper>
            <Statistic 
              title="在线摄像头" 
              value={statistics.onlineCameras} 
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: SUCCESS_COLOR }}
            />
          </StatisticWrapper>
          <StatisticWrapper>
            <Statistic 
              title="今日访问" 
              value={statistics.todayVisits} 
              prefix={<EyeOutlined />}
              valueStyle={{ color: PRIMARY_COLOR }}
            />
          </StatisticWrapper>
          <StatisticWrapper>
            <Statistic 
              title="告警数量" 
              value={statistics.alarmCount} 
              prefix={<AlertOutlined />}
              valueStyle={{ color: WARNING_COLOR }}
            />
          </StatisticWrapper>
          <ThemeToggle />
        </Space>
      </StyledHeader>

      <Layout>
        <StyledSider width={200}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>AI监控系统</h2>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedMenu]}
            onSelect={({ key }) => setSelectedMenu(key)}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="monitor" icon={<VideoCameraOutlined />}>
              实时监控
            </Menu.Item>
            <Menu.Item key="alarms" icon={<AlertOutlined />}>
              告警管理
            </Menu.Item>
            <Menu.Item key="statistics" icon={<BarChartOutlined />}>
              统计报表
            </Menu.Item>
            <Menu.Item key="data" icon={<DatabaseOutlined />}>
              数据可视化
            </Menu.Item>
          </Menu>
        </StyledSider>

        <StyledContent>
          {selectedMenu === 'monitor' && (
            <Row gutter={[20, 20]}>
              {/* 主要视频流区域 */}
              <Col xs={24} lg={16}>
                <StyledCard title="实时监控" extra={<WhiteStatusTag>在线</WhiteStatusTag>}>
                  <VideoStream 
                    selectedCameraId={selectedCameraId}
                    onCameraChange={handleCameraChange}
                  />
                </StyledCard>
              </Col>

              {/* 右侧统计面板 */}
              <Col xs={24} lg={8}>
                <Row gutter={[0, 20]}>
                  <Col span={24}>
                    <StyledCard title="系统状态">
                      <ProgressWrapper>
                        <div className="progress-label">
                          <span>CPU使用率</span>
                          <span className="progress-value">{statistics.cpuUsage}%</span>
                        </div>
                        <Progress percent={statistics.cpuUsage} strokeColor={PRIMARY_COLOR} />
                      </ProgressWrapper>
                      <ProgressWrapper>
                        <div className="progress-label">
                          <span>内存使用率</span>
                          <span className="progress-value">{statistics.memoryUsage}%</span>
                        </div>
                        <Progress percent={statistics.memoryUsage} strokeColor={SUCCESS_COLOR} />
                      </ProgressWrapper>
                      <ProgressWrapper>
                        <div className="progress-label">
                          <span>存储使用率</span>
                          <span className="progress-value">{statistics.storageUsage}%</span>
                        </div>
                        <Progress percent={statistics.storageUsage} strokeColor={WARNING_COLOR} />
                      </ProgressWrapper>
                    </StyledCard>
                  </Col>
                  
                  <Col span={24}>
                    <StyledCard title="快速操作">
                      <QuickActionItem>
                        <span className="action-label">系统时间</span>
                        <ClockCircleOutlined className="action-icon" />
                      </QuickActionItem>
                      <QuickActionItem>
                        <span className="action-label">在线用户</span>
                        <UserOutlined className="action-icon" />
                      </QuickActionItem>
                      <QuickActionItem>
                        <span className="action-label">系统状态</span>
                        <CheckCircleOutlined className="action-icon" />
                      </QuickActionItem>
                    </StyledCard>
                  </Col>
                </Row>
              </Col>

              {/* 数据图表区域 */}
              <Col xs={24} lg={12}>
                <StyledCard title="监控数据趋势">
                  <DataChart 
                    type="line"
                    data={[
                      { time: '00:00', value: 820 },
                      { time: '04:00', value: 932 },
                      { time: '08:00', value: 901 },
                      { time: '12:00', value: 934 },
                      { time: '16:00', value: 1290 },
                      { time: '20:00', value: 1330 },
                      { time: '24:00', value: 1320 }
                    ]}
                    config={{
                      xField: 'time',
                      yField: 'value',
                      smooth: true
                    }}
                  />
                </StyledCard>
              </Col>

              {/* 告警列表 */}
              <Col xs={24} lg={12}>
                <StyledCard title="实时告警" extra={<WhiteStatusTag>{alarms.length}条</WhiteStatusTag>}>
                  <AlarmList alarms={alarms} />
                </StyledCard>
              </Col>

              {/* 摄像头网格 */}
              <Col span={24}>
                <StyledCard title="摄像头状态">
                  <CameraGrid 
                    cameras={cameras} 
                    onCameraView={handleCameraView}
                    onCameraUpdate={handleCameraUpdate}
                  />
                </StyledCard>
              </Col>
            </Row>
          )}

          {selectedMenu === 'alarms' && (
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <StyledCard title="告警管理">
                  <AlarmList alarms={alarms} />
                </StyledCard>
              </Col>
            </Row>
          )}

          {selectedMenu === 'statistics' && (
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <StyledCard title="统计报表">
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    统计报表功能开发中...
                  </div>
                </StyledCard>
              </Col>
            </Row>
          )}

          {selectedMenu === 'data' && (
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <iframe 
                  src="/data" 
                  style={{ 
                    width: '100%', 
                    height: 'calc(100vh - 200px)', 
                    border: 'none',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }} 
                />
              </Col>
            </Row>
          )}
        </StyledContent>
      </Layout>
    </StyledLayout>
  )
} 