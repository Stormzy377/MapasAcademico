# 📍  MapasAcademico - Computação Móvel

Este é um aplicativo mobile interativo de mapas e navegação em tempo real desenvolvido em **React Native** com **Expo** e **TypeScript**. O projeto foi concebido para o ambiente académico, permitindo rastrear a posição atual do utilizador via GPS e traçar rotas dinâmicas pelas ruas com base em cliques interativos no ecrã.

---

## 🚀 O que o Aplicativo Faz?

1. **Rastreamento em Tempo Real (GPS):** Captura as coordenadas geográficas reais do dispositivo móvel através do hardware de GPS.
2. **Renderização de Mapas Offline/OpenSource:** Utiliza os blocos de mapa vetorial do *CartoDB / OpenStreetMap*, eliminando a necessidade de chaves pagas da Google.
3. **Marcadores Dinâmicos (Markers):** Identifica visualmente no mapa a localização atual (Origem - Pino Azul) e o local de destino selecionado (Destino - Pino Vermelho).
4. **Cálculo de Rotas por Ruas Reais:** Comunica com a API do *OSRM (Open Source Routing Machine)* para traçar de forma milimétrica a linha geométrica (`Polyline`) que une a origem ao destino, seguindo as estradas reais.
5. **Painel de Feedback Visual (UX):** Mostra um cartão flutuante moderno com o cálculo exato da **distância (em km)** e o **tempo estimado (em minutos)** para o trajeto.
6. **Interatividade Total (Clique no Mapa):** O utilizador pode tocar em qualquer rua do mapa para mover o destino; a rota e as informações de distância/tempo recalculam-se instantaneamente.
7. **Botão de Recentrar:** Um botão flutuante com ícone de bússola que devolve o foco do mapa à posição real do utilizador caso ele se perca a arrastar o ecrã.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

* **Framework Base:** [Expo Go](https://expo.dev/) (SDK 51)
* **Linguagem:** TypeScript (Garantia de tipagem estática e segurança de código)
* **Mapas:** `react-native-maps` (Componentes `MapView`, `UrlTile`, `Marker` e `Polyline`)
* **Localização Nativa:** `expo-location` (Acesso síncrono/assíncrono ao hardware de GPS do smartphone)
* **Comunicação HTTP:** `axios` (Consumo da API REST do OSRM)
* **Design & Ícones:** `lucide-react-native` (Ícones modernos e limpos de bússola, pins e carros)
* **Gestão de Margens:** `react-native-safe-area-context` (Layout adaptável para telemóveis com notch/entalhe)

---

## ⚙️ Pré-requisitos para Instalação

Antes de começares, certifica-te de que tens instalado na tua máquina:
1. **Node.js** (Versão LTS recomendada)
2. **Git** (Para clonar o repositório)
3. No teu telemóvel físico (Android ou iOS), instala a aplicação **Expo Go** a partir da Play Store ou App Store.

---

## 📥 Passo a Passo para Rodar no teu Computador

Siga estes comandos no terminal para colocar o projeto a funcionar sem erros:

### 1. Clonar o Repositório
```bash
git clone <URL_DO_TEU_REPOSITORIO_AQUI>
cd <NOME_DA_PASTA_DO_PROJETO>