'use client'

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import styled from 'styled-components'

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background: transparent;
`

interface DataChartProps {
  type: 'line' | 'pie' | 'column' | 'area'
  data: any[]
  config: any
}

const DataChart: React.FC<DataChartProps> = ({ type, data, config }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  // 获取当前主题
  const getCurrentTheme = () => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'light'
    }
    return 'light'
  }

  // 获取主题相关的颜色
  const getThemeColors = () => {
    const theme = getCurrentTheme()
    if (theme === 'dark') {
      return {
        textPrimary: '#fff',
        textSecondary: 'rgba(255, 255, 255, 0.85)',
        textMuted: 'rgba(255, 255, 255, 0.65)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderLight: 'rgba(255, 255, 255, 0.1)',
        bgCard: 'rgba(255, 255, 255, 0.08)',
        primaryColor: '#1890ff',
        successColor: '#52c41a',
        warningColor: '#faad14',
        errorColor: '#ff4d4f'
      }
    } else {
      return {
        textPrimary: '#262626',
        textSecondary: '#595959',
        textMuted: '#8c8c8c',
        borderColor: '#d9d9d9',
        borderLight: '#f0f0f0',
        bgCard: '#fff',
        primaryColor: '#1890ff',
        successColor: '#52c41a',
        warningColor: '#faad14',
        errorColor: '#ff4d4f'
      }
    }
  }

  // 获取严重程度对应的颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ff4d4f'
      case 'medium': return '#faad14'
      case 'low': return '#52c41a'
      default: return '#1890ff'
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      // 销毁之前的实例
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
      
      chartInstance.current = echarts.init(chartRef.current)
      
      const option = getChartOption(type, data, config)
      chartInstance.current.setOption(option)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, []) // 只在组件挂载时初始化一次

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 监听主题变化
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (chartInstance.current) {
        const option = getChartOption(type, data, config)
        chartInstance.current.setOption(option, true)
      }
    })

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      })
    }

    return () => observer.disconnect()
  }, []) // 只在组件挂载时监听主题变化

  const getChartOption = (type: string, data: any[], config: any) => {
    const colors = getThemeColors()
    
    const baseOption = {
      backgroundColor: 'transparent',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',
        backgroundColor: colors.bgCard,
        borderColor: colors.borderColor,
        borderWidth: 1,
        textStyle: {
          color: colors.textPrimary,
          fontSize: 12
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: colors.borderColor,
            color: colors.textPrimary
          }
        }
      },
      legend: {
        textStyle: {
          color: colors.textPrimary,
          fontSize: 12
        },
        top: 10,
        itemGap: 20
      }
    }

    switch (type) {
      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: data.map(item => item[config.xField || 'month']),
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8
            }
          },
          yAxis: {
            type: 'value',
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8
            },
            splitLine: { 
              lineStyle: { 
                color: colors.borderLight,
                type: 'dashed',
                width: 1
              } 
            }
          },
          series: [{
            data: data.map(item => item[config.yField || 'damage']),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { 
              width: 3, 
              color: colors.primaryColor 
            },
            itemStyle: {
              color: colors.primaryColor,
              borderColor: colors.bgCard,
              borderWidth: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: `${colors.primaryColor}20` },
                  { offset: 1, color: `${colors.primaryColor}05` }
                ]
              }
            }
          }]
        }

      case 'pie':
        return {
          ...baseOption,
          series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '55%'],
            data: data.map(item => ({
              name: item[config.colorField || 'type'],
              value: item[config.angleField || 'count']
            })),
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{c}处 ({d}%)',
              color: colors.textPrimary,
              fontSize: 11,
              lineHeight: 16
            },
            labelLine: {
              lineStyle: { color: colors.borderColor }
            },
            itemStyle: {
              borderRadius: 6,
              borderColor: colors.bgCard,
              borderWidth: 2
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

      case 'column':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: data.map(item => item[config.xField || 'month']),
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8,
              rotate: config.xField === 'name' ? 45 : 0
            }
          },
          yAxis: {
            type: 'value',
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8
            },
            splitLine: { 
              lineStyle: { 
                color: colors.borderLight,
                type: 'dashed',
                width: 1
              } 
            }
          },
          series: [{
            data: data.map(item => ({
              value: item[config.yField || 'damage'],
              itemStyle: {
                color: config.seriesField ? getSeverityColor(item[config.seriesField]) : colors.primaryColor
              }
            })),
            type: 'bar',
            barWidth: config.barWidth || '60%',
            itemStyle: {
              color: colors.primaryColor,
              borderRadius: config.columnStyle?.radius || [4, 4, 0, 0]
            },
            label: config.label ? {
              show: true,
              position: config.label.position || 'top',
              color: colors.textPrimary,
              fontSize: config.label.style?.fontSize || 11,
              formatter: (params: any) => params.value
            } : undefined,
            emphasis: {
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 0, y2: 1,
                  colorStops: [
                    { offset: 0, color: `${colors.primaryColor}CC` },
                    { offset: 1, color: colors.primaryColor }
                  ]
                }
              }
            }
          }]
        }

      case 'area':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: data.map(item => item[config.xField || 'month']),
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8
            }
          },
          yAxis: {
            type: 'value',
            axisLine: { 
              lineStyle: { 
                color: colors.borderColor,
                width: 1
              } 
            },
            axisTick: {
              lineStyle: { color: colors.borderColor }
            },
            axisLabel: { 
              color: colors.textSecondary,
              fontSize: 11,
              margin: 8
            },
            splitLine: { 
              lineStyle: { 
                color: colors.borderLight,
                type: 'dashed',
                width: 1
              } 
            }
          },
          series: [{
            data: data.map(item => item[config.yField || 'damage']),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: { 
              width: 3, 
              color: colors.successColor 
            },
            itemStyle: {
              color: colors.successColor,
              borderColor: colors.bgCard,
              borderWidth: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: `${colors.successColor}30` },
                  { offset: 1, color: `${colors.successColor}05` }
                ]
              }
            }
          }]
        }

      default:
        return baseOption
    }
  }

  return (
    <ChartContainer>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  )
}

export default DataChart 