import React from 'react';
import { Card } from 'antd';

export default function NewsCard(props) {
  return (
    <Card title={props.title}>
      {props.content} <br /> <br />{' '}
      <a href={`${props.url}`} target="blank">
        Read More
      </a>
    </Card>
  );
}
