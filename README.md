
# 🚀 ProspectIntelli: Pipeline de Prospecção Inteligente B2B

O **ProspectIntelli** é uma ferramenta avançada de automação de vendas que utiliza a Inteligência Artificial (Gemini API) para transformar o processo de busca de leads. O sistema automatiza desde a descoberta de empresas via busca orgânica até a validação e enriquecimento de dados comerciais.

## 🛠️ Funcionalidades Principais

- **Módulo de Descoberta**: Localiza empresas reais com base em palavras-chave e localização usando Google Search Grounding.
- **Extração & Enriquecimento**: Captura e-mails, telefones, websites e endereços físicos.
- **Validação por IA**: Analisa a relevância do lead em relação ao nicho pesquisado e atribui um score de confiança.
- **Detector de WhatsApp**: Identifica automaticamente números com alta probabilidade de uso comercial de WhatsApp.
- **Exportação Imediata**: Gera arquivos CSV prontos para importação em CRMs (Pipedrive, HubSpot, Salesforce).

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19 + Tailwind CSS (Design Ultra-Responsivo).
- **IA**: Google Gemini API (Modelo `gemini-3-flash-preview`).
- **Grounding**: Google Search para dados em tempo real.
- **Linguagem**: TypeScript para máxima segurança de tipos.

## ⚙️ Configuração para Desenvolvimento

Para rodar este projeto localmente ou via GitHub Actions:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/prospect-intelli.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. **Variável de Ambiente**:
   O projeto exige uma chave de API do Google AI Studio. Certifique-se de configurar a variável de ambiente:
   ```env
   API_KEY=sua_chave_aqui
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para clonar e adaptar para suas necessidades comerciais.

---
*Desenvolvido com foco em alta performance e inteligência de dados.*
