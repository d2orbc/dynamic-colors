// app/composables/useDynamicTheme.ts
import colors from "tailwindcss/colors";
import { ref, computed, readonly } from "vue";

// Type for Tailwind color names (excluding deprecated ones)
type TailwindColorName = keyof typeof colors;
type ValidColorName = Exclude<
  TailwindColorName,
  | "inherit"
  | "current"
  | "transparent"
  | "black"
  | "white"
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "blueGray"
>;

export type ThemeConfig = {
  primary: ValidColorName;
  secondary: ValidColorName;
  surface: ValidColorName;
  text: ValidColorName;
  success: ValidColorName;
  warn: ValidColorName;
  error: ValidColorName;
};

export const useDynamicTheme = () => {
  const currentTheme = ref<string>("ocean");
  const isDarkMode = ref<boolean>(false);

  // Get available color palettes (filter out non-palette values)
  const availableColors = computed(() => {
    return Object.keys(colors).filter((key) => {
      const value = colors[key as TailwindColorName];
      return typeof value === "object" && "500" in value;
    }) as ValidColorName[];
  });

  // Predefined theme configurations
  const themes: Record<string, ThemeConfig> = {
    ocean: {
      primary: "blue",
      secondary: "cyan",
      surface: "slate",
      text: "gray",
      success: "green",
      warn: "amber",
      error: "red",
    },
    forest: {
      primary: "emerald",
      secondary: "green",
      surface: "stone",
      text: "gray",
      success: "lime",
      warn: "yellow",
      error: "rose",
    },
    sunset: {
      primary: "orange",
      secondary: "red",
      surface: "orange",
      text: "yellow",
      success: "emerald",
      warn: "yellow",
      error: "red",
    },
    midnight: {
      primary: "indigo",
      secondary: "violet",
      surface: "gray",
      text: "slate",
      success: "teal",
      warn: "amber",
      error: "pink",
    },
  };


  /**
   * Generate CSS variables for a theme configuration
   */
  const generateThemeStyles = (config: ThemeConfig): string => {
    let css = ":root {\n";

    // For each semantic color
    const semanticColors = ["primary", "secondary", "surface", "text", "success", "warn", "error"] as const;

    semanticColors.forEach((semantic) => {
      const colorName = config[semantic];
      const palette = colors[colorName as TailwindColorName] as any;

      if (!palette || typeof palette !== "object") {
        console.warn(`Color palette '${colorName}' not found`);
        return;
      }

      // Generate CSS variables for each shade
      Object.entries(palette).forEach(([shade, value]) => {
        const mappedValue = palette[shade] || value;

        // Extract just the L C H values from the oklch() string
        const oklchMatch = (mappedValue as string).match(
          /oklch\(([\d.%]+)\s+([\d.]+)\s+([\d.]+)\)/,
        );
        if (oklchMatch) {
          // Store just the values without oklch() wrapper for flexibility
          const [, l, c, h] = oklchMatch;
          let lightness = Number(l?.substring(0, l.length - 1))
          if (isDarkMode.value) {
            lightness = 120 - lightness;
          }
          css += `  --color-${semantic}-${shade}: oklch(${lightness}% ${c} ${h});\n`;
        }
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

  return {
    currentTheme: readonly(currentTheme),
    isDarkMode: readonly(isDarkMode),
    themes,
    availableColors,
    setTheme,
    setCustomTheme,
    toggleDarkMode,
    initTheme,
  };
};
