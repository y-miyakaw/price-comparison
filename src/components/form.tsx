// import { useForm, useFieldArray } from "react-hook-form";

// interface productForm {
//   volume: number;
//   price: number;
//   unitPrice: number;
// }
// export const Form = () => {
//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<productForm>();
//   const { field, append, remove } = useFieldArray({
//     control,
//     name: "test",
//   });
//   const onSubmit = (data: productForm) => console.log(data);

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Volume</label>
//           <input {...register("volume", { required: true })} />
//           {errors.volume && <span>This field is required</span>}
//         </div>
//         <div>
//           <label>Price</label>
//           <input {...register("price", { required: true })} />
//           {errors.price && <span>This field is required</span>}
//         </div>
//         <div>
//           <label>Unit Price</label>
//           <input {...register("unitPrice", { required: true })} />
//           {errors.unitPrice && <span>This field is required</span>}
//         </div>
//         <input type="submit" />
//       </form>
//       <button type="button" onClick={() => append({ title: "" })}>
//         append
//       </button>
//       {field.map((item, index) => {
//         return (
//           <div key={item.id}>
//             <input
//               {...register(`test.${index}.title` as const)}
//               defaultValue={item.title}
//             />
//             <button type="button" onClick={() => remove(index)}>
//               Delete
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// };

import { useState } from "react";
export const Form = () => {
  const priceCalc = (volume: number, price: number) => {
    const unitPrice = price / volume;
    return isNaN(unitPrice) ? "" : `¥${unitPrice.toFixed(2)}/volume`;
  };
  const [inputs, setInputs] = useState({
    productName1: "product1",
    volume1: "",
    price1: "",
    productName2: "product2",
    volume2: "",
    price2: "",
    productName3: "product3",
    volume3: "",
    price3: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const minUnitPrice = Math.min(
    parseFloat(
      priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))
    ),
    parseFloat(
      priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))
    ),
    parseFloat(priceCalc(parseFloat(inputs.volume3), parseFloat(inputs.price3)))
  );
  return (
    <form>
      <div id="product">
        <center>
          <input
            name="productName1"
            type="text"
            value={inputs.productName1}
            onChange={(e) => handleInputChange("productName1", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </center>
      </div>
      <div>
        <div className="centered-container">
          <p>Volume : </p>
          <input
            name="volume1"
            type="tel"
            value={inputs.volume1}
            onChange={(e) => handleInputChange("volume1", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </div>
        <div className="centered-container">
          <p>Price : </p>
          <input
            name="price1"
            type="tel"
            value={inputs.price1}
            onChange={(e) => handleInputChange("price1", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </div>
        <center>
          <p>
            Unit Price :
            <span
              style={{
                color:
                  minUnitPrice ===
                  parseFloat(
                    priceCalc(
                      parseFloat(inputs.volume1),
                      parseFloat(inputs.price1)
                    )
                  )
                    ? "red"
                    : "black",
              }}
            >
              {priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))}
            </span>
          </p>
        </center>
      </div>
      <hr />
      <div id="product">
        <center>
          <input
            name="productName2"
            type="text"
            value={inputs.productName2}
            onChange={(e) => handleInputChange("productName2", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </center>
      </div>
      <div>
        <div className="centered-container">
          <p>Volume :</p>
          <input
            name="volume2"
            type="tel"
            value={inputs.volume2}
            onChange={(e) => handleInputChange("volume2", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          ></input>
        </div>
        <div className="centered-container">
          <p>Price : </p>
          <input
            name="price2"
            type="tel"
            value={inputs.price2}
            onChange={(e) => handleInputChange("price2", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </div>
        <center>
          <p>
            Unit Price :
            <span
              style={{
                color:
                  minUnitPrice ===
                  parseFloat(
                    priceCalc(
                      parseFloat(inputs.volume2),
                      parseFloat(inputs.price2)
                    )
                  )
                    ? "red"
                    : "black",
              }}
            >
              {priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))}
            </span>
          </p>
        </center>
      </div>
      <hr />
      <div id="product">
        <center>
          <input
            name="productName3"
            type="text"
            value={inputs.productName3}
            onChange={(e) => handleInputChange("productName3", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </center>
      </div>
      <div>
        <div className="centered-container">
          <p>Volume : </p>
          <input
            name="volume3"
            type="tel"
            value={inputs.volume3}
            onChange={(e) => handleInputChange("volume3", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </div>
        <div className="centered-container">
          <p>Price : </p>
          <input
            name="price3"
            type="tel"
            value={inputs.price3}
            onChange={(e) => handleInputChange("price3", e.target.value)}
            autoComplete="off" // autoComplete属性を追加
          />
        </div>
        <center>
          <p>
            Unit Price :
            <span
              style={{
                color:
                  minUnitPrice ===
                  parseFloat(
                    priceCalc(
                      parseFloat(inputs.volume3),
                      parseFloat(inputs.price3)
                    )
                  )
                    ? "red"
                    : "black",
              }}
            >
              {priceCalc(parseFloat(inputs.volume3), parseFloat(inputs.price3))}
            </span>
          </p>
        </center>
      </div>
      <hr />
      {/* 送信ボタンを押すとAPIにパラメータを送信 */}
      <div className="centered-container">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};
