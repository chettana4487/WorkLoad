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
  department?: Department;
  hideOnTimeline?: boolean;
}

export const mockUsers: User[] = [
  {
    "id": "u1",
    "name": "นายธีระวุฒิ คลองแถว",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายธีระวุฒิ คลองแถว.JPG"
  },
  {
    "id": "u2",
    "name": "นายเมธี หีบทอง",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายเมธี หีบทอง.png"
  },
  {
    "id": "u3",
    "name": "นายวณัฐพงษ์ แก้วมงคล",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายวณัฐพงษ์ แก้วมงคล.jpg"
  },
  {
    "id": "u4",
    "name": "นายเทียนชัย ดวงจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายเทียนชัย ดวงจันทร์.jpg"
  },
  {
    "id": "u5",
    "name": "นายจตุรวิชญ์ ว่องไว",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายจตุรวิชญ์ ว่องไว.jpg"
  },
  {
    "id": "u6",
    "name": "นายปัญญา หัตถปนิตย์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายปัญญา หัตถปนิตย์.JPG"
  },
  {
    "id": "u7",
    "name": "นายกิติพงศ์ ไชยรัตน์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายกิติพงศ์ ไชยรัตน์.jpg"
  },
  {
    "id": "u8",
    "name": "นายวิชากร  คนไทย",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายวิชากร คนไทย.JPG"
  },
  {
    "id": "u9",
    "name": "นายไกรสิทธิ์  แสงจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายไกรสิทธิ์ แสงจันทร์.jpg"
  },
  {
    "id": "u10",
    "name": "นายศุภวัฒน์ ไชยชาญ",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายศุภวัฒน์ ไชยชาญ.jpg"
  },
  {
    "id": "u11",
    "name": "นายอัครพงษ์  ขุมเงิน",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายอัครพงษ์  ขุมเงิน.png"
  },
  {
    "id": "u12",
    "name": "นายชุมพล มังคละเสถียร",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายชุมพล มังคละเสถียร.jpg"
  },
  {
    "id": "u13",
    "name": "นายสันติสุข บุตรจันทร์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายสันติสุข บุตรจันทร์.jpg"
  },
  {
    "id": "u14",
    "name": "นายวันเฉลิม เนื่องนาคา",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายวันเฉลิม เนื่องนาคา.JPG"
  },
  {
    "id": "u15",
    "name": "นายอภิชาติ  ไพศาลสิทธิ์",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายอภิชาติ ไพศาลสิทธิ์.jpg"
  },
  {
    "id": "u16",
    "name": "นายศิกษกะ  ปุ้งโพธิ์",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายศิกษกะ ปุ้งโพธิ์.jpg"
  },
  {
    "id": "u17",
    "name": "นายจรณินท์ ถินประสาท",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายจรณินท์ ถินประสาท.jpg"
  },
  {
    "id": "u18",
    "name": "นายศุภมิตร ไทยแท้",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายศุภมิตร ไทยแท้.jpg"
  },
  {
    "id": "u19",
    "name": "น.ส.ณิชกานต์  วัฒนธรรม",
    "role": "Programmer",
    "department": "Engineering",
    "avatarUrl": "/นายณิชกานต์ วัฒนธรรม.jpg"
  },
  {
    "id": "u20",
    "name": "นายสันติ แป้นคง",
    "role": "Electrical Production",
    "department": "Production",
    "avatarUrl": "/นายสันติ แป้นคง.jpg"
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
          "u2"
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
          "u2"
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
          "u3"
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
          "u4"
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
          "u3"
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
          "u3"
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u5"
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
          "u6"
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
          "u9"
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
          "u10"
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u11"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u12"
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u11"
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
        "userIds": [],
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
          "u14",
          "u15"
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u16"
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
        "userIds": [],
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u17"
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
        "userIds": [],
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
          "u14"
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u8",
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
          "u18"
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
        "userIds": [],
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
        "userIds": [],
        "plannedCost": 0,
        "actualCost": 0
      },
      "program": {
        "userIds": [
          "u19"
        ],
        "plannedCost": 0,
        "actualCost": 0
      },
      "production": {
        "userIds": [
          "u20"
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
        "userIds": [],
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
    "userId": "u1",
    "title": "Auto movement",
    "startDate": "2026-02-18",
    "endDate": "2026-02-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t2",
    "projectId": "p7",
    "userId": "u1",
    "title": "Quality check",
    "startDate": "2026-02-23",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t3",
    "projectId": "p29",
    "userId": "u2",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t4",
    "projectId": "p29",
    "userId": "u2",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t5",
    "projectId": "p30",
    "userId": "u2",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t6",
    "projectId": "p30",
    "userId": "u2",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t7",
    "projectId": "p31",
    "userId": "u3",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t8",
    "projectId": "p31",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t9",
    "projectId": "p32",
    "userId": "u4",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t10",
    "projectId": "p32",
    "userId": "u4",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t11",
    "projectId": "p32",
    "userId": "u4",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t12",
    "projectId": "p32",
    "userId": "u4",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t13",
    "projectId": "p32",
    "userId": "u4",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t14",
    "projectId": "p33",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t15",
    "projectId": "p34",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t16",
    "projectId": "p35",
    "userId": "u5",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t17",
    "projectId": "p35",
    "userId": "u5",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t18",
    "projectId": "p35",
    "userId": "u5",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t19",
    "projectId": "p35",
    "userId": "u5",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t20",
    "projectId": "p35",
    "userId": "u3",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t21",
    "projectId": "p35",
    "userId": "u3",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t22",
    "projectId": "p35",
    "userId": "u3",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t23",
    "projectId": "p35",
    "userId": "u3",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t24",
    "projectId": "p35",
    "userId": "u3",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t25",
    "projectId": "p45",
    "userId": "u7",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t26",
    "projectId": "p45",
    "userId": "u7",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t27",
    "projectId": "p45",
    "userId": "u7",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t28",
    "projectId": "p45",
    "userId": "u7",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t29",
    "projectId": "p54",
    "userId": "u8",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-03",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t30",
    "projectId": "p55",
    "userId": "u8",
    "title": "Program offline",
    "startDate": "2026-03-04",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t31",
    "projectId": "p55",
    "userId": "u8",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-10",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t32",
    "projectId": "p55",
    "userId": "u8",
    "title": "Auto movement",
    "startDate": "2026-03-11",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t33",
    "projectId": "p55",
    "userId": "u8",
    "title": "Quality check",
    "startDate": "2026-03-16",
    "endDate": "2026-03-16",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t34",
    "projectId": "p55",
    "userId": "u9",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t35",
    "projectId": "p55",
    "userId": "u9",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-09",
    "endDate": "2026-03-11",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t36",
    "projectId": "p55",
    "userId": "u9",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-12",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t37",
    "projectId": "p55",
    "userId": "u9",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t38",
    "projectId": "p55",
    "userId": "u9",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t39",
    "projectId": "p61",
    "userId": "u10",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t40",
    "projectId": "p61",
    "userId": "u10",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t41",
    "projectId": "p61",
    "userId": "u10",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t42",
    "projectId": "p61",
    "userId": "u10",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t43",
    "projectId": "p61",
    "userId": "u10",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t44",
    "projectId": "p66",
    "userId": "u11",
    "title": "Manual movement",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t45",
    "projectId": "p66",
    "userId": "u11",
    "title": "Auto movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t46",
    "projectId": "p66",
    "userId": "u11",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t47",
    "projectId": "p66",
    "userId": "u12",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t48",
    "projectId": "p66",
    "userId": "u12",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t49",
    "projectId": "p66",
    "userId": "u12",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t50",
    "projectId": "p66",
    "userId": "u12",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t51",
    "projectId": "p66",
    "userId": "u12",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t52",
    "projectId": "p67",
    "userId": "u11",
    "title": "Manual movement",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t53",
    "projectId": "p67",
    "userId": "u11",
    "title": "Auto movement",
    "startDate": "2026-04-01",
    "endDate": "2026-04-10",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t54",
    "projectId": "p67",
    "userId": "u11",
    "title": "Quality check",
    "startDate": "2026-04-20",
    "endDate": "2026-04-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t55",
    "projectId": "p67",
    "userId": "u13",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t56",
    "projectId": "p67",
    "userId": "u13",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t57",
    "projectId": "p67",
    "userId": "u13",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t58",
    "projectId": "p67",
    "userId": "u13",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t59",
    "projectId": "p67",
    "userId": "u13",
    "title": "IO Check & Correct",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t60",
    "projectId": "p77",
    "userId": "u14",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-02-26",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t61",
    "projectId": "p77",
    "userId": "u15",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t62",
    "projectId": "p77",
    "userId": "u15",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t63",
    "projectId": "p77",
    "userId": "u15",
    "title": "IO Check & Correct",
    "startDate": "2026-03-23",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t64",
    "projectId": "p77",
    "userId": "u14",
    "title": "[Completed] Panel wiring (Board layout)",
    "startDate": "2026-02-18",
    "endDate": "2026-02-25",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t65",
    "projectId": "p78",
    "userId": "u16",
    "title": "Manual movement",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t66",
    "projectId": "p78",
    "userId": "u16",
    "title": "Auto movement",
    "startDate": "2026-03-02",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t67",
    "projectId": "p78",
    "userId": "u16",
    "title": "Quality check",
    "startDate": "2026-03-16",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t68",
    "projectId": "p80",
    "userId": "u17",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t69",
    "projectId": "p80",
    "userId": "u17",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t70",
    "projectId": "p80",
    "userId": "u17",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t71",
    "projectId": "p80",
    "userId": "u17",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t72",
    "projectId": "p80",
    "userId": "u10",
    "title": "MC Wiring Equipment",
    "startDate": "2026-02-25",
    "endDate": "2026-02-28",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t73",
    "projectId": "p81",
    "userId": "u8",
    "title": "Program offline",
    "startDate": "2026-03-17",
    "endDate": "2026-03-18",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t74",
    "projectId": "p81",
    "userId": "u8",
    "title": "Manual movement",
    "startDate": "2026-03-19",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t75",
    "projectId": "p81",
    "userId": "u8",
    "title": "Auto movement",
    "startDate": "2026-03-23",
    "endDate": "2026-03-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t76",
    "projectId": "p81",
    "userId": "u8",
    "title": "Quality check",
    "startDate": "2026-03-25",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t77",
    "projectId": "p81",
    "userId": "u14",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t78",
    "projectId": "p81",
    "userId": "u14",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-09",
    "endDate": "2026-03-11",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t79",
    "projectId": "p81",
    "userId": "u14",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-12",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t80",
    "projectId": "p81",
    "userId": "u14",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t81",
    "projectId": "p81",
    "userId": "u14",
    "title": "IO Check & Correct",
    "startDate": "2026-03-23",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t82",
    "projectId": "p82",
    "userId": "u8",
    "title": "Program offline",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t83",
    "projectId": "p82",
    "userId": "u1",
    "title": "Manual movement",
    "startDate": "2026-03-11",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t84",
    "projectId": "p82",
    "userId": "u1",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-16",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t85",
    "projectId": "p82",
    "userId": "u1",
    "title": "Quality check",
    "startDate": "2026-03-17",
    "endDate": "2026-03-18",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t86",
    "projectId": "p83",
    "userId": "u1",
    "title": "Program offline",
    "startDate": "2026-03-19",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t87",
    "projectId": "p83",
    "userId": "u1",
    "title": "Manual movement",
    "startDate": "2026-03-23",
    "endDate": "2026-03-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t88",
    "projectId": "p83",
    "userId": "u1",
    "title": "Auto movement",
    "startDate": "2026-03-25",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t89",
    "projectId": "p83",
    "userId": "u1",
    "title": "Quality check",
    "startDate": "2026-03-30",
    "endDate": "2026-03-31",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t90",
    "projectId": "p83",
    "userId": "u18",
    "title": "Panel wiring (Board layout)",
    "startDate": "2026-02-20",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t91",
    "projectId": "p83",
    "userId": "u18",
    "title": "Assembly (OP+CB)",
    "startDate": "2026-03-02",
    "endDate": "2026-03-05",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t92",
    "projectId": "p83",
    "userId": "u18",
    "title": "Install  Control & Operation",
    "startDate": "2026-03-06",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t93",
    "projectId": "p83",
    "userId": "u18",
    "title": "MC Wiring Equipment",
    "startDate": "2026-03-06",
    "endDate": "2026-03-09",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t94",
    "projectId": "p83",
    "userId": "u18",
    "title": "IO Check & Correct",
    "startDate": "2026-03-10",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t95",
    "projectId": "p85",
    "userId": "u19",
    "title": "Program offline",
    "startDate": "2026-03-02",
    "endDate": "2026-03-06",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t96",
    "projectId": "p85",
    "userId": "u19",
    "title": "Manual movement",
    "startDate": "2026-03-09",
    "endDate": "2026-03-13",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t97",
    "projectId": "p85",
    "userId": "u19",
    "title": "Auto movement",
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t98",
    "projectId": "p85",
    "userId": "u19",
    "title": "Quality check",
    "startDate": "2026-03-23",
    "endDate": "2026-03-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Engineering"
  },
  {
    "id": "t99",
    "projectId": "p85",
    "userId": "u20",
    "title": "Install  Control & Operation",
    "startDate": "2026-02-18",
    "endDate": "2026-02-20",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t100",
    "projectId": "p85",
    "userId": "u20",
    "title": "MC Wiring Equipment",
    "startDate": "2026-02-23",
    "endDate": "2026-02-24",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  },
  {
    "id": "t101",
    "projectId": "p85",
    "userId": "u20",
    "title": "IO Check & Correct",
    "startDate": "2026-02-25",
    "endDate": "2026-02-27",
    "workloadPercentage": 100,
    "hideOnTimeline": false,
    "department": "Production"
  }
];
