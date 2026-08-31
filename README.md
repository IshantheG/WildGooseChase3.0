# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
.wgc-theme {
          --ink: #03060a; --panel: #080d14; --border: #0f1d2e;
          --cyan: #00e5ff; --teal: #00ffc8; --violet: #7b5cf5; --azure: #1a8fff;
          --fg: #c8ddf0; --fg-dim: #5a7a99;
          font-family: var(--font-mono, "Space Mono", monospace);
        }
        .wgc-theme .section-title { font-family: var(--font-syne, "Syne", sans-serif); }
        .wgc-theme .btn-primary, .wgc-theme .btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.7rem 1.4rem; font-size: 0.68rem; letter-spacing: 0.14em;
          text-transform: uppercase; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: transform 0.15s, border-color 0.15s, color 0.15s;
        }
        .wgc-theme .btn-primary { border: 1px solid var(--cyan); color: var(--ink); background: var(--cyan); }
        .wgc-theme .btn-primary:hover { transform: translateY(-1px); }
        .wgc-theme .btn-ghost { border: 1px solid var(--border); color: var(--fg-dim); background: transparent; }
        .wgc-theme .btn-ghost:hover { border-color: var(--violet); color: var(--violet); }
        .wgc-theme .glow-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.18), rgba(123,92,245,0.18), transparent);
        }
        .paper { font-family: Georgia, "Times New Roman", serif; color: #1c1c1c; }