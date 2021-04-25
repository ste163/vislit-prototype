<template>
  <ul class="list">
    <li class="list-item">
      <button class="button" @click="handleEdit">Edit</button>
    </li>
    <li class="list-item">
      <button class="button" @click="handleDelete">Delete</button>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    handleEdit() {
      console.log("EDIT PROJECT");
    },
    handleDelete() {
      console.log("OPEN DELETE MODAL");
    }
  }
};
</script>

<style>
.list {
  margin: 0;
  padding: 0;
}

.list-item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.button {
  width: 100%;
  box-shadow: none;
}

.button:hover {
  background-color: var(--vislitBlue);
}

.button:active {
  background-color: var(--vislitDarkBlue);
  color: var(--white);
}
</style>
