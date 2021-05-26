# Vislit Vue Prototype

> The main project's [github repo](https://github.com/ste163/vislit)

Vue-version of Vislit prototype. Made using Vue version 2. If going to update to Vue version 3, need to check all dependencies.

## Features Roadmap

### Dashboard

- Simple dashboard UI for creating writing projects
- List of projects in database
- Selecting projects animates in empty info cards in main dashboard content section
- Animating changes in state/dashboard views

### Data Viz

- State-based progress bar

### Storage

- ~~Export and Import database file for allowing the user to backup their data however they want~~
- CRUD for projects

### Writing

- TipTap to write inside of Vislit w/ HTML export.
- Write notes and export them as Word documents or PDFs
- Write actual stories in Quill
- Possibly have linking to Google Docs and Word Online

### Quality of Life

- Write a way to save and load the last window size and position. One way: https://github.com/electron/electron/issues/526

## Technologies to Test

### To test

- [vee-validate](https://github.com/logaretm/vee-validate) - form validation
- [D3.js](https://d3js.org/) - data visualizations
- [TipTap](https://github.com/ueberdosis/tiptap) - rich text editor under MIT, made for Vue, Exports to HTML for easy conversion to Word or reloading into the app.
- [vue-smooth-dnd](https://github.com/kutlugsahin/vue-smooth-dnd) - animated drag and drop feature --- might not be needed
- [vue-good-table](https://github.com/xaksis/vue-good-table) - advanced tables --- might not be needed as I could do my own settings for "rows to show" and pagination

### Tested & in prototype

- ~~[Lowdb](https://github.com/typicode/lowdb) - data storage~~
- ~~[nanoid](https://github.com/ai/nanoid/) - unique id generator for lowdb~~
- ~~[MiniSearch](https://github.com/lucaong/minisearch) - high-quality real-time search~~
- ~~[vue-toastification](https://github.com/Maronato/vue-toastification) - toast notifications~~
