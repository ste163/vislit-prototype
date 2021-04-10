"use strict";
// Code based on: https://www.digitalocean.com/community/tutorials/how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch

// Currently unable to dynamically import the json file, hardcoded for prototyping
// import jsonDatabase from "/home/lin/.config/prototype_vislit_vue/vislit-database.json";
// const express = require("express");
// const pathLibrary = require("path");
// const { Client } = require("elasticsearch");

// const expressApp = express();

// const client = new Client({
//   hosts: ["http://localhost:9200"],
//   node: "http://localhost:3001"
// });

// export function startElasticSearch() {
//   client.ping(
//     {
//       requestTimeout: 30000
//     },
//     error => {
//       if (error) {
//         console.error("Elasticsearch is down", error);
//       } else {
//         console.log("Elastic search is running");
//         // Only bulk add projects once
//         // bulkAddAllProjects();
//       }
//     }
//   );
// }

// expressApp.set("port", process.env.PORT || 3001);
// expressApp.use(express.static(pathLibrary.join(__dirname, "public")));

// expressApp.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// // define the /search route that should return elastic search results
// expressApp.get("/search", function(req, res) {
//   // declare the query object to search elastic search and return only 200 results from the first result found.
//   // also match any data where the name is like the query string sent in
//   let body = {
//     size: 200,
//     from: 0,
//     query: {
//       // https://logz.io/blog/elasticsearch-queries/ - MORE INFO ON QUERIES
//       query_string: {
//         query: req.query["q"]
//       }
//     }
//   };
//   // perform the actual search passing in the index, the search query and the type
//   client
//     .search({ index: "vislit-projects", body: body, type: "projects_list" })
//     .then(results => {
//       res.send(results.hits.hits);
//     })
//     .catch(err => {
//       console.log(err);
//       res.send([]);
//     });
// });
// // listen on the specified port
// expressApp.listen(expressApp.get("port"), function() {
//   console.log("Express server listening on port " + expressApp.get("port"));
// });

// export async function searchProjects(query) {
//   // Get each individual word
//   const regex = /[ ,]+/;
//   const matches = query.split(regex);

//   // For each word, add an asterisk to the end
//   const wildCardQueries = matches.map(match => `${match}*`);

//   // Turn array into a space-delimited string. ToString returns comma-delimited string
//   let finalQuery = wildCardQueries.toString().replace(/[,]+/g, " ");

//   if (finalQuery === "*") {
//     finalQuery = "";
//   }

//   // Create search object
//   var body = {
//     size: 200,
//     from: 0,
//     query: {
//       wildcard: {
//         title: {
//           value: finalQuery
//         }
//       }
//     }
//   };
//   // search the Elasticsearch passing in the index, query object and type
//   try {
//     const results = await client.search({
//       index: "vislit-projects",
//       body: body,
//       type: "projects_list"
//     });

//     return results;
//   } catch (e) {
//     console.error("SEARCH FAILED", e);
//   }
// }
// function bulkAddAllProjects() {
//   let bulk = [];

//   jsonDatabase.projects.forEach(project => {
//     bulk.push({
//       index: {
//         _index: "vislit-projects",
//         _type: "projects_list"
//       }
//     });
//     bulk.push(project);
//   });

//   client.bulk({ body: bulk }, function(error) {
//     if (error) {
//       console.log("Failed Bulk operation".red, error);
//     } else {
//       console.log(
//         "Successfully imported %s".green,
//         jsonDatabase.projects.length
//       );
//     }
//   });
// }

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
