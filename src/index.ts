import * as fs from "fs-extra";
import * as path from "path"; // Tslint:disable-next-line: no-submodule-imports
import { generateTheme, IColorSet } from "@moxer/vscode-theme-generator";
import riderDark from "./themes/rider-dark";
import riderMelonDark from "./themes/rider-melon-dark";
import riderLight from "./themes/rider-light";
import riderMelonLight from "./themes/rider-melon-light";

const buildPath: string = path.join(__dirname, "../build");
const themes = [riderDark, riderLight, riderMelonDark, riderMelonLight];

// Check if the build folder exist. If not, create it.
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

themes.forEach(theme => {
  const isLight = theme.name.includes("light");

  let colorSet: IColorSet;

  colorSet = {
    semanticHighlighting: true,

    base: {
      // Determines the overall text foreground color
      foreground: theme.editor.foreground,
      // Determines the overall background color
      background: theme.editor.background,
      // Determines boolean, identifier, keyword, storage, and cssClass
      color1: theme.colors.keyword,
      // Determines string, stringEscape, and cssId
      color2: theme.colors.string,
      // Determines function, class, classMember, type, and cssTag
      color3: theme.colors.function,
      // Determines functionCall and number
      color4: theme.colors.functionCall,
    },

    syntax: {
      comment: theme.colors.comment,
      class: theme.colors.class,
      function: theme.colors.function,
      functionCall: theme.colors.functionCall,
      identifier: theme.colors.identifier,
      boolean: theme.colors.boolean,
      keyword: theme.colors.keyword,
      otherKeyword: theme.colors.otherKeyword,
      string: theme.colors.string,
      stringEscape: theme.colors.stringEscape,
      punctuation: theme.colors.punctuation,
      variable: theme.colors.variable,
      number: theme.colors.number,
      modifier: theme.colors.modifier,
    },

    workbench: {
      "editorError.foreground": theme.editor.error,
      "editorWarning.foreground": theme.editor.warning,
      "activityBar.foreground": isLight ? "#202020" : "#D0D0D0",
      "activityBar.border": isLight ? "#D0D0D0" : "#353535",
      "editorLineNumber.foreground": isLight ? "#202020" : "#D0D0D0",
      "sideBar.border": isLight ? "#D0D0D0" : "#2d2d2d",
      "statusBar.foreground": isLight ? "#2d2d2d" : theme.editor.foreground,
      "editorGroupHeader.tabsBorder": isLight ? "#D0D0D0" : "#2d2d2d",
    },

    customTokens: [
      {
        name: "string quotes",
        scope: "punctuation.definition.string",
        settings: {
          foreground: theme.colors.string,
        },
      },
      {
        name: "JSX, HTML Tags",
        scope: [
          "meta.tag",
          "entity.name.tag",
          "support.class.component",
          "punctuation.definition.tag.begin",
          "punctuation.definition.tag.end",
          "entity.name.type", // TS Types
        ],
        settings: {
          foreground: theme.colors.class,
        },
      },
      {
        name: "JSX, HTML attribute names",
        scope: ["entity.other.attribute-name.tsx", "meta.tag.attributes.tsx"],
        settings: {
          foreground: theme.colors.comment,
        },
      },
      {
        name: "C# namespaces",
        scope: [
          "entity.name.type.namespace.cs",
          "entity.name.type.interface",
        ],
        settings: {
          foreground: theme.colors.class,
        },
      },
      {
        name: "Properties and fields",
        scope: [
          "variable.other.property",
          "entity.name.variable.field",
          "meta.object-literal.key",
        ],
        settings: {
          foreground: theme.colors.property,
        },
      },
      {
        name: "Constants",
        scope: ["variable.other.constant"],
        settings: {
          foreground: theme.colors.constants,
          fontStyle: "",
        },
      },
      {
        name: "Variables",
        scope: [
          "entity.name.variable",
          "entity.other.attribute-name",
        ],
        settings: {
          foreground: theme.colors.variable,
        },
      },
      {
        name: "Operators",
        scope: [
          "keyword.operator",
        ],
        settings: {
          foreground: theme.colors.punctuation,
        }
      },
      {
        name: "C# doc comment tags and attribute names",
        scope: [
          "comment.documentation.name",
          "comment.documentation.attribute.name",
        ],
        settings: {
          foreground: "#487D34",
        },
      },
      {
        name: "C# doc comment tags and attribute names",
        scope: ["comment.documentation.attribute.value"],
        settings: {
          foreground: theme.colors.comment,
        },
      },
    ],
  };

  generateTheme(
    theme.name,
    colorSet,
    path.join(__dirname, `../build/${theme.name}.json`),
  );

  return;
});
