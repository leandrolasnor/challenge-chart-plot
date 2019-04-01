# Plotando um gráfico

## O desafio

O problema proposto consiste em transformar texto em formato **JSON** em dados estruturados.
Chamamos os dados já estruturados de "***eventos***", que são lidos pelo gráfico para posterior plotagem. Ao final do processo é esperado obter uma ilustração gráfica dos dados informados.

## Construindo a aplicação

A construção da aplicação foi feita com base no `"react": "^16.8.5"`, atraves do **create-react-app**. Não há motivo especial que me vez escolher esta versão. Foram utilizados algumas técnicas de arquitetura para ordenar as chamadas de evolução do estado da aplicação. Redux é ferramenta chave desta aplicação.
Junto ao :heart:**Redux**, um arranjo de outras dependências foram incluídas no projeto com o objetivo de trazer mais robustês a aplicação.

#*eslint****airbnb*** :ok_hand:

## Dependências

`react-simple-code-editor`
 <sub><sup>Caixa de texto que realça o formato **JSON**</sup></sub>

`react-debounce-input`
 <sub><sup>Caixa e texto que atrasa a entreda de dados aguardando pelo termino da digitação</sup></sub>


 `react-chartjs-2`
 <sub><sup>Conjunto de componentes gráficos :bar_chart: :chart_with_upwards_trend: :pizza:</sup></sub>


 `admin-lte`
 <sub><sup>Template baseado no bootstrap, utilizado na diagramação da aplicação</sup></sub>

## Como utilizar ?

A aplicação espera pela entrada de textos em formato **JSON**. Após o texto ser inserido, é pssível iniciar o processo de construção do gráfico. A aplicação faz uma chamada a uma ação do editor que estrutura o texto e transforma os eventos em ***dispatches***, que serão encaminhados aos redutores. O redutor ligado ao gráfico espera por estes ***dispatches*** para capturar as informações do evento e evoluir o estado. Por fim, a evolução do estado no redutor reflete nos dados que são exibidos no gráfico. É feio o descarte dos dados textuais que correspondem ao evento processado nesse momento.
A cada novo evento processado, o estado evolui, e o gráfico exibe mais informações.
Entradas inválidas não são processadas e permanecerão na caixa de texto por questão investigativa. O processo tem seu inicio com um evento **START** e se finaliza com um evento **STOP**. É possível dar entrada em parte dos dados em um momento e posteriormente finalizar o processamento inserindo o restante dos dados. Este comportamento nos possibilita integrar esta aplicação a um ambiente de monitoramento em tempo real, onde um usuário ou uma API fornecerá os dados em tempo real e o gráfico irá plotar evento após evento.

## Eventos

***START***

    {type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']}

***SPAN***

    {type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201}

***DATA***

    {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}

 ***STOP***

    {type: 'stop', timestamp: 1519780251293}



## Desempenho

A partir dos dados já estruturados, temos um volume de bytes a considerar. Este volume será processado, e no final teremos mais bytes que serão armazenados e utilizados pela ferramenta gráfica. Na tentativa de evitar que o volume de dados dobre, todo texto que representa um evento já processado e plotado no gráfico será descartado. Assim o volume de dados não será duplicado na caixa de texto e no gráfico, ficando apenas os eventos já processados ilustrados no gráfico.

## Testes

`jest` `enzyme` `enzyme-adapter-react-16`

Estas dependências foram utilizadas para desenvolvimento de testes de **SnapShot**.
Onde é feito armazenamento da estrutura de dados e marcação da aplicação em determinado momento. O teste tende a falhar quando se realiza o teste e a estrutura dos dados e marcação da aplicação mudam com relação ao snapshot anterior.

## Design

O `admin-lte` é baseado no bootstrap e é simples de se utilizar. Não possuo grandes habilidades e conhecimentos em design, mas notei que o template atenderia bem aos requisitos. Pensando em reutilização, escolhi este template por já ter utilizado em outros projetos.

