import React, { useState, useRef } from 'react';

const RichTextEditor = ({ value = '', onChange, placeholder = 'Start writing...' }) => {
  const textAreaRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);

  const insertText = (before, after = '') => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatText = (type) => {
    switch (type) {
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'heading1':
        insertText('# ');
        break;
      case 'heading2':
        insertText('## ');
        break;
      case 'heading3':
        insertText('### ');
        break;
      case 'quote':
        insertText('> ');
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'link':
        insertText('[Link Text](url)');
        break;
      case 'list':
        insertText('- ');
        break;
      case 'orderedList':
        insertText('1. ');
        break;
      default:
        break;
    }
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-3">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 underline">$1</a>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 bg-muted border-b border-border">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('code')}
            title="Code"
          >
            {'</>'}
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('heading1')}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('heading2')}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('heading3')}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists and Quote */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('list')}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('orderedList')}
            title="Numbered List"
          >
            1.
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('quote')}
            title="Quote"
          >
            "
          </button>
        </div>

        {/* Link */}
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium hover:bg-background rounded transition-colors"
            onClick={() => formatText('link')}
            title="Link"
          >
            🔗
          </button>
        </div>

        {/* Preview Toggle */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              isPreview ? 'bg-primary-500 text-white' : 'hover:bg-background'
            }`}
            onClick={() => setIsPreview(!isPreview)}
            title="Preview"
          >
            👁
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[300px]">
        {isPreview ? (
          <div 
            className="p-5 min-h-[300px] prose prose-sm max-w-none bg-background text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        ) : (
          <textarea
            ref={textAreaRef}
            className="w-full min-h-[300px] p-5 border-none outline-none resize-y font-mono text-sm leading-relaxed bg-background text-text-primary placeholder-text-secondary"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows="15"
          />
        )}
      </div>

      {/* Help Text */}
      <div className="px-5 py-3 bg-muted border-t border-border">
        <small className="text-text-secondary">
          Use Markdown syntax: **bold**, *italic*, `code`, # heading, {`>`} quote, - list, [link](url)
        </small>
      </div>
    </div>
  );
};

export default RichTextEditor;
