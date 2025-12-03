# 🛡️ Desconfiômetro - Protótipo de Biometria Comportamental

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> **MVP de Segurança Bancária:** Sistema antifraude que utiliza os sensores físicos do smartphone (Acelerômetro e Giroscópio) para validar a identidade do usuário baseada em sua postura corporal e manuseio do aparelho.

---

## 📱 Sobre o Projeto

Este projeto é uma Prova de Conceito (PoC) desenvolvida para demonstrar como a **Biometria Comportamental** pode aumentar a segurança em aplicativos bancários.

Diferente de senhas ou digitais, este sistema aprende **como** o usuário segura o celular. Se um fraudador tentar realizar um PIX com o celular deitado em uma mesa (comportamento típico de emuladores ou bots) ou em uma posição atípica, o sistema bloqueia a transação instantaneamente.

### 🎯 Objetivo
Prevenir fraudes bancárias, roubos e acessos não autorizados através da análise de padrões de movimento em tempo real.

---

## 🚀 Funcionalidades

- **📡 Leitura de Sensores em Tempo Real:** Monitoramento contínuo dos eixos X, Y e Z do acelerômetro.
- **🔐 Calibragem de Identidade:** O usuário grava sua "assinatura de movimento" (posição padrão de uso).
- **🛡️ Bloqueio Ativo:** O sistema compara os dados atuais com o padrão gravado. Se a divergência for maior que a margem de erro segura, o status muda para **"BLOQUEIO DE SEGURANÇA"**.
- **🏦 Identidade Visual:** Interface baseada no Design System do Bradesco (Cores institucionais, tipografia e UX).
- **📊 Dashboard Técnico:** Exibição dos dados brutos dos sensores para depuração e testes.

---

## 🛠️ Tecnologias Utilizadas

* **[React Native](https://reactnative.dev/)** - Framework principal.
* **[Expo](https://expo.dev/)** - Plataforma de desenvolvimento.
* **[Expo Sensors](https://docs.expo.dev/versions/latest/sdk/sensors/)** - Biblioteca para acesso ao hardware (Acelerômetro).
* **TypeScript** - Para tipagem estática e segurança de código.

---

## 📦 Como Rodar o Projeto

Para testar este projeto no seu computador e celular, siga os passos abaixo:

### Pré-requisitos
* Node.js instalado.
* Aplicativo **Expo Go** instalado no seu celular (Android ou iOS).

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/C.git](https://github.com/SEU-USUARIO/prototipo-bradesco-security.git)
   cd prototipo-bradesco-security
   
