// app/plugins/theme.client.ts
export default defineNuxtPlugin(() => {
  const { initTheme } = useDynamicTheme()
  
  // Initialize theme on client side only
  initTheme()
})