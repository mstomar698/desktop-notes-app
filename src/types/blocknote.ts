import {  Theme } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { HTMLAttributes } from "react";

export type BlockNoteViewProps = {
    editor: BlockNoteEditor;
    editable?: boolean;
    onSelectionChange?: () => void;
    onChange?: () => void;
    theme?:
      | "light"
      | "dark"
      | Theme
      | {
          light: Theme;
          dark: Theme;
        };
    formattingToolbar?: boolean;
    linkToolbar?: boolean;
    sideMenu?: boolean;
    slashMenu?: boolean;
    emojiPicker?: boolean;
    filePanel?: boolean;
    tableHandles?: boolean;
  } & HTMLAttributes<HTMLDivElement>;