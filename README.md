# Dynamic Runtime Theming with Tailwind CSS and OKLCH Colors

## The Power of CSS Variables + Tailwind

This project demonstrates a dynamic theming system that lets you change entire color palettes at runtime. Instead of generating thousands of CSS rules for every possible color combination, we use CSS custom properties as a bridge between Tailwind's utility classes and dynamically injected OKLCH values.

The approach:
1. Define semantic colors in CSS using Tailwind's `@theme` directive
2. Use CSS variables that can be overridden at runtime
3. Generate only the CSS variables for the active theme
4. Inject those variables into a `<style>` tag dynamically
5. Tailwind utilities automatically use the new colors

## Why OKLCH?

OKLCH provides perceptually uniform colors - a 10% change in lightness looks consistent across all hues. This makes it perfect for generating color scales that maintain visual harmony and accessibility.

## Core Implementation

### Tailwind Configuration with CSS Variables

```css
/* app/assets/css/main.css */
@import "tailwindcss";

@theme {
  /* Primary colors - reference Tailwind's color palette */
  --color-primary-50: var(--color-blue-50);
  --color-primary-100: var(--color-blue-100);
  --color-primary-200: var(--color-blue-200);
  --color-primary-300: var(--color-blue-300);
  --color-primary-400: var(--color-blue-400);
  --color-primary-500: var(--color-blue-500);
  /* ... all shades for primary, secondary, surface */
}
```

### Dynamic Style Tag Generation

The magic happens in our composable that generates and injects CSS variables:

```typescript
const generateThemeStyles = (config: ThemeConfig): string => {
  let css = ":root {\n";
  
  semanticColors.forEach((semantic) => {
    const colorName = config[semantic];
    const palette = colors[colorName];
    
    Object.entries(palette).forEach(([shade, value]) => {
      // Extract OKLCH values and create CSS variable
      const oklchMatch = value.match(/oklch\(([\d.%]+)\s+([\d.]+)\s+([\d.]+)\)/);
      if (oklchMatch) {
        const [, l, c, h] = oklchMatch;
        css += `  --color-${semantic}-${shade}: oklch(${l} ${c} ${h});\n`;
      }
    });
  });
  
  css += "}";
  return css;
};

const applyTheme = (config: ThemeConfig) => {
  const styleContent = generateThemeStyles(config);
  
  // Remove existing theme style tag
  const existingStyle = document.getElementById("dynamic-theme-styles");
  if (existingStyle) existingStyle.remove();
  
  // Create and inject new style tag
  const styleTag = document.createElement("style");
  styleTag.id = "dynamic-theme-styles";
  styleTag.textContent = styleContent;
  document.head.appendChild(styleTag);
};
```

## Dark Mode Magic

Dark mode works by intelligently transforming the lightness values in the OKLCH color space. The algorithm applies a mathematical transformation that creates natural-looking dark variants:

```typescript
let lightness = Number(l?.substring(0, l.length - 1))
if (isDarkMode.value) {
  lightness = 120 - lightness;  // Invert around 60% lightness
}
```

This approach:
- Inverts lightness around the 60% point (120 - L)
- Preserves color hue and chroma for consistency
- Creates natural-looking dark variants automatically

When you toggle dark mode:
- The document gets a `dark` class
- Color variables are regenerated with transformed OKLCH lightness values
- All Tailwind utilities automatically use the new values

## Using the System

Once initialized, you use standard Tailwind classes throughout your app:

```vue
<!-- These classes work with any theme -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Button
</button>

<div class="bg-surface-100 border-surface-200">
  <h2 class="text-surface-900">Content Area</h2>
  <p class="text-surface-600">Adapts to any theme</p>
</div>
```

The colors change dynamically when you:
- Switch between predefined themes (ocean, forest, sunset, midnight)
- Toggle dark mode
- Create custom color combinations

## Performance Benefits

This approach is incredibly efficient:
- **~100 lines of CSS** for a complete theme (vs thousands with traditional approaches)
- **No JavaScript in render path** - changes happen entirely through CSS
- **Hardware-accelerated** CSS custom properties
- **Zero bundle bloat** - only the theme engine code is included

## The Result

You get the best of both worlds:
- **Developer experience**: Use familiar Tailwind utilities like `bg-primary-500`
- **User experience**: Complete theme customization without rebuilding CSS
- **Performance**: Minimal runtime overhead with native browser optimization
- **Dark mode**: Automatic, intelligent color scale inversion

The entire theme system is just a few hundred lines of code, yet provides infinite color possibilities while maintaining the simplicity and power of Tailwind CSS.
