<template>
  <!-- <v-app id="inspire"> -->
  <v-navigation-drawer
    v-model="DRAWER_STATE"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    stateless
    value="true"
  >
    <v-list-group value="true">
      <v-list slot="activator">
        <i class="mdi-building" style="font-size: 24px"></i>

       
          <v-icon color="red" dark > domain</v-icon>
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
                <v-list-item-title>{{ item.building_name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider></v-divider>
           <!-- <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items3"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list-item-group> -->
        </v-list-item-group>
      </v-list>
    </v-list-group>

  
    <!-- {{ group }} -->
  
  </v-navigation-drawer>

  <!-- <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  > -->
  <!-- <v-list>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6" class="py-5">
            <span
              style="padding-left: 32px"
              class="text-body-1 subheader"
              :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
            >
              {{ item.heading }}
            </span>
          </v-col>
          <v-col cols="6" class="text-center"> </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4"
        ></v-divider>
        <v-list-group
          color="primary"
          v-else-if="item.children && DRAWER_STATE"
          :key="item.title"
          v-model="item.model"
          append-icon=""
        >
          <template v-slot:prependIcon>
            <v-icon size="28">mdi-image-filter-none</v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :to="item.link === '#' ? null : item.link"
          link
          @click="tototo(item.title)"
        >
          <v-list-item-action>
            <v-icon size="28" :color="item.color ? item.color : ''">{{
              item.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text" link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list> -->
  <!-- </v-navigation-drawer> -->
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      value1: [],
      dataFull: [],
      group: null,

      admins: [
        ["Management", "people_outline"],
        ["Settings", "settings"],
      ],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"],
      ],

      items3: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],

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

      items1: [
        // { title: 'Data Table', icon: 'mdi-table', link: '/dashboard' },
        // { title: 'LiveVideo', icon: ' mdi-video', link: '/typography' },
        { title: "Manage User", icon: "mdi-face", link: "/tables" },
        // { title: 'Picture', icon: 'mdi-image', link: '/notifications' },
        // //  { title: 'Maps', icon: 'mdi-circle-small', link: '/maps'},
        //   // { title: 'Profile', icon: '  mdi-account-box', link: '/Profile'},
        // {
        //   // title: 'UI Elements',
        //   // icon: 'mdi-image-filter-none',
        //   link: '/icons',
        //   model: false,
        //   // children: [
        //   //   { title: 'Icons', icon: 'mdi-circle-small', link: '/icons'},
        //   //   { title: 'Charts', icon: 'mdi-circle-small', link: '/charts'},
        //   //   { title: 'Maps', icon: 'mdi-circle-small', link: '/maps'},
        //   // ],
        // },
      ],
      items2: [
        // { title: "main", icon: "mdi-home", link: "/dashboard" },
        // { title: "OTA", icon: "mdi-home", link: "/OTA" },
        // { title: "singha", icon: "mdi-home", link: "/dashboard" },
        // { title: "thaisubmit", icon: "mdi-home", link: "/dashboard" },
        // { title: "OAI", icon: "mdi-format-size", link: "/typography" },
        // { title: "singha", icon: "mdi-grid-large", link: "/tables" },
        // {
        //   title: "thaisubmit",
        //   icon: "mdi-bell-outline",
        //   link: "/notifications",
        // },
        // {
        //   title: 'UI Elements',
        //   icon: 'mdi-image-filter-none',
        //   link: '/icons',
        //   model: false,
        //   children: [
        //     { title: 'Icons', icon: 'mdi-circle-small', link: '/icons'},
        //     { title: 'Charts', icon: 'mdi-circle-small', link: '/charts'},
        //     { title: 'Maps', icon: 'mdi-circle-small', link: '/maps'},
        //   ],
        // },
        // // { divider: true },
        // { heading: 'HELP' },
        // { title: 'Library', icon: 'mdi-book-variant-multiple'},
        // { title: 'Support', icon: 'mdi-forum'},
        // { title: 'FAQ', icon: 'mdi-help-circle-outline'},
        // { divider: true },
      ],
      sidebarWidth: 240,
      sidebarMinWidth: 96,

      // mock data
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
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
    
    setDataBuilding(name, id) {

  
      this.axios
        .get(
          "http://203.151.199.181:5002/admin/api/v1/floor/get?building_id=" + id
        )
        .then((res) => {
          this.value1 = res.data.data;
          // console.log(this.value1);
          // console.log(this.value1);
          this.$store.commit("building_id", id);
          this.$store.commit("data_floor", res.data.data);
        });

      this.$store.commit("up", name);
      // var smallData = this.items.filter((val) => {
      //   return val.building_name == name;
      // });
      // this.$store.commit("upDateDataFlooor", smallData);
    },

    async getUsers() {
     this.axios 
        .get("http://203.151.199.181:5002/admin/api/v1/building/get")
        .then((res) => {
          this.dataFull = res.data.data;
          // alert(this.dataFull)
          // console.log(this.dataFull);
          this.items = res.data.data;
          // alert(this.items)
          console.log(this.items);
        });

    },

    ...mapActions(["TOGGLE_DRAWER"]),
    tototo(val) {
      console.log(val);
      this.$store.commit("up", val);
    },
  },
};
</script>

<style src="./Sidebar.scss" lang="scss"/>
