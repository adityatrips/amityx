'use client';

import React, { useRef } from 'react';
import ExpandingTextarea from 'react-expanding-textarea';

const TextArea = () => {
	return (
		<ExpandingTextarea
			name="title"
			className="border  w-full border-gray-900 outline:none bg-inherit outline-none focus:border py-4 px-2 rounded-lg focus:border-white"
			placeholder="What is happening?"
		/>
	);
};

export default TextArea;
