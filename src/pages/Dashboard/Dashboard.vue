<template>
  <div>
    <!-- {{ $store.state.dataFloor.floor }} -->
    <v-data-table
      :headers="dessertHeaders"
      :items="$store.state.dataFloor.floor"
      single-expand="true"
      :expanded.sync="expanded"
      item-key="room"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      
      <template v-slot:expanded-item="{  item }">
        <!-- ใส่ข่้อมูล Data Table -->
         <div v-for="i in item.room" :key="i.room_id">
          <!-- {{ i.room_name }} -->
          <v-text-field v-model="i.room_name"></v-text-field>
        </div>
        <!-- <td :colspan="headers.length">{{ item.room }}</td> -->
        <!-- ใส่ข่้อมูล Data Table -->
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> 
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
]<script>
export default {
  data() {
    return {
      room_name:[],
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "ชั้น", value: "floor_name" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "ห้อง", value: "data-table-expand" },
        
      ],
    };
  },
};
</script>
