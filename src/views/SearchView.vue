<script lang="ts">
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength, helpers } from '@vuelidate/validators'
import { toast, type ToastOptions } from 'vue3-toastify'
import { validarCep } from '../utils/ValidarCep'
import { api } from '../services/index'
import { useAddressStore } from '../store/index'
import HomeContent from '../components/HomeContent.vue'
import LoadingSpiner from '../components/LoadingSpiner.vue'

const addressStore = useAddressStore()
export default {
  components: {
    HomeContent,
    LoadingSpiner
  },
  created() {},
  setup() {
    const state = reactive({
      cep: '',
      isLoading: false
    })

    const rules = computed(() => ({
      cep: {
        required: helpers.withMessage('Campo inválido, preencha o campo corretamente', required),
        maxLength: helpers.withMessage(
          ({ $invalid }) =>
            `Esse campo está ${$invalid ? 'inválido' : 'válidos'} preencha um cep válido`,
          maxLength(8)
        ),
        minLength: helpers.withMessage(() => 'Cep inválido, preencha corretamente', minLength(8))
      }
    }))
    const v$ = useVuelidate(rules, state)

    async function handleSubmit() {
      state.isLoading = true

      try {
        const result = await v$.value.$validate()
        const cepFormat = validarCep(state.cep)
        const response = await api.get(`/${cepFormat}/json/`)

        if (response.data.erro) {
          toast('Digite um cep válido', {
            type: 'error'
          } as ToastOptions)
        }

        if (result && !response.data.erro) {
          addressStore.updateAddress(response.data)
          toast('Tudo certo 👌', {
            type: 'success'
          } as ToastOptions)
        }
      } catch (error) {
        toast('Digite um cep válido', {
          type: 'error'
        } as ToastOptions)
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      v$,
      addressStore,
      handleSubmit
    }
  }
}
</script>

<template>
  <HomeContent>
    <template #center>
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <label for="cep">Digite o Cep que você deseja pesquisar</label>
          <p v-for="error of v$.cep.$errors" :key="error.$uid" class="error">
            {{ error.$message }}
          </p>
          <input
            v-model="v$.cep.$model"
            id="cep"
            type="text"
            maxlength="8"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            placeholder="XXXXX-XXX"
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
    </template>
    <template #side>
      <div class="container">
        <div v-if="!addressStore.getAddress.logradouro" class="address">
          <h2>Resultado da busca aqui -></h2>
        </div>
        <LoadingSpiner v-else-if="state.isLoading" />

        <div v-else class="address">
          <h2>Pesquisa de endereço mais recente</h2>
          <p>Rua: {{ addressStore.getAddress.logradouro }}</p>
          <p>Bairro: {{ addressStore.getAddress.bairro }}</p>
          <p>Cidade: {{ addressStore.getAddress.localidade }}</p>
          <p>Estado: {{ addressStore.getAddress.uf }}</p>
          <p>DDD: {{ addressStore.getAddress.ddd }}</p>
          <p>Cep: {{ addressStore.getAddress.cep }}</p>
        </div>
      </div>
    </template>
  </HomeContent>
</template>

<style>
.block input {
  display: block;
  width: 100%;
  background: rgb(169, 168, 168);
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
}
.block input::-webkit-inner-spin-button {
  -moz-appearance: textfield;
}
.block input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
button {
  margin: 0.5rem 0 0 0;
  padding: 0.6rem;
  border-radius: 5px;
  border: none;
  background: rgb(104, 246, 61);
}
button:hover {
  background: rgb(82, 181, 52);
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.error {
  display: block;
  color: red;
  font-weight: bold;
  font-size: 12px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid blue;
  border-radius: 8px;
  padding: 1rem 5rem;
  height: 350px;
  width: 350px;
}
.address {
  text-align: center;
}
h2 {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
