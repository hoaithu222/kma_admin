declare module "react-quill" {
  import React from "react";

  interface ReactQuillProps {
    value?: string;
    onChange?: (value: string, delta?: any, source?: any, editor?: any) => void;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    modules?: any;
    formats?: string[];
    readOnly?: boolean;
    theme?: string;
    bounds?: string | HTMLElement;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
    tabIndex?: number;
    onFocus?: (range: any, source: any, editor: any) => void;
    onBlur?: (previousRange: any, source: any, editor: any) => void;
    onKeyPress?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
  }

  class ReactQuill extends React.Component<ReactQuillProps> {
    getEditor(): any;
    getContents(): any;
    getText(): string;
    getLength(): number;
    getSelection(): any;
    setContents(contents: any): any;
    setText(text: string): any;
    updateContents(delta: any): any;
    setSelection(range: any): any;
    focus(): void;
    blur(): void;
    hasFocus(): boolean;
    enable(enabled?: boolean): void;
    disable(): void;
    isEnabled(): boolean;
  }

  export default ReactQuill;
}

declare module "quill-emoji";
declare module "quill-image-resize-module";
