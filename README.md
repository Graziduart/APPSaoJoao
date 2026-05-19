# São João em Arcoverde

Aplicativo **mobile** (React Native + Expo) para o evento São João em Arcoverde — programação, polos, turismo, estabelecimentos e favoritos offline.

## Requisitos

- Node.js 18+
- [Expo Go](https://expo.dev/go) no celular (desenvolvimento) ou Android Studio / Xcode (build nativo)

## Desenvolvimento

```bash
npm install
npm start
```

Escaneie o QR code com o Expo Go (Android) ou câmera (iOS).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o Metro bundler |
| `npm run android` | Abre no emulador/dispositivo Android |
| `npm run ios` | Abre no simulador iOS (macOS) |

## Stack

- React Native 0.81 + Expo SDK 54
- React Navigation (abas + stack)
- AsyncStorage (favoritos offline)
- Expo Linear Gradient

## Estrutura

```
src/
├── components/    # UI reutilizável
├── data/          # Shows, polos, turismo, estabelecimentos
├── navigation/    # Rotas e tipos
├── screens/       # Telas do app
├── services/      # Persistência local
├── theme/         # Cores e espaçamentos
└── utils/         # Helpers (mapas, compartilhar)
```
