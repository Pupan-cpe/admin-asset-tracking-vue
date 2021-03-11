<template>
  <div>
    <!-- {{ room_name }} -->

    <!-- <v-data-table
      :headers="headers2"
      :items="room_name"
      sort-by="calories"
      class="elevation-1"
      
    >
    </v-data-table> -->

    <v-data-table
      :headers="headers1"
      :items="same_pupan"
      sort-by="calories"
      class="elevation-1"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="singleExpand"
            label="Single expand"
            class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <!-- aaaa -->

      <template v-slot:expanded-item="{ item }">
        <!-- <ul id="example-1"> -->
        <div v-for="i in item.room" :key="i.room_id">
          <!-- {{ i.room_name }} -->
          <v-text-field v-model="i.room_name"></v-text-field>
        </div>
        <!-- </ul> -->
        <!-- <div class="room_data" :v-for="data in item" key="item">
          {{ data }}
        </div> -->
        <!-- <td :colspan="headers.length">More info about {{ item.room }}</td> -->
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data> </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data: () => ({
    expanded: [],
    singleExpand: false,
    users: [],
    building: [],
    room_name: [],
    name_pupan: "",
    room: [],
    same_pupan: [],
    floor_alert: [],
    floor_name: [],
    doh: {
      fullname1: "",
      email1: "",
    },
    loading: false,
    setIntervalId: null,
    dialog: false,
    dialogDelete: false,
    editedItem: {
      room_id: "",
      room_name: "",
    },
    defaultItem: {
      room_id: "",
      room_name: "",
    },

    headers2: [
      {
        align: "start",
        filterable: false,
        value: "id",
      },
      { text: "room", value: "room" },
      { text: "ชั้น", value: "room_name" },
      { text: "room_id", value: "room_id" },

      // { text: "floor_name", value: "floor_name" },
      // { text: "floor", value: this.floor_name  },
      // { text: "building_name", value: "building_name" },

      { text: "Actions", value: "actions", sortable: false },
    ],

    headers1: [
      {
        align: "start",
        filterable: false,
        value: "id",
      },
      // { text: "building_id", value: "building_id" },
      { text: "ชั้น", value: "floor_name" },

      // { text: "room", value: "room" },

      // { text: "floor_name", value: "floor_name" },
      // { text: "floor", value: this.floor_name  },
      // { text: "building_name", value: "building_name" },

      { text: "Actions", value: "actions", sortable: false },
      { text: "ห้อง", value: "data-table-expand" },
    ],

    headers: [
      {
        align: "start",
        filterable: false,
        value: "id",
      },
      // { text: "building_id", value: "building_id" },
      { text: "building_name", value: "building_name" },
      { text: "room", value: "room" },

      // { text: "floor_name", value: "floor_name" },
      // { text: "floor", value: this.floor_name  },
      // { text: "building_name", value: "building_name" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
      
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
 
    console.log("created");
    //   this.setIntervalId = setInterval(() => {
    this.getUsers();
    //   }, 5000);
    // },
    // beforeDestroy() {
    //   clearInterval(this.setIntervalId);
  },

  methods: {
    alert() {
      alert("Alert!");
    },

    deleteData: function () {
      axios
        .delete(
          "http://192.168.1.138:3000/api/authen/delete/" + this.editedItem.id
        )
        .then((res) => {
          if (res.data.status === "true") {
            swal("ลบสำเร็จ", "", "success");
          }
        });
    },

    editdata: function () {
      axios
        .post(
          "http://192.168.1.138:3000/api/authen/update/" + this.editedItem.id,
          this.doh
        )
        .then((res) => {
          console.log(this.doh);
          var myJSON = JSON.stringify(this.doh);
          console.log(myJSON);
          console.log(typeof this.editedItem);
          if (res.data.status === "true") {
            swal("อัพเดทสำเร็จ", "", "success");
          } else {
            console.log("error 404");
          }
        });
    },

    async getUsers() {
      // this.loading = true;
      try {
        const user = await axios.get(
          "http://203.151.199.181:5002/admin/api/v1/building"
        );
        this.users = user.data.data;
        // console.log(user);
        // this.doh = users.data

        for (const [key, value] of Object.entries(this.users)) {
          this.aa = key;

          // alert(value.building_name)
          if (value.building_name === this.$store.state.test_menu) {
            // alert(value.building_name)

            this.building = value.building_name;
            this.same_pupan = value.floor;
            console.log(this.same_pupan);
            // console.log(this.same_pupan);
            for (const [key, value] of Object.entries(this.same_pupan)) {
              this.aa = key;
              // this.room_name = value.room
              console.log(value.room);
              this.room_name.push(value.room);
            }
          }
        }
        // alert(this.users.building_name)
        //         if (  this.doh.building_name === "OAI" ){
        // this.name_pupan = this.doh.building_name

        //           alert(users.data.building_name)

        //         }
        // console.log(this.same_pupan);
        // console.log(this.users);
        // this.location.reload();
        this.loading = false;
        console.log("test");
      } catch (err) {
        console.log(err); // handle errors here...
      }
    },

    editItem(item) {
      this.editedIndex = this.room_name.indexOf(item);
      this.editedItem = Object.assign([], item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign([], item);
      this.ids = this.editedItem.id;
      console.log(this.ids);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteData();
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.editdata();
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.defaultItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
