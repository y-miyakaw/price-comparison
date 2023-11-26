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
      <div id="product">
        <center>
          Product1
        </center>
      </div>
      <div>
        <center>
          <p>Volume :
            <input
              name="volume1"
              type="tel"
              value={inputs.volume1}
              onChange={(e) => handleInputChange('volume1', e.target.value)}
              autoComplete="off"  // autoComplete属性を追加
            >
            </input>
          </p>
        </center>
        <center>
          <p>Price :
            <input
              name="price1"
              type="tel"
              value={inputs.price1}
              onChange={(e) => handleInputChange('price1', e.target.value)}
              autoComplete="off"  // autoComplete属性を追加
            >
            </input>
          </p>
        </center>
        <center>
          <p>Unit Price :
            <span style={{ color: minUnitPrice === parseFloat(priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))) ? 'red' : 'black' }}>
              {priceCalc(parseFloat(inputs.volume1), parseFloat(inputs.price1))}
            </span>
          </p>
        </center>
      </div>
      <hr />
      <div>
        <center>
          Product2
        </center>
      </div>
      <div>
        <center>
          <p>Volume :
            <input
              name="volume2"
              type="tel"
              value={inputs.volume2}
              onChange={(e) => handleInputChange('volume2', e.target.value)}
              autoComplete="off"  // autoComplete属性を追加
            >
            </input>
          </p>
        </center>
        <center>
          <p>Price :
            <input
              name="price2"
              type="tel"
              value={inputs.price2}
              onChange={(e) => handleInputChange('price2', e.target.value)}
              autoComplete="off"  // autoComplete属性を追加
            >
            </input>
          </p>
        </center>
        <center>
          <p>Unit Price :
            <span style={{ color: minUnitPrice === parseFloat(priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))) ? 'red' : 'black' }}>
              {priceCalc(parseFloat(inputs.volume2), parseFloat(inputs.price2))}
            </span>
          </p>
        </center>
      </div>
      <hr />
      <center>
        <button>+</button>
      </center>
    </>
  );
}

export default App;
