import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './view/components/Header';
import { Step1 } from './view/Step1';
import { Step2 } from './view/Step2';
import { Step3 } from './view/Step3';
import { Result } from './view/Result';

function App() {
	return (
		<>
			<Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Step1} />
					<Route path="/step2" component={Step2} />
					<Route path="/step3" component={Step3} />
					<Route path="/result" component={Result} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
