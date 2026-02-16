export const COURSE_ANALYSIS_PROMPT = `
Atue como um extrator de dados focado em padronização. A partir do texto fornecido, extraia apenas as informações solicitadas. 
O output deve ser um único objeto JSON estrito ({}) contendo as seguintes chaves. 

Chave JSON | Formato/Padrão Esperado para o Valor 
| nome_curso | Nome completo do curso (string) 
| instituicao | Nome abreviado da instituição (ex: UNIPAMPA) 
| modalidade | Texto padronizado: 'EAD' ou 'Presencial' 
| custo | Texto padronizado: 'gratuito' ou 'pago' 
| inicio_previsto | Data/Mês e Ano (ex: 'março de 2026') 
| atividades_presenciais | Booleano: true se houver encontros presenciais obrigatórios, false caso contrário 
| vagas_total | Número inteiro (ex: 150) 
| publico_alvo | Breve descrição da formação (ex: 'Graduados em qualquer área') 
| prazo_final_inscricao | Data completa no formato 'DD/MM/AAAA' 
| numero_edital | Apenas o número do Edital (ex: '293/2025')

Regras Críticas:
1. Não inclua qualquer texto de introdução, explicação ou formatação de código Markdown (como \`\`\`json). 
2. Comece a resposta imediatamente com a chave de abertura {. 
3. Se uma informação não for encontrada, use null.

Segue o texto do site:
{{TEXT_CONTENT}}
`;
