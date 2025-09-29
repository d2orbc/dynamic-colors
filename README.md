# Dynamic Runtime Theming with APCACH and Tailwind CSS

## The Power of APCACH + CSS Variables + Tailwind

This project demonstrates a dynamic theming system powered by APCACH that generates accessible color palettes on the fly. Instead of importing predefined colors from Tailwind, we dynamically create perceptually uniform, WCAG-compliant color scales at runtime using hue and chroma pairs.

The approach:
1. Define semantic colors in CSS using Tailwind's `@theme` directive
2. Use CSS variables that can be overridden at runtime
3. Generate accessible color scales using APCACH algorithms
4. Inject those variables into a `<style>` tag dynamically
5. Tailwind utilities automatically use the new colors

## Why APCACH?

APCACH ensures guaranteed accessibility through APCA (Advanced Perceptual Contrast Algorithm) contrast ratios while maintaining consistent hues across all shades. This allows for:
- **Guaranteed Accessibility**: Every color meets APCA contrast requirements
- **Dynamic Generation**: No predefined palettes needed - any hue/chroma combination works
- **Perceptual Uniformity**: Using OKLCH color space for consistent visual appearance
- **Smaller Bundle Size**: No Tailwind color imports required

## Core Implementation

### Theme Configuration with Hue + Chroma

Instead of using named colors, themes are defined using hue (0-360°) and chroma (0-0.4) pairs:

```typescript
type APCACHThemeConfig = {
  primary: { hue: number, chroma: number },
  secondary: { hue: number, chroma: number },
  surface: { hue: number, chroma: number },
  text: { hue: number, chroma: number },
  success: { hue: number, chroma: number },
  warn: { hue: number, chroma: number },
  error: { hue: number, chroma: number }
}

// Example: Ocean Theme
const oceanTheme = {
  primary: { hue: 220, chroma: 0.3 },    // Blue
  secondary: { hue: 185, chroma: 0.25 }, // Cyan
  surface: { hue: 215, chroma: 0.05 },  // Slate
  text: { hue: 220, chroma: 0.02 },     // Gray
  success: { hue: 120, chroma: 0.25 },  // Green
  warn: { hue: 45, chroma: 0.3 },       // Amber
  error: { hue: 0, chroma: 0.3 }        // Red
}
```

### Tailwind Configuration with CSS Variables

```css
/* app/assets/css/main.css */
@import "tailwindcss";

@theme {
  /* Semantic colors use CSS variables that are dynamically generated */
  --color-primary-50: oklch(var(--primary-50));
  --color-primary-100: oklch(var(--primary-100));
  --color-primary-200: oklch(var(--primary-200));
  /* ... all shades for primary, secondary, surface, text, success, warn, error */
}
```

### Dynamic Color Generation with APCACH

The system uses different APCACH functions for each semantic token type:

```typescript
const generateThemeStyles = (config: APCACHThemeConfig): string => {
  let css = ":root {\n";
  
  // Generate colors for each semantic token
  Object.entries(config).forEach(([token, { hue, chroma }]) => {
    // Use appropriate APCACH function based on token type
    const generateFn = token === 'surface' ? crToBg :
                       token === 'text' ? crToFg :
                       apcach;
    
    // Generate all shades (50, 100, 200, ..., 950)
    shades.forEach(shade => {
      const targetAPCA = calculateTargetAPCA(shade, isDarkMode);
      const color = generateFn(targetAPCA, hue, chroma);
      css += `  --${token}-${shade}: ${apcachToCss(color)};\n`;
    });
  });
  
  css += "}";
  return css;
};

const applyTheme = (config: APCACHThemeConfig) => {
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

## Dark Mode with APCACH

Dark mode is handled automatically by APCACH through inverted contrast ratios:

```typescript
const calculateTargetAPCA = (shade: number, isDarkMode: boolean) => {
  // Map shade numbers to APCA contrast values
  const lightModeAPCA = {
    50: 15,   // Very light backgrounds
    100: 20,
    200: 30,
    300: 40,
    400: 50,
    500: 60,  // Base color
    600: 70,
    700: 80,
    800: 90,
    900: 100,
    950: 106  // Nearly black
  };
  
  // In dark mode, invert the contrast ratios
  if (isDarkMode) {
    return 106 - lightModeAPCA[shade] + 15;
  }
  return lightModeAPCA[shade];
};
```

This approach:
- Maintains APCA contrast requirements in both modes
- Automatically generates appropriate dark variants
- Preserves color identity (hue/chroma) across modes

When you toggle dark mode:
- The document gets a `dark` class
- APCACH regenerates colors with inverted contrast targets
- All Tailwind utilities automatically use the new values

## Using the System

Once initialized, you use standard Tailwind classes throughout your app:

```vue
<!-- These classes work with any theme -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Button
</button>

<div class="bg-surface-100 border-surface-200">
  <h2 class="text-text-900">Content Area</h2>
  <p class="text-text-600">Adapts to any theme</p>
</div>

<!-- Status colors for semantic meaning -->
<div class="bg-success-100 text-success-800">Success!</div>
<div class="bg-warn-100 text-warn-800">Warning</div>
<div class="bg-error-100 text-error-800">Error</div>
```

The colors change dynamically when you:
- Switch between predefined themes (ocean, forest, sunset, midnight)
- Toggle dark mode
- Create custom hue/chroma combinations
- All while maintaining APCA accessibility standards

## Performance Benefits

This approach is incredibly efficient:
- **~100 lines of CSS** for a complete theme (vs thousands with traditional approaches)
- **No JavaScript in render path** - changes happen entirely through CSS
- **Hardware-accelerated** CSS custom properties
- **No color palette imports** - APCACH generates colors on demand
- **Smaller bundle size** - only the APCACH algorithm is included

## APCACH Function Types

The system uses specialized APCACH functions for different use cases:

| Token Type | Function | Purpose | Best For |
|------------|----------|---------|----------|
| `surface` | `crToBg()` | Background colors | Cards, panels, backgrounds |
| `text` | `crToFg()` | Foreground colors | Headings, body text |
| `primary`, `secondary` | `apcach()` | Vibrant accents | Buttons, links, CTAs |
| `success`, `warn`, `error` | `apcach()` | Semantic status | Alerts, badges, states |

## The Result

You get the best of all worlds:
- **Developer experience**: Use familiar Tailwind utilities like `bg-primary-500`
- **Guaranteed accessibility**: Every color meets APCA contrast standards
- **Infinite possibilities**: Any hue/chroma combination generates a valid palette
- **Performance**: Minimal runtime overhead with native browser optimization
- **Dark mode**: Automatic contrast inversion while maintaining accessibility

The entire theme system leverages APCACH to provide mathematically-guaranteed accessible colors while maintaining the simplicity and power of Tailwind CSS.

## Further Reading

See [APCACH.md](./APCACH.md) for detailed documentation on:
- Hue and chroma value ranges
- Theme configuration examples
- Shade generation strategies
- Implementation details
