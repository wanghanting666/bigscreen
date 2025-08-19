'use client'

import React from 'react'
import { Button, Tooltip } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { useTheme } from '@/contexts/ThemeContext'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border: none !important;
  background: transparent !important;
  color: #fff !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: scale(1.05);
  }
  
  &:focus {
    background: transparent !important;
  }
  
  .anticon {
    font-size: 1.2rem;
  }
`

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Tooltip title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}>
      <StyledButton
        type="text"
        icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
      />
    </Tooltip>
  )
}

export default ThemeToggle 