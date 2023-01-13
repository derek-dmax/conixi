//import axios from "axios";
import moment from "moment/moment";
import { gantt } from "dhtmlx-gantt";

export const state = {
    projectList: {
        'FAB0d41d5b5d22c': {
            id: "FAB0d41d5b5d22c",
            time: moment(),
            client: 'Conixi',
            favourite: false,
            img: require("@/assets/images/brands/slack.png"),
            label: "Conixi - Admin & Dashboard",
            category: "Technology",
            subCategory: "Software Development",
            projectType: "Product Delivery",
            skills: ["UI", "HTML", "CSS", "Vue"],
            services: [
                "Build project dashboard",
                "Deploy Admin section"
            ],
            description: "Build project dashboard plus admin section.",
            number: "3/11",
            progressBar: "17%",
            status: "Testing",
            priority: "High",
            tasks: {
                data: [
                    {
                        id: 1,
                        type: gantt.config.types.project, 
                        text: "Project Scoping & Design",
                        progress: 100,
                        open: true,
                        duration: "12",
                        start_date: moment().subtract(15, "days"),
                        payment: 0,
                        parent: 0,
                        status: "In Progress",
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: 'Admin',
                        group: 'Project Scoping & Design',
                    },
                    {
                        id: 2,
                        text: "Client Workshops",
                        start_date: moment().subtract(15, "days"),
                        duration: "7",
                        progress: 100,
                        parent: "1",
                        open: true,
                        payment: 1000,
                        status: "Paid",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: 'Admin',
                        group: 'Project Scoping & Design',
                    },
                    {
                        id: 3,
                        text: "Specifications",
                        start_date: moment().subtract(13, "days"),
                        duration: "6",
                        parent: "1",
                        progress: 100,
                        open: true,
                        payment: 0,
                        status: "Approved",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: 'Admin',
                        group: 'Project Scoping & Design',
                    },
                    {
                        id: 4,
                        type: gantt.config.types.milestone,
                        text: "Specification Signoff",
                        start_date: moment().subtract(7, "days"),
                        duration: "0",
                        parent: "1",
                        progress: 100,
                        open: true,
                        payment: 1000,
                        status: "Completed",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: 'Admin',
                        group: 'Project Scoping & Design',
                    },
                    {
                        id: 5,
                        type: gantt.config.types.project, 
                        text: "Design & Development",
                        start_date: moment().subtract(5, "days"),
                        duration: "8",
                        progress: 40,
                        parent: 0,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 6,
                        text: "Database Design & Development",
                        start_date: moment().subtract(9, "days"),
                        duration: "9",
                        parent: "5",
                        progress: 100,
                        open: true,
                        payment: 0,
                        status: "Completed",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 7,
                        text: "API Development",
                        start_date: moment(),
                        duration: "7",
                        parent: "5",
                        progress: 10,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 8,
                        text: "Standard Supporting Services",
                        start_date: moment().add(4, "days"),
                        duration: "8",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 9,
                        text: "Main Admin Development",
                        start_date: moment().add(10, "days"),
                        duration: "5",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 10,
                        text: "Dashboard Development",
                        start_date: moment().add(13, "days"),
                        duration: "5",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "Completed",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 11,
                        type: gantt.config.types.milestone, 
                        text: "Admin Testing",
                        start_date: moment().add(16, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 12,
                        text: "Fix/Re-Test",
                        start_date: moment().add(16, "days"),
                        parent: 0,
                        duration: "4",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 13,
                        type: gantt.config.types.milestone,
                        text: "Admin Go-Live",
                        start_date: moment().add(21, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 4000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                    {
                        id: 14,
                        type: gantt.config.types.milestone,
                        text: "Dashboard Go-Live",
                        start_date: moment().add(24, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 2000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Build project dashboard",
                        group: "Design & Development",
                    },
                ],
                links: [
                    { id: "1", source: "2", target: "3", type: "0" },
                    { id: "2", source: "3", target: "4", type: "0" },
                    { id: "3", source: "9", target: "10", type: "0" },
                    { id: "4", source: "6", target: "7", type: "0" },
                    { id: "5", source: "7", target: "8", type: "0" },
                    { id: "6", source: "8", target: "9", type: "0" },
                    { id: "7", source: "11", target: "12", type: "0" },
                    { id: "8", source: "12", target: "13", type: "0" },
                    { id: "9", source: "10", target: "14", type: "0" },
                ]
            },
            members: [
                {
                    name: "Laura Van Zyl",
                    img: require("@/assets/images/users/avatar-2.jpg"),
                    projects: 2,
                    tasks: 12
                },
                {
                    name: "Alex Raubitschek",
                    img: require("@/assets/images/users/avatar-3.jpg"),
                    projects: 2,
                    tasks: 9
                }
            ],
            suppliers: [
                {
                    name: "DMax Design",
                    img: require("@/assets/images/companies/img-2.png"),
                }
            ],
            subItem: [{
                id: 1,
                imgFooter: require("@/assets/images/users/avatar-2.jpg")
            },
            {
                id: 2,
                imgNumber: "+"
            },
            ],
            createdDate: moment().subtract(18, 'days'),
            dueDate: moment().add(45, 'days'),
        },
        '6A7EdDEA9FaDC52': {
            id: "6A7EdDEA9FaDC52",
            time: moment().subtract(3, 'days'),
            client: 'Surrey County Council',
            favourite: false,
            img: require("@/assets/images/brands/dribbble.png"),
            label: "Redesign - Landing page",
            category: "Technology",
            subCategory: "Software Development",
            projectType: "Product Delivery",
            skills: ["UI", "Graphic Design", "Website Dev"],
            services: [
                "Landing Page Re-design",
                "Materials to support Development"
            ],
            description: "Re-design a landing page as per abc minimal design.",
            number: "2/12",
            progressBar: "9%",
            status: "In Progress",
            priority: "Medium",
            tasks: {
                data: [
                    {
                        id: 1,
                        type: gantt.config.types.project, 
                        text: "Design New Landing Page",
                        progress: 85,
                        open: true,
                        duration: "5",
                        start_date: moment().subtract(5, "days"),
                        payment: 0,
                        parent: 0,
                        status: "In Progress",
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 2,
                        text: "Prepare Designs",
                        start_date: moment().subtract(5, "days"),
                        duration: "2",
                        progress: 100,
                        parent: "1",
                        open: true,
                        payment: 0,
                        status: "Completed",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 3,
                        text: "Agree Designs",
                        start_date: moment().subtract(3, "days"),
                        duration: "3",
                        parent: "1",
                        progress: 75,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 4,
                        type: gantt.config.types.milestone,
                        text: "Design Signoff",
                        start_date: moment(),
                        duration: "0",
                        parent: "1",
                        progress: 0,
                        open: true,
                        payment: 1000,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 5,
                        type: gantt.config.types.project, 
                        text: "Coding",
                        start_date: moment().add(1, "days"),
                        duration: 0,
                        progress: 0,
                        parent: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 6,
                        text: "Database Changes",
                        start_date: moment().add(1, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 25,
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 7,
                        text: "CSS Amendments",
                        start_date: moment().add(2, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 9,
                        text: "HTML/Javascript Coding",
                        start_date: moment().add(3, "days"),
                        duration: "5",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 11,
                        text: "Testing",
                        start_date: moment().add(5, "days"),
                        parent: 0,
                        progress: 0,
                        duration: "2",
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 12,
                        text: "Fix/Re-Test",
                        start_date: moment().add(7, "days"),
                        parent: 0,
                        duration: "2",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                    {
                        id: 13,
                        type: gantt.config.types.milestone,
                        text: "Go-Live",
                        start_date: moment().add(9, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 4000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Landing Page Re-design",
                        group: null,
                    },
                ],
                links: [
                    { id: "1", source: "1", target: "2", type: "1" },
                    { id: "2", source: "2", target: "3", type: "0" },
                    { id: "3", source: "3", target: "4", type: "0" },
                    { id: "4", source: "2", target: "5", type: "2" },
                    { id: "5", source: "2", target: "6", type: "2" },
                    { id: "6", source: "3", target: "7", type: "2" },
                    { id: "7", source: "4", target: "8", type: "2" },
                    { id: "8", source: "4", target: "9", type: "2" },
                    { id: "9", source: "4", target: "10", type: "2" },
                    { id: "10", source: "11", target: "12", type: "1" },
                ]
            },
            members: [
                {
                    name: "Derek Macrae",
                    img: require("@/assets/images/users/derekm.jpg"),
                    role: 'Owner',
                    projects: 2,
                    tasks: 9
                },
                {
                    name: "Laura Van Zyl",
                    role: 'Approver',
                    img: require("@/assets/images/users/avatar-2.jpg"),
                    projects: 2,
                    tasks: 12
                },
            ],
            suppliers: [
                {
                    name: "Ventura Associates",
                    img: require("@/assets/images/companies/img-6.png"),
                }
            ],
            subItem: [{
                id: 1,
                imgFooter: require("@/assets/images/users/avatar-3.jpg")
            },
            {
                id: 2,
                imgNumber: "S",
                bgColor: "secondary"
            },
            {
                id: 3,
                imgFooter: require("@/assets/images/users/avatar-4.jpg")
            },
            {
                id: 4,
                imgNumber: "+"
            },
            ],
            createdDate: moment().subtract(8, 'days'),
            dueDate: moment().add(65, 'days'),
        },
        '0bFED1ADAE4bcC1': {
            id: "0bFED1ADAE4bcC1",
            client: 'Hampshire County Council',
            time: moment().subtract(10, 'days'),
            favourite: false,
            img: require("@/assets/images/brands/dropbox.png"),
            label: "Project App",
            category: "Technology",
            subCategory: "Software Development",
            projectType: "Product Delivery",
            skills: ["System Design", "Database Design", "Vue", "NestJS"],
            services: [
                "Project Management Application",
                "Task Management Application",
            ],
            description: "Create an application for project management and task management.",
            number: "2/12",
            progressBar: "9%",
            status: "In Progress",
            priority: "High",
            tasks: {
                data: [
                    {
                        id: 1,
                        type: gantt.config.types.project, 
                        text: "Design New Landing Page",
                        progress: 80,
                        open: true,
                        duration: "5",
                        start_date: moment().subtract(5, "days"),
                        payment: 0,
                        parent: 0,
                        status: "New",
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 2,
                        text: "Prepare Designs",
                        start_date: moment().subtract(5, "days"),
                        duration: "2",
                        progress: 90,
                        parent: "1",
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 3,
                        text: "Agree Designs",
                        start_date: moment().subtract(3, "days"),
                        duration: "3",
                        parent: "1",
                        progress: 75,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 4,
                        type: gantt.config.types.milestone,
                        text: "Design Signoff",
                        start_date: moment(),
                        duration: "0",
                        parent: "1",
                        progress: 0,
                        open: true,
                        payment: 1000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 5,
                        type: gantt.config.types.project, 
                        text: "Coding",
                        start_date: moment().add(1, "days"),
                        duration: 0,
                        progress: 0,
                        parent: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 6,
                        text: "Database Changes",
                        start_date: moment().add(1, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 7,
                        text: "CSS Amendments",
                        start_date: moment().add(2, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 9,
                        text: "HTML/Javascript Coding",
                        start_date: moment().add(3, "days"),
                        duration: "5",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 11,
                        text: "Testing",
                        start_date: moment().add(5, "days"),
                        parent: 0,
                        progress: 0,
                        duration: "2",
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 12,
                        text: "Fix/Re-Test",
                        start_date: moment().add(7, "days"),
                        parent: 0,
                        duration: "2",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                    {
                        id: 13,
                        type: gantt.config.types.milestone,
                        text: "Go-Live",
                        start_date: moment().add(9, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 4000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Project Management Application",
                        group: null,
                    },
                ],
                links: [
                    { id: "1", source: "2", target: "3", type: "0" },
                    { id: "2", source: "3", target: "4", type: "0" },
                    { id: "3", source: "4", target: "5", type: "0" },
                    { id: "4", source: "6", target: "7", type: "0" },
                    { id: "5", source: "7", target: "8", type: "0" },
                    { id: "7", source: "9", target: "10", type: "0" },
                    { id: "8", source: "10", target: "11", type: "0" },
                ]
            },
            members: [
                {
                    name: "Laura Van Zyl",
                    img: require("@/assets/images/users/avatar-2.jpg"),
                    projects: 2,
                    tasks: 12
                },
                {
                    name: "Derek Macrae",
                    img: require("@/assets/images/users/derekm.jpg"),
                    projects: 2,
                    tasks: 11
                }
            ],
            suppliers: [
                {
                    name: "DMax Design",
                    img: require("@/assets/images/companies/img-2.png"),
                }
            ],
            subItem: [{
                id: 1,
                imgNumber: "K",
                bgColor: "info"
            },
            {
                id: 2,
                imgNumber: "M",
                bgColor: "danger"
            },
            {
                id: 3,
                imgNumber: "+"
            },
            ],
            createdDate: moment().subtract(22, 'days'),
            dueDate: moment().add(35, 'days'),
        },
        '0bxED1ADAE4bcC1': {
            id: "0bxED1ADAE4bcC1",
            client: 'Hampshire County Council',
            time: moment().subtract(17, 'days'),
            favourite: false,
            img: require("@/assets/images/brands/bitbucket.png"),
            label: "Changing Room Plans",
            category: "Construction",
            subCategory: "Planning",
            projectType: "Consultancy",
            skills: ["Architecture", "Building", "Costing"],
            services: [
                "Building Plan",
                "Cost Schedule",
            ],
            description: "Create and cost a plan for a new build of football pitch changing rooms.",
            number: "2/12",
            progressBar: "9%",
            status: "In Progress",
            priority: "High",
            tasks: {
                data: [
                    {
                        id: 1,
                        type: gantt.config.types.project, 
                        text: "Initial Discussions",
                        progress: 80,
                        open: true,
                        duration: "5",
                        start_date: moment().subtract(5, "days"),
                        payment: 0,
                        parent: 0,
                        status: "New",
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 2,
                        text: "Prepare Designs",
                        start_date: moment().subtract(5, "days"),
                        duration: "2",
                        progress: 90,
                        parent: "1",
                        open: true,
                        payment: 0,
                        status: "In Progress",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 3,
                        text: "Agree Designs",
                        start_date: moment().subtract(3, "days"),
                        duration: "3",
                        parent: "1",
                        progress: 75,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 4,
                        type: gantt.config.types.milestone,
                        text: "Design Signoff",
                        start_date: moment(),
                        duration: "0",
                        parent: "1",
                        progress: 0,
                        open: true,
                        payment: 1000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 5,
                        type: gantt.config.types.project, 
                        text: "Coding",
                        start_date: moment().add(1, "days"),
                        duration: 0,
                        progress: 0,
                        parent: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 6,
                        text: "Database Changes",
                        start_date: moment().add(1, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 7,
                        text: "CSS Amendments",
                        start_date: moment().add(2, "days"),
                        duration: "1",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 9,
                        text: "HTML/Javascript Coding",
                        start_date: moment().add(3, "days"),
                        duration: "5",
                        parent: "5",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 11,
                        text: "Testing",
                        start_date: moment().add(5, "days"),
                        parent: 0,
                        progress: 0,
                        duration: "2",
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 12,
                        text: "Fix/Re-Test",
                        start_date: moment().add(7, "days"),
                        parent: 0,
                        duration: "2",
                        progress: 0,
                        open: true,
                        payment: 0,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                    {
                        id: 13,
                        type: gantt.config.types.milestone,
                        text: "Go-Live",
                        start_date: moment().add(9, "days"),
                        parent: 0,
                        progress: 0,
                        open: true,
                        payment: 4000,
                        status: "New",
                        changePayment: false,
                        changeStatus: false,
                        changeDate: false,
                        changeDescription: false,
                        service: "Building Plan",
                        group: null,
                    },
                ],
                links: [
                    { id: "1", source: "2", target: "3", type: "0" },
                    { id: "2", source: "3", target: "4", type: "0" },
                    { id: "3", source: "4", target: "5", type: "0" },
                    { id: "4", source: "6", target: "7", type: "0" },
                    { id: "5", source: "7", target: "8", type: "0" },
                    { id: "7", source: "9", target: "10", type: "0" },
                    { id: "8", source: "10", target: "11", type: "0" },
                ]
            },
            members: [
                {
                    name: "Laura Van Zyl",
                    img: require("@/assets/images/users/avatar-6.jpg"),
                    projects: 2,
                    tasks: 12
                },
                {
                    name: "Derek Macrae",
                    img: require("@/assets/images/users/avatar-5.jpg"),
                    projects: 2,
                    tasks: 11
                }
            ],
            suppliers: [
                {
                    name: "DMax Design",
                    img: require("@/assets/images/companies/img-2.png"),
                }
            ],
            subItem: [{
                id: 1,
                imgNumber: "K",
                bgColor: "info"
            },
            {
                id: 2,
                imgNumber: "M",
                bgColor: "danger"
            },
            {
                id: 3,
                imgNumber: "+"
            },
            ],
            createdDate: moment().subtract(22, 'days'),
            dueDate: moment().add(35, 'days'),
        },
    },
    clients: {
        'Hampshire County Council': {
            name: 'Hampshire County Council',
            code: 'HCC',
            projCategories: ['Technology', 'Engineering']
        },
        'Surrey County Council': {
            name: 'Surrey County Council',
            code: 'SCC',
            projCategories: ['Business Strategy', 'Change Management', 'Technology', 'Engineering']
        },
        'Luton Borough Council': {
            name: 'Luton Borough Council',
            code: 'LBC',
            projCategories: ['Technology', 'Construction']
        },
    },
    categories: {
        'Technology': {
            name: 'Technology',
            short: 'Tech',
            defaultProjectType: 'Product Delivery'
        },
        'Business Strategy': {
            name: 'Business Strategy',
            short: 'Strat',
            defaultProjectType: 'Consultancy'
        },
        'Change Management': {
            name: 'Change Management',
            short: 'Change',
            defaultProjectType: 'Consultancy'
        },
        'Engineering': {
            name: 'Engineering',
            short: 'Eng.',
            defaultProjectType: 'Building'
        },
        'Construction': {
            name: 'Construction',
            short: 'Constr.',
            defaultProjectType: 'Building'
        },
    },
    subCategories: {
        'Hardware Installation': {
            name: 'Hardware Installation',
            code: 'HwInst',
            defaultProjectType: 'Installation',
            categories: ['Technology', 'Engineering'],
            clients: ['All']
        },
        'Hardware Upgrade': {
            name: 'Hardware Upgrade',
            code: 'HwUpg',
            defaultProjectType: 'Installation',
            categories: ['Technology'],
            clients: ['All']
        },
        'Product Delivery': {
            name: 'Product Delivery',
            code: 'SftDev',
            defaultProjectType: 'Product Delivery',
            categories: ['Technology'],
            clients: ['All']
        },
        'Software Installation': {
            name: 'Software Installation',
            code: 'SftInst',
            defaultProjectType: 'Installation',
            categories: ['Technology'],
            clients: ['All']
        },
        'Software Upgrade': {
            name: 'Software Upgrade',
            code: 'SftUpd',
            defaultProjectType: 'Installation',
            categories: ['Technology'],
            clients: ['All']
        },
    },
    projectTypes: {
        'Installation': {
            name: 'Installation',
            code: 'Inst',
            clients: ['All']
        },
        'Product Delivery': {
            name: 'Product Delivery',
            code: 'Prd',
            clients: ['All']
        },
        'Building': {
            name: 'Building',
            code: 'Bld',
            clients: ['All']
        },
        'Consultancy': {
            name: 'Consultancy',
            code: 'Cnt',
            clients: ['All']
        },
    },
};

export const mutations = {
    UPDATE_PROJECT(state, payload) {
        console.log('UPDATE_PROJECT: ', payload.id)
        Object.assign(state.projectList[payload.id], payload.updates);
    },
    UPDATE_CLIENT(state, payload) {
        console.log('UPDATE_CLIENT: ', payload.client)
        Object.assign(state.clients[payload.client], payload.updates);
    },
    UPDATE_CATEGORY(state, payload) {
        console.log('UPDATE_CATEGORY: ', payload.category)
        Object.assign(state.categories[payload.category], payload.updates);
    },
    UPDATE_SUBCATEGORY(state, payload) {
        console.log('UPDATE_SUBCATEGORY: ', payload.subCategory)
        Object.assign(state.subCategories[payload.subCategory], payload.updates);
    },
    UPDATE_PROJECTTYPES(state, payload) {
        console.log('UPDATE_PROJECTTYPES: ', payload.projectType)
        Object.assign(state.projectTypes[payload.projectType], payload.updates);
    },
    UPDATE_PROJECT_TASK(state, payload) {
        console.log('UPDATE_PROJECT_TASK: ' + payload.id + ', task: ' + payload.taskId)
        const selTask = state.projectList[payload.id].tasks.find(task => task.id === payload.taskId)
        if(payload.updates.changePayment !== undefined) selTask.changePayment = payload.updates.changePayment;
        if(payload.updates.payment !== undefined) selTask.payment = payload.updates.payment;
    },
    DELETE_PROJECT(state, id) {
        delete state.projectList[id]
    },
    DELETE_CATEGORY(state, name) {
        delete state.categories[name]
    },
    DELETE_SUBCATEGORY(state, name) {
        delete state.subCategories[name]
    },
    DELETE_PROJECTTYPE(state, name) {
        delete state.projectType[name]
    },
    CREATE_PROJECT(state, payload) {
        console.log("Inserting project", payload)
        state.projectList[payload.id] = payload
        console.log(state.projectList)
    },
    CREATE_CATEGORY(state, payload) {
        console.log("Adding Category", payload)
        state.categories[payload.name] = payload
        console.log(state.categories)
    },
    CREATE_SUBCATEGORY(state, payload) {
        console.log("Adding Sub Category", payload)
        state.subCategories[payload.name] = payload
        console.log(state.subCategories)
    },
    CREATE_PROJECTTYPE(state, payload) {
        console.log("Adding Project Type", payload)
        state.projectTypes[payload.name] = payload
        console.log(state.projectTypes)
    },
    REMOVE_TASK(state, payload) {
        console.log("Removing task", payload)
        state.projectList[payload.id].tasks = state.projectList[payload.id].tasks.filter(task => task.id!== payload.taskId)
    },
    INSERT_TASK(state, payload) {
        let passTask = Object.assign({}, payload.task) // avoid "by reference" issues
        if(passTask.payment > 0 && passTask.duration > 0) {
            let payment = passTask.payment
            passTask.payment = 0
            let textStartDate = moment(passTask.start_date.format('DD-MMM-YYYY'))
            console.log("Start Date Passed", textStartDate)
            state.projectList[payload.id].tasks.data.push(passTask)
            payload.task.type = gantt.config.types.milestone
            payload.task.payment = payment
            payload.task.text = 'Milestone for - ' + passTask.text
            payload.task.start_date = payload.task.start_date.add(payload.task.duration, 'days')
            passTask.start_date = moment(textStartDate)
            payload.task.duration = 0
            payload.task.id += 1
            let maxid = 0
            let maxedId = 0
            state.projectList[payload.id].tasks.links.map (function (obj) { if (parseInt(obj.id) > maxid) maxedId = parseInt(obj.id) })
            // insert link between task and milestone
            state.projectList[payload.id].tasks.links.push(
                {
                    id: (maxedId + 1).toString(),
                    source: (parseInt(payload.task.id) - 1).toString(),
                    target: payload.task.id.toString(),
                    type: "0"
                })
            console.log("Inserting extra milestone task", payload.task)
        } else {
            console.log("Inserting task", payload.task)
        }
        state.projectList[payload.id].tasks.data.push(payload.task)
        console.log("New ta list: ", state.projectList[payload.id].tasks)
    }
};

export const actions = {
    updateProject({ commit }, payload) {
        commit('UPDATE_PROJECT', payload)
    },
    updateCategory({ commit }, payload) {
        commit('UPDATE_CATEGORY', payload)
    },
    updateSubCategory({ commit }, payload) {
        commit('UPDATE_SUBCATEGORY', payload)
    },
    updateProjectType({ commit }, payload) {
        commit('UPDATE_PROJECTTYPE', payload)
    },
    updateProjectTask({ commit }, payload) {
        commit('UPDATE_PROJECT_TASK', payload)
    },
    deleteProject({ commit }, id) {
        commit('DELETE_PROJECT', id)
    },
    deleteCategory({ commit }, name) {
        commit('DELETE_CATEGORY', name)
    },
    deleteSubCategory({ commit }, name) {
        commit('DELETE_SUBCATEGORY', name)
    },
    deleteProjectType({ commit }, name) {
        commit('DELETE_PROJECTTYPE', name)
    },
    createProject({ commit }, payload) {
        commit('CREATE_PROJECT', payload)
    },
    removeTask({ commit }, payload) {
        commit('REMOVE_TASK', payload)
    },
    insertTask({ commit }, payload) {
        console.log('insertTask a', payload)
        commit('INSERT_TASK', payload)
    }
}

export const getters = {
    projectList: state => state.projectList,
    categories: state => state.categories,
    subCategories: state => state.subCategories,
    projectTypes: state => state.projectTypes,
};
