export type Department = 'Engineering' | 'Design' | 'Marketing' | 'Product' | 'HR' | 'Production';

export interface User {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatarUrl: string;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  customer?: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Closed';
  type: 'In-House' | 'On-Site';
  health: 'Good' | 'Warning' | 'Delay';
  startDate: string;
  endDate: string;
  colorCode: string;
  responsibilities: {
    design: { userIds: string[]; plannedCost: number; actualCost: number };
    program: { userIds: string[]; plannedCost: number; actualCost: number };
    production: { userIds: string[]; plannedCost: number; actualCost: number };
  };
  detailedCosts?: {
    '2100'?: { plan: number; actual: number };
    '2300'?: { plan: number; actual: number; po: number };
    '2400'?: { plan: number; actual: number };
    '4400'?: { plan: number; actual: number };
    '7300'?: { plan: number; actual: number };
    '7301'?: { plan: number; actual: number };
    '7302'?: { plan: number; actual: number };
    '7303'?: { plan: number; actual: number };
  };
};

export interface Task {
  id: string;
  projectId: string;
  userId: string;
  title: string;
  startDate: string; 
  endDate: string;
  workloadPercentage: number;
  department?: Department;
  hideOnTimeline?: boolean;
}

export const mockUsers: User[] = [
  {
    "id": "u1",
    "name": "นายปัญญา หัตถปนิตย์",
    "role": "Electrical Designer",
    "department": "Design",
    "avatarUrl": "/นายปัญญา หัตถปนิตย์.JPG"
  },
  {
    "id": "u2",
    "name": "นายจตุรวิชญ์ ว่องไว",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายจตุรวิชญ์ ว่องไว.jpg"
  },
  {
    "id": "u3",
    "name": "นายวันเฉลิม เนื่องนาคา",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายวันเฉลิม เนื่องนาคา.JPG"
  },
  {
    "id": "u4",
    "name": "นายศุภมิตร ไทยแท้",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายศุภมิตร ไทยแท้.jpg"
  },
  {
    "id": "u5",
    "name": "นายอภิชาติ  ไพศาลสิทธิ์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายอภิชาติ ไพศาลสิทธิ์.jpg"
  }
];

export const mockProjects: Project[] = [
  {
    "id": "p1",
    "projectNumber": "3582504PA0",
    "name": "Project 3582504PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-16",
    "endDate": "2026-07-30",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 50000,
        "actualCost": 45000
      },
      "program": {
        "userIds": [
          "u2"
        ],
        "plannedCost": 80000,
        "actualCost": 85000
      },
      "production": {
        "userIds": [
          "u3",
          "u4",
          "u5"
        ],
        "plannedCost": 120000,
        "actualCost": 115000
      }
    },
    "detailedCosts": {
      "2100": { "plan": 50000, "actual": 45000 },
      "2400": { "plan": 80000, "actual": 85000 },
      "4400": { "plan": 120000, "actual": 115000 },
      "2300": { "plan": 200000, "actual": 195000, "po": 180000 },
      "7301": { "plan": 15000, "actual": 12000 },
      "7302": { "plan": 25000, "actual": 28000 },
      "7303": { "plan": 45000, "actual": 42000 }
    }
  }
];

export const mockTasks: Task[] = [
  {
    "id": "t1",
    "projectId": "p1",
    "userId": "u1",
    "title": "Design Circuit diagram",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Design"
  },
  {
    "id": "t2",
    "projectId": "p1",
    "userId": "u1",
    "title": "Design CB, OP, Board layout",
    "startDate": "2026-03-21",
    "endDate": "2026-03-25",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Design"
  },
  {
    "id": "t3",
    "projectId": "p1",
    "userId": "u1",
    "title": "Approved & Correct Dwg.",
    "startDate": "2026-03-30",
    "endDate": "2026-04-01",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Design"
  },
  {
    "id": "t4",
    "projectId": "p1",
    "userId": "u1",
    "title": "Bom List & Purchase",
    "startDate": "2026-04-02",
    "endDate": "2026-04-05",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Design"
  },
  {
    "id": "t5",
    "projectId": "p1",
    "userId": "u1",
    "title": "Design & Production",
    "startDate": "2026-04-06",
    "endDate": "2026-04-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Design"
  },
  {
    "id": "t6",
    "projectId": "p1",
    "userId": "u2",
    "title": "Program offline",
    "startDate": "2026-04-21",
    "endDate": "2026-04-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t7",
    "projectId": "p1",
    "userId": "u2",
    "title": "Manual movement",
    "startDate": "2026-06-10",
    "endDate": "2026-06-15",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t8",
    "projectId": "p1",
    "userId": "u2",
    "title": "Auto movement",
    "startDate": "2026-06-16",
    "endDate": "2026-06-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t9",
    "projectId": "p1",
    "userId": "u2",
    "title": "Quality check",
    "startDate": "2026-06-30",
    "endDate": "2026-07-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t10",
    "projectId": "p1",
    "userId": "u3",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-21",
    "endDate": "2026-03-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t11",
    "projectId": "p1",
    "userId": "u4",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-05-10",
    "endDate": "2026-05-15",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t12",
    "projectId": "p1",
    "userId": "u5",
    "title": "Install  Control & Operation",
    "startDate": "2026-05-16",
    "endDate": "2026-05-16",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t13",
    "projectId": "p1",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-05-16",
    "endDate": "2026-05-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t14",
    "projectId": "p1",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-05-16",
    "endDate": "2026-05-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t15",
    "projectId": "p1",
    "userId": "u5",
    "title": "MC Wiring Equipment",
    "startDate": "2026-05-16",
    "endDate": "2026-05-30",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t16",
    "projectId": "p1",
    "userId": "u1",
    "title": "Install Design (7301)",
    "startDate": "2026-07-01",
    "endDate": "2026-07-05",
    "workloadPercentage": 50,
    "department": "Design"
  },
  {
    "id": "t17",
    "projectId": "p1",
    "userId": "u2",
    "title": "Install Programmer (7302)",
    "startDate": "2026-07-06",
    "endDate": "2026-07-15",
    "workloadPercentage": 50,
    "department": "Engineering"
  },
  {
    "id": "t18",
    "projectId": "p1",
    "userId": "u3",
    "title": "Install Production (7303)",
    "startDate": "2026-07-16",
    "endDate": "2026-07-30",
    "workloadPercentage": 50,
    "department": "Production"
  }
];
