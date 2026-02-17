# InkLink - MVP de plataforma para tatuadores

Projeto inicial para conectar tatuadores e clientes, no estilo marketplace de servicos.

## Objetivo
Criar uma base de produto para:
- Exibir tatuadores, estilos e portifolios
- Disponibilizar agenda e horarios
- Permitir agendamento por clientes
- Validar navegacao e telas online com GitHub Pages

## Estrutura
- `index.html` - landing page
- `pages/artistas.html` - lista de tatuadores
- `pages/agendamento.html` - fluxo de agendamento
- `pages/dashboard-tatuador.html` - visao inicial do tatuador
- `assets/css/styles.css` - estilos globais
- `assets/js/data.js` - dados mock
- `assets/js/app.js` - renderizacao e interacoes
- `.github/workflows/pages.yml` - deploy automatico no GitHub Pages

## Rodar localmente
Basta abrir `index.html` no navegador.

## Publicar no GitHub Pages
1. Suba o repositorio no GitHub.
2. No GitHub, abra `Settings > Pages` e confirme `Build and deployment` com `GitHub Actions`.
3. Faça push na branch `main`.
4. O workflow `.github/workflows/pages.yml` publica automaticamente.

## Proximos passos recomendados
1. Integrar backend (Node/Nest + PostgreSQL) para agenda real e autenticacao.
2. Adicionar login por perfil (cliente/tatuador/admin).
3. Incluir upload de imagens do portfolio.
4. Integrar pagamentos e sinal de reserva.
