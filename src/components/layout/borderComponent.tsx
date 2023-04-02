import clsx from 'clsx';
import * as React from 'react';

const BorderComponent = (props: any) => {
	return (
		<div className={clsx("gradient-border", props.className)}>
			<div className="border-top">
			</div>
			<div className="border-right">
			</div>
			<div className="border-left">
			</div>
			<div className="border-bottom">
			</div>
			<div>
				{props.children}
			</div>
		</div>
	)
}

export default BorderComponent;