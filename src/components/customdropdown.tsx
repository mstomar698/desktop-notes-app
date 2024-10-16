import {
  Block,
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
import { useEffect, useState } from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';

// Custom suggestion item for the [[ trigger
const insertNode = (editor: BlockNoteEditor) => ({
  title: 'Add A new Node',
  onItemClick: () => {
    const currentBlock = editor.getTextCursorPosition().block;

    const newNodeBlock: PartialBlock = {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'New Node created!',
          styles: { bold: true, textColor: 'green' },
        },
      ],
    };

    editor.insertBlocks([newNodeBlock], currentBlock, 'after');
  },
  aliases: ['node', 'nd'],
  group: 'Manual Commands',
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: 'Used to insert a block with a new node below.',
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertNode(editor),
];

export default function BEC() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showCustomMenu, setShowCustomMenu] = useState(false); // Show/hide custom [[ dropdown
  const [customQuery, setCustomQuery] = useState('');

  const editor = useCreateBlockNote({});

  useEffect(() => {
    const handleContentChange = () => {
      const textCursorPosition = editor.getTextCursorPosition();
      const currentText =
        textCursorPosition.block?.content
          .map((content) => content.text)
          .join('') || '';

      console.log(currentText, 'The text inputted');
      if (currentText.endsWith('[[')) {
        setShowCustomMenu(true);
        setCustomQuery('');
      } else {
        setShowCustomMenu(false);
      }

      setBlocks(editor.document);
    };

    editor.onChange(handleContentChange);

    return () => {
      editor.onChange(handleContentChange);
    };
  }, [editor]);

  return (
    <div className={'wrapper'}>
      <div>BlockNote With Logger Editor, with manual trigger / and [[:</div>
      <div className={'item'}>
        <BlockNoteView
          editor={editor}
          slashMenu={false}
          className="w-full h-full my-4 min-h-[150px]"
        >
          <SuggestionMenuController
            triggerCharacter={'/'}
            getItems={async (query) =>
              filterSuggestionItems(getCustomSlashMenuItems(editor), query)
            }
          />

          {showCustomMenu && (
            <div className="absolute bg-white border text-black border-gray-300 shadow-lg z-10">
              <div
                onClick={() => {
                  insertNode(editor).onItemClick();
                  setShowCustomMenu(false);
                }}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                Add A new Node
              </div>
            </div>
          )}
        </BlockNoteView>
      </div>
    </div>
  );
}
