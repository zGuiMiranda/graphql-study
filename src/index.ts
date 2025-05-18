const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Servidor GraphQL rodando em http://localhost:3000/graphql");
});
