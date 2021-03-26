"use strict";
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
  console.log("DATABASE", jsonDatabase.projects);
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
