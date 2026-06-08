# São João em Arcoverde

Guia digital da festa junina de Arcoverde — PE. Aplicativo multiplataforma desenvolvido em React Native com Expo, reunindo programação, polos, turismo, estabelecimentos e favoritos em uma única experiência mobile.

**Versão:** 1.0.0 · **Evento:** 13 a 28 de junho de 2026

---

## Sobre o projeto

O **São João em Arcoverde** centraliza as informações da maior festa junina do sertão pernambucano. O usuário consulta shows por data e polo, explora pontos turísticos da cidade, encontra locais para comer e hospedar, e salva favoritos diretamente no dispositivo — sem necessidade de conta.

Projeto acadêmico do Curso Tecnológico em **Análise e Desenvolvimento de Sistemas** do **CESA** (Centro de Ensino Superior de Arcoverde), com apoio da **AESA** e da **Prefeitura de Arcoverde**.

---

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Home** | Visão geral da festa, destaques e atalhos rápidos |
| **Programação** | Busca por artista, filtros por polo e data, detalhes do show |
| **Polos** | Informações dos polos oficiais, endereços e subpolos |
| **Turismo** | História de Arcoverde e pontos turísticos da região |
| **Locais** | Restaurantes, hotéis e barracas com filtros por categoria |
| **Favoritos** | Shows e locais salvos localmente no aparelho |
| **Como Chegar** | Integração com Google Maps a partir dos polos e shows |

---

## Stack tecnológica

| Tecnologia | Uso |
|------------|-----|
| [React Native](https://reactnative.dev/) 0.81 | Interface mobile nativa |
| [Expo](https://expo.dev/) SDK 54 | Build, desenvolvimento e distribuição |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e manutenibilidade |
| [React Navigation](https://reactnavigation.org/) | Navegação por abas e stack |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistência local de favoritos |
| [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | Gradientes e identidade visual |
| [Feather Icons](https://icons.expo.fyi/) | Ícones consistentes em todo o app |

**Plataformas suportadas:** Android · iOS · Web

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm ou yarn
- [Expo Go](https://expo.dev/go) no celular (desenvolvimento) ou Android Studio / Xcode (build nativo)

---

## Instalação e execução

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd sao-joao-arcoverde-app

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

Escaneie o QR code com o **Expo Go** (Android) ou a câmera do iPhone (iOS).

### Conexão no celular

| Comando | Quando usar |
|---------|-------------|
| `npm start` ou `npm run start:lan` | Celular e computador na mesma rede Wi-Fi |
| `npm run start:tunnel` | Redes restritas ou QR code apontando para `127.0.0.1` |

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o Expo em modo LAN |
| `npm run start:lan` | Mesmo que `npm start` |
| `npm run start:tunnel` | Inicia com túnel ngrok (acesso remoto) |
| `npm run android` | Abre no emulador ou dispositivo Android |
| `npm run ios` | Abre no simulador iOS (macOS) |
| `npm run web` | Executa no navegador |
| `npm run preview:web` | Gera build web estática e serve em `localhost:3000` |

---

## Estrutura do projeto

```
├── assets/                  # Imagens, capa e logos
├── src/
│   ├── components/          # Componentes reutilizáveis de UI
│   │   └── modulo/          # Design system dos módulos principais
│   ├── data/
│   │   ├── events.ts        # Shows, polos, turismo e estabelecimentos
│   │   └── content.ts       # História, equipe e informações institucionais
│   ├── navigation/          # Rotas, abas e deep linking (web)
│   ├── screens/             # Telas do aplicativo
│   ├── services/            # Persistência local (favoritos)
│   ├── theme/               # Paleta de cores e espaçamentos
│   └── utils/               # Helpers (mapas, formatação, imagens)
├── App.tsx                  # Ponto de entrada
├── app.json                 # Configuração Expo
└── package.json
```

---

## Atualização de conteúdo

Os dados editoriais ficam separados das telas, facilitando manutenção sem alterar a interface:

| Arquivo | Conteúdo |
|---------|----------|
| `src/data/events.ts` | Programação, polos, pontos turísticos e estabelecimentos |
| `src/data/content.ts` | História de Arcoverde, equipe de desenvolvimento e instituição |

Após editar os dados, reinicie o servidor Expo (`r` no terminal) para refletir as mudanças.

---

## Equipe

| Nome | Papel |
|------|-------|
| Marina Grazielly | Desenvolvedora |
| Raniely Bezerra | Desenvolvedora |
| Willams de Jesus | Professor orientador |

**Instituição:** Centro de Ensino Superior de Arcoverde (CESA)  
**Curso:** Análise e Desenvolvimento de Sistemas

---

## Licença

Projeto acadêmico. Todos os direitos reservados.
