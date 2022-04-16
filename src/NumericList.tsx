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
import { Button, Table, Form } from "react-bootstrap";

export interface ListProps {
  onChange?: (items: Array<number>) => void;
  value?: [];
  maxListCount?: number;
  header?: string;
  placeholder?: string;
}

const NumericList: React.FunctionComponent<ListProps> = ({
  onChange,
  value,
  maxListCount,
  header = "Values",
  placeholder = "Enter text followed by ENTER..."
}) => {
  const [item, setItem] = React.useState("");
  const [list, setList] = useState(value || []);

  const rerender = () => {
    // see https://stackoverflow.com/a/67354136/147530
    // for why we need to use slice
    setList(list.slice());
    // using the pattern here: https://stackoverflow.com/a/70443467/147530
    // it is the simplest thing to do and it works
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

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!isNaN(+item)) {
        list.push(parseInt(item));
        rerender();
      }
      setItem("");
      event.preventDefault();
    }
  };

  // https://stackoverflow.com/a/49482317/147530
  // this method converts the list into an HTML table
  // for rendering
  const getTableBodyAsReactElement = () => {
    if (list) {
      return (
        <Table bordered striped hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{header}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => {
              // the keys are there to take care of react warning otherwise
              return (
                <tr key={i}>
                  <td key={i + ":#"}>{i + 1}</td>
                  <td>{item}</td>
                  <td>
                    {i > 0 ? (
                      <Button
                        key={i + ":up"}
                        variant="light"
                        onClick={(e) => handleUp(e, i)}
                      >
                        {String.fromCharCode(8593)}
                      </Button>
                    ) : null}
                    {i < list.length - 1 ? (
                      <Button
                        key={i + ":down"}
                        variant="light"
                        onClick={(e) => handleDown(e, i)}
                      >
                        {String.fromCharCode(8595)}
                      </Button>
                    ) : null}
                    <Button
                      key={i + ":del"}
                      variant="light"
                      onClick={(e) => handleDelete(e, i)}
                    >
                      {String.fromCharCode(10006)}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  };

  const renderAddButton = () => {
    if (!(maxListCount > 0) || list.length < maxListCount) {
      // the pattern does not work but I am leaving it in for reference
      return (
        <Form.Control
          type="text"
          pattern="[0-9]{4}"
          value={item}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      );
    }
  };

  // the render method should render the list of files
  // and display a button to choose more files
  return (
    <>
      {getTableBodyAsReactElement()}
      {renderAddButton()}
    </>
  );
};

export default NumericList;
