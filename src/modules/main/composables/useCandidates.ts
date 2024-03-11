import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'

import {
  type Candidate,
  type CandidateInsert,
  candidateSchema,
  candidateListSchema,
  candidateSchemaInsert,
} from '../types/Election'
import { IsPending, TableHeader } from '@/shared/types/App'

const useCandidates = () => {
  const candidates = ref<Candidate[]>([])
  const formDialog = ref(false)

  const error = ref<string | false>(false)
  const isPending = ref<IsPending>({
    value: false,
  })

  const fetchCandidates = async (election_id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('candidates')
        .select('*')
        .order('name')
        .eq('election_id', election_id)
        .returns<Candidate[]>()
      if (err)
        throw new Error(
          `Erro ao buscar os Candidatos: ${err.message} (${err.code})`,
        )
      if (!data) throw new Error('Nenhum candidato cadastrado!')
      candidates.value = candidateListSchema.parse(data)
      return candidates
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const addCandidate = async (formData: CandidateInsert) => {
    try {
      const parsedData = candidateSchemaInsert.parse(formData)
      const { data, error: err } = await supabase
        .from('candidates')
        .insert(parsedData)
        .select()
        .returns<Candidate>()
      if (err || !data)
        throw new Error(
          `Erro ao tentar criar a urna: ${err.message} (${err.code})`,
        )
      formDialog.value = false
      return data.id
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const deleteCandidate = async (id: string) => {
    try {
      error.value = false
      isPending.value = {
        action: 'delete-candidate-',
        value: true,
      }
      const { error: err } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id)
      if (err)
        throw new Error(
          `Erro ao tentar excluir a candidate: ${err.message} (${err.code})`,
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

  const tableHeader: TableHeader[] = [
    {
      title: 'Nome',
      key: 'name',
    },
    {
      title: 'Numero',
      key: 'candidate_number',
    },
    {
      title: 'Identificação Única',
      key: 'id',
    },
    {
      title: 'Ações',
      key: 'actions',
    },
  ]

  const closeFormDialog = () => {
    formDialog.value = false
  }

  supabase
    .channel('candidates_box_change')
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'candidates',
      },

      async (event) => {
        const index = candidates.value.findIndex(
          (item) => item.id === event.old.id,
        )
        if (index !== -1) candidates.value.splice(index, 1)
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'candidates',
      },

      async (event) => {
        const parsedData = candidateSchema.parse(event.new)
        if (parsedData) candidates.value.push(parsedData)
      },
    )
    .subscribe()

  return {
    isPending,
    error,
    fetchCandidates,
    deleteCandidate,
    candidates,
    tableHeader,
    formDialog,
    closeFormDialog,
    addCandidate,
  }
}

export default useCandidates
