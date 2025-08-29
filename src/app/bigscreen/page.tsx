'use client'

import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Tag, Typography } from 'antd'
import DataChart from '@/components/DataChart'
import styled from 'styled-components'

const { Text } = Typography

// 神盾局风格的大屏容器
const BigScreenContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 150, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 200, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 150, 0, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(90deg, transparent 98%, rgba(0, 150, 255, 0.3) 100%),
      linear-gradient(0deg, transparent 98%, rgba(0, 150, 255, 0.3) 100%);
    background-size: 50px 50px;
    opacity: 0.1;
    pointer-events: none;
  }
`

// 神盾局风格的头部
const ShieldHeader = styled.div`
  background: linear-gradient(90deg, #001529 0%, #003a70 50%, #001529 100%);
  border-bottom: 2px solid #00a6ff;
  padding: 15px 40px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 166, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00a6ff, transparent);
    animation: scan 4s ease-in-out infinite;
  }
  
  @keyframes scan {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
`

// 神盾局风格的标题
const ShieldTitle = styled.h1`
  color: #00a6ff;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 166, 255, 0.5);
  font-family: 'Orbitron', monospace;
  letter-spacing: 2px;
  
  &::before {
    content: '🛡️';
    margin-right: 15px;
    animation: pulse 3s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`

// 神盾局风格的数据卡片
const ShieldCard = styled(Card)`
  background: rgba(0, 21, 41, 0.8);
  border: 1px solid #00a6ff;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 166, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00a6ff, #00d4ff, #00a6ff);
    animation: flow 4s ease-in-out infinite;
  }
  
  @keyframes flow {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(0, 166, 255, 0.3);
    border-color: #00d4ff;
  }
  
  .ant-card-head {
    background: rgba(0, 166, 255, 0.1);
    border-bottom: 1px solid #00a6ff;
    color: #00a6ff;
  }
  
  .ant-card-head-title {
    color: #00a6ff;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .ant-card-body {
    color: #e6f7ff;
    padding: 15px;
  }
`

// 神盾局风格的标签
const ShieldTag = styled(Tag)`
  background: rgba(0, 166, 255, 0.2) !important;
  border: 1px solid #00a6ff !important;
  color: #00a6ff !important;
  font-weight: 500;
  border-radius: 6px;
  
  &:hover {
    background: rgba(0, 166, 255, 0.3) !important;
    border-color: #00d4ff !important;
  }
`

// 浦东新区地图容器
const MapContainer = styled.div`
  background: rgba(0, 21, 41, 0.6);
  border: 2px solid #00a6ff;
  border-radius: 12px;
  padding: 20px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00a6ff, #00d4ff, #00a6ff);
    animation: flow 4s ease-in-out infinite;
  }
`

const MapTitle = styled.h2`
  color: #00a6ff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 20px 0;
  text-shadow: 0 0 10px rgba(0, 166, 255, 0.5);
`

const MapContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 166, 255, 0.1), rgba(0, 212, 255, 0.1));
  border: 2px dashed #00a6ff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00a6ff;
  font-size: 1.2rem;
  text-align: center;
  
  .map-icon {
    font-size: 4rem;
    margin-bottom: 15px;
    opacity: 0.7;
  }
  
  .map-text {
    margin-bottom: 10px;
  }
  
  .map-subtext {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`

// 统计数字卡片
const StatCard = styled.div`
  background: rgba(0, 21, 41, 0.8);
  border: 1px solid #00a6ff;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00a6ff, #00d4ff, #00a6ff);
    animation: flow 4s ease-in-out infinite;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #00a6ff;
    margin-bottom: 5px;
    text-shadow: 0 0 10px rgba(0, 166, 255, 0.5);
  }
  
  .stat-label {
    color: #8bb8ff;
    font-size: 0.9rem;
  }
`

export default function BigScreen() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // 浦东新区街道数据
  const streetData = [
    { name: '陆家嘴街道', value: 95, color: '#00a6ff' },
    { name: '花木街道', value: 88, color: '#00d4ff' },
    { name: '金桥街道', value: 92, color: '#52c41a' },
    { name: '张江街道', value: 96, color: '#faad14' },
    { name: '川沙街道', value: 85, color: '#ff4d4f' },
    { name: '高桥街道', value: 89, color: '#722ed1' },
    { name: '北蔡街道', value: 87, color: '#13c2c2' },
    { name: '合庆街道', value: 83, color: '#eb2f96' }
  ]

  // 经济数据
  const economicData = [
    { year: '2019', gdp: 12734, revenue: 4567 },
    { year: '2020', gdp: 13256, revenue: 4892 },
    { year: '2021', gdp: 14321, revenue: 5234 },
    { year: '2022', gdp: 15123, revenue: 5678 },
    { year: '2023', gdp: 16234, revenue: 6123 }
  ]

  // 人口分布数据
  const populationData = [
    { age: '0-18岁', value: 156789, percentage: 18.5 },
    { age: '19-35岁', value: 234567, percentage: 27.6 },
    { age: '36-60岁', value: 298765, percentage: 35.2 },
    { age: '60岁以上', value: 159876, percentage: 18.7 }
  ]

  // 产业分布数据
  const industryData = [
    { industry: '金融业', value: 35, color: '#00a6ff' },
    { industry: '制造业', value: 28, color: '#52c41a' },
    { industry: '服务业', value: 22, color: '#faad14' },
    { industry: '科技业', value: 15, color: '#722ed1' }
  ]

  // 使用 useMemo 缓存数据，避免重复创建
  const memoizedStreetData = React.useMemo(() => streetData, [])
  const memoizedEconomicData = React.useMemo(() => economicData, [])
  const memoizedPopulationData = React.useMemo(() => populationData, [])
  const memoizedIndustryData = React.useMemo(() => industryData, [])

  // 缓存配置对象，避免重复创建
  const chartConfigs = React.useMemo(() => ({
    economic: {
      xField: 'year',
      yField: 'revenue',
      seriesField: 'type',
      yAxis: { min: 4000, max: 7000 }
    },
    population: {
      angleField: 'percentage',
      colorField: 'age',
      radius: 0.8
    },
    street: {
      xField: 'name',
      yField: 'value',
      seriesField: 'street',
      yAxis: { min: 80, max: 100 }
    },
    industry: {
      xField: 'industry',
      yField: 'value',
      seriesField: 'sector',
      yAxis: { min: 0, max: 40 }
    }
  }), [])

  // 更新时间 - 使用 useCallback 优化
  const updateTime = React.useCallback(() => {
    setCurrentTime(new Date())
  }, [])

  useEffect(() => {
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [updateTime])

  return (
    <BigScreenContainer>
      {/* 神盾局风格头部 */}
      <ShieldHeader>
        <ShieldTitle>浦东新区智能监控大屏</ShieldTitle>
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <Text style={{ color: '#8bb8ff', fontSize: '0.9rem' }}>
            {currentTime.toLocaleString('zh-CN')} | 系统状态: 在线 | 监控覆盖: 98.5%
          </Text>
        </div>
      </ShieldHeader>

      <div style={{ padding: '15px 30px', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
        <Row gutter={[15, 15]} style={{ height: '100%' }}>
          {/* 左侧统计面板 */}
          <Col xs={24} lg={6} style={{ height: '100%' }}>
            <Row gutter={[0, 15]} style={{ height: '100%' }}>
              {/* 核心指标 */}
              <Col span={24} style={{ height: '25%' }}>
                <ShieldCard title="核心指标" extra={<ShieldTag>实时</ShieldTag>}>
                  <Row gutter={[0, 10]}>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">16234</div>
                        <div className="stat-label">GDP(亿元)</div>
                      </StatCard>
                    </Col>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">6.7%</div>
                        <div className="stat-label">增长率</div>
                      </StatCard>
                    </Col>
                  </Row>
                </ShieldCard>
              </Col>

              {/* 财政收入趋势 */}
              <Col span={24} style={{ height: '35%' }}>
                <ShieldCard title="财政收入趋势" extra={<ShieldTag>上升</ShieldTag>}>
                  <DataChart
                    type="line"
                    data={memoizedEconomicData}
                    config={chartConfigs.economic}
                  />
                </ShieldCard>
              </Col>

              {/* 人口年龄分布 */}
              <Col span={24} style={{ height: '40%' }}>
                <ShieldCard title="人口年龄分布" extra={<ShieldTag>分析</ShieldTag>}>
                  <DataChart
                    type="pie"
                    data={memoizedPopulationData}
                    config={chartConfigs.population}
                  />
                </ShieldCard>
              </Col>
            </Row>
          </Col>

          {/* 中间地图区域 */}
          <Col xs={24} lg={12} style={{ height: '100%' }}>
            <MapContainer>
              <MapTitle>浦东新区街道分布图</MapTitle>
              <MapContent>
                <MapPlaceholder>
                  <div className="map-icon">🗺️</div>
                  <div className="map-text">浦东新区地图</div>
                  <div className="map-subtext">按街道划分的智能监控区域</div>
                  <div className="map-subtext">陆家嘴、花木、金桥、张江等8个街道</div>
                </MapPlaceholder>
              </MapContent>
            </MapContainer>
          </Col>

          {/* 右侧统计面板 */}
          <Col xs={24} lg={6} style={{ height: '100%' }}>
            <Row gutter={[0, 15]} style={{ height: '100%' }}>
              {/* 街道监控状态 */}
              <Col span={24} style={{ height: '30%' }}>
                <ShieldCard title="街道监控状态" extra={<ShieldTag>活跃</ShieldTag>}>
                  <DataChart
                    type="column"
                    data={memoizedStreetData}
                    config={chartConfigs.street}
                  />
                </ShieldCard>
              </Col>

              {/* 产业分布雷达图 */}
              <Col span={24} style={{ height: '35%' }}>
                <ShieldCard title="产业分布雷达图" extra={<ShieldTag>全面</ShieldTag>}>
                  <DataChart
                    type="area"
                    data={memoizedIndustryData}
                    config={chartConfigs.industry}
                  />
                </ShieldCard>
              </Col>

              {/* 实时监控数据 */}
              <Col span={24} style={{ height: '35%' }}>
                <ShieldCard title="实时监控数据" extra={<ShieldTag>在线</ShieldTag>}>
                  <Row gutter={[0, 10]}>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">1,234</div>
                        <div className="stat-label">监控点位</div>
                      </StatCard>
                    </Col>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">98.5%</div>
                        <div className="stat-label">在线率</div>
                      </StatCard>
                    </Col>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">567</div>
                        <div className="stat-label">AI识别</div>
                      </StatCard>
                    </Col>
                    <Col span={12}>
                      <StatCard>
                        <div className="stat-value">89</div>
                        <div className="stat-label">预警事件</div>
                      </StatCard>
                    </Col>
                  </Row>
                </ShieldCard>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </BigScreenContainer>
  )
}
