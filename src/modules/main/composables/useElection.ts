import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  Election,
  ElectionInsert,
  electionSchemaList,
  electionSchema,
} from '../types/Election'
import { useHelpers } from '@/shared/composables'
import { TableHeader, IsPending } from '@/shared/types/App'
const { delay } = useHelpers()
const useElection = () => {
  const error = ref<string | false>(false)
  const isPending = ref<IsPending>({
    value: false,
  })
  const election = ref<Election>({
    id: '',
    candidate_number_length: 3,
    created_at: '',
    date: '',
    description: '',
    name: '',
    organization: '',
    ready: false,
    uppercase: false,
  })
  const elections = ref<Election[]>([])

  const addElectionDialog = ref(false)

  const electionTableHeader: TableHeader[] = [
    {
      title: 'Data',
      key: 'date',
    },
    {
      title: 'Nome',
      key: 'name',
    },
    {
      title: 'Organização',
      key: 'organization',
    },
    {
      title: 'Descrição',
      key: 'description',
    },
    {
      title: 'Ações',
      key: 'actions',
    },
  ]

  const fetchElections = async () => {
    await delay()
    try {
      error.value = false
      isPending.value = {
        action: 'fetchElections',
        value: true,
      }
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .returns<Election[]>()
        .order('created_at')
      if (err)
        throw new Error(
          `Erro ao buscar as eleições: ${err.message} (${err.code})`,
        )
      elections.value = electionSchemaList.parse(data)
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(e)
    } finally {
      isPending.value = {
        action: '',
        value: false,
      }
    }
  }

  const getElection = async (id: string) => {
    await delay()
    try {
      const { data, error: err } = await supabase
        .from('election')
        .select('*')
        .eq('id', id)
        .returns<Election[]>()
        .single()
      if (err)
        throw new Error(
          `Erro ao buscar a eleição: ${err.message} (${err.code})`,
        )
      if (!data) throw new Error('Erro ao carregar a eleição!')
      election.value = electionSchema.parse(data)
    } catch (err) {
      const e = err as Error
      console.error(e)
    } finally {
      isPending.value = {
        action: '',
        value: false,
      }
    }
  }

  const addElection = async (values: ElectionInsert) => {
    try {
      error.value = false
      isPending.value = {
        action: 'add-election',
        value: true,
      }
      const { data, error: err } = await supabase
        .from('election')
        .insert(values)
        .select()
        .returns<Election[]>()
        .single()
      if (err)
        throw new Error(
          `Erro ao tentar cadastrar eleição: ${err.message} (${err.code})`,
        )
      addElectionDialog.value = false
      return data
    } catch (err) {
      const e = err as Error
      error.value = e.message
      console.log(e)
    } finally {
      isPending.value = {
        action: '',
        value: false,
      }
    }
  }

  const deleteElection = async (id: string) => {
    await delay()
    try {
      error.value = false
      isPending.value = {
        action: '-election',
        value: true,
      }
      const { error: err } = await supabase
        .from('election')
        .delete()
        .eq('id', id)
      if (err)
        throw new Error(
          `Erro ao tentar excluir a eleição: ${err.message} (${err.code})`,
        )
    } catch (err) {
      const e = err as Error
      console.error(e)
    } finally {
      isPending.value = {
        action: '',
        value: false,
      }
    }
  }

  supabase
    .channel('election_change')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'election',
      },
      (event) => {
        const parsedData = electionSchema.parse(event.new)
        if (parsedData) elections.value.push(parsedData)
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'election',
      },
      (event) => {
        const index = elections.value.findIndex(
          (item) => item.id === event.old.id,
        )
        if (index !== -1) elections.value.splice(index, 1)
      },
    )
    .subscribe()
  return {
    addElectionDialog,
    election,
    elections,
    electionTableHeader,
    isPending,
    addElection,
    deleteElection,
    fetchElections,
    getElection,
  }
}

export default useElection
