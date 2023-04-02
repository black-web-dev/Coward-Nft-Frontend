import clsx from 'clsx';
import * as React from 'react';

const BorderButtonComponent = (props: any) => {
	return (
		<div className={clsx("gradient-border button cursor-pointer", props.hover ? 'hover' : '', props.className)}>
			<div className={clsx('border-text', props.hover ? 'hover' : '')}>
				{props.children}
			</div>
			<div className={clsx("border-top", props.hover ? 'hover' : '')}>
			</div>
			<div className={clsx("border-right", props.hover ? 'hover' : '')}>
			</div>
			<div className={clsx("border-left", props.hover ? 'hover' : '')}>
			</div>
			<div className={clsx("border-bottom", props.hover ? 'hover' : '')}>
			</div>
		</div>
	)
}

export default BorderButtonComponent;