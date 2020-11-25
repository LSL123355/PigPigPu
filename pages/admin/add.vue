<template>
  <main role="main" class="col-md-9 col-lg-9 col-xl-10 ml-sm-auto px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">添加商品</h1>
      <b-button-toolbar class="mb-2 mb-md-0">
        <b-button-group class="mr-2">
          <b-button
            type="button"
            class="btn btn-md btn-info"
            to="/admin/products"
          >
            返回商品列表
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
      <b-row>
        <b-col cols="6" class="my-1">
          <b-form-group
            label="商品名称"
            label-cols-sm="3"
            label-align-sm="right"
            label-for="goodsName"
          >
            <b-input-group>
              <b-form-input
                v-model="goodsName"
                type="text"
                id="goodsName"
                placeholder="请输入商品名称"
                class="w-100"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="my-1">
          <b-form-group
            label="商品类型"
            label-cols-sm="3"
            label-align-sm="right"
            label-for="goodsType"
          >
            <b-form-select
              v-model="goodsType"
              id="goodsType"
              :options="goodsTypeOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="my-1">
          <b-form-group
            label="商品型号"
            label-cols-sm="3"
            label-align-sm="right"
            label-for="goodsModel"
          >
            <b-input-group>
              <b-form-input
                v-model="goodsModel"
                type="text"
                id="goodsModel"
                placeholder="请输入商品型号"
                class="w-100"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6" class="my-1">
          <b-form-group
            label="商品描述"
            label-cols-sm="3"
            label-align-sm="right"
            label-for="goodsDes"
          >
            <b-textarea
              v-model="goodsDes"
              type="text"
              id="goodsDes"
              placeholder="请输入商品描述"
              rows="5"
              class="w-100"
            >
            </b-textarea>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6" class="my-1">
          <b-form-group
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-button
              type="submit"
              id="goodsSubmit"
              variant="primary"
              style="min-width:120px"
              >添 加</b-button
            >
            <b-button type="reset" id="goodsReset" variant="danger"
              style="min-width:120px"
              class="ml-2"
              >重 置</b-button
            >
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      goodsName: null,
      goodsType: 0,
      goodsTypeOptions: [{ value: 0, text: "默认类型" }],
      goodsModel: null,
      goodsDes: null,
    };
  },
};
</script>