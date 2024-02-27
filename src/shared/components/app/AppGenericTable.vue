<script setup lang="ts" generic="T extends { id?: string }">
import { ref } from 'vue'
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
})

const $emit = defineEmits<{
  'delete-item-confirm': [election_id: string]
}>()
const dialogDelete = ref(false)
const dialogForm = defineModel<boolean>()
const idToDelete = ref<string>('')

const closeDialogForm = () => {
  dialogForm.value = false
}

const handleDelete = (id: string) => {
  idToDelete.value = ''
  dialogDelete.value = true
  idToDelete.value = id
}

const closeDelete = () => {
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
    <template #top>
      <v-toolbar density="compact">
        <v-toolbar-title v-if="title">{{ title }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogForm"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              prepend-icon="mdi-plus-thick"
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
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
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
          variant="text"
          @click="handleDelete(item.id)"
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
