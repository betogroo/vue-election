<script
  setup
  lang="ts"
  generic="
    T extends {
      date?: string
      id?: string
    }
  "
>
import { ref } from 'vue'
import { useHelpers } from '@/shared/composables'
import type { TableHeader } from '@/shared/types/App'
import { RouteRecordName } from 'vue-router'

interface Props {
  tableData: T[]
  headers: TableHeader[]
  title?: string
  tableSubject?: string
  aimView?: RouteRecordName
}

withDefaults(defineProps<Props>(), {
  title: '',
  tableSubject: '',
  deletePending: false,
})

const $emit = defineEmits<{
  'delete-item-confirm': [election_id: string]
}>()

const { dateBr } = useHelpers()
const dialogDelete = ref(false)
const dialogForm = defineModel<boolean>()
const idToDelete = ref<string>('')
const rowIndex = ref(-1)

const closeDialogForm = () => {
  dialogForm.value = false
}

const handleDelete = (id: string, index: number) => {
  idToDelete.value = ''
  rowIndex.value = index
  console.log(rowIndex.value)
  dialogDelete.value = true
  idToDelete.value = id
}

const closeDelete = () => {
  rowIndex.value = -1
  idToDelete.value = ''
  dialogDelete.value = false
}

const deleteItemConfirm = (election_id: string) => {
  $emit('delete-item-confirm', election_id)
  closeDelete()
}
</script>

<template>
  <v-data-table
    density="compact"
    :headers="headers"
    :items="tableData"
  >
    <template #no-data
      ><div class="py-2 d-flex justify-center">
        <slot
          v-if="$slots.noData"
          name="noData"
        ></slot>
        <div v-else>Nenhum dado a exibir</div>
      </div></template
    >
    <template #item.date="{ item }"> {{ dateBr(item.date!) }} </template>
    <template #top>
      <v-toolbar color="transparent">
        <template
          v-if="title"
          #title
          ><h1 class="text-h5">{{ title }}</h1></template
        >
        <template #append>
          <v-dialog
            v-model="dialogForm"
            max-width="500px"
          >
            <template #activator="{ props }">
              <v-btn
                color="success"
                prepend-icon="mdi-plus-thick"
                variant="outlined"
                v-bind="props"
              >
                Cadastrar {{ tableSubject }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Cadastrar {{ tableSubject }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <slot name="addForm"></slot>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  block
                  color="warning"
                  variant="outlined"
                  @click="closeDialogForm"
                >
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-toolbar>
      <template>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm(idToDelete)"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </template>
    <template #item.actions="{ item, index }">
      <div
        v-if="item.id"
        class="d-flex"
      >
        <v-btn
          v-if="aimView"
          icon="mdi-eye"
          :to="{ name: aimView, params: { id: item.id } }"
          variant="text"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          :loading="dialogDelete && index === rowIndex"
          variant="text"
          @click="handleDelete(item.id, index)"
        ></v-btn>
      </div>
    </template>
    <template #item.additionalColumn="{ item }">
      <slot
        :item="item"
        name="plus"
      ></slot>
    </template>
  </v-data-table>
</template>
