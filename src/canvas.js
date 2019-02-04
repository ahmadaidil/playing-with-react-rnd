import React, { Fragment } from "react";
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

export default ({
  items,
  point,
  selectedItemId,
  addNewItem,
  updateItems,
  setSelectedItem
}) => (
  <Fragment>
    <div
      style={{ height: "700px", backgroundColor: "#eee" }}
      onClick={() => addNewItem(point)}
    />
    {items.map((item, index) => (
      <Rnd
        key={item.id}
        style={selectedItemId === item.id ? styleSelected : style}
        size={{ width: item.width, height: item.height }}
        default={{ x: item.x, y: item.y }}
        onDragStop={(e, d) => {
          const newItems = items;
          newItems[index].x = d.x;
          newItems[index].y = d.y;
          updateItems(newItems);
        }}
        onResize={(e, dir, ref, delta, pos) => {
          const newItems = items;
          newItems[index].width = ref.style.width;
          newItems[index].height = ref.style.height;
          updateItems(newItems);
        }}
        bounds="parent"
      >
        <div
          style={{
            background: "transparent",
            height: item.height,
            width: item.width
          }}
          onClick={() => setSelectedItem(item.id)}
        >
          {item.text}
        </div>
      </Rnd>
    ))}
  </Fragment>
);
