import './App.css';
import { useState } from 'react';

const priceCalc = (volume: number, price: number) => {
  const unitPrice = price / volume;
  return isNaN(unitPrice) ? '' : `¥${unitPrice.toFixed(2)}/volume`;
}

function App() {
  const [inputs, setInputs] = useState({ volume1: '', price1: '', volume2: '', price2: '' })

  const handleInputChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: parseFloat(value) || 0, })
  }

  const minUnitPrice = Math.min(
    parseFloat(priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))),
    parseFloat(priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2)))
  );

  return (
    <>
      <table>
        <tr>
          <td>
          </td>
          <td>
            数量
          </td>
          <td>
            価格
          </td>
          <td>
            単価
          </td>
        </tr>
        <tr>
          <td>
            商品1
          </td>
          <td>
            <input
              name="volume1"
              type="number"
              value={inputs.volume1}
              onChange={(e) => handleInputChange('volume1', e.target.value)}>
            </input>
          </td>
          <td>
            <input
              name="price1"
              type="number"
              value={inputs.price1}
              onChange={(e) => handleInputChange('price1', e.target.value)}>
            </input>
          </td>
          <td style={{ color: minUnitPrice === parseFloat(priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))) ? 'red' : 'black' }}>
            {priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))}
          </td>
        </tr>
        <tr>
          <td>
            商品2
          </td>
          <td>
            <input
              name="volume2"
              type="number"
              value={inputs.volume2}
              onChange={(e) => handleInputChange('volume2', e.target.value)}>
            </input>
          </td>
          <td>
            <input
              name="price2"
              type="number"
              value={inputs.price2}
              onChange={(e) => handleInputChange('price2', e.target.value)}>
            </input>
          </td>
          <td style={{ color: minUnitPrice === parseFloat(priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))) ? 'red' : 'black' }}>
            {priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))}
          </td>
        </tr>
      </table >
    </>
  );
}

export default App;
