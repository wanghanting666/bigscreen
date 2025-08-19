'use client'

import React, { useState, useEffect } from 'react'
import { Button, Space, Tag, Tooltip, Switch } from 'antd'
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  FullscreenOutlined,
  VideoCameraOutlined,
  SettingOutlined
} from '@ant-design/icons'
import styled from 'styled-components'

// 主色调定义
const PRIMARY_COLOR = '#1890ff'
const PRIMARY_LIGHT = '#40a9ff'
const SUCCESS_COLOR = '#52c41a'
const WARNING_COLOR = '#faad14'
const ERROR_COLOR = '#ff4d4f'

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(45deg, var(--bg-primary), var(--bg-secondary));
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
`

const MultiViewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: var(--bg-primary);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  padding: 2px;
`

const VideoCell = styled.div<{ active?: boolean }>`
  background: var(--bg-card);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${props => props.active ? PRIMARY_COLOR : 'transparent'};
  position: relative;
  
  &:hover {
    background: var(--bg-card-hover);
    transform: scale(1.02);
  }
  
  .camera-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
    color: var(--text-primary);
  }
  
  .camera-name {
    font-size: 0.9rem;
    color: var(--text-primary);
    text-align: center;
    font-weight: 500;
    line-height: 1.2;
    padding: 0 6px;
  }
  
  .camera-status {
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 0.6rem;
  }
`

const VideoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.2rem;
  text-align: center;
  
  .anticon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${PRIMARY_COLOR};
  }
  
  .camera-name {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: var(--text-primary);
    font-weight: 500;
  }
  
  .camera-info {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
  }
`

const VideoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MultiViewSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  
  .switch-label {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.9rem;
  }
`

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 1rem;
`

const CameraThumbnail = styled.div<{ active?: boolean }>`
  height: 90px;
  background: ${props => props.active ? `rgba(24, 144, 255, 0.2)` : 'var(--bg-card)'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${props => props.active ? PRIMARY_COLOR : 'transparent'};
  
  &:hover {
    background: rgba(24, 144, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .camera-content {
    text-align: center;
    color: var(--text-primary);
  }
  
  .camera-icon {
    font-size: 1.5rem;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  
  .camera-name {
    font-size: 0.7rem;
    color: var(--text-primary);
    margin-bottom: 4px;
    font-weight: 500;
  }
  
  .camera-status {
    font-size: 0.6rem;
  }
`

const ControlButton = styled(Button)`
  color: var(--text-primary) !important;
  border: none !important;
  background: transparent !important;
  
  &:hover {
    background: rgba(24, 144, 255, 0.1) !important;
    color: var(--text-primary) !important;
  }
  
  &:focus {
    background: transparent !important;
    color: var(--text-primary) !important;
  }
`

const StatusTag = styled(Tag)`
  background: transparent !important;
  border: 1px solid currentColor !important;
  color: inherit !important;
`

interface VideoStreamProps {
  selectedCameraId?: string
  onCameraChange?: (cameraId: string) => void
}

const VideoStream: React.FC<VideoStreamProps> = ({ selectedCameraId, onCameraChange }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedCamera, setSelectedCamera] = useState(selectedCameraId || '1')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMultiView, setIsMultiView] = useState(false)

  // 当外部传入的selectedCameraId变化时，更新内部状态
  useEffect(() => {
    if (selectedCameraId && selectedCameraId !== selectedCamera) {
      setSelectedCamera(selectedCameraId)
    }
  }, [selectedCameraId, selectedCamera])

  const cameras = [
    { id: '1', name: '前门摄像头', status: 'online' },
    { id: '2', name: '大厅摄像头', status: 'online' },
    { id: '3', name: '停车场摄像头', status: 'online' },
    { id: '4', name: '后门摄像头', status: 'offline' },
    { id: '5', name: '走廊摄像头', status: 'online' },
    { id: '6', name: '电梯摄像头', status: 'online' },
    { id: '7', name: '办公室摄像头', status: 'error' },
    { id: '8', name: '仓库摄像头', status: 'online' },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleCameraChange = (cameraId: string) => {
    setSelectedCamera(cameraId)
    if (onCameraChange) {
      onCameraChange(cameraId)
    }
  }

  const handleMultiViewToggle = (checked: boolean) => {
    setIsMultiView(checked)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return SUCCESS_COLOR
      case 'offline': return ERROR_COLOR
      case 'error': return WARNING_COLOR
      default: return 'default'
    }
  }

  return (
    <div>
      {/* 多画面切换开关 */}
      <MultiViewSwitch className="multi-view-switch">
        <span className="switch-label">多画面模式</span>
        <Switch 
          checked={isMultiView} 
          onChange={handleMultiViewToggle}
          size="small"
        />
      </MultiViewSwitch>

      {/* 视频显示区域 */}
      {isMultiView ? (
        <MultiViewContainer>
          {cameras.slice(0, 8).map(camera => (
            <VideoCell
              key={camera.id}
              active={selectedCamera === camera.id}
              onClick={() => handleCameraChange(camera.id)}
            >
              <VideoCameraOutlined className="camera-icon" />
              <div className="camera-name">{camera.name}</div>
              <StatusTag 
                color={getStatusColor(camera.status)} 
                className="camera-status"
              >
                {camera.status}
              </StatusTag>
            </VideoCell>
          ))}
        </MultiViewContainer>
      ) : (
        <VideoContainer>
          <VideoPlaceholder>
            <VideoCameraOutlined />
            <div>实时视频流</div>
            <div className="camera-name">
              {cameras.find(c => c.id === selectedCamera)?.name}
            </div>
            <div className="camera-info">
              1920x1080 @ 30fps
            </div>
          </VideoPlaceholder>
          
          <VideoControls>
            <Space>
              <ControlButton 
                type="text" 
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={handlePlayPause}
              />
            </Space>
            
            <Space>
              <Tooltip title="设置">
                <ControlButton 
                  type="text" 
                  icon={<SettingOutlined />}
                />
              </Tooltip>
              <Tooltip title="全屏">
                <ControlButton 
                  type="text" 
                  icon={<FullscreenOutlined />}
                  onClick={handleFullscreen}
                />
              </Tooltip>
            </Space>
          </VideoControls>
        </VideoContainer>
      )}

      {/* 摄像头缩略图网格 - 只在单画面模式下显示 */}
      {!isMultiView && (
        <CameraGrid>
          {cameras.map(camera => (
            <Tooltip key={camera.id} title={camera.name}>
              <CameraThumbnail 
                active={selectedCamera === camera.id}
                onClick={() => handleCameraChange(camera.id)}
              >
                <div className="camera-content">
                  <VideoCameraOutlined className="camera-icon" />
                  <div className="camera-name">{camera.name}</div>
                  <StatusTag color={getStatusColor(camera.status)} className="camera-status">
                    {camera.status}
                  </StatusTag>
                </div>
              </CameraThumbnail>
            </Tooltip>
          ))}
        </CameraGrid>
      )}
    </div>
  )
}

export default VideoStream 