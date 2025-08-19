export interface Statistics {
  onlineCameras: number;
  todayVisits: number;
  alarmCount: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
}

export interface Alarm {
  id: string;
  type: 'motion' | 'face' | 'vehicle' | 'system';
  level: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  time: string;
  camera: string;
  status: 'active' | 'resolved';
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'error';
  type: 'ip' | 'analog' | 'ptz';
  resolution: string;
  fps: number;
  lastUpdate: string;
}

export interface ChartData {
  time: string;
  visitors: number;
  alerts: number;
  cpu: number;
  memory: number;
}

export const mockData = {
  statistics: {
    onlineCameras: 24,
    todayVisits: 1256,
    alarmCount: 8,
    cpuUsage: 65,
    memoryUsage: 78,
    storageUsage: 45,
  } as Statistics,

  alarms: [
    {
      id: '1',
      type: 'motion',
      level: 'medium',
      message: '检测到异常移动',
      time: '2024-01-15 14:30:25',
      camera: '前门摄像头',
      status: 'active',
    },
    {
      id: '2',
      type: 'face',
      level: 'high',
      message: '识别到未授权人员',
      time: '2024-01-15 14:28:10',
      camera: '大厅摄像头',
      status: 'active',
    },
    {
      id: '3',
      type: 'vehicle',
      level: 'low',
      message: '车辆进入停车场',
      time: '2024-01-15 14:25:45',
      camera: '停车场摄像头',
      status: 'resolved',
    },
    {
      id: '4',
      type: 'system',
      level: 'critical',
      message: '摄像头离线',
      time: '2024-01-15 14:20:15',
      camera: '后门摄像头',
      status: 'active',
    },
    {
      id: '5',
      type: 'motion',
      level: 'medium',
      message: '检测到异常移动',
      time: '2024-01-15 14:15:30',
      camera: '走廊摄像头',
      status: 'resolved',
    },
  ] as Alarm[],

  cameras: [
    {
      id: '1',
      name: '前门摄像头',
      location: '前门入口',
      status: 'online',
      type: 'ip',
      resolution: '1920x1080',
      fps: 30,
      lastUpdate: '2024-01-15 14:30:25',
    },
    {
      id: '2',
      name: '大厅摄像头',
      location: '大厅中央',
      status: 'online',
      type: 'ptz',
      resolution: '1920x1080',
      fps: 25,
      lastUpdate: '2024-01-15 14:30:20',
    },
    {
      id: '3',
      name: '停车场摄像头',
      location: '停车场A区',
      status: 'online',
      type: 'ip',
      resolution: '1280x720',
      fps: 20,
      lastUpdate: '2024-01-15 14:30:15',
    },
    {
      id: '4',
      name: '后门摄像头',
      location: '后门出口',
      status: 'offline',
      type: 'ip',
      resolution: '1920x1080',
      fps: 30,
      lastUpdate: '2024-01-15 14:20:15',
    },
    {
      id: '5',
      name: '走廊摄像头',
      location: '一楼走廊',
      status: 'online',
      type: 'analog',
      resolution: '1280x720',
      fps: 25,
      lastUpdate: '2024-01-15 14:30:10',
    },
    {
      id: '6',
      name: '电梯摄像头',
      location: '电梯内部',
      status: 'online',
      type: 'ip',
      resolution: '1920x1080',
      fps: 30,
      lastUpdate: '2024-01-15 14:30:05',
    },
    {
      id: '7',
      name: '办公室摄像头',
      location: '办公区域',
      status: 'error',
      type: 'ip',
      resolution: '1920x1080',
      fps: 25,
      lastUpdate: '2024-01-15 14:25:30',
    },
    {
      id: '8',
      name: '仓库摄像头',
      location: '仓库入口',
      status: 'online',
      type: 'ptz',
      resolution: '1920x1080',
      fps: 20,
      lastUpdate: '2024-01-15 14:30:00',
    },
  ] as Camera[],

  chartData: [
    { time: '00:00', visitors: 120, alerts: 2, cpu: 45, memory: 60 },
    { time: '02:00', visitors: 80, alerts: 1, cpu: 40, memory: 55 },
    { time: '04:00', visitors: 60, alerts: 0, cpu: 35, memory: 50 },
    { time: '06:00', visitors: 100, alerts: 1, cpu: 50, memory: 65 },
    { time: '08:00', visitors: 300, alerts: 3, cpu: 70, memory: 80 },
    { time: '10:00', visitors: 450, alerts: 5, cpu: 75, memory: 85 },
    { time: '12:00', visitors: 600, alerts: 8, cpu: 80, memory: 90 },
    { time: '14:00', visitors: 550, alerts: 6, cpu: 75, memory: 85 },
    { time: '16:00', visitors: 400, alerts: 4, cpu: 70, memory: 80 },
    { time: '18:00', visitors: 350, alerts: 3, cpu: 65, memory: 75 },
    { time: '20:00', visitors: 250, alerts: 2, cpu: 60, memory: 70 },
    { time: '22:00', visitors: 180, alerts: 1, cpu: 55, memory: 65 },
  ] as ChartData[],
};
