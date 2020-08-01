import { render } from "@testing-library/svelte";
import Home from "./Home.svelte";

test("Home component", () => {
  const { getByText } = render(Home);
  const linkElement = getByText(/Edit/i);
  expect(linkElement).toBeInTheDocument();
});
