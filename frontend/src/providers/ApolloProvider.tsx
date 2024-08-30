import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@clerk/clerk-react";
import { PropsWithChildren, useMemo } from "react";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {
      const token = await getToken({ template: "default-token" });

      const clientHeaders = {
        ...headers,
      };

      if (token) {
        clientHeaders.authorization = `Bearer ${token}`;
      }

      return {
        headers: clientHeaders,
      };
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
