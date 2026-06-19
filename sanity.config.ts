import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "korea-wellbeing",
  title: "Wellbeing Korea USA — Product Manager",
  basePath: "/studio",
  projectId: "fzlkp2w7",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
