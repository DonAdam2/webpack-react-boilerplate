import React from 'react';
import { IntlProvider } from 'react-intl';

const MockReactIntlProvider = ({ children, locale = 'en' }) => (
	<IntlProvider locale={locale}>{children}</IntlProvider>
);

export default MockReactIntlProvider;

// if you would like you can override the render function of RTL as follows
/*
import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

function render(ui, {locale = 'en', ...renderOptions} = {}) {
	function Wrapper({children}) {
		return <IntlProvider locale={locale}>{children}</IntlProvider>
	}
	return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {render}*/
