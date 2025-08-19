import { NextResponse } from 'next/server';
import { mockData } from '@/data/mockData';

export async function GET() {
  try {
    // 模拟实时数据更新
    const updatedStatistics = {
      ...mockData.statistics,
      todayVisits:
        mockData.statistics.todayVisits + Math.floor(Math.random() * 10),
      cpuUsage: Math.max(
        30,
        Math.min(90, mockData.statistics.cpuUsage + (Math.random() - 0.5) * 10)
      ),
      memoryUsage: Math.max(
        40,
        Math.min(
          95,
          mockData.statistics.memoryUsage + (Math.random() - 0.5) * 8
        )
      ),
      storageUsage: Math.max(
        30,
        Math.min(
          80,
          mockData.statistics.storageUsage + (Math.random() - 0.5) * 5
        )
      ),
    };

    return NextResponse.json({
      success: true,
      data: updatedStatistics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    );
  }
}
