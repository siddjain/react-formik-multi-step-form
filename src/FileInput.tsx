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

import React, { useState } from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  TooltipProps,
  Table,
  Form,
  CloseButton
} from "react-bootstrap";

export interface FileInputProps {
  onChange?: (files: Array<File>) => void;
  maxFileSize?: number;
  value?: Array<File>;
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
  accept?: string;
  maxFileCount?: number;
}

const SYMBOLS = {
    UP_ARROW: String.fromCharCode(8593),
    DOWN_ARROW: String.fromCharCode(8595),    
    WARNING: String.fromCharCode(9888)
}

const FileInput: React.FunctionComponent<FileInputProps> = ({
  onChange,
  maxFileSize,
  value,
  accept,
  maxFileCount
}) => {
  // the list of files to be uploaded
  const [list, setList] = useState(value || []);

  const rerender = () => {
    setList(list.slice());
    onChange && onChange(list);
  };

  const handleUp = (e: any, i: number) => {
    const temp = list[i];
    list[i] = list[i - 1];
    list[i - 1] = temp;
    rerender();
  };

  const handleDown = (e: any, i: number) => {
    const temp = list[i];
    list[i] = list[i + 1];
    list[i + 1] = temp;
    rerender();
  };

  const handleDelete = (e: any, i: number) => {
    list.splice(i, 1);
    rerender();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files: FileList | null = e.currentTarget.files;
    if (files) {
      for (var i = 0; i < files.length; i++) {
        list.push(files[i]);
      }
      rerender();
    }
  };

  const renderTooltip = (
    props: JSX.IntrinsicAttributes &
      TooltipProps &
      React.RefAttributes<HTMLDivElement>
  ) => <Tooltip {...props}>File exceeds maximum allowable size</Tooltip>;

  const validate = (file: File) => {    
    if (maxFileSize && maxFileSize > 0 && file.size > maxFileSize) {
      return (
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <span>{SYMBOLS.WARNING}</span>
        </OverlayTrigger>
      );
    }
  };

  const getTableBodyAsReactElement = () => {
    if (list) {
      return (
        <Table bordered striped hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => {
              // the keys are there to take care of react warning otherwise
              return (
                <tr key={i}>
                  <td key={i + ":#"}>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.type}</td>
                  <td>
                    {i > 0 ? (
                      <Button
                        key={i + ":up"}
                        variant="light"
                        onClick={(e) => handleUp(e, i)}
                      >
                        {SYMBOLS.UP_ARROW}
                      </Button>
                    ) : null}
                    {i < list.length - 1 ? (
                      <Button
                        key={i + ":down"}
                        variant="light"
                        onClick={(e) => handleDown(e, i)}
                      >
                        {SYMBOLS.DOWN_ARROW}
                      </Button>
                    ) : null}
                    <CloseButton
                      key={i + ":del"}                      
                      onClick={(e) => handleDelete(e, i)}
                    >                      
                    </CloseButton>
                    {validate(item)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  };

  const renderFileInput = () => {
    if (!(maxFileCount > 0) || list.length < maxFileCount) {
      return (
        <Form.Control type="file" onChange={handleOnChange} accept={accept} />
      );
    }
  };

  // the render method should render the list of files
  // and display a button to choose more files
  return (
    <>
      {getTableBodyAsReactElement()}
      {renderFileInput()}
    </>
  );
};

export default FileInput;