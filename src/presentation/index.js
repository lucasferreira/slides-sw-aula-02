/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
import { Appear, Deck, Heading, Image, Slide, Text, List, ListItem, CodePane } from "spectacle";
import preloader from "spectacle/lib/utils/preloader";
import createTheme from "spectacle/lib/themes/default";
import "normalize.css";

const images = {
  bg: require("../assets/bg.jpg"),
  bgCapa: require("../assets/bg_capa.jpg"),
  engSimb: require("../assets/eng_simb.png"),
  engSimbWhite: require("../assets/eng_simb_white.png"),
  caminhointernet: require("../assets/caminhointernet.jpg"),
};

preloader(images);

const theme = createTheme(
  {
    primary: "white",
    secondary: "#003958",
    tertiary: "#3787b2",
    quaternary: "#A9A9A9",
    default: "#333",
  },
  {
    primary: "Open Sans",
    secondary: "Anton",
  }
);

const HeadingTitle = ({ children, ...props }) => (
  <Heading textAlign="left" margin="0 0 40px" textFont="secondary" size={3} textColor="secondary" {...props}>
    {children}
  </Heading>
);

export default class Presentation extends React.Component {
  renderSlideCapa() {
    return (
      <Slide bgImage={images.bgCapa}>
        <Heading margin="40px 0 0 520px" textFont="secondary" size={3} caps lineHeight={1} textColor="secondary">
          Soluções WEB
        </Heading>
        <Heading
          textFont="secondary"
          size={5}
          style={{ position: "absolute", bottom: 90, right: 50 }}
          textColor="tertiary">
          Prof. Lucas Ferreira
        </Heading>
      </Slide>
    );
  }
  renderSlideTitulo(title) {
    return (
      <Slide bgColor="secondary">
        <Image src={images.engSimbWhite} width={253} margin="-60px auto 110px" />
        <Heading textFont="secondary" size={1} caps fit lineHeight={1} textColor="primary" style={{ fontWeight: 400 }}>
          {title}
        </Heading>
      </Slide>
    );
  }
  renderSlideTituloImagem(title, img = null) {
    return (
      <Slide bgImage={images.bg} bgPosition="bottom right">
        <HeadingTitle textAlign="center" size={6} margin="0 auto 36px">
          {title}
        </HeadingTitle>
        {!!img && <Image src={img} width={600} margin="60px auto 0" />}
      </Slide>
    );
  }
  renderSlideTituloLista(title, items = [], beforeChildren = null, afterChildren = null) {
    return (
      <Slide bgImage={images.bg} bgPosition="bottom right">
        <HeadingTitle size={6} margin="0 0 16px">
          {title}
        </HeadingTitle>
        {beforeChildren}
        <List>
          {items.map((item, i) => (
            <Appear key={i}>
              <ListItem textSize={24} margin="0 0 16px" style={{ padding: 0, listStyle: "none" }}>
                {item}
              </ListItem>
            </Appear>
          ))}
        </List>
        {afterChildren}
      </Slide>
    );
  }
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        {this.renderSlideCapa()}
        {this.renderSlideTitulo("Fundamentos da Web, Protocolos e Introdução ao REST")}
        {this.renderSlideTituloLista("Como funciona a internet?", [
          'Conhecida como "rede mundial de computadores"',
          "O que é errado... na verdade é um conjunto de várias redes interligadas",
          'O que acaba "descentralizando" a internet (sem dono)',
          "Rede Local x Rede Externa (conexão entre computadores)",
          "Rede Externa → Provedor de Internet (TCP/IP)",
          "Cada ponto da rede têm um endereço IP",
          "Sites disponibilizados através de servidores (também conectados sobre IP)",
        ])}
        {this.renderSlideTituloImagem("O Caminho da Internet", images.caminhointernet)}
        {this.renderSlideTituloLista("Backbone", [
          "Ponto inicial de referência da Internet",
          "Interliga todos os pontos da rede",
          "São pontos-chave das redes que compõem o núcleo das redes de Internet",
          "Existem poucos backbones espalhados pelo mundo, e estes são os responsáveis por distribuir o acesso mundial a rede",
        ])}
        {this.renderSlideTituloLista("Provedor de acesso", [
          "→ Backbones → Chegada de sinal aos provedores de acesso",
          "Empresas que contratam o sinal de backbones para distribuir aos seus usuários",
          "Em geral, empresas ligadas ao setor de telecomunicações",
          "(Ex: Embratel, Oi, Vivo, Claro e etc)",
        ])}
        {this.renderSlideTituloLista("Provedor de serviço", [
          "Quem trafega e transporta os dados até os usuários",
          "Recebem os dados do provedor de acesso e distribuem aos usuários",
          "Por linha telefônica, fibra ótica ou via rádio (por tecnologia sem fio)",
          "Empresas devem sempre ser regulamentadas pela Anatel",
          "(podem inclusive serem os mesmos provedores de acesso)",
          "(Ex: Vivo, Claro, Engeplus, Banda Turbo e etc)",
        ])}
        {this.renderSlideTituloLista("E usuário final?", [
          'O consumo não é passivo, o usuário não apenas "recebe" os dados',
          "O sinal de Internet passa a repetir todo o caminho novamente de forma inversa",
          "Usuário final, também envia sinais - com as suas requisições - para a Internet",
        ])}
        {this.renderSlideTitulo("MAS E OS SITES?")}
        {this.renderSlideTituloLista("Endereços dos sites x DNS", [
          "Obviamente ninguém sabe o endereço IP de cada servidor de cada site",
          "Aí que entra o endereço “www”",
          "Endereços de sites são baseados na tecnologia DNS, que basicamente cria atalhos entre os endereços “www” à endereços IP",
        ])}
        {this.renderSlideTituloLista("Mas o que é o DNS?", [
          "Domain Name System - DNS, ou Sistema de Nomes de Domínios",
          'É um computador com uma espécie de banco de dados que relaciona o endereço "nominal" (www...) com o endereço real (número de IP)',
          "O servidores de DNS traduzem o endereço para o IP do servidor do site",
          "Existe um servidor DNS configurado em sua rede de internet",
          "E cada domínio também indica um servidor DNS responsável por gerenciar suas rotas",
          "Algo Legal → whois do registro.br",
        ])}
        <Slide bgImage={images.bg} bgPosition="top left">
          <HeadingTitle textAlign="center" size={6} margin="0 auto 26px">
            "Traçando a rota"
          </HeadingTitle>
          <Text textAlign="center" textSize={21} margin="0 auto 36px">
            <em>tracert ou traceroute www.satc.edu.br</em>
          </Text>
          <CodePane
            lang="html"
            source={[
              "traceroute to www.satc.edu.br (177.54.50.195)",
              " 1  10.2.1.1 (10.2.1.1)  7.178 ms  111.821 ms  26.659 ms",
              " 2  10.65.0.1 (10.65.0.1)  39.676 ms  5.593 ms  44.607 ms",
              " 3  192.168.255.230 (192.168.255.230)  107.088 ms  8.268 ms  9.199 ms",
              " 4  177.54.51.242 (177.54.51.242)  6.786 ms  11.509 ms  7.686 ms",
              " 5  189.28.177.22 (189.28.177.22)  14.897 ms  37.153 ms  10.005 ms",
              " 6  189.28.177.18 (189.28.177.18)  6.924 ms  45.036 ms  42.444 ms",
            ].join("\n")}
            margin="20px auto"
            overflow="overflow"
          />
        </Slide>
        {this.renderSlideTitulo("PROTOCOLOS")}
        {this.renderSlideTituloLista(
          "Definição de Protocolos (TI)",
          [
            "Estabelecimento de ligação",
            "Negociação de várias características de uma conexão",
            "Inicializar, formatar, transmitir e finalizar uma mensagem",
          ],
          <Text textAlign="left" textSize={21} margin="26px auto 36px">
            Um protocolo é uma convenção que controla e possibilita uma conexão, comunicação, transferência de dados
            entre dois sistemas computacionais. Protocolo pode ser definido como "as regras que governam" a sintaxe,
            semântica e sincronização da comunicação. Os protocolos podem ser implementados pelo hardware, software ou
            por uma combinação dos dois.
          </Text>
        )}
        {this.renderSlideTituloLista("Protocolos mais comuns da internet", [
          "IP → Internet Protocol",
          "TCP → Transmission Control Protocol",
          "HTTP → Hypertext Transfer Protocol → Porta 80",
          "FTP → File Transfer Protocol",
          "SSH → Secure shell",
          "POP3, SMTP e IMAP → Protocolos de E-mail",
        ])}
        {this.renderSlideTituloLista("Protocolo HTTP", [
          "Hypertext Transfer Protocol - HTTP, ou Protocolo de Transferência de Hipertexto",
          "Protocolo de Comunicação via Aplicação, utilizado para distribuição de informação",
          "Hipermídia → Hipertexto (texto com links)",
          "É a base para a comunicação de dados da World Wide Web e roda na porta 80",
          "Este protocolo tem sido usado pela WWW desde 1990",
          "Primeira versão HTTP/0.9, era um protocolo simples para a transferência de dados no formato de texto ASCII pela Internet, com um único método de requisição, chamado GET",
          "Entre 1992 e 1996 foi desenvolvida o HTTP/1.0, agora também com POST e HEAD",
          "Junho de 1999 definição do HTTP/1.1",
          "Março de 2015 lançamento do HTTP/2",
        ])}
        {this.renderSlideTituloLista("E o HTTPS?", [
          'De forma "básica" é o HTTP com uma camada extra de segurança',
          "E roda em outra porta 443",
        ])}
        {this.renderSlideTituloLista("Sessão HTTP(S)", [
          "É uma sequência de transações de rede de requisição-resposta",
          "Para que o protocolo HTTP consiga transferir seus dados pela Web são necessários os protocolos TCP e IP",
          "Inicia no Cliente → estabelecendo uma conexão TCP para uma porta (normalmente 80 ou 443)",
          "Um servidor HTTP ouvindo naquela porta espera por uma mensagem de requisição de cliente",
          'Recebendo a requisição, o servidor retorna uma linha de estado, como "HTTP/1.1 200 OK" e uma mensagem particular própria',
          "O corpo desta mensagem normalmente é o recurso solicitado (HTML) ou também um erro de requisição (404 Page Not Found)",
        ])}
        {this.renderSlideTituloLista("Mensagem HTTP", [
          "Uma mensagem, tanto de requisição quanto de resposta, é composta por uma linha inicial, nenhuma ou mais linhas de cabeçalhos, uma linha em branco obrigatória finalizando o cabeçalho e por fim o corpo da mensagem",
        ])}
        {this.renderSlideTituloLista(
          "Requisição",
          [
            "Uma linha inicial (Request-Line)",
            "Linhas de cabeçalhos (Request-header)",
            "Uma linha em branco obrigatória e um corpo de mensagem opcional",
          ],
          <Text textAlign="left" textSize={24} margin="26px auto 36px">
            Uma mensagem de requisição do cliente é composta pelos seguintes campos:
          </Text>,
          <Appear>
            <Text textAlign="left" textSize={24} margin="36px auto 0">
              A linha inicial de uma requisição é composta por três partes separadas por espaços: o método (Method), a
              identificação do URI (Request-URI) e a versão do HTTP (HTTP-Version) utilizado.
            </Text>
          </Appear>
        )}
        {this.renderSlideTituloLista("Cabeçalho da mensagem", [
          "O cabeçalho da mensagem (header) é utilizado para transmitir informações adicionais entre o cliente e o servidor",
          "Ele é especificado imediatamente após a linha inicial da transação (método), tanto para a requisição do cliente quanto para a resposta do servidor, seguido de dois pontos (:) e um valor",
          "Existem quatro tipos de cabeçalhos que poderão ser incluídos na mensagem os quais são: general-header, request-header, response-header e entity-header",
        ])}
        {this.renderSlideTituloLista("Corpo da mensagem", [
          "Uma mensagem HTTP pode conter um corpo de dados que são enviados abaixo das linhas de cabeçalho. Em uma mensagem de resposta, o corpo da mensagem é o recurso que foi requisitado pelo cliente, ou ainda uma mensagem de erro, caso este recurso não seja possível. Já em uma mensagem de requisição, o corpo pode conter dados que serão enviados diretamente pelo usuário ou um arquivo que será enviado para o servidor.",
          "Quando uma mensagem HTTP tiver um corpo, poderão ser incluídos cabeçalhos de entidades que descrevem suas características, como por exemplo, o Content-Type que informa o tipo MIME dos dados no corpo da mensagem e o Content-Length que informa a quantidade de bytes que o corpo da mensagem contém.",
        ])}
        {this.renderSlideTituloLista(
          "Corpo da mensagem",
          [
            "text/plain → Arquivo no formato texto (ASCII)",
            "text/html → Arquivo no formato HTML",
            "image/gif|jpeg|png → Arquivos de Imagem",
            "application/json → retorno no formato JSON",
            "application/xml → retorno no formato XML",
          ],
          <Text textAlign="left" textSize={24} margin="26px auto 36px">
            Alguns tipos MIME
          </Text>
        )}
        <Slide bgImage={images.bg} bgPosition="top left">
          <HeadingTitle textAlign="center" size={6} margin="0 auto 26px">
            Exemplo de Cabeçalho (c/ corpo)
          </HeadingTitle>
          <CodePane
            lang="html"
            source={[
              "HTTP/1.1 200 OK",
              "Date: Mon, 23 May 2005 22:38:34 GMT",
              "Server: Apache/1.3.27 (Unix)",
              "Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT",
              "Content-Type: text/html; charset=UTF-8",
              "",
              "<html><body>Olá</body></html>",
            ].join("\n")}
            margin="20px auto"
            overflow="overflow"
          />
        </Slide>
        {this.renderSlideTituloLista("Métodos de solicitação", [
          "O protocolo HTTP define oito métodos (GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS e CONNECT) que indicam a ação a ser realizada no recurso especificado. Uma solicitação HTTP(S), ou HTTP Request é uma maneira do navegador mostrar uma página da internet utilizando um dos oito métodos de solicitação do protocolo HTTP.",
        ])}
        {this.renderSlideTituloLista(
          "GET",
          [
            "O método GET requisita uma representação do recurso especificado",
            "Requisições usando GET devem apenas recuperar dados e não devem ter qualquer outro efeito",
          ],
          null,
          <div>
            <Appear>
              <div>
                <Text textAlign="left" textSize={21} margin="28px auto 12px">
                  Pedido
                </Text>
                <CodePane
                  lang="html"
                  source={["GET /index.html HTTP/1.1", "Host: www.exemplo.com"].join("\n")}
                  margin="20px auto"
                  overflow="overflow"
                />
              </div>
            </Appear>
            <Appear>
              <div>
                <Text textAlign="left" textSize={21} margin="28px auto 12px">
                  Resposta
                </Text>
                <CodePane
                  lang="html"
                  source={[
                    "HTTP/1.1 200 OK",
                    "Date: Mon, 23 May 2005 22:38:34 GMT",
                    "Server: Apache/1.3.27 (Unix)",
                    "Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT",
                    "Content-Type: text/html; charset=UTF-8",
                    "",
                    "<html>....",
                  ].join("\n")}
                  margin="20px auto"
                  overflow="overflow"
                />
              </div>
            </Appear>
          </div>
        )}
        {this.renderSlideTituloLista(
          "POST",
          [
            "Envia dados para serem processados (por exemplo, dados de um formulário HTML) para o recurso especificado",
            "Os dados são incluídos no corpo do comando",
            "Sua utilização em uma requisição ocorre quando é necessário enviar dados ao servidor para serem processados",
          ],
          null,
          <div>
            <Appear>
              <div>
                <Text textAlign="left" textSize={21} margin="28px auto 12px">
                  Pedido
                </Text>
                <CodePane
                  lang="html"
                  source={[
                    "POST /index.html HTTP/1.0",
                    "Content-Type: application/x-www-form-urlencoded",
                    "Content-Length: 41",
                    "",
                    "Nome=NomePessoa&Idade=99&Curso=Computacao",
                  ].join("\n")}
                  margin="20px auto"
                  overflow="overflow"
                />
              </div>
            </Appear>
          </div>
        )}
        {this.renderSlideTituloLista("PUT", [
          "O método PUT envia os dados de forma semelhante ao POST, através do corpo do HTTP",
          "Diferença entre os 2 métodos é semântica",
          "Caso você necessite atualizar os dados de um usuário ou objeto, utilize o método PUT",
        ])}
        {this.renderSlideTituloLista("Outros métodos", [
          "HEAD → Variação do GET em que nada é retornado",
          "DELETE → Exclui o recurso",
          "OPTIONS → Recupera os métodos HTTP que o servidor aceita",
        ])}
        {this.renderSlideTituloLista(
          "Códigos de retorno",
          [
            "2xx: Success → indica que a requisição do cliente foi bem sucedida",
            "3xx: Redirection → informa a ação adicional que deve ser tomada para completar a requisição",
            "4xx: Client Error → avisa que o cliente fez uma requisição que não pode ser atendida",
            "5xx: Server Error → ocorreu um erro no servidor ao cumprir uma requisição válida",
          ],
          <Appear>
            <div>
              <Text textAlign="left" textSize={21} margin="28px auto 12px">
                A linha inicial de uma resposta HTTP indica ao cliente se sua requisição foi bem sucedida ou não.
              </Text>
              <CodePane
                lang="html"
                source={["HTTP/1.1 200 OK", "Date: Mon, 23 May 2005 22:38:34 GMT", "..."].join("\n")}
                margin="20px auto"
                overflow="overflow"
              />
            </div>
          </Appear>
        )}
        {this.renderSlideTitulo("No mundo real...")}
        {this.renderSlideTitulo("INTRODUÇÃO AO REST")}
        {this.renderSlideTituloLista("Web service", [
          "É uma solução utilizada na integração de sistemas e na comunicação entre aplicações diferentes",
          "Os Web Services são componentes que permitem às aplicações enviar e receber dados",
          'Cada aplicação pode ter a sua própria "linguagem", que é traduzida para uma linguagem universal como XML, JSON, CSV e etc',
          "Faz com que os recursos da aplicação do software estejam disponíveis sobre a rede de forma normalizada",
        ])}
        {this.renderSlideTituloLista("O que é REST?", [
          "Representational State Transfer (REST), ou Transferência de Estado Representacional",
          "Estilo de arquitetura que define um conjunto de restrições e propriedades baseados em HTTP(S)",
          'RESTful é uma implementação de um "web service" simples utilizando o HTTP e os principios REST',
          "Sendo assim, Web Services que obedecem ao estilo arquitetural REST, ou web services RESTful",
          "Interoperabilidade entre sistemas de computadores na Internet",
          "Requisições feitas a um URI de recurso extrairá uma resposta que pode estar em JSON, XML, HTML ou algum outro formato",
          "Quando o HTTP é usado, como é mais comum, as operações disponíveis são GET, POST, PUT, DELETE",
        ])}
        {this.renderSlideTitulo("Premissas Básicas do REST")}
        {this.renderSlideTituloLista("Client-Server", [
          "O cliente (consumidor do serviço) não se preocupa com tarefas do tipo: comunicação com banco de dados, gerenciamento de cache, log e etc",
          "E o servidor (provedor do serviço) não se preocupa com tarefas como: interface, experiência do usuário e etc",
        ])}
        {this.renderSlideTituloLista("Stateless", [
          "Um mesmo cliente pode mandar várias requisições para o servidor, porém, cada uma delas devem ser independentes, ou seja, toda requisição deve conter todas as informações necessárias para que o servidor consiga entendê-la e processá-la adequatamente",
          "O servidor não deve guardar nenhuma informação a respeito do estado do cliente",
        ])}
        {this.renderSlideTituloLista("Uniform Interface", [
          "É, basicamente, um contrato para comunicação entre clientes e servidor. São pequenas regras para deixar um componente o mais genérico possível, o tornando muito mais fácil de ser refatorado e melhorado.",
        ])}
        {this.renderSlideTitulo("DEMO TIME!")}
      </Deck>
    );
  }
}
