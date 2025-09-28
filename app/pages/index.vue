<template>
  <div class="min-h-screen bg-surface-50 transition-colors duration-300">
    <!-- Navigation -->
    <nav class="bg-surface-100 border-b border-surface-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-6">
            <h1 class="text-xl font-bold text-primary-600">
              Runtime Theming Demo
            </h1>
            <div class="hidden md:flex items-center gap-2 text-sm text-text-600">
              <span>Current theme:</span>
              <span class="font-semibold text-primary-600 capitalize">{{ currentTheme }}</span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              :class="[
                'relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                isDarkMode ? 'bg-primary-600' : 'bg-surface-300'
              ]"
              title="Toggle dark mode"
            >
              <span class="sr-only">Toggle dark mode</span>
              <span
                :class="[
                  'inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform flex items-center justify-center',
                  isDarkMode ? 'translate-x-9' : 'translate-x-1'
                ]"
              >
                <svg v-if="isDarkMode" class="w-3.5 h-3.5 text-primary-600 ml-1 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else class="w-3.5 h-3.5 text-yellow-500 ml-1 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <!-- Hero Section -->
      <section class="text-center py-12">
        <h2 class="text-4xl font-bold text-text-900 mb-4">
          Dynamic Runtime Theming with <span class="text-primary-500">Tailwind CSS</span>
        </h2>
        <p class="text-xl text-text-600 max-w-3xl mx-auto">
          Change your entire color scheme instantly. No rebuilds, no massive CSS bundles.
          Just beautiful, performant themes powered by CSS custom properties and OKLCH colors.
        </p>
      </section>

      <!-- Quick Theme Customization -->
      <section class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
        <div class="space-y-6">
          <!-- Quick Theme Selection -->
          <div>
            <h3 class="text-lg font-semibold text-text-900 mb-4">Quick Theme Selection</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="(config, name) in themes"
                :key="name"
                @click="setTheme(name)"
                :class="[
                  'group flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                  currentTheme === name 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                ]"
              >
                <div class="flex gap-1">
                  <span 
                    v-for="color in [config.primary, config.secondary, config.surface]"
                    :key="color"
                    class="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                    :style="{ backgroundColor: getColorPreview(color) }"
                  />
                </div>
                <span class="text-sm font-medium capitalize text-text-700">{{ name }}</span>
              </button>
            </div>
          </div>

          <!-- Condensed Color Customization -->
          <div class="border-t border-surface-200 pt-6">
            <h3 class="text-lg font-semibold text-text-900 mb-4">Customize Colors</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Primary Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Primary Color
                </label>
                <div class="relative">
                  <button
                    @click="showPrimaryPicker = !showPrimaryPicker"
                    class="w-full flex items-center gap-2 px-3 py-2 border border-surface-300 rounded-lg hover:border-surface-400 transition-colors bg-surface-50 text-text-700"
                  >
                    <span 
                      class="w-6 h-6 rounded ring-2 ring-white shadow-sm"
                      :style="{ backgroundColor: getColorPreview(customConfig.primary) }"
                    />
                    <span class="flex-1 text-left text-sm capitalize text-text-700">{{ customConfig.primary }}</span>
                    <svg class="w-4 h-4 text-text-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="showPrimaryPicker" class="absolute z-10 mt-2 w-full bg-surface-50 rounded-lg shadow-lg border border-surface-200 p-2">
                    <div class="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
                      <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('primary', color); showPrimaryPicker = false"
                        :class="[
                          'h-8 rounded border-2 transition-all',
                          customConfig.primary === color 
                            ? 'border-primary-500 ring-2 ring-primary-300' 
                            : 'border-transparent hover:scale-110'
                        ]"
                        :style="{ backgroundColor: getColorPreview(color) }"
                        :title="color"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Secondary Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Secondary Color
                </label>
                <div class="relative">
                  <button
                    @click="showSecondaryPicker = !showSecondaryPicker"
                    class="w-full flex items-center gap-2 px-3 py-2 border border-surface-300 rounded-lg hover:border-surface-400 transition-colors bg-surface-50 text-text-700"
                  >
                    <span 
                      class="w-6 h-6 rounded ring-2 ring-white shadow-sm"
                      :style="{ backgroundColor: getColorPreview(customConfig.secondary) }"
                    />
                    <span class="flex-1 text-left text-sm capitalize text-text-700">{{ customConfig.secondary }}</span>
                    <svg class="w-4 h-4 text-text-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="showSecondaryPicker" class="absolute z-10 mt-2 w-full bg-surface-50 rounded-lg shadow-lg border border-surface-200 p-2">
                    <div class="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
                      <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('secondary', color); showSecondaryPicker = false"
                        :class="[
                          'h-8 rounded border-2 transition-all',
                          customConfig.secondary === color 
                            ? 'border-secondary-500 ring-2 ring-secondary-300' 
                            : 'border-transparent hover:scale-110'
                        ]"
                        :style="{ backgroundColor: getColorPreview(color) }"
                        :title="color"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Surface Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Surface Color
                </label>
                <div class="relative">
                  <button
                    @click="showSurfacePicker = !showSurfacePicker"
                    class="w-full flex items-center gap-2 px-3 py-2 border border-surface-300 rounded-lg hover:border-surface-400 transition-colors bg-surface-50 text-text-700"
                  >
                    <span 
                      class="w-6 h-6 rounded ring-2 ring-white shadow-sm"
                      :style="{ backgroundColor: getColorPreview(customConfig.surface) }"
                    />
                    <span class="flex-1 text-left text-sm capitalize text-text-700">{{ customConfig.surface }}</span>
                    <svg class="w-4 h-4 text-text-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="showSurfacePicker" class="absolute z-10 mt-2 w-full bg-surface-50 rounded-lg shadow-lg border border-surface-200 p-2">
                    <div class="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
                      <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('surface', color); showSurfacePicker = false"
                        :class="[
                          'h-8 rounded border-2 transition-all',
                          customConfig.surface === color 
                            ? 'border-surface-700 ring-2 ring-surface-400' 
                            : 'border-transparent hover:scale-110'
                        ]"
                        :style="{ backgroundColor: getColorPreview(color) }"
                        :title="color"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Text Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Text Color
                </label>
                <div class="relative">
                  <button
                    @click="showTextPicker = !showTextPicker"
                    class="w-full flex items-center gap-2 px-3 py-2 border border-surface-300 rounded-lg hover:border-surface-400 transition-colors bg-surface-50 text-text-700"
                  >
                    <span 
                      class="w-6 h-6 rounded ring-2 ring-white shadow-sm"
                      :style="{ backgroundColor: getColorPreview(customConfig.text) }"
                    />
                    <span class="flex-1 text-left text-sm capitalize text-text-700">{{ customConfig.text }}</span>
                    <svg class="w-4 h-4 text-text-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="showTextPicker" class="absolute z-10 mt-2 w-full bg-surface-50 rounded-lg shadow-lg border border-surface-200 p-2">
                    <div class="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
                      <button
                        v-for="color in availableColors"
                        :key="color"
                        @click="selectColor('text', color); showTextPicker = false"
                        :class="[
                          'h-8 rounded border-2 transition-all',
                          customConfig.text === color 
                            ? 'border-text-700 ring-2 ring-text-400' 
                            : 'border-transparent hover:scale-110'
                        ]"
                        :style="{ backgroundColor: getColorPreview(color) }"
                        :title="color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Component Examples -->
      <section class="space-y-6">
        <h3 class="text-2xl font-bold text-text-900">Component Examples</h3>
        
        <!-- Buttons -->
        <div class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
          <h4 class="text-lg font-semibold text-text-800 mb-4">Buttons</h4>
          <div class="flex flex-wrap gap-3">
            <button class="px-6 py-2.5 bg-primary-500 text-primary-50 rounded-lg hover:bg-primary-600 transition-colors font-medium">
              Primary Button
            </button>
            <button class="px-6 py-2.5 bg-secondary-500 text-secondary-50 rounded-lg hover:bg-secondary-600 transition-colors font-medium">
              Secondary Button
            </button>
            <button class="px-6 py-2.5 border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
              Outlined Primary
            </button>
            <button class="px-6 py-2.5 border-2 border-secondary-500 text-secondary-600 rounded-lg hover:bg-secondary-50 transition-colors font-medium">
              Outlined Secondary
            </button>
            <button class="px-6 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium">
              Text Button
            </button>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-surface-100 p-6 rounded-xl shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-text-900 mb-2">
              Fast Performance
            </h2>
            <p class="text-text-600 text-sm mb-4">
              Instant theme switching with no JavaScript in the render path. Pure CSS performance.
            </p>
            <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Learn more →
            </button>
          </div>
          
          <div class="bg-primary-50 p-6 rounded-xl border border-primary-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-primary-900 mb-2">
              Custom Colors
            </h2>
            <p class="text-primary-700 text-sm mb-4">
              Use the color picker to create completely custom themes with any hex color.
            </p>
            <button class="bg-primary-500 text-primary-50 px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">
              Try it now
            </button>
          </div>

          <div class="bg-secondary-50 p-6 rounded-xl border border-secondary-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-secondary-900 mb-2">
              Export & Import
            </h2>
            <p class="text-secondary-700 text-sm mb-4">
              Save your custom themes and share them with others. Import themes with one click.
            </p>
            <button class="bg-secondary-500 text-secondary-50 px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors text-sm font-medium">
              Export theme
            </button>
          </div>
        </div>

        <!-- Status Alerts -->
        <div class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
          <h4 class="text-lg font-semibold text-text-800 mb-4">Status Messages</h4>
          <div class="space-y-3">
            <div class="bg-success-50 border border-success-200 text-success-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Success!</span>
              <span class="text-sm text-success-700">Your changes have been saved successfully.</span>
            </div>
            <div class="bg-warn-50 border border-warn-200 text-warn-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-warn-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-sm font-medium">Warning</span>
              <span class="text-sm text-warn-700">Please review your settings before continuing.</span>
            </div>
            <div class="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Error</span>
              <span class="text-sm text-error-700">Something went wrong. Please try again.</span>
            </div>
            <div class="bg-primary-50 border border-primary-200 text-primary-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Info</span>
              <span class="text-sm text-primary-700">New features are now available in your dashboard.</span>
            </div>
          </div>
        </div>

        <!-- Typography Examples -->
        <div class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
          <h4 class="text-lg font-semibold text-text-800 mb-4">Typography</h4>
          <div class="space-y-4">
            <div>
              <h1 class="text-3xl font-bold text-text-900">Heading 1 - Bold Title</h1>
              <h2 class="text-2xl font-semibold text-text-800 mt-2">Heading 2 - Section Title</h2>
              <h3 class="text-xl font-medium text-text-700 mt-2">Heading 3 - Subsection</h3>
            </div>
            <div class="space-y-2">
              <p class="text-base text-text-600">
                This is regular body text using the text color token. It automatically adapts to your theme and provides consistent readability.
              </p>
              <p class="text-sm text-text-500">
                Smaller, secondary text for less important information or captions.
              </p>
              <p class="text-xs text-text-400">
                Fine print or metadata that should be subtle but still readable.
              </p>
            </div>
            <div class="flex gap-4">
              <span class="text-text-900 font-bold">Bold text</span>
              <span class="text-text-700 font-medium">Medium text</span>
              <span class="text-text-600">Regular text</span>
              <span class="text-text-400">Light text</span>
            </div>
          </div>
        </div>

        <!-- Status Badges -->
        <div class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
          <h4 class="text-lg font-semibold text-text-800 mb-4">Status Badges</h4>
          <div class="flex flex-wrap gap-3">
            <span class="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">Active</span>
            <span class="px-3 py-1 bg-warn-100 text-warn-700 rounded-full text-sm font-medium">Pending</span>
            <span class="px-3 py-1 bg-error-100 text-error-700 rounded-full text-sm font-medium">Failed</span>
            <span class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">New</span>
            <span class="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">Featured</span>
            <span class="px-3 py-1 bg-text-100 text-text-700 rounded-full text-sm font-medium">Default</span>
          </div>
          <div class="flex flex-wrap gap-3 mt-4">
            <span class="px-3 py-1 border-2 border-success-500 text-success-600 rounded-full text-sm font-medium">Verified</span>
            <span class="px-3 py-1 border-2 border-warn-500 text-warn-600 rounded-full text-sm font-medium">Review</span>
            <span class="px-3 py-1 border-2 border-error-500 text-error-600 rounded-full text-sm font-medium">Expired</span>
            <span class="px-3 py-1 border-2 border-text-500 text-text-600 rounded-full text-sm font-medium">Draft</span>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import colors from 'tailwindcss/colors'

const showPrimaryPicker = ref(false)
const showSecondaryPicker = ref(false)
const showSurfacePicker = ref(false)
const showTextPicker = ref(false)

const { 
  currentTheme,
  isDarkMode,
  themes,
  availableColors,
  setTheme: originalSetTheme,
  setCustomTheme,
  toggleDarkMode,
  initTheme
} = useDynamicTheme()

const customConfig = ref({
  primary: 'blue',
  secondary: 'cyan',
  surface: 'slate',
  text: 'gray',
  success: 'green',
  warn: 'amber',
  error: 'red'
})

// Override setTheme to also update customConfig
const setTheme = (themeName: string) => {
  originalSetTheme(themeName)
  // Update customConfig to reflect the selected theme
  if (themes[themeName]) {
    customConfig.value = { ...themes[themeName] }
  }
}

// Select a Tailwind color
const selectColor = (role: 'primary' | 'secondary' | 'surface' | 'text' | 'success' | 'warn' | 'error', colorName: string) => {
  customConfig.value[role] = colorName as any
  setCustomTheme(customConfig.value)
}

// Helper to get the medium shade of a color for preview
const getColorPreview = (colorName: string) => {
  const palette = colors[colorName as keyof typeof colors] as any
  return palette && palette['500'] ? palette['500'] : '#ccc'
}

onMounted(() => {
  initTheme()
  // Initialize customConfig with the current theme's colors
  if (themes[currentTheme.value]) {
    customConfig.value = { ...themes[currentTheme.value] }
  }
})
</script>