'use client'

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import styled from 'styled-components'

// 主色调定义
const PRIMARY_COLOR = '#1890ff'
const PRIMARY_LIGHT = '#40a9ff'
const SUCCESS_COLOR = '#52c41a'
const WARNING_COLOR = '#faad14'
const ERROR_COLOR = '#ff4d4f'

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background: var(--bg-card);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
`

const DataChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
      
      const option = {
        backgroundColor: 'transparent',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          textStyle: {
            color: 'var(--text-primary)'
          },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['访问量', '告警数'],
          textStyle: {
            color: 'var(--text-primary)'
          },
          top: 10
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          axisLine: {
            lineStyle: {
              color: 'var(--border-color)'
            }
          },
          axisLabel: {
            color: 'var(--text-secondary)',
            fontSize: 12
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'var(--border-color)'
            }
          },
          axisLabel: {
            color: 'var(--text-secondary)',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: 'var(--border-light)'
            }
          }
        },
        series: [
          {
            name: '访问量',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 3,
              color: PRIMARY_COLOR
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(24, 144, 255, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(24, 144, 255, 0.05)'
                  }
                ]
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '告警数',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 3,
              color: WARNING_COLOR
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(250, 173, 20, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(250, 173, 20, 0.05)'
                  }
                ]
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      
      chartInstance.current.setOption(option)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ChartContainer>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  )
}

export default DataChart 