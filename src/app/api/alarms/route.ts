import { NextResponse } from 'next/server';
import { mockData } from '@/data/mockData';

export async function GET() {
  try {
    // 模拟新的告警数据
    const newAlarm = {
      id: Date.now().toString(),
      type: ['motion', 'face', 'vehicle', 'system'][
        Math.floor(Math.random() * 4)
      ] as any,
      level: ['low', 'medium', 'high', 'critical'][
        Math.floor(Math.random() * 4)
      ] as any,
      message: '检测到新的告警事件',
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      camera: '监控摄像头',
      status: 'active' as const,
    };

    const updatedAlarms = [newAlarm, ...mockData.alarms.slice(0, 4)];

    return NextResponse.json({
      success: true,
      data: updatedAlarms,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取告警数据失败' },
      { status: 500 }
    );
  }
}
