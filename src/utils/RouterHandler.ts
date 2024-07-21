import { useRouter } from 'vue-router'

export const useRouterHandler = (route: string) => {
  const router = useRouter()
  console.log(router, route)

  const pushRouter = () => {
    router.push(route)
  }

  return { pushRouter }
}
