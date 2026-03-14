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
}

export interface Task {
  id: string;
  projectId: string;
  userId: string;
  title: string;
  startDate: string; 
  endDate: string;
  workloadPercentage: number;
  hideOnTimeline?: boolean;
  department?: Department;
}

export const mockUsers: User[] = [
  {
    "id": "u2",
    "name": "นายธีระวุฒิ คลองแถว",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%98%E0%B8%B5%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B8%E0%B8%92%E0%B8%B4%20%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%81%E0%B8%96%E0%B8%A7"
  },
  {
    "id": "u3",
    "name": "นายเมธี หีบทอง",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A1%E0%B8%98%E0%B8%B5%20%E0%B8%AB%E0%B8%B5%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%87"
  },
  {
    "id": "u4",
    "name": "นายวณัฐพงษ์ แก้วมงคล",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%93%E0%B8%B1%E0%B8%90%E0%B8%9E%E0%B8%87%E0%B8%A9%E0%B9%8C%20%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%E0%B8%A1%E0%B8%87%E0%B8%84%E0%B8%A5"
  },
  {
    "id": "u5",
    "name": "นายเทียนชัย ดวงจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%8A%E0%B8%B1%E0%B8%A2%20%E0%B8%94%E0%B8%A7%E0%B8%87%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C"
  },
  {
    "id": "u6",
    "name": "นายจตุรวิชญ์ ว่องไว",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%95%E0%B8%B8%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%8D%E0%B9%8C%20%E0%B8%A7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%84%E0%B8%A7"
  },
  {
    "id": "u7",
    "name": "นายปัญญา หัตถปนิตย์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%20%E0%B8%AB%E0%B8%B1%E0%B8%95%E0%B8%96%E0%B8%9B%E0%B8%99%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C"
  },
  {
    "id": "u8",
    "name": "นายกิติพงศ์ ไชยรัตน์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%B4%E0%B8%9E%E0%B8%87%E0%B8%A8%E0%B9%8C%20%E0%B9%84%E0%B8%8A%E0%B8%A2%E0%B8%A3%E0%B8%B1%E0%B8%95%E0%B8%99%E0%B9%8C"
  },
  {
    "id": "u9",
    "name": "นายวิชากร  คนไทย",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%81%E0%B8%A3%20%20%E0%B8%84%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2"
  },
  {
    "id": "u10",
    "name": "นายไกรสิทธิ์  แสงจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%81%E0%B8%A3%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%8C%20%20%E0%B9%81%E0%B8%AA%E0%B8%87%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C"
  },
  {
    "id": "u11",
    "name": "นายศุภวัฒน์ ไชยชาญ",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A8%E0%B8%B8%E0%B8%A0%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C%20%E0%B9%84%E0%B8%8A%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%8D"
  },
  {
    "id": "u12",
    "name": "นายอัครพงษ์  ขุมเงิน",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%AD%E0%B8%B1%E0%B8%84%E0%B8%A3%E0%B8%9E%E0%B8%87%E0%B8%A9%E0%B9%8C%20%20%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99"
  },
  {
    "id": "u13",
    "name": "นายชุมพล มังคละเสถียร",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B8%9E%E0%B8%A5%20%E0%B8%A1%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AA%E0%B8%96%E0%B8%B5%E0%B8%A2%E0%B8%A3"
  },
  {
    "id": "u14",
    "name": "นายสันติสุข บุตรจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%B4%E0%B8%AA%E0%B8%B8%E0%B8%82%20%E0%B8%9A%E0%B8%B8%E0%B8%95%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B9%8C"
  },
  {
    "id": "u15",
    "name": "นายวันเฉลิม เนื่องนาคา",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%B4%E0%B8%A1%20%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%B2"
  },
  {
    "id": "u16",
    "name": "นายอภิชาติ  ไพศาลสิทธิ์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%AD%E0%B8%A0%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%20%20%E0%B9%84%E0%B8%9E%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%8C"
  },
  {
    "id": "u17",
    "name": "นายศิกษกะ  ปุ้งโพธิ์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A8%E0%B8%B4%E0%B8%81%E0%B8%A9%E0%B8%81%E0%B8%B0%20%20%E0%B8%9B%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B9%82%E0%B8%9E%E0%B8%98%E0%B8%B4%E0%B9%8C"
  },
  {
    "id": "u18",
    "name": "นายจรณินท์ ถินประสาท",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%88%E0%B8%A3%E0%B8%93%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B9%8C%20%E0%B8%96%E0%B8%B4%E0%B8%99%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B2%E0%B8%97"
  },
  {
    "id": "u19",
    "name": "นายศุภมิตร ไทยแท้",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%A8%E0%B8%B8%E0%B8%A0%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%A3%20%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%97%E0%B9%89"
  },
  {
    "id": "u20",
    "name": "น.ส.ณิชกานต์  วัฒนธรรม",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/api/avatar?name=%E0%B8%99.%E0%B8%AA.%E0%B8%93%E0%B8%B4%E0%B8%8A%E0%B8%81%E0%B8%B2%E0%B8%99%E0%B8%95%E0%B9%8C%20%20%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1"
  },
  {
    "id": "u21",
    "name": "นายสันติ แป้นคง",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/api/avatar?name=%E0%B8%99%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%B4%20%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%84%E0%B8%87"
  }
];

export const mockProjects: Project[] = [
  {
    "id": "p1",
    "projectNumber": "1032506PA0",
    "name": "Project 1032506PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p2",
    "projectNumber": "1032507BA0",
    "name": "Project 1032507BA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p3",
    "projectNumber": "1032508GA0",
    "name": "Project 1032508GA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p4",
    "projectNumber": "1032511PA0",
    "name": "Project 1032511PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p5",
    "projectNumber": "1032512PA0",
    "name": "Project 1032512PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p6",
    "projectNumber": "1032513PA0",
    "name": "Project 1032513PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p7",
    "projectNumber": "1032516AA0",
    "name": "Project 1032516AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-18",
    "endDate": "2026-02-27",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1",
          "u2"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p8",
    "projectNumber": "1132204PA2",
    "name": "Project 1132204PA2",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p9",
    "projectNumber": "1132402ZA1",
    "name": "Project 1132402ZA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p10",
    "projectNumber": "1132503PA0",
    "name": "Project 1132503PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p11",
    "projectNumber": "1902501PA0",
    "name": "Project 1902501PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p12",
    "projectNumber": "1902602ZA0",
    "name": "Project 1902602ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p13",
    "projectNumber": "2422501AA0",
    "name": "Project 2422501AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p14",
    "projectNumber": "2602503XA0",
    "name": "Project 2602503XA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p15",
    "projectNumber": "2642406TA0",
    "name": "Project 2642406TA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p16",
    "projectNumber": "2642503PA0",
    "name": "Project 2642503PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p17",
    "projectNumber": "2652439BA1",
    "name": "Project 2652439BA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p18",
    "projectNumber": "2652441KA2",
    "name": "Project 2652441KA2",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p19",
    "projectNumber": "2652505HA0",
    "name": "Project 2652505HA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p20",
    "projectNumber": "2652505HA1",
    "name": "Project 2652505HA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p21",
    "projectNumber": "2652505HA2",
    "name": "Project 2652505HA2",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p22",
    "projectNumber": "2652506DA0",
    "name": "Project 2652506DA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p23",
    "projectNumber": "2652509HA0",
    "name": "Project 2652509HA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p24",
    "projectNumber": "2652602PA0",
    "name": "Project 2652602PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p25",
    "projectNumber": "2802502PA0",
    "name": "Project 2802502PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p26",
    "projectNumber": "3222503KA0",
    "name": "Project 3222503KA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p27",
    "projectNumber": "3222503KA1",
    "name": "Project 3222503KA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p28",
    "projectNumber": "3222505PA0",
    "name": "Project 3222505PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p29",
    "projectNumber": "3582502PA0",
    "name": "Project 3582502PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u3"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p30",
    "projectNumber": "3582503PA0",
    "name": "Project 3582503PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-16",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u3"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p31",
    "projectNumber": "3582504PA0",
    "name": "Project 3582504PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u4"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p32",
    "projectNumber": "3582505CA0",
    "name": "Project 3582505CA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u5"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p33",
    "projectNumber": "3582506MA0",
    "name": "Project 3582506MA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u4"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p34",
    "projectNumber": "3582507MA0",
    "name": "Project 3582507MA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u4"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p35",
    "projectNumber": "3582508DA0",
    "name": "Project 3582508DA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u6"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u4"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p36",
    "projectNumber": "3582601PA0",
    "name": "Project 3582601PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p37",
    "projectNumber": "3582602PA0",
    "name": "Project 3582602PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u7"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p38",
    "projectNumber": "3782304RA0",
    "name": "Project 3782304RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p39",
    "projectNumber": "3782406ZA0",
    "name": "Project 3782406ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p40",
    "projectNumber": "3782408RA0",
    "name": "Project 3782408RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p41",
    "projectNumber": "3782413AA0",
    "name": "Project 3782413AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p42",
    "projectNumber": "3782502RA0",
    "name": "Project 3782502RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p43",
    "projectNumber": "3782506PA0",
    "name": "Project 3782506PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p44",
    "projectNumber": "3782507AA0",
    "name": "Project 3782507AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p45",
    "projectNumber": "3782508AA0",
    "name": "Project 3782508AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-27",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u8"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p46",
    "projectNumber": "3862601XA0",
    "name": "Project 3862601XA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p47",
    "projectNumber": "3862602XA0",
    "name": "Project 3862602XA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p48",
    "projectNumber": "3932511BA0",
    "name": "Project 3932511BA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p49",
    "projectNumber": "3932517PA0",
    "name": "Project 3932517PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p50",
    "projectNumber": "4212503EA0",
    "name": "Project 4212503EA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p51",
    "projectNumber": "4252201RA0",
    "name": "Project 4252201RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p52",
    "projectNumber": "4432403ZA1",
    "name": "Project 4432403ZA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p53",
    "projectNumber": "4432503UA0",
    "name": "Project 4432503UA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p54",
    "projectNumber": "4432505PA0",
    "name": "Project 4432505PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-03",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u9"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p55",
    "projectNumber": "4432506JA0",
    "name": "Project 4432506JA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u9"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u10"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p56",
    "projectNumber": "4532501RA0",
    "name": "Project 4532501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p57",
    "projectNumber": "4552501PA0",
    "name": "Project 4552501PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p58",
    "projectNumber": "4632502ZA0",
    "name": "Project 4632502ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p59",
    "projectNumber": "4632503RA0",
    "name": "Project 4632503RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p60",
    "projectNumber": "4632505RA0",
    "name": "Project 4632505RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p61",
    "projectNumber": "4632506JA0",
    "name": "Project 4632506JA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u11"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p62",
    "projectNumber": "4662501DA0",
    "name": "Project 4662501DA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p63",
    "projectNumber": "4662501DA1",
    "name": "Project 4662501DA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p64",
    "projectNumber": "4682301UA1",
    "name": "Project 4682301UA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p65",
    "projectNumber": "4682301UA3",
    "name": "Project 4682301UA3",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p66",
    "projectNumber": "4742501JA0",
    "name": "Project 4742501JA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1",
          "u12"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u13"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p67",
    "projectNumber": "4742502JA0",
    "name": "Project 4742502JA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-04-24",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1",
          "u12"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u14"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p68",
    "projectNumber": "4742502JA1",
    "name": "Project 4742502JA1",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p69",
    "projectNumber": "4762602PA0",
    "name": "Project 4762602PA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p70",
    "projectNumber": "5092501RA0",
    "name": "Project 5092501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p71",
    "projectNumber": "5102501UA0",
    "name": "Project 5102501UA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p72",
    "projectNumber": "5102502AA0",
    "name": "Project 5102502AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p73",
    "projectNumber": "5102503AA0",
    "name": "Project 5102503AA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p74",
    "projectNumber": "5102504ZA0",
    "name": "Project 5102504ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p75",
    "projectNumber": "5152501RA0",
    "name": "Project 5152501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p76",
    "projectNumber": "5182501RA0",
    "name": "Project 5182501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p77",
    "projectNumber": "5212501RA0",
    "name": "Project 5212501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-18",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u15",
          "u16"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p78",
    "projectNumber": "5222501ZA0",
    "name": "Project 5222501ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1",
          "u17"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p79",
    "projectNumber": "5242501DA0",
    "name": "Project 5242501DA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p80",
    "projectNumber": "5252501RA0",
    "name": "Project 5252501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-25",
    "endDate": "2026-03-27",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u18"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1",
          "u11"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p81",
    "projectNumber": "5262501RA0",
    "name": "Project 5262501RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-02",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u9"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u15"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p82",
    "projectNumber": "5262502ZA0",
    "name": "Project 5262502ZA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-03-11",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u9",
          "u2"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p83",
    "projectNumber": "5272501HA0",
    "name": "Project 5272501HA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-20",
    "endDate": "2026-03-31",
    "colorCode": "var(--proj-c)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u2"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u19"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p84",
    "projectNumber": "5282501UA0",
    "name": "Project 5282501UA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-d)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p85",
    "projectNumber": "5292601RA0",
    "name": "Project 5292601RA0",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "2026-02-18",
    "endDate": "2026-03-27",
    "colorCode": "var(--proj-a)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u20"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1",
          "u21"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  },
  {
    "id": "p86",
    "projectNumber": "MFA2510005",
    "name": "Project MFA2510005",
    "status": "Active",
    "type": "In-House",
    "health": "Good",
    "startDate": "",
    "endDate": "",
    "colorCode": "var(--proj-b)",
    "responsibilities": {
      "design": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u1"
        ],
        "plannedCost": 0,
        "actualCost": 0
      }
    }
  }
];

export const mockTasks: Task[] = [
  {
    "id": "t1",
    "projectId": "p7",
    "userId": "u2",
    "title": "Auto movement",
    "startDate": "2026-02-18",
    "endDate": "2026-02-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t2",
    "projectId": "p7",
    "userId": "u2",
    "title": "Quality check",
    "startDate": "2026-02-23",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t3",
    "projectId": "p29",
    "userId": "u3",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t4",
    "projectId": "p29",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t5",
    "projectId": "p30",
    "userId": "u3",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t6",
    "projectId": "p30",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t7",
    "projectId": "p31",
    "userId": "u4",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t8",
    "projectId": "p31",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t9",
    "projectId": "p32",
    "userId": "u5",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t10",
    "projectId": "p32",
    "userId": "u5",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t11",
    "projectId": "p32",
    "userId": "u5",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t12",
    "projectId": "p32",
    "userId": "u5",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t13",
    "projectId": "p32",
    "userId": "u5",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t14",
    "projectId": "p33",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t15",
    "projectId": "p34",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t16",
    "projectId": "p35",
    "userId": "u6",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t17",
    "projectId": "p35",
    "userId": "u6",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t18",
    "projectId": "p35",
    "userId": "u6",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t19",
    "projectId": "p35",
    "userId": "u6",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t20",
    "projectId": "p35",
    "userId": "u4",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t21",
    "projectId": "p35",
    "userId": "u4",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t22",
    "projectId": "p35",
    "userId": "u4",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t23",
    "projectId": "p35",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t24",
    "projectId": "p35",
    "userId": "u4",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t25",
    "projectId": "p45",
    "userId": "u8",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t26",
    "projectId": "p45",
    "userId": "u8",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t27",
    "projectId": "p45",
    "userId": "u8",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t28",
    "projectId": "p45",
    "userId": "u8",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t29",
    "projectId": "p54",
    "userId": "u9",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-03",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t30",
    "projectId": "p55",
    "userId": "u9",
    "title": "Program offline",
    "startDate": "2026-03-04",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t31",
    "projectId": "p55",
    "userId": "u9",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-10",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t32",
    "projectId": "p55",
    "userId": "u9",
    "title": "Auto movement",
    "startDate": "2026-03-11",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t33",
    "projectId": "p55",
    "userId": "u9",
    "title": "Quality check",
    "startDate": "2026-03-16",
    "endDate": "2026-03-16",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t34",
    "projectId": "p55",
    "userId": "u10",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t35",
    "projectId": "p55",
    "userId": "u10",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-09",
    "endDate": "2026-03-11",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t36",
    "projectId": "p55",
    "userId": "u10",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-12",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t37",
    "projectId": "p55",
    "userId": "u10",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t38",
    "projectId": "p55",
    "userId": "u10",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t39",
    "projectId": "p61",
    "userId": "u11",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t40",
    "projectId": "p61",
    "userId": "u11",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t41",
    "projectId": "p61",
    "userId": "u11",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t42",
    "projectId": "p61",
    "userId": "u11",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t43",
    "projectId": "p61",
    "userId": "u11",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t44",
    "projectId": "p66",
    "userId": "u12",
    "title": "Manual movement",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t45",
    "projectId": "p66",
    "userId": "u12",
    "title": "Auto movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t46",
    "projectId": "p66",
    "userId": "u12",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t47",
    "projectId": "p66",
    "userId": "u13",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t48",
    "projectId": "p66",
    "userId": "u13",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t49",
    "projectId": "p66",
    "userId": "u13",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t50",
    "projectId": "p66",
    "userId": "u13",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t51",
    "projectId": "p66",
    "userId": "u13",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t52",
    "projectId": "p67",
    "userId": "u12",
    "title": "Manual movement",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t53",
    "projectId": "p67",
    "userId": "u12",
    "title": "Auto movement",
    "startDate": "2026-04-01",
    "endDate": "2026-04-10",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t54",
    "projectId": "p67",
    "userId": "u12",
    "title": "Quality check",
    "startDate": "2026-04-20",
    "endDate": "2026-04-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t55",
    "projectId": "p67",
    "userId": "u14",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t56",
    "projectId": "p67",
    "userId": "u14",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t57",
    "projectId": "p67",
    "userId": "u14",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t58",
    "projectId": "p67",
    "userId": "u14",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t59",
    "projectId": "p67",
    "userId": "u14",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t60",
    "projectId": "p77",
    "userId": "u15",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-02-26",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t61",
    "projectId": "p77",
    "userId": "u16",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t62",
    "projectId": "p77",
    "userId": "u16",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t63",
    "projectId": "p77",
    "userId": "u16",
    "title": "IO Check & Correct",
    "startDate": "2026-03-23",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t64",
    "projectId": "p77",
    "userId": "u15",
    "title": "[Completed] Panel wiring (Board layout)",
    "startDate": "2026-02-18",
    "endDate": "2026-02-25",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t65",
    "projectId": "p78",
    "userId": "u17",
    "title": "Manual movement",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t66",
    "projectId": "p78",
    "userId": "u17",
    "title": "Auto movement",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t67",
    "projectId": "p78",
    "userId": "u17",
    "title": "Quality check",
    "startDate": "2026-03-16",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t68",
    "projectId": "p80",
    "userId": "u18",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t69",
    "projectId": "p80",
    "userId": "u18",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t70",
    "projectId": "p80",
    "userId": "u18",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t71",
    "projectId": "p80",
    "userId": "u18",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t72",
    "projectId": "p80",
    "userId": "u11",
    "title": "MC Wiring Equipment",
    "startDate": "2026-02-25",
    "endDate": "2026-02-28",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t73",
    "projectId": "p81",
    "userId": "u9",
    "title": "Program offline",
    "startDate": "2026-03-17",
    "endDate": "2026-03-18",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t74",
    "projectId": "p81",
    "userId": "u9",
    "title": "Manual movement",
    "startDate": "2026-03-19",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t75",
    "projectId": "p81",
    "userId": "u9",
    "title": "Auto movement",
    "startDate": "2026-03-23",
    "endDate": "2026-03-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t76",
    "projectId": "p81",
    "userId": "u9",
    "title": "Quality check",
    "startDate": "2026-03-25",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t77",
    "projectId": "p81",
    "userId": "u15",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t78",
    "projectId": "p81",
    "userId": "u15",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-09",
    "endDate": "2026-03-11",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t79",
    "projectId": "p81",
    "userId": "u15",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-12",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t80",
    "projectId": "p81",
    "userId": "u15",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t81",
    "projectId": "p81",
    "userId": "u15",
    "title": "IO Check & Correct",
    "startDate": "2026-03-23",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t82",
    "projectId": "p82",
    "userId": "u9",
    "title": "Program offline",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t83",
    "projectId": "p82",
    "userId": "u2",
    "title": "Manual movement",
    "startDate": "2026-03-11",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t84",
    "projectId": "p82",
    "userId": "u2",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-16",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t85",
    "projectId": "p82",
    "userId": "u2",
    "title": "Quality check",
    "startDate": "2026-03-17",
    "endDate": "2026-03-18",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t86",
    "projectId": "p83",
    "userId": "u2",
    "title": "Program offline",
    "startDate": "2026-03-19",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t87",
    "projectId": "p83",
    "userId": "u2",
    "title": "Manual movement",
    "startDate": "2026-03-23",
    "endDate": "2026-03-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t88",
    "projectId": "p83",
    "userId": "u2",
    "title": "Auto movement",
    "startDate": "2026-03-25",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t89",
    "projectId": "p83",
    "userId": "u2",
    "title": "Quality check",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t90",
    "projectId": "p83",
    "userId": "u19",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t91",
    "projectId": "p83",
    "userId": "u19",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-05",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t92",
    "projectId": "p83",
    "userId": "u19",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-06",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t93",
    "projectId": "p83",
    "userId": "u19",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-06",
    "endDate": "2026-03-09",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t94",
    "projectId": "p83",
    "userId": "u19",
    "title": "IO Check & Correct",
    "startDate": "2026-03-10",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t95",
    "projectId": "p85",
    "userId": "u20",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t96",
    "projectId": "p85",
    "userId": "u20",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t97",
    "projectId": "p85",
    "userId": "u20",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t98",
    "projectId": "p85",
    "userId": "u20",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t99",
    "projectId": "p85",
    "userId": "u21",
    "title": "Install  Control & Operation",
    "startDate": "2026-02-18",
    "endDate": "2026-02-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t100",
    "projectId": "p85",
    "userId": "u21",
    "title": "MC Wiring Equipment",
    "startDate": "2026-02-23",
    "endDate": "2026-02-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  },
  {
    "id": "t101",
    "projectId": "p85",
    "userId": "u21",
    "title": "IO Check & Correct",
    "startDate": "2026-02-25",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false
  }
];
