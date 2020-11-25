<template>
  <div class="overflow-auto">
    <!-- 表格 -->
    <!-- 根据传入数据 第一行数据的属性名称创建 表格的列标题头 -->
    <!-- 将第一个字母变成大写 下划线换成空格 -->
    <!-- 数据通过 items 属性传入  -->
    <!-- per-page 预览行数 -->
    <!-- current-page 当前显示第几页 -->
    <!-- id 表格命名, 给其他js 或者组件调用 -->
    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
    
    <!-- currentPage 是 script 定义的  -->
    <!-- v-model 将当前页数绑定 currentPage 属性 -->
    <!-- total-rows 使用 rows() 方法计算后的返回值 -->
    <!-- per-page 每一个分页显示的条目数 -->
    <!-- aria-controls 这个分页组件操控的是 my-table 组件, 在这里是表格 -->
    <!-- 注意 v-model 必须和表格的 current-page 值一样, per-page 必须和表格的 per-page一样 -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ]
      }
    },
    // 每次更新, rows 都会计算一次,这个值是会根据实际情况变动的
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>