import React, { useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import 'antd/dist/antd.css';
import './App.css';

import SearchBar from './components/SearchBar';
import StockGraph from './components/StockGraph';
import NewsList from './components/NewsList';

const ALPHA_VANTAGE_API_KEY = 'RLJB25YV0YEO5Z7A';
const NEWS_API_KEY = '6bc2c36a4e4e465bafa339ebfb6ba793';

// Main layout
function App() {
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isError, setError] = useState(false);

  async function stockSearch(term) {
    let stockResponse = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${term}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}&outputsize=compact`
    );

    if (stockResponse.data['Error Message']) {
      setError(true);
    } else {
      setError(false);

      console.log(stockResponse.data);

      let tempStockData = [];
      let dailies = stockResponse.data['Time Series (Daily)'];
      let metaData = stockResponse.data['Meta Data'];

      let dailyArray = Object.entries(dailies).map((e) => ({ [e[0]]: e[1] }));

      for (let i = 0; i < 30; i++) {
        let name = Object.keys(dailyArray[i])[0];
        let amt = dailyArray[i][name]['4. close'];

        tempStockData.push({
          name,
          amt,
        });
      }

      setStockData(tempStockData);
    }
  }

  async function newsSearch(term) {
    let newsResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${term}&apiKey=${NEWS_API_KEY}`
    );

    setNewsData(newsResponse.data.articles);
  }

  const searchForStock = _.debounce((term) => {
    stockSearch(term);
    newsSearch(term);
  }, 300);

  if (!isError) {
    return (
      <div className="container">
        <Row>
          <Col span={24}>
            <SearchBar onSearchTermChange={searchForStock} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={16}>
            <StockGraph data={stockData} />
          </Col>
          <Col span={8} className="news-list">
            <NewsList articles={newsData} />
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Row>
          <Col span={24}>
            <SearchBar onSearchTermChange={searchForStock} />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            Sorry! Please enter stock symbol to see data.
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
