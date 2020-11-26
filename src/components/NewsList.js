import React from 'react';
import NewsCard from './NewsCard';

export default function NewsList(props) {
  return (
    <div>
      {props.articles.map((article) => {
        return (
          <NewsCard
            title={article.title}
            content={article.description}
            url={article.url}
          />
        );
      })}
    </div>
  );
}
