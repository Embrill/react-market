import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		className="pizza-block" // Добавлен className применения оформления
		speed={2}
		width={280}
		height={468}
		viewBox="0 0 280 468"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="132" cy="127" r="119" />
		<rect x="3" y="271" rx="13" ry="13" width="270" height="27" />
		<rect x="0" y="317" rx="13" ry="13" width="270" height="80" />
		<rect x="143" y="417" rx="20" ry="20" width="125" height="43" />
		<rect x="5" y="425" rx="13" ry="13" width="84" height="27" />
	</ContentLoader>
);

export default Skeleton;
