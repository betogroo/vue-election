import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { Election, ElectionInsert, electionSchemaList } from '../types/Election'
import { useHelpers } from '@/shared/composables'
import { TableHeader, IsPending } from '@/shared/types/App'
const { delay } = useHelpers()
const useElection = () => {
  const error = ref<string | false>(false)
  const isPending = ref<IsPending>({
    value: false,
  })
  const election = ref<Election>()
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
  return {
    election,
    elections,
    isPending,
    electionTableHeader,
    fetchElections,
    addElection,
    addElectionDialog,
  }
}

export default useElection
