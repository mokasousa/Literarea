# Literárea

## O projeto

O objetivo desse projeto era criar um Produto Mínimo Viável (_MVP_) de uma aplicação móvel para ser testado por usuários interessados por leitura. A idéia surgiu a partir da realização da dificuldade em adquirir novos livros a baixo custo e encontrar pessoas para trocar/doar livros parados na estante. Com esse aplicativo o usuário poderá encontrar outras pessoas nas proximidades que queiram doar e trocar livros e verificar quais os livros que elas desejam para estimular a troca/doação.

## Planejamento e desenvolvimento

### Design Sprint

1. Em equipe primeiramente mapeamos alguns desafios na área de entreterimento e identificamos na leitura alguns problemas que buscamos entender melhor levantando algumas hipóteses e fazendo pesquisas utilizando formulários para entender a dor do usuário. 

2. Definimos as dores dos usuários que queríamos solucionar, validamos as soluções e fizemos o benchmarking para definir o valor e diferencial do produto
  - Dores: dificuldade em encontrar novos títulos a baixo custo, tempo de demora de entrega do livro e valor frete para troca e doação de livros online, dificuldade em encontrar títulos específicos em sebos, dificuldade em repassar os livros que não desejam mais.
  - Soluções: facilitar a conexão entre pessoas com livros disponíveis nas proximidades, facilitar o encontro para realizar as trocas pessoalmente, facilitar a busca por novos títulos, facilitar a inserção dos títulos no perfil do usuário.

3. Definimos as personas, fizemos os mapas de afinidade e a jornada do usuário para entender como seria o produto final e quais funcionalidades implementar.

4. Fizemos o protótipo do produto final utilizando [Figma](https://www.figma.com) e, através dos testes de usuário, fizemos ajustes no desenho. O protótipo que pode ser visualizado [aqui](https://marvelapp.com/1jfb6egg/screen/638667066).

5. Fizemos o planejamento utilizando o [Trello](https://trello.com/) para o desenvolvimento do _MVP_ com foco _mobile first_ pensando na jornada do usuário e nas funcionalidades essenciais para a utilização do aplicativo.

### Desenvolvimento

Foi definido que neste _MVP_ que usuário deveria ser capaz de:

* Criar uma conta e definir uma localização pessoal para troca dos livros;
* Buscar e adicionar à sua lista os títulos que possui e deseja doar ou trocar e os títulos que não tem e deseja adquirir;
* Vizualizar no mapa outros usuários nas proximidades que podem ter livros de interesse para troca/doação;
* Visualizar quais livros os outros usuários das proximidades adicionaram à suas listas de desejados e disponíveis;
* Enviar uma mensagem para outros usuários para combinar a troca/doação.

Para adicionar essas funcionalidades ao aplicativo utilizamos: 

* [Firebase Realtime Database](https://firebase.google.com/docs/database/?gclid=CjwKCAiA66_xBRBhEiwAhrMuLUnf6KO8JoEFEdsrB3I8AfUqviJw4flXFgJx7FF-i4x9L4_AqMxiChoC-dkQAvD_BwE) como banco de dados para guardar as listas de livros e localizações correspondentes de cada usuário;
* [Google Books API](https://developers.google.com/books) para facilitar a busca, visualização e adição dos títulos às listas de livros;
* Here API(https://developer.here.com/) para inserir o mapa e exibir os marcadores dos usuários cadastrados. 

## Considerações finais

Esse projeto foi desenvolvido como parte do currículo do [Bootcamp da Laboratória Brasil](https://www.laboratoria.la/br) e foi criado e desenvolvido por:

* [Anannda Rios](https://github.com/ananndarios)
* [Carol Rosatto](https://github.com/carolrosatto)
* [Claudia Saito](https://github.com/claudiakemi)
* [Elaine Shimabukuro](https://github.com/elaineshimabukuro)
* [Jackeline Mattar](https://github.com/jackmattar)
* [Mônica Sousa](https://github.com/mokasousa)

