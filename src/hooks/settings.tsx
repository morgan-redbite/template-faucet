import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getControlledAmount } from "../utils/api/faucet";
import { updateControlAmount } from "../store/setting.slice";

function useStrategyPerformance() {
    const dispatch = useDispatch();

    const controlledAmount = useCallback(async () => {
        const response = await getControlledAmount();

        let symbolAmount: {[key: string]: string} = {
            "": "200 tokens (TOKEN_NAME)",
            "USDC": "200 tokens (USDC)",
            "USDT": "200 tokens (USDT)",
            "WBTC": "0.5 token (WBTC)",
            "WETH": "0.5 token (WETH)",
        }

        Object.keys(response.data).forEach((item: any) => {
            symbolAmount = {
                ...symbolAmount,
                [item]: `${response.data[item]} tokens (${item})`
            }
        })

        dispatch(updateControlAmount(symbolAmount))
    }, [])


    useEffect(() => {
        controlledAmount();
    }, [])

}

export default useStrategyPerformance;