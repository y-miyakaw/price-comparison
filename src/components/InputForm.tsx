import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryPanel = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
`;

const CategoryTable = styled.table`
  width: 95%;
`;

const CategoryTd = styled.td`
  text-align: right;
`;

const ColCategory = styled.col`
  width: 25%;
`;

const ColCategoryInput = styled.col`
  width: 75%;
`;

const CategoryP = styled.p`
  display: inline-block;
  margin-right: 8px;
`;

const CategoryInput = styled.input`
  width: 95%;
  height: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 95%;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
`;

const ColTitle = styled.col`
  width: 25%;
`;
const ColVolume = styled.col`
  width: 25%;
`;
const ColPrice = styled.col`
  width: 25%;
`;
const ColUnitPrice = styled.col`
  width: 25%;
`;

const Input = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
`;

type UnitPricePProps = {
  unitPrice: number;
  cheapest?: boolean;
};

const UnitPriceP = styled.p<UnitPricePProps>`
  display: inline-block;
  color: ${({ unitPrice, cheapest }) =>
    unitPrice === 0 ? "gray" : cheapest ? "red" : "black"};
`;

const ButtonPanel = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
`;

const ButtonPanelTable = styled.table`
  width: 95%;
  border-collapse: collapse;
`;

const AddButton = styled.button`
  width: 30%;
  border: none;
  margin: auto;
  background-color: "green";
  display: block;
`;

const SendButton = styled.button`
  width: 30%;
  border: none;
  margin: auto;
  background-color: "green";
  display: block;
`;

export const InputForm = () => {
  type productFormProps = {
    title: string;
    volume: number | null;
    price: number | null;
    unitPrice: number;
    cheapest: boolean;
  };

  useEffect(() => {
    const data: productFormProps[] = [
      {
        title: "Product1",
        volume: null,
        price: null,
        unitPrice: 0,
        cheapest: false,
      },
      {
        title: "Product2",
        volume: null,
        price: null,
        unitPrice: 0,
        cheapest: false,
      },
    ];
    setItems(data);
  }, []);

  const [category, setCategory] = useState<string>("");
  const [items, setItems] = useState<productFormProps[]>([]);
  const calculateUnitPrice = (volume: number | null, price: number | null) => {
    if (volume === null || price === null || volume === 0) {
      return 0; // You can choose to return null or any other default value
    }
    // 少数第二位まで表示
    return Math.round((price / volume) * 100) / 100;
  };

  const handleAddButtonClick = () => {
    const newItem = {
      title: `Product${items.length + 1}`,
      volume: null,
      price: null,
      unitPrice: 0,
      cheapest: false,
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
    compareUnitPrice(newItems);
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
    compareUnitPrice(newItems);
  };

  const compareUnitPrice = (items: productFormProps[]) => {
    for (let i = 0; i < items.length; i++) {
      items[i].cheapest = false;
    }
    const newItems = [...items];
    const unitPrices = newItems.map((item) => item.unitPrice);
    const minUnitPrice = Math.min(...unitPrices);
    const minUnitPriceIndex = unitPrices.indexOf(minUnitPrice);
    newItems[minUnitPriceIndex].cheapest = true;
    setItems(newItems);
  };

  const onSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category, // 送りたいカテゴリーの値
          items: items, // 送りたいアイテムの値
        }),
      });

      if (response.ok) {
        // 成功した場合の処理
        // リダイレクトなどの処理を行う
      } else {
        // 失敗した場合の処理
        // エラーメッセージの表示などを行う
      }
    } catch (error) {
      // エラーハンドリング
      console.error("エラーが発生しました:", error);
    }
  };

  console.log(items);
  // console.log(category);

  return (
    <>
      <CategoryPanel>
        <CategoryTable>
          <colgroup>
            <ColCategory />
            <ColCategoryInput />
          </colgroup>
          <CategoryTd>
            <CategoryP>Category:</CategoryP>
          </CategoryTd>
          <CategoryTd>
            <CategoryInput
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </CategoryTd>
        </CategoryTable>
      </CategoryPanel>
      <Table>
        <colgroup>
          <ColTitle />
          <ColVolume />
          <ColPrice />
          <ColUnitPrice />
        </colgroup>
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
                <UnitPriceP unitPrice={item.unitPrice} cheapest={item.cheapest}>
                  {item.unitPrice !== 0 ? item.unitPrice : "unitPrice"}
                </UnitPriceP>
              </Td>
            </tr>
          );
        })}
      </Table>
      <ButtonPanel>
        <ButtonPanelTable>
          <tr>
            <td>
              <AddButton type="button" onClick={() => handleAddButtonClick()}>
                ➕
              </AddButton>
            </td>
            <td>
              <SendButton type="button" onClick={onSubmit}>
                📃
              </SendButton>
            </td>
          </tr>
        </ButtonPanelTable>
      </ButtonPanel>
    </>
  );
};
