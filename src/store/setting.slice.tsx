import { createSlice } from '@reduxjs/toolkit';

export interface IControlledAmount {
    controlAmount: {[key: string]: string}
}

const initialState: IControlledAmount = {
    controlAmount: {
        "": "200 tokens (TOKEN_NAME)",
        "USDC": "200 tokens (USDC)",
        "USDT": "200 tokens (USDT)",
        "WBTC": "2 token (WBTC)",
        "WETH": "2 token (WETH)",
    }
}

const settingSlice = createSlice({
    name: 'controlAmount',
    initialState,
    reducers: {
        updateControlAmount(state, action) {
            state.controlAmount = action.payload
        }
    }
})

export const { updateControlAmount } = settingSlice.actions

export default settingSlice.reducer