import React from 'react';
import SignOutServer from './signout-server';
import Heading from './heading';

const Navbar = () => {
	return (
		<div className="h-[10vh] flex flex-1 justify-center items-center flex-col md:flex-row md:justify-between">
			<Heading />
			<SignOutServer />
		</div>
	);
};

export default Navbar;
