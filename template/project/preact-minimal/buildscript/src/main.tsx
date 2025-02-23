import { render } from "preact";

const App = () => {
	return (<p>Hello, preact!</p>);
};

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	if (root) {
		render(<App />, root);
	}
});
