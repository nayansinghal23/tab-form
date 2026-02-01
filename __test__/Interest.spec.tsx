import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import Interest from '../components/Interest'
import { IData } from '../interface/interface';

describe('Interest component', () => {
    let data: IData = {
        age: 22,
        email: 'abc@gmail.com',
        interest: [],
        name: 'John Doe',
        theme: 'dark',
    };
    const mockSetData = vitest.fn();

    beforeEach(() => {
        mockSetData.mockClear();
    })

    it("renders all interest checkboxes", () => {
        render(<Interest data={data} setData={mockSetData} />);

        expect(screen.getByLabelText("Coding")).not.toBeChecked();
        expect(screen.getByLabelText("Cricket")).not.toBeChecked();
        expect(screen.getByLabelText("Chess")).not.toBeChecked();
    });

    it('toggle checkboxes as per user interaction', async () => {
        const user = userEvent.setup();
        const { rerender } = render(<Interest data={data} setData={mockSetData} />);

        const codingCheckbox = screen.getByLabelText("Coding");

        expect(codingCheckbox).toBeInTheDocument();
        expect(codingCheckbox).not.toBeChecked();

        await user.click(codingCheckbox);

        expect(mockSetData).toHaveBeenCalled();
        data = mockSetData.mock.calls[0][0](data);
        expect(data.interest).toContain("coding");

        // Use rerender to update the component with new props
        rerender(<Interest data={data} setData={mockSetData} />);
        expect(screen.getByLabelText("Coding")).toBeChecked();
    })
})