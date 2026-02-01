import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

import TabForm from "../components/TabForm";

describe('Tabform component', () => {
    it('switches tabs and shows correct content', async () => {
        const user = userEvent.setup();

        render(<TabForm />);

        expect(screen.getByText(/Profile/i)).toBeInTheDocument();

        await user.click(screen.getByText(/Interest/i));
        expect(screen.getByText(/Interest/i)).toBeInTheDocument();

        await user.click(screen.getByText(/Settings/i));
        expect(screen.getByText(/Settings/i)).toBeInTheDocument();

        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    })

    it('fills the form and submits, storing data in localStorage', async () => {
        // Mock localStorage
        const setItemSpy = vitest.spyOn(window.localStorage.__proto__, 'setItem');
        setItemSpy.mockClear();

        const user = userEvent.setup();
        render(<TabForm />);

        // Fill Profile tab
        await user.type(screen.getByLabelText(/name/i), 'John Doe');
        await user.type(screen.getByLabelText(/age/i), '30');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');

        // Go to Interest tab
        await user.click(screen.getByText(/Interest/i));
        await user.click(screen.getByLabelText(/Chess/i));
        await user.click(screen.getByLabelText(/Coding/i));

        // Go to Settings tab
        await user.click(screen.getByText(/Settings/i));
        await user.click(screen.getByLabelText(/dark/i));

        // Click Submit
        const submitBtn = screen.getByText(/Submit/i);
        await user.click(submitBtn);

        // Assert localStorage.setItem was called with correct data
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('John Doe')
        );
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('john@example.com')
        );
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('30')
        );
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('dark')
        )
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('chess')
        )
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.stringContaining('coding')
        )
        expect(setItemSpy).toHaveBeenCalledWith(
            'data',
            expect.not.stringContaining('cricket')
        )
    });
})