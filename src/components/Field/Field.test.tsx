import { render, screen } from "@testing-library/react";
import { Field } from "./Field";
import { Input } from "../Input/Input";

const renderField = (props: { hint?: string; error?: string }) =>
  render(
    <Field label="Budget" {...props}>
      {(control) => <Input {...control} />}
    </Field>,
  );

test("the label points at the control", () => {
  renderField({});
  expect(screen.getByLabelText("Budget")).toBeDefined();
});

test("a hint describes the control", () => {
  renderField({ hint: "Whole dollars." });
  const input = screen.getByLabelText("Budget");
  const describedBy = input.getAttribute("aria-describedby");
  expect(describedBy).toBeTruthy();
  expect(document.getElementById(describedBy!)?.textContent).toBe("Whole dollars.");
});

test("an error replaces the hint and marks the control invalid", () => {
  renderField({ hint: "Whole dollars.", error: "Must be above zero." });
  const input = screen.getByLabelText("Budget");
  expect(input.getAttribute("aria-invalid")).toBe("true");
  const describedBy = input.getAttribute("aria-describedby");
  expect(document.getElementById(describedBy!)?.textContent).toBe("Must be above zero.");
  expect(screen.queryByText("Whole dollars.")).toBeNull();
});

test("no description and no invalid flag when there is neither hint nor error", () => {
  renderField({});
  const input = screen.getByLabelText("Budget");
  expect(input.getAttribute("aria-describedby")).toBeNull();
  expect(input.getAttribute("aria-invalid")).toBeNull();
});
