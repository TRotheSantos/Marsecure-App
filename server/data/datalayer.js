const { json } = require("express");
const fs = require("fs");
const _ = require("underscore");
const filename ="./data/entries.json";


const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 130;

let dataLayer = {
    getAllEntries : function(){
        const data = fs.readFileSync(filename);

        const entries = JSON.parse(data);

        return entries;
    },
    getNextId : function() {
        //read json file
        let rawdata = fs.readFllesync(filename);
        //parse to object
        let entries = json.parse(rawdata);
        //get max id
        const maxId = Math.max.apply(Math,entries.app(filename));
        //return max id + 1;
        return maxId + 1;
    },

    getEntries : function(number,page){
        {
            let rawdata = fs.readFileSync(filename);
            let entries = JSON.parse(rawdata);
            const total = entries.length;

            if(number && page){
                entries = entries.slice((page-1)*number,page*number);//calcul à revoir
            }

            const result = {
                total : total,
                result : entries
            };

            return result;
        }
    },

    /*addCustomers : function(newCustomer){
        let data = fs.readFileSync(filename, "utf-8");
        let added = JSON.parse(data);
        added.push(newCustomer);

        fs.writeFileSync(filename, JSON.stringify(added), (error) => {
            if(error) throw error;
        });

        return added;

    }*/
    addEntries: function(newEntry) {
        let data = fs.readFileSync(filename, "utf-8");
        let entries = JSON.parse(data);
        
        const total = entries.length;
        let id = total + 1;
        
        var d = new Date();
        var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var fullDate = date + ' ' + hours;
      
        const entry = {
          id: id,
          street: newEntry.street,
          subject: newEntry.subject,
          description: newEntry.description,
          coord: {
            lat: newEntry.coord.lat,
            lng: newEntry.coord.lng,
          },
          date: fullDate,
        };
      
        entries.push(entry);
      
        fs.writeFileSync(filename, JSON.stringify(entries), (error) => {
          if (error) throw error;
        });
      
        return entries;
      }
      


};
    module.exports = dataLayer;