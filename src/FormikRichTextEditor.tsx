/**
  MIT License

  Copyright (c) Siddharth Jain.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */

/*
  Issues:
   - https://github.com/jpuri/react-draft-wysiwyg/issues/1221 - hopefully its just a warning and does not impact expected functional behavior. 
     Note that this warning is not a result of our code. It comes from within react-draft-wysiwyg
 */
     import { useFormikContext, useField } from "formik";
     import React, { useState } from "react";
     import { Editor, EditorProps } from "react-draft-wysiwyg";
     import { EditorState } from "draft-js";
     import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
     import styled from "styled-components";
     import * as _ from "lodash";
     
     export interface FormikFormikRichTextEditorProps extends EditorProps {
       name: string;
     }
     
     const EditorStyled = styled.div`
       background-color: var(--color-white);
     
       .rdw-editor-toolbar {
         display: flex;
         flex-direction: row;
         border: 2px solid var(--color-gray-300);
         margin: 0;
         padding: 0;
     
         .rdw-inline-wrapper,
         .rdw-text-align-wrapper,
         .rdw-block-wrapper,
         .rdw-list-wrapper {
           display: flex;
           flex-direction: row;
           margin: 0;
         }
     
         .rdw-option-wrapper,
         .rdw-dropdown-wrapper {
           padding: 20px 15px;
           width: auto;
           line-height: 1rem;
           cursor: pointer;
           margin: 0;
           border: 0;
           box-shadow: none;
     
           &.rdw-option-active {
             border: 0;
             background-color: var(--color-gray-100);
           }
         }
     
         .rdw-dropdown-wrapper {
           padding: 20px 0;
           width: auto;
           line-height: 1rem;
           cursor: pointer;
           margin: 0;
           border: 0;
           box-shadow: none;
     
           .rdw-dropdown-selectedtext {
             padding: 0 15px;
           }
         }
       }
     
       .rdw-editor-main {
         resize: vertical;
         width: 100%;
         height: 600px;
         overflow: auto;
         border: 2px solid var(--color-gray-300);
         border-top-width: 0;
         padding: 1rem 0.875rem;
     
         * {
           height: 100%;
         }
       }
     
       .public-DraftEditorPlaceholder-root {
         color: var(--color-gray-600);
       }
     `;
     
     export const FormikRichTextEditor: React.FunctionComponent<FormikFormikRichTextEditorProps> = (
       props: FormikFormikRichTextEditorProps
     ) => {
       const [field] = useField(props.name);
       const { setFieldValue } = useFormikContext();
       /*
         https://draftjs.org/docs/api-reference-content-state:
         ContentState is an Immutable Record that represents the full state of:
     
         - The entire contents of an editor: text, block and inline styles, and entity ranges.
         - Two selection states of an editor: before and after the rendering of these contents.
         The most common use for the ContentState object is via EditorState.getCurrentContent(), which provides the ContentState currently being rendered in the editor.
     
         An EditorState object maintains undo and redo stacks comprised of ContentState objects.
     
         To create editor state from the content saved in DB use (refer https://stackoverflow.com/a/61654955/147530):
         const contentState = convertFromRaw(content); // content is the content in DB
         const editorState = EditorState.createWithContent(contentState);
     
         To save the content in DB use:
         convertToRaw(editorState.getCurrentContent())
          */
       // https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
       const [editorState, setEditorState] = useState(
         field.value || EditorState.createEmpty()
       );
     
       const onEditorStateChange = (editorState: EditorState) => {
         if (editorState) {
           // will trigger render pass so you see what you are typing
           setEditorState(editorState);
           /* set formik field value - this is how the state is persisted and not lost when you navigate back or next in the multi-step form. get this error
                  Formik.tsx:600 Uncaught TypeError: Cannot read properties of undefined (reading 'type')
                 at Formik.tsx:600:1
                 at Formik.tsx:653:1
                 at Formik.tsx:1200:1
                 at react-draft-wysiwyg.js:7:1
                 but luckily it still works
                 */
           setFieldValue(props.name, editorState);
         } else {
           console.log("editor state is empty");
         }
       };
     
       return (
         <EditorStyled>
           <Editor
             {..._.omit(field, "onBlur")}
             {...props}
             editorState={editorState}
             wrapperClassName="demo-wrapper"
             editorClassName="demo-editor"
             onEditorStateChange={onEditorStateChange}
           />
         </EditorStyled>
       );
     };
     
     
     