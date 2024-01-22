import React, { useState } from "react";

export const InputForm = () => {
  type productFormProps = {
    title: string;
    volume: number;
    price: number;
    unitPrice: number;
  };

  const [items, setItems] = useState<productFormProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  const handleAddButtonClick = () => {
    const newItem = {
      title: title,
      volume: volume,
      price: price,
      unitPrice: unitPrice,
    };
    setItems([...items, newItem]);
  };

  const handleTitleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].title = value;
    setItems(newItems);
  };

  const handleVolumeChange = (index: number, value: number) => {
    const newItems = [...items];
    newItems[index].volume = value;
    setItems(newItems);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newItems = [...items];
    newItems[index].price = value;
    setItems(newItems);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="volume"
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="price"
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="unitPrice"
          onChange={(e) => setUnitPrice(parseInt(e.target.value))}
        />
        <button type="button" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>
      {items.map((item: productFormProps, index: number) => {
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="title"
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />
            <input
              type="number"
              placeholder="volume"
              value={item.volume}
              onChange={(e) =>
                handleVolumeChange(index, parseInt(e.target.value))
              }
            />
            <input
              type="number"
              placeholder="price"
              value={item.price}
              onChange={(e) =>
                handlePriceChange(index, parseInt(e.target.value))
              }
            />
            <input
              type="number"
              placeholder="unitPrice"
              value={item.unitPrice}
              onChange={(e) => setUnitPrice(parseInt(e.target.value))}
            />
          </div>
        );
      })}
    </>
  );
};
