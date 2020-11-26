import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function SearchBar(props) {
  const onSearch = (term) => props.onSearchTermChange(term);

  return (
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
}
