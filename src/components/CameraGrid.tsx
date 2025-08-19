'use client'

import React, { useState } from 'react'
import { Row, Col, Card, Tag, Progress, Tooltip, Button, Space, Modal, Switch, Radio, Form, message } from 'antd'
import { 
  VideoCameraOutlined, 
  EyeOutlined, 
  SettingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Camera } from '@/data/mockData'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  transition: all 0.3s;
  box-shadow: 0 1px 3px var(--shadow-light), 0 1px 2px var(--shadow-color);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px var(--shadow-medium), 0 2px 4px var(--shadow-color);
    border-color: var(--border-color);
  }
  
  .ant-card-head {
    border-bottom: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 12px 16px;
  }
  
  .ant-card-body {
    color: var(--text-primary);
    padding: 16px;
  }
  
  .ant-card-actions {
    background: var(--bg-card-hover) !important;
    border-top: 1px solid var(--border-light);
  }
  
  .ant-card-actions > li {
    border-right: 1px solid var(--border-light);
    background: transparent !important;
    
    &:hover {
      background: rgba(24, 144, 255, 0.1) !important;
    }
  }
  
  .ant-card-actions > li:last-child {
    border-right: none;
  }
`

const CameraIcon = styled.div<{ status: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.status) {
      case 'online': return 'rgba(82, 196, 26, 0.2)'
      case 'offline': return 'rgba(255, 77, 79, 0.2)'
      case 'error': return 'rgba(250, 173, 20, 0.2)'
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'online': return '#52c41a'
      case 'offline': return '#ff4d4f'
      case 'error': return '#faad14'
      default: return '#fff'
    }
  }};
  font-size: 1.6rem;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => {
    switch (props.status) {
      case 'online': return 'rgba(82, 196, 26, 0.3)'
      case 'offline': return 'rgba(255, 77, 79, 0.3)'
      case 'error': return 'rgba(250, 173, 20, 0.3)'
      default: return 'rgba(255, 255, 255, 0.2)'
    }
  }};
`

const StatusIndicator = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'online': return '#52c41a'
      case 'offline': return '#ff4d4f'
      case 'error': return '#faad14'
      default: return '#d9d9d9'
    }
  }};
  display: inline-block;
  margin-right: 8px;
  box-shadow: 0 0 4px currentColor;
`

const CameraInfo = styled.div`
  text-align: center;
  color: var(--text-primary);
  
  .camera-title {
    color: var(--text-primary);
    margin: 0 0 6px 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .camera-location {
    color: var(--text-secondary);
    margin: 0 0 16px 0;
    font-size: 0.85rem;
  }
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  .label {
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
  
  .value {
    color: var(--text-primary);
    font-size: 0.85rem;
    font-weight: 500;
  }
`

const CameraTag = styled(Tag)`
  background: transparent !important;
  border: 1px solid currentColor !important;
  color: inherit !important;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  padding: 2px 8px;
  margin: 0;
`

const ActionIcon = styled.div`
  color: var(--primary-color);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  &:hover {
    color: var(--primary-light);
    transform: scale(1.1);
    background: transparent !important;
  }
  
  &:focus {
    color: var(--primary-color);
    background: transparent !important;
  }
`

interface CameraGridProps {
  cameras: Camera[]
  onCameraView?: (camera: Camera) => void
  onCameraUpdate?: (cameraId: string, updates: Partial<Camera>) => void
}

const CameraGrid: React.FC<CameraGridProps> = ({ cameras, onCameraView, onCameraUpdate }) => {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [form] = Form.useForm()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircleOutlined />
      case 'offline': return <CloseCircleOutlined />
      case 'error': return <ExclamationCircleOutlined />
      default: return <VideoCameraOutlined />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green'
      case 'offline': return 'red'
      case 'error': return 'orange'
      default: return 'default'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ip': return 'blue'
      case 'analog': return 'purple'
      case 'ptz': return 'cyan'
      default: return 'default'
    }
  }

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr)
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const handleViewCamera = (camera: Camera) => {
    if (onCameraView) {
      onCameraView(camera)
    }
  }

  const handleSettingsClick = (camera: Camera) => {
    setSelectedCamera(camera)
    form.setFieldsValue({
      status: camera.status === 'online',
      fps: camera.fps
    })
    setIsSettingsModalVisible(true)
  }

  const handleSettingsOk = async () => {
    try {
      const values = await form.validateFields()
      if (selectedCamera && onCameraUpdate) {
        const updates: Partial<Camera> = {
          status: values.status ? 'online' : 'offline',
          fps: values.fps
        }
        onCameraUpdate(selectedCamera.id, updates)
        message.success('设置已更新')
        setIsSettingsModalVisible(false)
        setSelectedCamera(null)
      }
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const handleSettingsCancel = () => {
    setIsSettingsModalVisible(false)
    setSelectedCamera(null)
    form.resetFields()
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        {cameras.map(camera => (
          <Col xs={24} sm={12} md={8} lg={6} key={camera.id}>
            <StyledCard
              hoverable
              actions={[
                <Tooltip key="view" title="查看">
                  <ActionIcon onClick={() => handleViewCamera(camera)}>
                    <EyeOutlined />
                  </ActionIcon>
                </Tooltip>,
                <Tooltip key="settings" title="设置">
                  <ActionIcon onClick={() => handleSettingsClick(camera)}>
                    <SettingOutlined />
                  </ActionIcon>
                </Tooltip>
              ]}
            >
              <div style={{ textAlign: 'center' }}>
                <CameraIcon status={camera.status}>
                  {getStatusIcon(camera.status)}
                </CameraIcon>
                
                <CameraInfo>
                  <h4 className="camera-title">
                    {camera.name}
                  </h4>
                  <p className="camera-location">
                    {camera.location}
                  </p>
                </CameraInfo>

                <div>
                  <InfoRow>
                    <span className="label">状态:</span>
                    <CameraTag color={getStatusColor(camera.status)}>
                      <StatusIndicator status={camera.status} />
                      {camera.status}
                    </CameraTag>
                  </InfoRow>
                  
                  <InfoRow>
                    <span className="label">类型:</span>
                    <CameraTag color={getTypeColor(camera.type)}>
                      {camera.type.toUpperCase()}
                    </CameraTag>
                  </InfoRow>
                  
                  <InfoRow>
                    <span className="label">分辨率:</span>
                    <span className="value">
                      {camera.resolution}
                    </span>
                  </InfoRow>
                  
                  <InfoRow>
                    <span className="label">帧率:</span>
                    <span className="value">
                      {camera.fps} FPS
                    </span>
                  </InfoRow>
                  
                  <InfoRow>
                    <span className="label">更新时间:</span>
                    <span className="value">
                      {formatTime(camera.lastUpdate)}
                    </span>
                  </InfoRow>
                </div>
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>

      {/* 设置弹窗 */}
      <Modal
        title={`摄像头设置 - ${selectedCamera?.name}`}
        open={isSettingsModalVisible}
        onOk={handleSettingsOk}
        onCancel={handleSettingsCancel}
        okText="保存"
        cancelText="取消"
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="摄像头状态"
            name="status"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="在线"
              unCheckedChildren="离线"
              style={{ width: 80 }}
            />
          </Form.Item>

          <Form.Item
            label="帧率设置"
            name="fps"
            rules={[{ required: true, message: '请选择帧率' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={20}>20 FPS</Radio>
                <Radio value={25}>25 FPS</Radio>
                <Radio value={30}>30 FPS</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <div 
            className="camera-info-section"
            style={{ 
              padding: '16px', 
              borderRadius: '6px',
              marginTop: '16px'
            }}
          >
            <div style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.9rem',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              当前设置信息：
            </div>
            <div style={{ 
              color: 'var(--text-primary)',
              lineHeight: '1.6'
            }}>
              <div>摄像头名称：{selectedCamera?.name}</div>
              <div>位置：{selectedCamera?.location}</div>
              <div>类型：{selectedCamera?.type?.toUpperCase()}</div>
              <div>分辨率：{selectedCamera?.resolution}</div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default CameraGrid 