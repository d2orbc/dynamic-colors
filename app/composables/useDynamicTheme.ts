// app/composables/useDynamicTheme.ts
import { ref, computed, readonly } from "vue";
import { apcach, crToBg, crToFg, apcachToCss } from "apcach";

// Type for color configuration using hue + chroma
export type ColorConfig = {
  hue: number;
  chroma: number;
};

export type ThemeConfig = {
  primary: ColorConfig;
  secondary: ColorConfig;
  surface: ColorConfig;
  text: ColorConfig;
  success: ColorConfig;
  warn: ColorConfig;
  error: ColorConfig;
  contrast?: number; // Optional theme-level contrast modifier (default: 1.0)
};

export const useDynamicTheme = () => {
  const currentTheme = ref<string>("ocean");
  const isDarkMode = ref<boolean>(false);

  // Predefined theme configurations with hue + chroma pairs
  const themes: Record<string, ThemeConfig> = {
    ocean: {
      primary: { hue: 220, chroma: 0.3 },
      secondary: { hue: 185, chroma: 0.25 },
      surface: { hue: 215, chroma: 0.02 },
      text: { hue: 220, chroma: 0.02 },
      success: { hue: 120, chroma: 0.25 },
      warn: { hue: 45, chroma: 0.3 },
      error: { hue: 0, chroma: 0.3 },
      contrast: 1.0, // Default contrast for ocean theme
    },
    forest: {
      primary: { hue: 140, chroma: 0.3 },
      secondary: { hue: 120, chroma: 0.25 },
      surface: { hue: 30, chroma: 0.02 },
      text: { hue: 0, chroma: 0.02 },
      success: { hue: 85, chroma: 0.3 },
      warn: { hue: 60, chroma: 0.35 },
      error: { hue: 350, chroma: 0.25 },
      contrast: 0.95, // Slightly softer contrast for forest theme
    },
    sunset: {
      primary: { hue: 30, chroma: 0.35 },
      secondary: { hue: 10, chroma: 0.3 },
      surface: { hue: 35, chroma: 0.08 },
      text: { hue: 50, chroma: 0.02 },
      success: { hue: 140, chroma: 0.25 },
      warn: { hue: 60, chroma: 0.35 },
      error: { hue: 0, chroma: 0.3 },
      contrast: 1.05, // Slightly higher contrast for sunset theme
    },
    midnight: {
      primary: { hue: 240, chroma: 0.3 },
      secondary: { hue: 270, chroma: 0.25 },
      surface: { hue: 220, chroma: 0.03 },
      text: { hue: 215, chroma: 0.02 },
      success: { hue: 170, chroma: 0.25 },
      warn: { hue: 45, chroma: 0.3 },
      error: { hue: 340, chroma: 0.25 },
      contrast: 0.9, // Lower contrast for midnight theme
    },
  };

  // Map shade numbers to APCA contrast ratios
  const shadeToContrast = (shade: number, isDark: boolean, semantic: string): number => {
    const lightModeMap: Record<number, number> = {
      50: 5,
      100: 10,
      200: 20,
      300: 30,
      400: 40,
      500: 50,
      600: 60,
      700: 70,
      800: 80,
      900: 90,
      950: 100,
    };

    const darkModeMap: Record<number, number> = {
      50: 100,
      100: 90,
      200: 80,
      300: 70,
      400: 60,
      500: 50,
      600: 40,
      700: 30,
      800: 20,
      900: 10,
      950: 5,
    };


    // For colors (primary, secondary, etc.) use regular mapping
    return lightModeMap[shade];
  };

  /**
   * Generate a single color shade using APCACH
   */
  const generateColorShade = (
    colorConfig: ColorConfig,
    shade: number,
    semantic: string,
    isDark: boolean,
    themeContrast: number = 1.0
  ): string => {
    const baseContrast = shadeToContrast(shade, isDark, semantic);
    const { hue, chroma } = colorConfig;

    // Apply theme-level contrast modifier
    const targetContrast = baseContrast * themeContrast;

    try {
      let color;

      // Use appropriate background base for calculations
      const bgBase = isDark ? '#1a1a1a' : '#fafafa';

      // Use different functions based on semantic token type
      if (semantic === 'surface') {
        // For backgrounds, use crToBg for better background colors
        const bgConfig = crToBg(bgBase, targetContrast);
        color = apcach(bgConfig, chroma, hue);
      } else if (semantic === 'text') {
        // For text, use crToFg for better foreground colors
        // In dark mode, we need to generate light text against dark background
        const fgConfig = crToFg(bgBase, targetContrast);
        color = apcach(fgConfig, chroma, hue);
      } else {
        // For primary, secondary, and status colors, use core apcach
        // Adjust chroma based on shade for better visual hierarchy
        const adjustedChroma = shade < 300 ? chroma * 0.3 :
          shade < 500 ? chroma * 0.6 :
            shade > 700 ? chroma * 0.8 :
              chroma;

        const fgConfig = crToFg(bgBase, targetContrast);
        // Use the adjusted chroma directly - maxChroma is a function, not a value
        color = apcach(fgConfig, adjustedChroma, hue);
      }

      // Convert to CSS format (oklch)
      const cssValue = apcachToCss(color, 'oklch');
      return cssValue;
    } catch (error) {
      // Fallback to a gray if generation fails
      console.warn(`Failed to generate color for ${semantic}-${shade}:`, error);
      const fallbackLightness = isDark ? (100 - shade / 10) : (shade / 10);
      return `oklch(${fallbackLightness}% 0 0)`;
    }
  };

  /**
   * Generate CSS variables for a theme configuration
   */
  const generateThemeStyles = (config: ThemeConfig): string => {
    let css = ":root {\n";

    // Shade values to generate
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    // For each semantic color
    const semanticColors = [
      "primary",
      "secondary",
      "surface",
      "text",
      "success",
      "warn",
      "error",
    ] as const;

    // Get theme contrast or default to 1.0
    const themeContrast = config.contrast || 1.0;

    semanticColors.forEach((semantic) => {
      const colorConfig = config[semantic];

      // Generate CSS variables for each shade
      shades.forEach((shade) => {
        const colorValue = generateColorShade(
          colorConfig,
          shade,
          semantic,
          isDarkMode.value,
          themeContrast
        );
        css += `  --color-${semantic}-${shade}: ${colorValue};\n`;
      });
    });

    css += "}";
    return css;
  };

  /**
   * Apply a theme configuration to the document
   */
  const applyTheme = (config: ThemeConfig) => {
    const styleContent = generateThemeStyles(config);

    // Remove existing theme style tag if it exists
    const existingStyle = document.getElementById("dynamic-theme-styles");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject new style tag
    const styleTag = document.createElement("style");
    styleTag.id = "dynamic-theme-styles";
    styleTag.textContent = styleContent;
    document.head.appendChild(styleTag);

    // Add or remove dark mode class from document element
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save theme preference
    if (import.meta.client) {
      localStorage.setItem("selected-theme", currentTheme.value);
      localStorage.setItem("dark-mode", isDarkMode.value.toString());
    }
  };

  /**
   * Switch to a predefined theme
   */
  const setTheme = (themeName: string) => {
    if (!themes[themeName]) {
      console.warn(`Theme '${themeName}' not found`);
      return;
    }

    currentTheme.value = themeName;
    applyTheme(themes[themeName]);
  };

  /**
   * Create a custom theme with specific colors
   */
  const setCustomTheme = (config: ThemeConfig) => {
    currentTheme.value = "custom";
    applyTheme(config);

    // Save custom theme configuration
    if (import.meta.client) {
      localStorage.setItem("custom-theme-config", JSON.stringify(config));
    }
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;

    // Re-apply current theme with new dark mode setting
    if (currentTheme.value === "custom") {
      const customConfig = localStorage.getItem("custom-theme-config");
      if (customConfig) {
        try {
          const config = JSON.parse(customConfig);
          applyTheme(config);
        } catch (e) {
          console.error("Failed to apply custom theme in dark mode");
        }
      }
    } else if (themes[currentTheme.value]) {
      applyTheme(themes[currentTheme.value]);
    }

    // Save dark mode preference
    if (import.meta.client) {
      localStorage.setItem("dark-mode", isDarkMode.value.toString());
    }
  };

  /**
   * Initialize theme on app load
   */
  const initTheme = () => {
    if (!import.meta.client) return;

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("dark-mode");
    if (savedDarkMode === "true") {
      isDarkMode.value = true;
    }

    const savedTheme = localStorage.getItem("selected-theme");

    if (savedTheme === "custom") {
      const customConfig = localStorage.getItem("custom-theme-config");
      if (customConfig) {
        try {
          const config = JSON.parse(customConfig);
          setCustomTheme(config);
        } catch (e) {
          setTheme("ocean"); // Fallback to default
        }
      }
    } else if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    } else {
      setTheme("ocean"); // Default theme
    }
  };

  // Helper function to get available hues for color picker
  const availableHues = computed(() => {
    return Array.from({ length: 36 }, (_, i) => i * 10);
  });

  // Helper function to get available chromas for intensity picker
  const availableChromas = computed(() => {
    return [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4];
  });

  /**
   * Generate a single color value for preview swatches
   */
  const generateSwatchColor = (
    colorConfig: ColorConfig,
    shade: number,
    semantic: string,
    darkMode?: boolean,
    themeContrast: number = 1.0
  ): string => {
    // Use provided darkMode or fall back to current setting
    const isDark = darkMode !== undefined ? darkMode : isDarkMode.value;
    return generateColorShade(colorConfig, shade, semantic, isDark, themeContrast);
  };

  // Pre-generate static preview colors for theme swatches
  const themePreviewColors: Record<string, { primary: string; secondary: string; surface: string }> = {};

  // Generate preview colors once at initialization
  Object.entries(themes).forEach(([themeName, config]) => {
    themePreviewColors[themeName] = {
      primary: generateColorShade(config.primary, 500, 'primary', false, config.contrast || 1.0),
      secondary: generateColorShade(config.secondary, 500, 'secondary', false, config.contrast || 1.0),
      surface: generateColorShade(config.surface, 500, 'surface', false, config.contrast || 1.0),
    };
  });

  return {
    currentTheme: readonly(currentTheme),
    isDarkMode: readonly(isDarkMode),
    themes: Object.freeze(themes),
    themePreviewColors: Object.freeze(themePreviewColors),
    availableHues,
    availableChromas,
    setTheme,
    setCustomTheme,
    toggleDarkMode,
    initTheme,
    generateSwatchColor,
    generateColorShade,
  };
};