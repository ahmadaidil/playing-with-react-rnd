import React from "react";
import { render } from "react-dom";
import CursorPosition from "react-cursor-position";
import shortid from "shortid";

import Canvas from "./canvas";

const newItem = ({ x, y }) => ({
  id: shortid.generate(),
  width: 200,
  height: 200,
  x,
  y,
  text: "new item"
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        {
          id: 0,
          width: 200,
          height: 200,
          x: 10,
          y: 10,
          text: "hehe"
        },
        {
          id: 1,
          width: 200,
          height: 200,
          x: 50,
          y: 50,
          text: "hoho"
        }
      ],
      selectedItemId: null,
      cursorPositionActive: false
    };
  }

  enableNewItem = () => {
    this.setState({
      cursorPositionActive: true
    });
  };

  addNewItem = position => {
    this.setState(prevState => {
      if (prevState.cursorPositionActive) {
        const items = prevState.items;
        const item = newItem(position);
        items.push(item);
        return {
          ...prevState,
          items,
          cursorPositionActive: false,
          selectedItemId: item.id
        };
      }
      return { ...prevState, selectedItemId: null };
    });
  };

  updateItems = (items, id) =>
    this.setState({
      items,
      selectedItemId: id
    });

  setSelectedItem = selectedItemId =>
    this.setState({ selectedItemId, cursorPositionActive: false });

  render() {
    const canvasProps = {
      ...this.state,
      addNewItem: this.addNewItem,
      updateItems: this.updateItems,
      setSelectedItem: this.setSelectedItem
    };
    return (
      <div>
        <button onClick={this.enableNewItem}>Add Item</button>
        <CursorPosition
          isEnabled={this.state.cursorPositionActive}
          mapChildProps={({ position }) => ({ point: position })}
        >
          <Canvas {...canvasProps} />
        </CursorPosition>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
