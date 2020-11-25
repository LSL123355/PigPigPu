<template>
  <main role="main" class="col-md-9 col-lg-9 col-xl-10 ml-sm-auto px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">日志管理</h1>
      <b-button-toolbar class="mb-2 mb-md-0">
        <b-button-group class="mr-2">
          <b-button type="button" class="btn btn-md btn-info" to="/admin/add">
            添加商品
          </b-button>
          <b-button
            type="button"
            class="btn btn-md btn-light btn-outline-dark"
            to="/admin/productsgroup"
          >
            商品分组
          </b-button>
          <b-button
            type="button"
            class="btn btn-md btn-light btn-outline-dark"
            to="/admin/productstype"
          >
            商品分类
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="排序"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                v-model="sortBy"
                id="sortBySelect"
                :options="sortOptions"
                class="w-75"
              >
                <template #first>
                  <option value="">-- 未排序 --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                size="sm"
                :disabled="!sortBy"
                class="w-25"
              >
                <option :value="false">升序</option>
                <option :value="true">降序</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row hidden>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Initial sort"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="initialSortSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="sortDirection"
              id="initialSortSelect"
              size="sm"
              :options="['asc', 'desc', 'last']"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="过滤"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="请输入过滤文本"
                class="w-75"
              ></b-form-input>
              <b-input-group-append class="w-25">
                <b-button :disabled="!filter" @click="filter = ''" class="w-100"
                  >清除</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="过滤列数据"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            description="不选择将过滤所有数据"
            class="mb-0"
          >
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="id">商品ID</b-form-checkbox>
              <b-form-checkbox value="name">商品名称</b-form-checkbox>
              <b-form-checkbox value="type">商品类型</b-form-checkbox>
              <b-form-checkbox value="model">商品型号</b-form-checkbox>
              <b-form-checkbox value="des">商品描述</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="每页行数"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template #empty>
          <div class="text-center my-5">
            当前没有可用数据显示，
            <b-link to="/admin/add">去添加商品</b-link>
          </div>
        </template>
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Info modal
          </b-button>
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>

      <div class="d-flex justify-content-end flex-md-nowrap pt-3 pb-2 mb-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          size="sm"
        ></b-pagination>
      </div>
    </b-container>
  </main>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      items: [
        // {
        //   isActive: true,
        //   age: 40,
        //   name: { first: "Dickerson", last: "Macdonald" },
        // },
        // { isActive: false, age: 21, name: { first: "Larsen", last: "Shaw" } },
        // {
        //   isActive: false,
        //   age: 9,
        //   name: { first: "Mini", last: "Navarro" },
        //   _rowVariant: "success",
        // },
        // { isActive: false, age: 89, name: { first: "Geneva", last: "Wilson" } },
        // { isActive: true, age: 38, name: { first: "Jami", last: "Carney" } },
        // { isActive: false, age: 27, name: { first: "Essie", last: "Dunlap" } },
        // { isActive: true, age: 40, name: { first: "Thor", last: "Macdonald" } },
        // {
        //   isActive: true,
        //   age: 87,
        //   name: { first: "Larsen", last: "Shaw" },
        //   _cellVariants: { age: "danger", isActive: "warning" },
        // },
        // { isActive: false, age: 26, name: { first: "Mitzi", last: "Navarro" } },
        // {
        //   isActive: false,
        //   age: 22,
        //   name: { first: "Genevieve", last: "Wilson" },
        // },
        // { isActive: true, age: 38, name: { first: "John", last: "Carney" } },
        // { isActive: false, age: 29, name: { first: "Dick", last: "Dunlap" } },
      ],
      fields: [
        {
          key: "selected",
          label: "选择",
          sortable: false,
        },
        {
          key: "id",
          label: "商品ID",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "name",
          label: "商品名称",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "type",
          label: "商品类型",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "model",
          label: "商品型号",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "des",
          label: "商品描述",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "images",
          label: "商品图片",
        },
        { key: "actions", label: "操作" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "更多" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      selectMode: "multi",
      selected: [],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>