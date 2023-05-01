
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const verifyToken = require('./utils/verifyToken');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contextfun = async (req) => {
    const token = (req.headers && req.headers.authorization) || '';
    const user = await verifyToken(token);
    return { user };
}
app.use(
    '/graphql',
    graphqlHTTP((req) => {
        return {
            schema,
            rootValue: resolvers,
            graphiql: {
                headerEditorEnabled: true
            },
            context: () => contextfun(req)
        }
    }),
);


app.listen(3000, () => console.log('Server started'));
