<template>
  <div>
    <!-- <v-app id="inspire"> -->
    <v-navigation-drawer
      v-model="DRAWER_STATE"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      stateless
      value="true"
    >
      <!-- {{ selectedItem }} -->
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          @click="dialog = true"
          v-for="(item, i) in items3"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon color="red" dark> mdi-cog</v-icon>
            <!-- <v-icon v-text="item.icon"></v-icon> -->
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>

      <v-list-group value="true">
        <v-list slot="activator">
          <i class="mdi-building" style="font-size: 24px"></i>

          <v-icon color="red" dark> domain</v-icon>
          <b style="color: green" class="ml-5">Building</b>
        </v-list>
        <v-list dense>
          <v-list-item-group
            v-model="group"
            active-class="light-blue--text text--accent-4"
          >
            <template v-for="item in this.items">
              <v-list-item
                sub-group
                :key="item.menu_name"
                @click="setDataBuilding(item.building_name, item.building_id)"
              >
                <v-list-item-action>
                  <v-icon class="ml-3">mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.building_name
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-list-group>

      <!-- {{ group }} -->
    </v-navigation-drawer>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#59bd14">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Manage Building</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> exit </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <!---------------------------------------  ข้อมูลของ dialog -------------------------------------------------->
          <!-- {{          this.dataFull}} -->

          <v-data-table
            :headers="dessertHeaders"
            :items="dataFull"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="building_id"
            class="elevation-1"
          >
            <!-- <template v-slot:activator="{ on, attrs }    @item-expanded="getRoom"   ">
           
          </template> -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{ "จัดการตึก" }}</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-dialog v-model="dialog_sub" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      required
                    >
                      เพิ่มตึก
                    </v-btn>
                  </template>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }} </span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.building_name"
                                label="Building"
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
                          @click="close"
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
                          @click="save"
                          required
                        >
                          ตกลง
                        </v-btn>
                        <!-- <v-btn color="blue darken-1" text @click="save"> ตกลง </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-list>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">คุณแน่ใจว่าจะลบ ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn dark class="mb-2" color="red" text @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn dark class="mb-2" color="green" text @click="deleteItemConfirm"
            >OK</v-btn
          > -->
          <v-btn color="red" dark class="mb-3" @click="closeDelete" required>
            ยกเลิก
          </v-btn>

          <v-btn
            color="green"
            dark
            class="mb-2"
            @click="deleteItemConfirm"
            required
          >
            ตกลง
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import swal from "sweetalert";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      valid: true,
      floor_id: "",

      // data dialog----------------------------------------------------------------
      dialogDelete: false,
      delete_building: "",
      insert_building: "",
      building_id: "",
      expanded: [],
      editedItem: {
        building_name: "",
      },
      editedIndex: -1,
      dialog_sub: false,

      dessertHeaders: [
        {
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "ชื่อตึก", value: "building_name" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      // ------------------------=----------------------------------------------------------------
      value1: [],
      dataFull: [],
      group: null,
      selectedItem: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      items3: [{ text: "Manage Building" }],

      items: [
        // {
        //   building_id: "ffb9567c-e6e0-4509-8d78-8a059f43ea00",
        // building_name: "OTA",
        // },
        // {
        //   building_id: "ffb9567c-e6e0-4509-8d78-8a059f43ea01",
        //   building_name: "OAI",
        // },
        // {
        //   building_id: "ffb9567c-e6e0-4509-8d78-8a059f43ea02",
        //   building_name: "singha",
        // },
        // {
        //   building_id: "ffb9567c-e6e0-4509-8d78-8a059f43ea03",
        //   building_name: "thaisubmit",
        // },
      ],

      sidebarWidth: 240,
      sidebarMinWidth: 96,

      // mock data
    };
  },

  watch: {
    dialog_sub(val) {
      val || this.close();
    },

    dialog_sub_Delete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getBuilding();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มตึก" : "แก้ไขตึก";
    },

    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    // insert update delete  building
    // editItem(item) {
    //   this.editedIndex = this.$store.state.data_floor.indexOf(item);
    //   this.editedItem = Object.assign({}, item);

    //   this.dialog = true;
    // },

    close() {
      this.dialog_sub = false;
      this.$nextTick(() => {
        this.insert_building = Object.assign({}, this.defaultItem);

        this.editedIndex = -1;
        this.getBuilding();

        //  location.reload();
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataFull[this.editedIndex], this.editedItem);

        // console.log("pass1");
        // if (this.editedIndex > -1) {
        //   Object.assign(this.data_floor[this.editedIndex], this.editedItem);
        //   // -------------update building ----------------------------\

        this.axios

          .put(
            "http://203.151.199.181:5002/admin/api/v1/building/update?building_id=" +
              this.building_id,
            {
              building_name: this.editedItem.building_name,
            }
          )

          .then((res) => {
            console.log("pass2");
            console.log(res.data);
            if (res.data.message === "duplicate_building_name") {
              alert("ข้อมูลซ้ำไม่สามารถแก้ไขตึกได้");

              // location.reload();
            } else {
              // console.log("statu", res.data.status);
              swal("อัพเดทข้อมูลสำเร็จ!", "", "success");
            }
          });
      } else {
        //-----------------------insert building ------------------------------------------

        this.$store.state.data_floor.push(this.editedItem);
        // console.log("save", this.$store.state.data_floor);
        this.axios
          .post("http://203.151.199.181:5002/admin/api/v1/building/insert", {
            building_name: this.editedItem.building_name,
          })
          .then((res) => {
            if (res.data.message === "duplicate_floor_name") {
              alert("ข้อมูลซ้ำกันไม่สามารถเพิ่มตึกได้");
              location.reload();
            } else {
              this.setDataBuilding();
              swal("เพิ่มข้อมูลสำเร็จ!", "", "success");
            }
          });
      }

      this.getBuilding();

      this.close();
      this.dialog = false;
    },

    // ------------------------------- update building -----------------------------------------------

    editItem(item) {
      // console.log("item:", item);
      this.building_id = item.building_id;

      this.editedIndex = this.dataFull.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog_sub = true;
    },

    // -----------------------------------------------------------------------------------------------
    //
    // ------------------------------------delete building --------------------------------------

    deleteItem(item) {
      // console.log(item);
      this.delete_building = item.building_id;
      // this.del_floor_id = item.floor_id;
      // console.log("item del", item.floor_id);
      this.editedIndex = this.$store.state.data_floor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.state.data_floor.splice(this.editedIndex, 1);
      // this.data_floor.splice(this.editedIndex, 1);
      this.closeDelete();
      this.axios
        .delete(
          "http://203.151.199.181:5002/admin/api/v1/building/delete?building_id=" +
            this.delete_building
        )

        .then((res) => {
          // console.log(res.data);
          if (res.data.message === "delete_floor_fail") {
            swal("ไม่สามารถลบข้อมูลได้", "", "error");
          } else {
            // console.log("statu", res.data.status);
            swal("ลบข้อมูลสำเร็จ!", "", "success");
            this.getBuilding();
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

    // ------------------------------------------------------------------------------------------

    // demo() {
    //   console.log("click na kub");
    // },

    setDataBuilding(name, id) {
      // this.getUsers();
      this.axios
        .get(
          "http://203.151.199.181:5002/admin/api/v1/floor/get?building_id=" + id
        )
        .then((res) => {
          this.value1 = res.data.data;
          // console.log("--------", this.value1);
          // console.log(this.value1);
          // console.log("sidebar ",this.value1);
          this.$store.commit("building_id", id);
          this.$store.commit("data_floor", res.data.data);
        });

      this.$store.commit("up", name);
      // var smallData = this.items.filter((val) => {
      //   return val.building_name == name;
      // });
      // this.$store.commit("upDateDataFlooor", smallData);
    },

    async getBuilding() {
      // console.log("a------------------");
      this.axios
        .get("http://203.151.199.181:5002/admin/api/v1/building/get")
        .then((res) => {
          this.dataFull = res.data.data;
          // alert(this.dataFull)
          // console.log(this.dataFull);
          this.items = res.data.data;
          // alert(this.items)
          // console.log(this.items);
        });
    },

    ...mapActions(["TOGGLE_DRAWER"]),
    tototo(val) {
      // console.log(val);
      this.$store.commit("up", val);
    },
  },
};
</script>

<style src="./Sidebar.scss" lang="scss"/>
