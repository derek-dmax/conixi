//import axios from "axios";
import moment from "moment/moment";
import { gantt } from "dhtmlx-gantt";

export const state = {
    projectList: {
        'FAB0d41d5b5d22c': {
            id: "FAB0d41d5b5d22c",
            time: "Updated 3hrs ago",
            client: 'Conixi',
            favourite: false,
            img: require("@/assets/images/brands/slack.png"),
            label: "Conixi - Admin & Dashboard",
            category: "Technology",
            subCategory: "Design and Development",
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
            tasks: [
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
            createdDate: "10 Aug, 2022",
            dueDate: "10 Feb, 2023",
        },
        '6A7EdDEA9FaDC52': {
            id: "6A7EdDEA9FaDC52",
            time: "Last update : 08 May",
            client: 'Luton BC',
            favourite: false,
            img: require("@/assets/images/brands/dribbble.png"),
            label: "Redesign - Landing page",
            category: "Technology",
            subCategory: "Website",
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
            tasks: [
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
            createdDate: "18 Sep, 2022",
            dueDate: "10 Mar, 2023",
        },
        '0bFED1ADAE4bcC1': {
            id: "0bFED1ADAE4bcC1",
            client: 'Hampshire CC',
            time: "Last update : 21 Jun",
            favourite: false,
            img: require("@/assets/images/brands/dropbox.png"),
            label: "Project App",
            category: "Technology",
            subCategory: "Development",
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
            tasks: [
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
            createdDate: "03 Aug, 2022",
            dueDate: "11 Apr, 2023",
        },
    },
};

export const mutations = {
    updateProject(state, payload) {
        console.log('updateProject: ', payload.id)
        Object.assign(state.projectList[payload.id], payload.updates);
    },
    updateProjectTask(state, payload) {
        console.log('updateProjectTask: ' + payload.id + ', task: ' + payload.taskId)
        const selTask = state.projectList[payload.id].tasks.find(task => task.id === payload.taskId)
        if(payload.updates.changePayment !== undefined) selTask.changePayment = payload.updates.changePayment;
        if(payload.updates.payment !== undefined) selTask.payment = payload.updates.payment;
    },
    deleteProject(state, id) {
        delete state.projectList[id]
    },
    createProject(state, payload) {
        state.projectList[payload.id] = payload;
    }
};

export const actions = {
    updateProject({ commit }, payload) {
        commit('updateProject', payload)
    },
    updateProjectTask({ commit }, payload) {
        commit('updateProjectTask', payload)
    },
    deleteProject({ commit }, id) {
        commit('deleteProject', id)
    },
    createProject({ commit }, payload) {
        commit('createProject', payload)
    }
};

export const getters = {
    projectList: state => state.projectList,
    //    project: state => state.projectList[id]
};
