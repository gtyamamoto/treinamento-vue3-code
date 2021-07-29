<template>
  <div class="flex justify-between">
    <h1>Modal Login</h1>
    <button @click="close">&times;</button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label for="" class="block">
        <span>Email</span>
        <input
        :class="{'border-brand-danger':!!state.email.errorMessage}"
        v-model="state.email.value"
        type="email"
        class="block w-full px-4 py-3 text-lg border-transparent border-2 rounded"
        >
        <span class="block font-medium text-brand-danger" v-if="state.email.errorMessage"> {{ state.email.errorMessage }} </span>
      </label>
      <label for="" class="block">
        <span>Senha</span>
        <input
        :class="{'border-brand-danger':!!state.password.errorMessage}"
        v-model="state.password.value"
        type="password"
        class="block w-full px-4 py-3 text-lg border-transparent border-2 rounded"
        >
        <span class="block font-medium text-brand-danger" v-if="state.password.errorMessage"> {{ state.password.errorMessage }} </span>
        <button type="submit" class="px-8 py-3 mt-10 text-2xl text-white rounded-full bg-brand-main focus:outline-none" :disabled="state.isLoading">Entrar</button>
      </label>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import useModal from '../../hooks/useModal'
export default {
  setup () {
    const modal = useModal()
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      }
    })

    function close () {
      modal.close()
    }

    function handleSubmit () {}

    return { state, close, handleSubmit }
  }
}
</script>
