import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
`;

export const InputForm = () => {
  type productFormProps = {
    title: string;
    volume: number | null;
    price: number | null;
    unitPrice: number | null;
  };

  useEffect(() => {
    const data: productFormProps[] = [
      {
        title: "Product1",
        volume: null,
        price: null,
        unitPrice: null,
      },
      {
        title: "Product2",
        volume: null,
        price: null,
        unitPrice: null,
      },
    ];
    setItems(data);
  }, []);

  const [items, setItems] = useState<productFormProps[]>([]);
  const calculateUnitPrice = (volume: number | null, price: number | null) => {
    if (volume === null || price === null || volume === 0) {
      return null; // You can choose to return null or any other default value
    }
    // 少数第二位まで表示
    return Math.round((price / volume) * 100) / 100;
  };

  const handleAddButtonClick = () => {
    const newItem = {
      title: `Product${items.length + 1}`,
      volume: null,
      price: null,
      unitPrice: null,
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
    newItems[index].unitPrice = calculateUnitPrice(
      newItems[index].volume,
      newItems[index].price
    );
  };

  const handlePriceChange = (index: number, value: number) => {
    const newItems = [...items];
    newItems[index].price = value;
    setItems(newItems);

    if (
      newItems[index].volume !== null &&
      newItems[index].volume !== undefined
    ) {
      newItems[index].unitPrice = calculateUnitPrice(
        newItems[index].volume,
        newItems[index].price
      );
    }
  };

  console.log(items);

  return (
    <>
      <tr>
        <Td>Title</Td>
        <Td>Volume</Td>
        <Td>Price</Td>
        <Td>Unit Price</Td>
      </tr>
      {items.map((item: productFormProps, index: number) => {
        return (
          <tr>
            <Td key={index}>
              <Input
                type="text"
                placeholder="title"
                value={item.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
              />
            </Td>
            <Td key={index}>
              <Input
                type="number"
                placeholder="volume"
                value={item.volume !== null ? item.volume : ""}
                onChange={(e) =>
                  handleVolumeChange(index, parseInt(e.target.value))
                }
              />
            </Td>
            <Td key={index}>
              <Input
                type="number"
                placeholder="price"
                value={item.price !== null ? item.price : ""}
                onChange={(e) =>
                  handlePriceChange(index, parseInt(e.target.value))
                }
              />
            </Td>
            <Td key={index}>
              <Input
                type="number"
                placeholder="unitPrice"
                value={item.unitPrice !== null ? item.unitPrice : ""}
              />
            </Td>
          </tr>
        );
      })}
      <button type="button" onClick={() => handleAddButtonClick()}></button>
    </>
  );
};
