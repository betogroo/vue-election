import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import { type Candidate, candidateListSchema } from '../types/Election'
import { TableHeader } from '@/shared/types/App'
const useCandidates = () => {
  const candidates = ref<Candidate[]>([])
  const addDialog = ref(false)
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

  const closeAddDialog = () => {
    addDialog.value = false
  }

  return { fetchCandidates, candidates, tableHeader, addDialog, closeAddDialog }
}

export default useCandidates
