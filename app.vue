<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="!tableData.mainCategory && !tableData.subcategory">
        <v-card>
          <v-card-title>Select your categories</v-card-title>
          <v-card-text>
            <v-autocomplete
              label="Main category"
              :items="mainCategory"
              item-title="name"
              item-value="id"
              v-model="mainCategoryValue"
              :loading="pending"
              :disabled="pending"
            ></v-autocomplete>
            <v-autocomplete
              label="Sub category"
              :items="subCategory?.children"
              item-title="name"
              item-value="id"
              v-model="subCategoryValue"
              :disabled="subCategory.length == 0"
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="handleSubmit" :disabled="!mainCategoryValue || !subCategoryValue"> submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" v-else>
        <v-table fixed-header height="300px">
          <thead>
            <tr>
              <th class="text-left">Main category</th>
              <th class="text-left">Sub category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ tableData.mainCategory.name }}</td>
              <td>{{ tableData.subcategory.name }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const { pending, data } = await useLazyFetch(
  "https://staging.mazaady.com/api/get_all_cats"
);
const formData = ref(data.value.data.categories);

const mainCategory = ref(
  formData.value.map((x) => ({
    name: x.name,
    id: x.id,
    img: x.image,
  }))
);

const subCategory = ref([]);
const mainCategoryValue = ref(null);
const subCategoryValue = ref(null);

const tableData = reactive({
  mainCategory: "",
  subcategory: "",
});
watch(mainCategoryValue, (id) => {
  subCategory.value = formData.value.find((x) => x.id === id);
});

const handleSubmit = () => {
  tableData.mainCategory = mainCategory.value.find((x) => {
    if (x.id === mainCategoryValue.value) {
      return x.name;
    }
  });

  tableData.subcategory = subCategory.value.children.find((x) => {
    if (x.id === subCategoryValue.value) {
      return x.name;
    }
  });
};
</script>
