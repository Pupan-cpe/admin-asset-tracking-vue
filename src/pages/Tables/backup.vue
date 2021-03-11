<template>
  <div>
    {{ room }}

<v-data-table
:headers="headers2"
      :items="room_name"
      sort-by="calories"
      class="elevation-1"
>

  
</v-data-table>

    <v-data-table
      :headers="headers1"
      :items="same_pupan"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ building }}</v-toolbar-title>
          <!-- {{same_pupan}} -->
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field
                      v-model="email1"
                      label="email"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="fullname1"
                      label="Fullname"
                    ></v-text-field> -->
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
    users: [],
    building:[],
    room_name:[],
    name_pupan:'',
    room:[],
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
      email: "",
      fullname: "",
    },
    defaultItem: {
      email: "",
      fullname: "",
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
        // { text: "room_name", value: "room_name" },
      
      // { text: "floor_name", value: "floor_name" },
      // { text: "floor", value: this.floor_name  },
      // { text: "building_name", value: "building_name" },

      { text: "Actions", value: "actions", sortable: false },
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
    this.getUsers();
    //   this.setIntervalId = setInterval(() => {
    //     this.getUsers();
    //   }, 5000);
    // },
    // beforeDestroy() {
    //   clearInterval(this.setIntervalId);
  },

  methods: {
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
          if (value.building_name === "OAI") {
            // alert(value.building_name)

            this.building = value.building_name;
            this.same_pupan = value.floor;

            for (const [key, value] of Object.entries(this.same_pupan)) {
              this.bb = key;
              // console.log(this.bb);
              //  console.log(value);
              // console.log(value.room[0]);
             this.floor_name.push(value.floor_name[0])
             this.name_pupan = value.floor_name[0];
             for (const [key, value] of Object.entries(this.same_pupan)) {
             this.aa = key 
            //  this.room = value.room
            //  alert(this.room)
           this.room_name= value.room
          //  console.log("room");
          //  console.log(this.room_name);
           for (const [key, value] of Object.entries(this.room_name) ){
             this.aa = key;
             this.room_name.push(value.room_name)
            //  console.log(this.aa);
             console.log(value.room_name);
           }
            // this.room.push(value.room_id)

            // for (const [key, value] of Object.entries(this.room_name)) {
            // this.aa =key
            //   // console.log(value.room_name);
            //       this.room.push(value.room_id)
            //       // console.log("room");
            //       // console.log(this.room);
            
            // }


          //  console.log(this.room_name);
           
       
            // this.room_name = this.room
            //  console.log(value.room);
             
             }

               
            
            
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

        this.loading = false;
        console.log();
      } catch (err) {
        console.log(err); // handle errors here...
      }
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
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
