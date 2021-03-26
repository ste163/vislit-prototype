"use strict";
// Currently unable to dynamically import the json file, hardcoded for prototyping
import jsonDatabase from "/home/lin/.config/prototype_vislit_vue/vislit-database.json";
const { Client } = require("elasticsearch");

const client = new Client({
  hosts: ["http://localhost:9200"],
  node: "http://localhost:9200"
});

export function elasticSearch() {
  client.ping(
    {
      requestTimeout: 30000
    },
    error => {
      if (error) {
        console.error("Elasticsearch is down", error);
      } else {
        console.log("Elastic search is running");
        bulkAddAllProjects();
      }
    }
  );
}

function bulkAddAllProjects() {
  let bulk = [];

  jsonDatabase.projects.forEach(project => {
    bulk.push({
      index: {
        _index: "vislit-projects",
        _type: "projects_list"
      }
    });
    bulk.push(project);
  });

  console.log("BULK", bulk);
}

// Only needs to run once, to create the index
// create a new index called vislit-projects. If the index has already been created, this function fails safely
// client.indices.create(
//   {
//     index: "vislit-projects"
//   },
//   function(error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("created a new index", response);
//     }
//   }
// );
