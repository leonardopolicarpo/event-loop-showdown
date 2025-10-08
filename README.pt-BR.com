> 🇺🇸 **Este README também está disponível em [Inglês](./README.md).**

# Node.js Event Loop Showdown 🚀

Uma demonstração simples, porém poderosa e interativa, do Event Loop do Node.js, mostrando a diferença entre a execução de código bloqueante e não-bloqueante através de um painel em tempo real.

**[➡️https://event-loop-showdown.vercel.app/ ⬅️]**

---

## 🎯 O Conceito

O Node.js é *single-threaded* (possui uma única thread de execução), o que significa que ele só consegue fazer uma coisa de cada vez. Seu poder vem do **Event Loop**, que gerencia de forma eficiente operações de I/O (entrada/saída), como consultas a banco de dados ou chamadas de API, sem bloquear a thread principal.

No entanto, tarefas que consomem muita CPU de forma síncrona podem **bloquear o Event Loop**, congelando a aplicação inteira e tornando-a incapaz de responder a outros usuários.

Este projeto demonstra visualmente este problema exato e sua solução.

## 🚀 A Demonstração

A página da demonstração estabelece uma conexão WebSocket em tempo real com o servidor, que envia uma mensagem `pong` a cada segundo.

Você tem dois botões:

1.  **`Iniciar Tarefa Bloqueante`**: Aciona um endpoint da API que executa um cálculo pesado e síncrono de CPU diretamente na thread principal.
    * **Observe:** Você verá o fluxo de mensagens `pong` na tela **congelar** completamente até que o cálculo termine. Este é o Event Loop sendo bloqueado.

2.  **`Iniciar Tarefa Não-Bloqueante`**: Aciona outro endpoint que delega o *mesmo cálculo pesado* para um processo worker separado (`child_process`).
    * **Observe:** O fluxo de `pong` **continua ininterruptamente** enquanto a tarefa pesada é executada em segundo plano. A API permanece responsiva para todos os usuários.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Tempo Real:** Socket.IO (WebSockets)
* **Concorrência:** Módulo `child_process` do Node.js
* **Frontend:** HTML, CSS & JavaScript (Vanilla)
* **Deploy:** Vercel

## ⚙️ Como Executar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/leonardopolicarpo/event-loop-showdown.git
    cd event-loop-showdown
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor:
    ```bash
    node api/server.js
    ```
4.  Abra `http://localhost:3333` no seu navegador.
