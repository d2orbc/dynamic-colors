<template>
  <div class="theme-switcher">
    <!-- Predefined themes -->
    <div class="space-y-4 mb-6">
      <h3 class="text-lg font-semibold text-surface-800">
        Predefined Themes
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="(config, name) in themes"
          :key="name"
          @click="setTheme(name)"
          :class="[
            'group relative flex flex-col gap-3 p-4 rounded-xl border-2 transition-all duration-200',
            currentTheme === name 
              ? 'border-primary-500 bg-primary-50 shadow-md scale-[1.02]' 
              : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
          ]"
        >
          <!-- Theme Name -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold capitalize text-surface-700">{{ name }}</span>
            <div v-if="currentTheme === name" class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"/>
          </div>
          
          <!-- Color Swatches -->
          <div class="flex gap-2">
            <div 
              v-for="(colorName, role) in config"
              :key="role"
              class="flex-1"
            >
              <div class="text-[10px] text-surface-500 mb-1 capitalize">{{ role }}</div>
              <div class="flex gap-0.5">
                <span 
                  v-for="shade in [100, 300, 500, 700, 900]"
                  :key="shade"
                  class="flex-1 h-6 rounded-sm transition-transform hover:scale-110"
                  :style="{ backgroundColor: getColorShade(colorName, shade) }"
                  :title="`${colorName}-${shade}`"
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Custom theme builder -->
    <div class="space-y-4 pt-6 border-t border-surface-200">
      <h3 class="text-lg font-semibold text-surface-800">
        Custom Theme Builder
      </h3>
      
      <div class="space-y-4">
        <!-- Primary Color Selection -->
        <div>
          <label class="block text-sm font-semibold text-surface-700 mb-2">
            Primary Color
          </label>
          <div class="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            <button
              v-for="color in availableColors"
              :key="color"
              @click="selectColor('primary', color)"
              :class="[
                'group relative h-12 rounded-lg border-2 transition-all duration-150',
                customConfig.primary === color 
                  ? 'border-primary-500 ring-2 ring-primary-300 ring-offset-1' 
                  : 'border-surface-200 hover:border-surface-400 hover:scale-105'
              ]"
              :style="{ backgroundColor: getColorPreview(color) }"
              :title="color"
            >
              <span 
                class="absolute bottom-0.5 left-0.5 right-0.5 text-[9px] text-white bg-black/50 px-1 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {{ color }}
              </span>
            </button>
          </div>
        </div>
        
        <!-- Secondary Color Selection -->
        <div>
          <label class="block text-sm font-semibold text-surface-700 mb-2">
            Secondary Color
          </label>
          <div class="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            <button
              v-for="color in availableColors"
              :key="color"
              @click="selectColor('secondary', color)"
              :class="[
                'group relative h-12 rounded-lg border-2 transition-all duration-150',
                customConfig.secondary === color 
                  ? 'border-secondary-500 ring-2 ring-secondary-300 ring-offset-1' 
                  : 'border-surface-200 hover:border-surface-400 hover:scale-105'
              ]"
              :style="{ backgroundColor: getColorPreview(color) }"
              :title="color"
            >
              <span 
                class="absolute bottom-0.5 left-0.5 right-0.5 text-[9px] text-white bg-black/50 px-1 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {{ color }}
              </span>
            </button>
          </div>
        </div>
        
        <!-- Surface Color Selection -->
        <div>
          <label class="block text-sm font-semibold text-surface-700 mb-2">
            Surface Color
          </label>
          <div class="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            <button
              v-for="color in availableColors"
              :key="color"
              @click="selectColor('surface', color)"
              :class="[
                'group relative h-12 rounded-lg border-2 transition-all duration-150',
                customConfig.surface === color 
                  ? 'border-surface-700 ring-2 ring-surface-400 ring-offset-1' 
                  : 'border-surface-200 hover:border-surface-400 hover:scale-105'
              ]"
              :style="{ backgroundColor: getColorPreview(color) }"
              :title="color"
            >
              <span 
                class="absolute bottom-0.5 left-0.5 right-0.5 text-[9px] text-white bg-black/50 px-1 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {{ color }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="mt-6 space-y-4">
      <h3 class="text-sm font-semibold text-surface-700">Live Preview</h3>
      
      <!-- Component Examples -->
      <div class="p-4 bg-surface-100 rounded-lg space-y-4">
        <!-- Buttons -->
        <div class="flex flex-wrap gap-2">
          <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Primary Button
          </button>
          <button class="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
            Secondary Button
          </button>
          <button class="px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
            Outlined
          </button>
        </div>
        
        <!-- Cards -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-surface-50 border border-surface-200 rounded-lg">
            <h4 class="text-sm font-semibold text-surface-900 mb-1">Card Title</h4>
            <p class="text-xs text-surface-600">Sample card content with surface colors.</p>
          </div>
          <div class="p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <h4 class="text-sm font-semibold text-primary-900 mb-1">Primary Card</h4>
            <p class="text-xs text-primary-700">Themed card with primary colors.</p>
          </div>
        </div>
        
        <!-- Color Shades -->
        <div class="space-y-2">
          <div class="text-xs text-surface-600 font-medium">Primary Shades</div>
          <div class="grid grid-cols-11 gap-1">
            <div 
              v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
              :key="shade"
              class="aspect-square rounded-sm relative group"
              :class="`bg-primary-${shade}`"
            >
              <span class="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="shade < 500 ? 'text-surface-900' : 'text-white'">
                {{ shade }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="text-xs text-surface-600 font-medium">Secondary Shades</div>
          <div class="grid grid-cols-11 gap-1">
            <div 
              v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
              :key="shade"
              class="aspect-square rounded-sm relative group"
              :class="`bg-secondary-${shade}`"
            >
              <span class="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="shade < 500 ? 'text-surface-900' : 'text-white'">
                {{ shade }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="text-xs text-surface-600 font-medium">Surface Shades</div>
          <div class="grid grid-cols-11 gap-1">
            <div 
              v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
              :key="shade"
              class="aspect-square rounded-sm relative group"
              :class="`bg-surface-${shade}`"
            >
              <span class="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="shade < 500 ? 'text-surface-900' : 'text-white'">
                {{ shade }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Export/Import Actions -->
    <div class="mt-6 pt-6 border-t border-surface-200 space-y-3">
      <div class="flex gap-2">
        <button
          @click="exportTheme"
          class="flex-1 px-3 py-2 text-sm font-medium bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors"
        >
          Export Theme
        </button>
        <label class="flex-1">
          <input
            type="file"
            @change="handleImportTheme"
            accept=".json"
            class="hidden"
          />
          <span class="block w-full px-3 py-2 text-sm font-medium text-center bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors cursor-pointer">
            Import Theme
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import colors from 'tailwindcss/colors'

const { 
  currentTheme, 
  isDarkMode,
  themes, 
  availableColors, 
  setTheme, 
  setCustomTheme,
  toggleDarkMode,
  exportTheme,
  importTheme,
  initTheme 
} = useDynamicTheme()

// Helper to get a specific shade of a color
const getColorShade = (colorName: string, shade: number) => {
  const palette = colors[colorName as keyof typeof colors] as any
  return palette && palette[shade] ? palette[shade] : '#ccc'
}

// Helper to get the medium shade of a color for preview
const getColorPreview = (colorName: string) => {
  return getColorShade(colorName, 500)
}

const customConfig = ref({
  primary: 'blue',
  secondary: 'cyan',
  surface: 'slate'
})

// Select a Tailwind color
const selectColor = (role: 'primary' | 'secondary' | 'surface', colorName: string) => {
  customConfig.value[role] = colorName as any
  setCustomTheme(customConfig.value)
}

// Handle theme import
const handleImportTheme = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  
  try {
    await importTheme(file)
  } catch (error) {
    console.error('Failed to import theme:', error)
  }
  
  // Reset input
  input.value = ''
}

onMounted(() => {
  initTheme()
})
</script>