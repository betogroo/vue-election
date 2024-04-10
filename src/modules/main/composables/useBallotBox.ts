import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'
import {
  BallotBox,
  BallotBoxInsert,
  ballotBoxSchema,
  ballotBoxSchemaInsert,
  ballotBoxListSchema,
  Candidate,
} from '../types/Election'
import { useHelpers } from '.'
const { delay } = useHelpers()

const useBallotBox = () => {
  const ballotBox = ref<BallotBox>()
  const ballotBoxList = ref<BallotBox[]>([])
  const formDialog = ref(false)
  const numericDisplay = ref('')
  const selectedCandidate = ref<Candidate | undefined>(undefined)

  const updateDisplay = (value: number | string) => {
    numericDisplay.value += value
  }
  const resetDisplay = () => {
    numericDisplay.value = ''
  }
  const addBallotBox = async (formData: BallotBoxInsert) => {
    try {
      const parsedData = ballotBoxSchemaInsert.parse(formData)
      if (!parsedData.election_id)
        throw new Error('Erro ao tentar criar a urna:')
      const { data, error: err } = await supabase
        .from('ballot_box')
        .insert(parsedData)
        .select('*')
        .returns<BallotBox>()
      if (err || !data)
        throw new Error(
          `Erro ao tentar criar a urna: ${err.message} (${err.code})`,
        )
      formDialog.value = false
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const fetchBallotBox = async (election_id: string) => {
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('election_id', election_id)
        .returns<BallotBox[]>()
      if (err || !data)
        throw new Error(`Erro ao buscar as urna: ${err.message} (${err.code})`)
      const parsedData = ballotBoxListSchema.parse(data)
      ballotBoxList.value = parsedData
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const getBallotBox = async (id: string) => {
    await delay(1000)
    try {
      const { data, error: err } = await supabase
        .from('ballot_box')
        .select('*')
        .eq('id', id)
        .returns<BallotBox[]>()
        .single()
      if (err || !data)
        throw new Error(`Erro ao buscar as urna: ${err.message} (${err.code})`)
      const parsedData = ballotBoxSchema.parse(data)
      ballotBox.value = parsedData
      return data
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }
  const setBallotBoxReady = async (id: string, ready: string | null) => {
    try {
      const { error: err } = await supabase
        .from('ballot_box')
        .update({
          ready,
        })
        .eq('id', id)
      if (err)
        throw new Error(
          `Erro ao desabilitar urna: ${err.message} (${err.code})`,
        )
    } catch (err) {
      const e = err as Error
      console.log(e)
    }
  }

  const closeFormDialog = () => {
    formDialog.value = false
  }

  supabase
    .channel('ballot_box_change')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ballot_box',
      },

      (event) => {
        if (ballotBox.value && event.old.id === ballotBox.value.id) {
          console.log(event)
          console.log('Vai mudar a tabela')
          const { new: newBallotBox } = event
          ballotBox.value = newBallotBox as BallotBox
        }
        const { old, new: newBallotBox } = event
        const parsedData = ballotBoxSchema.parse(newBallotBox)
        const index = ballotBoxList.value.findIndex(
          (item) => item.id === old.id,
        )
        ballotBoxList.value[index] = parsedData
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'ballot_box',
      },

      (event) => {
        const parsedData = ballotBoxSchema.parse(event.new)
        if (parsedData) ballotBoxList.value.push(parsedData)
      },
    )
    .subscribe()

  return {
    addBallotBox,
    selectedCandidate,
    getBallotBox,
    formDialog,
    numericDisplay,
    closeFormDialog,
    updateDisplay,
    resetDisplay,
    fetchBallotBox,
    ballotBoxList,
    ballotBox,
    setBallotBoxReady,
  }
}

export default useBallotBox
