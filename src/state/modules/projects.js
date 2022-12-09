//import axios from "axios";

export const state = {
    projectList: {
        '1': {
            id: 1,
            time: "Updated 3hrs ago",
            client: 'Conixi',
            favourite: false,
            img: require("@/assets/images/brands/slack.png"),
            label: "Conixi - Admin & Dashboard",
            category: "Technology",
            subCategory: "Design and Development",
            skills: ["UI", "HTML", "CSS", "Vue"],
            caption: "Build project dashboard plus admin section.",
            description: "Build project dashboard plus admin section.",
            number: "18/42",
            progressBar: "34%",
            status: "Testing",
            priority: "High",
            members: [
                {
                    name: "Alex Raubitschek",
                    img: require("@/assets/images/users/avatar-3.jpg"),
                    projects: 2,
                    tasks: 9
                },
                {
                    name: "Derek Macrae",
                    img: require("@/assets/images/users/derekm.jpg"),
                    projects: 2,
                    tasks: 11
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
        '2': {
            id: 2,
            time: "Last update : 08 May",
            client: 'Luton BC',
            favourite: false,
            img: require("@/assets/images/brands/dribbble.png"),
            label: "Redesign - Landing page",
            category: "Technology",
            subCategory: "Website",
            skills: ["UI", "Graphic Design", "Website Dev"],
            caption: "Re-design a landing page as per abc minimal design.",
            description: "Re-design a landing page as per abc minimal design.",
            number: "22/56",
            progressBar: "54%",
            status: "In Progress",
            priority: "Medium",
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
        '3': {
            id: 3,
            client: 'Hampshire CC',
            time: "Last update : 21 Jun",
            favourite: false,
            img: require("@/assets/images/brands/dropbox.png"),
            label: "Project App",
            category: "Technology",
            subCategory: "Development",
            skills: ["System Design", "Database Design", "Vue", "NestJS"],
            caption: "Create an application for project management and task management.",
            description: "Create an application for project management and task management.",
            number: "20/34",
            progressBar: "78%",
            status: "In Progress",
            priority: "High",
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
        Object.assign(state.projectList[payload.id], payload.updates);
    },
    deleteProject(state, id) {
        console.log('deleteProject: ', id)
        delete state.projectList[id];
    },
    createProject(state, payload) {
        console.log('createProject: ', payload)
        state.projectList[payload.id] = payload;
    }
};

export const actions = {
    updateProject({ commit }, payload) {
        commit('updateProject', payload)
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
