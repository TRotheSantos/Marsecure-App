const dal = require("../data/datalayer");
const fs = require('fs');
const _ = require("underscore");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 130;

const business = {
    getAllEntries: function(){
        return dal.getAllEntries();
    },


    getEntries : function(number, page){
        //vérifier les paramètres
        
        if(number === undefined || page === undefined){
            number = defaultNumber;
            page = defaultPage;
        }

        if(number>defaultNumber){
            number = maxNumber;
        }

        const resEntries = dal.getEntries(number,page);
        resEntries.page = page;
        resEntries.numberByPage = number;
        resEntries.totalPages = Math.ceil(resEntries.total/number);

        return resEntries;
    },

    addEntries : function(entry){
        return dal.addEntries(entry);;
    },

}
    module.exports = business;