//import axios from "axios";
import moment from "moment";

export const state = {
  supplierList: {
    "1": {
      id: "1",
      name: "DMax Design",
      owner: "Derek Macrae",
      description: "DMax Design is a system implementation agency based in Glasgow, Scotland. We provide project management, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      category: "Implementation Services",
      star_value: "4.5",
      location: "Portsmouth, Southampton",
      employee: "1-2",
      website: "www.abcd.com",
      contact_email: "info@abcd.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/brands/dribbble.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [
        { name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' },
        { name: "DBS Valid", start: '2023-01-01', end: null, path: 'abc' },]
    },
    "2": {
      id: "2",
      name: "Ventura Associates",
      description: "Ventura Associates is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Thomas Taylor",
      category: "Project Management",
      star_value: "3.8",
      location: "Edinburgh, Glasgow",
      employee: "2-5",
      website: "www.itesttech.com",
      contact_email: "info@itesttech.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/brands/bitbucket.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "3": {
      id: "3",
      name: "Force Beyond",
      description: "Force Beyond is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Glen Matney",
      category: "Health Services",
      star_value: "3.1",
      location: "Preston, Lancaster",
      employee: "12-15",
      website: "www.forcemedicine.com",
      contact_email: "info@forcemedicine.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-8.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "4": {
      id: "4",
      name: "Digitech Play",
      description: "Digitech Play is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Alexis Clarke",
      category: "Telecommunications",
      star_value: "3.2",
      location: "St Albans, Watford",
      employee: "1-2",
      website: "www.digitech.com",
      contact_email: "info@digitech.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-1.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "5": {
      id: "5",
      name: "Zoetic Ltd",
      description: "Zoetic Ltd is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "James Price",
      category: "Implementation Services",
      star_value: "4.4",
      location: "Brighton, Eastbourne",
      employee: "1-2",
      website: "www.zoetic.com",
      contact_email: "info@zoetic.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-6.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "6": {
      id: "6",
      name: "Micro Design",
      description: "Micro Design is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Mary Cousar",
      category: "Finance Systems",
      star_value: "2.7",
      location: "Canterbury, Dover",
      employee: "1-2",
      website: "www.microdesign.com",
      contact_email: "info@microdesign.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/brands/dropbox.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "7": {
      id: "7",
      name: "Syntex Solutions",
      description: "Syntex Solutions is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Michael Morris",
      category: "Development",
      star_value: "4.0",
      location: "St Albans, Herts",
      employee: "3-15",
      website: "www.syntycesolu.com",
      contact_email: "info@syntycesolu.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-4.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "8": {
      id: "8",
      name: "Meta Systems",
      description: "Meta Systems is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Nancy Martino",
      category: "Computer Industry",
      star_value: "3.3",
      location: "London, UK",
      employee: "1-10",
      website: "www.meta4systems.com",
      contact_email: "info@meta4systems.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-3.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "9": {
      id: "9",
      name: "Mobile Tech",
      description: "Mobile Tech is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Timothy Smith",
      category: "Project Management",
      star_value: "4.9",
      location: "Lincoln",
      employee: "5",
      website: "www.moetic.com",
      contact_email: "info@moetic.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/companies/img-4.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    },
    "10": {
      id: "10",
      name: "Centre Solutions",
      description: "Centre Solutions is a web design and development agency based in Glasgow, Scotland. We provide web design, web development, e-commerce, digital marketing and branding services to businesses around the world.",
      owner: "Herbert Stokes",
      category: "Health Services",
      star_value: "2.9",
      location: "Colchester",
      employee: "1-12",
      website: "www.syntyce.com",
      contact_email: "info@syntyce.com",
      since: moment().add(15 + Math.floor(Math.random() * 240), 'days').format("YYYY-MM-DD"),
      image_src: require("@/assets/images/brands/slack.png"),
      selected: false,
      audited: moment().subtract(15 + Math.floor(Math.random() * 240), 'days').format("DD/MM/yyyy"),
      documents: [{ name: "Insurance", start: '2023-01-01', end: '31-12-2023', path: 'abc' }]
    }
  }
};

export const mutations = {
  UPDATE_SUPPLIER(state, payload) {
    console.log('UPDATE_SUPPLIER: ', payload.id)
    Object.assign(state.supplierList[payload.id], payload.updates);
  },
  DELETE_SUPPLIER(state, id) {
    delete state.supplierList[id]
  },
  CREATE_SUPPLIER(state, payload) {
    console.log("Inserting supplier 2", payload)
    const id = Object.keys(state.supplierList).length + 1;
    console.log(id, payload);
    state.supplierList[id] = payload;
    console.log(state.supplierList)
},
};

export const actions = {
  updateSupplier({ commit }, payload) {
    commit('UPDATE_SUPPLIER', payload)
  },
  deleteSupplier({ commit }, id) {
    commit('DELETE_SUPPLIER', id)
  },
  createSupplier({ commit }, payload) {
    console.log("Inserting supplier 1", payload)
    commit('CREATE_SUPPLIER', payload)
  },
}

export const getters = {
  supplierList: state => state.supplierList,
};
