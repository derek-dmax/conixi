//import axios from "axios";
export const state = {
    supplierList:{
        "1": {
            id: "1",
            name: "DMax Design",
            owner: "Derek Macrae",
            industry_type: "Computer Industry",
            star_value: "4.5",
            location: "Portsmouth, Hampshire",
            employee: "10-30",
            website: "www.abcd.com",
            contact_email: "info@abcd.com",
            since: "1995",
            image_src: require("@/assets/images/brands/dribbble.png"),
            selected: false},
        "2": {
            id: "2",
            name: "iTest Deals",
            owner: "Thomas Taylor",
            industry_type: "Chemical Industries",
            star_value: "3.8",
            location: "Edinburgh, Lothian",
            employee: "10-15",
            website: "www.itesttech.com",
            contact_email: "info@itesttech.com",
            since: "2005",
            image_src: require("@/assets/images/brands/bitbucket.png"),
            selected: false},
        "3": {
            id: "3",
            name: "Force Beyond",
            owner: "Glen Matney",
            industry_type: "Health Services",
            star_value: "3.1",
            location: "Preston, Lancashire",
            employee: "10-15",
            website: "www.forcemedicine.com",
            contact_email: "info@forcemedicine.com",
            since: "1998",
            image_src: require("@/assets/images/companies/img-8.png"),
        selected: false},
        "4": {
        id: "4",
        name: "Digitech Play",
        owner: "Alexis Clarke",
        industry_type: "Telecommunications Services",
        star_value: "3.2",
        location: "Bogota, Colombia",
        employee: "10-25",
        website: "www.digitech.com",
        contact_email: "info@digitech.com",
        since: "1992",
        image_src: require("@/assets/images/companies/img-1.png"),
      selected: false},
      "5": {
        id: "5",
        name: "Zoetic Ltd",
        owner: "James Price",
        industry_type: "Textiles: Clothing, Footwear",
        star_value: "4.4",
        location: "Brasilia, Brazil",
        employee: "10-30",
        website: "www.zoetic.com",
        contact_email: "info@zoetic.com",
        since: "1993",
        image_src: require("@/assets/images/companies/img-6.png"),
      selected: false},
      "6": {
        id: "6",
        name: "Micro Design",
        owner: "Mary Cousar",
        industry_type: "Financial Services",
        star_value: "2.7",
        location: "Windhoek, Namibia",
        employee: "10-20",
        website: "www.microdesign.com",
        contact_email: "info@microdesign.com",
        since: "2005",
        image_src: require("@/assets/images/brands/dropbox.png"),
      selected: false},
      "7": {
        id: "7",
        name: "Syntex Solutions",
        owner: "Michael Morris",
        industry_type: "Chemical Industries",
        star_value: "4.0",
        location: "St Albans, Herts",
        employee: "01-15",
        website: "www.syntycesolu.com",
        contact_email: "info@syntycesolu.com",
        since: "1991",
        image_src: require("@/assets/images/companies/img-4.png"),
      selected: false},
      "8": {
        id: "8",
        name: "Meta Systems",
        owner: "Nancy Martino",
        industry_type: "Computer Industry",
        star_value: "3.3",
        location: "London, UK",
        employee: "01-10",
        website: "www.meta4systems.com",
        contact_email: "info@meta4systems.com",
        since: "1989",
        image_src: require("@/assets/images/companies/img-3.png"),
      selected: false},
      "9": {
        id: "9",
        name: "Mobile Tech",
        owner: "Timothy Smith",
        industry_type: "Textiles: Clothing, Footwear",
        star_value: "4.9",
        location: "St Albans, Herts",
        employee: "05-50",
        website: "www.moetic.com",
        contact_email: "info@moetic.com",
        since: "1975",
        image_src: require("@/assets/images/companies/img-4.png"),
      selected: false},
      "10": {
        id: "10",
        name: "Centre Solutions",
        owner: "Herbert Stokes",
        industry_type: "Health Services",
        star_value: "2.9",
        location: "Berlin, Germany",
        employee: "01-60",
        website: "www.syntyce.com",
        contact_email: "info@syntyce.com",
        since: "2009",
        image_src: require("@/assets/images/brands/slack.png"),
        selected: false
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
};

export const actions = {
    updateSupplier({ commit }, payload) {
        commit('UPDATE_SUPPLIER', payload)
    },
    deleteSupplier({ commit }, id) {
        commit('DELETE_SUPPLIER', id)
    },
    createSupplier({ commit }, payload) {
        commit('CREATE_SUPPLIER', payload)
    },
}

export const getters = {
    supplierList: state => state.supplierList,
};
