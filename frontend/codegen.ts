import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
