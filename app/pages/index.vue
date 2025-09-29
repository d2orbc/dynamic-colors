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
            <button @click="toggleDarkMode" :class="[
              'relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              isDarkMode ? 'bg-primary-600' : 'bg-surface-300'
            ]" title="Toggle dark mode">
              <span class="sr-only">Toggle dark mode</span>
              <span :class="[
                'inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform flex items-center justify-center',
                isDarkMode ? 'translate-x-9' : 'translate-x-1'
              ]">
                <svg v-if="isDarkMode" class="w-3.5 h-3.5 text-primary-600 ml-1 mt-1" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else class="w-3.5 h-3.5 text-yellow-500 ml-1 mt-1" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <!-- Hero Section -->
      <section class="text-center py-2">
        <h2 class="text-4xl font-bold text-text-900 mb-4">
          Dynamic Runtime Theming with <span class="text-primary-500">APCACH + Tailwind</span>
        </h2>
        <p class="text-xl text-text-600 max-w-3xl mx-auto">
          Change your entire color scheme instantly with guaranteed accessibility. No rebuilds, no massive CSS bundles.
          Just beautiful, accessible themes powered by APCACH.
        </p>

        <!-- Links -->
        <div class="mt-4 flex items-center justify-center gap-6">
          <a href="https://github.com/d2orbc/dynamic-colors" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-text-600 hover:text-primary-600 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                clip-rule="evenodd" />
            </svg>
            <span class="font-medium">View on GitHub</span>
          </a>
          <a href="https://github.com/d2orbc/dynamic-colors/blob/main/README.md" target="_blank"
            rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline font-medium">Read more
            →</a>
        </div>

        <!-- Code Example -->
        <div class="mt-8 max-w-2xl mx-auto">
          <pre
            class="bg-surface-900 text-text-50 p-4 rounded-lg overflow-x-auto text-sm text-left"><code><span class="text-primary-400">&lt;!-- All these classes automatically adapt to theme changes and dark mode --&gt;</span>
<span class="text-text-300">&lt;button</span> <span class="text-success-400">class</span>=<span class="text-warn-400">"bg-primary-500 text-primary-50 hover:bg-primary-600"</span><span class="text-text-300">&gt;</span>
  Primary Button
<span class="text-text-300">&lt;/button&gt;</span>

<span class="text-text-300">&lt;div</span> <span class="text-success-400">class</span>=<span class="text-warn-400">"bg-success-50 border-success-200 text-success-800"</span><span class="text-text-300">&gt;</span> ✓ <span class="text-text-300">&lt;/div&gt;</span>

<span class="text-text-300">&lt;p</span> <span class="text-success-400">class</span>=<span class="text-warn-400">"text-text-600"</span><span class="text-text-300">&gt;</span>Greetings<span class="text-text-300">&lt;/p&gt;</span></code></pre>
        </div>
      </section>

      <!-- Quick Theme Customization -->
      <section class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
        <div class="space-y-6">
          <!-- Quick Theme Selection -->
          <div>
            <h3 class="text-lg font-semibold text-text-900 mb-4">Quick Theme Selection</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button v-for="(config, name) in themes" :key="name" @click="setTheme(name)" :class="[
                'group flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                currentTheme === name
                  ? 'border-primary-500 bg-surface-50'
                  : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
              ]">
                <div class="flex gap-1">
                  <div class="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                    :style="{ backgroundColor: themePreviewColors[name].primary }"></div>
                  <div class="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                    :style="{ backgroundColor: themePreviewColors[name].secondary }"></div>
                  <div class="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                    :style="{ backgroundColor: themePreviewColors[name].surface }"></div>
                </div>
                <span class="text-sm font-medium capitalize text-text-700">{{ name }}</span>
              </button>
            </div>
          </div>

          <!-- Condensed Color Customization -->
          <div class="border-t border-surface-200 pt-6">
            <h3 class="text-lg font-semibold text-text-900 mb-4">Customize Colors with APCACH</h3>
            <p class="text-sm text-text-600 mb-4">
              Adjust hue (0-360°) and chroma (0-0.4) to create accessible color palettes. 
              APCACH generates all shades with guaranteed APCA contrast ratios.
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Primary Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Primary Color
                </label>
                <div class="flex gap-2 items-center">
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Hue</div>
                    <input type="range" min="0" max="360" v-model.number="customConfig.primary.hue"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.primary.hue }}°</div>
                  </div>
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Chroma</div>
                    <input type="range" min="0" max="0.4" step="0.01" v-model.number="customConfig.primary.chroma"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.primary.chroma.toFixed(2) }}</div>
                  </div>
                  <div class="w-12 h-12 rounded-lg bg-primary-500 border-2 border-surface-200"></div>
                </div>
              </div>

              <!-- Secondary Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Secondary Color
                </label>
                <div class="flex gap-2 items-center">
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Hue</div>
                    <input type="range" min="0" max="360" v-model.number="customConfig.secondary.hue"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.secondary.hue }}°</div>
                  </div>
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Chroma</div>
                    <input type="range" min="0" max="0.4" step="0.01" v-model.number="customConfig.secondary.chroma"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.secondary.chroma.toFixed(2) }}</div>
                  </div>
                  <div class="w-12 h-12 rounded-lg bg-secondary-500 border-2 border-surface-200"></div>
                </div>
              </div>

              <!-- Surface Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Surface Color
                </label>
                <div class="flex gap-2 items-center">
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Hue</div>
                    <input type="range" min="0" max="360" v-model.number="customConfig.surface.hue"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.surface.hue }}°</div>
                  </div>
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Chroma</div>
                    <input type="range" min="0" max="0.1" step="0.005" v-model.number="customConfig.surface.chroma"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.surface.chroma.toFixed(3) }}</div>
                  </div>
                  <div class="w-12 h-12 rounded-lg bg-surface-500 border-2 border-surface-200"></div>
                </div>
              </div>

              <!-- Text Color Picker -->
              <div>
                <label class="block text-sm font-medium text-text-700 mb-2">
                  Text Color
                </label>
                <div class="flex gap-2 items-center">
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Hue</div>
                    <input type="range" min="0" max="360" v-model.number="customConfig.text.hue"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.text.hue }}°</div>
                  </div>
                  <div class="flex-1">
                    <div class="text-xs text-text-500 mb-1">Chroma</div>
                    <input type="range" min="0" max="0.05" step="0.005" v-model.number="customConfig.text.chroma"
                      @input="updateCustomTheme" class="w-full" />
                    <div class="text-xs text-text-600 text-center">{{ customConfig.text.chroma.toFixed(3) }}</div>
                  </div>
                  <div class="w-12 h-12 rounded-lg bg-text-500 border-2 border-surface-200"></div>
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
            <button
              class="px-6 py-2.5 bg-primary-500 text-primary-50 rounded-lg hover:bg-primary-600 transition-colors font-medium">
              Primary Button
            </button>
            <button
              class="px-6 py-2.5 bg-secondary-500 text-secondary-50 rounded-lg hover:bg-secondary-600 transition-colors font-medium">
              Secondary Button
            </button>
            <button
              class="px-6 py-2.5 border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
              Outlined Primary
            </button>
            <button
              class="px-6 py-2.5 border-2 border-secondary-500 text-secondary-600 rounded-lg hover:bg-secondary-50 transition-colors font-medium">
              Outlined Secondary
            </button>
            <button class="px-6 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium">
              Text Button
            </button>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-surface-100 p-6 rounded-xl shadow-sm border border-surface-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-text-900 mb-2">
              APCACH-Powered
            </h2>
            <p class="text-text-600 text-sm mb-4">
              Dynamic color generation with guaranteed APCA contrast ratios for perfect accessibility.
            </p>
            <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Learn more →
            </button>
          </div>

          <div class="bg-primary-50 p-6 rounded-xl border border-primary-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-primary-900 mb-2">
              Hue + Chroma System
            </h2>
            <p class="text-primary-700 text-sm mb-4">
              Define colors using hue (0-360°) and chroma (0-0.4) instead of hex codes.
            </p>
            <button
              class="bg-primary-500 text-primary-50 px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">
              Try it now
            </button>
          </div>

          <div class="bg-secondary-50 p-6 rounded-xl border border-secondary-200 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-secondary-900 mb-2">
              Guaranteed Accessible
            </h2>
            <p class="text-secondary-700 text-sm mb-4">
              Every generated color meets APCA contrast standards automatically.
            </p>
            <button
              class="bg-secondary-500 text-secondary-50 px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors text-sm font-medium">
              Export theme
            </button>
          </div>
        </div>

        <!-- Status Alerts -->
        <div class="bg-surface-100 rounded-xl p-6 shadow-sm border border-surface-200">
          <h4 class="text-lg font-semibold text-text-800 mb-4">Status Messages</h4>
          <div class="space-y-3">
            <div
              class="bg-success-50 border border-success-200 text-success-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Success!</span>
              <span class="text-sm text-success-700">Your changes have been saved successfully.</span>
            </div>
            <div class="bg-warn-50 border border-warn-200 text-warn-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-warn-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-sm font-medium">Warning</span>
              <span class="text-sm text-warn-700">Please review your settings before continuing.</span>
            </div>
            <div
              class="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Error</span>
              <span class="text-sm text-error-700">Something went wrong. Please try again.</span>
            </div>
            <div
              class="bg-primary-50 border border-primary-200 text-primary-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                This is regular body text using the text color token. It automatically adapts to your theme and provides
                consistent readability.
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
            <span
              class="px-3 py-1 border-2 border-success-500 text-success-600 rounded-full text-sm font-medium">Verified</span>
            <span
              class="px-3 py-1 border-2 border-warn-500 text-warn-600 rounded-full text-sm font-medium">Review</span>
            <span
              class="px-3 py-1 border-2 border-error-500 text-error-600 rounded-full text-sm font-medium">Expired</span>
            <span class="px-3 py-1 border-2 border-text-500 text-text-600 rounded-full text-sm font-medium">Draft</span>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// No longer need color picker visibility states

const {
  currentTheme,
  isDarkMode,
  themes,
  themePreviewColors,
  availableHues,
  availableChromas,
  setTheme: originalSetTheme,
  setCustomTheme,
  toggleDarkMode,
  initTheme,
  generateSwatchColor
} = useDynamicTheme()

const customConfig = ref({
  primary: { hue: 220, chroma: 0.3 },
  secondary: { hue: 185, chroma: 0.25 },
  surface: { hue: 215, chroma: 0.05 },
  text: { hue: 220, chroma: 0.02 },
  success: { hue: 120, chroma: 0.25 },
  warn: { hue: 45, chroma: 0.3 },
  error: { hue: 0, chroma: 0.3 },
  contrast: 1.0 // Default contrast for custom theme
})

// Override setTheme to also update customConfig
const setTheme = (themeName: string) => {
  originalSetTheme(themeName)
  // Update customConfig to reflect the selected theme
  if (themes[themeName]) {
    customConfig.value = { ...themes[themeName] }
  }
}

// Update theme when hue/chroma changes
const updateCustomTheme = () => {
  setCustomTheme(customConfig.value)
}

// Helper to generate a color preview circle
const getThemeColorPreview = (colorConfig: any, role: string) => {
  // Return CSS class that will use the generated CSS variables
  return `bg-${role}-500`
}

onMounted(() => {
  initTheme()
  // Initialize customConfig with the current theme's colors
  if (themes[currentTheme.value]) {
    customConfig.value = { ...themes[currentTheme.value] }
  }
})
</script>
