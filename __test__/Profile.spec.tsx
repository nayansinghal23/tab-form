import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import Profile from '../components/Profile'

import { IData } from '../interface/interface';

describe('Profile component', () => {
    let data: IData = {
        age: 0,
        email: '',
        name: '',
        interest: [],
        theme: 'dark',
    }, setData = vitest.fn();

    beforeEach(() => {
        setData.mockClear();
    })


    it('allow user to enter name', async () => {
        const user = userEvent.setup();

        render(<Profile data={data} setData={setData} />);

        const nameInput = screen.getByLabelText(/name/i);

        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveValue('');

        await user.type(nameInput, 'John Doe');

        expect(setData).toHaveBeenCalledTimes(8);
    })

    it('allow user to enter email', async () => {
        const user = userEvent.setup();

        render(<Profile data={data} setData={setData} />);

        const emailInput = screen.getByLabelText(/email/i);

        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveValue('');

        await user.type(emailInput, 'john.doe@example.com');

        expect(setData).toHaveBeenCalledTimes(20);
    });

    it('allow user to enter age', async () => {
        const user = userEvent.setup();

        render(<Profile data={data} setData={setData} />);

        const ageInput = screen.getByLabelText(/age/i);

        expect(ageInput).toBeInTheDocument();
        expect(ageInput).toHaveValue(null);

        await user.type(ageInput, '30');

        expect(setData).toHaveBeenCalledTimes(2);
    });
})