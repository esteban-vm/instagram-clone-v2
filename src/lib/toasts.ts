import type { Id } from 'react-toastify'
import { toast } from 'react-toastify'

export const Toasts = class {
  static #toastId: Id
  static #audio = typeof Audio !== 'undefined' ? new Audio('/audios/chasquido.mp3') : undefined

  static handleExecute(message: string) {
    toast.dismiss(this.#toastId)
    this.#toastId = toast.loading(message)
    this.#audio?.load()
  }

  static async handleSuccess(message: string) {
    await this.#playAudio()

    toast.update(this.#toastId, {
      type: 'success',
      autoClose: 6_000,
      isLoading: false,
      render: message,
    })
  }

  static async handleError(message: string) {
    await this.#playAudio()

    toast.update(this.#toastId, {
      type: 'error',
      isLoading: false,
      closeButton: true,
      autoClose: 30_000,
      render: message,
    })
  }

  static #playAudio = () => this.#audio?.play()
}
