import {
    BlockNoteEditor,
    filterSuggestionItems,
    PartialBlock,
  } from '@blocknote/core';
  import '@blocknote/core/fonts/inter.css';
  import {
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
    useCreateBlockNote,
  } from '@blocknote/react';
  import { BlockNoteView } from '@blocknote/mantine';
  import '@blocknote/mantine/style.css';
  import { HiOutlineGlobeAlt } from 'react-icons/hi';
  
  const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
    title: 'Insert Hello World',
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
  
      const helloWorldBlock: PartialBlock = {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
      };
  
      editor.insertBlocks([helloWorldBlock], currentBlock, 'after');
    },
    aliases: ['helloworld', 'hw'],
    group: 'Other',
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a block with 'Hello World' below.",
  });
  
  const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor),
    insertHelloWorldItem(editor),
  ];
  
  export default function Editor() {
    const editor = useCreateBlockNote({
      initialContent: [
        {
          type: 'paragraph',
          content: 'Welcome to this demo!',
        },
      ],
    });
  
    return (
      <BlockNoteView editor={editor} slashMenu={false} className="w-full h-screen mt-8">
        <SuggestionMenuController
          triggerCharacter={'/'}
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }

        />
      </BlockNoteView>
    );
  }
  