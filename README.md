# Typing-Game - Challenge
<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0;border: none!important;">
  <thead>
    <tr>
      <th colspan="2">Personal challenge to create a typing game in less than 3 hours</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">
        <a href="https://ViniciusFXavier.github.io/typing-game/">
          <img src="https://github.com/user-attachments/assets/fb3c2ab6-aa6a-48c3-a9e1-5e24e4eb2ec6" alt="Typing-Game - Challenge" width="1500">
        </a>
      </td>
      <td>While browsing Steam, I came across the game <a href="https://store.steampowered.com/app/2400160/Glyphica_Typing_Survival/">Glyphica: Typing Survival</a> and noticed that its structure was interesting and not too complex. So, I challenged myself to create as much of the game as I could from scratch in 3 hours. <br />
        <br /> <b>Functionality:</b> <br /> The player must defend the tower at the center of the screen from approaching enemies. The longer the game lasts, the more enemies spawn and advance toward the tower. Each enemy has a word above it; by typing the word correctly, a projectile is fired from the tower toward the enemy. <br /> Reference Game: <a href="https://store.steampowered.com/app/2400160/Glyphica_Typing_Survival/">Glyphica: Typing Survival</a>
        <br /> Play now: <a href="https://ViniciusFXavier.github.io/typing-game/">https://ViniciusFXavier.github.io/typing-game/</a>
      </td>
    </tr>
  </tbody>
</table>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
