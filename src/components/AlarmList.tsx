'use client'

import React from 'react'
import { List, Tag, Space, Button, Tooltip } from 'antd'
import { 
  AlertOutlined, 
  UserOutlined, 
  CarOutlined, 
  VideoCameraOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { Alarm } from '@/data/mockData'
import styled from 'styled-components'

const StyledList = styled(List)`
  .ant-list-item {
    padding: 16px 0;
    border-bottom: 1px solid var(--border-light);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background: var(--bg-card-hover);
      border-radius: 6px;
      padding: 16px 12px;
      margin: 0 -12px;
    }
  }
  
  .ant-list-item-meta-title {
    color: var(--text-primary) !important;
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .ant-list-item-meta-description {
    color: var(--text-secondary) !important;
    font-size: 0.85rem;
    line-height: 1.4;
  }
  
  .ant-list-item-action {
    margin-left: 16px;
  }
`

const AlarmIcon = styled.div<{ level: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.level) {
      case 'critical': return 'rgba(255, 77, 79, 0.2)'
      case 'high': return 'rgba(250, 173, 20, 0.2)'
      case 'medium': return 'rgba(24, 144, 255, 0.2)'
      case 'low': return 'rgba(82, 196, 26, 0.2)'
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'critical': return '#ff4d4f'
      case 'high': return '#faad14'
      case 'medium': return '#1890ff'
      case 'low': return '#52c41a'
      default: return '#fff'
    }
  }};
  font-size: 1.3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => {
    switch (props.level) {
      case 'critical': return 'rgba(255, 77, 79, 0.3)'
      case 'high': return 'rgba(250, 173, 20, 0.3)'
      case 'medium': return 'rgba(24, 144, 255, 0.3)'
      case 'low': return 'rgba(82, 196, 26, 0.3)'
      default: return 'rgba(255, 255, 255, 0.2)'
    }
  }};
`

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.8rem;
  
  .anticon {
    color: var(--text-muted);
  }
`

const ActionButton = styled(Button)`
  color: #1890ff !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  height: auto !important;
  font-size: 0.85rem !important;
  
  &:hover {
    color: #40a9ff !important;
    background: transparent !important;
  }
  
  &:focus {
    color: #1890ff !important;
    background: transparent !important;
  }
`

const AlarmTag = styled(Tag)`
  background: transparent !important;
  border: 1px solid currentColor !important;
  color: inherit !important;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  padding: 2px 8px;
`

const StatusIcon = styled.div<{ status: string }>`
  color: ${props => props.status === 'active' ? '#faad14' : '#52c41a'};
  font-size: 1.1rem;
  background: transparent;
`

interface AlarmListProps {
  alarms: Alarm[]
}

const AlarmList: React.FC<AlarmListProps> = ({ alarms }) => {
  const getAlarmIcon = (type: string) => {
    switch (type) {
      case 'motion': return <AlertOutlined />
      case 'face': return <UserOutlined />
      case 'vehicle': return <CarOutlined />
      case 'system': return <VideoCameraOutlined />
      default: return <ExclamationCircleOutlined />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'blue'
      case 'low': return 'green'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <ExclamationCircleOutlined /> : 
      <CheckCircleOutlined />
  }

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}小时前`
    return date.toLocaleDateString()
  }

  return (
    <StyledList
      itemLayout="horizontal"
      dataSource={alarms}
      renderItem={(alarm) => {
        const alarmData = alarm as Alarm;
        return (
        <List.Item
          actions={[
            <Tooltip key="time" title={alarmData.time}>
              <TimeDisplay>
                <ClockCircleOutlined />
                <span>{formatTime(alarmData.time)}</span>
              </TimeDisplay>
            </Tooltip>,
            <Tooltip key="status" title={alarmData.status === 'active' ? '未处理' : '已处理'}>
              <StatusIcon status={alarmData.status}>
                {getStatusIcon(alarmData.status)}
              </StatusIcon>
            </Tooltip>,
            <ActionButton 
              key="action" 
              type="link" 
              size="small"
            >
              处理
            </ActionButton>
          ]}
        >
          <List.Item.Meta
            avatar={
              <AlarmIcon level={alarmData.level}>
                {getAlarmIcon(alarmData.type)}
              </AlarmIcon>
            }
            title={
              <Space>
                <span>{alarmData.message}</span>
                <AlarmTag color={getLevelColor(alarmData.level)}>
                  {alarmData.level}
                </AlarmTag>
              </Space>
            }
            description={
              <Space direction="vertical" size={2} style={{ width: '100%' }}>
                <span>摄像头: {alarmData.camera}</span>
                <span>类型: {alarmData.type}</span>
              </Space>
            }
          />
        </List.Item>
        );
      }}
    />
  )
}

export default AlarmList 