import React from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

const style = {
  border: "solid 1px #fff",
  background: "#fff"
};

const styleSelected = {
  borderWidth: "1.5px",
  borderColor: "rrr",
  borderStyle: "dashed",
  background: "#fff"
};

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
      selectedItemId: null
    };
  }

  render() {
    return (
      <div>
        <div
          style={{ height: "700px", backgroundColor: "#eee" }}
          onClick={() => this.setState({ selectedItemId: null })}
        />
        {this.state.items.map((item, index) => (
          <Rnd
            key={item.id}
            style={
              this.state.selectedItemId === item.id ? styleSelected : style
            }
            size={{ width: item.width, height: item.height }}
            default={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => {
              const newItem = this.state.items;
              newItem[index].x = d.x;
              newItem[index].y = d.y;
              this.setState({ items: newItem });
            }}
            onResize={(e, dir, ref, delta, pos) => {
              const newItem = this.state.items;
              newItem[index].width = ref.style.width;
              newItem[index].height = ref.style.height;
              this.setState({ items: newItem });
            }}
            bounds="parent"
          >
            <div
              style={{
                background: "transparent",
                height: item.height,
                width: item.width
              }}
              onClick={() => this.setState({ selectedItemId: item.id })}
            >
              {item.text}
            </div>
          </Rnd>
        ))}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
