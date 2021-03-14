<template>
  <div>

    
    <!-- {{ $store.state.dataFloor.floor }} -->
    <v-data-table
      :headers="dessertHeaders"
      :items="$store.state.data_floor"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="floor_id"
      @item-expanded="getRoom"
      show-expand
      class="elevation-1"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
           
          </template> -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $store.state.building }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                required
              >
                เพิ่มชั้น
              </v-btn>
            </template>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card>
                <v-card-title>
                  <span class="headline"
                    >เพิ่มชั้นตึก {{ $store.state.building }}</span
                  >
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="floor_Rules"
                          v-model="editedItem.floor_name"
                          label="floor"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" dark class="mb-2" @click="close" required>
                    ยกเลิก
                  </v-btn>
                  <!-- <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn> -->
                  <v-btn color="green" dark class="mb-2" @click="save" required>
                    ตกลง
                  </v-btn>
                  <!-- <v-btn color="blue darken-1" text @click="save"> ตกลง </v-btn> -->
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" style="background-color: #f0f0f0">
          <div class="my-5 mx-2" @click="getRoom()">
            <div class="mx-1">
              {{floor_id  }}
              <!-- table ย่อย -->
              <v-dialog v-model="dialog1" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mr-5"
                    v-bind="attrs"
                    v-on="on"
                    style="margin-right: 150px"
                  >
                    เพิ่มห้อง
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline1"
                      >เพิ่มห้องชั้น {{ item.floor_name }}</span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem1.room_name"
                            label="Room Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4"> </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                     <v-btn color="red" dark class="mb-2" @click="close1" required>
                    ยกเลิก
                  </v-btn>
                  <!-- <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn> -->
                  <v-btn color="green" dark class="mb-2" @click="save1" required>
                    ตกลง
                  </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-data-table
                :headers="headers2"
                :items="data_room"
                :items-per-page="5"
                class="elevation-1 mt-5"
                hide-default-footer
              >
                {{ item }}
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.room_name }}</td>
                    <td>
                      <v-icon color="#454552" @click="edit_data(item)"
                        >mdi-eye</v-icon
                      >
                      &nbsp;
                      <v-icon
                        class="ml-1"
                        color="#3f51b5"
                        @click="delete_data(item)"
                        >mdi-printer</v-icon
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </div>
        </td>
      </template>

      <!-- <template v-slot:expanded-item="{ headers ,item }"> -->
      <!-- {{ item.floor_id }} -->

      <!-- <ul id="example-1"> -->
      <!-- {{ item.room }}
        {{ room_name }} -->
      <!-- {{item.room_name}} -->

      <!-- <td :colspan="headers.length">More info about {{ item.room }}</td> -->
      <!-- </template> -->

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
]<script>
import swal from 'sweetalert';

export default {
  data() {
    return {
      valid: true,
      building_id: "",
      insert_floor: "",
      editedIndex: -1,
      dialog: false,
      dialog1: false,
      editedItem: {
        floor_name: "",
      },
      editedItem1: {
        room_name: "",
      },
      room_id: "",
      floor_id:'',
      room_name: [],
      expanded: [],
      data_room: [],
      singleExpand: false,

      floor_Rules: [(v) => !!v || "กรุณากรอกข้อมูล"],

      dessertHeaders: [
        {
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "ชั้น", value: "floor_name" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "ห้อง", value: "data-table-expand" },
        // { text: "ห้อง", value: "room_name" },
      ],
      headers2: [
        {
          align: "start",
          filterable: false,
          text: "ชื่อห้อง",
          value: "room_name",
        },
        {
          align: "start",
          text: "actions",
          value: "actions",
        },
      ],
    };
  },
  watch: {
    dialog1(val) {
      val || this.close();
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    getRoom(item) {
      // console.log(item);
      this.floor_id = item.item.floor_id
      console.log(item.item.floor_id);

      this.axios
        .get(
          "http://203.151.199.181:5002/admin/api/v1/room/get?floor_id=" +
            item.item.floor_id
        )

        .then((response) => {
          this.room_name = response.data.data;
          this.data_room = response.data.data;
          // console.log(response);
          // console.log(this.room_name);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    close1() {
      this.dialog1 = false;
      this.$nextTick(() => {
        this.insert_floor = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save1() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.data_floor[this.editedIndex],
          this.editedItem1
        );
      } else {
        this.$store.state.data_floor.push(this.editedItem);
        console.log("save", this.$store.state.data_floor);
        this.axios
          .post("http://203.151.199.181:5002/admin/api/v1/room/insert", {
            floor_id: this.floor_id,
            room_name: this.editedItem1.room_name,
          })
          .then((res) => {
            // console.log("statu", res.data.status);
              console.log(res.data);
            if (res.data.status === "fail") {
              
              alert("ข้อมูลซ้ำกันไม่สามารถเพิ่มตึกได้");
                 location.reload();
              // location.reload();
            }
swal("Good job!", "You clicked the button!", "success");
            swal("เพิ่มห้องสำเร็จ", "success");
             
            // console.log(res.data);
            // console.log(this.editedItem.floor_name);
            // console.log("room:",this.value1);

            // alert(this.dataFull)
            // this.items = res.data.data
            // for (const [key, value] of Object.entries(this.dataFull)) {
            // console.log(`${key}: ${value.building_name}`);
            // this.aa = key

            // this.items.push(value.building_name);
            //   console.log('item:',this.items);
            // }

            // console.log(this.dataFull);
          });
      }
      this.close();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.insert_floor = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.data_floor[this.editedIndex],
          this.editedItem
        );
      } else {
        this.$store.state.data_floor.push(this.editedItem);
        console.log("save", this.$store.state.data_floor);
        this.axios
          .post("http://203.151.199.181:5002/admin/api/v1/floor/insert", {
            building_id: this.$store.state.data_floor[0].building_id,
            floor_name: this.editedItem.floor_name,
          })
          .then((res) => {
            // console.log("statu", res.data.status);

            if (res.data.status === "fail") {
              alert("ข้อมูลซ้ำกันไม่สามารถเพิ่มตึกได้");
              location.reload();
            }
            // console.log(res.data);
            // console.log(this.editedItem.floor_name);
            // console.log("room:",this.value1);

            // alert(this.dataFull)
            // this.items = res.data.data
            // for (const [key, value] of Object.entries(this.dataFull)) {
            // console.log(`${key}: ${value.building_name}`);
            // this.aa = key

            // this.items.push(value.building_name);
            //   console.log('item:',this.items);
            // }

            // console.log(this.dataFull);
          });
      }
      this.close();
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"></style>