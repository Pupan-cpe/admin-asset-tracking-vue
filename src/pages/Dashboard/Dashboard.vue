<template>
  <div>
    <!-- {{$store.state.data_floor}} -->
    <!-- {{this.$store.state.data_floor[0].building_id}} -->
    <!-- {{ this.$store.state.dataFloor.floor }} -->
    <!-- {{$store.state.data_floor}} -->
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
                    >{{ formTitle }} {{ $store.state.building }}
                  </span>
                </v-card-title>

                <!-- <v-card-title>
                  <span class="headline"
                    >เพิ่มชั้นตึก {{ $store.state.building }}</span
                  >
                </v-card-title> -->

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
          <div class="my-5 mx-2">
            <div class="mx-1">
              <!-- {{ floor_id }} -->
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
                    <span class="headline">{{ formTitle1 }} {{ item }} </span>
                  </v-card-title>

                  <!-- <v-card-title>
                    <span class="headline1"
                      >เพิ่มห้องชั้น {{ item.floor_name }}</span
                    >
                  </v-card-title> -->

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!-- {{room_id}} -->
                        <!-- {{data_room}} -->
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
                    <v-btn
                      color="red"
                      dark
                      class="mb-2"
                      @click="close1"
                      required
                    >
                      ยกเลิก
                    </v-btn>
                    <!-- <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn> -->
                    <v-btn
                      color="green"
                      dark
                      class="mb-2"
                      @click="save1"
                      required
                    >
                      ตกลง
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-data-table
                :headers="headers2"
                :items="data_room"
                :items-per-page="20"
                class="elevation-2 mt-5"
                hide-default-footer
              >
                {{ item }}

                <template v-slot:item="{ item }">
                  <tr>
                    <!-- <td>{{item.room_id}}</td> -->
                    <td>{{ item.room_name }}</td>

                    <td>
                      <v-icon color="#454552" @click="editItem1(item)"
                        >mdi-pencil</v-icon
                      >

                      &nbsp;
                      <v-icon
                        class="ml-1"
                        color="#3f51b5"
                        @click="deleteItem1(item)"
                        >mdi-delete</v-icon
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

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">คุณแน่ใจว่าจะลบ </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark class="mb-2" @click="closeDelete" required>
            ยกเลิก
          </v-btn>
          <!-- <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn> -->
          <v-btn
            color="green"
            dark
            class="mb-2"
            @click="deleteItemConfirm"
            required
          >
            ตกลง
          </v-btn>

          <!-- <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          > -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete1" max-width="500px">
      <v-card>
        <v-card-title class="headline">คุณแน่ใจว่าจะลบ ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete1">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm1"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
]<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      del_floor_id: "",
      dialogDelete: false,
      dialogDelete1: false,
      valid: true,
      building_id: "",
      insert_floor: "",
      editedIndex: -1,
      editedIndex1: -1,
      dialog: false,
      dialog1: false,
      editedItem: {
        floor_name: "",
      },
      editedItem1: {
        room_name: "",
      },
      room_id: "",
      floor_id: "",
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มชั้น" : "แก้ไขชั้น";
    },
    formTitle1() {
      // console.log("--------", this.editedIndex1);
      return this.editedIndex1 === -1 ? "เพิ่มห้อง" : "แก้ไขห้อง";
    },
  },

  watch: {
    dialogDelete1(val) {
      val || this.closeDelete();
    },
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
    getfloor() {
      this.axios
        .get(
          "http://203.151.199.181:5002/admin/api/v1/floor/get?building_id=" +
            this.$store.state.building_id
        )
        .then((res) => {
          // console.log(this.value1);
          // console.log("sidebar ",this.value1);
          console.log("get floor", res.data.data);

          this.$store.commit("data_floor", res.data.data);
        });
    },

    validate() {
      this.$refs.form.validate();
    },

    getRoom(item) {
     
      this.floor_id = item.item.floor_id;
      // console.log(item.item.floor_id);

      this.axios
        .get(
          "http://203.151.199.181:5002/admin/api/v1/room/get?floor_id=" +
            item.item.floor_id
        )

        .then((response) => {
          this.room_name = response.data.data;
          this.data_room = response.data.data;

          // console.log(this.data_room);
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
        this.editedIndex1 = -1;
      });
    },

    save1() {
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.$store.state.data_floor[this.editedIndex1],
          this.editedItem1
        );

        this.axios
          .put(
            "http://203.151.199.181:5002/admin/api/v1/room/update?room_id=" +
              this.room_id,

            {
              floor_id: this.floor_id,
              room_name: this.editedItem1.room_name,
            }
          )

          .then((res) => {
            console.log(res.data);
            if (res.data.message === "duplicate_floor_name") {
              alert("ข้อมูลซ้ำไม่สามารถแก้ไขตึกได้");
              this.close1();
              // location.reload();
            } else {
              this.getfloor();
              this.getRoom({ item: { floor_id: this.floor_id } });

              // console.log("statu", res.data.status);
              swal("อัพเดทข้อมูลสำเร็จ!", "", "success");
              // if (res.data.status === "fail") {
              this.close1();
              //   alert("ข้อมูลซ้ำกันไม่สามารถเพิ่มตึกได้");
              //   // location.reload();
              // }
            }
          });
      } else {
        this.$store.state.data_floor.push(this.editedItem1);
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

              this.close1();
              // location.reload();
            } else {
              this.getfloor();
              this.getRoom({ item: { floor_id: this.floor_id } });
              swal("เพิ่มห้องสำเร็จ", "", "success");
              this.close1();
              // swal("เพิ่มห้องสำเร็จ", "success");
            }
          });
      }
    },

    editItem1(item) {
      this.room_id = item.room_id;
      console.log(item);
      // console.log();
      this.editedIndex1 = this.data_room.indexOf(item);
      this.editedItem1 = Object.assign({}, item);

      this.dialog1 = true;
    },

    editItem(item) {
      this.editedIndex = this.$store.state.data_floor.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        // console.log("insert_floor", i);
        this.insert_floor = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
      });
    },

    deleteItem(item) {
      console.log(item);
      this.del_floor_id = item.floor_id;
      console.log("item del", item.floor_id);
      this.editedIndex = this.$store.state.data_floor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.state.data_floor.splice(this.editedIndex, 1);
      this.closeDelete();
      this.axios
        .delete(
          "http://203.151.199.181:5002/admin/api/v1/floor/delete?floor_id=" +
            this.del_floor_id
        )

        .then((res) => {
          console.log(res.data);
          if (res.data.message === "delete_floor_fail") {
            swal("ไม่สามารถลบข้อมูลได้", "", "error");
          } else {
            // console.log("statu", res.data.status);
            swal("ลบข้อมูลสำเร็จ!", "", "success");
          }
        });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    deleteItem1(item) {
      console.log(item);
      this.room_id = item.room_id;
      console.log(this.room_id);
      this.editedIndex1 = this.data_room.indexOf(item);
      this.editedItem1 = Object.assign({}, item);
      this.dialogDelete1 = true;
    },

    deleteItemConfirm1() {
      this.data_room.splice(this.editedIndex1, 1);
      this.closeDelete1();
      this.axios
        .delete(
          "http://203.151.199.181:5002/admin/api/v1/room/delete?room_id=" +
            this.room_id
        )

        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            // console.log("statu", res.data.status);
            swal("ลบข้อมูลสำเร็จ!", "", "success");
          } else {
            swal("Good job!", "You clicked the button!", "error");
          }
        });
    },
    closeDelete1() {
      this.dialogDelete1 = false;
      this.$nextTick(() => {
        this.editedItem1 = Object.assign({}, this.defaultItem);
        this.editedIndex1 = -1;
      });
    },

    // บันทึก--------
    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.data_floor[this.editedIndex],
          this.editedItem
        );

        // console.log(this.$store.state.data_floor.floor_id);
        this.axios
          .put(
            "http://203.151.199.181:5002/admin/api/v1/floor/update?floor_id=" +
              this.$store.state.data_floor[0].floor_id,
            {
              building_id: this.$store.state.data_floor[0].building_id,
              floor_name: this.editedItem.floor_name,
            }
          )

          .then((res) => {
            console.log(res.data);
            if (res.data.message === "duplicate_floor_name") {
              alert("ข้อมูลซ้ำไม่สามารถแก้ไขชั้นได้");

              // location.reload();
            }
            // console.log("statu", res.data.status);
            swal("อัพเดทข้อมูลสำเร็จ!", "", "success");
            this.getfloor();
          });
      } else {
        // ---------insert floor ------------------------------------------
        this.$store.state.data_floor.push(this.editedItem);
        // console.log("save", this.$store.state.data_floor);
        this.axios
          .post("http://203.151.199.181:5002/admin/api/v1/floor/insert", {
            building_id: this.$store.state.building_id,
            floor_name: this.editedItem.floor_name,
          })
          .then((res) => {
            // console.log("statu", res.data);
            this.getfloor();
            if (res.data.message === "duplicate_floor_name") {
              alert("ข้อมูลซ้ำกันไม่สามารถเพิ่มชั้นได้");
              //  this.getfloor();
            }
          });

        // this.getUsers();

        // var smallData = this.items.filter((val) => {
        //   return val.building_name == name;
        // });
        // this.$store.commit("upDateDataFlooor", smallData);
      }

      this.close();
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"></style>