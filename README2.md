2. Instalar as Dependências do Projeto
Nota importante: Devido às configurações de tipagem e versões do SDK do Expo, utilize este comando para instalar tudo de forma alinhada:

Bash
npm install


3. Instalar a Biblioteca de Margens Nativas (Safe Area)


Bash
npx expo install react-native-safe-area-context


4. Iniciar o Servidor do Expo
Bash
npx expo start

Estrutura Principal do Código
O fluxo lógico do app está centralizado em dois ficheiros fundamentais de fácil leitura para a apresentação:

App.tsx: Configura o container geral, StatusBar e o provedor de área segura (SafeAreaProvider).

src/screens/MapScreen.tsx: Contém a lógica de estados (useState), hooks de efeito (useEffect) para disparar o GPS, consumo assíncrono do Axios e os componentes visuais do mapa.

src/components/IconButton.tsx: Componente isolado e reutilizável que renderiza botões redondos flutuantes com sombras e ícones dinâmicos via Props.