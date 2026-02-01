import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Settings from "../components/Settings";

import { IData } from "../interface/interface";

describe('Settings component', () => {
    let data: IData = {
        age: 0,
        email: '',
        name: '',
        interest: [],
        theme: 'light',
    };
    const setData = vitest.fn();


    it('allow user to change theme', async () => {
        const user = userEvent.setup();

        render(<Settings data={data} setData={setData} />)
        screen.debug();

        const lightThemeRadio = screen.getByLabelText(/light/i);
        const darkThemeRadio = screen.getByLabelText(/dark/i);

        expect(lightThemeRadio).toBeInTheDocument();
        expect(darkThemeRadio).toBeInTheDocument();

        expect(lightThemeRadio).toBeChecked();
        expect(darkThemeRadio).not.toBeChecked();

        await user.click(darkThemeRadio);

        expect(setData).toHaveBeenCalledTimes(1);
        data = setData.mock.calls[0][0](data);

        expect(data.theme).toBe('dark');
    });
});