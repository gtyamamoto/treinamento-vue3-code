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
        <button type="submit" class="px-8 py-3 mt-10 text-2xl text-white rounded-full bg-brand-main focus:outline-none" :disabled="state.isLoading">
          <icon name="loading" v-if="state.isLoading" class="animate-spin" />
          <span v-else>Entrar</span>
        </button>
      </label>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import useModal from '../../hooks/useModal'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { validateEmptyAndMinLength3, validateEmptyAndEmail } from '../../utils/validators'
import services from '../../services/index'
import Icon from '../Icon'

export default {

  components: {
    Icon
  },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndMinLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    function close () {
      modal.close()
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({ email: state.email.value, password: state.password.value })
        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('Email nao encontrado')
        }

        if (errors.status === 401) {
          toast.error('Usuario/Senha incorreto')
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer login')
        }

        state.isLoading = false
      } catch (error) {
        console.log(error)
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer login')
      }
    }

    return { state, close, handleSubmit }
  }
}
</script>
